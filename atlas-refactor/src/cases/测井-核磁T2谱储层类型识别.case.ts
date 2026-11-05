import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-nmr",
  "sceneId": "w2",
  "name": "测井-核磁T2谱储层类型识别",
  "title": "核磁T2谱储层类型识别",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "shape",
  "method": "T₂谱分区积分＋kNN",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "T2是分布而不是单一值，短长区间的相对贡献提供不同孔隙信息。",
  "concept": "T2是分布而不是单一值，短长区间的相对贡献提供不同孔隙信息。只看总振幅会忽略谱形差异。",
  "what": "对合成T2分布计算分区积分和谱重心，kNN识别三种谱形。",
  "why": "T2是分布而不是单一值，短长区间的相对贡献提供不同孔隙信息。只看总振幅会忽略谱形差异。",
  "how": "每个目标谱从实际采样强度积分，参考谱按标准化分区比例投票，查看原谱与各区间贡献。",
  "data": "独立合成参考与测试记录。输入包括短T2区间比例、中T2区间比例、长T2区间比例、谱重心；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "T2轴是示意对数区间索引，未反演真实孔径、自由流体或渗透率。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "短T2区间比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中T2区间比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "长T2区间比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "谱重心",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "T2谱类型",
      "unit": ""
    }
  ],
  "classes": [
    "短弛豫参考",
    "长弛豫参考",
    "混合谱参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括短T2区间比例、中T2区间比例、长T2区间比例、谱重心；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "谱形说明短长弛豫差异",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "对合成T2分布计算分区积分和谱重心，kNN识别三种谱形。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "每个目标谱从实际采样强度积分，参考谱按标准化分区比例投票，查看原谱与各区间贡献。",
      "effect": "分区积分和投票联动",
      "trap": "T2轴是示意对数区间索引，未反演真实孔径、自由流体或渗透率。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "T2是分布而不是单一值，短长区间的相对贡献提供不同孔隙信息。只看总振幅会忽略谱形差异。",
      "effect": "噪声对照检查弱谱误分",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "谱形说明短长弛豫差异",
    "分区积分和投票联动",
    "噪声对照检查弱谱误分"
  ],
  "extension": {
    "key": "nmr",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB NMR and T2",
      "url": "https://glossary.slb.com/en/terms/n/nmr",
      "note": "支持T2分布和孔隙信息的专业背景；不使用实测核磁数据。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "NMR T2-spectrum pattern recognition",
    "stage": "Well Logging",
    "intro": "T2 is a distribution rather than one value. Relative short/long contributions carry different pore information; total amplitude alone loses shape.",
    "concept": "T2 is a distribution rather than one value. Relative short/long contributions carry different pore information; total amplitude alone loses shape.",
    "method": "T₂ spectral-band integration + kNN",
    "what": "Integrate regions of synthetic T2 distributions and compute centroids; kNN recognizes three spectrum types.",
    "why": "T2 is a distribution rather than one value. Relative short/long contributions carry different pore information; total amplitude alone loses shape.",
    "how": "Integrate sampled intensities in each target spectrum, classify using standardized reference fractions and inspect original spectra and regions.",
    "data": "Independent synthetic reference and test records. Inputs include Short-T2 fraction, Mid-T2 fraction, Long-T2 fraction, Spectral centroid. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "The T2 axis is an illustrative log-bin index; real pore size, free fluid and permeability are not inverted. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Short-T2 fraction",
        "unit": ""
      },
      {
        "name": "Mid-T2 fraction",
        "unit": ""
      },
      {
        "name": "Long-T2 fraction",
        "unit": ""
      },
      {
        "name": "Spectral centroid",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "T2-spectrum type",
        "unit": ""
      }
    ],
    "classes": [
      "Short-relaxation reference",
      "Long-relaxation reference",
      "Mixed-spectrum reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Short-T2 fraction, Mid-T2 fraction, Long-T2 fraction, Spectral centroid. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Spectra explain short",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Integrate regions of synthetic T2 distributions and compute centroids; kNN recognizes three spectrum types.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Integrate sampled intensities in each target spectrum, classify using standardized reference fractions and inspect original spectra and regions.",
        "effect": "Link regional integration and votes",
        "trap": "The T2 axis is an illustrative log-bin index; real pore size, free fluid and permeability are not inverted."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "T2 is a distribution rather than one value. Relative short/long contributions carry different pore information; total amplitude alone loses shape.",
        "effect": "Noise comparisons inspect weak-signal errors",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Spectra explain short",
      "Link regional integration and votes",
      "Noise comparisons inspect weak-signal errors"
    ],
    "references": [
      {
        "title": "SLB NMR and T2",
        "url": "https://glossary.slb.com/en/terms/n/nmr",
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
