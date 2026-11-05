import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-m3",
  "sceneId": "m3",
  "name": "录井-荧光图像智能判读",
  "title": "荧光图像智能判读",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "shape",
  "method": "形态特征＋标准化 kNN",
  "methods": [
    "cv"
  ],
  "intro": "目估颜色易受曝光影响；把观测颜色和邻居投票并列才能发现亮度变化带来的不稳定。",
  "concept": "荧光录井通过对岩屑照射紫外光观察发光强度与颜色，判断含油级别与油质，是现场最快的含油性判断手段。",
  "what": "从合成荧光颜色条提取RGB强度与范围，kNN识别三种颜色级别。",
  "why": "目估颜色易受曝光影响；把观测颜色和邻居投票并列才能发现亮度变化带来的不稳定。",
  "how": "只从颜色观测提取特征，参考颜色组训练邻居库，测试曝光变化检验分级稳定性。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：红通道强度、绿通道强度、蓝通道强度、强度范围。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "颜色级别不是API含油等级或油质化验结论；没有紫外相机标定。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "红通道强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "绿通道强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "蓝通道强度",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "强度范围",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "荧光级别候选",
      "unit": ""
    }
  ],
  "classes": [
    "暖色强荧光",
    "绿色荧光",
    "蓝色弱背景"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：红通道强度、绿通道强度、蓝通道强度、强度范围。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "颜色强度条解释荧光特征",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从合成荧光颜色条提取RGB强度与范围，kNN识别三种颜色级别。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "只从颜色观测提取特征，参考颜色组训练邻居库，测试曝光变化检验分级稳定性。",
      "effect": "投票与原颜色联动",
      "trap": "颜色级别不是API含油等级或油质化验结论；没有紫外相机标定。"
    },
    {
      "name": "对照与人工复核",
      "do": "目估颜色易受曝光影响；把观测颜色和邻居投票并列才能发现亮度变化带来的不稳定。",
      "effect": "曝光变化揭示误分",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "颜色强度条解释荧光特征",
    "投票与原颜色联动",
    "曝光变化揭示误分"
  ],
  "english": {
    "title": "Fluorescence image interpretation",
    "stage": "Mud Logging",
    "intro": "Visual color judgments depend on exposure. Showing colors alongside neighbor votes reveals brightness sensitivity.",
    "concept": "UV fluorescence intensity and color help assess oil shows and fluid character in cuttings.",
    "method": "Shape features + standardized kNN",
    "what": "kNN classifies three synthetic fluorescence patterns from observed RGB intensity and range.",
    "why": "Visual color judgments depend on exposure. Showing colors alongside neighbor votes reveals brightness sensitivity.",
    "how": "Extract features from observed colors only, build a reference neighbor bank and test exposure-shift robustness.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Red intensity, Green intensity, Blue intensity, Intensity range. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Color classes are not standardized oil-show grades or laboratory oil-quality results; no UV camera calibration is used. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Red intensity",
        "unit": ""
      },
      {
        "name": "Green intensity",
        "unit": ""
      },
      {
        "name": "Blue intensity",
        "unit": ""
      },
      {
        "name": "Intensity range",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Fluorescence candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Warm fluorescence",
      "Green fluorescence",
      "Blue background"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Red intensity, Green intensity, Blue intensity, Intensity range. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Color-intensity bands explain fluorescence features",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "kNN classifies three synthetic fluorescence patterns from observed RGB intensity and range.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Extract features from observed colors only, build a reference neighbor bank and test exposure-shift robustness.",
        "effect": "Link votes to observed colors",
        "trap": "Color classes are not standardized oil-show grades or laboratory oil-quality results; no UV camera calibration is used."
      },
      {
        "name": "Compare and review",
        "do": "Visual color judgments depend on exposure. Showing colors alongside neighbor votes reveals brightness sensitivity.",
        "effect": "Exposure shifts expose misclassification",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Color-intensity bands explain fluorescence features",
      "Link votes to observed colors",
      "Exposure shifts expose misclassification"
    ]
  }
} satisfies SceneCaseDef;
