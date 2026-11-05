import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-screen",
  "sceneId": "co1",
  "name": "完井-防砂筛管粒度适配选型",
  "title": "防砂筛管粒度适配选型",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "graph",
  "method": "适配约束图＋标准化近邻排序",
  "methods": [
    "kg"
  ],
  "intro": "防砂设计需要关注粒度分布而不只看平均值。",
  "concept": "防砂设计需要关注粒度分布而不只看平均值。经验常用的规格也可能不适配当前粒度组合。",
  "what": "小型适配关系图先筛除不满足粒度条件的候选，再用历史近邻票数排序。",
  "why": "防砂设计需要关注粒度分布而不只看平均值。经验常用的规格也可能不适配当前粒度组合。",
  "how": "参考记录提供粒度与规格标签，目标按教学粒度区间过滤后排序；关系边清楚显示排除依据。",
  "data": "独立合成参考与测试记录。输入包括中值粒度指标、粗粒比例、分选离散度、流动负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "区间不是现场筛管设计标准，尚未包含挡砂、堵塞和渗流试验。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "中值粒度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "粗粒比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "分选离散度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流动负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "筛管候选",
      "unit": ""
    }
  ],
  "classes": [
    "细槽参考",
    "中槽参考",
    "粗槽参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括中值粒度指标、粗粒比例、分选离散度、流动负担；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "粒度指标解释适配条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "小型适配关系图先筛除不满足粒度条件的候选，再用历史近邻票数排序。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考记录提供粒度与规格标签，目标按教学粒度区间过滤后排序；关系边清楚显示排除依据。",
      "effect": "关系边展示规格排除",
      "trap": "区间不是现场筛管设计标准，尚未包含挡砂、堵塞和渗流试验。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "防砂设计需要关注粒度分布而不只看平均值。经验常用的规格也可能不适配当前粒度组合。",
      "effect": "历史票数与适配约束共同复核",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "粒度指标解释适配条件",
    "关系边展示规格排除",
    "历史票数与适配约束共同复核"
  ],
  "extension": {
    "key": "screen",
    "task": "selection"
  },
  "references": [
    {
      "title": "SLB Sieve Analysis",
      "url": "https://glossary.slb.com/en/terms/s/sieve_analysis",
      "note": "支持粒度分布与防砂背景；教学适配范围不是实际筛管设计标准。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Sand-screen grain-size compatibility",
    "stage": "Completion",
    "intro": "Sand control depends on grain distributions rather than just an average. A commonly used slot may not fit current grain conditions.",
    "concept": "Sand control depends on grain distributions rather than just an average. A commonly used slot may not fit current grain conditions.",
    "method": "Compatibility graph + standardized neighbor ranking",
    "what": "A small compatibility graph filters candidates by grain conditions before ranking historical-neighbor votes.",
    "why": "Sand control depends on grain distributions rather than just an average. A commonly used slot may not fit current grain conditions.",
    "how": "Reference records link grain features to labels. Filter target candidates by declared teaching ranges, rank them and expose exclusion edges.",
    "data": "Independent synthetic reference and test records. Inputs include Median grain-size index, Coarse fraction, Sorting spread, Flow burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Ranges are not screen-design standards and omit retention, plugging and flow testing. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Median grain-size index",
        "unit": ""
      },
      {
        "name": "Coarse fraction",
        "unit": ""
      },
      {
        "name": "Sorting spread",
        "unit": ""
      },
      {
        "name": "Flow burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Screen candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Fine-slot reference",
      "Medium-slot reference",
      "Coarse-slot reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Median grain-size index, Coarse fraction, Sorting spread, Flow burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Grain indices explain compatibility",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "A small compatibility graph filters candidates by grain conditions before ranking historical-neighbor votes.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference records link grain features to labels. Filter target candidates by declared teaching ranges, rank them and expose exclusion edges.",
        "effect": "Edges show excluded slots",
        "trap": "Ranges are not screen-design standards and omit retention, plugging and flow testing."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Sand control depends on grain distributions rather than just an average. A commonly used slot may not fit current grain conditions.",
        "effect": "Review historical votes and constraints together",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Grain indices explain compatibility",
      "Edges show excluded slots",
      "Review historical votes and constraints together"
    ],
    "references": [
      {
        "title": "SLB Sieve Analysis",
        "url": "https://glossary.slb.com/en/terms/s/sieve_analysis",
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
