import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-d2",
  "sceneId": "d2",
  "name": "钻井-井下复杂事故前兆预警",
  "title": "井下复杂事故前兆预警",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常子空间 PCA＋重构残差",
  "methods": [
    "ts"
  ],
  "intro": "扭矩或压力正常调节也会起伏，多指标联动破坏比单通道越限更值得复核。",
  "concept": "卡钻、井漏、气侵等井下复杂情况一旦发生，损失以小时到天计。多数事故在发生前会有扭矩、立管压力、返出流量等参数的异常前兆。",
  "what": "PCA从正常钻井参数学习联动子空间，用重构残差识别偏离。",
  "why": "扭矩或压力正常调节也会起伏，多指标联动破坏比单通道越限更值得复核。",
  "how": "只拟合正常参考记录，以参考残差98%分位数确定阈值；测试注入返出失衡等组合偏离。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：扭矩联动指标、立管压力指标、返出流量指标、池体积指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有事故类型辨识或现场提前量保证，报警只能作为待复核线索。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "扭矩联动指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "立管压力指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "返出流量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "池体积指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "异常候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常联动",
    "前兆候选"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：扭矩联动指标、立管压力指标、返出流量指标、池体积指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "多参数曲线显示正常联动",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "PCA从正常钻井参数学习联动子空间，用重构残差识别偏离。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "只拟合正常参考记录，以参考残差98%分位数确定阈值；测试注入返出失衡等组合偏离。",
      "effect": "残差分数定位偏离时段",
      "trap": "没有事故类型辨识或现场提前量保证，报警只能作为待复核线索。"
    },
    {
      "name": "对照与人工复核",
      "do": "扭矩或压力正常调节也会起伏，多指标联动破坏比单通道越限更值得复核。",
      "effect": "分通道残差解释预警来源",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "多参数曲线显示正常联动",
    "残差分数定位偏离时段",
    "分通道残差解释预警来源"
  ],
  "english": {
    "title": "Early warning of drilling incidents",
    "stage": "Drilling",
    "intro": "Normal adjustments also change torque and pressure. Broken multivariable relations can be more informative than one-channel limits.",
    "concept": "Sticking, losses and influx can be preceded by subtle torque, pressure and return-flow changes.",
    "method": "Normal-subspace PCA + reconstruction residuals",
    "what": "PCA learns a normal drilling-parameter subspace and detects departures through reconstruction residuals.",
    "why": "Normal adjustments also change torque and pressure. Broken multivariable relations can be more informative than one-channel limits.",
    "how": "Fit normal references only and threshold the 98th-percentile reference residual. Test sequences contain injected return-flow imbalance patterns.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Torque, Standpipe pressure, Return flow, Pit volume. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "There is no accident-type diagnosis or guaranteed field warning lead time; alarms are review cues. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Torque",
        "unit": ""
      },
      {
        "name": "Standpipe pressure",
        "unit": ""
      },
      {
        "name": "Return flow",
        "unit": ""
      },
      {
        "name": "Pit volume",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Anomaly candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal relation",
      "Warning candidate"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Torque, Standpipe pressure, Return flow, Pit volume. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Tracks reveal normal parameter coupling",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "PCA learns a normal drilling-parameter subspace and detects departures through reconstruction residuals.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit normal references only and threshold the 98th-percentile reference residual. Test sequences contain injected return-flow imbalance patterns.",
        "effect": "Residual scores locate departures",
        "trap": "There is no accident-type diagnosis or guaranteed field warning lead time; alarms are review cues."
      },
      {
        "name": "Compare and review",
        "do": "Normal adjustments also change torque and pressure. Broken multivariable relations can be more informative than one-channel limits.",
        "effect": "Channel residuals explain warning sources",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Tracks reveal normal parameter coupling",
      "Residual scores locate departures",
      "Channel residuals explain warning sources"
    ]
  }
} satisfies SceneCaseDef;
