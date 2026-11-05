import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-wo5",
  "sceneId": "wo5",
  "name": "修井-修井周期预测",
  "title": "修井周期预测",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "仅按固定平均工期排班会忽略复杂故障的长尾风险，需要同时看估计与误差区间。",
  "concept": "修井工期直接影响产量损失与作业队排班，工期估计目前多按经验值。",
  "what": "二次岭回归学习井深、复杂度与设备条件到合成修井工期的关系。",
  "why": "仅按固定平均工期排班会忽略复杂故障的长尾风险，需要同时看估计与误差区间。",
  "how": "参考作业记录拟合工期，单独70条校准记录形成90%残差区间，独立测试检查实际覆盖率。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：井深负担、故障复杂度、设备受限程度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "模拟周期不是实际天数，残差区间仅在可交换分布假设下有意义。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "井深负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "故障复杂度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "设备受限程度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "工期示意周期",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：井深负担、故障复杂度、设备受限程度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "工况特征解释工期差异",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归学习井深、复杂度与设备条件到合成修井工期的关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考作业记录拟合工期，单独70条校准记录形成90%残差区间，独立测试检查实际覆盖率。",
      "effect": "工期交会图检查偏差",
      "trap": "模拟周期不是实际天数，残差区间仅在可交换分布假设下有意义。"
    },
    {
      "name": "对照与人工复核",
      "do": "仅按固定平均工期排班会忽略复杂故障的长尾风险，需要同时看估计与误差区间。",
      "effect": "区间覆盖检验排班不确定性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "工况特征解释工期差异",
    "工期交会图检查偏差",
    "区间覆盖检验排班不确定性"
  ],
  "english": {
    "title": "Workover duration forecasting",
    "stage": "Workover",
    "intro": "Scheduling by mean duration ignores complex-job risk; estimates require uncertainty intervals.",
    "concept": "Operation durations affect lost production, crew schedules and materials planning.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns synthetic workover duration from depth, complexity and equipment limitations.",
    "why": "Scheduling by mean duration ignores complex-job risk; estimates require uncertainty intervals.",
    "how": "Reference job records fit duration; 70 separate calibration records form 90% residual intervals, with held-out coverage checked.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Depth burden, Fault complexity, Equipment limitation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Simulated duration is not measured days; residual intervals depend on exchangeable-distribution assumptions. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Depth burden",
        "unit": ""
      },
      {
        "name": "Fault complexity",
        "unit": ""
      },
      {
        "name": "Equipment limitation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Duration illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Depth burden, Fault complexity, Equipment limitation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Job features explain duration differences",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression learns synthetic workover duration from depth, complexity and equipment limitations.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference job records fit duration; 70 separate calibration records form 90% residual intervals, with held-out coverage checked.",
        "effect": "Duration crossplots inspect bias",
        "trap": "Simulated duration is not measured days; residual intervals depend on exchangeable-distribution assumptions."
      },
      {
        "name": "Compare and review",
        "do": "Scheduling by mean duration ignores complex-job risk; estimates require uncertainty intervals.",
        "effect": "Interval coverage probes scheduling uncertainty",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Job features explain duration differences",
      "Duration crossplots inspect bias",
      "Interval coverage probes scheduling uncertainty"
    ]
  }
} satisfies SceneCaseDef;
