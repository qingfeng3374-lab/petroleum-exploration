import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-horizon-track",
  "sceneId": "s1",
  "name": "物探-地震层位连续智能追踪",
  "title": "地震层位连续智能追踪",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "tracking",
  "method": "逻辑回归像素评分＋动态规划连续追踪",
  "methods": [
    "cv",
    "opt"
  ],
  "intro": "逐道挑最高振幅容易跳到强干扰反射。",
  "concept": "逐道挑最高振幅容易跳到强干扰反射。局部学习和连续性约束需要共同作用，并允许人工看见它们的取舍。",
  "what": "逻辑回归学习局部层位像素分数，动态规划综合分数与相邻道跳跃惩罚。",
  "why": "逐道挑最高振幅容易跳到强干扰反射。局部学习和连续性约束需要共同作用，并允许人工看见它们的取舍。",
  "how": "参考剖面拟合像素分数，在目标剖面逐列递推最小代价路径；调连续性惩罚并对照逐道振幅最大值。",
  "data": "独立合成参考与测试记录。输入包括像素振幅、垂向对比、局部梯度、邻道一致性；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "一次仅追一条合成层位，未处理真实断层跨越、多层位拓扑或三维追踪。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "像素振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "垂向对比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部梯度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "邻道一致性",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "层位路径候选",
      "unit": ""
    }
  ],
  "classes": [
    "非路径",
    "路径候选"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括像素振幅、垂向对比、局部梯度、邻道一致性；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "观测剖面展示层位与干扰",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "逻辑回归学习局部层位像素分数，动态规划综合分数与相邻道跳跃惩罚。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考剖面拟合像素分数，在目标剖面逐列递推最小代价路径；调连续性惩罚并对照逐道振幅最大值。",
      "effect": "路径图展示连续性约束",
      "trap": "一次仅追一条合成层位，未处理真实断层跨越、多层位拓扑或三维追踪。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "逐道挑最高振幅容易跳到强干扰反射。局部学习和连续性约束需要共同作用，并允许人工看见它们的取舍。",
      "effect": "平均垂向偏差衡量追踪误差",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "观测剖面展示层位与干扰",
    "路径图展示连续性约束",
    "平均垂向偏差衡量追踪误差"
  ],
  "extension": {
    "key": "horizon-track",
    "task": "tracking"
  },
  "references": [
    {
      "title": "SLB Petrel Seismic Interpretation",
      "url": "https://www.slb.com/products-and-services/delivering-digital-at-scale/software/petrel-subsurface-software/petrel/petrel-geophysics/petrel-seismic-interpretation",
      "note": "说明层位追踪的业务背景；教学动态规划为本项目实现。"
    },
    {
      "title": "scikit-learn Logistic Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
      "note": "方法依据：logit与二分类分数，不把分数冒充已校准概率。"
    }
  ],
  "english": {
    "title": "Continuous learned seismic-horizon tracking",
    "stage": "Geophysics",
    "intro": "Per-trace amplitude maxima can jump to strong distractors. Local learning and continuity constraints should work together with visible tradeoffs.",
    "concept": "Per-trace amplitude maxima can jump to strong distractors. Local learning and continuity constraints should work together with visible tradeoffs.",
    "method": "Logistic pixel scoring + continuous dynamic programming",
    "what": "Logistic regression learns local horizon scores; dynamic programming combines them with inter-trace jump penalties.",
    "why": "Per-trace amplitude maxima can jump to strong distractors. Local learning and continuity constraints should work together with visible tradeoffs.",
    "how": "Fit scores on a reference section, then recursively find a minimum-cost path across the target; adjust continuity penalty against per-trace amplitude maxima.",
    "data": "Independent synthetic reference and test records. Inputs include Pixel amplitude, Vertical contrast, Local gradient, Neighbor-trace agreement. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "One synthetic horizon is tracked, without real fault crossings, multihorizon topology or 3D tracking. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Pixel amplitude",
        "unit": ""
      },
      {
        "name": "Vertical contrast",
        "unit": ""
      },
      {
        "name": "Local gradient",
        "unit": ""
      },
      {
        "name": "Neighbor-trace agreement",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Horizon-path candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Off path",
      "Path candidate"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Pixel amplitude, Vertical contrast, Local gradient, Neighbor-trace agreement. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Observed sections show horizons and distractors",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Logistic regression learns local horizon scores; dynamic programming combines them with inter-trace jump penalties.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit scores on a reference section, then recursively find a minimum-cost path across the target; adjust continuity penalty against per-trace amplitude maxima.",
        "effect": "Path masks show continuity constraints",
        "trap": "One synthetic horizon is tracked, without real fault crossings, multihorizon topology or 3D tracking."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Per-trace amplitude maxima can jump to strong distractors. Local learning and continuity constraints should work together with visible tradeoffs.",
        "effect": "Mean vertical deviation measures tracking error",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Observed sections show horizons and distractors",
      "Path masks show continuity constraints",
      "Mean vertical deviation measures tracking error"
    ],
    "references": [
      {
        "title": "SLB Petrel Seismic Interpretation",
        "url": "https://www.slb.com/products-and-services/delivering-digital-at-scale/software/petrel-subsurface-software/petrel/petrel-geophysics/petrel-seismic-interpretation",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Logistic Regression",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html#logistic-regression",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
