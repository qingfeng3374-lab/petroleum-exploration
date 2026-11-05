import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-pr3",
  "sceneId": "pr3",
  "name": "采油-智能注水调配",
  "title": "智能注水调配",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "把水全分给单层可能增加窜流和低效循环，配注需要联合考虑边际响应。",
  "concept": "分层注水是保持地层能量、控制含水上升的主要手段，配注量需在层间均衡与整体波及之间权衡。",
  "what": "二次代理学习两层配注与综合响应，再在总资源约束内搜索组合。",
  "why": "把水全分给单层可能增加窜流和低效循环，配注需要联合考虑边际响应。",
  "how": "固定窜流条件生成两层配注网格，以0.55和0.45的资源权重限制组合，再选择预测综合响应最大点。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：第一层配注指标、第二层配注指标、层间窜流指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有真实注采连通模型或注水压力上限，综合响应不能当作增油预测。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "第一层配注指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "第二层配注指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "层间窜流指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "稳油控水综合响应",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：第一层配注指标、第二层配注指标、层间窜流指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "层间特征解释配注条件",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次代理学习两层配注与综合响应，再在总资源约束内搜索组合。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定窜流条件生成两层配注网格，以0.55和0.45的资源权重限制组合，再选择预测综合响应最大点。",
      "effect": "热图展示边际效益递减",
      "trap": "没有真实注采连通模型或注水压力上限，综合响应不能当作增油预测。"
    },
    {
      "name": "对照与人工复核",
      "do": "把水全分给单层可能增加窜流和低效循环，配注需要联合考虑边际响应。",
      "effect": "预算边界约束总资源",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "层间特征解释配注条件",
    "热图展示边际效益递减",
    "预算边界约束总资源"
  ],
  "english": {
    "title": "Layered water-injection allocation",
    "stage": "Production",
    "intro": "Allocating all water to one layer can increase crossflow and ineffective cycling; marginal responses need joint consideration.",
    "concept": "Injection allocation balances layer contributions, pressure support and water-cut control.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "A quadratic surrogate learns two-layer allocation response and searches within a shared-resource constraint.",
    "why": "Allocating all water to one layer can increase crossflow and ineffective cycling; marginal responses need joint consideration.",
    "how": "At fixed crossflow, evaluate a two-layer grid with resource weights 0.55 and 0.45, selecting the highest predicted feasible response.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Layer-one allocation, Layer-two allocation, Crossflow indicator. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No real injection-production connectivity or pressure limit is modeled; the response is not an incremental-oil forecast. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Layer-one allocation",
        "unit": ""
      },
      {
        "name": "Layer-two allocation",
        "unit": ""
      },
      {
        "name": "Crossflow indicator",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Oil-water balancing response",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Layer-one allocation, Layer-two allocation, Crossflow indicator. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Layer features explain allocation conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A quadratic surrogate learns two-layer allocation response and searches within a shared-resource constraint.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed crossflow, evaluate a two-layer grid with resource weights 0.55 and 0.45, selecting the highest predicted feasible response.",
        "effect": "Heatmap reveals diminishing marginal benefit",
        "trap": "No real injection-production connectivity or pressure limit is modeled; the response is not an incremental-oil forecast."
      },
      {
        "name": "Compare and review",
        "do": "Allocating all water to one layer can increase crossflow and ineffective cycling; marginal responses need joint consideration.",
        "effect": "Budget boundary constrains shared resources",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Layer features explain allocation conditions",
      "Heatmap reveals diminishing marginal benefit",
      "Budget boundary constrains shared resources"
    ]
  }
} satisfies SceneCaseDef;
