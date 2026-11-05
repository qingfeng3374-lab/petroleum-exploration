import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-velocity",
  "sceneId": "s3",
  "name": "物探-时距观测速度代理回归",
  "title": "时距观测速度代理回归",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "走时随炮检距呈双曲线变化，不能把一个到时直接当作速度。",
  "concept": "走时随炮检距呈双曲线变化，不能把一个到时直接当作速度。多个偏移观测可提供互补约束。",
  "what": "合成单层NMO时距观测训练二次岭回归，学习走时组合到速度的代理关系。",
  "why": "走时随炮检距呈双曲线变化，不能把一个到时直接当作速度。多个偏移观测可提供互补约束。",
  "how": "生成不同层速度和零偏移时间的参考炮集观测，加入走时噪声后拟合代理；独立测试比较固定均值速度。",
  "data": "独立合成参考、校准和测试记录。输入包括零偏移走时、第一偏移走时、第二偏移走时、独立属性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "只模拟水平单层时距关系，没有实际速度谱、各向异性或深度偏移。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "零偏移走时",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "第一偏移走时",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "第二偏移走时",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "独立属性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "模拟层速度",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括零偏移走时、第一偏移走时、第二偏移走时、独立属性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "多偏移走时说明输入条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "合成单层NMO时距观测训练二次岭回归，学习走时组合到速度的代理关系。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "生成不同层速度和零偏移时间的参考炮集观测，加入走时噪声后拟合代理；独立测试比较固定均值速度。",
      "effect": "速度交会图检查反演偏差",
      "trap": "只模拟水平单层时距关系，没有实际速度谱、各向异性或深度偏移。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "走时随炮检距呈双曲线变化，不能把一个到时直接当作速度。多个偏移观测可提供互补约束。",
      "effect": "区间和噪声揭示病态性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "多偏移走时说明输入条件",
    "速度交会图检查反演偏差",
    "区间和噪声揭示病态性"
  ],
  "extension": {
    "key": "velocity",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Normal Moveout",
      "url": "https://glossary.slb.com/terms/n/normal_moveout",
      "note": "支持时距双曲线的专业概念；合成单层模型不含各向异性。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Velocity surrogate from moveout observations",
    "stage": "Geophysics",
    "intro": "Travel time varies hyperbolically with offset; one arrival is not a velocity. Multiple offsets provide complementary constraints.",
    "concept": "Travel time varies hyperbolically with offset; one arrival is not a velocity. Multiple offsets provide complementary constraints.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Synthetic single-layer NMO observations train a quadratic ridge surrogate from travel-time combinations to velocity.",
    "why": "Travel time varies hyperbolically with offset; one arrival is not a velocity. Multiple offsets provide complementary constraints.",
    "how": "Generate reference travel times at different velocities and zero-offset times, add measurement noise and fit the surrogate; compare with constant mean velocity on held-out cases.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Zero-offset time, First-offset time, Second-offset time, Auxiliary attribute. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Only a horizontal single-layer moveout relation is simulated, without real semblance analysis, anisotropy or depth migration. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Zero-offset time",
        "unit": ""
      },
      {
        "name": "First-offset time",
        "unit": ""
      },
      {
        "name": "Second-offset time",
        "unit": ""
      },
      {
        "name": "Auxiliary attribute",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Simulated layer velocity",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Zero-offset time, First-offset time, Second-offset time, Auxiliary attribute. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Multiple offsets explain input conditions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Synthetic single-layer NMO observations train a quadratic ridge surrogate from travel-time combinations to velocity.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Generate reference travel times at different velocities and zero-offset times, add measurement noise and fit the surrogate; compare with constant mean velocity on held-out cases.",
        "effect": "Velocity crossplots inspect inversion errors",
        "trap": "Only a horizontal single-layer moveout relation is simulated, without real semblance analysis, anisotropy or depth migration."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Travel time varies hyperbolically with offset; one arrival is not a velocity. Multiple offsets provide complementary constraints.",
        "effect": "Intervals and noise expose ill-conditioning",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Multiple offsets explain input conditions",
      "Velocity crossplots inspect inversion errors",
      "Intervals and noise expose ill-conditioning"
    ],
    "references": [
      {
        "title": "SLB Normal Moveout",
        "url": "https://glossary.slb.com/terms/n/normal_moveout",
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
