export const siteMeta = {
  name: "Atharva Rajoba",
  title: "Business Analyst | Product Analyst | Data Analyst",
  tagline: "Turning business questions into clear, evidence-backed decisions.",
  location: "Jaipur, India",
  availability: "Open to analyst opportunities",
};

export const roles = ["Business Analyst", "Product Analyst", "Data Analyst"];

export const credibility = [
  { value: "150+", label: "Prospects engaged" },
  { value: "5", label: "Conversions supported" },
  { value: "100K+", label: "Records analyzed" },
  { value: "2", label: "Research publications" },
];

export const profilePillars = [
  {
    title: "Business Analyst",
    focus: "Requirements, process mapping, research, and decision support.",
    evidence: "Workflow documentation, competitor analysis, pricing, and stakeholder coordination.",
    accent: "teal",
  },
  {
    title: "Product Analyst",
    focus: "User problems, product workflows, validation, and measurable outcomes.",
    evidence: "SwiftVisa product flows, AI automation design, testing, and issue analysis.",
    accent: "blue",
  },
  {
    title: "Data Analyst",
    focus: "SQL, Python, Excel, Power BI, and analytical storytelling.",
    evidence: "Customer, procurement, mobility, marketing, and marketplace analytics.",
    accent: "amber",
  },
];

export const skills = [
  {
    title: "Business Analysis",
    summary: "Define the problem before choosing the tool.",
    accent: "from-teal-400 to-emerald-400",
    items: [
      "Requirement Gathering",
      "Process Mapping",
      "Market Research",
      "Competitor Analysis",
      "Stakeholder Communication",
      "Documentation",
    ],
  },
  {
    title: "Product & Operations",
    summary: "Connect user needs with workflows and execution.",
    accent: "from-blue-400 to-cyan-400",
    items: [
      "Product Discovery",
      "Workflow Design",
      "Process Improvement",
      "Testing & Validation",
      "CRM (HubSpot)",
      "Reporting",
    ],
  },
  {
    title: "Data & BI",
    summary: "Turn raw records into reliable decision views.",
    accent: "from-amber-300 to-orange-400",
    items: ["SQL", "Excel", "Power BI", "Python", "Pandas", "NumPy", "DAX"],
  },
  {
    title: "Applied AI",
    summary: "Use machine learning where it improves the decision.",
    accent: "from-rose-400 to-fuchsia-400",
    items: ["Scikit-learn", "TensorFlow", "RAG Systems", "LLMs", "Semantic Retrieval"],
  },
];

