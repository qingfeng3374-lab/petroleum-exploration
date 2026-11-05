import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-lag-depth",
  "sceneId": "m4",
  "name": "录井-岩屑迟到深度校正估计",
  "title": "岩屑迟到深度校正估计",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "地面捞取的岩屑并不对应当前钻头深度，迟到时间与循环和井深有关。",
  "concept": "地面捞取的岩屑并不对应当前钻头深度，迟到时间与循环和井深有关。错配会把显示放到错误层位。",
  "what": "二次岭回归学习深度、返速和钻进条件到迟到偏移的合成关系。",
  "why": "地面捞取的岩屑并不对应当前钻头深度，迟到时间与循环和井深有关。错配会把显示放到错误层位。",
  "how": "参考循环记录生成迟到偏移并拟合代理；测试用当时可得参数估计偏移，校准区间显示不确定性。",
  "data": "独立合成参考、校准和测试记录。输入包括井深负担、环空返速指标、钻进速度指标、循环效率；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不执行真实环空容积或示踪剂计算，偏移指数不能直接用于井深校正。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "井深负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "环空返速指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "钻进速度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "循环效率",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "迟到深度偏移指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括井深负担、环空返速指标、钻进速度指标、循环效率；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "循环参数解释迟到成因",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归学习深度、返速和钻进条件到迟到偏移的合成关系。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考循环记录生成迟到偏移并拟合代理；测试用当时可得参数估计偏移，校准区间显示不确定性。",
      "effect": "偏移预测与参考值对照",
      "trap": "不执行真实环空容积或示踪剂计算，偏移指数不能直接用于井深校正。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "地面捞取的岩屑并不对应当前钻头深度，迟到时间与循环和井深有关。错配会把显示放到错误层位。",
      "effect": "区间提醒深度对齐风险",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "循环参数解释迟到成因",
    "偏移预测与参考值对照",
    "区间提醒深度对齐风险"
  ],
  "extension": {
    "key": "lag-depth",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Defining Mud Logging",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-mud-logging",
      "note": "支持气测、岩屑与迟到时间的专业概念。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Cuttings lag-depth correction estimate",
    "stage": "Mud Logging",
    "intro": "Surface cuttings do not correspond to the current bit depth; lag depends on circulation and depth. Misalignment can place shows in the wrong interval.",
    "concept": "Surface cuttings do not correspond to the current bit depth; lag depends on circulation and depth. Misalignment can place shows in the wrong interval.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns synthetic lag offsets from depth, return speed and drilling conditions.",
    "why": "Surface cuttings do not correspond to the current bit depth; lag depends on circulation and depth. Misalignment can place shows in the wrong interval.",
    "how": "Generate lag offsets from reference circulation records, fit a surrogate and predict from currently available inputs with calibrated uncertainty.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Depth burden, Annular-return speed, Drilling-speed index, Circulation efficiency. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "No real annular-volume or tracer calculation is performed; the index cannot directly correct field depths. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Depth burden",
        "unit": ""
      },
      {
        "name": "Annular-return speed",
        "unit": ""
      },
      {
        "name": "Drilling-speed index",
        "unit": ""
      },
      {
        "name": "Circulation efficiency",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Lag-depth offset index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Depth burden, Annular-return speed, Drilling-speed index, Circulation efficiency. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Circulation inputs explain lag causes",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression learns synthetic lag offsets from depth, return speed and drilling conditions.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Generate lag offsets from reference circulation records, fit a surrogate and predict from currently available inputs with calibrated uncertainty.",
        "effect": "Compare predicted and reference offsets",
        "trap": "No real annular-volume or tracer calculation is performed; the index cannot directly correct field depths."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Surface cuttings do not correspond to the current bit depth; lag depends on circulation and depth. Misalignment can place shows in the wrong interval.",
        "effect": "Intervals highlight alignment risk",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Circulation inputs explain lag causes",
      "Compare predicted and reference offsets",
      "Intervals highlight alignment risk"
    ],
    "references": [
      {
        "title": "SLB Defining Mud Logging",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-mud-logging",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Ridge Regression",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
