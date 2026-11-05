import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-cuttings-mixture",
  "sceneId": "m1",
  "name": "录井-岩屑颜色混合组分反演",
  "title": "岩屑颜色混合组分反演",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "multi",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "cv"
  ],
  "intro": "岩屑可能是多种物质混合，仅给一个主类会丢掉组分信息。",
  "concept": "岩屑可能是多种物质混合，仅给一个主类会丢掉组分信息。比例预测还要满足总量约束。",
  "what": "多输出岭回归学习三组分颜色混合的逆映射，投影成非负且总和100%的比例。",
  "why": "岩屑可能是多种物质混合，仅给一个主类会丢掉组分信息。比例预测还要满足总量约束。",
  "how": "先按已知合成比例混合三种颜色响应，再从观测RGB拟合反演；切换输出检查每个组分和总和。",
  "data": "独立合成参考、校准和测试记录。输入包括红通道混合强度、绿通道混合强度、蓝通道混合强度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "颜色是理想线性混合，不等于真实矿物体积或质量含量，尚无光照和遮挡建模。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "红通道混合强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "绿通道混合强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "蓝通道混合强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "组分甲比例",
      "unit": ""
    },
    {
      "name": "组分乙比例",
      "unit": ""
    },
    {
      "name": "组分丙比例",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括红通道混合强度、绿通道混合强度、蓝通道混合强度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "颜色观测解释混合输入",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "多输出岭回归学习三组分颜色混合的逆映射，投影成非负且总和100%的比例。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "先按已知合成比例混合三种颜色响应，再从观测RGB拟合反演；切换输出检查每个组分和总和。",
      "effect": "三组分输出检查守恒",
      "trap": "颜色是理想线性混合，不等于真实矿物体积或质量含量，尚无光照和遮挡建模。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "岩屑可能是多种物质混合，仅给一个主类会丢掉组分信息。比例预测还要满足总量约束。",
      "effect": "独立误差揭示反演歧义",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "颜色观测解释混合输入",
    "三组分输出检查守恒",
    "独立误差揭示反演歧义"
  ],
  "extension": {
    "key": "cuttings-mixture",
    "task": "regression",
    "projection": "simplex"
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
    "title": "Cuttings color-mixture inversion",
    "stage": "Mud Logging",
    "intro": "Cuttings can contain mixed materials; one dominant class loses composition information. Fraction predictions must also satisfy a total constraint.",
    "concept": "Cuttings can contain mixed materials; one dominant class loses composition information. Fraction predictions must also satisfy a total constraint.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Multi-output ridge regression learns an inverse map of three-component color mixing and projects fractions to a nonnegative 100% total.",
    "why": "Cuttings can contain mixed materials; one dominant class loses composition information. Fraction predictions must also satisfy a total constraint.",
    "how": "Mix three color responses using known synthetic fractions, fit inversion from observed RGB and inspect each output plus the total.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Red mixture intensity, Green mixture intensity, Blue mixture intensity. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Colors follow ideal linear mixing, not real mineral volume or mass fractions; illumination and occlusion are not modeled. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Red mixture intensity",
        "unit": ""
      },
      {
        "name": "Green mixture intensity",
        "unit": ""
      },
      {
        "name": "Blue mixture intensity",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Component A fraction",
        "unit": ""
      },
      {
        "name": "Component B fraction",
        "unit": ""
      },
      {
        "name": "Component C fraction",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Red mixture intensity, Green mixture intensity, Blue mixture intensity. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Color observations explain mixture inputs",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Multi-output ridge regression learns an inverse map of three-component color mixing and projects fractions to a nonnegative 100% total.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Mix three color responses using known synthetic fractions, fit inversion from observed RGB and inspect each output plus the total.",
        "effect": "Three outputs check conservation",
        "trap": "Colors follow ideal linear mixing, not real mineral volume or mass fractions; illumination and occlusion are not modeled."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Cuttings can contain mixed materials; one dominant class loses composition information. Fraction predictions must also satisfy a total constraint.",
        "effect": "Held-out errors reveal inversion ambiguity",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Color observations explain mixture inputs",
      "Three outputs check conservation",
      "Held-out errors reveal inversion ambiguity"
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
