import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-p3",
  "sceneId": "p3",
  "name": "射孔-射孔弹型智能选型",
  "title": "射孔弹型智能选型",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "graph",
  "method": "关系图约束过滤＋历史近邻排序",
  "methods": [
    "kg"
  ],
  "intro": "历史高频弹型不一定适配当前井况，硬约束必须先于相似度排名。",
  "concept": "不同射孔弹在穿深、孔径与对套管的损伤上各有取舍，选型要匹配岩性、套管钢级与完井方式。",
  "what": "小型关系图保存尺寸适配边，用标注历史试验的kNN票数排序可行弹型。",
  "why": "历史高频弹型不一定适配当前井况，硬约束必须先于相似度排名。",
  "how": "当前需求连接到尺寸约束节点，先过滤不适配弹型，再按标准化近邻票数选择候选。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：弹型适配尺寸指标、围压负担、孔径偏好、套管裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "仅实现尺寸适配的微型关系图，没有工业弹型数据库、材料约束或语义嵌入。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "弹型适配尺寸指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "围压负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "孔径偏好",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "套管裕度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "弹型候选",
      "unit": ""
    }
  ],
  "classes": [
    "小尺寸型",
    "均衡型",
    "大尺寸型"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：弹型适配尺寸指标、围压负担、孔径偏好、套管裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "关系边展示适配与排除路径",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "小型关系图保存尺寸适配边，用标注历史试验的kNN票数排序可行弹型。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "当前需求连接到尺寸约束节点，先过滤不适配弹型，再按标准化近邻票数选择候选。",
      "effect": "票数展示历史相似证据",
      "trap": "仅实现尺寸适配的微型关系图，没有工业弹型数据库、材料约束或语义嵌入。"
    },
    {
      "name": "对照与人工复核",
      "do": "历史高频弹型不一定适配当前井况，硬约束必须先于相似度排名。",
      "effect": "独立标注检查排序正确性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "关系边展示适配与排除路径",
    "票数展示历史相似证据",
    "独立标注检查排序正确性"
  ],
  "english": {
    "title": "Perforating-charge selection",
    "stage": "Perforation",
    "intro": "A historically common charge may not fit current requirements. Hard constraints must precede similarity ranking.",
    "concept": "Charge selection trades penetration, hole diameter and casing damage against reservoir and completion conditions.",
    "method": "Relation-graph constraint filtering + historical-neighbor ranking",
    "what": "A small relation graph stores size-compatibility edges; historical-trial kNN votes rank feasible charge types.",
    "why": "A historically common charge may not fit current requirements. Hard constraints must precede similarity ranking.",
    "how": "Connect requirements to size-constraint nodes, reject incompatible charges and rank survivors by standardized-neighbor votes.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Charge-size requirement, Confinement burden, Diameter preference, Casing margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is a miniature size-compatibility graph without an industrial charge database, material constraints or semantic embeddings. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Charge-size requirement",
        "unit": ""
      },
      {
        "name": "Confinement burden",
        "unit": ""
      },
      {
        "name": "Diameter preference",
        "unit": ""
      },
      {
        "name": "Casing margin",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Charge candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Small-format charge",
      "Balanced charge",
      "Large-format charge"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Charge-size requirement, Confinement burden, Diameter preference, Casing margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Graph edges show compatibility and exclusions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A small relation graph stores size-compatibility edges; historical-trial kNN votes rank feasible charge types.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Connect requirements to size-constraint nodes, reject incompatible charges and rank survivors by standardized-neighbor votes.",
        "effect": "Votes show historical similarity evidence",
        "trap": "This is a miniature size-compatibility graph without an industrial charge database, material constraints or semantic embeddings."
      },
      {
        "name": "Compare and review",
        "do": "A historically common charge may not fit current requirements. Hard constraints must precede similarity ranking.",
        "effect": "Held-out labels assess ranking correctness",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Graph edges show compatibility and exclusions",
      "Votes show historical similarity evidence",
      "Held-out labels assess ranking correctness"
    ]
  }
} satisfies SceneCaseDef;
