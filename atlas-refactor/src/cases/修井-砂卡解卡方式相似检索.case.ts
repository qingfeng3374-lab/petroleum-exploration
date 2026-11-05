import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-sand-release",
  "sceneId": "wo2",
  "name": "修井-砂卡解卡方式相似检索",
  "title": "砂卡解卡方式相似检索",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "graph",
  "method": "适配约束图＋标准化近邻排序",
  "methods": [
    "kg"
  ],
  "intro": "同样的卡阻描述可能对应不同循环和工具条件，历史常用方法不能跳过适配检查。",
  "concept": "同样的卡阻描述可能对应不同循环和工具条件，历史常用方法不能跳过适配检查。",
  "what": "关系图先核对循环与工具裕度，kNN再检索相似卡阻工况的参考方式。",
  "why": "同样的卡阻描述可能对应不同循环和工具条件，历史常用方法不能跳过适配检查。",
  "how": "参考记录训练标准化距离，当前候选按公开教学约束过滤，再按实际近邻票数排序并展示排除路径。",
  "data": "独立合成参考与测试记录。输入包括卡阻负担、循环可达性、井斜条件、工具裕度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "只展示信息检索与适配关系，不给解卡载荷、压力或现场操作顺序。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "卡阻负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "循环可达性",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "井斜条件",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "工具裕度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "干预方式候选",
      "unit": ""
    }
  ],
  "classes": [
    "循环复核参考",
    "常规干预参考",
    "组合干预参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括卡阻负担、循环可达性、井斜条件、工具裕度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "工况特征解释卡阻差异",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "关系图先核对循环与工具裕度，kNN再检索相似卡阻工况的参考方式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考记录训练标准化距离，当前候选按公开教学约束过滤，再按实际近邻票数排序并展示排除路径。",
      "effect": "约束关系图显示排除依据",
      "trap": "只展示信息检索与适配关系，不给解卡载荷、压力或现场操作顺序。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "同样的卡阻描述可能对应不同循环和工具条件，历史常用方法不能跳过适配检查。",
      "effect": "相似记录和投票共同复核",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "工况特征解释卡阻差异",
    "约束关系图显示排除依据",
    "相似记录和投票共同复核"
  ],
  "extension": {
    "key": "sand-release",
    "task": "selection"
  },
  "references": [
    {
      "title": "SLB Sand Handling During Cleanout",
      "url": "https://www.slb.com/resource-library/technical-paper/wi/spe-166531",
      "note": "说明清砂与井下干预的复杂性；演示候选不是作业指令。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Sand-stuck release-method retrieval",
    "stage": "Workover",
    "intro": "Similar sticking descriptions can have different circulation and tool conditions; commonly used methods still need compatibility checks.",
    "concept": "Similar sticking descriptions can have different circulation and tool conditions; commonly used methods still need compatibility checks.",
    "method": "Compatibility graph + standardized neighbor ranking",
    "what": "A relation graph checks circulation and tool margins before kNN retrieves reference methods for similar sticking conditions.",
    "why": "Similar sticking descriptions can have different circulation and tool conditions; commonly used methods still need compatibility checks.",
    "how": "Fit standardized distances on references, filter candidates using declared teaching constraints and rank actual neighbor votes with visible exclusions.",
    "data": "Independent synthetic reference and test records. Inputs include Sticking burden, Circulation access, Inclination condition, Tool margin. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This demonstrates retrieval and compatibility only, without release loads, pressures or operational sequences. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Sticking burden",
        "unit": ""
      },
      {
        "name": "Circulation access",
        "unit": ""
      },
      {
        "name": "Inclination condition",
        "unit": ""
      },
      {
        "name": "Tool margin",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Intervention candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Circulation-review reference",
      "Conventional-intervention reference",
      "Combined-intervention reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Sticking burden, Circulation access, Inclination condition, Tool margin. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Features explain sticking differences",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "A relation graph checks circulation and tool margins before kNN retrieves reference methods for similar sticking conditions.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit standardized distances on references, filter candidates using declared teaching constraints and rank actual neighbor votes with visible exclusions.",
        "effect": "Constraint graphs expose exclusion reasons",
        "trap": "This demonstrates retrieval and compatibility only, without release loads, pressures or operational sequences."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Similar sticking descriptions can have different circulation and tool conditions; commonly used methods still need compatibility checks.",
        "effect": "Review neighbors and votes together",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Features explain sticking differences",
      "Constraint graphs expose exclusion reasons",
      "Review neighbors and votes together"
    ],
    "references": [
      {
        "title": "SLB Sand Handling During Cleanout",
        "url": "https://www.slb.com/resource-library/technical-paper/wi/spe-166531",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Nearest Neighbors",
        "url": "https://scikit-learn.org/stable/modules/neighbors.html",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
