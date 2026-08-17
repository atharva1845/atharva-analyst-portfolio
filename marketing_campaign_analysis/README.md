# Marketing Campaign Analysis Project

## 1. Business Problem Definition

A retail marketing team is running campaigns across Email, Social Media, Paid Search, Display Ads, and Influencer channels. Management is concerned that campaign spend is increasing but conversions and ROI are inconsistent.

**Problem statement:** Identify which channels, campaign types, and customer segments deliver the best engagement, conversions, revenue, and ROI so the marketing team can reallocate budget more effectively.

## 2. Dataset Description

The project uses a simulated but realistic marketing dataset with two versions:

- `data/raw_marketing_campaign_data.csv`: intentionally messy export with duplicates, missing regions, and inconsistent text formats.
- `data/cleaned_marketing_campaign_data.csv`: cleaned analysis-ready dataset.

Main fields:

- Customer demographics: `age`, `age_segment`, `gender`, `region`, `previous_spend`, `spend_tier`
- Campaign details: `campaign_id`, `campaign_date`, `channel`, `campaign_type`, `budget`, `duration_days`
- Engagement metrics: `impressions`, `clicks`, `ctr`
- Conversion metrics: `conversions`, `conversion_rate`, `revenue`, `roi`

## 3. Excel Phase

Use `outputs/Marketing_Campaign_Analysis.xlsx` as the primary Excel deliverable.

Recommended Excel workflow:

1. Open `Raw_Data` and inspect duplicates, blank regions, inconsistent gender values, and inconsistent channel casing.
2. Use `Cleaned_Data` for analysis after removing duplicates and standardizing fields.
3. Review pivot-style sheets:
   - `Pivot_Channel`: campaign performance by channel.
   - `Pivot_Segment`: conversion and ROI by age segment and spend tier.
   - `Trend_Monthly`: monthly budget, revenue, conversion, and ROI trend.
4. Use the `Dashboard` sheet to explain KPIs and recommendations.

Excel charts included:

- Bar chart: channel performance comparison.
- Line chart: monthly budget vs revenue trend.
- Pie chart: budget contribution by channel.

## 4. SQL Phase

Use `sql/marketing_campaign_analysis.sql`.

Business questions answered:

- What is the overall CTR, conversion rate, revenue, and ROI?
- Which campaign types convert best?
- Which channels generate the most revenue and ROI?
- Which customer segments perform best?
- Does higher spending always lead to better performance?
- Which campaigns should be scaled, optimized, or stopped?

To practice locally with SQLite, import the cleaned CSV into a table named `marketing_campaigns`, then run the queries.

## 5. Python Phase

Use `python/eda_marketing_campaign.py`.

The script performs:

- KPI calculation.
- Channel-level performance summary.
- Correlation analysis.
- Customer spend distribution analysis.
- Campaign ROI spread by channel.
- Budget vs conversion scatter analysis.
- Monthly trend analysis.
- Top customer segment analysis.

Generated visuals are saved in `outputs/figures/`:

- `correlation_heatmap.png`
- `customer_spend_distribution.png`
- `roi_by_channel_boxplot.png`
- `budget_vs_conversions_scatter.png`
- `monthly_budget_revenue_trend.png`

## 6. Dashboard Phase

The Excel dashboard includes:

- KPIs: Revenue, Budget, ROI, CTR, Conversion Rate, Conversions.
- Filters to recreate in Power BI/Tableau: channel, campaign type, region, age segment, spend tier.
- Visuals: campaign performance comparison, monthly trend, channel contribution, segment insights.

Optional Power BI/Tableau extension:

1. Load `cleaned_marketing_campaign_data.csv`.
2. Create calculated fields for CTR, conversion rate, and ROI if needed.
3. Add slicers for channel, campaign type, region, age segment, and spend tier.
4. Build a dashboard with KPI cards, bar charts, line charts, and segment tables.

## 7. Key Business Questions

- Which marketing channels deliver the highest ROI?
- What factors influence customer conversion?
- Which customer segments respond best to campaigns?
- Is higher spending always leading to better results?
- Which campaigns should be scaled, optimized, or stopped?

## 8. Insights and Recommendations

Suggested talking points from this project:

- Paid Search and Email tend to produce stronger conversion efficiency than Display Ads.
- Retargeting and Conversion campaigns usually outperform Awareness campaigns on conversion rate.
- Customers aged 25-44 and customers with High or VIP previous-spend tiers are stronger candidates for budget scaling.
- Higher spend does not automatically guarantee better ROI; campaign quality, channel, audience, and intent matter.
- Underperforming campaigns should be optimized before scaling, especially where CTR is acceptable but conversion rate is weak.

Recommended actions:

- Reallocate budget toward channels with higher ROI and conversion rate.
- Use Display Ads mainly for awareness unless retargeting improves downstream conversion.
- Build focused campaigns for high-value customer segments.
- Test landing pages, timing, and messaging for low-conversion regions.
- Monitor ROI monthly instead of judging campaigns only by impressions or clicks.

## 9. Interview Explanation

Use this project story:

> I analyzed marketing campaign performance for a retail business with low and inconsistent ROI. I started in Excel by cleaning the raw campaign export, standardizing text fields, removing duplicates, and creating pivot tables for channel and customer segment performance. Then I used SQL to query structured campaign data for conversion rate, revenue, ROI, and top segments. Finally, I used Python with pandas, matplotlib, and seaborn for deeper EDA, including correlations, spend distribution, ROI spread, and budget-versus-conversion analysis. I summarized the findings in an Excel dashboard and recommended shifting budget toward high-performing channels and high-value customer segments.

Tools used:

- Excel: cleaning, pivot tables, charts, dashboard.
- SQL: structured querying and KPI extraction.
- Python: exploratory data analysis and visualizations.
- Optional Power BI/Tableau: interactive dashboard extension.

Business impact:

- Helps marketing managers reduce wasted spend.
- Identifies channels and segments worth scaling.
- Moves decision-making from vanity metrics, such as impressions, toward ROI and conversion quality.
