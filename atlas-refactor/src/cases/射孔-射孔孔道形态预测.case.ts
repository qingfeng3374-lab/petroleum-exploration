import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-p2",
  "sceneId": "p2",
  "name": "射孔-射孔孔道形态预测",
  "title": "射孔孔道形态预测",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "multi",
  "method": "多输出二次岭回归",
  "methods": [
    "opt"
  ],
  "intro": "孔道形态不是一个产能数值，穿深与孔径可随条件不同而变化，需要分别检查误差。",
  "concept": "射孔孔道的穿透深度与清洁度决定有效流动面积，实际形态受岩性、应力与射孔弹性能共同影响，只能通过靶试或数值模拟获得。",
  "what": "两个二次岭回归模型从弹能、围压与岩性条件预测穿深和孔径。",
  "why": "孔道形态不是一个产能数值，穿深与孔径可随条件不同而变化，需要分别检查误差。",
  "how": "参考靶试代理数据训练各输出，切换目标检查系数、交会图、区间及同一观测的两个形态指标。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：弹能指标、围压指标、岩石脆性指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "未计算射流侵彻或清洁度，形态示意值不是实测厘米或毫米。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "弹能指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "围压指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "岩石脆性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "穿深示意值",
      "unit": ""
    },
    {
      "name": "孔径示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：弹能指标、围压指标、岩石脆性指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "工况特征解释靶试条件",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "两个二次岭回归模型从弹能、围压与岩性条件预测穿深和孔径。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考靶试代理数据训练各输出，切换目标检查系数、交会图、区间及同一观测的两个形态指标。",
      "effect": "多输出切换检查穿深与孔径",
      "trap": "未计算射流侵彻或清洁度，形态示意值不是实测厘米或毫米。"
    },
    {
      "name": "对照与人工复核",
      "do": "孔道形态不是一个产能数值，穿深与孔径可随条件不同而变化，需要分别检查误差。",
      "effect": "各自误差区间暴露代理局限",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "工况特征解释靶试条件",
    "多输出切换检查穿深与孔径",
    "各自误差区间暴露代理局限"
  ],
  "english": {
    "title": "Perforation tunnel geometry",
    "stage": "Perforation",
    "intro": "Tunnel geometry is not one productivity number. Penetration and diameter respond differently and require separate error checks.",
    "concept": "Tunnel penetration and cleanliness determine effective flow area and depend on rocks, stress and charge performance.",
    "method": "Multi-output quadratic ridge regression",
    "what": "Two quadratic ridge models predict penetration and diameter from charge energy, confinement and brittleness.",
    "why": "Tunnel geometry is not one productivity number. Penetration and diameter respond differently and require separate error checks.",
    "how": "Reference synthetic target trials fit each output. Switch targets to inspect coefficients, crossplots, intervals and both geometry indicators.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Charge energy, Confining pressure, Rock brittleness. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Jet penetration and tunnel cleanliness are not solved; illustrative geometry is not measured centimeters or millimeters. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Charge energy",
        "unit": ""
      },
      {
        "name": "Confining pressure",
        "unit": ""
      },
      {
        "name": "Rock brittleness",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Penetration illustration",
        "unit": ""
      },
      {
        "name": "Hole-diameter illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Charge energy, Confining pressure, Rock brittleness. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Input features explain target-test conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Two quadratic ridge models predict penetration and diameter from charge energy, confinement and brittleness.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference synthetic target trials fit each output. Switch targets to inspect coefficients, crossplots, intervals and both geometry indicators.",
        "effect": "Switch outputs to inspect penetration and diameter",
        "trap": "Jet penetration and tunnel cleanliness are not solved; illustrative geometry is not measured centimeters or millimeters."
      },
      {
        "name": "Compare and review",
        "do": "Tunnel geometry is not one productivity number. Penetration and diameter respond differently and require separate error checks.",
        "effect": "Per-output intervals reveal surrogate limitations",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Input features explain target-test conditions",
      "Switch outputs to inspect penetration and diameter",
      "Per-output intervals reveal surrogate limitations"
    ]
  }
} satisfies SceneCaseDef;
