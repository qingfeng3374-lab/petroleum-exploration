import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-cement-contamination",
  "sceneId": "c3",
  "name": "固井-水泥浆污染状态识别",
  "title": "水泥浆污染状态识别",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "classification",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "opt"
  ],
  "intro": "浆体受不同流体污染时，多项性质会共同变化。",
  "concept": "浆体受不同流体污染时，多项性质会共同变化。单一密度判定可能漏掉另一种混入状态。",
  "what": "kNN联合电导、密度和一致性特征识别三种合成混合状态。",
  "why": "浆体受不同流体污染时，多项性质会共同变化。单一密度判定可能漏掉另一种混入状态。",
  "how": "参考混合记录训练标准化近邻库，目标记录按多指标距离投票；扰动和漂移用于检查误判。",
  "data": "独立合成参考与测试记录。输入包括电导指标、密度指标、一致性指标、相容性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "标签不是实际污染比例或失效判定，没有水泥化学反应与流变仪标定。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "电导指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "密度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "一致性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "相容性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "污染模式候选",
      "unit": ""
    }
  ],
  "classes": [
    "洁净参考",
    "泥浆混入参考",
    "隔离液混入参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括电导指标、密度指标、一致性指标、相容性指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "多指标展示污染组合",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "kNN联合电导、密度和一致性特征识别三种合成混合状态。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考混合记录训练标准化近邻库，目标记录按多指标距离投票；扰动和漂移用于检查误判。",
      "effect": "参考距离解释类别选择",
      "trap": "标签不是实际污染比例或失效判定，没有水泥化学反应与流变仪标定。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "浆体受不同流体污染时，多项性质会共同变化。单一密度判定可能漏掉另一种混入状态。",
      "effect": "错分对照提示复测试验",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "多指标展示污染组合",
    "参考距离解释类别选择",
    "错分对照提示复测试验"
  ],
  "extension": {
    "key": "cement-contamination",
    "task": "classification"
  },
  "references": [
    {
      "title": "SLB Spacer Fluid",
      "url": "https://glossary.slb.com/en/terms/s/spacer_fluid",
      "note": "用于理解流体相容与污染问题，类别是简化的合成参考。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Cement-contamination pattern recognition",
    "stage": "Cementing",
    "intro": "Different contaminating fluids alter several properties together. A density-only decision can miss another mixing state.",
    "concept": "Different contaminating fluids alter several properties together. A density-only decision can miss another mixing state.",
    "method": "Multivariable observed features + kNN",
    "what": "kNN combines conductivity, density and consistency to identify three synthetic mixing states.",
    "why": "Different contaminating fluids alter several properties together. A density-only decision can miss another mixing state.",
    "how": "Reference mixtures train a standardized neighbor bank; target records vote by multivariable distance, with noise and shift checks.",
    "data": "Independent synthetic reference and test records. Inputs include Conductivity, Density, Consistency, Compatibility. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Labels are not actual contamination fractions or failure judgments; cement chemistry and rheometer calibration are omitted. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Conductivity",
        "unit": ""
      },
      {
        "name": "Density",
        "unit": ""
      },
      {
        "name": "Consistency",
        "unit": ""
      },
      {
        "name": "Compatibility",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Contamination-pattern candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Clean reference",
      "Mud-mixed reference",
      "Spacer-mixed reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Conductivity, Density, Consistency, Compatibility. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Multiple indicators reveal contamination patterns",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "kNN combines conductivity, density and consistency to identify three synthetic mixing states.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference mixtures train a standardized neighbor bank; target records vote by multivariable distance, with noise and shift checks.",
        "effect": "Reference distances explain class selection",
        "trap": "Labels are not actual contamination fractions or failure judgments; cement chemistry and rheometer calibration are omitted."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Different contaminating fluids alter several properties together. A density-only decision can miss another mixing state.",
        "effect": "Errors indicate where retesting is needed",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Multiple indicators reveal contamination patterns",
      "Reference distances explain class selection",
      "Errors indicate where retesting is needed"
    ],
    "references": [
      {
        "title": "SLB Spacer Fluid",
        "url": "https://glossary.slb.com/en/terms/s/spacer_fluid",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Nearest Neighbors",
        "url": "https://scikit-learn.org/stable/modules/neighbors.html",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
