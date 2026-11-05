import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-wo4",
  "sceneId": "wo4",
  "name": "修井-修井作业风险预警",
  "title": "修井作业风险预警",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "risk",
  "method": "多指标逻辑回归风险识别",
  "methods": [
    "ts"
  ],
  "intro": "相同扭矩在不同压力和循环条件下含义不同，多指标组合可以减少孤立阈值的盲区。",
  "concept": "修井作业（打捞、磨铣、压井）过程中压力与扭矩异常可能导致卡钻、井喷等二次事故。",
  "what": "逻辑回归从压力、扭矩、流量与作业裕度学习合成修井风险。",
  "why": "相同扭矩在不同压力和循环条件下含义不同，多指标组合可以减少孤立阈值的盲区。",
  "how": "参考风险记录拟合特征权重，测试按阈值输出候选，分布变化预设检验工序切换后的失配。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：压力异常指标、扭矩负担、流量失衡、作业裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "只做当前特征风险分类，不提供秒级实时报警或井控安全认证。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "压力异常指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "扭矩负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流量失衡",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "作业裕度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "风险候选",
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
      "do": "参考、校准与测试使用分离的合成观测；输入包括：压力异常指标、扭矩负担、流量失衡、作业裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "工况轨迹展示异常组合",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "逻辑回归从压力、扭矩、流量与作业裕度学习合成修井风险。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考风险记录拟合特征权重，测试按阈值输出候选，分布变化预设检验工序切换后的失配。",
      "effect": "贡献分解展示风险证据",
      "trap": "只做当前特征风险分类，不提供秒级实时报警或井控安全认证。"
    },
    {
      "name": "对照与人工复核",
      "do": "相同扭矩在不同压力和循环条件下含义不同，多指标组合可以减少孤立阈值的盲区。",
      "effect": "误报漏报对照阈值取舍",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "工况轨迹展示异常组合",
    "贡献分解展示风险证据",
    "误报漏报对照阈值取舍"
  ],
  "english": {
    "title": "Workover risk warning",
    "stage": "Workover",
    "intro": "The same torque has different meaning under different pressure and circulation conditions; joint features address one-threshold blind spots.",
    "concept": "Pressure and torque anomalies during fishing, milling and killing may precede secondary incidents.",
    "method": "Multivariable logistic risk recognition",
    "what": "Logistic regression learns synthetic workover risk from pressure, torque, flow balance and operating margin.",
    "why": "The same torque has different meaning under different pressure and circulation conditions; joint features address one-threshold blind spots.",
    "how": "Fit weights on reference risk records, infer thresholded candidates and test mismatch after operating-procedure shifts.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Pressure deviation, Torque burden, Flow imbalance, Operating margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is current-feature risk classification, not a real-time well-control alarm or safety certification. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Pressure deviation",
        "unit": ""
      },
      {
        "name": "Torque burden",
        "unit": ""
      },
      {
        "name": "Flow imbalance",
        "unit": ""
      },
      {
        "name": "Operating margin",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Risk candidate",
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
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Pressure deviation, Torque burden, Flow imbalance, Operating margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Tracks show abnormal combinations",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns synthetic workover risk from pressure, torque, flow balance and operating margin.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit weights on reference risk records, infer thresholded candidates and test mismatch after operating-procedure shifts.",
        "effect": "Contributions expose risk evidence",
        "trap": "This is current-feature risk classification, not a real-time well-control alarm or safety certification."
      },
      {
        "name": "Compare and review",
        "do": "The same torque has different meaning under different pressure and circulation conditions; joint features address one-threshold blind spots.",
        "effect": "Errors reveal threshold tradeoffs",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Tracks show abnormal combinations",
      "Contributions expose risk evidence",
      "Errors reveal threshold tradeoffs"
    ]
  }
} satisfies SceneCaseDef;
