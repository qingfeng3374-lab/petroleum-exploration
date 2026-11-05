import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "mudlogging-ai",
  "sceneId": "m1",
  "name": "录井-岩屑特征智能分类",
  "engine": "chapter",
  "kind": "classification",
  "task": "mudlogging",
  "methods": [
    "cv"
  ],
  "features": [
    {
      "name": "颜色比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "纹理反差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "颗粒尺度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [
    "砂质岩屑",
    "泥质岩屑",
    "碳酸盐岩屑"
  ],
  "stage": "录井",
  "title": "岩屑特征智能分类",
  "method": "kNN · 标准化特征近邻投票",
  "intro": "岩屑颜色与纹理存在重叠，单看一种颜色可能混淆岩性，需要结合更多观测。",
  "what": "kNN 组合颜色比、纹理反差和颗粒尺度，用标注岩屑的近邻投票判断新样本类别。",
  "why": "多种特征互相补充。近邻把可查的参考经验用于新样本，不必把相似颜色都归为一类。投票分歧也能提示需要复核的样本。",
  "how": "用参考数据标准化量纲，计算测试样本到训练样本的欧氏距离，选 k 个近邻计票，并与单颜色规则对照。",
  "concept": "岩屑可能混杂并有返回滞后。本例是合成特征向量，不宣称读取真实照片。",
  "data": "三类参考岩屑与独立测试岩屑的合成观测。",
  "limit": "没有真实照片识别和颜色标定，投票比例不是经过校准的地质概率。",
  "visuals": [
    "特征散点展示类别重叠。",
    "预测、基线与真值条带对齐。",
    "近邻投票或权重贡献解释单个候选。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "三类参考岩屑与独立测试岩屑的合成观测。",
      "effect": "特征散点展示类别重叠。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "用参考数据标准化量纲，计算测试样本到训练样本的欧氏距离，选 k 个近邻计票，并与单颜色规则对照。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "没有真实照片识别和颜色标定，投票比例不是经过校准的地质概率。"
    },
    {
      "name": "应用于新观测",
      "do": "kNN 组合颜色比、纹理反差和颗粒尺度，用标注岩屑的近邻投票判断新样本类别。",
      "effect": "预测、基线与真值条带对齐。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "多种特征互相补充。近邻把可查的参考经验用于新样本，不必把相似颜色都归为一类。投票分歧也能提示需要复核的样本。",
      "effect": "近邻投票或权重贡献解释单个候选。",
      "trap": "没有真实照片识别和颜色标定，投票比例不是经过校准的地质概率。"
    }
  ],
  "english": {
    "stage": "Mud logging",
    "title": "Cuttings-feature classification",
    "method": "kNN · standardized feature voting",
    "intro": "Cuttings have overlapping colours and textures, requiring complementary observations.",
    "what": "kNN combines colour, texture and grain-size indicators; labelled neighbours vote on new samples.",
    "why": "Complementary features reuse inspectable references rather than treating similar colours as one rock type. Split votes identify samples needing review.",
    "how": "References standardize features. Euclidean distances select k neighbours whose votes are compared with a colour-only rule.",
    "concept": "Cuttings can be mixed and delayed. Inputs are synthetic feature vectors, not real-photo measurements.",
    "data": "Synthetic observations of three labelled reference and independent test classes.",
    "limit": "No photo recognition or colour calibration is provided. Vote fractions are not calibrated geological probabilities.",
    "features": [
      {
        "name": "Colour ratio"
      },
      {
        "name": "Texture contrast"
      },
      {
        "name": "Grain-size index"
      }
    ],
    "classes": [
      "Sandy cuttings",
      "Muddy cuttings",
      "Carbonate cuttings"
    ],
    "visuals": [
      "Feature scatter reveals overlapping classes.",
      "Model, baseline and truth strips are aligned.",
      "Neighbour votes or weight contributions explain a candidate."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Synthetic observations of three labelled reference and independent test classes.",
        "effect": "Feature scatter reveals overlapping classes.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References standardize features. Euclidean distances select k neighbours whose votes are compared with a colour-only rule.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "No photo recognition or colour calibration is provided. Vote fractions are not calibrated geological probabilities."
      },
      {
        "name": "Apply to new observations",
        "do": "kNN combines colour, texture and grain-size indicators; labelled neighbours vote on new samples.",
        "effect": "Model, baseline and truth strips are aligned.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Complementary features reuse inspectable references rather than treating similar colours as one rock type. Split votes identify samples needing review.",
        "effect": "Neighbour votes or weight contributions explain a candidate.",
        "trap": "No photo recognition or colour calibration is provided. Vote fractions are not calibrated geological probabilities."
      }
    ]
  }
} satisfies ChapterCaseDef;
