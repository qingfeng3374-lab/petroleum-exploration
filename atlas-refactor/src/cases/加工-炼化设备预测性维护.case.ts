import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-r3",
  "sceneId": "r3",
  "name": "加工-炼化设备预测性维护",
  "title": "炼化设备预测性维护",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "仅按振动峰值报警可能忽略渐进退化，剩余寿命估计需要考虑负荷且公开区间误差。",
  "concept": "机泵、换热器、压缩机等关键设备的非计划停机损失巨大，振动与温度监测是主要手段。",
  "what": "二次岭回归融合退化、振动、温升与负荷，估计合成设备剩余寿命。",
  "why": "仅按振动峰值报警可能忽略渐进退化，剩余寿命估计需要考虑负荷且公开区间误差。",
  "how": "参考退化状态与后续失效记录拟合剩余周期，独立校准集构造区间，测试不读取未来失效标签。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：退化程度指标、振动强度、温升指标、负荷指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "模拟周期不能解释为实际检修日期，没有真实机泵失效模式或跨设备迁移验证。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "退化程度指标",
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
      "name": "温升指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "负荷指标",
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
      "do": "参考、校准与测试使用分离的合成观测；输入包括：退化程度指标、振动强度、温升指标、负荷指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "健康输入展示退化与负荷",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归融合退化、振动、温升与负荷，估计合成设备剩余寿命。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考退化状态与后续失效记录拟合剩余周期，独立校准集构造区间，测试不读取未来失效标签。",
      "effect": "寿命交会图检查预测误差",
      "trap": "模拟周期不能解释为实际检修日期，没有真实机泵失效模式或跨设备迁移验证。"
    },
    {
      "name": "对照与人工复核",
      "do": "仅按振动峰值报警可能忽略渐进退化，剩余寿命估计需要考虑负荷且公开区间误差。",
      "effect": "覆盖率显示维修计划不确定性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "健康输入展示退化与负荷",
    "寿命交会图检查预测误差",
    "覆盖率显示维修计划不确定性"
  ],
  "english": {
    "title": "Refinery predictive maintenance",
    "stage": "Refining",
    "intro": "Peak-vibration alarms can miss gradual degradation; life estimates need load context and explicit uncertainty.",
    "concept": "Unexpected downtime of pumps, exchangers and compressors creates major losses.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression combines degradation, vibration, temperature rise and load to estimate synthetic remaining life.",
    "why": "Peak-vibration alarms can miss gradual degradation; life estimates need load context and explicit uncertainty.",
    "how": "Reference degradation and subsequent failures fit remaining cycles. Separate calibration supplies intervals; test inputs do not include future failure labels.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Degradation, Vibration, Temperature rise, Load. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Simulated cycles do not specify maintenance dates; no real pump failure modes or cross-device transfer are validated. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Degradation",
        "unit": ""
      },
      {
        "name": "Vibration",
        "unit": ""
      },
      {
        "name": "Temperature rise",
        "unit": ""
      },
      {
        "name": "Load",
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
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Degradation, Vibration, Temperature rise, Load. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Health inputs show degradation and load",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression combines degradation, vibration, temperature rise and load to estimate synthetic remaining life.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference degradation and subsequent failures fit remaining cycles. Separate calibration supplies intervals; test inputs do not include future failure labels.",
        "effect": "Life crossplots reveal prediction error",
        "trap": "Simulated cycles do not specify maintenance dates; no real pump failure modes or cross-device transfer are validated."
      },
      {
        "name": "Compare and review",
        "do": "Peak-vibration alarms can miss gradual degradation; life estimates need load context and explicit uncertainty.",
        "effect": "Coverage reveals maintenance uncertainty",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Health inputs show degradation and load",
      "Life crossplots reveal prediction error",
      "Coverage reveals maintenance uncertainty"
    ]
  }
} satisfies SceneCaseDef;
