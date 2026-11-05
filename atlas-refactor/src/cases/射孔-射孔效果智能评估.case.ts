import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-p4",
  "sceneId": "p4",
  "name": "射孔-射孔效果智能评估",
  "title": "射孔效果智能评估",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "低产不一定由射孔低效导致，需要联合近井损害与压力响应，避免仅凭产量建议补孔。",
  "concept": "射孔效果（完善度、表皮系数）只能通过试井或生产数据间接反演，评估结果直接影响是否补孔或重复射孔。",
  "what": "二次岭回归从压力损失、损害与产能恢复特征估计合成射孔效率。",
  "why": "低产不一定由射孔低效导致，需要联合近井损害与压力响应，避免仅凭产量建议补孔。",
  "how": "参考诊断特征—效率对拟合反演代理，测试对照均值估计并查看每个特征贡献和校准区间。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：压降损失指标、近井损害指标、产能恢复指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "是诊断特征回归，不执行完整试井压力反演或输出补孔施工建议。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "压降损失指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "近井损害指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "产能恢复指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "射孔效率指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：压降损失指标、近井损害指标、产能恢复指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "诊断特征展示压力与损害关系",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归从压力损失、损害与产能恢复特征估计合成射孔效率。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考诊断特征—效率对拟合反演代理，测试对照均值估计并查看每个特征贡献和校准区间。",
      "effect": "效率预测与观测对照",
      "trap": "是诊断特征回归，不执行完整试井压力反演或输出补孔施工建议。"
    },
    {
      "name": "对照与人工复核",
      "do": "低产不一定由射孔低效导致，需要联合近井损害与压力响应，避免仅凭产量建议补孔。",
      "effect": "区间揭示间接评估的不确定性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "诊断特征展示压力与损害关系",
    "效率预测与观测对照",
    "区间揭示间接评估的不确定性"
  ],
  "english": {
    "title": "Perforation effectiveness assessment",
    "stage": "Perforation",
    "intro": "Low production need not mean poor perforation. Damage and pressure response require joint review before considering reperforation.",
    "concept": "Well tests and production provide indirect evidence of perforation efficiency and skin.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression estimates synthetic perforation efficiency from pressure-loss, damage and recovery features.",
    "why": "Low production need not mean poor perforation. Damage and pressure response require joint review before considering reperforation.",
    "how": "Reference diagnostic-feature/efficiency pairs fit an inverse surrogate. Test against a mean estimate and inspect contributions and calibrated intervals.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Pressure-loss indicator, Near-well damage, Productivity recovery. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is diagnostic-feature regression, not full pressure-transient inversion or a reperforation prescription. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Pressure-loss indicator",
        "unit": ""
      },
      {
        "name": "Near-well damage",
        "unit": ""
      },
      {
        "name": "Productivity recovery",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Perforation-efficiency index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Pressure-loss indicator, Near-well damage, Productivity recovery. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Diagnostic features show pressure and damage",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression estimates synthetic perforation efficiency from pressure-loss, damage and recovery features.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference diagnostic-feature/efficiency pairs fit an inverse surrogate. Test against a mean estimate and inspect contributions and calibrated intervals.",
        "effect": "Compare efficiency predictions and observations",
        "trap": "This is diagnostic-feature regression, not full pressure-transient inversion or a reperforation prescription."
      },
      {
        "name": "Compare and review",
        "do": "Low production need not mean poor perforation. Damage and pressure response require joint review before considering reperforation.",
        "effect": "Intervals expose indirect-assessment uncertainty",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Diagnostic features show pressure and damage",
      "Compare efficiency predictions and observations",
      "Intervals expose indirect-assessment uncertainty"
    ]
  }
} satisfies SceneCaseDef;
