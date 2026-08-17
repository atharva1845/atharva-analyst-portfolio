export const roles = ["Data Analyst", "Business Analyst", "AI ML Enthusiast"];

export const skills = [
  {
    title: "Data Analytics",
    accent: "from-teal-400 to-cyan-500",
    items: ["Python","SQL", "Excel", "Power BI", "Pandas", "NumPy"],
  },
  {
    title: "Visualization",
    accent: "from-blue-400 to-indigo-500",
    items: ["Power BI", "Tableau", "Matplotlib", "Seaborn"],
  },
  {
    title: "Machine Learning",
    accent: "from-fuchsia-400 to-rose-500",
    items: ["Scikit-learn", "TensorFlow", "RAG systems"],
  },
  {
    title: "Tools",
    accent: "from-amber-300 to-orange-500",
    items: ["Git", "Google Colab","Jupyter Notebook", "VS Code", "AWS (Basics)"],
  },
  {
    title: "Business",
    accent: "from-emerald-400 to-lime-500",
    items: [
      "Market Research",
      "Data-Driven Decision Making",
      "Business Analysis",
      "Problem Solving",
      "Process Improvement",
      "Reporting",
      "Stakeholder Management & Communication",
      "CRM HubSpot",
    ],
  },
];

export const projects = [
  {
    slug: "bank-customer-churn-analysis",
    title: "Bank Customer Churn Analysis",
    eyebrow: "Predictive retention",
    problem: "Identifying customers likely to leave before revenue leakage becomes visible.",
    tools: ["Python", "Pandas", "ML"],
    color: "from-teal-300 via-cyan-400 to-blue-500",
    impact: "Mapped churn risk into clear retention actions for high-value customer cohorts.",
    insights: [
      "Balance, tenure, age, and activity level emerged as key churn signals.",
      "High-risk customer segments were grouped by behavior instead of only demographics.",
      "Retention actions were prioritized by expected business value and effort.",
    ],
    story: [
      "The work starts with a business question: which customers are likely to leave, and what can the bank do before that happens?",
      "After cleaning the customer dataset, the analysis compares churn patterns across balance, age, tenure, activity, geography, and product usage.",
      "The final output converts model findings into retention recommendations that a CRM or customer success team can act on.",
    ],
    metrics: [
      ["Risk segments", "4"],
      ["Primary drivers", "6"],
      ["Action themes", "3"],
    ],
  },
  {
    slug: "olist-ecommerce-analysis",
    title: "OList E-commerce Analysis",
    eyebrow: "Revenue and delivery intelligence",
    problem: "Understanding sales, category, and delivery performance across an e-commerce marketplace.",
    tools: ["SQL", "Power BI"],
    color: "from-blue-300 via-indigo-400 to-violet-500",
    impact: "Turned order-level marketplace data into operational and category-level decisions.",
    insights: [
      "Revenue trends showed category and seasonality shifts across order periods.",
      "Delivery delays exposed friction points between approval, shipping, and customer receipt.",
      "Category performance helped separate volume leaders from margin and service risks.",
    ],
    story: [
      "The analysis connects customer orders, products, sellers, payments, and logistics tables through SQL.",
      "Power BI dashboards then translate those joins into marketplace views for revenue, delivery health, and category contribution.",
      "The result is a practical performance story for business, operations, and merchandising teams.",
    ],
    metrics: [
      ["Data tables", "8"],
      ["Business views", "5"],
      ["Decision themes", "4"],
    ],
  },
  {
    slug: "marketing-campaign-analysis",
    title: "Marketing Campaign Analysis",
    eyebrow: "Conversion strategy",
    problem: "Evaluating campaign effectiveness across audience, channel, spend, and conversion behavior.",
    tools: ["Excel", "Python"],
    color: "from-rose-300 via-pink-400 to-fuchsia-500",
    impact: "Separated high-performing audiences from expensive low-conversion segments.",
    insights: [
      "Conversion trends revealed which audience groups responded consistently.",
      "ROI analysis highlighted where spend efficiency improved or dropped.",
      "Audience patterns supported clearer targeting and follow-up recommendations.",
    ],
    story: [
      "This project treats marketing as a funnel, not only a reporting table.",
      "Campaign data is cleaned, grouped, and compared across channel, spend, response, and conversion outcomes.",
      "The final readout is built for campaign managers who need budget and targeting decisions quickly.",
    ],
    metrics: [
      ["Funnel stages", "5"],
      ["Audience cuts", "7"],
      ["ROI views", "3"],
    ],
  },
  {
    slug: "hr-attrition-analysis",
    title: "HR Attrition Analysis",
    eyebrow: "People analytics",
    problem: "Reducing employee turnover by finding patterns behind attrition risk.",
    tools: ["Power BI", "SQL"],
    color: "from-amber-300 via-orange-400 to-red-500",
    impact: "Converted HR data into retention strategy themes for department leaders.",
    insights: [
      "Attrition drivers were compared across department, role, tenure, and satisfaction signals.",
      "Department-level trends showed where turnover risk was concentrated.",
      "Retention strategies were framed as manager-ready action areas.",
    ],
    story: [
      "The analysis begins by joining employee records into a reliable attrition model-ready dataset.",
      "Power BI views make attrition visible by department, role, tenure, age band, and performance context.",
      "The output keeps the story human: which employee groups need support, and what interventions are realistic?",
    ],
    metrics: [
      ["Departments", "6"],
      ["Risk factors", "8"],
      ["Retention plays", "4"],
    ],
  },
];

export const experiences = [
  {
    company: "SwitchiT",
    role: "Product Management Intern",
    points: [
      "Built AI automation workflows",
      "Market research and competitor analysis",
      "150+ outreach, 5+ conversions",
    ],
  },
  {
    company: "Infosys Springboard",
    role: "Macahine Learning Intern",
    points: ["AI visa eligibility system", "Data preprocessing and evaluation"],
  },
  {
    company: "Shark Exports",
    role: "Business Development Intern",
    points: ["Pricing analysis", "Market research", "Export operations"],
  },
];
