import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-e4",
  "sceneId": "e4",
  "name": "增采-蒸汽吞吐注采参数优化",
  "title": "蒸汽吞吐注采参数优化",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "增加注汽和延长焖井都有收益递减，资源预算下需要比较组合而不是无限加量。",
  "concept": "稠油蒸汽吞吐的周期注汽量、焖井时间与采液速度直接决定周期产量与油汽比。",
  "what": "二次岭回归学习注汽量、焖井时间与热损失的周期响应。",
  "why": "增加注汽和延长焖井都有收益递减，资源预算下需要比较组合而不是无限加量。",
  "how": "固定热损失条件，对注汽—焖井组合建立预测网格，以教学资源约束筛选高响应候选。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：注汽量指标、焖井时长指标、热损失指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "只示范单周期响应代理，没有多周期热传导或真实油汽比预测。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "注汽量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "焖井时长指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "热损失指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "周期热采综合响应",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：注汽量指标、焖井时长指标、热损失指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "输入指标解释热采条件",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归学习注汽量、焖井时间与热损失的周期响应。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定热损失条件，对注汽—焖井组合建立预测网格，以教学资源约束筛选高响应候选。",
      "effect": "响应网格展示收益递减",
      "trap": "只示范单周期响应代理，没有多周期热传导或真实油汽比预测。"
    },
    {
      "name": "对照与人工复核",
      "do": "增加注汽和延长焖井都有收益递减，资源预算下需要比较组合而不是无限加量。",
      "effect": "预算与误差共同约束选择",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "输入指标解释热采条件",
    "响应网格展示收益递减",
    "预算与误差共同约束选择"
  ],
  "english": {
    "title": "Cyclic-steam parameter optimization",
    "stage": "Enhanced Recovery",
    "intro": "More steam and longer soaking have diminishing returns; constrained resources require comparing combinations.",
    "concept": "Steam volume, soak duration and withdrawal rates affect cycle production and oil–steam ratio.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "Quadratic ridge regression learns cycle response from steam dose, soak duration and heat loss.",
    "why": "More steam and longer soaking have diminishing returns; constrained resources require comparing combinations.",
    "how": "At fixed heat loss, evaluate a steam/soak grid and screen high-response candidates under a teaching resource constraint.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Steam dose, Soak duration, Heat-loss index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is a single-cycle response surrogate without multicycle heat transfer or real oil/steam-ratio prediction. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Steam dose",
        "unit": ""
      },
      {
        "name": "Soak duration",
        "unit": ""
      },
      {
        "name": "Heat-loss index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Cycle thermal-recovery response",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Steam dose, Soak duration, Heat-loss index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Inputs explain thermal-recovery conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression learns cycle response from steam dose, soak duration and heat loss.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed heat loss, evaluate a steam/soak grid and screen high-response candidates under a teaching resource constraint.",
        "effect": "Response grid shows diminishing returns",
        "trap": "This is a single-cycle response surrogate without multicycle heat transfer or real oil/steam-ratio prediction."
      },
      {
        "name": "Compare and review",
        "do": "More steam and longer soaking have diminishing returns; constrained resources require comparing combinations.",
        "effect": "Budget and errors qualify selections",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Inputs explain thermal-recovery conditions",
      "Response grid shows diminishing returns",
      "Budget and errors qualify selections"
    ]
  }
} satisfies SceneCaseDef;
