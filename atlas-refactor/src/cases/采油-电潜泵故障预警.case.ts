import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-pr4",
  "sceneId": "pr4",
  "name": "采油-电潜泵故障预警",
  "title": "电潜泵故障预警",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常子空间 PCA＋重构残差",
  "methods": [
    "ts"
  ],
  "intro": "负荷正常变化会使多个通道同时变化，异常检测需要识别联动关系破坏而不是只追峰值。",
  "concept": "电潜泵井下故障（气锁、结垢、电机过热、相间短路）导致停产，检泵作业成本高、周期长。",
  "what": "PCA学习电潜泵正常电流、温度、排量与振动的多通道关系。",
  "why": "负荷正常变化会使多个通道同时变化，异常检测需要识别联动关系破坏而不是只追峰值。",
  "how": "正常参考数据拟合子空间与残差阈值，测试注入电流—温度失配，查看各通道报警贡献。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：电流指标、电机温度指标、排量指标、振动指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不区分气锁、结垢或电机故障类型，也不保证实际检泵提前量。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "电流指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "电机温度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "排量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "振动指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "异常工况候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常",
    "异常候选"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：电流指标、电机温度指标、排量指标、振动指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "联动曲线区分负荷与失配",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "PCA学习电潜泵正常电流、温度、排量与振动的多通道关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "正常参考数据拟合子空间与残差阈值，测试注入电流—温度失配，查看各通道报警贡献。",
      "effect": "异常分数展示候选时段",
      "trap": "不区分气锁、结垢或电机故障类型，也不保证实际检泵提前量。"
    },
    {
      "name": "对照与人工复核",
      "do": "负荷正常变化会使多个通道同时变化，异常检测需要识别联动关系破坏而不是只追峰值。",
      "effect": "残差贡献避免把报警当确诊",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "联动曲线区分负荷与失配",
    "异常分数展示候选时段",
    "残差贡献避免把报警当确诊"
  ],
  "english": {
    "title": "ESP failure warning",
    "stage": "Production",
    "intro": "Normal load changes affect several channels together; anomaly detection should identify broken relations rather than chase peaks.",
    "concept": "Gas lock, scale, overheating and electrical faults can stop electric-submersible-pump production.",
    "method": "Normal-subspace PCA + reconstruction residuals",
    "what": "PCA learns normal multichannel relationships among pump current, temperature, rate and vibration.",
    "why": "Normal load changes affect several channels together; anomaly detection should identify broken relations rather than chase peaks.",
    "how": "Normal references fit the subspace and residual threshold. Inject current/temperature mismatch into test sequences and inspect channel contributions.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Current, Motor temperature, Discharge rate, Vibration. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "It does not distinguish gas lock, scale or motor failure and provides no guaranteed maintenance lead time. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Current",
        "unit": ""
      },
      {
        "name": "Motor temperature",
        "unit": ""
      },
      {
        "name": "Discharge rate",
        "unit": ""
      },
      {
        "name": "Vibration",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Abnormal-operation candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal",
      "Anomaly candidate"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Current, Motor temperature, Discharge rate, Vibration. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Coupled tracks distinguish load changes from mismatch",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "PCA learns normal multichannel relationships among pump current, temperature, rate and vibration.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Normal references fit the subspace and residual threshold. Inject current/temperature mismatch into test sequences and inspect channel contributions.",
        "effect": "Anomaly scores locate candidate intervals",
        "trap": "It does not distinguish gas lock, scale or motor failure and provides no guaranteed maintenance lead time."
      },
      {
        "name": "Compare and review",
        "do": "Normal load changes affect several channels together; anomaly detection should identify broken relations rather than chase peaks.",
        "effect": "Residual contributions qualify diagnostic claims",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Coupled tracks distinguish load changes from mismatch",
      "Anomaly scores locate candidate intervals",
      "Residual contributions qualify diagnostic claims"
    ]
  }
} satisfies SceneCaseDef;
