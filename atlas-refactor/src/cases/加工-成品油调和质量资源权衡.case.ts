import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-blending",
  "sceneId": "r1",
  "name": "加工-成品油调和质量资源权衡",
  "title": "成品油调和质量资源权衡",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "optimize",
  "method": "双响应岭回归代理＋约束帕累托搜索",
  "methods": [
    "opt"
  ],
  "intro": "调和质量不一定是各组分的简单线性平均，高质量方案也可能成本过高。",
  "concept": "调和质量不一定是各组分的简单线性平均，高质量方案也可能成本过高。总比例和成本约束需要一起检查。",
  "what": "双岭回归代理学习三组分调和的质量响应和成本，在比例与资源约束下搜索。",
  "why": "调和质量不一定是各组分的简单线性平均，高质量方案也可能成本过高。总比例和成本约束需要一起检查。",
  "how": "前两组分比例构成网格，第三组分取剩余量；先限制比例和资源，再显示高质量可行点及非支配候选。",
  "data": "独立合成参考、校准和测试记录。输入包括组分甲比例、组分乙比例、原料不利条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "质量是合成指数，不是实际辛烷值或出厂指标，未包含全部法规和相容性约束。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "组分甲比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "组分乙比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "原料不利条件",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "质量响应指数",
      "unit": ""
    },
    {
      "name": "资源成本指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括组分甲比例、组分乙比例、原料不利条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "比例空间说明配方组成",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "双岭回归代理学习三组分调和的质量响应和成本，在比例与资源约束下搜索。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "前两组分比例构成网格，第三组分取剩余量；先限制比例和资源，再显示高质量可行点及非支配候选。",
      "effect": "质量成本双响应并列",
      "trap": "质量是合成指数，不是实际辛烷值或出厂指标，未包含全部法规和相容性约束。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "调和质量不一定是各组分的简单线性平均，高质量方案也可能成本过高。总比例和成本约束需要一起检查。",
      "effect": "三角可行域检查比例守恒",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "比例空间说明配方组成",
    "质量成本双响应并列",
    "三角可行域检查比例守恒"
  ],
  "extension": {
    "key": "blending",
    "task": "design",
    "constraint": {
      "weights": [
        0.55,
        0.45
      ],
      "secondMax": 47,
      "sumMax": 1
    }
  },
  "references": [
    {
      "title": "EIA Refining Process",
      "url": "https://www.eia.gov/energyexplained/oil-and-petroleum-products/refining-crude-oil-the-refining-process.php",
      "note": "支持馏分分离和调和概念，不提供商业配方或产品认证。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Product-blending quality-resource tradeoff",
    "stage": "Refining",
    "intro": "Blend quality need not be a simple weighted mean, and high quality can be expensive. Fraction totals and costs require joint checks.",
    "concept": "Blend quality need not be a simple weighted mean, and high quality can be expensive. Fraction totals and costs require joint checks.",
    "method": "Two-response ridge surrogate + constrained Pareto search",
    "what": "Two ridge surrogates learn three-component blend quality and cost, searching under fraction and resource constraints.",
    "why": "Blend quality need not be a simple weighted mean, and high quality can be expensive. Fraction totals and costs require joint checks.",
    "how": "Grid the first two fractions and assign the remainder to the third; enforce fraction and resource limits before displaying high-quality feasible and nondominated points.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Blend fraction A, Blend fraction B, Feed burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Quality is a synthetic index, not actual octane or certified product quality; full regulations and compatibility constraints are absent. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Blend fraction A",
        "unit": ""
      },
      {
        "name": "Blend fraction B",
        "unit": ""
      },
      {
        "name": "Feed burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Quality-response index",
        "unit": ""
      },
      {
        "name": "Resource-cost index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Blend fraction A, Blend fraction B, Feed burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Fraction space explains blend composition",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Two ridge surrogates learn three-component blend quality and cost, searching under fraction and resource constraints.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Grid the first two fractions and assign the remainder to the third; enforce fraction and resource limits before displaying high-quality feasible and nondominated points.",
        "effect": "Compare quality and cost responses",
        "trap": "Quality is a synthetic index, not actual octane or certified product quality; full regulations and compatibility constraints are absent."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Blend quality need not be a simple weighted mean, and high quality can be expensive. Fraction totals and costs require joint checks.",
        "effect": "Triangular feasibility checks fraction totals",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Fraction space explains blend composition",
      "Compare quality and cost responses",
      "Triangular feasibility checks fraction totals"
    ],
    "references": [
      {
        "title": "EIA Refining Process",
        "url": "https://www.eia.gov/energyexplained/oil-and-petroleum-products/refining-crude-oil-the-refining-process.php",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Ridge Regression",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