export const projects = [
  {
    slug: "swiftvisa-ai-eligibility-platform",
    title: "SwiftVisa",
    eyebrow: "Product analysis + applied AI",
    problem: "Visa applicants face fragmented rules and unclear eligibility decisions across destinations.",
    role: "Product and ML Analyst",
    scope: "Eligibility workflow, retrieval logic, validation, and product documentation",
    stakeholders: ["Applicants", "Product team", "Reviewers"],
    tools: ["Python", "RAG", "LLMs", "Streamlit"],
    color: "from-teal-300 via-cyan-400 to-blue-500",
    impact: "Structured a complex policy journey into a testable eligibility experience with evidence-aware responses.",
    repository: "https://github.com/atharva1845/ai_swift_visa_screening_test",
    featured: true,
    insights: [
      "Mapped applicant inputs to an understandable eligibility workflow instead of exposing model complexity.",
      "Used semantic retrieval to ground responses in relevant visa criteria and reduce unsupported answers.",
      "Documented test cases, response issues, and evaluation observations for iterative product improvement.",
    ],
    story: [
      "SwiftVisa began as a product problem: people need a fast first-pass eligibility view, but visa criteria are lengthy, contextual, and easy to misread.",
      "The solution combines a structured applicant flow with retrieval-augmented generation so the response is connected to relevant policy information.",
      "My contribution covered workflow framing, data preparation, testing, evaluation, issue analysis, and documentation across the product and ML layers.",
    ],
    metrics: [
      ["Core system", "RAG"],
      ["Decision layer", "LLM"],
      ["Quality loop", "QA"],
    ],
    artifacts: ["Eligibility flow", "Retrieval pipeline", "Test cases", "Evaluation notes"],
    recommendations: [
      "Add policy-source citations and response confidence indicators.",
      "Expand scenario testing for edge cases and incomplete applicant data.",
      "Track failed searches and unclear outcomes as product learning signals.",
    ],
  },
  {
    slug: "vendor-risk-procurement-analytics",
    title: "Vendor Risk & Procurement Analytics",
    eyebrow: "Business intelligence",
    problem: "Procurement teams need a clear view of vendor reliability, spend concentration, and delivery risk.",
    role: "Business and Data Analyst",
    scope: "3,000+ procurement records across supplier, spend, delivery, and risk dimensions",
    stakeholders: ["Procurement", "Operations", "Finance"],
    tools: ["SQL Server", "Power BI", "DAX", "Excel"],
    color: "from-blue-300 via-indigo-400 to-violet-500",
    impact: "Converted supplier records into a decision view for vendor comparison, risk prioritization, and procurement planning.",
    repository: null,
    featured: true,
    insights: [
      "Segmented vendors by delivery reliability, spend exposure, and issue frequency.",
      "Highlighted suppliers where business dependence and operational risk overlapped.",
      "Created KPI views that support vendor reviews and sourcing conversations.",
    ],
    story: [
      "Procurement data is useful only when it helps teams decide which supplier relationships need attention.",
      "The analysis models supplier, purchase, delivery, spend, and issue data into a consistent SQL layer before presenting the results in Power BI.",
      "The final dashboard separates routine performance monitoring from vendors that require a deeper risk or sourcing review.",
    ],
    metrics: [
      ["Records", "3K+"],
      ["Primary view", "Risk"],
      ["Output", "BI"],
    ],
    artifacts: ["SQL data model", "Vendor scorecard", "Risk matrix", "Power BI report"],
    recommendations: [
      "Review high-dependence vendors on a recurring risk cadence.",
      "Separate price performance from delivery and quality performance.",
      "Define escalation thresholds for repeated delays and quality issues.",
    ],
  },
  {
    slug: "ola-ride-analytics",
    title: "OLA Ride Analytics",
    eyebrow: "Operations analytics",
    problem: "Ride-hailing operations need visibility into booking demand, cancellations, payments, and service quality.",
    role: "Data Analyst",
    scope: "100K+ ride bookings across operations, customer, vehicle, and payment dimensions",
    stakeholders: ["Operations", "Customer experience", "Business leadership"],
    tools: ["SQL", "Power BI", "Excel", "DAX"],
    color: "from-emerald-300 via-teal-400 to-cyan-500",
    impact: "Built a multi-page operations dashboard that makes booking and cancellation patterns easier to investigate.",
    repository: "https://github.com/atharva1845/ola-dashboard-powerbi",
    featured: true,
    insights: [
      "Compared booking value and demand patterns across vehicle types and time periods.",
      "Separated customer and driver cancellation reasons to reveal different intervention paths.",
      "Connected payment behavior and rating trends to service-performance monitoring.",
    ],
    story: [
      "The project treats every ride as an operational journey rather than a single completed-or-cancelled record.",
      "SQL and Excel prepare the booking data, while DAX measures support interactive Power BI views for demand, cancellations, payments, vehicle mix, and ratings.",
      "The result gives an operations team a practical path from a KPI change to the underlying driver.",
    ],
    metrics: [
      ["Bookings", "100K+"],
      ["Experience", "5 views"],
      ["Output", "Power BI"],
    ],
    artifacts: ["SQL analysis", "DAX measures", "Multi-page dashboard", "KPI definitions"],
    recommendations: [
      "Track cancellation causes separately by customer and driver ownership.",
      "Review high-demand periods against fulfillment and service ratings.",
      "Use vehicle-level views to support supply planning.",
    ],
  },
  {
    slug: "bank-customer-churn-analysis",
    title: "Bank Customer Churn Analysis",
    eyebrow: "Customer retention",
    problem: "Customer teams need to identify likely churners and understand which behaviors deserve intervention.",
    role: "Data Analyst",
    scope: "10,000+ customer records across demographic, account, product, and activity attributes",
    stakeholders: ["Customer success", "Marketing", "Business leadership"],
    tools: ["Python", "SQL", "Excel", "Power BI"],
    color: "from-amber-300 via-orange-400 to-rose-500",
    impact: "Translated churn patterns into customer segments and practical retention priorities.",
    repository: null,
    featured: false,
    insights: [
      "Balance, tenure, age, activity, and product usage emerged as useful churn signals.",
      "Grouped customers by behavior and value to avoid one-size-fits-all retention actions.",
      "Framed intervention ideas around risk, customer value, and likely effort.",
    ],
    story: [
      "The work starts with a business question: which customers are likely to leave, and what can the bank do before that happens?",
      "After cleaning and exploring the data, churn is compared across customer value, activity, products, tenure, and demographic factors.",
      "The final output turns analytical findings into retention segments that a CRM or customer team can use.",
    ],
    metrics: [
      ["Customers", "10K+"],
      ["Focus", "Retention"],
      ["Output", "Segments"],
    ],
    artifacts: ["Exploratory analysis", "SQL queries", "Risk segments", "Retention recommendations"],
    recommendations: [
      "Prioritize active, high-value customers showing new risk signals.",
      "Test different interventions by behavior segment.",
      "Monitor segment movement instead of relying on a one-time score.",
    ],
  },
  {
    slug: "olist-ecommerce-analysis",
    title: "Olist E-commerce Analysis",
    eyebrow: "Marketplace performance",
    problem: "Marketplace leaders need one view of revenue, category performance, delivery quality, and customer experience.",
    role: "Business Intelligence Analyst",
    scope: "100K+ orders connected across customers, sellers, products, payments, and logistics",
    stakeholders: ["Marketplace operations", "Category teams", "Leadership"],
    tools: ["SQL", "Power BI", "Python"],
    color: "from-violet-300 via-fuchsia-400 to-rose-500",
    impact: "Connected fragmented marketplace tables into a performance story spanning growth and fulfillment.",
    repository: null,
    featured: false,
    insights: [
      "Revenue and order trends exposed seasonal and category-level movement.",
      "Delivery delays revealed friction between approval, shipping, and customer receipt.",
      "Category views distinguished volume leaders from customer-experience risks.",
    ],
    story: [
      "The analysis joins customer, order, product, seller, payment, review, and logistics data into a reliable marketplace model.",
      "Performance views connect commercial growth with delivery quality instead of treating them as separate reporting stories.",
      "The result supports business, operations, and category teams with a shared set of marketplace signals.",
    ],
    metrics: [
      ["Orders", "100K+"],
      ["Model", "8 tables"],
      ["Focus", "Marketplace"],
    ],
    artifacts: ["Relational data model", "SQL analysis", "Performance dashboard", "Business summary"],
    recommendations: [
      "Investigate high-volume categories with weak delivery or review performance.",
      "Track late-delivery risk by seller and geography.",
      "Use commercial and customer-experience KPIs together in category reviews.",
    ],
  },
  {
    slug: "marketing-campaign-analysis",
    title: "Marketing Campaign Analysis",
    eyebrow: "Growth analytics",
    problem: "Marketing teams need to compare channel efficiency, audience response, and conversion outcomes before reallocating budget.",
    role: "Marketing Data Analyst",
    scope: "45K+ customer interactions across channel, spend, conversion, and audience dimensions",
    stakeholders: ["Marketing", "Growth", "Business leadership"],
    tools: ["Python", "SQL", "Excel", "Power BI"],
    color: "from-rose-300 via-pink-400 to-fuchsia-500",
    impact: "Created a reproducible analysis workflow and dashboard for channel, segment, and ROI comparison.",
    repository: "https://github.com/atharva1845/atharva-analyst-portfolio/tree/main/marketing_campaign_analysis",
    featured: false,
    insights: [
      "Compared conversion and ROI patterns across channels and customer segments.",
      "Separated efficient growth from high-spend, low-response activity.",
      "Used monthly trend and audience views to frame budget and targeting questions.",
    ],
    story: [
      "The project treats campaign reporting as a repeatable analysis system rather than a one-off chart.",
      "A documented workflow generates data, cleans and explores it with Python, queries it with SQL, and produces an Excel dashboard and visual outputs.",
      "The final readout helps a marketing team compare where spend is working, for whom, and over which periods.",
    ],
    metrics: [
      ["Interactions", "45K+"],
      ["Focus", "ROI"],
      ["Workflow", "Reproducible"],
    ],
    artifacts: ["Clean dataset", "EDA notebook logic", "SQL queries", "Excel dashboard"],
    recommendations: [
      "Evaluate budget changes by both ROI and conversion volume.",
      "Build audience-specific channel tests instead of broad reallocations.",
      "Monitor monthly efficiency to distinguish trends from short-term spikes.",
    ],
  },
];

