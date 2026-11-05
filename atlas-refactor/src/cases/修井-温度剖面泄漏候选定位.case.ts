import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-leak-depth",
  "sceneId": "wo3",
  "name": "修井-温度剖面泄漏候选定位",
  "title": "温度剖面泄漏候选定位",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "cv"
  ],
  "intro": "井筒温度剖面可提供流体活动线索，但异常不只由泄漏引起。",
  "concept": "井筒温度剖面可提供流体活动线索，但异常不只由泄漏引起。少量观测的定位应保留不确定性。",
  "what": "岭回归从四个位置的合成温度扰动学习单个异常源的深度代理。",
  "why": "井筒温度剖面可提供流体活动线索，但异常不只由泄漏引起。少量观测的定位应保留不确定性。",
  "how": "先按合成异常源生成温度观测，参考对训练非线性逆映射；目标只读取温度，不读取深度标签。",
  "data": "独立合成参考、校准和测试记录。输入包括浅部温度扰动、中浅部温度扰动、中深部温度扰动、深部温度扰动；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "只含一个理想热异常源，没有井筒传热、多相流或多泄漏点反演。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "浅部温度扰动",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中浅部温度扰动",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中深部温度扰动",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "深部温度扰动",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "候选深度示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括浅部温度扰动、中浅部温度扰动、中深部温度扰动、深部温度扰动；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "四位置观测解释温度异常",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "岭回归从四个位置的合成温度扰动学习单个异常源的深度代理。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "先按合成异常源生成温度观测，参考对训练非线性逆映射；目标只读取温度，不读取深度标签。",
      "effect": "深度预测与参考标签对照",
      "trap": "只含一个理想热异常源，没有井筒传热、多相流或多泄漏点反演。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "井筒温度剖面可提供流体活动线索，但异常不只由泄漏引起。少量观测的定位应保留不确定性。",
      "effect": "区间揭示稀疏定位歧义",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "四位置观测解释温度异常",
    "深度预测与参考标签对照",
    "区间揭示稀疏定位歧义"
  ],
  "extension": {
    "key": "leak-depth",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Defining Production Logging",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-production-logging",
      "note": "支持温度和流量剖面诊断背景，不执行现场井筒反演。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Temperature-profile leak-candidate localization",
    "stage": "Workover",
    "intro": "Well-temperature profiles can indicate fluid movement, but leakage is not the only cause. Sparse-observation localization needs uncertainty.",
    "concept": "Well-temperature profiles can indicate fluid movement, but leakage is not the only cause. Sparse-observation localization needs uncertainty.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Ridge regression learns a single anomaly-source depth surrogate from four synthetic temperature deviations.",
    "why": "Well-temperature profiles can indicate fluid movement, but leakage is not the only cause. Sparse-observation localization needs uncertainty.",
    "how": "Generate temperatures from synthetic source positions, fit a nonlinear inverse map and infer targets from temperatures without reading their depth labels.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Shallow temperature deviation, Upper-mid deviation, Lower-mid deviation, Deep deviation. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Only one ideal heat anomaly is modeled, without wellbore heat transfer, multiphase flow or multiple leaks. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Shallow temperature deviation",
        "unit": ""
      },
      {
        "name": "Upper-mid deviation",
        "unit": ""
      },
      {
        "name": "Lower-mid deviation",
        "unit": ""
      },
      {
        "name": "Deep deviation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Candidate-depth index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Shallow temperature deviation, Upper-mid deviation, Lower-mid deviation, Deep deviation. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Four-position observations explain temperature anomalies",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Ridge regression learns a single anomaly-source depth surrogate from four synthetic temperature deviations.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Generate temperatures from synthetic source positions, fit a nonlinear inverse map and infer targets from temperatures without reading their depth labels.",
        "effect": "Compare depth predictions and labels",
        "trap": "Only one ideal heat anomaly is modeled, without wellbore heat transfer, multiphase flow or multiple leaks."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Well-temperature profiles can indicate fluid movement, but leakage is not the only cause. Sparse-observation localization needs uncertainty.",
        "effect": "Intervals reveal sparse-localization ambiguity",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Four-position observations explain temperature anomalies",
      "Compare depth predictions and labels",
      "Intervals reveal sparse-localization ambiguity"
    ],
    "references": [
      {
        "title": "SLB Defining Production Logging",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-production-logging",
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
