import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "transport-ai",
  "sceneId": "t1",
  "name": "运输-管道多传感器异常检测",
  "engine": "chapter",
  "kind": "anomaly",
  "task": "transport",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "入口压力指标",
      "unit": "",
      "range": [
        -2,
        2
      ]
    },
    {
      "name": "出口压力指标",
      "unit": "",
      "range": [
        -2,
        2
      ]
    },
    {
      "name": "流量差指标",
      "unit": "",
      "range": [
        -2,
        2
      ]
    },
    {
      "name": "温度指标",
      "unit": "",
      "range": [
        -2,
        2
      ]
    }
  ],
  "classes": [
    "正常",
    "待复核异常"
  ],
  "stage": "运输",
  "title": "管道多传感器异常检测",
  "method": "PCA 正常子空间 · 重构残差",
  "intro": "正常调节也会改变压力流量，传感器间联动关系被破坏可能比单项越限更值得复核。",
  "what": "正常参考记录拟合两个 PCA 主成分，以新观测不能被正常子空间解释的残差作为异常分数。",
  "why": "正常工况可整体升降而保持相关，单通道规则容易误报。PCA 对多变量关系建模，并能指出哪个传感器驱动报警。",
  "how": "正常训练数据拟合标准化与协方差主方向，投影再重构；各通道残差平方相加，与训练残差 98% 分位数的倍数比较。",
  "concept": "异常可能来自操作、传感器或泄漏等多种原因，不能把报警直接当成泄漏结论。",
  "data": "独立正常参考时序和含两段合成异常的测试时序，标签不进入模型与阈值拟合。",
  "limit": "不是泄漏定位器，分数不是泄漏概率；参考集污染会改变所学习的正常关系。",
  "visuals": [
    "多通道时序展示正常联动。",
    "分通道残差指出报警来源。",
    "事件条带用于复查误报与漏报。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "独立正常参考时序和含两段合成异常的测试时序，标签不进入模型与阈值拟合。",
      "effect": "多通道时序展示正常联动。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "正常训练数据拟合标准化与协方差主方向，投影再重构；各通道残差平方相加，与训练残差 98% 分位数的倍数比较。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不是泄漏定位器，分数不是泄漏概率；参考集污染会改变所学习的正常关系。"
    },
    {
      "name": "应用于新观测",
      "do": "正常参考记录拟合两个 PCA 主成分，以新观测不能被正常子空间解释的残差作为异常分数。",
      "effect": "分通道残差指出报警来源。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "正常工况可整体升降而保持相关，单通道规则容易误报。PCA 对多变量关系建模，并能指出哪个传感器驱动报警。",
      "effect": "事件条带用于复查误报与漏报。",
      "trap": "不是泄漏定位器，分数不是泄漏概率；参考集污染会改变所学习的正常关系。"
    }
  ],
  "english": {
    "stage": "Transportation",
    "title": "Pipeline multi-sensor anomaly detection",
    "method": "PCA normal subspace · reconstruction residuals",
    "intro": "Normal regulation changes pressure and flow. Broken multi-sensor relationships can be more informative than one limit crossing.",
    "what": "Normal references fit two PCA components; reconstruction residuals score new observations unexplained by that subspace.",
    "why": "Normal signals may move together. PCA models their relationships and identifies which sensors drive an alarm, unlike a one-channel rule.",
    "how": "Normal references fit scaling and covariance directions. Projection and reconstruction yield squared channel residuals, compared with a multiple of the training 98th percentile.",
    "concept": "Operations, sensors and leaks can all cause anomalies. An alarm is not a leak diagnosis.",
    "data": "Normal reference series and independent event series keep labels out of model and threshold fitting.",
    "limit": "This does not locate leaks or estimate leak probabilities. Contaminated references change the learned normal relationships.",
    "features": [
      {
        "name": "Inlet-pressure index"
      },
      {
        "name": "Outlet-pressure index"
      },
      {
        "name": "Flow-imbalance index"
      },
      {
        "name": "Temperature index"
      }
    ],
    "classes": [
      "Normal",
      "Anomaly for review"
    ],
    "visuals": [
      "Multi-channel series show normal correlations.",
      "Channel residuals identify alarm sources.",
      "Event strips expose false alarms and missed events."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Normal reference series and independent event series keep labels out of model and threshold fitting.",
        "effect": "Multi-channel series show normal correlations.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "Normal references fit scaling and covariance directions. Projection and reconstruction yield squared channel residuals, compared with a multiple of the training 98th percentile.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "This does not locate leaks or estimate leak probabilities. Contaminated references change the learned normal relationships."
      },
      {
        "name": "Apply to new observations",
        "do": "Normal references fit two PCA components; reconstruction residuals score new observations unexplained by that subspace.",
        "effect": "Channel residuals identify alarm sources.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Normal signals may move together. PCA models their relationships and identifies which sensors drive an alarm, unlike a one-channel rule.",
        "effect": "Event strips expose false alarms and missed events.",
        "trap": "This does not locate leaks or estimate leak probabilities. Contaminated references change the learned normal relationships."
      }
    ]
  }
} satisfies ChapterCaseDef;
