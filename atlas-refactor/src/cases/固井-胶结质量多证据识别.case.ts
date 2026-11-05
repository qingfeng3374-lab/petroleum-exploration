import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "cementing-ai",
  "sceneId": "c1",
  "name": "固井-胶结质量多证据识别",
  "engine": "chapter",
  "kind": "classification",
  "task": "cementing",
  "methods": [
    "cv",
    "ts"
  ],
  "features": [
    {
      "name": "套管波幅指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "波形相干指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "自由套管相似度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [
    "胶结较好",
    "胶结较弱"
  ],
  "stage": "固井",
  "title": "胶结质量多证据识别",
  "method": "逻辑回归 · 胶结响应分类",
  "intro": "胶结评价需要综合声学响应，单一波幅可能受环境与微环隙影响。",
  "what": "逻辑回归融合三项声学指标，计算胶结较弱的模型分数供优先复核。",
  "why": "单阈值不易涵盖全部响应。参考标注可以教会模型组合证据，逐项 logit 贡献说明某个指标如何改变分数。",
  "how": "参考样本拟合标准化和交叉熵权重，sigmoid 输出分数。按可调阈值生成候选，再与单波幅规则及独立标签比较。",
  "concept": "胶结和自由套管的声波衰减不同，本例只示意特征，不代替完整 CBL/VDL 解释。",
  "data": "独立合成声学指标和胶结标签，不代表真实井段质量。",
  "limit": "未完整建模方位窜槽或微环隙，模型分数不是现场校准的失效概率。",
  "visuals": [
    "特征散点展示类别重叠。",
    "预测、基线与真值条带对齐。",
    "近邻投票或权重贡献解释单个候选。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "独立合成声学指标和胶结标签，不代表真实井段质量。",
      "effect": "特征散点展示类别重叠。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "参考样本拟合标准化和交叉熵权重，sigmoid 输出分数。按可调阈值生成候选，再与单波幅规则及独立标签比较。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "未完整建模方位窜槽或微环隙，模型分数不是现场校准的失效概率。"
    },
    {
      "name": "应用于新观测",
      "do": "逻辑回归融合三项声学指标，计算胶结较弱的模型分数供优先复核。",
      "effect": "预测、基线与真值条带对齐。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "单阈值不易涵盖全部响应。参考标注可以教会模型组合证据，逐项 logit 贡献说明某个指标如何改变分数。",
      "effect": "近邻投票或权重贡献解释单个候选。",
      "trap": "未完整建模方位窜槽或微环隙，模型分数不是现场校准的失效概率。"
    }
  ],
  "english": {
    "stage": "Cementing",
    "title": "Multi-signal cement-bond assessment",
    "method": "Logistic regression · bond-response classification",
    "intro": "Cement-bond assessment combines acoustic responses; one amplitude can be affected by the environment and microannuli.",
    "what": "Logistic regression combines three acoustic indicators to score potentially weaker bonding for review.",
    "why": "One threshold cannot describe every response. Labelled references teach evidence combinations, while logit contributions explain score changes.",
    "how": "References fit scaling and cross-entropy weights. Sigmoid scores pass an adjustable threshold and are compared with an amplitude rule and held-out labels.",
    "concept": "Bonded and free casing have different attenuation. Synthetic features do not replace complete CBL/VDL interpretation.",
    "data": "Independent synthetic acoustic indicators and bond labels do not establish real interval quality.",
    "limit": "Azimuthal channels and complete microannulus effects are omitted. Scores are not calibrated failure probabilities.",
    "features": [
      {
        "name": "Casing-wave amplitude"
      },
      {
        "name": "Waveform coherence"
      },
      {
        "name": "Free-pipe similarity"
      }
    ],
    "classes": [
      "Better bond",
      "Weaker bond"
    ],
    "visuals": [
      "Feature scatter reveals overlapping classes.",
      "Model, baseline and truth strips are aligned.",
      "Neighbour votes or weight contributions explain a candidate."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Independent synthetic acoustic indicators and bond labels do not establish real interval quality.",
        "effect": "Feature scatter reveals overlapping classes.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References fit scaling and cross-entropy weights. Sigmoid scores pass an adjustable threshold and are compared with an amplitude rule and held-out labels.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "Azimuthal channels and complete microannulus effects are omitted. Scores are not calibrated failure probabilities."
      },
      {
        "name": "Apply to new observations",
        "do": "Logistic regression combines three acoustic indicators to score potentially weaker bonding for review.",
        "effect": "Model, baseline and truth strips are aligned.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "One threshold cannot describe every response. Labelled references teach evidence combinations, while logit contributions explain score changes.",
        "effect": "Neighbour votes or weight contributions explain a candidate.",
        "trap": "Azimuthal channels and complete microannulus effects are omitted. Scores are not calibrated failure probabilities."
      }
    ]
  }
} satisfies ChapterCaseDef;
