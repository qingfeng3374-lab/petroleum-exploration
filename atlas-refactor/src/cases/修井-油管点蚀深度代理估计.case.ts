import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-tubing-pit",
  "sceneId": "wo3",
  "name": "修井-油管点蚀深度代理估计",
  "title": "油管点蚀深度代理估计",
  "stage": "修井",
  "stageId": "workover",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "cv"
  ],
  "intro": "超声检测依赖传播时间与材料响应，相同回波变化在不同声速条件下含义不同。",
  "concept": "超声检测依赖传播时间与材料响应，相同回波变化在不同声速条件下含义不同。单阈值不足以解释深度。",
  "what": "二次岭回归将回波与温度声速条件映射到合成壁损深度。",
  "why": "超声检测依赖传播时间与材料响应，相同回波变化在不同声速条件下含义不同。单阈值不足以解释深度。",
  "how": "独立参考检测记录拟合二次校正，测试显示深度预测、校准区间和温度交互贡献。",
  "data": "独立合成参考、校准和测试记录。输入包括回波时间差指标、温度偏差、声速辅助指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "没有真实探头标定或声波传播模型，数值不代表毫米壁厚或剩余强度。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "回波时间差指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "温度偏差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "声速辅助指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "壁损深度示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括回波时间差指标、温度偏差、声速辅助指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "回波与材料条件展示输入",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归将回波与温度声速条件映射到合成壁损深度。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "独立参考检测记录拟合二次校正，测试显示深度预测、校准区间和温度交互贡献。",
      "effect": "深度交会图检查代理偏差",
      "trap": "没有真实探头标定或声波传播模型，数值不代表毫米壁厚或剩余强度。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "超声检测依赖传播时间与材料响应，相同回波变化在不同声速条件下含义不同。单阈值不足以解释深度。",
      "effect": "区间约束缺陷定量结论",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "回波与材料条件展示输入",
    "深度交会图检查代理偏差",
    "区间约束缺陷定量结论"
  ],
  "extension": {
    "key": "tubing-pit",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Monitoring Downhole Corrosion",
      "url": "https://www.slb.com/-/media/files/oilfield-review/2-casing-corr-2-english",
      "note": "支持超声等腐蚀检测方式的专业概念；壁损值不是实测厚度。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Tubing-pit depth surrogate",
    "stage": "Workover",
    "intro": "Ultrasonic inspection depends on travel time and material response; identical echo changes differ across sound speeds. One threshold does not explain depth.",
    "concept": "Ultrasonic inspection depends on travel time and material response; identical echo changes differ across sound speeds. One threshold does not explain depth.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression maps echo and temperature/sound-speed conditions to synthetic wall-loss depth.",
    "why": "Ultrasonic inspection depends on travel time and material response; identical echo changes differ across sound speeds. One threshold does not explain depth.",
    "how": "Reference inspections fit quadratic corrections; held-out records show depth estimates, intervals and temperature interactions.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Echo-time contrast, Temperature deviation, Acoustic-speed indicator. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real probe calibration and acoustic propagation are absent; values are not wall-thickness millimeters or residual strength. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Echo-time contrast",
        "unit": ""
      },
      {
        "name": "Temperature deviation",
        "unit": ""
      },
      {
        "name": "Acoustic-speed indicator",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Wall-loss depth illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Echo-time contrast, Temperature deviation, Acoustic-speed indicator. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Echo and material conditions show inputs",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression maps echo and temperature/sound-speed conditions to synthetic wall-loss depth.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Reference inspections fit quadratic corrections; held-out records show depth estimates, intervals and temperature interactions.",
        "effect": "Depth crossplots inspect surrogate error",
        "trap": "Real probe calibration and acoustic propagation are absent; values are not wall-thickness millimeters or residual strength."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Ultrasonic inspection depends on travel time and material response; identical echo changes differ across sound speeds. One threshold does not explain depth.",
        "effect": "Intervals qualify defect quantification",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Echo and material conditions show inputs",
      "Depth crossplots inspect surrogate error",
      "Intervals qualify defect quantification"
    ],
    "references": [
      {
        "title": "SLB Monitoring Downhole Corrosion",
        "url": "https://www.slb.com/-/media/files/oilfield-review/2-casing-corr-2-english",
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
