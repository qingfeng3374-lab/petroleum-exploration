import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-s5",
  "sceneId": "s5",
  "name": "物探-地震资料噪声压制",
  "title": "地震资料噪声压制",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "denoise",
  "method": "配对邻域回归去噪",
  "methods": [
    "cv"
  ],
  "intro": "简单均值滤波可能抹平反射同相轴；学习权重可以利用邻域方向信息，但必须检查信号损伤。",
  "concept": "面波、多次波、工业干扰等噪声会掩盖有效反射，去噪是处理流程中最耗人力的环节之一，传统依靠 f-x 反褶积、Radon 变换等方法逐项调参。",
  "what": "学习含噪邻域到干净中心振幅的岭回归滤波系数。",
  "why": "简单均值滤波可能抹平反射同相轴；学习权重可以利用邻域方向信息，但必须检查信号损伤。",
  "how": "参考含噪—干净剖面训练滤波器；目标干净剖面只用于测试，逐像素对照五点均值基线和残差。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：中心振幅、左邻振幅、右邻振幅、上邻振幅、下邻振幅、左二振幅、右二振幅、上二振幅、下二振幅。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "是配对监督线性去噪，不是深度网络；结构化面波分布变化可能导致失败。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "中心振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "左邻振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "右邻振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "上邻振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "下邻振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "左二振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "右二振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "上二振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "下二振幅",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "重建振幅",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：中心振幅、左邻振幅、右邻振幅、上邻振幅、下邻振幅、左二振幅、右二振幅、上二振幅、下二振幅。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "含噪剖面显示反射与噪声",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "学习含噪邻域到干净中心振幅的岭回归滤波系数。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考含噪—干净剖面训练滤波器；目标干净剖面只用于测试，逐像素对照五点均值基线和残差。",
      "effect": "重建剖面查看同相轴保护",
      "trap": "是配对监督线性去噪，不是深度网络；结构化面波分布变化可能导致失败。"
    },
    {
      "name": "对照与人工复核",
      "do": "简单均值滤波可能抹平反射同相轴；学习权重可以利用邻域方向信息，但必须检查信号损伤。",
      "effect": "残差与RMSE检查去噪代价",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "含噪剖面显示反射与噪声",
    "重建剖面查看同相轴保护",
    "残差与RMSE检查去噪代价"
  ],
  "english": {
    "title": "Seismic noise suppression",
    "stage": "Geophysics",
    "intro": "A simple mean filter can blur coherent reflections. Learned weights exploit neighborhood direction while requiring checks for signal damage.",
    "concept": "Surface waves, multiples and industrial noise obscure reflections and require extensive processing.",
    "method": "Paired neighborhood regression denoising",
    "what": "Ridge regression learns filter coefficients mapping noisy neighborhoods to clean center amplitudes.",
    "why": "A simple mean filter can blur coherent reflections. Learned weights exploit neighborhood direction while requiring checks for signal damage.",
    "how": "A reference noisy/clean pair trains the filter. Target clean data is evaluation-only; compare pixelwise with a five-point mean and residuals.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Center, Left, Right, Above, Below, Two left, Two right, Two above, Two below. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is supervised linear denoising, not a deep network; shifted coherent noise may break its assumptions. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Center",
        "unit": ""
      },
      {
        "name": "Left",
        "unit": ""
      },
      {
        "name": "Right",
        "unit": ""
      },
      {
        "name": "Above",
        "unit": ""
      },
      {
        "name": "Below",
        "unit": ""
      },
      {
        "name": "Two left",
        "unit": ""
      },
      {
        "name": "Two right",
        "unit": ""
      },
      {
        "name": "Two above",
        "unit": ""
      },
      {
        "name": "Two below",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Reconstructed amplitude",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Center, Left, Right, Above, Below, Two left, Two right, Two above, Two below. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Noisy section separates reflections from noise",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Ridge regression learns filter coefficients mapping noisy neighborhoods to clean center amplitudes.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "A reference noisy/clean pair trains the filter. Target clean data is evaluation-only; compare pixelwise with a five-point mean and residuals.",
        "effect": "Reconstruction reveals reflector preservation",
        "trap": "This is supervised linear denoising, not a deep network; shifted coherent noise may break its assumptions."
      },
      {
        "name": "Compare and review",
        "do": "A simple mean filter can blur coherent reflections. Learned weights exploit neighborhood direction while requiring checks for signal damage.",
        "effect": "Residuals and RMSE reveal denoising costs",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Noisy section separates reflections from noise",
      "Reconstruction reveals reflector preservation",
      "Residuals and RMSE reveal denoising costs"
    ]
  }
} satisfies SceneCaseDef;
