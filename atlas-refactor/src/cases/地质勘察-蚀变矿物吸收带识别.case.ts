import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-mineral",
  "sceneId": "g1",
  "name": "地质勘察-蚀变矿物吸收带识别",
  "title": "蚀变矿物吸收带识别",
  "stage": "地质勘察",
  "stageId": "geology",
  "engine": "scene",
  "family": "shape",
  "method": "吸收带特征＋kNN",
  "methods": [
    "cv"
  ],
  "intro": "矿物光谱的吸收位置比单一亮度更能表达成分差异。",
  "concept": "矿物光谱的吸收位置比单一亮度更能表达成分差异。多波段证据也需要检查混合和噪声带来的歧义。",
  "what": "从合成反射光谱积分三个吸收带，标准化kNN学习不同光谱类型。",
  "why": "矿物光谱的吸收位置比单一亮度更能表达成分差异。多波段证据也需要检查混合和噪声带来的歧义。",
  "how": "参考光谱建立近邻库，目标光谱只从实际采样点计算吸收特征；点击样本联动谱形、近邻与分类误差。",
  "data": "独立合成参考与测试记录。输入包括吸收带一强度、吸收带二强度、吸收带三强度、平均反射强度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "波长为示意索引，类别不等于已完成真实矿物定名或USGS光谱库验证。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "吸收带一强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "吸收带二强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "吸收带三强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "平均反射强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "光谱类型候选",
      "unit": ""
    }
  ],
  "classes": [
    "第一吸收带型",
    "第二吸收带型",
    "第三吸收带型"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括吸收带一强度、吸收带二强度、吸收带三强度、平均反射强度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "反射光谱解释吸收位置",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "从合成反射光谱积分三个吸收带，标准化kNN学习不同光谱类型。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考光谱建立近邻库，目标光谱只从实际采样点计算吸收特征；点击样本联动谱形、近邻与分类误差。",
      "effect": "分带特征与近邻投票联动",
      "trap": "波长为示意索引，类别不等于已完成真实矿物定名或USGS光谱库验证。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "矿物光谱的吸收位置比单一亮度更能表达成分差异。多波段证据也需要检查混合和噪声带来的歧义。",
      "effect": "噪声与分布变化检验可辨性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "反射光谱解释吸收位置",
    "分带特征与近邻投票联动",
    "噪声与分布变化检验可辨性"
  ],
  "extension": {
    "key": "mineral",
    "task": "waveform"
  },
  "references": [
    {
      "title": "USGS Spectral Library",
      "url": "https://www.usgs.gov/labs/spectroscopy-lab/usgs-spectral-library",
      "note": "用于了解矿物光谱吸收特征；实验不直接使用该光谱库。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Alteration-mineral absorption bands",
    "stage": "Geological Survey",
    "intro": "Absorption positions describe compositional differences better than one brightness value. Mixed materials and noise can still make interpretation ambiguous.",
    "concept": "Absorption positions describe compositional differences better than one brightness value. Mixed materials and noise can still make interpretation ambiguous.",
    "method": "Absorption-band features + kNN",
    "what": "Integrate three absorption bands of synthetic reflectance spectra; standardized kNN learns spectral types.",
    "why": "Absorption positions describe compositional differences better than one brightness value. Mixed materials and noise can still make interpretation ambiguous.",
    "how": "Reference spectra form a neighbor bank. Target features come from actual sampled intensities; link spectra, neighbors and errors by sample.",
    "data": "Independent synthetic reference and test records. Inputs include Band-one absorption, Band-two absorption, Band-three absorption, Mean reflectance. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Wavelengths are illustrative indices; classes do not establish real mineral identification or USGS-library validation. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Band-one absorption",
        "unit": ""
      },
      {
        "name": "Band-two absorption",
        "unit": ""
      },
      {
        "name": "Band-three absorption",
        "unit": ""
      },
      {
        "name": "Mean reflectance",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Spectral-type candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Band-one type",
      "Band-two type",
      "Band-three type"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Band-one absorption, Band-two absorption, Band-three absorption, Mean reflectance. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Reflectance spectra explain absorption positions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Integrate three absorption bands of synthetic reflectance spectra; standardized kNN learns spectral types.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference spectra form a neighbor bank. Target features come from actual sampled intensities; link spectra, neighbors and errors by sample.",
        "effect": "Link absorption features and neighbor votes",
        "trap": "Wavelengths are illustrative indices; classes do not establish real mineral identification or USGS-library validation."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Absorption positions describe compositional differences better than one brightness value. Mixed materials and noise can still make interpretation ambiguous.",
        "effect": "Noise and shifts test distinguishability",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Reflectance spectra explain absorption positions",
      "Link absorption features and neighbor votes",
      "Noise and shifts test distinguishability"
    ],
    "references": [
      {
        "title": "USGS Spectral Library",
        "url": "https://www.usgs.gov/labs/spectroscopy-lab/usgs-spectral-library",
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
