import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dataDir = path.join(root, "data");
const outputDir = path.join(root, "outputs");

const rawCsvPath = path.join(dataDir, "raw_marketing_campaign_data.csv");
const cleanCsvPath = path.join(dataDir, "cleaned_marketing_campaign_data.csv");
const outputPath = path.join(outputDir, "Marketing_Campaign_Analysis.xlsx");

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function summarize(rows, dimensions) {
  const map = new Map();
  for (const row of rows) {
    const key = dimensions.map((dimension) => row[dimension]).join(" | ");
    if (!map.has(key)) {
      map.set(key, {
        key,
        dimensions: dimensions.map((dimension) => row[dimension]),
        budget: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0,
      });
    }
    const item = map.get(key);
    item.budget += toNumber(row.budget);
    item.impressions += toNumber(row.impressions);
    item.clicks += toNumber(row.clicks);
    item.conversions += toNumber(row.conversions);
    item.revenue += toNumber(row.revenue);
  }

  return [...map.values()]
    .map((item) => ({
      ...item,
      ctr: item.impressions ? item.clicks / item.impressions : 0,
      conversionRate: item.clicks ? item.conversions / item.clicks : 0,
      roi: item.budget ? (item.revenue - item.budget) / item.budget : 0,
    }))
    .sort((a, b) => b.roi - a.roi);
}

function monthlySummary(rows) {
  const map = new Map();
  for (const row of rows) {
    const month = row.campaign_date.slice(0, 7);
    if (!map.has(month)) {
      map.set(month, { month, budget: 0, revenue: 0, conversions: 0, clicks: 0, impressions: 0 });
    }
    const item = map.get(month);
    item.budget += toNumber(row.budget);
    item.revenue += toNumber(row.revenue);
    item.conversions += toNumber(row.conversions);
    item.clicks += toNumber(row.clicks);
    item.impressions += toNumber(row.impressions);
  }
  return [...map.values()].sort((a, b) => a.month.localeCompare(b.month));
}

function writeMatrix(sheet, startCell, matrix) {
  const rowCount = matrix.length;
  const colCount = matrix[0].length;
  const match = startCell.match(/^([A-Z]+)(\d+)$/);
  const colLetters = match[1];
  const row = Number(match[2]) - 1;
  const col = [...colLetters].reduce((sum, letter) => sum * 26 + letter.charCodeAt(0) - 64, 0) - 1;
  sheet.getRangeByIndexes(row, col, rowCount, colCount).values = matrix;
}

function formatHeader(range) {
  range.format = {
    fill: "#174E63",
    font: { bold: true, color: "#FFFFFF" },
    wrapText: true,
  };
}

function addTitle(sheet, title, subtitle = "") {
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1").format = {
    font: { bold: true, size: 18, color: "#12343B" },
  };
  if (subtitle) {
    sheet.getRange("A2:H2").merge();
    sheet.getRange("A2").values = [[subtitle]];
    sheet.getRange("A2").format = { font: { color: "#52616B" }, wrapText: true };
  }
}

const rawRows = parseCsv(await fs.readFile(rawCsvPath, "utf8"));
const cleanRows = parseCsv(await fs.readFile(cleanCsvPath, "utf8"));

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const raw = workbook.worksheets.add("Raw_Data");
const cleaned = workbook.worksheets.add("Cleaned_Data");
const channel = workbook.worksheets.add("Pivot_Channel");
const segment = workbook.worksheets.add("Pivot_Segment");
const trend = workbook.worksheets.add("Trend_Monthly");
const dictionary = workbook.worksheets.add("Data_Dictionary");
const notes = workbook.worksheets.add("Project_Readme");

for (const sheet of workbook.worksheets.items) {
  sheet.showGridLines = false;
}

const headers = Object.keys(cleanRows[0]);
writeMatrix(raw, "A1", [headers, ...rawRows.map((row) => headers.map((header) => row[header]))]);
writeMatrix(cleaned, "A1", [headers, ...cleanRows.map((row) => headers.map((header) => row[header]))]);

for (const sheet of [raw, cleaned]) {
  const used = sheet.getUsedRange();
  formatHeader(sheet.getRangeByIndexes(0, 0, 1, headers.length));
  used.format.autofitColumns();
  used.format.autofitRows();
  sheet.freezePanes.freezeRows(1);
}
raw.tables.add(`A1:T${rawRows.length + 1}`, true, "RawMarketingData");
cleaned.tables.add(`A1:T${cleanRows.length + 1}`, true, "CleanedMarketingData");

