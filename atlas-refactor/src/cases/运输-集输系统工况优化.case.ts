import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-t3",
  "sceneId": "t3",
  "name": "运输-集输系统工况优化",
  "title": "集输系统工况优化",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "多站同时提速可能增加无效能耗，组合搜索需要显示资源代价和收益递减。",
  "concept": "集输管网与站场的泵、压缩机运行参数决定能耗，工况随产量与季节变化需持续调整。",
  "what": "二次代理从泵速、分配与流阻学习合成输送效益，再做预算内搜索。",
  "why": "多站同时提速可能增加无效能耗，组合搜索需要显示资源代价和收益递减。",
  "how": "固定流阻条件，网格预测各配置的效益，在0.55和0.45的加权资源约束内选候选。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：泵速配置指标、站间分配指标、流阻负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "无真实管网水力求解或泵曲线，资源约束不能替代压力和汽蚀检查。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "泵速配置指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "站间分配指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流阻负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "输送效益示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：泵速配置指标、站间分配指标、流阻负担。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "工况指标说明站间耦合",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次代理从泵速、分配与流阻学习合成输送效益，再做预算内搜索。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定流阻条件，网格预测各配置的效益，在0.55和0.45的加权资源约束内选候选。",
      "effect": "热图展示配置效益面",
      "trap": "无真实管网水力求解或泵曲线，资源约束不能替代压力和汽蚀检查。"
    },
    {
      "name": "对照与人工复核",
      "do": "多站同时提速可能增加无效能耗，组合搜索需要显示资源代价和收益递减。",
      "effect": "预算遮罩排除不可行方案",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "工况指标说明站间耦合",
    "热图展示配置效益面",
    "预算遮罩排除不可行方案"
  ],
  "english": {
    "title": "Gathering-network optimization",
    "stage": "Transportation",
    "intro": "Increasing all station speeds can waste energy; combination searches should expose resource costs and diminishing benefits.",
    "concept": "Pump and compressor settings influence energy use as production and seasonal conditions change.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "A quadratic surrogate learns synthetic transport benefit from speed, allocation and resistance, then searches within budget.",
    "why": "Increasing all station speeds can waste energy; combination searches should expose resource costs and diminishing benefits.",
    "how": "At fixed resistance, predict configuration benefits on a grid and select within weighted resource costs of 0.55 and 0.45.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Pump-speed setting, Interstation split, Flow-resistance burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No real hydraulic solver or pump curves are used; resource constraints do not replace pressure or cavitation checks. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Pump-speed setting",
        "unit": ""
      },
      {
        "name": "Interstation split",
        "unit": ""
      },
      {
        "name": "Flow-resistance burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Transport-benefit index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Pump-speed setting, Interstation split, Flow-resistance burden. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Operating indices explain station coupling",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A quadratic surrogate learns synthetic transport benefit from speed, allocation and resistance, then searches within budget.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed resistance, predict configuration benefits on a grid and select within weighted resource costs of 0.55 and 0.45.",
        "effect": "Heatmap shows the configuration-benefit surface",
        "trap": "No real hydraulic solver or pump curves are used; resource constraints do not replace pressure or cavitation checks."
      },
      {
        "name": "Compare and review",
        "do": "Increasing all station speeds can waste energy; combination searches should expose resource costs and diminishing benefits.",
        "effect": "Budget masks reject infeasible configurations",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Operating indices explain station coupling",
      "Heatmap shows the configuration-benefit surface",
      "Budget masks reject infeasible configurations"
    ]
  }
} satisfies SceneCaseDef;
