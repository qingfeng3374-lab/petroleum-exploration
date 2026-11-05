import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-r4",
  "sceneId": "r4",
  "name": "加工-化验数据智能审核",
  "title": "化验数据智能审核",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常子空间 PCA＋重构残差",
  "methods": [
    "nlp",
    "opt"
  ],
  "intro": "每个数值都在单项范围内也可能互相矛盾，关联残差可以补充传统范围审核。",
  "concept": "炼化企业每天产生大量 LIMS 化验数据，数据质量直接影响装置控制与产品出厂。",
  "what": "PCA学习合成化验指标的正常相关结构，识别组合不一致的可疑记录。",
  "why": "每个数值都在单项范围内也可能互相矛盾，关联残差可以补充传统范围审核。",
  "how": "只用正常化验参考记录拟合子空间与阈值，测试注入单指标录入偏移，定位主要残差来源。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：密度关联指标、馏程关联指标、硫含量关联指标、黏度关联指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "本例只实现结构化关联审核，没有化验单OCR、单位换算或文本NLP抽取。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "密度关联指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "馏程关联指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "硫含量关联指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "黏度关联指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "化验复核候选",
      "unit": ""
    }
  ],
  "classes": [
    "一致性正常",
    "需复核记录"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：密度关联指标、馏程关联指标、硫含量关联指标、黏度关联指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "指标联动解释跨项目一致性",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "PCA学习合成化验指标的正常相关结构，识别组合不一致的可疑记录。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "只用正常化验参考记录拟合子空间与阈值，测试注入单指标录入偏移，定位主要残差来源。",
      "effect": "异常残差标记可疑记录",
      "trap": "本例只实现结构化关联审核，没有化验单OCR、单位换算或文本NLP抽取。"
    },
    {
      "name": "对照与人工复核",
      "do": "每个数值都在单项范围内也可能互相矛盾，关联残差可以补充传统范围审核。",
      "effect": "分项贡献辅助人工追溯",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "指标联动解释跨项目一致性",
    "异常残差标记可疑记录",
    "分项贡献辅助人工追溯"
  ],
  "english": {
    "title": "Laboratory data review",
    "stage": "Refining",
    "intro": "Individually in-range measurements can be mutually inconsistent; correlation residuals complement range checks.",
    "concept": "Large LIMS datasets influence process control and product release decisions.",
    "method": "Normal-subspace PCA + reconstruction residuals",
    "what": "PCA learns normal correlations in synthetic laboratory indicators and flags inconsistent combinations.",
    "why": "Individually in-range measurements can be mutually inconsistent; correlation residuals complement range checks.",
    "how": "Fit a subspace and threshold on normal laboratory references, inject entry offsets into test records and locate dominant residuals.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Density relation, Distillation relation, Sulfur relation, Viscosity relation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This case implements structured correlation checks only, without certificate OCR, unit conversion or NLP extraction. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Density relation",
        "unit": ""
      },
      {
        "name": "Distillation relation",
        "unit": ""
      },
      {
        "name": "Sulfur relation",
        "unit": ""
      },
      {
        "name": "Viscosity relation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Lab-review candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Consistent record",
      "Review record"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Density relation, Distillation relation, Sulfur relation, Viscosity relation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Joint tracks explain cross-test consistency",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "PCA learns normal correlations in synthetic laboratory indicators and flags inconsistent combinations.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit a subspace and threshold on normal laboratory references, inject entry offsets into test records and locate dominant residuals.",
        "effect": "Residuals flag suspicious records",
        "trap": "This case implements structured correlation checks only, without certificate OCR, unit conversion or NLP extraction."
      },
      {
        "name": "Compare and review",
        "do": "Individually in-range measurements can be mutually inconsistent; correlation residuals complement range checks.",
        "effect": "Channel contributions support manual traceability",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Joint tracks explain cross-test consistency",
      "Residuals flag suspicious records",
      "Channel contributions support manual traceability"
    ]
  }
} satisfies SceneCaseDef;
