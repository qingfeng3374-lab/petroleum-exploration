import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-w3",
  "sceneId": "w3",
  "name": "测井-成像测井裂缝识别",
  "title": "成像测井裂缝识别",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "raster",
  "method": "像素观测特征＋逻辑回归",
  "methods": [
    "cv"
  ],
  "intro": "展开图中的正弦迹线容易与层理和噪声混淆；像素分数与错误图让人工判断连通性。",
  "concept": "电成像与声成像测井把井壁展开成图像，裂缝、孔洞、层理在图像上表现为特定形态，是裂缝型储层评价的主要依据。",
  "what": "对展开井壁图像提取观测像素特征，逻辑回归学习暗色裂缝邻域。",
  "why": "展开图中的正弦迹线容易与层理和噪声混淆；像素分数与错误图让人工判断连通性。",
  "how": "参考井壁图训练局部分类器，在另一相位的目标图输出掩膜，点击像素查看观测与logit贡献。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "不反演倾角、开度或裂缝成因，没有真实电成像仪响应。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "局部暗度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "邻域对比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "横向梯度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "纵向梯度",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "裂缝像素候选",
      "unit": ""
    }
  ],
  "classes": [
    "背景",
    "裂缝邻域"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "井壁展开图解释裂缝迹线",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "对展开井壁图像提取观测像素特征，逻辑回归学习暗色裂缝邻域。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考井壁图训练局部分类器，在另一相位的目标图输出掩膜，点击像素查看观测与logit贡献。",
      "effect": "分数掩膜与像素贡献联动",
      "trap": "不反演倾角、开度或裂缝成因，没有真实电成像仪响应。"
    },
    {
      "name": "对照与人工复核",
      "do": "展开图中的正弦迹线容易与层理和噪声混淆；像素分数与错误图让人工判断连通性。",
      "effect": "误差图揭示断裂和假缝",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "井壁展开图解释裂缝迹线",
    "分数掩膜与像素贡献联动",
    "误差图揭示断裂和假缝"
  ],
  "english": {
    "title": "Fractures in borehole images",
    "stage": "Well Logging",
    "intro": "Sinusoidal traces can be confused with bedding and noise; pixel scores and error maps help review connectivity.",
    "concept": "Electrical and acoustic images show wall textures, fractures, vugs and bedding.",
    "method": "Observed-pixel features + logistic regression",
    "what": "Logistic regression learns dark fracture neighborhoods from observed pixels of an unwrapped borehole image.",
    "why": "Sinusoidal traces can be confused with bedding and noise; pixel scores and error maps help review connectivity.",
    "how": "A reference borehole image trains a local classifier. Infer a mask on a shifted-phase image and inspect pixel observations and logit contributions.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No dip, aperture or fracture origin is inverted; real electrical-imager response is absent. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Darkness",
        "unit": ""
      },
      {
        "name": "Local contrast",
        "unit": ""
      },
      {
        "name": "Horizontal gradient",
        "unit": ""
      },
      {
        "name": "Vertical gradient",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fracture-pixel candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Background",
      "Fracture neighborhood"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Unwrapped images explain fracture traces",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns dark fracture neighborhoods from observed pixels of an unwrapped borehole image.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "A reference borehole image trains a local classifier. Infer a mask on a shifted-phase image and inspect pixel observations and logit contributions.",
        "effect": "Link masks to pixel contributions",
        "trap": "No dip, aperture or fracture origin is inverted; real electrical-imager response is absent."
      },
      {
        "name": "Compare and review",
        "do": "Sinusoidal traces can be confused with bedding and noise; pixel scores and error maps help review connectivity.",
        "effect": "Error maps reveal gaps and spurious fractures",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Unwrapped images explain fracture traces",
      "Link masks to pixel contributions",
      "Error maps reveal gaps and spurious fractures"
    ]
  }
} satisfies SceneCaseDef;
