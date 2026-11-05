import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-wo3",
  "sceneId": "wo3",
  "name": "修井-套管损伤智能识别",
  "title": "套管损伤智能识别",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "raster",
  "method": "像素观测特征＋逻辑回归",
  "methods": [
    "cv"
  ],
  "intro": "亮度阴影和真实壁损可能混淆，联合邻域特征并查看错误区域有助于人工复核。",
  "concept": "套管变形、腐蚀、穿孔会破坏井筒完整性，多臂井径与超声成像测井是主要检测手段，解释需逐段判读。",
  "what": "逻辑回归从合成套管展开图的暗度与局部梯度学习腐蚀损伤区域。",
  "why": "亮度阴影和真实壁损可能混淆，联合邻域特征并查看错误区域有助于人工复核。",
  "how": "独立参考图训练像素分类器，目标图改变损伤位置和干扰条件，逐像素显示分数与贡献。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "二维暗区不是实测壁厚，不能据此判定穿孔或套管剩余强度。 所有数据为合成教学数据，不能直接作为现场操作依据。",
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
      "name": "损伤像素候选",
      "unit": ""
    }
  ],
  "classes": [
    "完整背景",
    "损伤候选"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "套管展开图定位损伤",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "逻辑回归从合成套管展开图的暗度与局部梯度学习腐蚀损伤区域。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "独立参考图训练像素分类器，目标图改变损伤位置和干扰条件，逐像素显示分数与贡献。",
      "effect": "像素贡献解释候选区域",
      "trap": "二维暗区不是实测壁厚，不能据此判定穿孔或套管剩余强度。"
    },
    {
      "name": "对照与人工复核",
      "do": "亮度阴影和真实壁损可能混淆，联合邻域特征并查看错误区域有助于人工复核。",
      "effect": "错误掩膜检验阴影误报",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "套管展开图定位损伤",
    "像素贡献解释候选区域",
    "错误掩膜检验阴影误报"
  ],
  "english": {
    "title": "Casing damage detection",
    "stage": "Workover",
    "intro": "Shading can resemble wall loss; local features and error regions help distinguish candidates for review.",
    "concept": "Deformation, corrosion and perforation threaten integrity and are evaluated with caliper or ultrasonic images.",
    "method": "Observed-pixel features + logistic regression",
    "what": "Logistic regression learns corrosion-damage regions from darkness and local gradients of an unwrapped casing image.",
    "why": "Shading can resemble wall loss; local features and error regions help distinguish candidates for review.",
    "how": "Train a pixel classifier on a separate reference image, shift target damage and interference, and inspect pixel scores and contributions.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Dark image regions are not measured wall thickness and cannot certify perforation or residual strength. All observations are synthetic teaching data and must not guide field operations.",
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
        "name": "Damage-pixel candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Intact background",
      "Damage candidate"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Unwrapped casing image locates damage",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns corrosion-damage regions from darkness and local gradients of an unwrapped casing image.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Train a pixel classifier on a separate reference image, shift target damage and interference, and inspect pixel scores and contributions.",
        "effect": "Pixel contributions explain candidate regions",
        "trap": "Dark image regions are not measured wall thickness and cannot certify perforation or residual strength."
      },
      {
        "name": "Compare and review",
        "do": "Shading can resemble wall loss; local features and error regions help distinguish candidates for review.",
        "effect": "Error masks inspect shading false alarms",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Unwrapped casing image locates damage",
      "Pixel contributions explain candidate regions",
      "Error masks inspect shading false alarms"
    ]
  }
} satisfies SceneCaseDef;
