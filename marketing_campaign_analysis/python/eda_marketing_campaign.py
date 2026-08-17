from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "cleaned_marketing_campaign_data.csv"
FIGURE_DIR = ROOT / "outputs" / "figures"


def save_plot(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    plt.tight_layout()
    plt.savefig(path, dpi=160, bbox_inches="tight")
    plt.close()


def main() -> None:
    df = pd.read_csv(DATA_PATH, parse_dates=["campaign_date"])
    FIGURE_DIR.mkdir(parents=True, exist_ok=True)

    print("Dataset shape:", df.shape)
    print("\nMissing values:")
    print(df.isna().sum())

    kpis = {
        "total_budget": df["budget"].sum(),
        "total_revenue": df["revenue"].sum(),
        "overall_ctr": df["clicks"].sum() / df["impressions"].sum(),
        "overall_conversion_rate": df["conversions"].sum() / df["clicks"].sum(),
        "overall_roi": (df["revenue"].sum() - df["budget"].sum()) / df["budget"].sum(),
    }
    print("\nOverall KPIs:")
    for metric, value in kpis.items():
        print(f"{metric}: {value:,.4f}")

    channel_summary = (
        df.groupby("channel", as_index=False)
        .agg(
            budget=("budget", "sum"),
            revenue=("revenue", "sum"),
            impressions=("impressions", "sum"),
            clicks=("clicks", "sum"),
            conversions=("conversions", "sum"),
        )
        .assign(
            ctr=lambda data: data["clicks"] / data["impressions"],
            conversion_rate=lambda data: data["conversions"] / data["clicks"],
            roi=lambda data: (data["revenue"] - data["budget"]) / data["budget"],
        )
        .sort_values("roi", ascending=False)
    )
    print("\nChannel performance:")
    print(channel_summary)

    numeric_cols = [
        "budget",
        "duration_days",
        "impressions",
        "clicks",
        "conversions",
        "revenue",
        "ctr",
        "conversion_rate",
        "roi",
        "previous_spend",
    ]

    plt.figure(figsize=(10, 7))
    sns.heatmap(df[numeric_cols].corr(), annot=True, cmap="BrBG", center=0, fmt=".2f")
    plt.title("Correlation Matrix: Budget, Engagement, Conversion, Revenue")
    save_plot(FIGURE_DIR / "correlation_heatmap.png")

    plt.figure(figsize=(8, 5))
    sns.histplot(df["previous_spend"], bins=35, kde=True, color="#287D8E")
    plt.title("Customer Previous Spend Distribution")
    plt.xlabel("Previous Spend")
    save_plot(FIGURE_DIR / "customer_spend_distribution.png")

    plt.figure(figsize=(9, 5))
    sns.boxplot(data=df, x="channel", y="roi", hue="channel", palette="Set2", legend=False)
    plt.title("Campaign ROI Spread by Channel")
    plt.xlabel("Channel")
    plt.ylabel("ROI")
    plt.xticks(rotation=20)
    save_plot(FIGURE_DIR / "roi_by_channel_boxplot.png")

    plt.figure(figsize=(8, 5))
    sns.scatterplot(
        data=df,
        x="budget",
        y="conversions",
        hue="channel",
        size="revenue",
        sizes=(20, 220),
        alpha=0.75,
    )
    plt.title("Budget vs Conversions")
    plt.xlabel("Budget")
    plt.ylabel("Conversions")
    save_plot(FIGURE_DIR / "budget_vs_conversions_scatter.png")

    monthly = (
        df.assign(month=df["campaign_date"].dt.to_period("M").astype(str))
        .groupby("month", as_index=False)
        .agg(budget=("budget", "sum"), revenue=("revenue", "sum"), conversions=("conversions", "sum"))
    )
    plt.figure(figsize=(9, 5))
    sns.lineplot(data=monthly, x="month", y="revenue", marker="o", label="Revenue")
    sns.lineplot(data=monthly, x="month", y="budget", marker="o", label="Budget")
    plt.title("Monthly Budget vs Revenue Trend")
    plt.xlabel("Month")
    plt.ylabel("Amount")
    plt.xticks(rotation=30)
    save_plot(FIGURE_DIR / "monthly_budget_revenue_trend.png")

    segment_summary = (
        df.groupby(["age_segment", "spend_tier"], as_index=False)
        .agg(budget=("budget", "sum"), revenue=("revenue", "sum"), clicks=("clicks", "sum"), conversions=("conversions", "sum"))
        .assign(
            conversion_rate=lambda data: data["conversions"] / data["clicks"],
            roi=lambda data: (data["revenue"] - data["budget"]) / data["budget"],
        )
        .sort_values(["roi", "revenue"], ascending=False)
        .head(10)
    )
    print("\nTop customer segments:")
    print(segment_summary)

    print(f"\nCharts saved to: {FIGURE_DIR}")


if __name__ == "__main__":
    main()
