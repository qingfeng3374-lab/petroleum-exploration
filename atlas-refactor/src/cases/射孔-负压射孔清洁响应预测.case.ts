import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-underbalance",
  "sceneId": "p4",
  "name": "射孔-负压射孔清洁响应预测",
  "title": "负压射孔清洁响应预测",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "射孔后的碎屑和压碎带影响连通，负压清洁效应不能用单一孔径解释。",
  "concept": "射孔后的碎屑和压碎带影响连通，负压清洁效应不能用单一孔径解释。条件变化下需要重新检查响应。",
  "what": "二次岭回归拟合负压、围压与连通条件的合成清洁响应。",
  "why": "射孔后的碎屑和压碎带影响连通，负压清洁效应不能用单一孔径解释。条件变化下需要重新检查响应。",
  "how": "参考条件拟合一次、平方和交互项，对独立目标计算响应与区间，查看负压与连通条件贡献。",
  "data": "独立合成参考、校准和测试记录。输入包括负压强度指标、围压负担、连通条件指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不推算现场负压量或清洁施工步骤，没有井筒瞬态流动求解。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "负压强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "围压负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "连通条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "清洁响应示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括负压强度指标、围压负担、连通条件指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "工况轨迹说明清洁条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归拟合负压、围压与连通条件的合成清洁响应。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考条件拟合一次、平方和交互项，对独立目标计算响应与区间，查看负压与连通条件贡献。",
      "effect": "响应交会图检查代理偏差",
      "trap": "不推算现场负压量或清洁施工步骤，没有井筒瞬态流动求解。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "射孔后的碎屑和压碎带影响连通，负压清洁效应不能用单一孔径解释。条件变化下需要重新检查响应。",
      "effect": "区间提示清洁效果非唯一性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "工况轨迹说明清洁条件",
    "响应交会图检查代理偏差",
    "区间提示清洁效果非唯一性"
  ],
  "extension": {
    "key": "underbalance",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Perforation Cleanup via Dynamic Underbalance",
      "url": "https://www.slb.com/resource-library/technical-paper/pe/spe-143997",
      "note": "用于理解清洁孔道与动态负压的关系，不移用论文效果数字。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Underbalance cleanup-response prediction",
    "stage": "Perforation",
    "intro": "Debris and crushed zones affect connectivity after perforating; underbalance cleanup is not explained by hole diameter alone. Response must be reviewed across conditions.",
    "concept": "Debris and crushed zones affect connectivity after perforating; underbalance cleanup is not explained by hole diameter alone. Response must be reviewed across conditions.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression fits synthetic cleanup response from underbalance, confinement and connectivity.",
    "why": "Debris and crushed zones affect connectivity after perforating; underbalance cleanup is not explained by hole diameter alone. Response must be reviewed across conditions.",
    "how": "Fit linear, quadratic and interaction terms on references; inspect held-out responses, intervals and underbalance/connectivity contributions.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Underbalance index, Confinement burden, Connectivity. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "No operational underbalance or cleanup sequence is prescribed; wellbore transient flow is not solved. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Underbalance index",
        "unit": ""
      },
      {
        "name": "Confinement burden",
        "unit": ""
      },
      {
        "name": "Connectivity",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Cleanup-response illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Underbalance index, Confinement burden, Connectivity. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Operating tracks explain cleanup conditions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression fits synthetic cleanup response from underbalance, confinement and connectivity.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit linear, quadratic and interaction terms on references; inspect held-out responses, intervals and underbalance/connectivity contributions.",
        "effect": "Crossplots inspect surrogate errors",
        "trap": "No operational underbalance or cleanup sequence is prescribed; wellbore transient flow is not solved."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Debris and crushed zones affect connectivity after perforating; underbalance cleanup is not explained by hole diameter alone. Response must be reviewed across conditions.",
        "effect": "Intervals reveal cleanup uncertainty",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Operating tracks explain cleanup conditions",
      "Crossplots inspect surrogate errors",
      "Intervals reveal cleanup uncertainty"
    ],
    "references": [
      {
        "title": "SLB Perforation Cleanup via Dynamic Underbalance",
        "url": "https://www.slb.com/resource-library/technical-paper/pe/spe-143997",
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