export const experiences = [
  {
    company: "SwitchiT",
    role: "Product Management Intern",
    period: "Jan 2026 - Present",
    summary: "Supporting product discovery, process improvement, and go-to-market execution for AI-enabled workflows.",
    points: [
      "Gathered requirements and translated workflows into process flows and product documentation.",
      "Researched markets and competitors to support positioning and feature decisions.",
      "Contributed to 150+ prospect outreach efforts that supported 5 conversions.",
    ],
  },
  {
    company: "Infosys Springboard",
    role: "Machine Learning Intern",
    period: "Oct 2025 - Dec 2025",
    summary: "Worked across product logic, data preparation, and evaluation for the SwiftVisa eligibility experience.",
    points: [
      "Built an AI visa eligibility workflow using retrieval, semantic search, and LLM response generation.",
      "Prepared and validated data used by the eligibility and retrieval pipeline.",
      "Documented test cases, response issues, and evaluation findings for quality improvement.",
    ],
  },
  {
    company: "Shark Exports",
    role: "Business Development & Operations Intern",
    period: "May 2025 - Aug 2025",
    summary: "Supported market research, commercial analysis, and export operations for African markets.",
    points: [
      "Researched market demand, competitor positioning, and prospect opportunities.",
      "Supported pricing analysis, quotations, and client proposal preparation.",
      "Coordinated export documentation, shipment workflows, and compliance reporting.",
    ],
  },
];

export const research = [
  {
    title: "Shor's Algorithm",
    venue: "Springer publication | ISBM, Bangkok | 2025",
    detail: "Research exploring quantum factorization and the implications of Shor's algorithm for modern cryptography.",
    signal: "International conference",
  },
  {
    title: "Fake News Detection",
    venue: "Springer publication | MCT4SD | 2025",
    detail: "Machine learning research on reliable fake-news classification and model evaluation.",
    signal: "ROC-AUC 0.9996",
  },
];

export const education = {
  institution: "Manipal University Jaipur",
  degree: "B.Tech in Computer Science Engineering",
  specialization: "IoT & Intelligent Systems",
  period: "2022 - 2026",
  cgpa: "6.96",
};

export const certifications = [
  "Google Data Analytics Professional Certificate",
  "IBM Data Analysis and Visualization Foundations",
  "IBM Introduction to Machine Learning",
  "Operations Management",
];

export const contact = {
  email: "atharva2004.rajoba@gmail.com",
  phoneDisplay: "+91 93220 01716",
  phoneHref: "+919322001716",
  linkedin: "https://www.linkedin.com/in/atharva-rajoba",
  github: "https://github.com/atharva1845",
};
