import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-t4",
  "sceneId": "t4",
  "name": "运输-油气计量智能校正",
  "title": "油气计量智能校正",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "原表读数可能存在温压相关系统偏差，联合观测可补偿偏差，但校正必须和未校正原值比较。",
  "concept": "多相流量计与孔板计量的准确性直接影响交接计量与配产，仪表漂移与结垢会导致系统性偏差。",
  "what": "二次岭回归由参考标定记录学习原表、温压与冗余表到校正流量的关系。",
  "why": "原表读数可能存在温压相关系统偏差，联合观测可补偿偏差，但校正必须和未校正原值比较。",
  "how": "参考标定记录训练回归，测试基线直接使用原表读数；独立校准区间检验修正幅度是否可信。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：原表流量指标、压力偏差指标、温度偏差指标、冗余表指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "无量纲流量指标不是贸易交接计量，不代替法定仪表标定。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "原表流量指标",
      "unit": "",
      "range": [
        10,
        100
      ]
    },
    {
      "name": "压力偏差指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "温度偏差指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "冗余表指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "校正流量指标",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：原表流量指标、压力偏差指标、温度偏差指标、冗余表指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "原表与温压特征解释偏差",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归由参考标定记录学习原表、温压与冗余表到校正流量的关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考标定记录训练回归，测试基线直接使用原表读数；独立校准区间检验修正幅度是否可信。",
      "effect": "校正前后与参考值对照",
      "trap": "无量纲流量指标不是贸易交接计量，不代替法定仪表标定。"
    },
    {
      "name": "对照与人工复核",
      "do": "原表读数可能存在温压相关系统偏差，联合观测可补偿偏差，但校正必须和未校正原值比较。",
      "effect": "校准误差检查过度修正",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "原表与温压特征解释偏差",
    "校正前后与参考值对照",
    "校准误差检查过度修正"
  ],
  "english": {
    "title": "Oil and gas metering correction",
    "stage": "Transportation",
    "intro": "Raw readings can contain pressure/temperature-related bias. Joint observations can compensate but must be compared with uncorrected readings.",
    "concept": "Instrument drift and scaling introduce systematic errors into multiphase and orifice metering.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns corrected flow from raw readings, pressure, temperature and redundancy using reference calibrations.",
    "why": "Raw readings can contain pressure/temperature-related bias. Joint observations can compensate but must be compared with uncorrected readings.",
    "how": "Reference calibrations train regression; the baseline is the raw meter itself. Independent intervals qualify correction uncertainty.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Raw meter flow, Pressure deviation, Temperature deviation, Redundant meter. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "The dimensionless flow index is not custody-transfer measurement or certified instrument calibration. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Raw meter flow",
        "unit": ""
      },
      {
        "name": "Pressure deviation",
        "unit": ""
      },
      {
        "name": "Temperature deviation",
        "unit": ""
      },
      {
        "name": "Redundant meter",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Corrected-flow index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Raw meter flow, Pressure deviation, Temperature deviation, Redundant meter. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Raw readings and conditions explain bias",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression learns corrected flow from raw readings, pressure, temperature and redundancy using reference calibrations.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference calibrations train regression; the baseline is the raw meter itself. Independent intervals qualify correction uncertainty.",
        "effect": "Compare corrected and raw readings to references",
        "trap": "The dimensionless flow index is not custody-transfer measurement or certified instrument calibration."
      },
      {
        "name": "Compare and review",
        "do": "Raw readings can contain pressure/temperature-related bias. Joint observations can compensate but must be compared with uncorrected readings.",
        "effect": "Calibration errors inspect overcorrection",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Raw readings and conditions explain bias",
      "Compare corrected and raw readings to references",
      "Calibration errors inspect overcorrection"
    ]
  }
} satisfies SceneCaseDef;