const channelRows = summarize(cleanRows, ["channel"]);
const channelMatrix = [
  ["Channel", "Budget", "Impressions", "Clicks", "Conversions", "Revenue", "CTR", "Conversion Rate", "ROI"],
  ...channelRows.map((row) => [
    row.dimensions[0],
    row.budget,
    row.impressions,
    row.clicks,
    row.conversions,
    row.revenue,
    row.ctr,
    row.conversionRate,
    row.roi,
  ]),
];
addTitle(channel, "Pivot Table: Campaign Performance by Channel", "Use this as the Excel pivot-table output view for channel comparison.");
writeMatrix(channel, "A4", channelMatrix);
formatHeader(channel.getRange("A4:I4"));
channel.getRange("B5:B9").format.numberFormat = "$#,##0";
channel.getRange("F5:F9").format.numberFormat = "$#,##0";
channel.getRange("G5:I9").format.numberFormat = "0.0%";
channel.getRange("A4:I9").format.autofitColumns();
channel.tables.add("A4:I9", true, "ChannelPivot");
const channelChart = channel.charts.add("bar", channel.getRange("A4:F9"));
channelChart.title = "Revenue by Channel";
channelChart.setPosition("K4", "R18");

const segmentRows = summarize(cleanRows, ["age_segment", "spend_tier"]).slice(0, 15);
const segmentMatrix = [
  ["Age Segment", "Spend Tier", "Budget", "Conversions", "Revenue", "CTR", "Conversion Rate", "ROI"],
  ...segmentRows.map((row) => [
    row.dimensions[0],
    row.dimensions[1],
    row.budget,
    row.conversions,
    row.revenue,
    row.ctr,
    row.conversionRate,
    row.roi,
  ]),
];
addTitle(segment, "Pivot Table: Customer Segment Performance", "Rows are age segment and previous-spend tier, ranked by ROI.");
writeMatrix(segment, "A4", segmentMatrix);
formatHeader(segment.getRange("A4:H4"));
segment.getRange("C5:C19").format.numberFormat = "$#,##0";
segment.getRange("E5:E19").format.numberFormat = "$#,##0";
segment.getRange("F5:H19").format.numberFormat = "0.0%";
segment.getRange("A4:H19").format.autofitColumns();
segment.tables.add("A4:H19", true, "SegmentPivot");
const segmentChart = segment.charts.add("bar", segment.getRange("A4:H12"));
segmentChart.title = "Revenue by Leading Segments";
segmentChart.setPosition("J4", "Q18");

const trendRows = monthlySummary(cleanRows);
const trendMatrix = [
  ["Month", "Budget", "Revenue", "Conversions", "Clicks", "Impressions", "CTR", "Conversion Rate", "ROI"],
  ...trendRows.map((row) => [
    row.month,
    row.budget,
    row.revenue,
    row.conversions,
    row.clicks,
    row.impressions,
    row.impressions ? row.clicks / row.impressions : 0,
    row.clicks ? row.conversions / row.clicks : 0,
    row.budget ? (row.revenue - row.budget) / row.budget : 0,
  ]),
];
addTitle(trend, "Monthly Trend Analysis", "Track campaign scale, engagement, conversion, revenue, and ROI over time.");
writeMatrix(trend, "A4", trendMatrix);
formatHeader(trend.getRange("A4:I4"));
trend.getRange(`B5:C${trendRows.length + 4}`).format.numberFormat = "$#,##0";
trend.getRange(`G5:I${trendRows.length + 4}`).format.numberFormat = "0.0%";
trend.getRange("A4:I10").format.autofitColumns();
trend.tables.add(`A4:I${trendRows.length + 4}`, true, "MonthlyTrend");
const trendChart = trend.charts.add("line", trend.getRange(`A4:C${trendRows.length + 4}`));
trendChart.title = "Budget vs Revenue Trend";
trendChart.hasLegend = true;
trendChart.xAxis = { axisType: "textAxis" };
trendChart.yAxis = { numberFormatCode: "$#,##0" };
trendChart.setPosition("K4", "R19");

const totalBudget = cleanRows.reduce((sum, row) => sum + toNumber(row.budget), 0);
const totalImpressions = cleanRows.reduce((sum, row) => sum + toNumber(row.impressions), 0);
const totalClicks = cleanRows.reduce((sum, row) => sum + toNumber(row.clicks), 0);
const totalConversions = cleanRows.reduce((sum, row) => sum + toNumber(row.conversions), 0);
const totalRevenue = cleanRows.reduce((sum, row) => sum + toNumber(row.revenue), 0);
const bestChannel = channelRows[0];

