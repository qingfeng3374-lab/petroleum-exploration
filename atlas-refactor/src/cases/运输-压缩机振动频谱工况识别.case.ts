import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-compressor",
  "sceneId": "t3",
  "name": "运输-压缩机振动频谱工况识别",
  "title": "压缩机振动频谱工况识别",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "shape",
  "method": "离散傅里叶频带特征＋kNN",
  "methods": [
    "opt"
  ],
  "intro": "压缩机振动不仅表现为峰值变化，主频和频带能量也提供工况线索。",
  "concept": "压缩机振动不仅表现为峰值变化，主频和频带能量也提供工况线索。类似谱形仍可能对应不同机械原因。",
  "what": "小窗口DFT提取振动频带能量，kNN学习三种合成谱形。",
  "why": "压缩机振动不仅表现为峰值变化，主频和频带能量也提供工况线索。类似谱形仍可能对应不同机械原因。",
  "how": "从64点观测窗口计算实际功率谱，参考窗口训练近邻，当前波形和谱图与投票同步。",
  "data": "独立合成参考与测试记录。输入包括低频功率比例、中频功率比例、高频功率比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "频率为示意频点，不确认真实喘振或碰摩，没有机组转速和探头校准。 本例为合成教学实验，不直接用于现场操作。",
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
      "name": "振动候选",
      "unit": ""
    }
  ],
  "classes": [
    "常规参考",
    "低频摆动参考",
    "高频参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括低频功率比例、中频功率比例、高频功率比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "时域波形保留原始观测",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "小窗口DFT提取振动频带能量，kNN学习三种合成谱形。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "从64点观测窗口计算实际功率谱，参考窗口训练近邻，当前波形和谱图与投票同步。",
      "effect": "功率谱揭示主频差异",
      "trap": "频率为示意频点，不确认真实喘振或碰摩，没有机组转速和探头校准。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "压缩机振动不仅表现为峰值变化，主频和频带能量也提供工况线索。类似谱形仍可能对应不同机械原因。",
      "effect": "噪声和近邻解释诊断不确定性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "时域波形保留原始观测",
    "功率谱揭示主频差异",
    "噪声和近邻解释诊断不确定性"
  ],
  "extension": {
    "key": "compressor",
    "task": "waveform"
  },
  "references": [
    {
      "title": "Baker Hughes Compressor Vibration Case",
      "url": "https://dam.bakerhughes.com/m/39739ab6ba6a9442/original/Q1-2022-Orbit-Article-Nitric-Acid-Article.pdf",
      "note": "支持振动频谱与喘振监测背景，示例不复制实测频谱或故障结论。"
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
    "title": "Compressor vibration-spectrum recognition",
    "stage": "Transportation",
    "intro": "Compressor vibration changes involve dominant frequency and band energy as well as peaks. Similar spectra can still have different mechanical causes.",
    "concept": "Compressor vibration changes involve dominant frequency and band energy as well as peaks. Similar spectra can still have different mechanical causes.",
    "method": "Discrete Fourier band features + kNN",
    "what": "A small-window DFT extracts vibration-band energies; kNN learns three synthetic spectrum patterns.",
    "why": "Compressor vibration changes involve dominant frequency and band energy as well as peaks. Similar spectra can still have different mechanical causes.",
    "how": "Compute actual power spectra from 64-sample windows, fit reference neighbors and link waveforms, spectra and votes.",
    "data": "Independent synthetic reference and test records. Inputs include Low-band power, Mid-band power, High-band power, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Frequencies are illustrative bins and do not confirm real surge or rubbing; rotor-speed and probe calibration are absent. This is a synthetic teaching experiment, not a field operation tool.",
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
        "name": "Vibration candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Regular reference",
      "Low-frequency reference",
      "High-frequency reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Low-band power, Mid-band power, High-band power, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Time-domain waveforms preserve observations",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "A small-window DFT extracts vibration-band energies; kNN learns three synthetic spectrum patterns.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Compute actual power spectra from 64-sample windows, fit reference neighbors and link waveforms, spectra and votes.",
        "effect": "Power spectra reveal dominant-frequency differences",
        "trap": "Frequencies are illustrative bins and do not confirm real surge or rubbing; rotor-speed and probe calibration are absent."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Compressor vibration changes involve dominant frequency and band energy as well as peaks. Similar spectra can still have different mechanical causes.",
        "effect": "Noise and neighbors explain diagnostic uncertainty",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Time-domain waveforms preserve observations",
      "Power spectra reveal dominant-frequency differences",
      "Noise and neighbors explain diagnostic uncertainty"
    ],
    "references": [
      {
        "title": "Baker Hughes Compressor Vibration Case",
        "url": "https://dam.bakerhughes.com/m/39739ab6ba6a9442/original/Q1-2022-Orbit-Article-Nitric-Acid-Article.pdf",
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
