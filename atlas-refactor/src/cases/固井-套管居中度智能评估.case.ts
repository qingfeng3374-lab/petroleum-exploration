import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-c4",
  "sceneId": "c4",
  "name": "固井-套管居中度智能评估",
  "title": "套管居中度智能评估",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "居中度由井眼、井斜与扶正器共同决定；只有增加数量的经验规则不一定经济。",
  "concept": "套管居中度决定水泥环是否均匀，居中差会导致窄边窜槽。居中度由井径、井斜与扶正器安放共同决定。",
  "what": "从参考几何代理试验学习居中度响应，搜索偏心控制与扶正器配置的可行组合。",
  "why": "居中度由井眼、井斜与扶正器共同决定；只有增加数量的经验规则不一定经济。",
  "how": "固定井斜条件，拟合偏心负担与配置强度的二次关系，在预算遮罩内选择高居中响应。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：井眼偏心负担、扶正器配置强度、井斜负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "仅为配置强度代理，不是逐个扶正器安放的离散力学求解器。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "井眼偏心负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "扶正器配置强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井斜负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "居中度示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：井眼偏心负担、扶正器配置强度、井斜负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "偏心环概念图解释窄边风险",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从参考几何代理试验学习居中度响应，搜索偏心控制与扶正器配置的可行组合。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定井斜条件，拟合偏心负担与配置强度的二次关系，在预算遮罩内选择高居中响应。",
      "effect": "响应网格显示配置权衡",
      "trap": "仅为配置强度代理，不是逐个扶正器安放的离散力学求解器。"
    },
    {
      "name": "对照与人工复核",
      "do": "居中度由井眼、井斜与扶正器共同决定；只有增加数量的经验规则不一定经济。",
      "effect": "预算和代理误差防止过度外推",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "偏心环概念图解释窄边风险",
    "响应网格显示配置权衡",
    "预算和代理误差防止过度外推"
  ],
  "english": {
    "title": "Casing stand-off assessment",
    "stage": "Cementing",
    "intro": "Standoff depends on hole geometry, inclination and centralizers; simply adding devices need not be economical.",
    "concept": "Casing centralization controls cement-ring uniformity and the risk of narrow-side channels.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "Reference geometric-surrogate trials teach standoff response, enabling a feasible search over eccentricity control and centralizer intensity.",
    "why": "Standoff depends on hole geometry, inclination and centralizers; simply adding devices need not be economical.",
    "how": "At fixed inclination, fit a quadratic relation in eccentricity burden and configuration intensity, then select a high-standoff response inside the budget mask.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Eccentricity burden, Centralizer intensity, Inclination burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is a configuration-intensity surrogate, not a discrete mechanical placement solver for individual centralizers. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Eccentricity burden",
        "unit": ""
      },
      {
        "name": "Centralizer intensity",
        "unit": ""
      },
      {
        "name": "Inclination burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Standoff illustration index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Eccentricity burden, Centralizer intensity, Inclination burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Eccentric-ring concept explains narrow-side risk",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Reference geometric-surrogate trials teach standoff response, enabling a feasible search over eccentricity control and centralizer intensity.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed inclination, fit a quadratic relation in eccentricity burden and configuration intensity, then select a high-standoff response inside the budget mask.",
        "effect": "Response grid shows configuration tradeoffs",
        "trap": "This is a configuration-intensity surrogate, not a discrete mechanical placement solver for individual centralizers."
      },
      {
        "name": "Compare and review",
        "do": "Standoff depends on hole geometry, inclination and centralizers; simply adding devices need not be economical.",
        "effect": "Budget and surrogate error limit extrapolation",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Eccentric-ring concept explains narrow-side risk",
      "Response grid shows configuration tradeoffs",
      "Budget and surrogate error limit extrapolation"
    ]
  }
} satisfies SceneCaseDef;
