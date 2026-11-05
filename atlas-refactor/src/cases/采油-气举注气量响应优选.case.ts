import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-gaslift",
  "sceneId": "pr3",
  "name": "采油-气举注气量响应优选",
  "title": "气举注气量响应优选",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "optimize",
  "method": "双响应岭回归代理＋约束帕累托搜索",
  "methods": [
    "opt"
  ],
  "intro": "注气太少可能举升不足，持续增气也会出现收益递减。",
  "concept": "注气太少可能举升不足，持续增气也会出现收益递减。注气与节流需要一起考虑，并说明资源代价。",
  "what": "双响应岭回归学习举升收益与气体资源消耗，在预算内筛选非支配组合。",
  "why": "注气太少可能举升不足，持续增气也会出现收益递减。注气与节流需要一起考虑，并说明资源代价。",
  "how": "固定井筒负担预测二维网格，先按资源预算和第二响应上限过滤，再显示可行最优与帕累托点。",
  "data": "独立合成参考、校准和测试记录。输入包括注气量指标、井口节流指标、井筒负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "没有真实井筒气液流动与阀特性，输出不等于现场最佳注气量。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "注气量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井口节流指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井筒负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "举升收益指数",
      "unit": ""
    },
    {
      "name": "注气资源指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括注气量指标、井口节流指标、井筒负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "参数空间解释注气节流耦合",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "双响应岭回归学习举升收益与气体资源消耗，在预算内筛选非支配组合。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "固定井筒负担预测二维网格，先按资源预算和第二响应上限过滤，再显示可行最优与帕累托点。",
      "effect": "收益与资源双响应并列",
      "trap": "没有真实井筒气液流动与阀特性，输出不等于现场最佳注气量。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "注气太少可能举升不足，持续增气也会出现收益递减。注气与节流需要一起考虑，并说明资源代价。",
      "effect": "预算遮罩约束候选范围",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "参数空间解释注气节流耦合",
    "收益与资源双响应并列",
    "预算遮罩约束候选范围"
  ],
  "extension": {
    "key": "gaslift",
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
      "title": "SLB Defining Gas Lift",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-gas-lift",
      "note": "支持注气量和举升效益的业务背景；不使用厂商优化器。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Gas-lift injection-response screening",
    "stage": "Production",
    "intro": "Too little gas may under-lift, while increasing gas can bring diminishing benefits. Injection and choke settings need joint review with resource costs.",
    "concept": "Too little gas may under-lift, while increasing gas can bring diminishing benefits. Injection and choke settings need joint review with resource costs.",
    "method": "Two-response ridge surrogate + constrained Pareto search",
    "what": "Two ridge surrogates learn lift benefit and gas-resource use, screening nondominated combinations within budget.",
    "why": "Too little gas may under-lift, while increasing gas can bring diminishing benefits. Injection and choke settings need joint review with resource costs.",
    "how": "At fixed wellbore burden, predict a grid, filter by weighted budget and secondary-response cap, then display feasible best and Pareto candidates.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Gas-injection setting, Choke setting, Wellbore burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real gas/liquid wellbore flow and valve characteristics are absent; output is not an operational gas rate. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Gas-injection setting",
        "unit": ""
      },
      {
        "name": "Choke setting",
        "unit": ""
      },
      {
        "name": "Wellbore burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Lift-benefit index",
        "unit": ""
      },
      {
        "name": "Gas-resource index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Gas-injection setting, Choke setting, Wellbore burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Settings explain gas-choke coupling",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Two ridge surrogates learn lift benefit and gas-resource use, screening nondominated combinations within budget.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "At fixed wellbore burden, predict a grid, filter by weighted budget and secondary-response cap, then display feasible best and Pareto candidates.",
        "effect": "Compare benefit and gas use",
        "trap": "Real gas/liquid wellbore flow and valve characteristics are absent; output is not an operational gas rate."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Too little gas may under-lift, while increasing gas can bring diminishing benefits. Injection and choke settings need joint review with resource costs.",
        "effect": "Budget masks constrain candidates",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Settings explain gas-choke coupling",
      "Compare benefit and gas use",
      "Budget masks constrain candidates"
    ],
    "references": [
      {
        "title": "SLB Defining Gas Lift",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-gas-lift",
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
