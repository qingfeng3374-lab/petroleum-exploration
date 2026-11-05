import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-r1",
  "sceneId": "r1",
  "name": "加工-常减压装置操作优化",
  "title": "常减压装置操作优化",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "更高温度和回流可能提高分离也增加能耗，条件变化时需要比较收益面与可行预算。",
  "concept": "常减压装置通过调整切割点、回流比与炉出口温度来控制产品分布与质量，是炼厂能耗与效益的关键环节。",
  "what": "二次岭回归代理学习炉温、回流与原油条件到合成操作收益。",
  "why": "更高温度和回流可能提高分离也增加能耗，条件变化时需要比较收益面与可行预算。",
  "how": "固定原油条件预测设定网格，以资源预算筛选候选，独立误差检验代理与情境假设。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：炉温设定指标、回流配置指标、原油重质负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不是蒸馏塔模型或APC控制器，没有产品质量与炉管温度安全约束。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "炉温设定指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "回流配置指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "原油重质负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "操作综合收益指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：炉温设定指标、回流配置指标、原油重质负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "输入轨迹解释原油工况",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归代理学习炉温、回流与原油条件到合成操作收益。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定原油条件预测设定网格，以资源预算筛选候选，独立误差检验代理与情境假设。",
      "effect": "收益热图展示耦合与递减",
      "trap": "不是蒸馏塔模型或APC控制器，没有产品质量与炉管温度安全约束。"
    },
    {
      "name": "对照与人工复核",
      "do": "更高温度和回流可能提高分离也增加能耗，条件变化时需要比较收益面与可行预算。",
      "effect": "预算与误差约束操作建议",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "输入轨迹解释原油工况",
    "收益热图展示耦合与递减",
    "预算与误差约束操作建议"
  ],
  "english": {
    "title": "Atmospheric and vacuum distillation optimization",
    "stage": "Refining",
    "intro": "Higher temperature and reflux can improve separation but consume energy; condition changes require benefit-surface and feasibility review.",
    "concept": "Cut points, reflux and furnace temperature determine product distribution, quality and energy demand.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "A quadratic ridge surrogate learns operating benefit from furnace, reflux and crude-condition indices.",
    "why": "Higher temperature and reflux can improve separation but consume energy; condition changes require benefit-surface and feasibility review.",
    "how": "At fixed crude conditions, predict a setting grid, screen by resource budget and inspect surrogate errors.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Furnace setting, Reflux setting, Crude heaviness. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is not a distillation-column model or APC controller and omits product-quality and tube-temperature safety limits. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Furnace setting",
        "unit": ""
      },
      {
        "name": "Reflux setting",
        "unit": ""
      },
      {
        "name": "Crude heaviness",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Operating-benefit index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Furnace setting, Reflux setting, Crude heaviness. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Tracks explain crude and operating conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A quadratic ridge surrogate learns operating benefit from furnace, reflux and crude-condition indices.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed crude conditions, predict a setting grid, screen by resource budget and inspect surrogate errors.",
        "effect": "Benefit heatmap shows interactions and diminishing returns",
        "trap": "This is not a distillation-column model or APC controller and omits product-quality and tube-temperature safety limits."
      },
      {
        "name": "Compare and review",
        "do": "Higher temperature and reflux can improve separation but consume energy; condition changes require benefit-surface and feasibility review.",
        "effect": "Budget and errors qualify settings",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Tracks explain crude and operating conditions",
      "Benefit heatmap shows interactions and diminishing returns",
      "Budget and errors qualify settings"
    ]
  }
} satisfies SceneCaseDef;
