/**
 * Site Data — Yingda Yu V2
 * All content is driven from this file.
 * Update content here; the UI renders automatically.
 */

const SITE_DATA = {

  profile: {
    name: "Yingda Yu",
    roles: "Founder · AI Builder · Researcher",
    tagline: "I build intelligent systems across research, products, and the real world.",
    description:
      "Founder of Spartina Technology, AI builder and researcher working across " +
      "computer vision, scientific AI, multimodal systems, and applied intelligent products.",
    email: "yuying@kean.edu",
    github: "https://github.com/Yingda-Yu",
    linkedin: null,
    googleScholar: null,
    resume: null,
  },

  company: {
    name: "Spartina Technology",
    fullName: "Spartina Technology (Wenzhou) Co., Ltd.",
    chineseName: "米草科技（温州）有限责任公司",
    url: null,
    description:
      "Building applied AI systems across visual intelligence, digital content, " +
      "and real-world industries.",
    areas: [
      "Visual Intelligence",
      "Generative Systems",
      "Applied AI",
    ],
  },

  about: [
    "I work across research and product development, turning AI ideas into systems " +
    "that can be tested, shipped, and used.",

    "As founder of Spartina Technology, I build applied AI products spanning visual " +
    "intelligence, generative systems, and digital content. My research spans computer " +
    "vision, data-centric AI, environmental remote sensing, and physics-informed " +
    "scientific modeling.",

    "Currently studying Mathematics (Data Science Track) with a minor in Computer " +
    "Science at Wenzhou-Kean University.",
  ],

  workingWith: [
    "Python", "PyTorch", "Computer Vision",
    "Remote Sensing", "Generative AI", "Web",
    "AI Systems", "Data-Centric AI",
  ],

  projects: [
    {
      number: "01",
      name: "WallMock",
      description:
        "A visual automation tool that turns wallpapers into production-ready " +
        "device mockups for e-commerce and digital presentation.",
      category: "Product / Visual AI / Automation",
      year: "2026",
      url: null,
    },
    {
      number: "02",
      name: "AI Liu Bowen",
      description:
        "Exploring generative AI, digital humans and cinematic storytelling " +
        "for cultural heritage and tourism.",
      category: "Generative AI / Digital IP",
      year: "2026",
      url: null,
    },
    {
      number: "03",
      name: "Environmental AI",
      description:
        "Remote sensing and intelligent ecological monitoring for invasive " +
        "species mapping and environmental protection.",
      category: "Research / Computer Vision",
      year: "2025—Now",
      url: null,
    },
  ],

  // Only publications with verified metadata are displayed.
  // Papers with unverified titles/DOIs are kept as comments for future completion.
  publications: {
    selected: [
      {
        year: "2026",
        title:
          "Confident Learning for Object Detection under Model Constraints",
        venue: "arXiv Preprint",
        status: "Preprint",
        role: "First Author",
        tags: ["Data-Centric AI", "Object Detection", "Confident Learning"],
        contribution:
          "A confident learning framework for identifying label errors in " +
          "object detection datasets under practical model constraints, " +
          "applied to agricultural weed detection on edge devices.",
        authors:
          "Yingda Yu, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Shuyang Xu, Guanchao Tong",
        paper: "https://arxiv.org/abs/2601.11640",
        doi: null,
        code: null,
        project: null,
      },
      {
        year: "2026",
        title:
          "Spatiotemporal mapping of Spartina alterniflora using Landsat " +
          "imagery and interpretable machine learning",
        venue: "Scientific Reports",
        status: "Accepted",
        role: "Second Author",
        tags: ["Remote Sensing", "Environmental AI", "Interpretable ML"],
        contribution:
          "Spatiotemporal mapping of invasive Spartina alterniflora using " +
          "Landsat time-series and interpretable machine learning for " +
          "ecological monitoring.",
        authors: null,
        paper: null,
        doi: null,
        code: null,
        project: null,
      },
      {
        year: "2026",
        title:
          "A physics-informed neural network approach to parameter " +
          "estimation of a dengue fever model",
        venue: "Scientific Reports",
        status: "Accepted",
        role: "First Author",
        tags: ["PINNs", "Epidemic Modeling", "Scientific AI"],
        contribution:
          "A physics-informed neural network approach for parameter " +
          "estimation in dengue fever epidemiological models.",
        authors: null,
        paper: null,
        doi: null,
        code: null,
        project: null,
      },
      {
        year: "2026",
        title:
          "Learnable Trusted Sparse Attention (LTSA) for UHD Image " +
          "Restoration",
        venue: "CVIDL",
        status: "Accepted",
        role: null,
        tags: ["Computer Vision", "Image Restoration"],
        contribution:
          "A learnable trusted sparse attention mechanism for ultra-high " +
          "definition image restoration tasks.",
        authors: null,
        paper: null,
        doi: null,
        code: null,
        project: null,
      },
    ],

    additional: [
      {
        year: "2026",
        title:
          "Think Before You Edit: Chain-of-Thought Image Editing via " +
          "Video Trajectories",
        venue: "PRCV 2026",
        status: "Under Review",
        role: null,
        tags: ["Multimodal AI", "Image Editing"],
        contribution: null,
        paper: null,
        doi: null,
      },
      {
        year: "2026",
        title:
          "Exploring Long-Chain Visual Reasoning with Multimodal Large " +
          "Language Models",
        venue: "PRCV 2026",
        status: "Under Review",
        role: null,
        tags: ["Multimodal AI", "Visual Reasoning"],
        contribution: null,
        paper: null,
        doi: null,
      },
      {
        year: "2026",
        title:
          "Semantic-Conditioned Diffusion for Task-Driven Underwater " +
          "Image Enhancement",
        venue: "CVIPPR",
        status: "Accepted",
        role: null,
        tags: ["Computer Vision", "Diffusion Models"],
        contribution: null,
        paper: null,
        doi: null,
      },
      {
        year: "2026",
        title:
          "Exploring Fractal Generative Models with Different Alternative " +
          "Atomic Modules",
        venue: null,
        status: "Accepted",
        role: null,
        tags: ["Generative AI", "Fractal Models"],
        contribution: null,
        paper: null,
        doi: null,
      },
      // --- Publications pending verification (do not display until confirmed) ---
      // {
      //   venue: "Stats",
      //   status: "Accepted",
      //   role: "First / Co-first Author",
      //   title: null,  // TODO: verify title from current CV
      //   doi: null,
      // },
      // {
      //   venue: "Gondwana Research",
      //   status: "Accepted",
      //   role: "Co-first Author",
      //   title: null,  // TODO: verify title from current CV
      //   doi: null,
      // },
    ],
  },

  journey: [
    {
      year: "2026",
      title: "Founder / AI Builder",
      org: "Spartina Technology",
      detail: "Building applied AI products across visual intelligence, " +
              "generative systems, and digital content.",
    },
    {
      year: "2025",
      title: "Visiting Researcher",
      org: "The Chinese University of Hong Kong, Shenzhen",
      detail: "AISE Summer Camp · Supervisor: Prof. Simon Pun",
    },
    {
      year: "2024—2025",
      title: "Research Assistant",
      org: "Wenzhou-Kean University",
      detail: "Supervisor: Prof. Shuyang Xu · Spartina alterniflora " +
              "monitoring, remote sensing, and earth observation.",
    },
    {
      year: "2023—Now",
      title: "B.S. Mathematics (Data Science Track)",
      org: "Wenzhou-Kean University",
      detail: "Minor in Computer Science",
    },
  ],

  honors: [
    "First Prize, Nestlé ESG Business Competition (2024)",
    "Best Organization Award, Bank of China Internship (2024)",
    "Cougar Pioneers Prize, Wenzhou-Kean University (2024)",
  ],

  activities: [
    "Fudan University (2024)",
    "Shanghai Jiao Tong University (2025)",
    "Research Day, Wenzhou-Kean University (2025)",
    "AISE Summer Camp, CUHK-Shenzhen (2025)",
    "Central South University",
  ],

  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Research", href: "#research" },
    { label: "Venture", href: "#venture" },
    { label: "Contact", href: "#contact" },
  ],

  social: {
    github: { label: "GitHub", url: "https://github.com/Yingda-Yu" },
    linkedin: { label: "LinkedIn", url: null },
    scholar: { label: "Google Scholar", url: null },
  },
};

// Expose globally
window.SITE_DATA = SITE_DATA;
