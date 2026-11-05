import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-e2",
  "sceneId": "e2",
  "name": "增采-压裂裂缝形态预测",
  "title": "压裂裂缝形态预测",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "multi",
  "method": "多输出二次岭回归",
  "methods": [
    "cv",
    "opt"
  ],
  "intro": "改造规模不能用单一长度表示，长度增长与高度失控需要分开检查。",
  "concept": "裂缝几何（长度、高度、导流能力）决定改造效果，目前主要通过微地震监测与施工曲线反演间接获得。",
  "what": "多输出二次岭回归融合施工与地质指标预测裂缝半长和高度。",
  "why": "改造规模不能用单一长度表示，长度增长与高度失控需要分开检查。",
  "how": "参考合成裂缝几何训练每个输出，切换目标查看独立误差与校准区间，并同时列出两种几何预测。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：注入强度指标、应力差指标、天然裂缝指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有微地震定位或裂缝力学求解，几何示意值不代表实测米数。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "注入强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "应力差指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "天然裂缝指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "裂缝半长示意值",
      "unit": ""
    },
    {
      "name": "裂缝高度示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：注入强度指标、应力差指标、天然裂缝指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "地质施工输入展示控制因素",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "多输出二次岭回归融合施工与地质指标预测裂缝半长和高度。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考合成裂缝几何训练每个输出，切换目标查看独立误差与校准区间，并同时列出两种几何预测。",
      "effect": "双输出解释长度高度差异",
      "trap": "没有微地震定位或裂缝力学求解，几何示意值不代表实测米数。"
    },
    {
      "name": "对照与人工复核",
      "do": "改造规模不能用单一长度表示，长度增长与高度失控需要分开检查。",
      "effect": "误差区间检查外推风险",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "地质施工输入展示控制因素",
    "双输出解释长度高度差异",
    "误差区间检查外推风险"
  ],
  "english": {
    "title": "Hydraulic-fracture geometry",
    "stage": "Enhanced Recovery",
    "intro": "Stimulation geometry is not one length; half-length growth and height growth require separate review.",
    "concept": "Fracture length, height and conductivity are inferred indirectly from microseismic and treatment measurements.",
    "method": "Multi-output quadratic ridge regression",
    "what": "Multi-output quadratic ridge regression combines treatment and geological indices to predict fracture half-length and height.",
    "why": "Stimulation geometry is not one length; half-length growth and height growth require separate review.",
    "how": "Synthetic reference geometry fits each output. Switch targets to inspect errors and intervals while listing both predictions.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Injection intensity, Stress contrast, Natural-fracture index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No microseismic location or fracture-mechanics solver is used; illustrative geometry is not measured meters. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Injection intensity",
        "unit": ""
      },
      {
        "name": "Stress contrast",
        "unit": ""
      },
      {
        "name": "Natural-fracture index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fracture half-length",
        "unit": ""
      },
      {
        "name": "Fracture height",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Injection intensity, Stress contrast, Natural-fracture index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Input tracks show geological and treatment factors",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Multi-output quadratic ridge regression combines treatment and geological indices to predict fracture half-length and height.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Synthetic reference geometry fits each output. Switch targets to inspect errors and intervals while listing both predictions.",
        "effect": "Two outputs distinguish length and height",
        "trap": "No microseismic location or fracture-mechanics solver is used; illustrative geometry is not measured meters."
      },
      {
        "name": "Compare and review",
        "do": "Stimulation geometry is not one length; half-length growth and height growth require separate review.",
        "effect": "Intervals inspect extrapolation risk",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Input tracks show geological and treatment factors",
      "Two outputs distinguish length and height",
      "Intervals inspect extrapolation risk"
    ]
  }
} satisfies SceneCaseDef;
