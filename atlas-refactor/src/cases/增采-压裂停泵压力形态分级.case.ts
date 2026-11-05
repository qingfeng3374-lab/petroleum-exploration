import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-falloff",
  "sceneId": "e2",
  "name": "增采-压裂停泵压力形态分级",
  "title": "压裂停泵压力形态分级",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "shape",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "cv",
    "opt"
  ],
  "intro": "停泵曲线可能包含不同阶段，单个末值会丢失早期与晚期的变化信息。",
  "concept": "停泵曲线可能包含不同阶段，单个末值会丢失早期与晚期的变化信息。保留形态有助于复核解释。",
  "what": "kNN从合成停泵压力曲线提取分窗统计，学习三种压降形态。",
  "why": "停泵曲线可能包含不同阶段，单个末值会丢失早期与晚期的变化信息。保留形态有助于复核解释。",
  "how": "参考曲线建立分窗近邻库，当前曲线实际计算统计特征；噪声和漂移预设检查类型稳定性。",
  "data": "独立合成参考与测试记录。输入包括早期压力均值、中期压力均值、晚期压力均值、局部衰减变化；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不执行真实DFIT解释，不估计闭合压力、渗透率或漏失系数。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "早期压力均值",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中期压力均值",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "晚期压力均值",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部衰减变化",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "压降形态候选",
      "unit": ""
    }
  ],
  "classes": [
    "缓降参考",
    "双阶段参考",
    "强衰减参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括早期压力均值、中期压力均值、晚期压力均值、局部衰减变化；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "压力曲线解释衰减阶段",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "kNN从合成停泵压力曲线提取分窗统计，学习三种压降形态。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考曲线建立分窗近邻库，当前曲线实际计算统计特征；噪声和漂移预设检查类型稳定性。",
      "effect": "分窗特征与投票联动",
      "trap": "不执行真实DFIT解释，不估计闭合压力、渗透率或漏失系数。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "停泵曲线可能包含不同阶段，单个末值会丢失早期与晚期的变化信息。保留形态有助于复核解释。",
      "effect": "错分检查压力解释歧义",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "压力曲线解释衰减阶段",
    "分窗特征与投票联动",
    "错分检查压力解释歧义"
  ],
  "extension": {
    "key": "falloff",
    "task": "waveform"
  },
  "references": [
    {
      "title": "BCER DFIT Recommendations",
      "url": "https://www.bc-er.ca/files/operations-documentation/Reservoir-Management/Well-Testing/Diagnostic-Fracture-Injection-Test-DFIT-Recommendations_revised-20Jul2023.pdf",
      "note": "支持注入压降测试背景，演示不解释真实闭合压力或渗透率。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Fracture shut-in pressure-pattern grading",
    "stage": "Enhanced Recovery",
    "intro": "Shut-in traces can contain different stages; one final value loses early/late evolution. Retaining shape supports review.",
    "concept": "Shut-in traces can contain different stages; one final value loses early/late evolution. Retaining shape supports review.",
    "method": "Multivariable observed features + kNN",
    "what": "kNN learns three shut-in pressure patterns from window statistics of synthetic curves.",
    "why": "Shut-in traces can contain different stages; one final value loses early/late evolution. Retaining shape supports review.",
    "how": "Build a reference-window neighbor bank, compute target statistics and test type stability under noise and drift.",
    "data": "Independent synthetic reference and test records. Inputs include Early pressure mean, Mid pressure mean, Late pressure mean, Local decay variation. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This does not interpret a real DFIT or estimate closure pressure, permeability or leakoff coefficient. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Early pressure mean",
        "unit": ""
      },
      {
        "name": "Mid pressure mean",
        "unit": ""
      },
      {
        "name": "Late pressure mean",
        "unit": ""
      },
      {
        "name": "Local decay variation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Pressure-decay candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Slow-decay reference",
      "Two-stage reference",
      "Strong-decay reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Early pressure mean, Mid pressure mean, Late pressure mean, Local decay variation. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Pressure traces explain decay stages",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "kNN learns three shut-in pressure patterns from window statistics of synthetic curves.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Build a reference-window neighbor bank, compute target statistics and test type stability under noise and drift.",
        "effect": "Link window features and votes",
        "trap": "This does not interpret a real DFIT or estimate closure pressure, permeability or leakoff coefficient."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Shut-in traces can contain different stages; one final value loses early/late evolution. Retaining shape supports review.",
        "effect": "Errors reveal pressure-interpretation ambiguity",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Pressure traces explain decay stages",
      "Link window features and votes",
      "Errors reveal pressure-interpretation ambiguity"
    ],
    "references": [
      {
        "title": "BCER DFIT Recommendations",
        "url": "https://www.bc-er.ca/files/operations-documentation/Reservoir-Management/Well-Testing/Diagnostic-Fracture-Injection-Test-DFIT-Recommendations_revised-20Jul2023.pdf",
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
