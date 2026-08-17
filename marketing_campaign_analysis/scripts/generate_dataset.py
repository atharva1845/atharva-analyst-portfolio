from __future__ import annotations

import csv
import math
import random
from datetime import date, timedelta
from pathlib import Path


random.seed(42)

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"

REGIONS = ["North", "South", "East", "West", "Central"]
CHANNELS = ["Email", "Social Media", "Paid Search", "Display Ads", "Influencer"]
CAMPAIGN_TYPES = ["Awareness", "Consideration", "Retargeting", "Conversion"]
GENDERS = ["Female", "Male", "Other"]

CHANNEL_EFFECT = {
    "Email": 1.18,
    "Social Media": 1.05,
    "Paid Search": 1.28,
    "Display Ads": 0.82,
    "Influencer": 0.96,
}

TYPE_EFFECT = {
    "Awareness": 0.72,
    "Consideration": 0.96,
    "Retargeting": 1.42,
    "Conversion": 1.25,
}

REGION_EFFECT = {
    "North": 1.06,
    "South": 0.93,
    "East": 1.12,
    "West": 1.02,
    "Central": 0.88,
}


def age_segment(age: int) -> str:
    if age < 25:
        return "18-24"
    if age < 35:
        return "25-34"
    if age < 45:
        return "35-44"
    if age < 55:
        return "45-54"
    return "55+"


def spend_tier(spend: float) -> str:
    if spend < 200:
        return "Low"
    if spend < 500:
        return "Medium"
    if spend < 900:
        return "High"
    return "VIP"


def build_rows(row_count: int = 720) -> list[dict[str, object]]:
    rows: list[dict[str, object]] = []
    start_date = date(2025, 1, 1)

    for idx in range(1, row_count + 1):
        campaign_id = f"CMP-{random.randint(1, 36):03d}"
        customer_id = f"CUST-{idx:04d}"
        channel = random.choices(
            CHANNELS,
            weights=[0.23, 0.28, 0.22, 0.17, 0.10],
            k=1,
        )[0]
        campaign_type = random.choices(
            CAMPAIGN_TYPES,
            weights=[0.22, 0.25, 0.21, 0.32],
            k=1,
        )[0]
        region = random.choice(REGIONS)
        age = max(18, min(68, int(random.gauss(34, 11))))
        gender = random.choices(GENDERS, weights=[0.49, 0.48, 0.03], k=1)[0]
        campaign_date = start_date + timedelta(days=random.randint(0, 179))
        duration_days = random.choice([7, 10, 14, 21, 30])
        budget = round(random.uniform(350, 5200), 2)

        impressions = int(
            budget * random.uniform(18, 55) * CHANNEL_EFFECT[channel] * random.uniform(0.82, 1.18)
        )
        base_ctr = {
            "Email": 0.045,
            "Social Media": 0.032,
            "Paid Search": 0.052,
            "Display Ads": 0.015,
            "Influencer": 0.025,
        }[channel]
        ctr = max(0.004, random.gauss(base_ctr, base_ctr * 0.22))
        clicks = max(1, int(impressions * ctr))

        conversion_probability = (
            0.052
            * CHANNEL_EFFECT[channel]
            * TYPE_EFFECT[campaign_type]
            * REGION_EFFECT[region]
            * (1.12 if 25 <= age <= 44 else 0.91)
            * random.uniform(0.75, 1.24)
        )
        conversions = max(0, int(clicks * conversion_probability))
        avg_order_value = random.uniform(42, 165) * (1.2 if age >= 35 else 1.0)
        revenue = round(conversions * avg_order_value, 2)
        previous_spend = round(random.lognormvariate(5.6, 0.75), 2)

        rows.append(
            {
                "campaign_id": campaign_id,
                "customer_id": customer_id,
                "campaign_date": campaign_date.isoformat(),
                "channel": channel,
                "campaign_type": campaign_type,
                "region": region,
                "age": age,
                "age_segment": age_segment(age),
                "gender": gender,
                "previous_spend": previous_spend,
                "spend_tier": spend_tier(previous_spend),
                "budget": budget,
                "duration_days": duration_days,
                "impressions": impressions,
                "clicks": clicks,
                "conversions": conversions,
                "revenue": revenue,
                "ctr": round(clicks / impressions, 4) if impressions else 0,
                "conversion_rate": round(conversions / clicks, 4) if clicks else 0,
                "roi": round((revenue - budget) / budget, 4) if budget else 0,
            }
        )

    dirty_rows = [row.copy() for row in rows]
    for pos in [17, 93, 181, 275, 412, 589]:
        dirty_rows[pos]["region"] = ""
    for pos in [24, 168, 391]:
        dirty_rows[pos]["gender"] = " female "
    for pos in [31, 229, 507]:
        dirty_rows[pos]["channel"] = "social media"
    dirty_rows.extend([dirty_rows[12].copy(), dirty_rows[208].copy()])

    return dirty_rows


def clean_rows(rows: list[dict[str, object]]) -> list[dict[str, object]]:
    seen: set[tuple[object, object, object]] = set()
    cleaned: list[dict[str, object]] = []

    for row in rows:
        fixed = row.copy()
        fixed["channel"] = str(fixed["channel"]).strip().title()
        if fixed["channel"] == "Social Media":
            fixed["channel"] = "Social Media"
        fixed["gender"] = str(fixed["gender"]).strip().title()
        fixed["region"] = str(fixed["region"]).strip() or "Unknown"

        key = (fixed["campaign_id"], fixed["customer_id"], fixed["campaign_date"])
        if key in seen:
            continue
        seen.add(key)

        impressions = int(fixed["impressions"])
        clicks = int(fixed["clicks"])
        conversions = int(fixed["conversions"])
        budget = float(fixed["budget"])
        revenue = float(fixed["revenue"])
        fixed["ctr"] = round(clicks / impressions, 4) if impressions else 0
        fixed["conversion_rate"] = round(conversions / clicks, 4) if clicks else 0
        fixed["roi"] = round((revenue - budget) / budget, 4) if budget else 0
        cleaned.append(fixed)

    return cleaned


def write_csv(path: Path, rows: list[dict[str, object]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = list(rows[0].keys())
    with path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    raw_rows = build_rows()
    cleaned_rows = clean_rows(raw_rows)
    write_csv(DATA_DIR / "raw_marketing_campaign_data.csv", raw_rows)
    write_csv(DATA_DIR / "cleaned_marketing_campaign_data.csv", cleaned_rows)
    print(f"Generated {len(raw_rows)} raw rows and {len(cleaned_rows)} cleaned rows.")


if __name__ == "__main__":
    main()
