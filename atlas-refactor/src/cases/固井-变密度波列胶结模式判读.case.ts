import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-vdl",
  "sceneId": "c1",
  "name": "固井-变密度波列胶结模式判读",
  "title": "变密度波列胶结模式判读",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "shape",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "cv",
    "ts"
  ],
  "intro": "变密度图保留整个波列，套管到达和地层到达提供互补证据。",
  "concept": "变密度图保留整个波列，套管到达和地层到达提供互补证据。只看单个峰值不足以理解波形差异。",
  "what": "从合成接收波列提取早晚窗能量，kNN学习三种胶结响应模式。",
  "why": "变密度图保留整个波列，套管到达和地层到达提供互补证据。只看单个峰值不足以理解波形差异。",
  "how": "参考波列训练近邻模型，目标波形实际积分早晚能量；查看比值、相似波列与混淆对照。",
  "data": "独立合成参考与测试记录。输入包括早到能量、晚到能量、晚早能量比、波列峰值；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "只是合成波列分类，没有真实VDL测井、微环隙判别或层间封隔结论。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "早到能量",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "晚到能量",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "晚早能量比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "波列峰值",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "波列模式候选",
      "unit": ""
    }
  ],
  "classes": [
    "地层波参考",
    "套管波参考",
    "混合波参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括早到能量、晚到能量、晚早能量比、波列峰值；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "波列展示早到与晚到响应",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "从合成接收波列提取早晚窗能量，kNN学习三种胶结响应模式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考波列训练近邻模型，目标波形实际积分早晚能量；查看比值、相似波列与混淆对照。",
      "effect": "能量比与近邻投票联动",
      "trap": "只是合成波列分类，没有真实VDL测井、微环隙判别或层间封隔结论。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "变密度图保留整个波列，套管到达和地层到达提供互补证据。只看单个峰值不足以理解波形差异。",
      "effect": "强干扰检查胶结模式歧义",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "波列展示早到与晚到响应",
    "能量比与近邻投票联动",
    "强干扰检查胶结模式歧义"
  ],
  "extension": {
    "key": "vdl",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB Variable-density Log",
      "url": "https://glossary.slb.com/en/terms/v/variable-density_log",
      "note": "支持声波列与胶结解释的关系；不据此判断真实层间封隔。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Variable-density waveform bond patterns",
    "stage": "Cementing",
    "intro": "Variable-density presentation retains the waveform; casing and formation arrivals provide complementary evidence. One peak does not explain those differences.",
    "concept": "Variable-density presentation retains the waveform; casing and formation arrivals provide complementary evidence. One peak does not explain those differences.",
    "method": "Multivariable observed features + kNN",
    "what": "Extract early/late window energies from synthetic receiver waveforms; kNN learns three bond-response patterns.",
    "why": "Variable-density presentation retains the waveform; casing and formation arrivals provide complementary evidence. One peak does not explain those differences.",
    "how": "Reference waveforms train the neighbor model. Integrate target early/late energies and inspect ratios, matching waveforms and confusion.",
    "data": "Independent synthetic reference and test records. Inputs include Early-arrival energy, Late-arrival energy, Late-early energy ratio, Waveform peak. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is synthetic waveform classification, without real VDL logs, microannulus diagnosis or zonal-isolation conclusions. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Early-arrival energy",
        "unit": ""
      },
      {
        "name": "Late-arrival energy",
        "unit": ""
      },
      {
        "name": "Late-early energy ratio",
        "unit": ""
      },
      {
        "name": "Waveform peak",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Waveform-pattern candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Formation-wave reference",
      "Casing-wave reference",
      "Mixed-wave reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Early-arrival energy, Late-arrival energy, Late-early energy ratio, Waveform peak. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Waveforms show early and late arrivals",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Extract early/late window energies from synthetic receiver waveforms; kNN learns three bond-response patterns.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference waveforms train the neighbor model. Integrate target early/late energies and inspect ratios, matching waveforms and confusion.",
        "effect": "Link energy ratios and neighbor votes",
        "trap": "This is synthetic waveform classification, without real VDL logs, microannulus diagnosis or zonal-isolation conclusions."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Variable-density presentation retains the waveform; casing and formation arrivals provide complementary evidence. One peak does not explain those differences.",
        "effect": "Interference probes bond-pattern ambiguity",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Waveforms show early and late arrivals",
      "Link energy ratios and neighbor votes",
      "Interference probes bond-pattern ambiguity"
    ],
    "references": [
      {
        "title": "SLB Variable-density Log",
        "url": "https://glossary.slb.com/en/terms/v/variable-density_log",
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
