import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-torsion",
  "sceneId": "d4",
  "name": "钻井-钻柱扭振频带工况识别",
  "title": "钻柱扭振频带工况识别",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "shape",
  "method": "离散傅里叶频带特征＋kNN",
  "methods": [
    "ts"
  ],
  "intro": "时间域峰值接近的窗口可能具有不同主频，频谱有助于区分缓慢扭振和高频振动。",
  "concept": "时间域峰值接近的窗口可能具有不同主频，频谱有助于区分缓慢扭振和高频振动。",
  "what": "对64点合成转速窗口直接计算DFT，kNN学习频带能量与峰值形态。",
  "why": "时间域峰值接近的窗口可能具有不同主频，频谱有助于区分缓慢扭振和高频振动。",
  "how": "先去均值再计算半谱功率，从实际频带积分生成特征；参考窗口分类后检查当前波形、功率谱与近邻。",
  "data": "独立合成参考与测试记录。输入包括低频能量比例、中频能量比例、高频能量比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "频率是窗口索引，不是井下仪器Hz；不据此确认钻具失效或给出施工调整量。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "低频能量比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中频能量比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "高频能量比例",
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
      "name": "振动形态候选",
      "unit": ""
    }
  ],
  "classes": [
    "稳定振动",
    "黏滑参考",
    "高频参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括低频能量比例、中频能量比例、高频能量比例、峰值均方根比；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "原波形保留振动时序",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "对64点合成转速窗口直接计算DFT，kNN学习频带能量与峰值形态。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "先去均值再计算半谱功率，从实际频带积分生成特征；参考窗口分类后检查当前波形、功率谱与近邻。",
      "effect": "功率谱揭示频带差异",
      "trap": "频率是窗口索引，不是井下仪器Hz；不据此确认钻具失效或给出施工调整量。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "时间域峰值接近的窗口可能具有不同主频，频谱有助于区分缓慢扭振和高频振动。",
      "effect": "近邻与误差检验诊断稳定性",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "原波形保留振动时序",
    "功率谱揭示频带差异",
    "近邻与误差检验诊断稳定性"
  ],
  "extension": {
    "key": "torsion",
    "task": "waveform"
  },
  "references": [
    {
      "title": "SLB Stick/Slip",
      "url": "https://glossary.slb.com/en/terms/s/stick_and_slip",
      "note": "用于理解钻柱扭振与黏滑；谱形为合成窗口。"
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
    "title": "Drillstring torsional-band recognition",
    "stage": "Drilling",
    "intro": "Windows with similar time-domain peaks can have different dominant frequencies; spectra help distinguish slow torsional oscillation from faster vibration.",
    "concept": "Windows with similar time-domain peaks can have different dominant frequencies; spectra help distinguish slow torsional oscillation from faster vibration.",
    "method": "Discrete Fourier band features + kNN",
    "what": "Compute a direct DFT on 64-sample synthetic speed windows; kNN learns band-energy and crest patterns.",
    "why": "Windows with similar time-domain peaks can have different dominant frequencies; spectra help distinguish slow torsional oscillation from faster vibration.",
    "how": "Demean each window, compute half-spectrum power and integrate actual bands; inspect waveforms, spectra and reference neighbors together.",
    "data": "Independent synthetic reference and test records. Inputs include Low-band energy, Mid-band energy, High-band energy, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Frequency is a window-bin index, not measured downhole Hz; no failure confirmation or drilling adjustments are provided. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Low-band energy",
        "unit": ""
      },
      {
        "name": "Mid-band energy",
        "unit": ""
      },
      {
        "name": "High-band energy",
        "unit": ""
      },
      {
        "name": "Crest-to-RMS ratio",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Vibration-pattern candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Stable reference",
      "Stick-slip reference",
      "High-frequency reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Low-band energy, Mid-band energy, High-band energy, Crest-to-RMS ratio. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Waveforms preserve time-domain vibration",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Compute a direct DFT on 64-sample synthetic speed windows; kNN learns band-energy and crest patterns.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Demean each window, compute half-spectrum power and integrate actual bands; inspect waveforms, spectra and reference neighbors together.",
        "effect": "Power spectra reveal frequency differences",
        "trap": "Frequency is a window-bin index, not measured downhole Hz; no failure confirmation or drilling adjustments are provided."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Windows with similar time-domain peaks can have different dominant frequencies; spectra help distinguish slow torsional oscillation from faster vibration.",
        "effect": "Neighbors and errors assess diagnostic stability",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Waveforms preserve time-domain vibration",
      "Power spectra reveal frequency differences",
      "Neighbors and errors assess diagnostic stability"
    ],
    "references": [
      {
        "title": "SLB Stick/Slip",
        "url": "https://glossary.slb.com/en/terms/s/stick_and_slip",
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
