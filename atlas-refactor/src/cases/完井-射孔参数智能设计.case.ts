import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-co2",
  "sceneId": "co2",
  "name": "完井-射孔参数智能设计",
  "title": "射孔参数智能设计",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "高产能方案可能伴随更高出砂风险；同时呈现两个目标比给出单一最优值更有助于设计取舍。",
  "concept": "射孔参数（孔密、相位、穿深）影响产能与出砂风险，设计需在储层强度、完井方式与产能目标之间取平衡。",
  "what": "两个二次岭回归代理分别学习产能与出砂风险，再做约束搜索和帕累托筛选。",
  "why": "高产能方案可能伴随更高出砂风险；同时呈现两个目标比给出单一最优值更有助于设计取舍。",
  "how": "预测21×21组合，只保留成本预算内且预测出砂风险不高于0.45的点，再剔除被其他点支配的方案。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：孔密指标、穿深指标、储层强度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "出砂阈值、预算和产能均为合成教学指标，不是实际射孔设计限值。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "孔密指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "穿深指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "储层强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "产能响应指数",
      "unit": ""
    },
    {
      "name": "出砂风险响应",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：孔密指标、穿深指标、储层强度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "输入范围说明设计条件",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "两个二次岭回归代理分别学习产能与出砂风险，再做约束搜索和帕累托筛选。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "预测21×21组合，只保留成本预算内且预测出砂风险不高于0.45的点，再剔除被其他点支配的方案。",
      "effect": "紫色点标记产能风险帕累托候选",
      "trap": "出砂阈值、预算和产能均为合成教学指标，不是实际射孔设计限值。"
    },
    {
      "name": "对照与人工复核",
      "do": "高产能方案可能伴随更高出砂风险；同时呈现两个目标比给出单一最优值更有助于设计取舍。",
      "effect": "同时查看两项响应与独立误差",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "输入范围说明设计条件",
    "紫色点标记产能风险帕累托候选",
    "同时查看两项响应与独立误差"
  ],
  "english": {
    "title": "Perforation design for completion",
    "stage": "Completion",
    "intro": "High productivity can increase sanding risk. Showing both targets supports tradeoffs better than a single best value.",
    "concept": "Shot density, phasing and penetration balance productivity against rock strength and sanding risk.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "Two quadratic ridge surrogates learn productivity and sand-risk responses, followed by constrained search and Pareto filtering.",
    "why": "High productivity can increase sanding risk. Showing both targets supports tradeoffs better than a single best value.",
    "how": "Predict a 21×21 grid, retain points within cost budget and predicted sand risk at most 0.45, then remove dominated alternatives.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Shot density, Penetration, Formation strength. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Sanding threshold, budget and productivity are synthetic teaching indices, not operational design limits. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Shot density",
        "unit": ""
      },
      {
        "name": "Penetration",
        "unit": ""
      },
      {
        "name": "Formation strength",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Productivity response",
        "unit": ""
      },
      {
        "name": "Sand-risk response",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Shot density, Penetration, Formation strength. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Inputs explain design conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Two quadratic ridge surrogates learn productivity and sand-risk responses, followed by constrained search and Pareto filtering.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Predict a 21×21 grid, retain points within cost budget and predicted sand risk at most 0.45, then remove dominated alternatives.",
        "effect": "Purple points mark productivity-risk Pareto alternatives",
        "trap": "Sanding threshold, budget and productivity are synthetic teaching indices, not operational design limits."
      },
      {
        "name": "Compare and review",
        "do": "High productivity can increase sanding risk. Showing both targets supports tradeoffs better than a single best value.",
        "effect": "Inspect both responses and held-out errors",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Inputs explain design conditions",
      "Purple points mark productivity-risk Pareto alternatives",
      "Inspect both responses and held-out errors"
    ]
  }
} satisfies SceneCaseDef;
