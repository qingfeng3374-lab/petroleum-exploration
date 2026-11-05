import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-charge-tradeoff",
  "sceneId": "p3",
  "name": "射孔-射孔弹响应与损伤权衡",
  "title": "射孔弹响应与损伤权衡",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "optimize",
  "method": "双响应岭回归代理＋约束帕累托搜索",
  "methods": [
    "opt"
  ],
  "intro": "更强的射孔响应可能伴随更大的套管扰动，选型需要把收益和代价并列。",
  "concept": "更强的射孔响应可能伴随更大的套管扰动，选型需要把收益和代价并列。单一穿深排序会掩盖这种取舍。",
  "what": "两个岭回归代理学习穿深和套管扰动，预算与扰动上限过滤后筛选非支配候选。",
  "why": "更强的射孔响应可能伴随更大的套管扰动，选型需要把收益和代价并列。单一穿深排序会掩盖这种取舍。",
  "how": "预测21×21配置网格，限制加权资源和扰动指数，紫色标出可行域内的帕累托候选。",
  "data": "独立合成参考、校准和测试记录。输入包括弹能配置指标、孔径配置指标、岩石负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是工业射孔弹认证或套管强度验算，示意扰动阈值不能用于真实设计。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "弹能配置指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "孔径配置指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "岩石负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "穿深响应",
      "unit": ""
    },
    {
      "name": "套管扰动指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括弹能配置指标、孔径配置指标、岩石负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "配置空间解释弹型差异",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "两个岭回归代理学习穿深和套管扰动，预算与扰动上限过滤后筛选非支配候选。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "预测21×21配置网格，限制加权资源和扰动指数，紫色标出可行域内的帕累托候选。",
      "effect": "双响应和帕累托前沿并列",
      "trap": "不是工业射孔弹认证或套管强度验算，示意扰动阈值不能用于真实设计。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "更强的射孔响应可能伴随更大的套管扰动，选型需要把收益和代价并列。单一穿深排序会掩盖这种取舍。",
      "effect": "预算与扰动遮罩排除不适配点",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "配置空间解释弹型差异",
    "双响应和帕累托前沿并列",
    "预算与扰动遮罩排除不适配点"
  ],
  "extension": {
    "key": "charge-tradeoff",
    "task": "design",
    "constraint": {
      "weights": [
        0.55,
        0.45
      ],
      "secondMax": 60
    }
  },
  "references": [
    {
      "title": "SLB Perforating",
      "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/completions/well-completions/perforating",
      "note": "支持射孔设计和监测背景；本例为小规模教学近似。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Charge-response and damage tradeoff",
    "stage": "Perforation",
    "intro": "Stronger perforation response can accompany greater casing disturbance. Ranking by penetration alone hides that tradeoff.",
    "concept": "Stronger perforation response can accompany greater casing disturbance. Ranking by penetration alone hides that tradeoff.",
    "method": "Two-response ridge surrogate + constrained Pareto search",
    "what": "Two ridge surrogates learn penetration and casing disturbance, then filter by budget and disturbance before nondominance screening.",
    "why": "Stronger perforation response can accompany greater casing disturbance. Ranking by penetration alone hides that tradeoff.",
    "how": "Predict a 21×21 grid, constrain weighted resources and disturbance, and mark feasible Pareto candidates in purple.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Charge-energy setting, Hole-size setting, Rock burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is neither charge certification nor casing-strength verification; illustrative disturbance limits cannot guide real design. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Charge-energy setting",
        "unit": ""
      },
      {
        "name": "Hole-size setting",
        "unit": ""
      },
      {
        "name": "Rock burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Penetration response",
        "unit": ""
      },
      {
        "name": "Casing-disturbance index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Charge-energy setting, Hole-size setting, Rock burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Settings explain charge-response differences",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Two ridge surrogates learn penetration and casing disturbance, then filter by budget and disturbance before nondominance screening.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Predict a 21×21 grid, constrain weighted resources and disturbance, and mark feasible Pareto candidates in purple.",
        "effect": "Review two responses and the Pareto frontier",
        "trap": "This is neither charge certification nor casing-strength verification; illustrative disturbance limits cannot guide real design."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Stronger perforation response can accompany greater casing disturbance. Ranking by penetration alone hides that tradeoff.",
        "effect": "Budget and disturbance masks reject infeasible points",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Settings explain charge-response differences",
      "Review two responses and the Pareto frontier",
      "Budget and disturbance masks reject infeasible points"
    ],
    "references": [
      {
        "title": "SLB Perforating",
        "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/completions/well-completions/perforating",
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
