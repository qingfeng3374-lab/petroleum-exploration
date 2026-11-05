import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-fouling",
  "sceneId": "r3",
  "name": "加工-换热器污垢热阻代理估计",
  "title": "换热器污垢热阻代理估计",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "换热性能下降可能同时伴随流阻和负荷变化，单温差阈值难以解释能效。",
  "concept": "换热性能下降可能同时伴随流阻和负荷变化，单温差阈值难以解释能效。多源代理应公开误差。",
  "what": "二次岭回归联合换热、流阻与温差指标估计合成污垢热阻。",
  "why": "换热性能下降可能同时伴随流阻和负荷变化，单温差阈值难以解释能效。多源代理应公开误差。",
  "how": "参考工况拟合热阻指数，独立目标对照均值基线，查看流阻与退化交互项和校准区间。",
  "data": "独立合成参考、校准和测试记录。输入包括换热退化指标、流阻指标、流量支持指标、温差负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不计算真实传热系数或热阻单位，没有完整能量衡算与清洗经济模型。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "换热退化指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流阻指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流量支持指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "温差负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "污垢热阻示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括换热退化指标、流阻指标、流量支持指标、温差负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "过程指标解释换热变化",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归联合换热、流阻与温差指标估计合成污垢热阻。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考工况拟合热阻指数，独立目标对照均值基线，查看流阻与退化交互项和校准区间。",
      "effect": "热阻交会图检查代理偏差",
      "trap": "不计算真实传热系数或热阻单位，没有完整能量衡算与清洗经济模型。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "换热性能下降可能同时伴随流阻和负荷变化，单温差阈值难以解释能效。多源代理应公开误差。",
      "effect": "区间辅助清洗复核",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "过程指标解释换热变化",
    "热阻交会图检查代理偏差",
    "区间辅助清洗复核"
  ],
  "extension": {
    "key": "fouling",
    "task": "regression"
  },
  "references": [
    {
      "title": "US DOE Cooling-system Fouling",
      "url": "https://www.energy.gov/cmei/femp/water-efficient-technology-opportunity-side-stream-filtration-cooling-towers",
      "note": "支持结垢、污垢与换热能耗关系，指数不等于实际热阻。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Heat-exchanger fouling-resistance surrogate",
    "stage": "Refining",
    "intro": "Heat-transfer degradation can accompany resistance and load changes; one temperature-difference threshold cannot explain efficiency. A multivariable surrogate should expose its errors.",
    "concept": "Heat-transfer degradation can accompany resistance and load changes; one temperature-difference threshold cannot explain efficiency. A multivariable surrogate should expose its errors.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression combines heat-transfer, flow-resistance and temperature indicators to estimate synthetic fouling resistance.",
    "why": "Heat-transfer degradation can accompany resistance and load changes; one temperature-difference threshold cannot explain efficiency. A multivariable surrogate should expose its errors.",
    "how": "Fit a resistance index on reference conditions, compare with a mean baseline and inspect resistance/degradation interactions and intervals.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Heat-transfer degradation, Flow resistance, Flow support, Temperature burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real heat-transfer coefficients and resistance units are not calculated; full energy balances and cleaning economics are absent. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Heat-transfer degradation",
        "unit": ""
      },
      {
        "name": "Flow resistance",
        "unit": ""
      },
      {
        "name": "Flow support",
        "unit": ""
      },
      {
        "name": "Temperature burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fouling-resistance index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Heat-transfer degradation, Flow resistance, Flow support, Temperature burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Process indicators explain heat-transfer changes",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression combines heat-transfer, flow-resistance and temperature indicators to estimate synthetic fouling resistance.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit a resistance index on reference conditions, compare with a mean baseline and inspect resistance/degradation interactions and intervals.",
        "effect": "Resistance crossplots inspect surrogate error",
        "trap": "Real heat-transfer coefficients and resistance units are not calculated; full energy balances and cleaning economics are absent."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Heat-transfer degradation can accompany resistance and load changes; one temperature-difference threshold cannot explain efficiency. A multivariable surrogate should expose its errors.",
        "effect": "Intervals support cleaning review",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Process indicators explain heat-transfer changes",
      "Resistance crossplots inspect surrogate error",
      "Intervals support cleaning review"
    ],
    "references": [
      {
        "title": "US DOE Cooling-system Fouling",
        "url": "https://www.energy.gov/cmei/femp/water-efficient-technology-opportunity-side-stream-filtration-cooling-towers",
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
