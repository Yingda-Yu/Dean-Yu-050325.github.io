/**
 * Publication dataset — source of truth for all research output.
 * Language-independent metadata (titles, authors, venues, links).
 * Status/presentation labels are translated in I18N (data.js).
 */
(function () {
  "use strict";

  var PUBS = {
    data: [
      /* =========================================================
         Published & Indexed (3)
         ========================================================= */

      {
        id: "cvippr2026-semantic-diffusion",
        year: 2026,
        title: "Semantic-Conditioned Diffusion for Task-Driven Underwater Image Enhancement",
        authors: "Yingda Yu*, Jiaqi Xuan",
        venue: {
          full: "2026 Asia Conference on Computer Vision, Image Processing and Pattern Recognition",
          short: "CVIPPR 2026",
          location: "Shanghai Jiao Tong University (SJTU), Shanghai, China"
        },
        status: "published",
        presentation: "oral",
        links: {
          paper: "https://ieeexplore.ieee.org/abstract/document/11604527",
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["generative models", "diffusion", "image enhancement", "underwater vision"]
      },

      {
        id: "cvidl2026-ltsa",
        year: 2026,
        title: "Learnable Trusted Sparse Attention (LTSA) for UHD Image Restoration",
        authors: "Yingda Yu*, Jiaqi Xuan, Haodong Zhang, Shuhui Shi, Xuanyu Teng, Yulin Tang",
        venue: {
          full: "7th International Conference on Computer Vision, Image and Deep Learning",
          short: "CVIDL 2026",
          location: "Central South University, Changsha, China"
        },
        status: "published",
        presentation: "poster",
        links: {
          paper: "https://ieeexplore.ieee.org/abstract/document/11637649",
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["image restoration", "attention", "UHD", "sparse models"]
      },

      {
        id: "ipic2026-fractal-generative",
        year: 2026,
        title: "Exploring Fractal Generative Models with Different Alternative Atomic Modules",
        authors: "Yingda Yu*, Jiaqi Xuan, Shuhui Shi, Xuanyu Teng, Guanchao Tong*",
        venue: {
          full: "Sixth International Conference on Image Processing and Intelligent Control",
          short: "IPIC 2026",
          location: "Shanghai, China"
        },
        status: "published",
        presentation: "poster",
        links: {
          paper: null,
          doi: "10.1117/12.3119320",
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["generative models", "fractal models", "image generation"]
      },

      /* =========================================================
         Accepted / Forthcoming (10)
         ========================================================= */

      {
        id: "prcv2026-adaps-come",
        year: 2026,
        title: "AdaPS-COME: Adaptive Prediction-Set Reliability for Safe Test-Time Adaptation of Vision Transformers",
        authors: "Yuehan Shi, Sijia Zhou, Yingda Yu, Zhentong Ye, Jiaqi Xuan, Guanchao Tong*",
        venue: {
          full: "The 9th Chinese Conference on Pattern Recognition and Computer Vision",
          short: "PRCV 2026",
          location: "Harbin, China"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["test-time adaptation", "conformal prediction", "vision transformers", "reliability"]
      },

      {
        id: "cvaa2026-severity-diffusion",
        year: 2026,
        title: "Severity-Conditioned Diffusion with Path-Sensitivity Regularization and Operator-Aware Conformal Calibration",
        authors: "Sijia Zhou, Yingda Yu*, Jiaqi Xuan, Zhentong Ye",
        venue: {
          full: "The 6th International Conference on Computer Vision, Application and Algorithm",
          short: "CVAA 2026",
          location: "University of Hong Kong, Hong Kong, China"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["diffusion models", "conformal prediction", "image restoration", "calibration"]
      },

      {
        id: "iconip2026-trajectory-scheduling",
        year: 2026,
        title: "Trajectory-Aware Diffusion Scheduling: A Search-Based Framework for Training-Free Text-to-Video Generation",
        authors: "Yingda Yu, Jiaqi Xuan, Guanchao Tong*",
        venue: {
          full: "33rd International Conference on Neural Information Processing",
          short: "ICONIP 2026",
          location: "Melbourne, Australia"
        },
        status: "accepted",
        presentation: "oral",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["video generation", "diffusion models", "scheduling", "training-free"]
      },

      {
        id: "iconip2026-cot-editing",
        year: 2026,
        title: "Think Before You Edit: Chain-of-Thought Image Editing via Video Trajectories",
        authors: "Yingda Yu, Jiaqi Xuan, Guanchao Tong*",
        venue: {
          full: "33rd International Conference on Neural Information Processing",
          short: "ICONIP 2026",
          location: "Melbourne, Australia"
        },
        status: "accepted",
        presentation: "oral",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["image editing", "chain-of-thought", "video trajectories", "multimodal"]
      },

      {
        id: "iconip2026-long-chain-reasoning",
        year: 2026,
        title: "Exploring Long-Chain Visual Reasoning with Multimodal Large Language Models",
        authors: "Yingda Yu, Jiaqi Xuan, Guanchao Tong*",
        venue: {
          full: "33rd International Conference on Neural Information Processing",
          short: "ICONIP 2026",
          location: "Melbourne, Australia"
        },
        status: "accepted",
        presentation: "abstract-presentation",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["multimodal LLMs", "visual reasoning", "long-chain reasoning"]
      },

      {
        id: "acml2026-ucdpa",
        year: 2026,
        title: "UCDPA: Uncertainty-Calibrated Dual-Path Adaptation for Test-Time Adaptation",
        authors: "Yuehan Shi, Yingda Yu, Zhentong Ye, Gaurav Gupta*, Guanchao Tong*",
        venue: {
          full: "The 18th Asian Conference on Machine Learning",
          short: "ACML 2026",
          location: "Melbourne, Australia"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["test-time adaptation", "uncertainty", "calibration", "dual-path"]
      },

      {
        id: "acml2026-graph-error-decomposition",
        year: 2026,
        title: "Error Decomposition for Score-based Graph Generation via Coupled Stochastic Differential Equations",
        authors: "Zhentong Ye, Yingda Yu, Yuehan Shi, Jiaqi Xuan, Sijia Zhou, Shuaiwu Dong, Gaurav Gupta*, Guanchao Tong*",
        venue: {
          full: "The 18th Asian Conference on Machine Learning",
          short: "ACML 2026",
          location: "Melbourne, Australia"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["graph generation", "score-based models", "SDE", "error analysis"]
      },

      {
        id: "ictai2026-calibration-reuse",
        year: 2026,
        title: "Calibration Data Reuse Can Break Conformal Prediction for Tabular In-Context Learners",
        authors: "Zhentong Ye, Yingda Yu, Jiaqi Xuan, Yuehan Shi, Sijia Zhou, Lei Zhang, Shuaiwu Dong, Guanchao Tong*",
        venue: {
          full: "38th IEEE International Conference on Tools with Artificial Intelligence",
          short: "ICTAI 2026",
          location: "Boca Raton, FL, USA"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["conformal prediction", "in-context learning", "calibration", "tabular"]
      },

      {
        id: "ictai2026-rc-ttd",
        year: 2026,
        title: "RC-TTD: Risk-Calibrated Test-Time Decisions for Reliable Retrieval-Augmented Generation",
        authors: "Yuehan Shi, Sijia Zhou, Yingda Yu, Zhentong Ye, Jiaqi Xuan, Lei Zhang, Shuaiwu Dong, Gaurav Gupta, Guanchao Tong*",
        venue: {
          full: "38th IEEE International Conference on Tools with Artificial Intelligence",
          short: "ICTAI 2026",
          location: "Boca Raton, FL, USA"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["RAG", "reliability", "conformal prediction", "test-time decisions"]
      },

      {
        id: "pricai2026-vcutbench",
        year: 2026,
        title: "V-CutBench: When Pairwise Wins Mislead in Streaming Graph Partitioning",
        authors: "Sijia Zhou, Yingda Yu*, Jiaqi Xuan, Yuehan Shi, Shuhui Shi, Zhentong Ye*, Kuan Huang, Gaurav Gupta*, Guanchao Tong*",
        venue: {
          full: "23rd Pacific Rim International Conference on Artificial Intelligence",
          short: "PRICAI 2026",
          location: "Guangzhou, China"
        },
        status: "accepted",
        presentation: "poster",
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["benchmark", "graph partitioning", "streaming", "evaluation"]
      },

      /* =========================================================
         Public Preprints (2)
         ========================================================= */

      {
        id: "preprint-osef",
        year: 2026,
        title: "OSEF: One-Step Evidence Fusion for Cross-Video Scene Procedure Planning",
        authors: "Zhentong Ye, Lei Zhang, Sijia Zhou, Yingda Yu, Yuehan Shi, Jiaqi Xuan, Shuaiwu Dong, Guanchao Tong, Meimei Zhang, Bin Li*",
        venue: {
          full: "arXiv preprint",
          short: "arXiv 2607.29401",
          location: null
        },
        status: "preprint",
        presentation: null,
        links: {
          paper: "https://arxiv.org/abs/2607.29401",
          doi: null,
          arxiv: "2607.29401",
          code: null,
          project: null
        },
        topics: ["procedure planning", "video understanding", "evidence fusion", "cross-video"],
        note: {
          en: "Preprint; submitted to AAAI 2027",
          zh: "预印本；已投稿 AAAI 2027"
        }
      },

      {
        id: "preprint-confident-learning-detection",
        year: 2026,
        title: "Confident Learning for Object Detection under Model Constraints",
        authors: "Yingda Yu\u2020, Jiaqi Xuan\u2020, Shuhui Shi\u2020, Xuanyu Teng\u2020, Shuyang Xu, Guanchao Tong*",
        venue: {
          full: "arXiv preprint",
          short: "arXiv 2601.11640",
          location: null
        },
        status: "preprint",
        presentation: null,
        links: {
          paper: "https://arxiv.org/abs/2601.11640",
          doi: null,
          arxiv: "2601.11640",
          code: null,
          project: null
        },
        topics: ["confident learning", "object detection", "label noise", "model constraints"],
        note: {
          en: "Preprint; submitted to ICPR 2026",
          zh: "预印本；已投稿 ICPR 2026"
        }
      },

      /* =========================================================
         Manuscripts Under Review (2)
         ========================================================= */

      {
        id: "under-review-icra2027-trajectory",
        year: 2027,
        title: "Decision-Preserving Compression of Reusable Trajectory Clearance Certificates",
        authors: "Yingda Yu",
        venue: {
          full: "IEEE International Conference on Robotics and Automation",
          short: "Submitted to ICRA 2027",
          location: null
        },
        status: "under-review",
        presentation: null,
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["robotics", "trajectory planning", "formal methods", "compression"]
      },

      {
        id: "under-review-neurips2026-medical",
        year: 2026,
        title: "When Should a Medical Agent Trust More Evidence? Safety-Constrained Tool Routing for Multimodal Glaucoma Visual-Field Prediction",
        authors: "Yingda Yu",
        venue: {
          full: "AIM @ NeurIPS 2026 Workshop",
          short: "Submitted to AIM @ NeurIPS 2026",
          location: null
        },
        status: "under-review",
        presentation: null,
        links: {
          paper: null,
          doi: null,
          arxiv: null,
          code: null,
          project: null
        },
        topics: ["medical AI", "multimodal", "glaucoma", "tool routing", "safety"]
      }
    ],

    /* 6 featured publications for homepage */
    featuredIds: [
      "cvippr2026-semantic-diffusion",
      "cvidl2026-ltsa",
      "ipic2026-fractal-generative",
      "iconip2026-trajectory-scheduling",
      "iconip2026-cot-editing",
      "preprint-confident-learning-detection"
    ]
  };

  window.PUBS = PUBS;
})();
