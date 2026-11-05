import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-shot-acoustic",
  "sceneId": "p4",
  "name": "射孔-射孔声学瞬态模式识别",
  "title": "射孔声学瞬态模式识别",
  "stage": "射孔",
  "stageId": "perforation",
  "engine": "scene",
  "family": "shape",
  "method": "离散傅里叶频带特征＋kNN",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "单次峰值容易受到背景噪声干扰，谱形和时间窗口共同提供复核证据。",
  "concept": "单次峰值容易受到背景噪声干扰，谱形和时间窗口共同提供复核证据。弱瞬态也不必然代表射孔失败。",
  "what": "对合成声学窗口计算DFT功率和峰值特征，kNN识别三种瞬态模式。",
  "why": "单次峰值容易受到背景噪声干扰，谱形和时间窗口共同提供复核证据。弱瞬态也不必然代表射孔失败。",
  "how": "先从目标窗口实际计算频带和峰值比例，再检索相似参考；原波形、功率谱与票数同步显示。",
  "data": "独立合成参考与测试记录。输入包括低频功率比例、中频功率比例、高频功率比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "采样和声学响应均为合成，不确认射孔发射、弹量或井下作业结果。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "低频功率比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中频功率比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "高频功率比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "峰值均方根比",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "声学模式候选",
      "unit": ""
    }
  ],
  "classes": [
    "强瞬态参考",
    "弱瞬态参考",
    "背景参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括低频功率比例、中频功率比例、高频功率比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "声学窗口保留瞬态证据",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "对合成声学窗口计算DFT功率和峰值特征，kNN识别三种瞬态模式。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "先从目标窗口实际计算频带和峰值比例，再检索相似参考；原波形、功率谱与票数同步显示。",
      "effect": "功率谱解释频带分布",
      "trap": "采样和声学响应均为合成，不确认射孔发射、弹量或井下作业结果。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "单次峰值容易受到背景噪声干扰，谱形和时间窗口共同提供复核证据。弱瞬态也不必然代表射孔失败。",
      "effect": "近邻和错误对照弱事件歧义",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "声学窗口保留瞬态证据",
    "功率谱解释频带分布",
    "近邻和错误对照弱事件歧义"
  ],
  "extension": {
    "key": "shot-acoustic",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB Perforating",
      "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/completions/well-completions/perforating",
      "note": "支持射孔设计和监测背景；本例为小规模教学近似。"
    },
    {
      "title": "SciPy Discrete Fourier Transforms",
      "url": "https://docs.scipy.org/doc/scipy/tutorial/fft.html",
      "note": "方法依据：离散傅里叶频谱；演示直接计算小窗口DFT，不声称使用快速FFT。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Perforation acoustic-transient recognition",
    "stage": "Perforation",
    "intro": "One peak is vulnerable to background noise; spectrum and waveform jointly support review. A weak transient does not necessarily mean perforation failure.",
    "concept": "One peak is vulnerable to background noise; spectrum and waveform jointly support review. A weak transient does not necessarily mean perforation failure.",
    "method": "Discrete Fourier band features + kNN",
    "what": "Compute DFT power and crest features from synthetic acoustic windows; kNN recognizes three transient patterns.",
    "why": "One peak is vulnerable to background noise; spectrum and waveform jointly support review. A weak transient does not necessarily mean perforation failure.",
    "how": "Compute target band and crest ratios before reference retrieval; display original waveforms, power spectra and votes together.",
    "data": "Independent synthetic reference and test records. Inputs include Low-band power, Mid-band power, High-band power, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Sampling and acoustic responses are synthetic and do not verify firing, charge count or downhole results. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Low-band power",
        "unit": ""
      },
      {
        "name": "Mid-band power",
        "unit": ""
      },
      {
        "name": "High-band power",
        "unit": ""
      },
      {
        "name": "Crest-to-RMS ratio",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Acoustic-pattern candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Strong-transient reference",
      "Weak-transient reference",
      "Background reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Low-band power, Mid-band power, High-band power, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Acoustic windows preserve transient evidence",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Compute DFT power and crest features from synthetic acoustic windows; kNN recognizes three transient patterns.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Compute target band and crest ratios before reference retrieval; display original waveforms, power spectra and votes together.",
        "effect": "Power spectra explain band distribution",
        "trap": "Sampling and acoustic responses are synthetic and do not verify firing, charge count or downhole results."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "One peak is vulnerable to background noise; spectrum and waveform jointly support review. A weak transient does not necessarily mean perforation failure.",
        "effect": "Neighbors and errors reveal weak-event ambiguity",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Acoustic windows preserve transient evidence",
      "Power spectra explain band distribution",
      "Neighbors and errors reveal weak-event ambiguity"
    ],
    "references": [
      {
        "title": "SLB Perforating",
        "url": "https://www.slb.com/products-and-services/innovating-in-oil-and-gas/completions/well-completions/perforating",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "SciPy Discrete Fourier Transforms",
        "url": "https://docs.scipy.org/doc/scipy/tutorial/fft.html",
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
