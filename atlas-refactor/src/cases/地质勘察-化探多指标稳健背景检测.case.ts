import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-geochem-background",
  "sceneId": "g2",
  "name": "地质勘察-化探多指标稳健背景检测",
  "title": "化探多指标稳健背景检测",
  "stage": "地质勘察",
  "stageId": "geology",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常背景中位数/MAD稳健检测",
  "methods": [
    "opt"
  ],
  "intro": "化探异常要相对正常背景解释，孤立高值也可能来自背景变化。",
  "concept": "化探异常要相对正常背景解释，孤立高值也可能来自背景变化。空间分布和各指标贡献应一起复核。",
  "what": "从正常参考样本估计中位数和MAD，将多指标稳健残差合成为异常分数。",
  "why": "化探异常要相对正常背景解释，孤立高值也可能来自背景变化。空间分布和各指标贡献应一起复核。",
  "how": "阈值由正常参考分数的98%分位数确定，测试样点生成空间异常簇；污染预设改变参考背景而不是只改配色。",
  "data": "独立合成参考与测试记录。输入包括指标甲观测、指标乙观测、指标丙观测；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是地统计插值或油气靶区概率图，检测偏离不直接证明油气微渗漏。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "指标甲观测",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "指标乙观测",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "指标丙观测",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "组合异常候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常背景",
    "偏离背景"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括指标甲观测、指标乙观测、指标丙观测；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "采样点地图展示组合偏离",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "从正常参考样本估计中位数和MAD，将多指标稳健残差合成为异常分数。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "阈值由正常参考分数的98%分位数确定，测试样点生成空间异常簇；污染预设改变参考背景而不是只改配色。",
      "effect": "MAD残差解释异常来源",
      "trap": "不是地统计插值或油气靶区概率图，检测偏离不直接证明油气微渗漏。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "化探异常要相对正常背景解释，孤立高值也可能来自背景变化。空间分布和各指标贡献应一起复核。",
      "effect": "背景污染检验稳健性的边界",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "采样点地图展示组合偏离",
    "MAD残差解释异常来源",
    "背景污染检验稳健性的边界"
  ],
  "extension": {
    "key": "geochem-background",
    "task": "robust"
  },
  "references": [
    {
      "title": "USGS Soil Geochemical Maps",
      "url": "https://www.usgs.gov/publications/geochemical-and-mineralogical-maps-interpretation-soils-conterminous-united-states",
      "note": "用于理解背景浓度与空间地球化学解释，数据由本项目合成。"
    },
    {
      "title": "NIST Median Absolute Deviation",
      "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/mad.htm",
      "note": "方法依据：中位数和MAD稳健尺度；阈值由正常参考集估计。"
    }
  ],
  "english": {
    "title": "Robust geochemical background detection",
    "stage": "Geological Survey",
    "intro": "Geochemical anomalies require a background reference; isolated highs may reflect background changes. Review spatial patterns and channel contributions together.",
    "concept": "Geochemical anomalies require a background reference; isolated highs may reflect background changes. Review spatial patterns and channel contributions together.",
    "method": "Normal-reference median/MAD detection",
    "what": "Estimate median and MAD from normal references and combine robust multivariable residuals into an anomaly score.",
    "why": "Geochemical anomalies require a background reference; isolated highs may reflect background changes. Review spatial patterns and channel contributions together.",
    "how": "Set thresholds from the normal-reference 98th percentile. Test points form spatial anomaly clusters; contamination changes the fitted background rather than display colors.",
    "data": "Independent synthetic reference and test records. Inputs include Indicator A, Indicator B, Indicator C. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is neither geostatistical interpolation nor a prospect-probability map; a departure does not prove hydrocarbon microseepage. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Indicator A",
        "unit": ""
      },
      {
        "name": "Indicator B",
        "unit": ""
      },
      {
        "name": "Indicator C",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Combined-anomaly candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal background",
      "Background departure"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Indicator A, Indicator B, Indicator C. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Sample maps show combined departures",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Estimate median and MAD from normal references and combine robust multivariable residuals into an anomaly score.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Set thresholds from the normal-reference 98th percentile. Test points form spatial anomaly clusters; contamination changes the fitted background rather than display colors.",
        "effect": "MAD residuals explain anomaly sources",
        "trap": "This is neither geostatistical interpolation nor a prospect-probability map; a departure does not prove hydrocarbon microseepage."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Geochemical anomalies require a background reference; isolated highs may reflect background changes. Review spatial patterns and channel contributions together.",
        "effect": "Reference contamination probes robustness limits",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Sample maps show combined departures",
      "MAD residuals explain anomaly sources",
      "Reference contamination probes robustness limits"
    ],
    "references": [
      {
        "title": "USGS Soil Geochemical Maps",
        "url": "https://www.usgs.gov/publications/geochemical-and-mineralogical-maps-interpretation-soils-conterminous-united-states",
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
