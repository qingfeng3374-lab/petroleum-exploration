import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "firstbreak-ai",
  "sceneId": "s3",
  "name": "物探-初至波智能拾取",
  "engine": "chapter",
  "kind": "firstbreak",
  "task": "firstbreak",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "短窗能量",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "振幅变化",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "短长窗能量比",
      "unit": "",
      "range": [
        0,
        8
      ]
    }
  ],
  "classes": [
    "初至前",
    "初至后"
  ],
  "stage": "物探",
  "title": "初至波智能拾取",
  "method": "逻辑回归 · 波形窗口分类",
  "intro": "人工逐道寻找有效波的最早到达，噪声尖峰容易被误认成初至。本例把波形窗口变成可学习的分类问题。",
  "what": "逻辑回归组合短窗能量、振幅变化和能量比，计算窗口属于初至后信号的分数。",
  "why": "一个能量阈值难以兼顾尖峰和弱信号。参考标注让模型学习组合证据，再通过连续三点触发形成拾取，与 STA/LTA 基线比较误差。",
  "how": "参考道拟合标准化和交叉熵权重，新道只从观测波形提取特征；分数越过阈值才生成候选，标签只用于最后计算初至误差。",
  "concept": "波到达会改变局部能量与波形，大振幅本身不是有效初至的充分证据。",
  "data": "独立合成参考道与测试道，保留采样顺序。",
  "limit": "不是完整 SEG-Y 或静校正系统；强相干噪声仍可能被误拾取。",
  "visuals": [
    "波形与模型分数沿同一采样点对齐。",
    "损失曲线记录实际拟合。",
    "模型与基线的拾取误差检验收益。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "独立合成参考道与测试道，保留采样顺序。",
      "effect": "波形与模型分数沿同一采样点对齐。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "参考道拟合标准化和交叉熵权重，新道只从观测波形提取特征；分数越过阈值才生成候选，标签只用于最后计算初至误差。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不是完整 SEG-Y 或静校正系统；强相干噪声仍可能被误拾取。"
    },
    {
      "name": "应用于新观测",
      "do": "逻辑回归组合短窗能量、振幅变化和能量比，计算窗口属于初至后信号的分数。",
      "effect": "损失曲线记录实际拟合。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "一个能量阈值难以兼顾尖峰和弱信号。参考标注让模型学习组合证据，再通过连续三点触发形成拾取，与 STA/LTA 基线比较误差。",
      "effect": "模型与基线的拾取误差检验收益。",
      "trap": "不是完整 SEG-Y 或静校正系统；强相干噪声仍可能被误拾取。"
    }
  ],
  "english": {
    "stage": "Geophysics",
    "title": "Learning to pick first arrivals",
    "method": "Logistic regression · waveform-window classification",
    "intro": "Manual picking finds the first useful arrival, but noise spikes can look like arrivals. This experiment learns to classify waveform windows.",
    "what": "Logistic regression combines short-window energy, amplitude changes and energy ratios to score post-arrival windows.",
    "why": "One threshold struggles with spikes and weak signals. Labelled references teach combined evidence; a three-point trigger forms picks, evaluated against STA/LTA.",
    "how": "References fit scaling and cross-entropy weights. New traces use observed waveform features only; thresholded scores produce picks, and labels evaluate error afterwards.",
    "concept": "Arrivals change local energy and waveforms; high amplitude alone does not prove a first arrival.",
    "data": "Independent synthetic reference and test traces retain sample order.",
    "limit": "This is not a SEG-Y or statics system. Coherent noise can still produce false picks.",
    "features": [
      {
        "name": "Short-window energy"
      },
      {
        "name": "Amplitude change"
      },
      {
        "name": "STA/LTA ratio"
      }
    ],
    "classes": [
      "Before arrival",
      "After arrival"
    ],
    "visuals": [
      "Waveforms and model scores align at the same samples.",
      "The loss curve records actual training.",
      "Model and baseline picking errors test the benefit."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Independent synthetic reference and test traces retain sample order.",
        "effect": "Waveforms and model scores align at the same samples.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References fit scaling and cross-entropy weights. New traces use observed waveform features only; thresholded scores produce picks, and labels evaluate error afterwards.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "This is not a SEG-Y or statics system. Coherent noise can still produce false picks."
      },
      {
        "name": "Apply to new observations",
        "do": "Logistic regression combines short-window energy, amplitude changes and energy ratios to score post-arrival windows.",
        "effect": "The loss curve records actual training.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "One threshold struggles with spikes and weak signals. Labelled references teach combined evidence; a three-point trigger forms picks, evaluated against STA/LTA.",
        "effect": "Model and baseline picking errors test the benefit.",
        "trap": "This is not a SEG-Y or statics system. Coherent noise can still produce false picks."
      }
    ]
  }
} satisfies ChapterCaseDef;
