import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-avo",
  "sceneId": "s4",
  "name": "物探-AVO截距梯度组合分类",
  "title": "AVO截距梯度组合分类",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "shape",
  "method": "AVO截距梯度拟合＋kNN",
  "methods": [
    "cv",
    "opt"
  ],
  "intro": "AVO解释关心振幅随角度的变化，近偏移振幅相同也可能对应不同梯度。",
  "concept": "AVO解释关心振幅随角度的变化，近偏移振幅相同也可能对应不同梯度。属性组合仍存在岩性和流体非唯一性。",
  "what": "对合成角度振幅拟合截距和梯度，再用kNN学习三种属性模式。",
  "why": "AVO解释关心振幅随角度的变化，近偏移振幅相同也可能对应不同梯度。属性组合仍存在岩性和流体非唯一性。",
  "how": "从当前振幅序列实际计算截距、梯度和残差，参考模式建立近邻库；噪声预设显示拟合误差如何传递到分类。",
  "data": "独立合成参考与测试记录。输入包括截距估计、梯度估计、拟合残差、远近振幅差；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "类别是合成属性模式，不直接代表油气水层；没有弹性参数反演或井震标定。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "截距估计",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "梯度估计",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "拟合残差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "远近振幅差",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "属性模式候选",
      "unit": ""
    }
  ],
  "classes": [
    "模式甲",
    "模式乙",
    "模式丙"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括截距估计、梯度估计、拟合残差、远近振幅差；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "角度振幅曲线解释AVO变化",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "对合成角度振幅拟合截距和梯度，再用kNN学习三种属性模式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "从当前振幅序列实际计算截距、梯度和残差，参考模式建立近邻库；噪声预设显示拟合误差如何传递到分类。",
      "effect": "截距梯度与投票联动",
      "trap": "类别是合成属性模式，不直接代表油气水层；没有弹性参数反演或井震标定。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "AVO解释关心振幅随角度的变化，近偏移振幅相同也可能对应不同梯度。属性组合仍存在岩性和流体非唯一性。",
      "effect": "混淆对照约束流体解读",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "角度振幅曲线解释AVO变化",
    "截距梯度与投票联动",
    "混淆对照约束流体解读"
  ],
  "extension": {
    "key": "avo",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB AVO Seismic Inversion",
      "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/reservoir-characterization/seismic/subsurface-imaging/seismic-reservoir-characterization/seismic-inversion/avo-seismic-inversion",
      "note": "用于理解截距和梯度属性，不代表本例完成工业AVO反演。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "AVO intercept-gradient classification",
    "stage": "Geophysics",
    "intro": "AVO interpretation concerns amplitude changes with angle; identical near amplitudes can have different gradients. Lithology and fluid interpretation remain nonunique.",
    "concept": "AVO interpretation concerns amplitude changes with angle; identical near amplitudes can have different gradients. Lithology and fluid interpretation remain nonunique.",
    "method": "AVO intercept/gradient fitting + kNN",
    "what": "Fit intercept and gradient to synthetic angle-dependent amplitudes, then learn three patterns with kNN.",
    "why": "AVO interpretation concerns amplitude changes with angle; identical near amplitudes can have different gradients. Lithology and fluid interpretation remain nonunique.",
    "how": "Compute intercept, gradient and residual from each amplitude sequence and classify against reference patterns; noise shows how fit errors propagate into decisions.",
    "data": "Independent synthetic reference and test records. Inputs include Intercept estimate, Gradient estimate, Fit residual, Far-near amplitude contrast. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Classes are synthetic attribute patterns, not oil/gas/water labels; elastic inversion and well ties are absent. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Intercept estimate",
        "unit": ""
      },
      {
        "name": "Gradient estimate",
        "unit": ""
      },
      {
        "name": "Fit residual",
        "unit": ""
      },
      {
        "name": "Far-near amplitude contrast",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Attribute-pattern candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Pattern A",
      "Pattern B",
      "Pattern C"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Intercept estimate, Gradient estimate, Fit residual, Far-near amplitude contrast. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Angle-amplitude curves explain AVO changes",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Fit intercept and gradient to synthetic angle-dependent amplitudes, then learn three patterns with kNN.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Compute intercept, gradient and residual from each amplitude sequence and classify against reference patterns; noise shows how fit errors propagate into decisions.",
        "effect": "Link intercept-gradient features and votes",
        "trap": "Classes are synthetic attribute patterns, not oil/gas/water labels; elastic inversion and well ties are absent."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "AVO interpretation concerns amplitude changes with angle; identical near amplitudes can have different gradients. Lithology and fluid interpretation remain nonunique.",
        "effect": "Confusion checks qualify fluid interpretation",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Angle-amplitude curves explain AVO changes",
      "Link intercept-gradient features and votes",
      "Confusion checks qualify fluid interpretation"
    ],
    "references": [
      {
        "title": "SLB AVO Seismic Inversion",
        "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/reservoir-characterization/seismic/subsurface-imaging/seismic-reservoir-characterization/seismic-inversion/avo-seismic-inversion",
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
