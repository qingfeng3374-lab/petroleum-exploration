import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-distillation",
  "sceneId": "r1",
  "name": "加工-原油馏程分位点预测",
  "title": "原油馏程分位点预测",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "multi",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "opt"
  ],
  "intro": "馏程反映不同挥发组分的分离，多个分位点应保持顺序。",
  "concept": "馏程反映不同挥发组分的分离，多个分位点应保持顺序。独立预测若不检查顺序，可能给出相互矛盾的结果。",
  "what": "三个岭回归模型预测合成T10、T50、T90，再施加单调不减投影。",
  "why": "馏程反映不同挥发组分的分离，多个分位点应保持顺序。独立预测若不检查顺序，可能给出相互矛盾的结果。",
  "how": "参考原料属性拟合三个目标，按输出切换系数和误差；完整表核对T10不高于T50、T50不高于T90。",
  "data": "独立合成参考、校准和测试记录。输入包括重质程度指标、组分离散度、原料特性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "示意温度没有ASTM试验认证，也未模拟蒸馏塔或严格的馏程曲线。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "重质程度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "组分离散度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "原料特性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "T10示意温度",
      "unit": ""
    },
    {
      "name": "T50示意温度",
      "unit": ""
    },
    {
      "name": "T90示意温度",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括重质程度指标、组分离散度、原料特性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "原料属性说明馏程条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "三个岭回归模型预测合成T10、T50、T90，再施加单调不减投影。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考原料属性拟合三个目标，按输出切换系数和误差；完整表核对T10不高于T50、T50不高于T90。",
      "effect": "多输出表检查分位顺序",
      "trap": "示意温度没有ASTM试验认证，也未模拟蒸馏塔或严格的馏程曲线。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "馏程反映不同挥发组分的分离，多个分位点应保持顺序。独立预测若不检查顺序，可能给出相互矛盾的结果。",
      "effect": "区间揭示原料变化风险",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "原料属性说明馏程条件",
    "多输出表检查分位顺序",
    "区间揭示原料变化风险"
  ],
  "extension": {
    "key": "distillation",
    "task": "regression",
    "projection": "ordered"
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
    "title": "Crude-distillation quantile prediction",
    "stage": "Refining",
    "intro": "Distillation describes separation by volatility, and quantiles must retain order. Independent predictions can conflict without order checks.",
    "concept": "Distillation describes separation by volatility, and quantiles must retain order. Independent predictions can conflict without order checks.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Three ridge models predict synthetic T10, T50 and T90, followed by a nondecreasing projection.",
    "why": "Distillation describes separation by volatility, and quantiles must retain order. Independent predictions can conflict without order checks.",
    "how": "Fit three targets from feed references, switch coefficients and errors by output and verify T10 ≤ T50 ≤ T90 in the full table.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Heaviness index, Composition spread, Feed-property index. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Illustrative temperatures are not ASTM-certified measurements and do not simulate a column or rigorous distillation curve. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Heaviness index",
        "unit": ""
      },
      {
        "name": "Composition spread",
        "unit": ""
      },
      {
        "name": "Feed-property index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "T10 illustration",
        "unit": ""
      },
      {
        "name": "T50 illustration",
        "unit": ""
      },
      {
        "name": "T90 illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Heaviness index, Composition spread, Feed-property index. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Feed properties explain distillation conditions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Three ridge models predict synthetic T10, T50 and T90, followed by a nondecreasing projection.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit three targets from feed references, switch coefficients and errors by output and verify T10 ≤ T50 ≤ T90 in the full table.",
        "effect": "Multi-output tables check quantile order",
        "trap": "Illustrative temperatures are not ASTM-certified measurements and do not simulate a column or rigorous distillation curve."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Distillation describes separation by volatility, and quantiles must retain order. Independent predictions can conflict without order checks.",
        "effect": "Intervals expose feed-shift risk",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Feed properties explain distillation conditions",
      "Multi-output tables check quantile order",
      "Intervals expose feed-shift risk"
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
