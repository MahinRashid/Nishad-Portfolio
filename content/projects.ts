export type Project = { slug: string; number: string; title: string; eyebrow: string; summary: string; businessProblem: string; questions: string[]; dataset: string; tools: string[]; process: string[]; kpis: { label: string; value: string; note: string }[]; findings: string[]; recommendations: string[]; limitations: string[]; regions: Record<string, { revenue: string; margin: string; insight: string; values: number[] }>; accent: string; chartLabel: string; verified?: boolean; coverImage?: string; dashboardPlatform?: string; dashboardMeta?: string[]; dashboardGallery?: "theme-pairs" | "showcase"; dashboardImages?: { src: string; alt: string; title?: string; description?: string; width?: number; height?: number }[]; dashboardUrl?: string; githubUrl?: string; notebookUrl?: string };

// Verified work and demonstration studies are explicitly labelled throughout the portfolio.
export const projects: Project[] = [
  {
    slug: "uk-political-donations", number: "01", title: "Who Funds UK Political Parties?", eyebrow: "VERIFIED CASE STUDY · PUBLIC-INTEREST ANALYTICS",
    summary: "A reproducible audit of 65,278 Electoral Commission records, separating private donations from public funding and measuring donor concentration, election-cycle funding and reporting quality.",
    businessProblem: "Can the published donations register be trusted as-is, and how exposed is each party to losing a small number of major donors?",
    questions: ["Which records and dates need correction before analysis?", "Where does party funding come from, and how concentrated is it?", "Do election cycles and recipient types affect reporting patterns?"],
    dataset: "Electoral Commission register of donations: 65,278 records and £1.09B recorded from January 2001 to September 2019.",
    tools: ["Python", "SQL", "Tableau"],
    process: ["Audited dates, missing fields and recipient categories", "Corrected 21,624 Excel-swapped dates", "Merged 942 donor naming variants and separated £164M of public funding", "Built SQL analyses and two interactive Tableau dashboards"],
    kpis: [{ label: "Private party donations", value: "£797M", note: "55,064 accepted records" }, { label: "Dates corrected", value: "21,624", note: "33% of the register" }, { label: "Top-10 dependency", value: "3 parties", note: "More than 50% of funding" }],
    findings: ["SNP, Labour and UKIP received 72%, 60% and 55% of their private funding from their ten largest donors.", "Donations of £100k or more were only 2.7% of records but represented 53% of private party funding.", "The 2017 snap-election quarter set the record at £58.4M, while referendum campaigners reported 61% of gifts after roughly four months."],
    recommendations: ["Publish dates as YYYY-MM-DD so spreadsheet software cannot silently swap day and month.", "Assign stable donor IDs and standardised names to make concentration analysis reliable.", "Track top-10 donor share and focus verification on large gifts and election-period reporting."],
    limitations: ["The register ends in September 2019 and does not cover later elections.", "Name-based merging may combine different individuals who share a name.", "The four-month reporting threshold is an analytical benchmark, not a legal finding."],
    regions: {
      All: { revenue: "£797M", margin: "65,278", insight: "Only £797M of the £1.09B register is private money accepted by political parties.", values: [18, 21, 16, 28, 31, 58] },
      Conservative: { revenue: "£323M", margin: "13%", insight: "Conservative funding is comparatively dispersed: the top ten donors account for 13%.", values: [22, 27, 25, 34, 37, 49] },
      Labour: { revenue: "£281M", margin: "60%", insight: "Trade unions supply 66% of Labour funding; its ten largest donors account for 60%.", values: [17, 20, 22, 30, 33, 46] },
      SNP: { revenue: "£9.8M", margin: "72%", insight: "SNP has the highest major-party concentration, with 72% coming from ten donors.", values: [8, 12, 16, 19, 24, 29] }
    },
    accent: "#d18a15", chartLabel: "UK political funding, 2001–2019", verified: true, dashboardPlatform: "Tableau", dashboardMeta: ["65,278 records", "2001–2019", "Python · SQL · Tableau"], dashboardGallery: "theme-pairs",
    coverImage: "/projects/uk-political-donations/funding-dark.png",
    dashboardImages: [
      { src: "/projects/uk-political-donations/funding-dark.png", alt: "Dark Tableau dashboard showing who funds UK political parties" },
      { src: "/projects/uk-political-donations/trust-dark.png", alt: "Dark Tableau dashboard auditing UK political donations data quality" },
      { src: "/projects/uk-political-donations/funding-light.png", alt: "Light Tableau dashboard showing who funds UK political parties" },
      { src: "/projects/uk-political-donations/trust-light.png", alt: "Light Tableau dashboard auditing UK political donations data quality" }
    ],
    dashboardUrl: "https://public.tableau.com/app/profile/nishad.rashid.mahi/viz/DonationsAcceptedbyPoliticalPartiesinGreatBritainUpdated/WhoFundsUKPoliticalParties2",
    githubUrl: "https://github.com/MahinRashid/UK-Political-Donations-Analysis",
    notebookUrl: "https://github.com/MahinRashid/UK-Political-Donations-Analysis/blob/main/notebooks/analysis.ipynb"
  },
  {
    slug: "ecommerce-revenue-retention", number: "02", title: "Revenue Leakage & Customer Retention", eyebrow: "VERIFIED CASE STUDY · E-COMMERCE ANALYTICS",
    summary: "An end-to-end SQL, Python and Power BI audit of 138,116 online-retail orders, tracing booked revenue to collected cash and identifying discount, delivery and retention risks.",
    businessProblem: "Where is booked revenue leaking before it becomes cash, and which pricing, operational and retention actions should leadership prioritise?",
    questions: ["How much booked revenue is actually collected?", "Are deep discounts producing profitable sales?", "Which customer groups are lapsing, and how much annual revenue is at risk?", "Can the source data and pre-computed KPIs be trusted?"],
    dataset: "Synthetic multi-country e-commerce dataset: 138,116 orders, 397,569 order lines, 25,000 customer records and 1,175 products from January 2021 to December 2025.",
    tools: ["SQL", "Python", "Power BI", "DAX"],
    process: ["Audited joins, duplicate keys, status logic and pre-computed KPIs", "Rebuilt revenue, profit and customer metrics from transaction-level data", "Tested discount, delivery and retention patterns in SQL and Python", "Designed a four-page Power BI report on a star schema with decision-focused recommendations"],
    kpis: [{ label: "Booked revenue", value: "$177.1M", note: "$129.9M collected" }, { label: "Revenue leakage", value: "27%", note: "Never became cash" }, { label: "Annual revenue at risk", value: "$12.2M", note: "4,237 high-value lapsed customers" }],
    findings: ["Only $129.9M of $177.1M booked revenue was collected; $14.3M sits in completed-but-unpaid orders and a further $32.9M is cancelled, returned or pending.", "Every one of the 1,229 loss-making completed orders had a discount above 35%; margin fell from 50.4% at 0–5% discount to 18.4% above 35%.", "New customer acquisition fell 97% from 14,913 completed-order customers in 2021 to 399 in 2025, leaving the business dependent on existing buyers.", "A total of 4,237 high-value lapsed customers represent $12.2M in annual revenue at risk."],
    recommendations: ["Fix order-to-cash controls: investigate $14.3M of unpaid completed orders and resolve 1,997 paid-but-pending orders.", "Cap discounts at 30% and require approval above the threshold; the model estimates a $1.44M five-year profit uplift under stated assumptions.", "Launch a September–October win-back campaign for high-value At Risk and Cannot Lose Them customers before the Q4 peak.", "Reconcile order headers with line items, rebuild customer metrics from transactions and collect marketing-spend data before calculating ROI."],
    limitations: ["The dataset is synthetic, so uniform warehouse, campaign and return patterns may not generalise to a real retailer.", "Impact estimates are directional and depend on stated assumptions; a live rollout should be tested experimentally.", "8.1% of orders do not reconcile with their line items, so order-level and category-level analysis use different source grains.", "The apparent fall in acquisition is partly structural because the customer population is fixed and sign-up dates are unavailable."],
    regions: {
      All: { revenue: "$177.1M", margin: "73.3%", insight: "Only 73.3% of booked revenue was collected, leaving a material order-to-cash gap.", values: [72, 74, 73, 75, 74, 73] },
      Revenue: { revenue: "$129.9M", margin: "$14.3M", insight: "Completed-but-unpaid orders create about $2.8M of new receivables each year.", values: [48, 51, 54, 52, 53, 52] },
      Profit: { revenue: "$59.8M", margin: "41.4%", insight: "Discounts above 35% halve margin and account for every loss-making completed order.", values: [50, 47, 42, 33, 18, 18] },
      Retention: { revenue: "$12.2M", margin: "4,237", insight: "High-value lapsed customers are the clearest near-term retention opportunity.", values: [34, 31, 27, 22, 18, 14] }
    },
    accent: "#c35b3a", chartLabel: "Revenue and retention review, 2021–2025", verified: true, dashboardPlatform: "Power BI", dashboardMeta: ["138,116 orders", "2021–2025", "SQL · Python · Power BI"], dashboardGallery: "showcase",
    coverImage: "/projects/ecommerce-revenue-retention/executive-overview.png",
    dashboardImages: [
      { src: "/projects/ecommerce-revenue-retention/executive-overview.png", alt: "Power BI executive overview showing revenue leakage, collection rate and customer acquisition", title: "Executive overview", description: "Booked revenue, collected cash, margin, retention and five-year trend", width: 1441, height: 808 },
      { src: "/projects/ecommerce-revenue-retention/revenue-leakage.png", alt: "Power BI revenue leakage dashboard showing unpaid, returned and cancelled revenue", title: "Revenue leakage", description: "Order-to-cash breakdown, unpaid completed orders and delivery performance", width: 1439, height: 806 },
      { src: "/projects/ecommerce-revenue-retention/profitability-discounts.png", alt: "Power BI profitability dashboard showing discount bands and loss-making orders", title: "Profitability & discounts", description: "Margin erosion, loss-making orders and category economics", width: 1444, height: 806 },
      { src: "/projects/ecommerce-revenue-retention/customers-retention.png", alt: "Power BI customer retention dashboard showing RFM segments and win-back list", title: "Customers & retention", description: "RFM value segments, lapsed customers and revenue at risk", width: 1444, height: 808 },
      { src: "/projects/ecommerce-revenue-retention/data-model.png", alt: "Power BI star schema connecting customer and date dimensions to order facts", title: "Power BI data model", description: "Star schema connecting date and customer dimensions to order and item facts", width: 1953, height: 802 }
    ],
    githubUrl: "https://github.com/MahinRashid/Ecommerce-Revenue-Retention-Analysis.git"
  },
  {
    slug: "retail-performance-analysis", number: "03", title: "Amazon.in Apparel Operations & Stock Review", eyebrow: "VERIFIED CASE STUDY · E-COMMERCE OPERATIONS",
    summary: "A rebuilt analysis of one Amazon.in apparel seller, connecting 128,975 order lines with stock data to explain falling revenue, fulfilment cancellations and inventory risk.",
    businessProblem: "Should the seller ship orders directly or use Amazon fulfilment—and is working capital tied up in the wrong products?",
    questions: ["Why did net revenue per day fall between April and June?", "Are seller-shipped orders cancelled more often than Amazon-fulfilled orders?", "Which best-selling products are at risk from thin stock?", "Where is excess inventory absorbing working capital?"],
    dataset: "Amazon.in order report with 128,975 order lines from 31 March to 29 June 2022, joined to a separate stock report covering 9,170 SKUs.",
    tools: ["Python", "SQL", "Power BI", "DAX"],
    process: ["Re-audited the raw files and restored 7,795 rows incorrectly removed in the earlier analysis", "Standardised 13 order statuses and merged 69 state spellings into 36 states and territories", "Joined sales to stock by SKU, achieving a 94% match, and calculated weeks of stock cover", "Used SQL, a two-proportion z-test and Power BI to turn operational risks into quantified actions"],
    kpis: [{ label: "Net revenue", value: "₹69.7M", note: "₹78.6M before cancellations" }, { label: "Cancellation rate", value: "14.2%", note: "18,329 order lines" }, { label: "Best-sellers at risk", value: "247", note: "Out of stock or under 2 weeks" }],
    findings: ["Seller-shipped orders were cancelled at 17.5% versus 12.8% for Amazon-fulfilled orders; the 4.7-point gap held across every major category and was statistically significant (p < 0.001).", "Net revenue per day fell 13% from April to June as units per day declined 18%; Sets lost ₹114K per day while Western Dresses gained ₹33K.", "The top 10% of products generated 54% of revenue, yet 247 best-selling SKUs were out of stock or had under two weeks of cover.", "Seventy percent of stock units sat in products with more than a year of cover or no Amazon sales, while 25% of revenue depended on thin stock."],
    recommendations: ["Reorder the 247 at-risk best-sellers first, prioritising the highest-revenue Western Dress styles.", "Move more volume to Amazon fulfilment or correct the seller dispatch process; matching Amazon's cancellation rate could save about 1,840 orders and ₹1.2M per quarter.", "Clear slow stock through markdowns, bundles or other channels and redirect working capital toward proven products.", "Report net revenue consistently, record promotions at order time and capture returns for Amazon-fulfilled orders."],
    limitations: ["The analysis covers thirteen weeks from one seller, so the April–June decline may be partly seasonal.", "The stock report is undated and was treated as an end-of-period snapshot, making stock-cover estimates indicative.", "Stock may sell through other channels, and the source data does not identify who initiated a cancellation.", "The fulfilment gap is an association rather than a causal experiment, and cost data is unavailable for profit analysis."],
    regions: {
      All: { revenue: "₹69.7M", margin: "14.2%", insight: "Revenue is falling while roughly one in seven order lines is cancelled.", values: [86, 84, 82, 78, 76, 74] },
      Fulfilment: { revenue: "17.5%", margin: "12.8%", insight: "Seller-shipped orders cancel 4.7 points more often than Amazon-fulfilled orders.", values: [78, 75, 74, 72, 71, 70] },
      Stock: { revenue: "25%", margin: "247", insight: "A quarter of revenue depends on thin stock, including 247 best-selling SKUs at risk.", values: [88, 82, 76, 70, 65, 59] },
      Demand: { revenue: "₹740K/day", margin: "−13%", insight: "June net revenue per day fell because customers bought fewer units, not cheaper products.", values: [86, 84, 80, 77, 75, 74] }
    },
    accent: "#f7c843", chartLabel: "Amazon.in apparel operations, Apr–Jun 2022", verified: true, dashboardPlatform: "Power BI", dashboardMeta: ["128,975 order lines", "9,170 SKUs", "Python · SQL · Power BI"], dashboardGallery: "showcase",
    coverImage: "/projects/amazon-sales-report/overview.png",
    dashboardImages: [
      { src: "/projects/amazon-sales-report/overview.png", alt: "Power BI overview of Amazon.in apparel revenue, cancellations and category performance", title: "Operations overview", description: "Net revenue, cancellations, demand trend, state mix and category movement", width: 1441, height: 808 },
      { src: "/projects/amazon-sales-report/fulfilment.png", alt: "Power BI fulfilment analysis comparing Amazon-fulfilled and seller-shipped cancellation rates", title: "Fulfilment performance", description: "Cancellation gap by method, category, month and major state", width: 1442, height: 811 },
      { src: "/projects/amazon-sales-report/stock-products.png", alt: "Power BI stock and product analysis showing thin-stock risk and slow inventory", title: "Stock & products", description: "Stock cover, best-seller exposure, size risk and reorder priorities", width: 1440, height: 811 }
    ],
    githubUrl: "https://github.com/MahinRashid/Amazon-Sales-Report.git",
    notebookUrl: "https://github.com/MahinRashid/Amazon-Sales-Report/blob/main/notebooks/analysis.ipynb"
  },
  {
    slug: "walmart-sales-trend", number: "04", title: "Walmart Sales Trend · 2010–2012", eyebrow: "VERIFIED CASE STUDY · RETAIL PERFORMANCE",
    summary: "An end-to-end retail analysis of 45 Walmart stores that corrects a misleading holiday flag and shows when sales peak, which stores drive performance and what should inform the forecast.",
    businessProblem: "How should regional leadership plan inventory, staffing and promotions when the raw holiday calendar misses the biggest sales week of the year?",
    questions: ["Which holidays actually lift sales, and by how much?", "Which stores generate revenue and which are gaining or losing momentum?", "Does the holiday peak vary by store?", "Do temperature, fuel price, CPI or unemployment explain weekly sales?"],
    dataset: "Walmart weekly sales dataset covering 45 stores, 143 weeks and 6,435 complete store-week records from 5 February 2010 to 26 October 2012.",
    tools: ["SQL", "Python", "Excel", "Tableau"],
    process: ["Validated row counts, dates, duplicates and complete store histories across SQL and Python", "Corrected the holiday calendar after finding that the source missed the pre-Christmas peak and flagged the week after Christmas", "Built ten SQL analyses with CTEs, window functions, Pareto logic and Pearson correlation", "Cross-checked every result in pandas and formula-driven Excel before designing Tableau and web dashboards"],
    kpis: [{ label: "Total sales", value: "$6.74B", note: "45 stores · 143 weeks" }, { label: "Average week", value: "$47.11M", note: "Across 6,435 store-weeks" }, { label: "Pre-Christmas lift", value: "70.3%", note: "Missed by the raw holiday flag" }],
    findings: ["The pre-Christmas week averaged $79.0M—70.3% above a regular week—but was not flagged as a holiday; the week marked Christmas was 6.7% below normal.", "Only pre-Christmas (+70.3%) and Thanksgiving (+42.8%) produced material lift; Super Bowl and Labor Day behaved close to regular weeks.", "Thirty-seven of 45 stores grew in 2012, but Store 14—Walmart's third-largest store in this data—lost $7.3M and accounted for about half the decline across eight falling stores.", "Temperature, fuel price, CPI and unemployment had correlations between −0.11 and +0.01 with weekly sales, far weaker than store history and calendar effects."],
    recommendations: ["Fix the reporting and forecasting calendar so Thanksgiving through 24 December is treated as the peak period.", "Concentrate staffing, stock and promotion budgets on the two weeks that produce genuine holiday lift, then plan lighter January schedules and clearance activity.", "Review Store 14 and Store 36 operationally, while studying Stores 38, 44 and 39 for practices that can transfer.", "Allocate holiday inventory using each store's own 1.0x–2.05x peak multiplier and forecast from store history and calendar effects rather than weak macro variables."],
    limitations: ["The history covers 2.75 years and only two complete holiday seasons, so event lift estimates rely on two to three observations.", "The dataset has no product, department, margin, traffic or store-size fields, limiting diagnosis of why individual stores changed.", "Correlation does not establish causation, and the weak macro relationships apply only to this period and store mix.", "The fixed pre-Christmas date rule should be validated against future years before production forecasting."],
    regions: {
      All: { revenue: "$6.74B", margin: "$47.11M", insight: "Two calendar spikes carry an otherwise flat year, and the raw holiday flag hides the largest one.", values: [47, 46, 48, 46, 66, 79] },
      Holidays: { revenue: "+70.3%", margin: "+42.8%", insight: "Pre-Christmas and Thanksgiving are the only holiday periods with meaningful sales lift.", values: [47, 48, 47, 49, 66, 79] },
      Stores: { revenue: "37 growing", margin: "8 declining", insight: "Store 14 lost $7.3M while Stores 38, 44 and 39 led percentage growth.", values: [58, 63, 69, 74, 82, 88] },
      Forecast: { revenue: "|r| < 0.11", margin: "4 factors", insight: "Calendar and store history matter more than temperature, fuel, CPI or unemployment.", values: [54, 53, 52, 52, 51, 50] }
    },
    accent: "#ffc220", chartLabel: "Walmart weekly sales, 2010–2012", verified: true, dashboardPlatform: "Tableau + Web", dashboardMeta: ["45 stores", "6,435 store-weeks", "SQL · Python · Excel · Tableau"], dashboardGallery: "showcase",
    coverImage: "/projects/walmart-sales-trend/dashboard.png",
    dashboardImages: [
      { src: "/projects/walmart-sales-trend/dashboard.png", alt: "Walmart sales trend dashboard showing holiday lift, store momentum and weak macro correlations", title: "Walmart sales trend", description: "Holiday timing, monthly seasonality, store momentum and forecast drivers", width: 1199, height: 799 }
    ],
    dashboardUrl: "https://public.tableau.com/app/profile/nishad.rashid.mahi/viz/WalmartSalesTrend_17909847883980/Dashboard1",
    githubUrl: "https://github.com/MahinRashid/Walmart-Sales-Trend.git",
    notebookUrl: "https://github.com/MahinRashid/Walmart-Sales-Trend/blob/main/notebooks/walmart_sales_analysis.ipynb"
  },
  {
    slug: "maternity-health-risk", number: "05", title: "Maternal Health Risk Screening", eyebrow: "VERIFIED CASE STUDY · RESPONSIBLE MACHINE LEARNING",
    summary: "An honestly tested maternal-risk screening model that removes duplicate leakage, prioritises the cost of missed high-risk mothers and explains how far the result can—and cannot—be trusted.",
    businessProblem: "Can a community health worker use six quickly measured vital signs to identify which mothers need attention first without overstating the model's reliability?",
    questions: ["How much does duplicate leakage inflate apparent model accuracy?", "Which model best balances accuracy with high-risk detection?", "What referral threshold reduces dangerous false negatives?", "Which measurements drive the prediction, and where does the model fail?"],
    dataset: "UCI Maternal Health Risk dataset from rural Bangladesh: 1,014 rows reduced to 452 distinct records after auditing exact duplicates, conflicting labels and implausible readings.",
    tools: ["Python", "scikit-learn", "pandas", "Tableau"],
    process: ["Collapsed 562 exact duplicate rows while retaining copy counts and grouped identical readings with conflicting labels", "Used repeated grouped cross-validation so identical readings never appeared in both training and test folds", "Compared five models and simple clinical baselines, then selected a random forest based on unseen-record performance", "Set a 10% referral threshold from the cost of missing a high-risk mother and translated predictions into three triage bands"],
    kpis: [{ label: "Mothers screened", value: "452", note: "Distinct records" }, { label: "High-risk mothers caught", value: "96%", note: "108 of 112 flagged" }, { label: "High-risk mothers missed", value: "4", note: "At the screening threshold" }],
    findings: ["Removing duplicate leakage reduced measured accuracy from 81% to 72%; with duplicates left in, 80% of test rows had an identical copy in the training data.", "At the default 50% threshold the model missed 25 of 112 high-risk mothers; lowering the screening threshold to 10% reduced misses to four while flagging 43% of mothers for review.", "Blood sugar and blood pressure produced 71% of the full model's 72% accuracy, while age, temperature and heart rate added only two points.", "Mid-risk classification remained weak at 24% because the six available vital signs overlap heavily between low- and mid-risk records."],
    recommendations: ["Use the model only as a screening aid to support review, never as a diagnosis or autonomous care decision.", "Use the 10% referral threshold when the priority is reducing missed high-risk mothers, with clinical review for every flagged case.", "Prioritise reliable glucose and blood-pressure measurement because those readings carry most of the predictive signal.", "Improve data capture and collect pregnancy-specific variables—such as gestational age, history and urine protein—before attempting real-world validation."],
    limitations: ["This is a portfolio project, not a medical device; it has not been clinically validated and must not be used for patient-care decisions.", "The analysis uses 452 distinct records from one region, so results may not generalise to other populations or clinical settings.", "The source does not explain how labels were assigned, and 35 sets of identical readings carry conflicting risk labels.", "Patient IDs, dates, gestational age, medical history and several clinically important measurements are unavailable."],
    regions: {
      All: { revenue: "452", margin: "96%", insight: "At the screening threshold, the model flags 108 of 112 high-risk mothers and misses four.", values: [52, 67, 72, 80, 91, 96] },
      Triage: { revenue: "57% routine", margin: "4 missed", insight: "The model clears 257 mothers for routine care, but four of them are actually high risk.", values: [96, 88, 76, 64, 57, 57] },
      Model: { revenue: "72%", margin: "0.64 F1", insight: "Grouped testing gives a more honest result than the leakage-inflated 81% score.", values: [52, 54, 67, 69, 71, 72] },
      Drivers: { revenue: "71%", margin: "2 readings", insight: "Blood sugar and blood pressure provide nearly all of the model's predictive performance.", values: [64, 68, 71, 71, 72, 72] }
    },
    accent: "#be185d", chartLabel: "Maternal health screening performance", verified: true, dashboardPlatform: "Tableau", dashboardMeta: ["452 distinct records", "Repeated grouped CV", "Python · scikit-learn · Tableau"], dashboardGallery: "showcase",
    coverImage: "/projects/maternity-health-risk/dashboard.png",
    dashboardImages: [
      { src: "/projects/maternity-health-risk/dashboard.png", alt: "Maternal health risk Tableau dashboard showing triage bands, high-risk capture and model limitations", title: "Maternal risk triage", description: "Triage bands, sugar and pressure patterns, age profiles and honest testing limits", width: 1198, height: 819 }
    ],
    dashboardUrl: "https://public.tableau.com/app/profile/nishad.rashid.mahi/viz/MaternalHealthRiskTriage/Dashboard1",
    githubUrl: "https://github.com/MahinRashid/Maternity-Health-Risk.git"
  }
];
export const expertise = { Analytics: ["SQL", "Python", "Excel", "Tableau", "Power BI"], Business: ["KPI Development", "Requirements Analysis", "Business Reporting", "Process Improvement", "Stakeholder Communication"], "Project & Delivery": ["Project Management", "Agile", "Risk Management", "Cross-functional Collaboration"] };
