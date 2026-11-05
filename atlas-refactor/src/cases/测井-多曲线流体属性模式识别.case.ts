import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-fluid",
  "sceneId": "w4",
  "name": "测井-多曲线流体属性模式识别",
  "title": "多曲线流体属性模式识别",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "classification",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "ts"
  ],
  "intro": "电阻率高不唯一代表含油，孔隙和密度中子响应能补充信息。",
  "concept": "电阻率高不唯一代表含油，孔隙和密度中子响应能补充信息。不同岩性与盐度仍可能产生相似组合。",
  "what": "kNN学习电阻率、孔隙和密度中子组合的三种合成属性模式。",
  "why": "电阻率高不唯一代表含油，孔隙和密度中子响应能补充信息。不同岩性与盐度仍可能产生相似组合。",
  "how": "从独立参考属性向量建立邻居库，目标记录按距离投票，逐项检查相似参考和误分。",
  "data": "独立合成参考与测试记录。输入包括电阻率指标、孔隙响应、密度中子差、声学响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "油气水标签只是理想参考，不构成真实饱和度解释或可采性结论。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "电阻率指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "孔隙响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "密度中子差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "声学响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "流体属性候选",
      "unit": ""
    }
  ],
  "classes": [
    "油型参考",
    "气型参考",
    "水型参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括电阻率指标、孔隙响应、密度中子差、声学响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "属性轨迹展示组合特征",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "kNN学习电阻率、孔隙和密度中子组合的三种合成属性模式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "从独立参考属性向量建立邻居库，目标记录按距离投票，逐项检查相似参考和误分。",
      "effect": "近邻记录支持候选解读",
      "trap": "油气水标签只是理想参考，不构成真实饱和度解释或可采性结论。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "电阻率高不唯一代表含油，孔隙和密度中子响应能补充信息。不同岩性与盐度仍可能产生相似组合。",
      "effect": "工况漂移检验非唯一性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "属性轨迹展示组合特征",
    "近邻记录支持候选解读",
    "工况漂移检验非唯一性"
  ],
  "extension": {
    "key": "fluid",
    "task": "classification"
  },
  "references": [
    {
      "title": "SLB Basic Well Log Interpretation",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-log-interpretation",
      "note": "用于理解多曲线岩性与流体解释；本例不替代真实井标定。"
    },
    {
      "title": "SLB Water-cut Meter",
      "url": "https://glossary.slb.com/en/terms/w/water-cut_meter",
      "note": "说明持水率和含水率并不等同，避免把单项电学读数当作含水率。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Multilog fluid-attribute pattern recognition",
    "stage": "Well Logging",
    "intro": "High resistivity does not uniquely indicate oil. Porosity and density-neutron response add information, while lithology and salinity can remain ambiguous.",
    "concept": "High resistivity does not uniquely indicate oil. Porosity and density-neutron response add information, while lithology and salinity can remain ambiguous.",
    "method": "Multivariable observed features + kNN",
    "what": "kNN learns three synthetic patterns combining resistivity, porosity and density-neutron response.",
    "why": "High resistivity does not uniquely indicate oil. Porosity and density-neutron response add information, while lithology and salinity can remain ambiguous.",
    "how": "Build a neighbor bank from independent attribute vectors, vote by distance and inspect matching references and errors.",
    "data": "Independent synthetic reference and test records. Inputs include Resistivity index, Porosity response, Density-neutron contrast, Acoustic response. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Oil/gas/water labels are idealized references, not real saturation interpretations or producibility conclusions. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Resistivity index",
        "unit": ""
      },
      {
        "name": "Porosity response",
        "unit": ""
      },
      {
        "name": "Density-neutron contrast",
        "unit": ""
      },
      {
        "name": "Acoustic response",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fluid-attribute candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Oil-like reference",
      "Gas-like reference",
      "Water-like reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Resistivity index, Porosity response, Density-neutron contrast, Acoustic response. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Attribute tracks show combinations",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "kNN learns three synthetic patterns combining resistivity, porosity and density-neutron response.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Build a neighbor bank from independent attribute vectors, vote by distance and inspect matching references and errors.",
        "effect": "Neighbor records support candidates",
        "trap": "Oil/gas/water labels are idealized references, not real saturation interpretations or producibility conclusions."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "High resistivity does not uniquely indicate oil. Porosity and density-neutron response add information, while lithology and salinity can remain ambiguous.",
        "effect": "Shifts probe nonuniqueness",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Attribute tracks show combinations",
      "Neighbor records support candidates",
      "Shifts probe nonuniqueness"
    ],
    "references": [
      {
        "title": "SLB Basic Well Log Interpretation",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-log-interpretation",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "SLB Water-cut Meter",
        "url": "https://glossary.slb.com/en/terms/w/water-cut_meter",
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
