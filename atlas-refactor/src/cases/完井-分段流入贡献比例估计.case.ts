import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-inflow",
  "sceneId": "co4",
  "name": "完井-分段流入贡献比例估计",
  "title": "分段流入贡献比例估计",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "multi",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "opt"
  ],
  "intro": "总产量不能说明各段贡献，分段响应有助于发现不均衡。",
  "concept": "总产量不能说明各段贡献，分段响应有助于发现不均衡。比例之间还存在总量约束。",
  "what": "多输出岭回归从三段响应学习流入贡献，并投影成非负100%分布。",
  "why": "总产量不能说明各段贡献，分段响应有助于发现不均衡。比例之间还存在总量约束。",
  "how": "参考分段记录拟合每段目标，切换输出检查贡献、区间与误差，完整表显示各段比例总和。",
  "data": "独立合成参考、校准和测试记录。输入包括第一段响应、第二段响应、第三段响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "没有实测持率与流速解算，不代表真实多相生产测井解释。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "第一段响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "第二段响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "第三段响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "第一段贡献",
      "unit": ""
    },
    {
      "name": "第二段贡献",
      "unit": ""
    },
    {
      "name": "第三段贡献",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括第一段响应、第二段响应、第三段响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "分段响应展示来源差异",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "多输出岭回归从三段响应学习流入贡献，并投影成非负100%分布。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考分段记录拟合每段目标，切换输出检查贡献、区间与误差，完整表显示各段比例总和。",
      "effect": "三输出表检查贡献守恒",
      "trap": "没有实测持率与流速解算，不代表真实多相生产测井解释。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "总产量不能说明各段贡献，分段响应有助于发现不均衡。比例之间还存在总量约束。",
      "effect": "误差区间约束剖面解读",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "分段响应展示来源差异",
    "三输出表检查贡献守恒",
    "误差区间约束剖面解读"
  ],
  "extension": {
    "key": "inflow",
    "task": "regression",
    "projection": "simplex"
  },
  "references": [
    {
      "title": "SLB Flow Profile",
      "url": "https://glossary.slb.com/en/terms/f/flow_profile",
      "note": "支持分段流量和总流量比例概念，比例来自合成数据。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Zonal inflow-contribution estimate",
    "stage": "Completion",
    "intro": "Total rate does not reveal zonal contributions. Segment responses can expose imbalance while fractions must respect a total constraint.",
    "concept": "Total rate does not reveal zonal contributions. Segment responses can expose imbalance while fractions must respect a total constraint.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Multi-output ridge regression learns zonal contributions and projects them to a nonnegative 100% distribution.",
    "why": "Total rate does not reveal zonal contributions. Segment responses can expose imbalance while fractions must respect a total constraint.",
    "how": "Fit each zonal target from references, switch outputs to inspect contributions, intervals and errors, and review the complete fraction table.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Zone-one response, Zone-two response, Zone-three response. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Measured holdup and phase-velocity calculations are absent; this is not real multiphase production-log interpretation. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Zone-one response",
        "unit": ""
      },
      {
        "name": "Zone-two response",
        "unit": ""
      },
      {
        "name": "Zone-three response",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Zone-one fraction",
        "unit": ""
      },
      {
        "name": "Zone-two fraction",
        "unit": ""
      },
      {
        "name": "Zone-three fraction",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Zone-one response, Zone-two response, Zone-three response. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Zone responses show source differences",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Multi-output ridge regression learns zonal contributions and projects them to a nonnegative 100% distribution.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit each zonal target from references, switch outputs to inspect contributions, intervals and errors, and review the complete fraction table.",
        "effect": "Three-output tables check fraction conservation",
        "trap": "Measured holdup and phase-velocity calculations are absent; this is not real multiphase production-log interpretation."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Total rate does not reveal zonal contributions. Segment responses can expose imbalance while fractions must respect a total constraint.",
        "effect": "Intervals qualify profile interpretation",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Zone responses show source differences",
      "Three-output tables check fraction conservation",
      "Intervals qualify profile interpretation"
    ],
    "references": [
      {
        "title": "SLB Flow Profile",
        "url": "https://glossary.slb.com/en/terms/f/flow_profile",
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
