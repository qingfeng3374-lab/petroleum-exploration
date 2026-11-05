import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-wo2",
  "sceneId": "wo2",
  "name": "修井-落物打捞工具智能选型",
  "title": "落物打捞工具智能选型",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "graph",
  "method": "关系图约束过滤＋历史近邻排序",
  "methods": [
    "kg"
  ],
  "intro": "打捞工具不能只按历史成功次数选择，不适配落物尺寸的高频工具仍应被排除。",
  "concept": "井下落物（油管、抽油杆、工具、电缆）形态各异，打捞工具的选择取决于落物尺寸、形态、所在井段与井身结构。",
  "what": "小型关系图按尺寸适配过滤工具，kNN从成功参考记录产生排序票数。",
  "why": "打捞工具不能只按历史成功次数选择，不适配落物尺寸的高频工具仍应被排除。",
  "how": "将当前落物尺寸连接到三个工具的适用范围边，保留可行候选，再按历史标准化距离投票排序。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：落物尺寸指标、可抓持程度、井斜负担、通道裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "仅演示尺寸约束，不包含实际抓持结构、鱼顶状态或工具强度校核。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "落物尺寸指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "可抓持程度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井斜负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "通道裕度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "打捞工具候选",
      "unit": ""
    }
  ],
  "classes": [
    "小尺寸打捞器",
    "中尺寸打捞器",
    "大尺寸打捞器"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：落物尺寸指标、可抓持程度、井斜负担、通道裕度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "关系图显示排除路径",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "小型关系图按尺寸适配过滤工具，kNN从成功参考记录产生排序票数。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "将当前落物尺寸连接到三个工具的适用范围边，保留可行候选，再按历史标准化距离投票排序。",
      "effect": "票数与参考距离解释选型",
      "trap": "仅演示尺寸约束，不包含实际抓持结构、鱼顶状态或工具强度校核。"
    },
    {
      "name": "对照与人工复核",
      "do": "打捞工具不能只按历史成功次数选择，不适配落物尺寸的高频工具仍应被排除。",
      "effect": "独立案例检查尺寸边界",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "关系图显示排除路径",
    "票数与参考距离解释选型",
    "独立案例检查尺寸边界"
  ],
  "english": {
    "title": "Fishing-tool selection",
    "stage": "Workover",
    "intro": "Fishing tools cannot be chosen by success frequency alone; popular tools with incompatible dimensions must be rejected.",
    "concept": "Lost tubing, rods, tools and cables require tools matched to their dimensions, shape, depth and well geometry.",
    "method": "Relation-graph constraint filtering + historical-neighbor ranking",
    "what": "A small relation graph filters tools by size compatibility; kNN ranks them using successful reference records.",
    "why": "Fishing tools cannot be chosen by success frequency alone; popular tools with incompatible dimensions must be rejected.",
    "how": "Connect fish size to three tool-range edges, retain feasible candidates and rank by standardized historical-neighbor votes.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Fish-size index, Gripping accessibility, Inclination burden, Passage margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Only size constraints are demonstrated; gripping geometry, fish-top condition and tool-strength checks are omitted. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Fish-size index",
        "unit": ""
      },
      {
        "name": "Gripping accessibility",
        "unit": ""
      },
      {
        "name": "Inclination burden",
        "unit": ""
      },
      {
        "name": "Passage margin",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fishing-tool candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Small fishing tool",
      "Medium fishing tool",
      "Large fishing tool"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Fish-size index, Gripping accessibility, Inclination burden, Passage margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Graph shows exclusion paths",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A small relation graph filters tools by size compatibility; kNN ranks them using successful reference records.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Connect fish size to three tool-range edges, retain feasible candidates and rank by standardized historical-neighbor votes.",
        "effect": "Votes and distances explain tool selection",
        "trap": "Only size constraints are demonstrated; gripping geometry, fish-top condition and tool-strength checks are omitted."
      },
      {
        "name": "Compare and review",
        "do": "Fishing tools cannot be chosen by success frequency alone; popular tools with incompatible dimensions must be rejected.",
        "effect": "Held-out cases inspect size boundaries",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Graph shows exclusion paths",
      "Votes and distances explain tool selection",
      "Held-out cases inspect size boundaries"
    ]
  }
} satisfies SceneCaseDef;
