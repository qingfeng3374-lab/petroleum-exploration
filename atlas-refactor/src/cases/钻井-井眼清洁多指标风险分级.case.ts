import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-hole-cleaning",
  "sceneId": "d2",
  "name": "钻井-井眼清洁多指标风险分级",
  "title": "井眼清洁多指标风险分级",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "classification",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "ts"
  ],
  "intro": "高排量不保证所有井斜和岩屑负荷下都能有效携岩。",
  "concept": "高排量不保证所有井斜和岩屑负荷下都能有效携岩。多个条件应联合查看，避免只按一个流量阈值判断。",
  "what": "kNN从携岩流量、井斜、岩屑负荷和流变条件学习三档合成风险。",
  "why": "高排量不保证所有井斜和岩屑负荷下都能有效携岩。多个条件应联合查看，避免只按一个流量阈值判断。",
  "how": "参考记录按简化携岩负担关系标注，目标记录按标准化距离投票；与单流量分档对照。",
  "data": "独立合成参考与测试记录。输入包括携岩流量指标、井斜负担、岩屑负荷、流变支持指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "没有环空多相流或岩屑床力学模型，等级不是卡钻或井控事故概率。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "携岩流量指标",
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
      "name": "岩屑负荷",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流变支持指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "清洁风险候选",
      "unit": ""
    }
  ],
  "classes": [
    "低负担参考",
    "积床候选",
    "高负担候选"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括携岩流量指标、井斜负担、岩屑负荷、流变支持指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "输入指标揭示携岩条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "kNN从携岩流量、井斜、岩屑负荷和流变条件学习三档合成风险。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考记录按简化携岩负担关系标注，目标记录按标准化距离投票；与单流量分档对照。",
      "effect": "参考邻居解释风险等级",
      "trap": "没有环空多相流或岩屑床力学模型，等级不是卡钻或井控事故概率。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "高排量不保证所有井斜和岩屑负荷下都能有效携岩。多个条件应联合查看，避免只按一个流量阈值判断。",
      "effect": "分布变化检查工况迁移",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "输入指标揭示携岩条件",
    "参考邻居解释风险等级",
    "分布变化检查工况迁移"
  ],
  "extension": {
    "key": "hole-cleaning",
    "task": "classification"
  },
  "references": [
    {
      "title": "SLB Hole Cleaning",
      "url": "https://glossary.slb.com/en/terms/h/hole_cleaning",
      "note": "用于理解携岩和岩屑床问题；风险等级只是教学标签。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Multivariable hole-cleaning risk grading",
    "stage": "Drilling",
    "intro": "High flow does not guarantee transport at all inclinations and cuttings loads. Conditions need joint review rather than one flow threshold.",
    "concept": "High flow does not guarantee transport at all inclinations and cuttings loads. Conditions need joint review rather than one flow threshold.",
    "method": "Multivariable observed features + kNN",
    "what": "kNN learns three synthetic risk levels from transport flow, inclination, cuttings load and rheology.",
    "why": "High flow does not guarantee transport at all inclinations and cuttings loads. Conditions need joint review rather than one flow threshold.",
    "how": "Label reference records using a simplified transport-burden relation, vote by standardized distance and compare with flow-only grading.",
    "data": "Independent synthetic reference and test records. Inputs include Transport-flow index, Inclination burden, Cuttings load, Rheology support. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "No annular multiphase or cuttings-bed mechanics is solved; grades are not sticking or well-control probabilities. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Transport-flow index",
        "unit": ""
      },
      {
        "name": "Inclination burden",
        "unit": ""
      },
      {
        "name": "Cuttings load",
        "unit": ""
      },
      {
        "name": "Rheology support",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Cleaning-risk candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Low-burden reference",
      "Bed candidate",
      "High-burden candidate"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Transport-flow index, Inclination burden, Cuttings load, Rheology support. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Inputs show transport conditions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "kNN learns three synthetic risk levels from transport flow, inclination, cuttings load and rheology.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Label reference records using a simplified transport-burden relation, vote by standardized distance and compare with flow-only grading.",
        "effect": "Reference neighbors explain risk levels",
        "trap": "No annular multiphase or cuttings-bed mechanics is solved; grades are not sticking or well-control probabilities."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "High flow does not guarantee transport at all inclinations and cuttings loads. Conditions need joint review rather than one flow threshold.",
        "effect": "Shift tests inspect condition transfer",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Inputs show transport conditions",
      "Reference neighbors explain risk levels",
      "Shift tests inspect condition transfer"
    ],
    "references": [
      {
        "title": "SLB Hole Cleaning",
        "url": "https://glossary.slb.com/en/terms/h/hole_cleaning",
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
