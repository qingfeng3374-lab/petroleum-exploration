import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-gas-baseline",
  "sceneId": "m2",
  "name": "录井-气测背景漂移校正代理",
  "title": "气测背景漂移校正代理",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "总烃曲线含有背景和循环影响，直接比较不同工况峰值可能误读。",
  "concept": "总烃曲线含有背景和循环影响，直接比较不同工况峰值可能误读。校正需要用独立参考证据检查。",
  "what": "岭回归从背景与循环条件学习气测显示的校正响应。",
  "why": "总烃曲线含有背景和循环影响，直接比较不同工况峰值可能误读。校正需要用独立参考证据检查。",
  "how": "在独立合成参考记录拟合含气、背景与循环交互项，比较校正估计与固定均值，并检查区间覆盖。",
  "data": "独立合成参考、校准和测试记录。输入包括含气响应指标、背景负担、循环条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是实测气体体积分数校准，也未建模脱气率或真正连续基线提取。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "含气响应指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "背景负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "循环条件",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "校正气测显示指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括含气响应指标、背景负担、循环条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "背景与循环轨迹说明偏差",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "岭回归从背景与循环条件学习气测显示的校正响应。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "在独立合成参考记录拟合含气、背景与循环交互项，比较校正估计与固定均值，并检查区间覆盖。",
      "effect": "校正响应与目标对照",
      "trap": "不是实测气体体积分数校准，也未建模脱气率或真正连续基线提取。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "总烃曲线含有背景和循环影响，直接比较不同工况峰值可能误读。校正需要用独立参考证据检查。",
      "effect": "区间检查校正不确定性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "背景与循环轨迹说明偏差",
    "校正响应与目标对照",
    "区间检查校正不确定性"
  ],
  "extension": {
    "key": "gas-baseline",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Defining Mud Logging",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-mud-logging",
      "note": "支持气测、岩屑与迟到时间的专业概念。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Gas-background drift correction surrogate",
    "stage": "Mud Logging",
    "intro": "Total gas includes background and circulation effects; comparing peaks across conditions can mislead. Corrections need independent reference checks.",
    "concept": "Total gas includes background and circulation effects; comparing peaks across conditions can mislead. Corrections need independent reference checks.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Ridge regression learns corrected gas-show responses from background and circulation conditions.",
    "why": "Total gas includes background and circulation effects; comparing peaks across conditions can mislead. Corrections need independent reference checks.",
    "how": "Fit gas/background/circulation interactions on independent references; compare corrected estimates with a mean baseline and inspect interval coverage.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Gas-response index, Background burden, Circulation condition. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is not measured gas-volume calibration and does not model extraction efficiency or continuous baseline extraction. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Gas-response index",
        "unit": ""
      },
      {
        "name": "Background burden",
        "unit": ""
      },
      {
        "name": "Circulation condition",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Corrected gas-show index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Gas-response index, Background burden, Circulation condition. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Background and circulation tracks explain bias",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Ridge regression learns corrected gas-show responses from background and circulation conditions.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit gas/background/circulation interactions on independent references; compare corrected estimates with a mean baseline and inspect interval coverage.",
        "effect": "Compare corrected responses and targets",
        "trap": "This is not measured gas-volume calibration and does not model extraction efficiency or continuous baseline extraction."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Total gas includes background and circulation effects; comparing peaks across conditions can mislead. Corrections need independent reference checks.",
        "effect": "Intervals assess correction uncertainty",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Background and circulation tracks explain bias",
      "Compare corrected responses and targets",
      "Intervals assess correction uncertainty"
    ],
    "references": [
      {
        "title": "SLB Defining Mud Logging",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-mud-logging",
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
