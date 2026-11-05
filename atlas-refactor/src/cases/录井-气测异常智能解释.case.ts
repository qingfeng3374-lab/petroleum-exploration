import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-m2",
  "sceneId": "m2",
  "name": "录井-气测异常智能解释",
  "title": "气测异常智能解释",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "gas",
  "method": "气测组分特征＋标准化 kNN",
  "methods": [
    "ts"
  ],
  "intro": "高总烃峰值不唯一对应气层，组分和峰形需要一起判断并考虑迟到时间。",
  "concept": "气测录井连续测量钻井液返出气体中的总烃与组分，是发现油气显示最快的手段，解释员据峰值形态与组分比判断油气层。",
  "what": "标准化kNN联合总烃、组分比与峰宽特征识别合成油气水显示。",
  "why": "高总烃峰值不唯一对应气层，组分和峰形需要一起判断并考虑迟到时间。",
  "how": "参考组分记录提供标签，测试记录按多指标距离投票；工况变化预设改变总烃基线。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：总烃峰值、重烃比例、组分比、峰宽指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不是连续气测序列模型，也没有钻井液脱气率和迟到时间正演。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "总烃峰值",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "重烃比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "组分比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "峰宽指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "流体显示候选",
      "unit": ""
    }
  ],
  "classes": [
    "油显示",
    "气显示",
    "水背景"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：总烃峰值、重烃比例、组分比、峰宽指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "组分图展示总量与比例差异",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "标准化kNN联合总烃、组分比与峰宽特征识别合成油气水显示。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考组分记录提供标签，测试记录按多指标距离投票；工况变化预设改变总烃基线。",
      "effect": "邻居记录支持流体候选",
      "trap": "不是连续气测序列模型，也没有钻井液脱气率和迟到时间正演。"
    },
    {
      "name": "对照与人工复核",
      "do": "高总烃峰值不唯一对应气层，组分和峰形需要一起判断并考虑迟到时间。",
      "effect": "混淆矩阵检查基线变化",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "组分图展示总量与比例差异",
    "邻居记录支持流体候选",
    "混淆矩阵检查基线变化"
  ],
  "english": {
    "title": "Mud-gas anomaly interpretation",
    "stage": "Mud Logging",
    "intro": "A high total-gas peak does not uniquely identify gas; composition and shape require joint interpretation and lag alignment.",
    "concept": "Total hydrocarbons and gas composition provide rapid evidence of hydrocarbon shows while drilling.",
    "method": "Gas-composition features + standardized kNN",
    "what": "Standardized kNN combines total gas, component ratios and peak width to classify synthetic oil/gas/water shows.",
    "why": "A high total-gas peak does not uniquely identify gas; composition and shape require joint interpretation and lag alignment.",
    "how": "Labeled reference compositions provide neighbors. Held-out records vote by multivariable distance; a shift preset changes the gas baseline.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Total hydrocarbon peak, Heavy hydrocarbon ratio, Component ratio, Peak width. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is not a continuous sequence model and omits gas extraction and lag forward modeling. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Total hydrocarbon peak",
        "unit": ""
      },
      {
        "name": "Heavy hydrocarbon ratio",
        "unit": ""
      },
      {
        "name": "Component ratio",
        "unit": ""
      },
      {
        "name": "Peak width",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fluid-show candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Oil show",
      "Gas show",
      "Water background"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Total hydrocarbon peak, Heavy hydrocarbon ratio, Component ratio, Peak width. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Composition views separate totals and ratios",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Standardized kNN combines total gas, component ratios and peak width to classify synthetic oil/gas/water shows.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Labeled reference compositions provide neighbors. Held-out records vote by multivariable distance; a shift preset changes the gas baseline.",
        "effect": "Neighbor records support fluid candidates",
        "trap": "This is not a continuous sequence model and omits gas extraction and lag forward modeling."
      },
      {
        "name": "Compare and review",
        "do": "A high total-gas peak does not uniquely identify gas; composition and shape require joint interpretation and lag alignment.",
        "effect": "Confusion matrices inspect baseline shifts",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Composition views separate totals and ratios",
      "Neighbor records support fluid candidates",
      "Confusion matrices inspect baseline shifts"
    ]
  }
} satisfies SceneCaseDef;
