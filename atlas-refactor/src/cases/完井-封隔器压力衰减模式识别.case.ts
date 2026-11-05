import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-seal",
  "sceneId": "co3",
  "name": "完井-封隔器压力衰减模式识别",
  "title": "封隔器压力衰减模式识别",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "shape",
  "method": "多指标观测特征＋kNN",
  "methods": [
    "opt"
  ],
  "intro": "压力下降既可能来自泄漏，也可能受温度和流体压缩影响。",
  "concept": "压力下降既可能来自泄漏，也可能受温度和流体压缩影响。先识别形态并保留原曲线比直接给合格判定更可复核。",
  "what": "kNN从合成压力保持曲线的分窗统计学习衰减模式。",
  "why": "压力下降既可能来自泄漏，也可能受温度和流体压缩影响。先识别形态并保留原曲线比直接给合格判定更可复核。",
  "how": "参考曲线建立分窗特征库，目标曲线按真实窗口均值投票，并对照固定主类基线。",
  "data": "独立合成参考与测试记录。输入包括早期压力均值、中期压力均值、末期压力均值、局部变化幅度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是设备压力试验验收，未建模真实温补、容积或安全额定值。 本例为合成教学实验，不直接用于现场操作。",
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
      "name": "末期压力均值",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部变化幅度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "密封响应候选",
      "unit": ""
    }
  ],
  "classes": [
    "慢衰减参考",
    "中衰减参考",
    "快衰减参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括早期压力均值、中期压力均值、末期压力均值、局部变化幅度；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "压力曲线保留衰减形态",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "kNN从合成压力保持曲线的分窗统计学习衰减模式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考曲线建立分窗特征库，目标曲线按真实窗口均值投票，并对照固定主类基线。",
      "effect": "窗口特征与参考票数联动",
      "trap": "不是设备压力试验验收，未建模真实温补、容积或安全额定值。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "压力下降既可能来自泄漏，也可能受温度和流体压缩影响。先识别形态并保留原曲线比直接给合格判定更可复核。",
      "effect": "噪声漂移检验误判",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "压力曲线保留衰减形态",
    "窗口特征与参考票数联动",
    "噪声漂移检验误判"
  ],
  "extension": {
    "key": "seal",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB BluePack RH Pressure Testing",
      "url": "https://www.slb.com/videos/bluepack-rh",
      "note": "仅支持封隔与压力验证的业务背景；不复制设备额定值。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Packer pressure-decay patterns",
    "stage": "Completion",
    "intro": "Pressure decay may reflect leakage, temperature or compressibility. Pattern recognition with the original trace is more reviewable than an automatic pass/fail claim.",
    "concept": "Pressure decay may reflect leakage, temperature or compressibility. Pattern recognition with the original trace is more reviewable than an automatic pass/fail claim.",
    "method": "Multivariable observed features + kNN",
    "what": "kNN learns decay patterns from window statistics of synthetic pressure-hold curves.",
    "why": "Pressure decay may reflect leakage, temperature or compressibility. Pattern recognition with the original trace is more reviewable than an automatic pass/fail claim.",
    "how": "Reference curves form a window-feature bank. Target windows vote by their observed statistics against a fixed-class baseline.",
    "data": "Independent synthetic reference and test records. Inputs include Early pressure mean, Mid pressure mean, Late pressure mean, Local change magnitude. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is not acceptance testing and omits real thermal compensation, volume and pressure ratings. This is a synthetic teaching experiment, not a field operation tool.",
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
        "name": "Local change magnitude",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Seal-response candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Slow-decay reference",
      "Medium-decay reference",
      "Fast-decay reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Early pressure mean, Mid pressure mean, Late pressure mean, Local change magnitude. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Pressure traces preserve decay shape",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "kNN learns decay patterns from window statistics of synthetic pressure-hold curves.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference curves form a window-feature bank. Target windows vote by their observed statistics against a fixed-class baseline.",
        "effect": "Link window features and reference votes",
        "trap": "This is not acceptance testing and omits real thermal compensation, volume and pressure ratings."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Pressure decay may reflect leakage, temperature or compressibility. Pattern recognition with the original trace is more reviewable than an automatic pass/fail claim.",
        "effect": "Noise and shifts probe misclassification",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Pressure traces preserve decay shape",
      "Link window features and reference votes",
      "Noise and shifts probe misclassification"
    ],
    "references": [
      {
        "title": "SLB BluePack RH Pressure Testing",
        "url": "https://www.slb.com/videos/bluepack-rh",
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
