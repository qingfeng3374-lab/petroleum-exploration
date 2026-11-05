import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-d4",
  "sceneId": "d4",
  "name": "钻井-钻具失效预测",
  "title": "钻具失效预测",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "相同使用时长对应不同载荷损伤，按固定寿命换钻具会忽略工况差异。",
  "concept": "钻具在交变载荷下疲劳失效，一旦断钻具就要起钻打捞，单次损失可达数十万元。振动、扭矩与转速数据中包含了疲劳累积的信息。",
  "what": "二次特征岭回归学习磨损、振动和交变载荷到合成剩余寿命的关系。",
  "why": "相同使用时长对应不同载荷损伤，按固定寿命换钻具会忽略工况差异。",
  "how": "独立参考寿命记录拟合回归，保留校准集估计预测区间；测试只读取当前健康特征。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：累计磨损指标、振动强度、交变载荷。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有金属疲劳标准或现场失效阈值，模拟周期不能解释为实际剩余小时。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "累计磨损指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "振动强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "交变载荷",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "剩余模拟周期",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：累计磨损指标、振动强度、交变载荷。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "健康特征刻画载荷差异",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次特征岭回归学习磨损、振动和交变载荷到合成剩余寿命的关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "独立参考寿命记录拟合回归，保留校准集估计预测区间；测试只读取当前健康特征。",
      "effect": "寿命预测与真值交会",
      "trap": "没有金属疲劳标准或现场失效阈值，模拟周期不能解释为实际剩余小时。"
    },
    {
      "name": "对照与人工复核",
      "do": "相同使用时长对应不同载荷损伤，按固定寿命换钻具会忽略工况差异。",
      "effect": "区间与强干扰检验可信度",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "健康特征刻画载荷差异",
    "寿命预测与真值交会",
    "区间与强干扰检验可信度"
  ],
  "english": {
    "title": "Drillstring failure prediction",
    "stage": "Drilling",
    "intro": "The same service duration can accumulate different damage; a fixed replacement life ignores operating conditions.",
    "concept": "Alternating loads accumulate fatigue damage that can lead to costly drillstring failures.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns synthetic remaining life from wear, vibration and alternating load.",
    "why": "The same service duration can accumulate different damage; a fixed replacement life ignores operating conditions.",
    "how": "Independent reference life records fit the regressor. A separate calibration set estimates intervals; test inputs use current health features only.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Accumulated wear, Vibration, Alternating load. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No fatigue standard or field failure threshold is modeled; simulated cycles are not actual remaining hours. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Accumulated wear",
        "unit": ""
      },
      {
        "name": "Vibration",
        "unit": ""
      },
      {
        "name": "Alternating load",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Remaining simulated cycles",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Accumulated wear, Vibration, Alternating load. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Health features show loading differences",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression learns synthetic remaining life from wear, vibration and alternating load.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Independent reference life records fit the regressor. A separate calibration set estimates intervals; test inputs use current health features only.",
        "effect": "Crossplot predicted and observed life",
        "trap": "No fatigue standard or field failure threshold is modeled; simulated cycles are not actual remaining hours."
      },
      {
        "name": "Compare and review",
        "do": "The same service duration can accumulate different damage; a fixed replacement life ignores operating conditions.",
        "effect": "Intervals and interference probe reliability",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Health features show loading differences",
      "Crossplot predicted and observed life",
      "Intervals and interference probe reliability"
    ]
  }
} satisfies SceneCaseDef;