addTitle(dashboard, "Marketing Campaign ROI Dashboard", "Campaign performance, engagement, conversions, and budget efficiency across channels and customer segments.");
dashboard.getRange("A4:H7").values = [
  ["Revenue", "Budget", "ROI", "CTR", "Conversion Rate", "Conversions", "Best ROI Channel", "Rows Analyzed"],
  [
    totalRevenue,
    totalBudget,
    (totalRevenue - totalBudget) / totalBudget,
    totalClicks / totalImpressions,
    totalConversions / totalClicks,
    totalConversions,
    bestChannel.dimensions[0],
    cleanRows.length,
  ],
  ["Target", "Target", "Target", "Target", "Target", "Target", "Action", "Source"],
  ["$20M+", "<$2.2M", ">800%", ">3.0%", ">5.0%", "150K+", "Scale winners", "Cleaned_Data"],
];
formatHeader(dashboard.getRange("A4:H4"));
dashboard.getRange("A5:B5").format.numberFormat = "$#,##0";
dashboard.getRange("C5:E5").format.numberFormat = "0.0%";
dashboard.getRange("F5").format.numberFormat = "#,##0";
dashboard.getRange("A4:H7").format.autofitColumns();

const dashboardChannelMatrix = [
  ["Channel", "Budget", "Revenue", "Conversions", "CTR", "Conversion Rate", "ROI"],
  ...channelRows.map((row) => [
    row.dimensions[0],
    row.budget,
    row.revenue,
    row.conversions,
    row.ctr,
    row.conversionRate,
    row.roi,
  ]),
];
writeMatrix(dashboard, "A10", dashboardChannelMatrix);
formatHeader(dashboard.getRange("A10:G10"));
dashboard.getRange("B11:C15").format.numberFormat = "$#,##0";
dashboard.getRange("D11:D15").format.numberFormat = "#,##0";
dashboard.getRange("E11:G15").format.numberFormat = "0.0%";

const dashboardTrendMatrix = [
  ["Month", "Budget", "Revenue", "Conversions", "ROI"],
  ...trendRows.map((row) => [
    row.month,
    row.budget,
    row.revenue,
    row.conversions,
    row.budget ? (row.revenue - row.budget) / row.budget : 0,
  ]),
];
writeMatrix(dashboard, "A17", dashboardTrendMatrix);
formatHeader(dashboard.getRange("A17:E17"));
dashboard.getRange("B18:C23").format.numberFormat = "$#,##0";
dashboard.getRange("D18:D23").format.numberFormat = "#,##0";
dashboard.getRange("E18:E23").format.numberFormat = "0.0%";
dashboard.getRange("A1:A45").format.columnWidthPx = 115;
dashboard.getRange("B1:C45").format.columnWidthPx = 105;
dashboard.getRange("D1:E45").format.columnWidthPx = 105;
dashboard.getRange("F1:G45").format.columnWidthPx = 120;
dashboard.getRange("H1:H45").format.columnWidthPx = 110;
dashboard.getRange("A1:H45").format.autofitRows();
dashboard.getRange("A1:H1").format.rowHeightPx = 30;
dashboard.getRange("A2:H2").format.rowHeightPx = 34;
dashboard.getRange("A3:H3").format.rowHeightPx = 18;

const dashBar = dashboard.charts.add("bar", dashboard.getRange("A10:D15"));
dashBar.title = "Budget, Revenue, and Conversions by Channel";
dashBar.setPosition("K4", "R17");

const dashLine = dashboard.charts.add("line", dashboard.getRange("A17:C23"));
dashLine.title = "Budget vs Revenue by Month";
dashLine.hasLegend = true;
dashLine.xAxis = { axisType: "textAxis" };
dashLine.yAxis = { numberFormatCode: "$#,##0" };
dashLine.setPosition("K19", "R32");

const dashPie = dashboard.charts.add("pie", dashboard.getRange("A10:B15"));
dashPie.title = "Budget Contribution by Channel";
dashPie.setPosition("A25", "H39");

