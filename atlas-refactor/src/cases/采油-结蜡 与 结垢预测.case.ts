import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-pr5",
  "sceneId": "pr5",
  "name": "采油-结蜡 与 结垢预测",
  "title": "结蜡 / 结垢预测",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "risk",
  "method": "多指标逻辑回归风险识别",
  "methods": [
    "ts"
  ],
  "intro": "产量下降也可能来自供液或措施变化，多特征风险需要和单指标规则一起复核。",
  "concept": "结蜡与结垢会堵塞井筒与管线，导致产量下降甚至停产，清防蜡措施（热洗、化学剂）需按周期安排。",
  "what": "逻辑回归学习低温、压降、递减和清洗历史组合的合成沉积风险。",
  "why": "产量下降也可能来自供液或措施变化，多特征风险需要和单指标规则一起复核。",
  "how": "参考已知沉积记录拟合权重，独立测试调阈值并查看特征贡献及错分。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：低温负担、压降增长、递减强度、近期清洗强度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不预测具体结蜡厚度、析蜡点或清洗时间，分数不是现场事件概率。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "低温负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "压降增长",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "递减强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "近期清洗强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "沉积风险候选",
      "unit": ""
    }
  ],
  "classes": [
    "低风险参考",
    "需复核沉积"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：低温负担、压降增长、递减强度、近期清洗强度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "生产特征展示风险组合",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "逻辑回归学习低温、压降、递减和清洗历史组合的合成沉积风险。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考已知沉积记录拟合权重，独立测试调阈值并查看特征贡献及错分。",
      "effect": "logit贡献解释模型判断",
      "trap": "不预测具体结蜡厚度、析蜡点或清洗时间，分数不是现场事件概率。"
    },
    {
      "name": "对照与人工复核",
      "do": "产量下降也可能来自供液或措施变化，多特征风险需要和单指标规则一起复核。",
      "effect": "阈值与误差反映清洗取舍",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "生产特征展示风险组合",
    "logit贡献解释模型判断",
    "阈值与误差反映清洗取舍"
  ],
  "english": {
    "title": "Wax and scale prediction",
    "stage": "Production",
    "intro": "Production decline can reflect inflow or interventions; multivariable risk needs review alongside a simple rule.",
    "concept": "Wax and scale restrict wellbores and flowlines, requiring cleaning or preventive treatment.",
    "method": "Multivariable logistic risk recognition",
    "what": "Logistic regression learns synthetic deposition risk from temperature burden, pressure-drop growth, decline and cleaning history.",
    "why": "Production decline can reflect inflow or interventions; multivariable risk needs review alongside a simple rule.",
    "how": "Known reference deposition records fit weights. Inspect threshold tradeoffs, contributions and errors on held-out records.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Low-temperature burden, Pressure-drop growth, Decline intensity, Recent cleaning intensity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "It does not predict wax thickness, precipitation temperature or cleaning dates; scores are not field event probabilities. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Low-temperature burden",
        "unit": ""
      },
      {
        "name": "Pressure-drop growth",
        "unit": ""
      },
      {
        "name": "Decline intensity",
        "unit": ""
      },
      {
        "name": "Recent cleaning intensity",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Deposition-risk candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Lower-risk reference",
      "Review deposition"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Low-temperature burden, Pressure-drop growth, Decline intensity, Recent cleaning intensity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Production features show risk combinations",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns synthetic deposition risk from temperature burden, pressure-drop growth, decline and cleaning history.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Known reference deposition records fit weights. Inspect threshold tradeoffs, contributions and errors on held-out records.",
        "effect": "Logit contributions explain model decisions",
        "trap": "It does not predict wax thickness, precipitation temperature or cleaning dates; scores are not field event probabilities."
      },
      {
        "name": "Compare and review",
        "do": "Production decline can reflect inflow or interventions; multivariable risk needs review alongside a simple rule.",
        "effect": "Thresholds and errors reveal cleaning tradeoffs",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Production features show risk combinations",
      "Logit contributions explain model decisions",
      "Thresholds and errors reveal cleaning tradeoffs"
    ]
  }
} satisfies SceneCaseDef;
