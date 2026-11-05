import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-c3",
  "sceneId": "c3",
  "name": "固井-固井漏失风险预测",
  "title": "固井漏失风险预测",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "risk",
  "method": "多指标逻辑回归风险识别",
  "methods": [
    "opt"
  ],
  "intro": "单一压力阈值忽略井径与承压裕度；多特征可以补充判断，但误报漏报代价仍需明确。",
  "concept": "固井漏失是最常见的固井事故，一旦发生轻则返高不够、重则整井重注，需要在施工前预判风险等级。",
  "what": "逻辑回归从井况与浆柱设计特征学习合成漏失风险分数。",
  "why": "单一压力阈值忽略井径与承压裕度；多特征可以补充判断，但误报漏报代价仍需明确。",
  "how": "参考风险记录拟合权重，独立测试逐条显示logit贡献，调阈值观察与单指标规则的取舍。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：等效压力指标、漏失敏感性、承压裕度、井径不规则性。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "模型分数不是校准后的施工事故概率，未纳入真实地层破裂压力。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "等效压力指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "漏失敏感性",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "承压裕度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井径不规则性",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "漏失风险候选",
      "unit": ""
    }
  ],
  "classes": [
    "低风险参考",
    "需复核风险"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：等效压力指标、漏失敏感性、承压裕度、井径不规则性。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "多指标展示风险组合",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "逻辑回归从井况与浆柱设计特征学习合成漏失风险分数。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考风险记录拟合权重，独立测试逐条显示logit贡献，调阈值观察与单指标规则的取舍。",
      "effect": "贡献条解释风险分数",
      "trap": "模型分数不是校准后的施工事故概率，未纳入真实地层破裂压力。"
    },
    {
      "name": "对照与人工复核",
      "do": "单一压力阈值忽略井径与承压裕度；多特征可以补充判断，但误报漏报代价仍需明确。",
      "effect": "误差条带检查漏报与误报",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "多指标展示风险组合",
    "贡献条解释风险分数",
    "误差条带检查漏报与误报"
  ],
  "english": {
    "title": "Cement-loss risk prediction",
    "stage": "Cementing",
    "intro": "A single pressure limit ignores geometry and pressure margin. Multiple features add context while false alarms and misses still matter.",
    "concept": "Cement losses can reduce cement height or require repeat work, making pre-job assessment valuable.",
    "method": "Multivariable logistic risk recognition",
    "what": "Logistic regression learns synthetic loss-risk scores from well and slurry-design features.",
    "why": "A single pressure limit ignores geometry and pressure margin. Multiple features add context while false alarms and misses still matter.",
    "how": "Fit reference risk labels, inspect logit contributions on held-out records and adjust thresholds against a one-feature rule.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Equivalent pressure, Loss susceptibility, Pressure margin, Hole irregularity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Scores are not calibrated construction-incident probabilities and omit measured fracture pressure. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Equivalent pressure",
        "unit": ""
      },
      {
        "name": "Loss susceptibility",
        "unit": ""
      },
      {
        "name": "Pressure margin",
        "unit": ""
      },
      {
        "name": "Hole irregularity",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Loss-risk candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Lower-risk reference",
      "Review risk"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Equivalent pressure, Loss susceptibility, Pressure margin, Hole irregularity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Multi-feature tracks show risk combinations",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns synthetic loss-risk scores from well and slurry-design features.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit reference risk labels, inspect logit contributions on held-out records and adjust thresholds against a one-feature rule.",
        "effect": "Contribution bars explain risk scores",
        "trap": "Scores are not calibrated construction-incident probabilities and omit measured fracture pressure."
      },
      {
        "name": "Compare and review",
        "do": "A single pressure limit ignores geometry and pressure margin. Multiple features add context while false alarms and misses still matter.",
        "effect": "Error bands reveal missed and false warnings",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Multi-feature tracks show risk combinations",
      "Contribution bars explain risk scores",
      "Error bands reveal missed and false warnings"
    ]
  }
} satisfies SceneCaseDef;
