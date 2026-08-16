/**
 * Site Data — Yingda Yu V2
 * Bilingual (EN / ZH) content.
 * Update content here; the UI renders automatically.
 */

var I18N = {

  /* ================================================================
     ENGLISH
     ================================================================ */
  en: {

    profile: {
      name: "Yingda Yu",
      roles: "Founder \u00b7 AI Builder \u00b7 Researcher",
      greeting: "Hi, I'm",
      tagline: "I build intelligent systems across research, products, and the real world.",
      description:
        "Founder of Spartina Technology, AI builder and researcher working across " +
        "computer vision, scientific AI, multimodal systems, and applied intelligent products.",
      email: "yuyingda76@gmail.com",
    },

    heroCTA: {
      primary: "Explore my work",
      secondary: "About me",
    },

    company: {
      name: "Spartina Technology",
      fullName: "Spartina Technology (Wenzhou) Co., Ltd.",
      heroText: "Founder @ Spartina Technology",
      description:
        "Building applied AI systems across visual intelligence, digital content, " +
        "and real-world industries.",
      areas: [
        { name: "Visual Intelligence", desc: "Computer vision, image processing, and visual data systems." },
        { name: "Generative Systems", desc: "AI image and video generation, digital humans, and content pipelines." },
        { name: "Applied AI", desc: "Enterprise AI solutions bridging research and real-world deployment." },
      ],
      visitLink: "Visit Spartina Technology",
      linkComingSoon: "Spartina Technology link coming soon",
    },

    nav: [
      { label: "About", href: "#about" },
      { label: "Publications", href: "#publications" },
      { label: "Work", href: "#work" },
      { label: "Journey", href: "#journey" },
      { label: "Contact", href: "#contact" },
    ],

    sections: {
      about: "01 / About",
      publications: "02 / Publications",
      work: "03 / Work",
      journey: "04 / Journey",
      world: "05 / World",
    },

    headings: {
      about: "About",
      publications: "Publications",
      work: "My Work",
      journey: "Journey",
      world: "Around the World",
      contact: "Let's build something meaningful.",
      contactSub: "Research, products, AI systems, or collaborations.",
      contactBtn: "Say hello",
    },

    workLabels: {
      projects: "Projects",
      venture: "Spartina Technology",
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

    workingWithLabel: "Working With",
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
        year: "2025\u2014Now",
        url: null,
      },
    ],

    publications: {
      selected: [
        {
          year: "2026",
          title: "Confident Learning for Object Detection under Model Constraints",
          venue: "arXiv Preprint",
          status: "Preprint",
          role: "First Author",
          tags: ["Data-Centric AI", "Object Detection", "Confident Learning"],
          contribution:
            "A confident learning framework for identifying label errors in " +
            "object detection datasets under practical model constraints, " +
            "applied to agricultural weed detection on edge devices.",
          authors: "Yingda Yu, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Shuyang Xu, Guanchao Tong",
          paper: "https://arxiv.org/abs/2601.11640",
          doi: null, code: null, project: null,
        },
        {
          year: "2026",
          title: "Exploring Fractal Generative Models with Different Alternative Atomic Modules",
          venue: "6th Int'l Conf. on Image Processing and Intelligent Control",
          status: "Published",
          role: "First Author",
          tags: ["Generative AI", "Fractal Models"],
          contribution:
            "Exploring fractal generative architectures with alternative atomic " +
            "modules for image generation tasks.",
          authors: "Yingda Yu, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Guanchao Tong",
          paper: null, doi: null, code: null, project: null,
        },
        {
          year: "2026",
          title: "OSEF: One-Step Evidence Fusion for Cross-Video Scene Procedure Planning",
          venue: "arXiv Preprint",
          status: "Preprint",
          role: "Co-Author",
          tags: ["Video Understanding", "Procedure Planning", "Multimodal AI"],
          contribution:
            "A one-step evidence fusion framework for cross-video scene " +
            "procedure planning.",
          authors: "Zhihao Ye, Lichen Zhang, Shengzhou Zhou, Yingda Yu, et al.",
          paper: "https://arxiv.org/abs/2607.29401",
          doi: null, code: null, project: null,
        },
      ],
      additional: [],
    },

    researchExpand: "View all research",
    researchCollapse: "Show less",

    journey: [
      {
        year: "2026",
        title: "Founder / AI Builder",
        org: "Spartina Technology",
        detail: null,
      },
      {
        year: "2025",
        title: "Visiting Researcher",
        org: "CUHK, Shenzhen",
        detail: "Supervisor: Prof. Simon Pun",
      },
      {
        year: "2024\u20142025",
        title: "Research Assistant",
        org: "Wenzhou-Kean University",
        detail: "Supervisor: Prof. Shuyang Xu",
      },
      {
        year: "2023\u2014Now",
        title: "B.S. Mathematics, Data Science",
        org: "Wenzhou-Kean University",
        detail: "Minor in CS",
      },
    ],

    visitorPlaceholder: "Visitor analytics coming online.",
    visitorLabels: { visitors: "Visitors", countries: "Countries", topLocations: "Top Locations" },

    footer: "Designed & built by Yingda Yu.",

    links: {
      scholar: { label: "Google Scholar", url: "https://scholar.google.com/citations?user=q2z0KlIAAAAJ&hl=en" },
      github: { label: "GitHub", url: "https://github.com/Yingda-Yu" },
      orcid: { label: "ORCID", url: "https://orcid.org/0009-0001-9080-316X" },
      dblp: { label: "DBLP", url: "https://dblp.org/pid/426/9161.html" },
      linkedin: { label: "LinkedIn", url: "https://www.linkedin.cn/incareer/in/yingda-yu-6844a43bb/" },
    },
  },

  /* ================================================================
     CHINESE
     ================================================================ */
  zh: {

    profile: {
      name: "\u4fde\u9896\u8fbe",
      roles: "\u521b\u59cb\u4eba \u00b7 AI \u6784\u5efa\u8005 \u00b7 \u7814\u7a76\u8005",
      greeting: "\u4f60\u597d\uff0c\u6211\u662f",
      tagline: "\u6211\u8de8\u7814\u7a76\u4e0e\u4ea7\u54c1\u5f00\u53d1\uff0c\u6784\u5efa\u667a\u80fd\u7cfb\u7edf\u3002",
      description:
        "\u7c73\u8349\u79d1\u6280\u521b\u59cb\u4eba\uff0cAI \u6784\u5efa\u8005\u4e0e\u7814\u7a76\u8005\uff0c" +
        "\u81f4\u529b\u4e8e\u8ba1\u7b97\u673a\u89c6\u89c9\u3001\u79d1\u5b66 AI\u3001\u591a\u6a21\u6001\u7cfb\u7edf\u53ca\u5e94\u7528\u667a\u80fd\u4ea7\u54c1\u3002",
      email: "yuyingda76@gmail.com",
    },

    heroCTA: {
      primary: "\u63a2\u7d22\u6211\u7684\u4f5c\u54c1",
      secondary: "\u5173\u4e8e\u6211",
    },

    company: {
      name: "\u7c73\u8349\u79d1\u6280",
      fullName: "\u7c73\u8349\u79d1\u6280\uff08\u6e29\u5dde\uff09\u6709\u9650\u8d23\u4efb\u516c\u53f8",
      heroText: "\u7c73\u8349\u79d1\u6280 \u521b\u59cb\u4eba",
      description:
        "\u8de8\u89c6\u89c9\u667a\u80fd\u3001\u6570\u5b57\u5185\u5bb9\u4e0e\u771f\u5b9e\u4ea7\u4e1a\uff0c" +
        "\u6784\u5efa\u5e94\u7528\u7ea7 AI \u7cfb\u7edf\u3002",
      areas: [
        { name: "\u89c6\u89c9\u667a\u80fd", desc: "\u8ba1\u7b97\u673a\u89c6\u89c9\u3001\u56fe\u50cf\u5904\u7406\u4e0e\u89c6\u89c9\u6570\u636e\u7cfb\u7edf\u3002" },
        { name: "\u751f\u6210\u5f0f\u7cfb\u7edf", desc: "AI \u56fe\u50cf\u4e0e\u89c6\u9891\u751f\u6210\u3001\u6570\u5b57\u4eba\u4e0e\u5185\u5bb9\u7ba1\u7ebf\u3002" },
        { name: "\u5e94\u7528 AI", desc: "\u8fde\u63a5\u7814\u7a76\u4e0e\u771f\u5b9e\u573a\u666f\u90e8\u7f72\u7684\u4f01\u4e1a AI \u89e3\u51b3\u65b9\u6848\u3002" },
      ],
      visitLink: "\u8bbf\u95ee\u7c73\u8349\u79d1\u6280",
      linkComingSoon: "\u7c73\u8349\u79d1\u6280\u94fe\u63a5\u5373\u5c06\u4e0a\u7ebf",
    },

    nav: [
      { label: "\u5173\u4e8e", href: "#about" },
      { label: "\u8bba\u6587", href: "#publications" },
      { label: "\u4f5c\u54c1", href: "#work" },
      { label: "\u5386\u7a0b", href: "#journey" },
      { label: "\u8054\u7cfb", href: "#contact" },
    ],

    sections: {
      about: "01 / \u5173\u4e8e",
      publications: "02 / \u8bba\u6587",
      work: "03 / \u4f5c\u54c1",
      journey: "04 / \u5386\u7a0b",
      world: "05 / \u4e16\u754c",
    },

    headings: {
      about: "\u5173\u4e8e",
      publications: "\u8bba\u6587",
      work: "\u6211\u7684\u4f5c\u54c1",
      journey: "\u5386\u7a0b",
      world: "\u904d\u5e03\u5168\u7403",
      contact: "\u8ba9\u6211\u4eec\u4e00\u8d77\u521b\u9020\u6709\u610f\u4e49\u7684\u6210\u679c\u3002",
      contactSub: "\u7814\u7a76\u3001\u4ea7\u54c1\u3001AI \u7cfb\u7edf\u6216\u5408\u4f5c\u3002",
      contactBtn: "\u8bf4\u4f60\u597d",
    },

    workLabels: {
      projects: "\u9879\u76ee",
      venture: "\u7c73\u8349\u79d1\u6280",
    },

    about: [
      "\u6211\u8de8\u7814\u7a76\u4e0e\u4ea7\u54c1\u5f00\u53d1\uff0c\u5c06 AI \u60f3\u6cd5\u8f6c\u5316\u4e3a\u53ef\u6d4b\u8bd5\u3001\u53ef\u4ea4\u4ed8\u3001\u53ef\u4f7f\u7528\u7684\u7cfb\u7edf\u3002",

      "\u4f5c\u4e3a\u7c73\u8349\u79d1\u6280\u521b\u59cb\u4eba\uff0c\u6211\u6784\u5efa\u6db5\u76d6\u89c6\u89c9\u667a\u80fd\u3001\u751f\u6210\u5f0f\u7cfb\u7edf\u4e0e\u6570\u5b57\u5185\u5bb9\u7684\u5e94\u7528\u7ea7 AI \u4ea7\u54c1\u3002" +
      "\u6211\u7684\u7814\u7a76\u6db5\u76d6\u8ba1\u7b97\u673a\u89c6\u89c9\u3001\u6570\u636e\u9a71\u52a8 AI\u3001\u73af\u5883\u9065\u611f\u4e0e\u7269\u7406\u542f\u53d1\u7684\u79d1\u5b66\u5efa\u6a21\u3002",

      "\u76ee\u524d\u5728\u6e29\u5dde\u80af\u6069\u5927\u5b66\u653b\u8bfb\u6570\u5b66\uff08\u6570\u636e\u79d1\u5b66\u65b9\u5411\uff09\u5b66\u58eb\u5b66\u4f4d\uff0c\u8f85\u4fee\u8ba1\u7b97\u673a\u79d1\u5b66\u3002",
    ],

    workingWithLabel: "\u5de5\u5177\u4e0e\u6280\u672f",
    workingWith: [
      "Python", "PyTorch", "\u8ba1\u7b97\u673a\u89c6\u89c9",
      "\u9065\u611f", "\u751f\u6210\u5f0f AI", "Web",
      "AI \u7cfb\u7edf", "\u6570\u636e\u9a71\u52a8 AI",
    ],

    projects: [
      {
        number: "01",
        name: "WallMock",
        description:
          "\u5c06\u58c1\u7eb8\u81ea\u52a8\u8f6c\u5316\u4e3a\u9002\u5408\u7535\u5546\u5c55\u793a\u7684\u8bbe\u5907 mockup \u7684\u89c6\u89c9\u81ea\u52a8\u5316\u5de5\u5177\u3002",
        category: "\u4ea7\u54c1 / \u89c6\u89c9 AI / \u81ea\u52a8\u5316",
        year: "2026",
        url: null,
      },
      {
        number: "02",
        name: "AI \u5218\u4f2f\u6e29",
        description:
          "\u63a2\u7d22\u751f\u6210\u5f0f AI\u3001\u6570\u5b57\u4eba\u4e0e\u7535\u5f71\u5316\u53d9\u4e8b\u5728\u6587\u5316\u9057\u4ea7\u4e0e\u6587\u65c5\u9886\u57df\u7684\u5e94\u7528\u3002",
        category: "\u751f\u6210\u5f0f AI / \u6570\u5b57 IP",
        year: "2026",
        url: null,
      },
      {
        number: "03",
        name: "\u73af\u5883 AI",
        description:
          "\u9065\u611f\u4e0e\u667a\u80fd\u751f\u6001\u76d1\u6d4b\uff0c\u7528\u4e8e\u5165\u4fb5\u7269\u79cd\u6d4b\u7ed8\u4e0e\u73af\u5883\u4fdd\u62a4\u3002",
        category: "\u7814\u7a76 / \u8ba1\u7b97\u673a\u89c6\u89c9",
        year: "2025\u2014\u81f3\u4eca",
        url: null,
      },
    ],

    publications: {
      selected: [
        {
          year: "2026",
          title: "Confident Learning for Object Detection under Model Constraints",
          venue: "arXiv \u9884\u5370\u672c",
          status: "\u9884\u5370\u672c",
          role: "\u7b2c\u4e00\u4f5c\u8005",
          tags: ["\u6570\u636e\u9a71\u52a8 AI", "\u76ee\u6807\u68c0\u6d4b", "Confident Learning"],
          contribution:
            "\u5728\u5b9e\u9645\u6a21\u578b\u7ea6\u675f\u4e0b\u8bc6\u522b\u76ee\u6807\u68c0\u6d4b\u6570\u636e\u96c6\u6807\u7b7e\u9519\u8bef\u7684 confident learning \u6846\u67b6\uff0c" +
            "\u5e94\u7528\u4e8e\u8fb9\u7f18\u8bbe\u5907\u4e0a\u7684\u519c\u4e1a\u6742\u8349\u68c0\u6d4b\u3002",
          authors: "Yingda Yu, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Shuyang Xu, Guanchao Tong",
          paper: "https://arxiv.org/abs/2601.11640",
          doi: null, code: null, project: null,
        },
        {
          year: "2026",
          title: "Exploring Fractal Generative Models with Different Alternative Atomic Modules",
          venue: "\u7b2c\u516d\u5c4a\u56fe\u50cf\u5904\u7406\u4e0e\u667a\u80fd\u63a7\u5236\u56fd\u9645\u4f1a\u8bae",
          status: "\u5df2\u53d1\u8868",
          role: "\u7b2c\u4e00\u4f5c\u8005",
          tags: ["\u751f\u6210\u5f0f AI", "\u5206\u5f62\u6a21\u578b"],
          contribution:
            "\u63a2\u7d22\u4f7f\u7528\u4e0d\u540c\u539f\u5b50\u6a21\u5757\u7684\u5206\u5f62\u751f\u6210\u67b6\u6784\u7528\u4e8e\u56fe\u50cf\u751f\u6210\u4efb\u52a1\u3002",
          authors: "Yingda Yu, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Guanchao Tong",
          paper: null, doi: null, code: null, project: null,
        },
        {
          year: "2026",
          title: "OSEF: One-Step Evidence Fusion for Cross-Video Scene Procedure Planning",
          venue: "arXiv \u9884\u5370\u672c",
          status: "\u9884\u5370\u672c",
          role: "\u5408\u4f5c\u4f5c\u8005",
          tags: ["\u89c6\u9891\u7406\u89e3", "\u6d41\u7a0b\u89c4\u5212", "\u591a\u6a21\u6001 AI"],
          contribution:
            "\u9762\u5411\u8de8\u89c6\u9891\u573a\u666f\u6d41\u7a0b\u89c4\u5212\u7684\u5355\u6b65\u8bc1\u636e\u878d\u5408\u6846\u67b6\u3002",
          authors: "Zhihao Ye, Lichen Zhang, Shengzhou Zhou, Yingda Yu, et al.",
          paper: "https://arxiv.org/abs/2607.29401",
          doi: null, code: null, project: null,
        },
      ],
      additional: [],
    },

    researchExpand: "\u67e5\u770b\u5168\u90e8\u7814\u7a76",
    researchCollapse: "\u6536\u8d77",

    journey: [
      {
        year: "2026",
        title: "\u521b\u59cb\u4eba / AI \u6784\u5efa\u8005",
        org: "\u7c73\u8349\u79d1\u6280",
        detail: null,
      },
      {
        year: "2025",
        title: "\u8bbf\u95ee\u7814\u7a76\u8005",
        org: "\u6e2f\u4e2d\u5927\uff08\u6df1\u5733\uff09",
        detail: "\u6307\u5bfc\u8001\u5e08\uff1aProf. Simon Pun",
      },
      {
        year: "2024\u20142025",
        title: "\u7814\u7a76\u52a9\u7406",
        org: "\u6e29\u5dde\u80af\u6069\u5927\u5b66",
        detail: "\u6307\u5bfc\u8001\u5e08\uff1a\u5f90\u8212\u9633\u6559\u6388",
      },
      {
        year: "2023\u2014\u81f3\u4eca",
        title: "\u6570\u5b66\u5b66\u58eb\uff0c\u6570\u636e\u79d1\u5b66",
        org: "\u6e29\u5dde\u80af\u6069\u5927\u5b66",
        detail: "\u8f85\u4fee\u8ba1\u7b97\u673a\u79d1\u5b66",
      },
    ],

    visitorPlaceholder: "\u8bbf\u5ba2\u5206\u6790\u5373\u5c06\u4e0a\u7ebf\u3002",
    visitorLabels: { visitors: "\u8bbf\u5ba2", countries: "\u56fd\u5bb6", topLocations: "\u4e3b\u8981\u6765\u6e90" },

    footer: "\u7531\u4fde\u9896\u8fbe\u8bbe\u8ba1\u4e0e\u6784\u5efa\u3002",

    links: {
      scholar: { label: "Google Scholar", url: "https://scholar.google.com/citations?user=q2z0KlIAAAAJ&hl=en" },
      github: { label: "GitHub", url: "https://github.com/Yingda-Yu" },
      orcid: { label: "ORCID", url: "https://orcid.org/0009-0001-9080-316X" },
      dblp: { label: "DBLP", url: "https://dblp.org/pid/426/9161.html" },
      linkedin: { label: "LinkedIn", url: "https://www.linkedin.cn/incareer/in/yingda-yu-6844a43bb/" },
    },
  },
};

/* ================================================================
     Shared data (language-independent)
     ================================================================ */
var SHARED = {
  company: {
    url: "https://www.spartina.tech/",
    photo: "./assets/images/profile-original.jpg",
  },
  stylizedPhoto: "./assets/images/profile-stylized-3.jpg",
  stylizedAlternatives: [
    "./assets/images/profile-stylized-1.jpg",
    "./assets/images/profile-stylized-2.jpg",
    "./assets/images/profile-stylized-3.jpg",
  ],
  socialOrder: ["scholar", "github", "orcid", "dblp", "linkedin"],
  sideSocialOrder: ["scholar", "github", "linkedin"],
};

/* Detect browser language for initial display */
var DEFAULT_LANG = (function () {
  var saved = null;
  try { saved = localStorage.getItem("site-lang"); } catch (e) {}
  if (saved === "en" || saved === "zh") return saved;
  var browser = (navigator.language || "en").toLowerCase();
  return browser.startsWith("zh") ? "zh" : "en";
})();

window.I18N = I18N;
window.SHARED = SHARED;
window.DEFAULT_LANG = DEFAULT_LANG;
