-- Marketing Campaign Analysis
-- Dialect: SQLite / PostgreSQL-friendly beginner SQL
-- Table assumed: marketing_campaigns

CREATE TABLE IF NOT EXISTS marketing_campaigns (
    campaign_id TEXT,
    customer_id TEXT,
    campaign_date DATE,
    channel TEXT,
    campaign_type TEXT,
    region TEXT,
    age INTEGER,
    age_segment TEXT,
    gender TEXT,
    previous_spend REAL,
    spend_tier TEXT,
    budget REAL,
    duration_days INTEGER,
    impressions INTEGER,
    clicks INTEGER,
    conversions INTEGER,
    revenue REAL,
    ctr REAL,
    conversion_rate REAL,
    roi REAL
);

-- 1. Overall KPI summary
SELECT
    COUNT(*) AS total_records,
    ROUND(SUM(budget), 2) AS total_budget,
    ROUND(SUM(revenue), 2) AS total_revenue,
    SUM(impressions) AS total_impressions,
    SUM(clicks) AS total_clicks,
    SUM(conversions) AS total_conversions,
    ROUND(1.0 * SUM(clicks) / NULLIF(SUM(impressions), 0), 4) AS overall_ctr,
    ROUND(1.0 * SUM(conversions) / NULLIF(SUM(clicks), 0), 4) AS overall_conversion_rate,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS overall_roi
FROM marketing_campaigns;

-- 2. Conversion rate by campaign type
SELECT
    campaign_type,
    SUM(clicks) AS clicks,
    SUM(conversions) AS conversions,
    ROUND(1.0 * SUM(conversions) / NULLIF(SUM(clicks), 0), 4) AS conversion_rate
FROM marketing_campaigns
GROUP BY campaign_type
ORDER BY conversion_rate DESC;

-- 3. Revenue and ROI generated per channel
SELECT
    channel,
    ROUND(SUM(budget), 2) AS total_budget,
    ROUND(SUM(revenue), 2) AS total_revenue,
    SUM(conversions) AS conversions,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS roi
FROM marketing_campaigns
GROUP BY channel
ORDER BY roi DESC;

-- 4. Top-performing customer segments
SELECT
    age_segment,
    spend_tier,
    region,
    COUNT(*) AS campaign_touches,
    SUM(conversions) AS conversions,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(1.0 * SUM(conversions) / NULLIF(SUM(clicks), 0), 4) AS conversion_rate,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS roi
FROM marketing_campaigns
GROUP BY age_segment, spend_tier, region
HAVING campaign_touches >= 5
ORDER BY roi DESC, revenue DESC
LIMIT 10;

-- 5. Campaign ROI analysis
SELECT
    campaign_id,
    channel,
    campaign_type,
    ROUND(SUM(budget), 2) AS budget,
    ROUND(SUM(revenue), 2) AS revenue,
    SUM(conversions) AS conversions,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS roi
FROM marketing_campaigns
GROUP BY campaign_id, channel, campaign_type
ORDER BY roi DESC;

-- 6. Does higher spend always lead to better results?
SELECT
    CASE
        WHEN budget < 1000 THEN 'Under 1K'
        WHEN budget < 2500 THEN '1K-2.5K'
        WHEN budget < 4000 THEN '2.5K-4K'
        ELSE '4K+'
    END AS budget_band,
    COUNT(*) AS records,
    ROUND(AVG(budget), 2) AS avg_budget,
    ROUND(AVG(revenue), 2) AS avg_revenue,
    ROUND(AVG(conversions), 2) AS avg_conversions,
    ROUND(AVG(roi), 4) AS avg_roi
FROM marketing_campaigns
GROUP BY budget_band
ORDER BY avg_budget;

-- 7. Monthly trend analysis
SELECT
    SUBSTR(campaign_date, 1, 7) AS month,
    ROUND(SUM(budget), 2) AS budget,
    ROUND(SUM(revenue), 2) AS revenue,
    SUM(conversions) AS conversions,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS roi
FROM marketing_campaigns
GROUP BY SUBSTR(campaign_date, 1, 7)
ORDER BY month;

-- 8. Campaigns to scale or stop
SELECT
    campaign_id,
    channel,
    campaign_type,
    ROUND(SUM(revenue), 2) AS revenue,
    ROUND(SUM(budget), 2) AS budget,
    ROUND((SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0), 4) AS roi,
    CASE
        WHEN (SUM(revenue) - SUM(budget)) / NULLIF(SUM(budget), 0) >= -0.70 THEN 'Scale / investigate'
        WHEN SUM(conversions) = 0 THEN 'Stop'
        ELSE 'Optimize'
    END AS recommendation
FROM marketing_campaigns
GROUP BY campaign_id, channel, campaign_type
ORDER BY roi DESC;
