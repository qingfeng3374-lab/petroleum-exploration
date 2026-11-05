import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-t2",
  "sceneId": "t2",
  "name": "运输-管道腐蚀智能评估",
  "title": "管道腐蚀智能评估",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "cv",
    "ts"
  ],
  "intro": "相同初始缺陷在不同环境下增长不同，单次深度不能直接代表未来风险。",
  "concept": "管道内检测（智能清管）产生大量腐蚀缺陷数据，评估缺陷增长速率是制定维修计划的基础。",
  "what": "二次回归学习当前缺陷、环境与间隔到下一次合成壁损的退化关系。",
  "why": "相同初始缺陷在不同环境下增长不同，单次深度不能直接代表未来风险。",
  "how": "只用预测时可得的初始缺陷与条件拟合下一次壁损，独立区间评估检测误差和增长不确定性。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：初始缺陷深度指标、腐蚀活性指标、环境侵蚀指标、复检间隔指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有两次内检测缺陷配准或剩余强度标准验算，不能据此决定管道维修。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "初始缺陷深度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "腐蚀活性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "环境侵蚀指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "复检间隔指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "未来壁损示意指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：初始缺陷深度指标、腐蚀活性指标、环境侵蚀指标、复检间隔指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "初始缺陷与间隔解释增长条件",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次回归学习当前缺陷、环境与间隔到下一次合成壁损的退化关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "只用预测时可得的初始缺陷与条件拟合下一次壁损，独立区间评估检测误差和增长不确定性。",
      "effect": "壁损预测与复检结果对照",
      "trap": "没有两次内检测缺陷配准或剩余强度标准验算，不能据此决定管道维修。"
    },
    {
      "name": "对照与人工复核",
      "do": "相同初始缺陷在不同环境下增长不同，单次深度不能直接代表未来风险。",
      "effect": "校准区间显示增长不确定性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "初始缺陷与间隔解释增长条件",
    "壁损预测与复检结果对照",
    "校准区间显示增长不确定性"
  ],
  "english": {
    "title": "Pipeline corrosion assessment",
    "stage": "Transportation",
    "intro": "Defects with the same initial depth can grow differently; one inspection depth does not determine future risk.",
    "concept": "In-line inspections identify large numbers of corrosion defects for growth and maintenance assessment.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic regression learns synthetic wall-loss progression from current defects, environment and inspection interval.",
    "why": "Defects with the same initial depth can grow differently; one inspection depth does not determine future risk.",
    "how": "Use initial defects and conditions available at prediction time to estimate next-inspection loss, with independent intervals for uncertainty.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Initial defect depth, Corrosion activity, Environmental severity, Inspection interval. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No cross-inspection matching or residual-strength code check is performed; this cannot decide pipeline repairs. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Initial defect depth",
        "unit": ""
      },
      {
        "name": "Corrosion activity",
        "unit": ""
      },
      {
        "name": "Environmental severity",
        "unit": ""
      },
      {
        "name": "Inspection interval",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Future wall-loss index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Initial defect depth, Corrosion activity, Environmental severity, Inspection interval. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Initial defects and intervals explain growth conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic regression learns synthetic wall-loss progression from current defects, environment and inspection interval.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Use initial defects and conditions available at prediction time to estimate next-inspection loss, with independent intervals for uncertainty.",
        "effect": "Compare predicted loss and reinspection results",
        "trap": "No cross-inspection matching or residual-strength code check is performed; this cannot decide pipeline repairs."
      },
      {
        "name": "Compare and review",
        "do": "Defects with the same initial depth can grow differently; one inspection depth does not determine future risk.",
        "effect": "Calibrated intervals show growth uncertainty",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Initial defects and intervals explain growth conditions",
      "Compare predicted loss and reinspection results",
      "Calibrated intervals show growth uncertainty"
    ]
  }
} satisfies SceneCaseDef;
