import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-pig-condition",
  "sceneId": "t2",
  "name": "运输-清管候选工况稳健筛查",
  "title": "清管候选工况稳健筛查",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常背景中位数/MAD稳健检测",
  "methods": [
    "cv",
    "ts"
  ],
  "intro": "压差变化也可能来自流量或温度改变，维护不宜只按固定日历周期。",
  "concept": "压差变化也可能来自流量或温度改变，维护不宜只按固定日历周期。多指标偏离需要人工结合工况解释。",
  "what": "正常参考工况的中位数和MAD形成多指标异常评分，筛查可能需要清管复核的区间。",
  "why": "压差变化也可能来自流量或温度改变，维护不宜只按固定日历周期。多指标偏离需要人工结合工况解释。",
  "how": "参考分位数设阈值，测试注入合成沉积负担并显示各通道残差；污染预设改变正常背景。",
  "data": "独立合成参考与测试记录。输入包括压差增长指标、流量偏离、沉积负担、温度条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是清管日期优化器或真实结蜡厚度模型，异常也不直接证明堵塞。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "压差增长指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流量偏离",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "沉积负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "温度条件",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "清管复核候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常参考",
    "需复核工况"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括压差增长指标、流量偏离、沉积负担、温度条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "多通道轨迹展示维护线索",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "正常参考工况的中位数和MAD形成多指标异常评分，筛查可能需要清管复核的区间。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考分位数设阈值，测试注入合成沉积负担并显示各通道残差；污染预设改变正常背景。",
      "effect": "稳健残差解释偏离来源",
      "trap": "不是清管日期优化器或真实结蜡厚度模型，异常也不直接证明堵塞。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "压差变化也可能来自流量或温度改变，维护不宜只按固定日历周期。多指标偏离需要人工结合工况解释。",
      "effect": "参考污染检验过度报警",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "多通道轨迹展示维护线索",
    "稳健残差解释偏离来源",
    "参考污染检验过度报警"
  ],
  "extension": {
    "key": "pig-condition",
    "task": "robust"
  },
  "references": [
    {
      "title": "SLB Pipeline Pigging",
      "url": "https://www.slb.com/resource-library/article/valve-insights/how-it-works-pipeline-pigging",
      "note": "支持清管与管线维护背景，不能据此确定清管周期。"
    },
    {
      "title": "NIST Median Absolute Deviation",
      "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/mad.htm",
      "note": "方法依据：中位数和MAD稳健尺度；阈值由正常参考集估计。"
    }
  ],
  "english": {
    "title": "Robust screening of pigging-condition candidates",
    "stage": "Transportation",
    "intro": "Pressure drop can change with flow or temperature; maintenance should not rely on a calendar alone. Multivariable departures need contextual review.",
    "concept": "Pressure drop can change with flow or temperature; maintenance should not rely on a calendar alone. Multivariable departures need contextual review.",
    "method": "Normal-reference median/MAD detection",
    "what": "Normal-reference medians and MAD form multivariable anomaly scores for intervals that may need pigging review.",
    "why": "Pressure drop can change with flow or temperature; maintenance should not rely on a calendar alone. Multivariable departures need contextual review.",
    "how": "Set thresholds from reference quantiles, inject synthetic deposition burden and inspect channel residuals; contamination shifts the normal reference.",
    "data": "Independent synthetic reference and test records. Inputs include Pressure-drop growth, Flow departure, Deposition burden, Temperature condition. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is neither a pigging-date optimizer nor a real wax-thickness model; anomalies do not prove blockage. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Pressure-drop growth",
        "unit": ""
      },
      {
        "name": "Flow departure",
        "unit": ""
      },
      {
        "name": "Deposition burden",
        "unit": ""
      },
      {
        "name": "Temperature condition",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Pigging-review candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal reference",
      "Review condition"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Pressure-drop growth, Flow departure, Deposition burden, Temperature condition. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Tracks show maintenance cues",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Normal-reference medians and MAD form multivariable anomaly scores for intervals that may need pigging review.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Set thresholds from reference quantiles, inject synthetic deposition burden and inspect channel residuals; contamination shifts the normal reference.",
        "effect": "Robust residuals explain departures",
        "trap": "This is neither a pigging-date optimizer nor a real wax-thickness model; anomalies do not prove blockage."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Pressure drop can change with flow or temperature; maintenance should not rely on a calendar alone. Multivariable departures need contextual review.",
        "effect": "Reference contamination tests excess alarms",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Tracks show maintenance cues",
      "Robust residuals explain departures",
      "Reference contamination tests excess alarms"
    ],
    "references": [
      {
        "title": "SLB Pipeline Pigging",
        "url": "https://www.slb.com/resource-library/article/valve-insights/how-it-works-pipeline-pigging",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "NIST Median Absolute Deviation",
        "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/mad.htm",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