dashboard.getRange("A41:H45").values = [
  ["Recommended Actions", "", "", "", "", "", "", ""],
  ["1. Reallocate budget toward Paid Search and Email where conversion efficiency is strongest.", "", "", "", "", "", "", ""],
  ["2. Reduce Display Ads spend unless the goal is pure awareness, because ROI trails other channels.", "", "", "", "", "", "", ""],
  ["3. Prioritize 25-44 and High/VIP previous-spend segments for conversion-focused campaigns.", "", "", "", "", "", "", ""],
  ["4. Test creative timing and landing pages for regions with lower ROI before scaling.", "", "", "", "", "", "", ""],
];
dashboard.getRange("A41:H41").merge();
dashboard.getRange("A42:H45").merge(true);
dashboard.getRange("A41").format = { fill: "#174E63", font: { bold: true, color: "#FFFFFF" } };
dashboard.getRange("A42:H45").format = { wrapText: true, fill: "#F7FBFC" };

const dictionaryRows = [
  ["Field", "Meaning"],
  ["campaign_id", "Marketing campaign identifier"],
  ["customer_id", "Customer identifier"],
  ["campaign_date", "Date when the campaign touch happened"],
  ["channel", "Email, Social Media, Paid Search, Display Ads, or Influencer"],
  ["campaign_type", "Awareness, Consideration, Retargeting, or Conversion"],
  ["region", "Customer region"],
  ["age_segment", "Customer age band"],
  ["previous_spend", "Historical spend before this campaign"],
  ["spend_tier", "Low, Medium, High, or VIP historical customer value"],
  ["budget", "Marketing spend allocated to that campaign touch"],
  ["impressions", "Number of campaign views"],
  ["clicks", "Number of engagement clicks"],
  ["conversions", "Number of purchases attributed to the campaign"],
  ["revenue", "Purchase revenue generated"],
  ["ctr", "Clicks divided by impressions"],
  ["conversion_rate", "Conversions divided by clicks"],
  ["roi", "Revenue minus budget, divided by budget"],
];
addTitle(dictionary, "Data Dictionary", "Use this tab to explain fields during interviews.");
writeMatrix(dictionary, "A4", dictionaryRows);
formatHeader(dictionary.getRange("A4:B4"));
dictionary.getRange("A4:B21").format.autofitColumns();
dictionary.tables.add("A4:B21", true, "DataDictionary");

addTitle(notes, "Project Readme", "Beginner-to-intermediate marketing campaign analysis project for a Data Analyst Intern portfolio.");
notes.getRange("A4:B16").values = [
  ["Business Problem", "A retail marketing team has weak campaign ROI and needs to identify which channels and segments should receive more budget."],
  ["Core Question", "Which marketing channels, campaign types, and customer segments drive the best engagement, conversions, revenue, and ROI?"],
  ["Excel Phase", "Clean raw exports, remove duplicates, standardize channel/gender/region fields, build pivot tables and charts."],
  ["SQL Phase", "Query conversion rate, revenue, ROI, and top customer segments from structured marketing data."],
  ["Python Phase", "Use pandas, matplotlib, and seaborn for EDA, correlations, distributions, trend plots, and outlier checks."],
  ["Dashboard Phase", "Use Excel dashboard first; optional Power BI/Tableau dashboard can reuse the cleaned CSV."],
  ["KPIs", "CTR, conversion rate, revenue, ROI, conversions, and budget."],
  ["Filters", "Campaign type, region, channel, age segment, and spend tier."],
  ["Interview Angle", "Explain the business problem, tool workflow, main insights, and budget reallocation recommendations."],
  ["Dataset Type", "Simulated realistic marketing data with intentionally messy raw rows and cleaned analysis-ready rows."],
  ["Difficulty", "Beginner to intermediate; no complex machine learning required."],
  ["Final Output", "Excel workbook, SQL script, Python EDA script, dashboard, and README."],
  ["Portfolio Story", "I moved from messy campaign data to decision-ready recommendations using Excel, SQL, and Python."],
];
formatHeader(notes.getRange("A4:B4"));
notes.getRange("A4:B16").format = { wrapText: true };
notes.getRange("A1:A16").format.columnWidthPx = 165;
notes.getRange("B1:B16").format.columnWidthPx = 700;

for (const sheet of [dashboard, channel, segment, trend, dictionary, notes]) {
  sheet.freezePanes.freezeRows(4);
}

await fs.mkdir(outputDir, { recursive: true });

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "formula error scan",
});
console.log(errors.ndjson);

for (const sheetName of ["Dashboard", "Pivot_Channel", "Pivot_Segment", "Trend_Monthly", "Data_Dictionary", "Project_Readme"]) {
  const preview = await workbook.render({ sheetName, autoCrop: "all", scale: 1, format: "png" });
  await fs.writeFile(
    path.join(outputDir, `${sheetName}.png`),
    new Uint8Array(await preview.arrayBuffer()),
  );
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
console.log(outputPath);
