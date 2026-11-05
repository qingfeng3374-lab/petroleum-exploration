import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-polymer",
  "sceneId": "e3",
  "name": "增采-聚合物黏度保持率预测",
  "title": "聚合物黏度保持率预测",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "opt"
  ],
  "intro": "配方初始黏度不能保证经历地层和剪切后的性能，环境条件需要联合考虑。",
  "concept": "配方初始黏度不能保证经历地层和剪切后的性能，环境条件需要联合考虑。低阶代理也可能漏掉分子过程。",
  "what": "二次岭回归近似浓度与温盐剪切条件到合成黏度保持率的关系。",
  "why": "配方初始黏度不能保证经历地层和剪切后的性能，环境条件需要联合考虑。低阶代理也可能漏掉分子过程。",
  "how": "参考条件生成黏度响应并拟合二次代理，独立测试检查偏差、贡献和校准区间。",
  "data": "独立合成参考、校准和测试记录。输入包括初始浓度指标、温度负担、盐度负担、剪切负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是聚合物分子降解模拟或矿场黏度实测，没有真实配方适用性认证。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "初始浓度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "温度负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "盐度负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "剪切负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "黏度保持率示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括初始浓度指标、温度负担、盐度负担、剪切负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "温盐剪切轨迹解释影响条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归近似浓度与温盐剪切条件到合成黏度保持率的关系。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考条件生成黏度响应并拟合二次代理，独立测试检查偏差、贡献和校准区间。",
      "effect": "保持率预测检查衰减",
      "trap": "不是聚合物分子降解模拟或矿场黏度实测，没有真实配方适用性认证。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "配方初始黏度不能保证经历地层和剪切后的性能，环境条件需要联合考虑。低阶代理也可能漏掉分子过程。",
      "effect": "误差区间揭示低阶近似不足",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "温盐剪切轨迹解释影响条件",
    "保持率预测检查衰减",
    "误差区间揭示低阶近似不足"
  ],
  "extension": {
    "key": "polymer",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Polymer",
      "url": "https://glossary.slb.com/en/terms/p/polymer",
      "note": "用于理解聚合物与黏度，温盐剪切函数由本项目简化设定。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Polymer viscosity-retention prediction",
    "stage": "Enhanced Recovery",
    "intro": "Initial viscosity does not guarantee retention after reservoir conditions and shear. Environmental factors interact, and low-order surrogates can miss molecular effects.",
    "concept": "Initial viscosity does not guarantee retention after reservoir conditions and shear. Environmental factors interact, and low-order surrogates can miss molecular effects.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression approximates synthetic viscosity retention from concentration, temperature, salinity and shear.",
    "why": "Initial viscosity does not guarantee retention after reservoir conditions and shear. Environmental factors interact, and low-order surrogates can miss molecular effects.",
    "how": "Generate reference retention responses, fit a quadratic surrogate and inspect held-out bias, contributions and calibrated intervals.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Initial concentration, Temperature burden, Salinity burden, Shear burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is not molecular-degradation simulation or field viscosity measurement and does not certify a formulation. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Initial concentration",
        "unit": ""
      },
      {
        "name": "Temperature burden",
        "unit": ""
      },
      {
        "name": "Salinity burden",
        "unit": ""
      },
      {
        "name": "Shear burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Viscosity-retention illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Initial concentration, Temperature burden, Salinity burden, Shear burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Tracks explain temperature, salinity and shear",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression approximates synthetic viscosity retention from concentration, temperature, salinity and shear.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Generate reference retention responses, fit a quadratic surrogate and inspect held-out bias, contributions and calibrated intervals.",
        "effect": "Retention predictions inspect degradation",
        "trap": "This is not molecular-degradation simulation or field viscosity measurement and does not certify a formulation."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Initial viscosity does not guarantee retention after reservoir conditions and shear. Environmental factors interact, and low-order surrogates can miss molecular effects.",
        "effect": "Intervals expose low-order approximation limits",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Tracks explain temperature, salinity and shear",
      "Retention predictions inspect degradation",
      "Intervals expose low-order approximation limits"
    ],
    "references": [
      {
        "title": "SLB Polymer",
        "url": "https://glossary.slb.com/en/terms/p/polymer",
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
