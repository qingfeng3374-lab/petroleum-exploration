import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-w2",
  "sceneId": "w2",
  "name": "测井-储层参数智能解释",
  "title": "储层参数智能解释",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "单曲线解释受岩性和流体影响，多曲线联合可以补充信息但不能替代岩心标定。",
  "concept": "孔隙度、渗透率、饱和度是储层评价的核心参数，常规做法是用岩心标定建立测井曲线与物性参数的回归关系（如孔渗回归、阿尔奇公式）。",
  "what": "二次岭回归融合多条测井响应学习合成孔隙度。",
  "why": "单曲线解释受岩性和流体影响，多曲线联合可以补充信息但不能替代岩心标定。",
  "how": "参考曲线—物性对拟合一次项与交互项，用独立校准区间和测试误差对照均值解释。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：自然伽马指标、密度孔隙指标、中子响应指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "只输出合成孔隙度，不代表真实孔渗饱联合反演或阿尔奇模型替代。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "自然伽马指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "密度孔隙指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中子响应指标",
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
      "do": "参考、校准与测试使用分离的合成观测；输入包括：自然伽马指标、密度孔隙指标、中子响应指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "多曲线说明物性信息互补",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归融合多条测井响应学习合成孔隙度。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考曲线—物性对拟合一次项与交互项，用独立校准区间和测试误差对照均值解释。",
      "effect": "交会图检查解释偏差",
      "trap": "只输出合成孔隙度，不代表真实孔渗饱联合反演或阿尔奇模型替代。"
    },
    {
      "name": "对照与人工复核",
      "do": "单曲线解释受岩性和流体影响，多曲线联合可以补充信息但不能替代岩心标定。",
      "effect": "区间覆盖与失败工况共同复核",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "多曲线说明物性信息互补",
    "交会图检查解释偏差",
    "区间覆盖与失败工况共同复核"
  ],
  "english": {
    "title": "Reservoir property interpretation",
    "stage": "Well Logging",
    "intro": "Single-log interpretation depends on lithology and fluids; combining logs adds information without replacing core calibration.",
    "concept": "Porosity, permeability and saturation are traditionally estimated by core-calibrated log relationships.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression combines log responses to learn synthetic porosity.",
    "why": "Single-log interpretation depends on lithology and fluids; combining logs adds information without replacing core calibration.",
    "how": "Reference logs and properties fit linear and interaction terms. Independent calibration intervals and test errors qualify estimates against a mean baseline.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Gamma ray, Density porosity, Neutron response. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Only synthetic porosity is estimated; this is not joint porosity/permeability/saturation inversion or an Archie-model replacement. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Gamma ray",
        "unit": ""
      },
      {
        "name": "Density porosity",
        "unit": ""
      },
      {
        "name": "Neutron response",
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
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Gamma ray, Density porosity, Neutron response. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Logs reveal complementary property information",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression combines log responses to learn synthetic porosity.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference logs and properties fit linear and interaction terms. Independent calibration intervals and test errors qualify estimates against a mean baseline.",
        "effect": "Crossplots inspect property errors",
        "trap": "Only synthetic porosity is estimated; this is not joint porosity/permeability/saturation inversion or an Archie-model replacement."
      },
      {
        "name": "Compare and review",
        "do": "Single-log interpretation depends on lithology and fluids; combining logs adds information without replacing core calibration.",
        "effect": "Review interval coverage and shifted conditions",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Logs reveal complementary property information",
      "Crossplots inspect property errors",
      "Review interval coverage and shifted conditions"
    ]
  }
} satisfies SceneCaseDef;
