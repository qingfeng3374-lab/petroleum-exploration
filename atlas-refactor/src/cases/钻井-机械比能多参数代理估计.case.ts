import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-mse",
  "sceneId": "d1",
  "name": "钻井-机械比能多参数代理估计",
  "title": "机械比能多参数代理估计",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "机械比能关联单位破岩体积所需能量。",
  "concept": "机械比能关联单位破岩体积所需能量。仅追求高钻速可能忽略能量利用和工况变化。",
  "what": "二次岭回归学习钻压、扭矩、转速和钻速对合成比能指数的耦合。",
  "why": "机械比能关联单位破岩体积所需能量。仅追求高钻速可能忽略能量利用和工况变化。",
  "how": "参考工况按简化能量函数生成响应并拟合代理；独立数据对照均值估计，检查转速与扭矩交互贡献。",
  "data": "独立合成参考、校准和测试记录。输入包括钻压指标、扭矩指标、转速指标、钻速指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "未使用实际钻头面积或完整Teale单位换算，比能指数不等于现场MSE。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "钻压指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "扭矩指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "转速指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "钻速指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "比能示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括钻压指标、扭矩指标、转速指标、钻速指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "工况轨迹解释能量来源",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归学习钻压、扭矩、转速和钻速对合成比能指数的耦合。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考工况按简化能量函数生成响应并拟合代理；独立数据对照均值估计，检查转速与扭矩交互贡献。",
      "effect": "预测交会检查代理精度",
      "trap": "未使用实际钻头面积或完整Teale单位换算，比能指数不等于现场MSE。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "机械比能关联单位破岩体积所需能量。仅追求高钻速可能忽略能量利用和工况变化。",
      "effect": "交互贡献避免单变量误读",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "工况轨迹解释能量来源",
    "预测交会检查代理精度",
    "交互贡献避免单变量误读"
  ],
  "extension": {
    "key": "mse",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Mechanical Specific Energy",
      "url": "https://glossary.slb.com/en/terms/m/mechanical_specific_energy",
      "note": "支持机械比能与钻井效率概念，不提供现场钻参。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Multivariable mechanical-specific-energy surrogate",
    "stage": "Drilling",
    "intro": "Mechanical specific energy concerns energy per removed rock volume. Pursuing penetration alone can miss energy utilization and operating changes.",
    "concept": "Mechanical specific energy concerns energy per removed rock volume. Pursuing penetration alone can miss energy utilization and operating changes.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns coupled weight, torque, speed and penetration effects on a synthetic energy index.",
    "why": "Mechanical specific energy concerns energy per removed rock volume. Pursuing penetration alone can miss energy utilization and operating changes.",
    "how": "Generate reference responses with a simplified energy function, fit a surrogate and evaluate against a mean baseline with torque-speed interaction inspection.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Weight-on-bit index, Torque index, Rotational-speed index, Penetration-rate index. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real bit area and complete Teale unit conversion are omitted; the index is not field MSE. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Weight-on-bit index",
        "unit": ""
      },
      {
        "name": "Torque index",
        "unit": ""
      },
      {
        "name": "Rotational-speed index",
        "unit": ""
      },
      {
        "name": "Penetration-rate index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Specific-energy illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Weight-on-bit index, Torque index, Rotational-speed index, Penetration-rate index. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Operating tracks explain energy sources",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression learns coupled weight, torque, speed and penetration effects on a synthetic energy index.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Generate reference responses with a simplified energy function, fit a surrogate and evaluate against a mean baseline with torque-speed interaction inspection.",
        "effect": "Crossplots inspect surrogate accuracy",
        "trap": "Real bit area and complete Teale unit conversion are omitted; the index is not field MSE."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Mechanical specific energy concerns energy per removed rock volume. Pursuing penetration alone can miss energy utilization and operating changes.",
        "effect": "Interactions prevent one-variable interpretations",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Operating tracks explain energy sources",
      "Crossplots inspect surrogate accuracy",
      "Interactions prevent one-variable interpretations"
    ],
    "references": [
      {
        "title": "SLB Mechanical Specific Energy",
        "url": "https://glossary.slb.com/en/terms/m/mechanical_specific_energy",
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
