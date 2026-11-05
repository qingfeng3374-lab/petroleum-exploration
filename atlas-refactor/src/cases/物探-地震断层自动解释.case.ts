import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-s1",
  "sceneId": "s1",
  "name": "物探-地震断层自动解释",
  "title": "地震断层自动解释",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "raster",
  "method": "像素观测特征＋逻辑回归",
  "methods": [
    "cv"
  ],
  "intro": "反射中断既可能来自断层，也可能来自噪声；联合邻域特征比单暗像素规则更容易复核。",
  "concept": "三维地震数据体是构造解释的基础，解释员要在上千个 inline 剖面上逐条追踪断面，形成断层骨架，再用于构造建模与井位部署。",
  "what": "从合成地震剖面的观测像素提取暗度、邻域对比与梯度，逻辑回归学习断层邻域。",
  "why": "反射中断既可能来自断层，也可能来自噪声；联合邻域特征比单暗像素规则更容易复核。",
  "how": "参考剖面的像素标签训练模型，在不同形态的测试剖面输出分数，调阈值观察漏检与误检。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "二维局部特征只是教学替代，不是3D卷积网络或三维断层面解释。 所有数据为合成教学数据，不能直接作为现场操作依据。",
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
      "name": "断层候选",
      "unit": ""
    }
  ],
  "classes": [
    "背景",
    "断层邻域"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：局部暗度、邻域对比、横向梯度、纵向梯度。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "剖面展示反射错断与干扰",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从合成地震剖面的观测像素提取暗度、邻域对比与梯度，逻辑回归学习断层邻域。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考剖面的像素标签训练模型，在不同形态的测试剖面输出分数，调阈值观察漏检与误检。",
      "effect": "候选掩膜与原像素联动",
      "trap": "二维局部特征只是教学替代，不是3D卷积网络或三维断层面解释。"
    },
    {
      "name": "对照与人工复核",
      "do": "反射中断既可能来自断层，也可能来自噪声；联合邻域特征比单暗像素规则更容易复核。",
      "effect": "错误掩膜检查断层连续性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "剖面展示反射错断与干扰",
    "候选掩膜与原像素联动",
    "错误掩膜检查断层连续性"
  ],
  "english": {
    "title": "Seismic fault interpretation",
    "stage": "Geophysics",
    "intro": "Reflection discontinuities can reflect faults or noise. Joint local features offer a checkable alternative to a darkness threshold.",
    "concept": "Interpreters trace fault surfaces across many sections of a 3D seismic volume to guide structural modeling and well placement.",
    "method": "Observed-pixel features + logistic regression",
    "what": "Logistic regression learns fault neighborhoods from observed intensity, contrast and gradients in a synthetic seismic section.",
    "why": "Reflection discontinuities can reflect faults or noise. Joint local features offer a checkable alternative to a darkness threshold.",
    "how": "Reference pixel labels fit a model applied to a differently shaped test section. Adjust the threshold to inspect misses and false detections.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is a 2D local-feature teaching model, not a 3D convolutional fault-surface interpreter. All observations are synthetic teaching data and must not guide field operations.",
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
        "name": "Fault candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Background",
      "Fault neighborhood"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Darkness, Local contrast, Horizontal gradient, Vertical gradient. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Section shows offset reflectors and interference",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns fault neighborhoods from observed intensity, contrast and gradients in a synthetic seismic section.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference pixel labels fit a model applied to a differently shaped test section. Adjust the threshold to inspect misses and false detections.",
        "effect": "Link candidate masks to observed pixels",
        "trap": "This is a 2D local-feature teaching model, not a 3D convolutional fault-surface interpreter."
      },
      {
        "name": "Compare and review",
        "do": "Reflection discontinuities can reflect faults or noise. Joint local features offer a checkable alternative to a darkness threshold.",
        "effect": "Inspect fault continuity with error masks",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Section shows offset reflectors and interference",
      "Link candidate masks to observed pixels",
      "Inspect fault continuity with error masks"
    ]
  }
} satisfies SceneCaseDef;
