import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-pr1",
  "sceneId": "pr1",
  "name": "采油-抽油机井工况诊断",
  "title": "抽油机井工况诊断",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "shape",
  "method": "形态特征＋标准化 kNN",
  "methods": [
    "cv"
  ],
  "intro": "相同峰值载荷可以对应不同回线形状，面积和上下行差异补充单幅值诊断。",
  "concept": "示功图（光杆载荷—位移闭合曲线）是有杆泵井工况诊断的核心依据，不同工况（供液不足、气锁、泵漏、断脱）在图上呈现不同形态。",
  "what": "从真实绘制的合成闭合载荷—位移曲线提取形态特征，kNN学习三类泵工况。",
  "why": "相同峰值载荷可以对应不同回线形状，面积和上下行差异补充单幅值诊断。",
  "how": "独立参考示功图建立近邻库，当前闭合曲线生成面积等特征；选择样本联动投票和工况标签。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：载荷范围、上下行差异、闭合图面积、局部充满指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "未实现杆柱动力学和井下功图换算，三种形态只是教学抽象。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "载荷范围",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "上下行差异",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "闭合图面积",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部充满指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "工况候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常充满",
    "供液不足",
    "低效泵漏"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：载荷范围、上下行差异、闭合图面积、局部充满指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "闭合示功图解释工况形态",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从真实绘制的合成闭合载荷—位移曲线提取形态特征，kNN学习三类泵工况。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "独立参考示功图建立近邻库，当前闭合曲线生成面积等特征；选择样本联动投票和工况标签。",
      "effect": "面积与近邻投票形成可复核依据",
      "trap": "未实现杆柱动力学和井下功图换算，三种形态只是教学抽象。"
    },
    {
      "name": "对照与人工复核",
      "do": "相同峰值载荷可以对应不同回线形状，面积和上下行差异补充单幅值诊断。",
      "effect": "噪声扰动检验形态诊断鲁棒性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "闭合示功图解释工况形态",
    "面积与近邻投票形成可复核依据",
    "噪声扰动检验形态诊断鲁棒性"
  ],
  "english": {
    "title": "Rod-pump operating diagnosis",
    "stage": "Production",
    "intro": "The same peak load can accompany different loop shapes; area and stroke asymmetry improve on one-amplitude rules.",
    "concept": "Load–displacement dynamometer cards reveal states such as insufficient inflow, gas lock, pump leakage and rod failure.",
    "method": "Shape features + standardized kNN",
    "what": "kNN learns three pump conditions from shape features of synthetic closed load/displacement cards.",
    "why": "The same peak load can accompany different loop shapes; area and stroke asymmetry improve on one-amplitude rules.",
    "how": "Independent reference cards form a neighbor bank. The current closed curve produces area and other features, linked to votes and labels.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Load range, Stroke asymmetry, Card area, Local fill indicator. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No rod-string dynamics or downhole-card conversion is implemented; the three patterns are teaching abstractions. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Load range",
        "unit": ""
      },
      {
        "name": "Stroke asymmetry",
        "unit": ""
      },
      {
        "name": "Card area",
        "unit": ""
      },
      {
        "name": "Local fill indicator",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Operating-condition candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal fill",
      "Insufficient inflow",
      "Leaking pump"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Load range, Stroke asymmetry, Card area, Local fill indicator. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Closed cards explain operating patterns",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "kNN learns three pump conditions from shape features of synthetic closed load/displacement cards.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Independent reference cards form a neighbor bank. The current closed curve produces area and other features, linked to votes and labels.",
        "effect": "Area and votes provide reviewable evidence",
        "trap": "No rod-string dynamics or downhole-card conversion is implemented; the three patterns are teaching abstractions."
      },
      {
        "name": "Compare and review",
        "do": "The same peak load can accompany different loop shapes; area and stroke asymmetry improve on one-amplitude rules.",
        "effect": "Noise tests shape-diagnosis robustness",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Closed cards explain operating patterns",
      "Area and votes provide reviewable evidence",
      "Noise tests shape-diagnosis robustness"
    ]
  }
} satisfies SceneCaseDef;
