import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-e3",
  "sceneId": "e3",
  "name": "增采-化学驱配方智能筛选",
  "title": "化学驱配方智能筛选",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "高浓度不一定带来高效率，配方协同和盐度使逐项试验难以发现可行组合。",
  "concept": "聚合物驱、表面活性剂驱的配方（类型、浓度、段塞）需通过大量室内实验筛选，再进入矿场试验。",
  "what": "二次代理学习聚合物与表活剂耦合下的合成驱油效率。",
  "why": "高浓度不一定带来高效率，配方协同和盐度使逐项试验难以发现可行组合。",
  "how": "固定盐度条件，预测浓度网格并按资源权重预算筛选，误差图检查代理对配方的近似程度。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：聚合物浓度指标、表活剂浓度指标、矿化度负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不是可直接使用的化学驱配方，未模拟吸附、配伍性或环境约束。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "聚合物浓度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "表活剂浓度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "矿化度负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "驱油效率示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：聚合物浓度指标、表活剂浓度指标、矿化度负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "配方空间说明试验范围",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次代理学习聚合物与表活剂耦合下的合成驱油效率。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定盐度条件，预测浓度网格并按资源权重预算筛选，误差图检查代理对配方的近似程度。",
      "effect": "热图展示配方协同",
      "trap": "不是可直接使用的化学驱配方，未模拟吸附、配伍性或环境约束。"
    },
    {
      "name": "对照与人工复核",
      "do": "高浓度不一定带来高效率，配方协同和盐度使逐项试验难以发现可行组合。",
      "effect": "预算与独立误差减少盲目试配",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "配方空间说明试验范围",
    "热图展示配方协同",
    "预算与独立误差减少盲目试配"
  ],
  "english": {
    "title": "Chemical-flood formulation screening",
    "stage": "Enhanced Recovery",
    "intro": "Higher concentration need not mean higher efficiency; synergy and salinity complicate one-factor testing.",
    "concept": "Polymer and surfactant recipes require extensive laboratory screening before field trials.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "A quadratic surrogate learns synthetic displacement efficiency from polymer/surfactant interactions.",
    "why": "Higher concentration need not mean higher efficiency; synergy and salinity complicate one-factor testing.",
    "how": "At fixed salinity, predict a concentration grid, filter by a resource-weight budget and inspect surrogate errors.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Polymer concentration, Surfactant concentration, Salinity burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is not a usable chemical-flood recipe; adsorption, compatibility and environmental constraints are omitted. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Polymer concentration",
        "unit": ""
      },
      {
        "name": "Surfactant concentration",
        "unit": ""
      },
      {
        "name": "Salinity burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Displacement-efficiency index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Polymer concentration, Surfactant concentration, Salinity burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Formulation space explains trial ranges",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A quadratic surrogate learns synthetic displacement efficiency from polymer/surfactant interactions.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed salinity, predict a concentration grid, filter by a resource-weight budget and inspect surrogate errors.",
        "effect": "Heatmap shows formulation synergy",
        "trap": "This is not a usable chemical-flood recipe; adsorption, compatibility and environmental constraints are omitted."
      },
      {
        "name": "Compare and review",
        "do": "Higher concentration need not mean higher efficiency; synergy and salinity complicate one-factor testing.",
        "effect": "Budget and held-out errors qualify trial selection",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Formulation space explains trial ranges",
      "Heatmap shows formulation synergy",
      "Budget and held-out errors qualify trial selection"
    ]
  }
} satisfies SceneCaseDef;
