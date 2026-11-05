import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-s4",
  "sceneId": "s4",
  "name": "物探-储层参数反演",
  "title": "储层参数反演",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "cv",
    "opt"
  ],
  "intro": "多个属性对孔隙度存在耦合，单一固定均值无法区分储层差异；反演结果需要独立井验证。",
  "concept": "从地震数据反演孔隙度、砂体厚度等储层参数，是把\"反射同相轴\"变成\"储层模型\"的关键一步，传统依赖稀疏井约束下的模型反演。",
  "what": "二次特征岭回归拟合地震属性与合成孔隙度的非线性关联。",
  "why": "多个属性对孔隙度存在耦合，单一固定均值无法区分储层差异；反演结果需要独立井验证。",
  "how": "参考属性—孔隙度配对记录拟合代理，独立校准误差给出区间，测试集比较均值基线。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：声阻抗指标、振幅属性、衰减属性。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "仅反演一个合成物性指标，没有速度模型、地震正演或真实岩心标定。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "声阻抗指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "振幅属性",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "衰减属性",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "孔隙度指标",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：声阻抗指标、振幅属性、衰减属性。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "属性轨迹展示输入范围",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次特征岭回归拟合地震属性与合成孔隙度的非线性关联。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考属性—孔隙度配对记录拟合代理，独立校准误差给出区间，测试集比较均值基线。",
      "effect": "预测交会图检查孔隙度偏差",
      "trap": "仅反演一个合成物性指标，没有速度模型、地震正演或真实岩心标定。"
    },
    {
      "name": "对照与人工复核",
      "do": "多个属性对孔隙度存在耦合，单一固定均值无法区分储层差异；反演结果需要独立井验证。",
      "effect": "区间覆盖率揭示不确定性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "属性轨迹展示输入范围",
    "预测交会图检查孔隙度偏差",
    "区间覆盖率揭示不确定性"
  ],
  "english": {
    "title": "Reservoir parameter inversion",
    "stage": "Geophysics",
    "intro": "Coupled attributes affect porosity. A constant mean misses reservoir differences; inversion still requires independent wells.",
    "concept": "Inversion turns seismic observations into estimates of porosity, sand thickness and other reservoir properties.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression fits nonlinear associations between seismic attributes and synthetic porosity.",
    "why": "Coupled attributes affect porosity. A constant mean misses reservoir differences; inversion still requires independent wells.",
    "how": "Paired reference attributes and porosity fit a surrogate. Independent calibration supplies intervals, with mean-baseline comparison on held-out records.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Acoustic impedance, Amplitude attribute, Attenuation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Only one synthetic property is inverted; there is no velocity model, seismic forward solver or core calibration. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Acoustic impedance",
        "unit": ""
      },
      {
        "name": "Amplitude attribute",
        "unit": ""
      },
      {
        "name": "Attenuation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Porosity index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Acoustic impedance, Amplitude attribute, Attenuation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Attribute tracks show input ranges",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression fits nonlinear associations between seismic attributes and synthetic porosity.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Paired reference attributes and porosity fit a surrogate. Independent calibration supplies intervals, with mean-baseline comparison on held-out records.",
        "effect": "Crossplots expose porosity errors",
        "trap": "Only one synthetic property is inverted; there is no velocity model, seismic forward solver or core calibration."
      },
      {
        "name": "Compare and review",
        "do": "Coupled attributes affect porosity. A constant mean misses reservoir differences; inversion still requires independent wells.",
        "effect": "Interval coverage exposes uncertainty",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Attribute tracks show input ranges",
      "Crossplots expose porosity errors",
      "Interval coverage exposes uncertainty"
    ]
  }
} satisfies SceneCaseDef;
