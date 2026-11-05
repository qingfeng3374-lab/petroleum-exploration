import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-w1",
  "sceneId": "w1",
  "name": "测井-测井曲线智能分层",
  "title": "测井曲线智能分层",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "boundary",
  "method": "多尺度窗口特征＋逻辑回归界面检测",
  "methods": [
    "ts"
  ],
  "intro": "经典最优分段依赖平稳层假设；学习已标注界面的窗口模式提供另一种可比较的候选来源。",
  "concept": "测井曲线是井筒内连续测量的岩石物理响应。分层（卡层界面）是把一条连续曲线切成地质单元的第一步，后续的储层解释、射孔选段、压裂分段都以这套界面为底图。",
  "what": "从独立参考测井曲线的界面标注训练多尺度逻辑回归分类器。",
  "why": "经典最优分段依赖平稳层假设；学习已标注界面的窗口模式提供另一种可比较的候选来源。",
  "how": "提取左右多尺度均值差与斜率，参考井学习权重，测试井显示分数与界面邻域；保留原动态规划案例。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：短窗均值差、长窗均值差、相邻跳变、局部斜率。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "候选邻域不是精确地层界面，也不包含区域层序约束，仍需人工复核。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "短窗均值差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "长窗均值差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "相邻跳变",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部斜率",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "层界邻域",
      "unit": ""
    }
  ],
  "classes": [
    "层内",
    "界面候选"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：短窗均值差、长窗均值差、相邻跳变、局部斜率。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "曲线与界面分数共同显示",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从独立参考测井曲线的界面标注训练多尺度逻辑回归分类器。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "提取左右多尺度均值差与斜率，参考井学习权重，测试井显示分数与界面邻域；保留原动态规划案例。",
      "effect": "实际权重解释多尺度作用",
      "trap": "候选邻域不是精确地层界面，也不包含区域层序约束，仍需人工复核。"
    },
    {
      "name": "对照与人工复核",
      "do": "经典最优分段依赖平稳层假设；学习已标注界面的窗口模式提供另一种可比较的候选来源。",
      "effect": "同场景保留经典DP对照",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "曲线与界面分数共同显示",
    "实际权重解释多尺度作用",
    "同场景保留经典DP对照"
  ],
  "english": {
    "title": "Well-log segmentation",
    "stage": "Well Logging",
    "intro": "Classical segmentation assumes stable intervals. Learning labeled boundary-window patterns provides another comparable source of candidates.",
    "concept": "Continuous petrophysical curves are divided into geological units used in reservoir interpretation and interval design.",
    "method": "Multiscale windows + logistic boundary detection",
    "what": "A multiscale logistic classifier learns from boundary labels on an independent reference log.",
    "why": "Classical segmentation assumes stable intervals. Learning labeled boundary-window patterns provides another comparable source of candidates.",
    "how": "Extract multiscale contrasts and slope, fit on a reference well and show scores and boundary neighborhoods on a test well, retaining the original DP case.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Short-window contrast, Long-window contrast, Adjacent jump, Local slope. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Candidate neighborhoods are not exact formation boundaries and omit regional ordering constraints; expert review remains necessary. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Short-window contrast",
        "unit": ""
      },
      {
        "name": "Long-window contrast",
        "unit": ""
      },
      {
        "name": "Adjacent jump",
        "unit": ""
      },
      {
        "name": "Local slope",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Boundary neighborhood",
        "unit": ""
      }
    ],
    "classes": [
      "Within layer",
      "Boundary candidate"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Short-window contrast, Long-window contrast, Adjacent jump, Local slope. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Display logs together with boundary scores",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A multiscale logistic classifier learns from boundary labels on an independent reference log.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Extract multiscale contrasts and slope, fit on a reference well and show scores and boundary neighborhoods on a test well, retaining the original DP case.",
        "effect": "Fitted weights explain multiscale effects",
        "trap": "Candidate neighborhoods are not exact formation boundaries and omit regional ordering constraints; expert review remains necessary."
      },
      {
        "name": "Compare and review",
        "do": "Classical segmentation assumes stable intervals. Learning labeled boundary-window patterns provides another comparable source of candidates.",
        "effect": "Retain classical DP as a same-scene alternative",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Display logs together with boundary scores",
      "Fitted weights explain multiscale effects",
      "Retain classical DP as a same-scene alternative"
    ]
  }
} satisfies SceneCaseDef;
