import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-t5",
  "sceneId": "t5",
  "name": "运输-储罐液位与泄漏智能监控",
  "title": "储罐液位与泄漏智能监控",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "tank",
  "method": "图像液位与湿区特征＋逻辑回归",
  "methods": [
    "cv"
  ],
  "intro": "单台液位计失准和图像曝光变化都可能误导判断，跨传感器差异和底部湿区提供可复核补充。",
  "concept": "储罐液位与罐区安全是油库管理的核心，雷达液位计 + 视频监控是常规配置。",
  "what": "从合成罐区观测像素提取液位与底部湿区特征，融合雷达液位训练逻辑回归。",
  "why": "单台液位计失准和图像曝光变化都可能误导判断，跨传感器差异和底部湿区提供可复核补充。",
  "how": "图像暗区统计生成视觉液位，底部像素生成湿区比例，参考记录训练多源分类并与液位差阈值比较。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：图像液位比例、雷达液位比例、图像雷达差异、底部湿区比例。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "非实际视频检测器，未区分雨水、阴影与油品，报警不等于确认泄漏。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "图像液位比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "雷达液位比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "图像雷达差异",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "底部湿区比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "异常监控候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常交叉校验",
    "疑似失配或渗漏"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：图像液位比例、雷达液位比例、图像雷达差异、底部湿区比例。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "罐区像素显示液位与湿区",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从合成罐区观测像素提取液位与底部湿区特征，融合雷达液位训练逻辑回归。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "图像暗区统计生成视觉液位，底部像素生成湿区比例，参考记录训练多源分类并与液位差阈值比较。",
      "effect": "跨传感器贡献解释报警",
      "trap": "非实际视频检测器，未区分雨水、阴影与油品，报警不等于确认泄漏。"
    },
    {
      "name": "对照与人工复核",
      "do": "单台液位计失准和图像曝光变化都可能误导判断，跨传感器差异和底部湿区提供可复核补充。",
      "effect": "曝光变化检查视觉误报",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "罐区像素显示液位与湿区",
    "跨传感器贡献解释报警",
    "曝光变化检查视觉误报"
  ],
  "english": {
    "title": "Tank level and leak monitoring",
    "stage": "Transportation",
    "intro": "A drifting level sensor or exposure shift can mislead; cross-sensor differences and wet regions provide reviewable corroboration.",
    "concept": "Radar level measurements and video surveillance support tank-farm operations.",
    "method": "Image-level and wet-area features + logistic regression",
    "what": "Extract level and bottom wet-area features from synthetic tank pixels and combine radar level in logistic regression.",
    "why": "A drifting level sensor or exposure shift can mislead; cross-sensor differences and wet regions provide reviewable corroboration.",
    "how": "Dark image regions yield visual level and bottom pixels yield wet-area fraction. Reference records train multisource classification against a level-difference rule.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Visual level, Radar level, Visual-radar difference, Bottom wet-area fraction. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is not a real video detector and does not distinguish rain, shadows and oil; an alarm does not confirm leakage. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Visual level",
        "unit": ""
      },
      {
        "name": "Radar level",
        "unit": ""
      },
      {
        "name": "Visual-radar difference",
        "unit": ""
      },
      {
        "name": "Bottom wet-area fraction",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Monitoring candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal cross-check",
      "Suspected mismatch or leak"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Visual level, Radar level, Visual-radar difference, Bottom wet-area fraction. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Tank pixels show liquid level and wet regions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Extract level and bottom wet-area features from synthetic tank pixels and combine radar level in logistic regression.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Dark image regions yield visual level and bottom pixels yield wet-area fraction. Reference records train multisource classification against a level-difference rule.",
        "effect": "Cross-sensor contributions explain alarms",
        "trap": "This is not a real video detector and does not distinguish rain, shadows and oil; an alarm does not confirm leakage."
      },
      {
        "name": "Compare and review",
        "do": "A drifting level sensor or exposure shift can mislead; cross-sensor differences and wet regions provide reviewable corroboration.",
        "effect": "Exposure shifts inspect visual false alarms",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Tank pixels show liquid level and wet regions",
      "Cross-sensor contributions explain alarms",
      "Exposure shifts inspect visual false alarms"
    ]
  }
} satisfies SceneCaseDef;
