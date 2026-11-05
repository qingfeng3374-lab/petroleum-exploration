import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-station-balance",
  "sceneId": "t1",
  "name": "运输-多站流量守恒异常识别",
  "title": "多站流量守恒异常识别",
  "stage": "运输",
  "stageId": "transport",
  "engine": "scene",
  "family": "anomaly",
  "method": "正常背景中位数/MAD稳健检测",
  "methods": [
    "ts"
  ],
  "intro": "入口出口差并不全是泄漏，也可能是管存变化。",
  "concept": "入口出口差并不全是泄漏，也可能是管存变化。将库存项纳入平衡能补充单纯流量差阈值。",
  "what": "先计算入口减出口和库存变化的守恒残差，再用正常参考MAD学习异常尺度。",
  "why": "入口出口差并不全是泄漏，也可能是管存变化。将库存项纳入平衡能补充单纯流量差阈值。",
  "how": "每条观测实际计算两个站的平衡残差，正常参考估计中位数和尺度；测试对照忽略库存的固定阈值。",
  "data": "独立合成参考与测试记录。输入包括入口流量指标、出口流量指标、库存变化指标、冗余站残差；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "未做管线实时瞬态建模、时钟同步或计量误差传播，偏离不是泄漏确诊。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "入口流量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "出口流量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "库存变化指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "冗余站残差",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "守恒复核候选",
      "unit": ""
    }
  ],
  "classes": [
    "正常守恒",
    "偏离守恒"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括入口流量指标、出口流量指标、库存变化指标、冗余站残差；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "进出与库存轨迹解释守恒",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "先计算入口减出口和库存变化的守恒残差，再用正常参考MAD学习异常尺度。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "每条观测实际计算两个站的平衡残差，正常参考估计中位数和尺度；测试对照忽略库存的固定阈值。",
      "effect": "残差贡献定位平衡失配",
      "trap": "未做管线实时瞬态建模、时钟同步或计量误差传播，偏离不是泄漏确诊。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "入口出口差并不全是泄漏，也可能是管存变化。将库存项纳入平衡能补充单纯流量差阈值。",
      "effect": "同一数据对照误报漏报",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "进出与库存轨迹解释守恒",
    "残差贡献定位平衡失配",
    "同一数据对照误报漏报"
  ],
  "extension": {
    "key": "station-balance",
    "task": "robust"
  },
  "references": [
    {
      "title": "PHMSA Leak Detection Systems",
      "url": "https://primis.phmsa.dot.gov/stakeholder-comms/factsheets/fsleakdetectionsystems/",
      "note": "支持库存守恒监测概念，异常平衡残差不能直接确认泄漏。"
    },
    {
      "title": "NIST Median Absolute Deviation",
      "url": "https://itl.nist.gov/div898/software/dataplot/refman2/auxillar/mad.htm",
      "note": "方法依据：中位数和MAD稳健尺度；阈值由正常参考集估计。"
    }
  ],
  "english": {
    "title": "Multistation flow-balance anomaly detection",
    "stage": "Transportation",
    "intro": "Inlet/outlet differences can reflect inventory change as well as leakage. Including inventory adds context beyond a flow-difference threshold.",
    "concept": "Inlet/outlet differences can reflect inventory change as well as leakage. Including inventory adds context beyond a flow-difference threshold.",
    "method": "Normal-reference median/MAD detection",
    "what": "Compute inlet-minus-outlet-minus-inventory residuals, then learn abnormal scales from normal-reference MAD.",
    "why": "Inlet/outlet differences can reflect inventory change as well as leakage. Including inventory adds context beyond a flow-difference threshold.",
    "how": "Compute two actual balance residuals per observation, fit normal-reference centers/scales and compare against an inventory-blind threshold.",
    "data": "Independent synthetic reference and test records. Inputs include Inlet flow, Outlet flow, Inventory change, Redundant-station residual. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real-time transients, clock synchronization and meter-error propagation are absent; departures do not confirm leaks. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Inlet flow",
        "unit": ""
      },
      {
        "name": "Outlet flow",
        "unit": ""
      },
      {
        "name": "Inventory change",
        "unit": ""
      },
      {
        "name": "Redundant-station residual",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Balance-review candidate",
        "unit": ""
      }
    ],
    "classes": [
      "Normal balance",
      "Balance departure"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Inlet flow, Outlet flow, Inventory change, Redundant-station residual. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Flow and inventory tracks explain conservation",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Compute inlet-minus-outlet-minus-inventory residuals, then learn abnormal scales from normal-reference MAD.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Compute two actual balance residuals per observation, fit normal-reference centers/scales and compare against an inventory-blind threshold.",
        "effect": "Residual contributions locate mismatch",
        "trap": "Real-time transients, clock synchronization and meter-error propagation are absent; departures do not confirm leaks."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Inlet/outlet differences can reflect inventory change as well as leakage. Including inventory adds context beyond a flow-difference threshold.",
        "effect": "Compare errors on identical observations",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Flow and inventory tracks explain conservation",
      "Residual contributions locate mismatch",
      "Compare errors on identical observations"
    ],
    "references": [
      {
        "title": "PHMSA Leak Detection Systems",
        "url": "https://primis.phmsa.dot.gov/stakeholder-comms/factsheets/fsleakdetectionsystems/",
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
