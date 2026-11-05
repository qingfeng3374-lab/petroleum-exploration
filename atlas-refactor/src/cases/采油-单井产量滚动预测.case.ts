import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "production-ai",
  "sceneId": "pr2",
  "name": "采油-单井产量滚动预测",
  "engine": "chapter",
  "kind": "forecast",
  "task": "production",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "前一天产量",
      "unit": "",
      "range": [
        0,
        120
      ]
    },
    {
      "name": "前两天产量",
      "unit": "",
      "range": [
        0,
        120
      ]
    },
    {
      "name": "前三天产量",
      "unit": "",
      "range": [
        0,
        120
      ]
    },
    {
      "name": "预先给定周期相位",
      "unit": "",
      "range": [
        -1,
        1
      ]
    }
  ],
  "classes": [],
  "stage": "采油",
  "title": "单井产量滚动预测",
  "method": "自回归特征 · 岭回归",
  "intro": "产量具有连续性，但复制昨日值会忽略递减和制度变化，需要按时间检验模型。",
  "what": "前三天产量和预先给定的合成周期进入岭回归，学习下一步产量变化，叠加昨日量形成滚动一步预测。",
  "why": "历史窗口能学习递减和滞后关系。若随机打散时间或使用未来值，就无法真实判断预测是否有用。",
  "how": "前100个窗口拟合产量变化；之后只用已发生观测和已知周期相位预测下一点。周期是生成器预先给定的教学条件，不从测试标签估计。",
  "concept": "历史量不知道未来措施和工况变化，因此制度突变是重要的失败情形。",
  "data": "按时间排序的合成产量；测试期已经发生的观测可用于下一步预测。",
  "limit": "没有真实产量单位和储量约束，不能用于储量评估；工况突变时误差可能增加。 周期为教学设定，不表示真实油井普遍具有这一周期。",
  "visuals": [
    "时间分割线区分训练与检验。",
    "真值、一步预测与持续法共用时间轴。",
    "滞后特征贡献解释单次预测。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "按时间排序的合成产量；测试期已经发生的观测可用于下一步预测。",
      "effect": "时间分割线区分训练与检验。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "前100个窗口拟合产量变化；之后只用已发生观测和已知周期相位预测下一点。周期是生成器预先给定的教学条件，不从测试标签估计。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "没有真实产量单位和储量约束，不能用于储量评估；工况突变时误差可能增加。 周期为教学设定，不表示真实油井普遍具有这一周期。"
    },
    {
      "name": "应用于新观测",
      "do": "前三天产量和预先给定的合成周期进入岭回归，学习下一步产量变化，叠加昨日量形成滚动一步预测。",
      "effect": "真值、一步预测与持续法共用时间轴。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "历史窗口能学习递减和滞后关系。若随机打散时间或使用未来值，就无法真实判断预测是否有用。",
      "effect": "滞后特征贡献解释单次预测。",
      "trap": "没有真实产量单位和储量约束，不能用于储量评估；工况突变时误差可能增加。 周期为教学设定，不表示真实油井普遍具有这一周期。"
    }
  ],
  "english": {
    "stage": "Production",
    "title": "Rolling single-well production forecast",
    "method": "Autoregressive features · ridge regression",
    "intro": "Production has continuity, but copying yesterday misses decline and regime changes. Validation must be chronological.",
    "what": "Three lagged rates and a preset synthetic cycle enter ridge regression to learn the next change, added to yesterday’s rate for a one-step forecast.",
    "why": "Lags can learn decline and persistence. Shuffling time or using future values would invalidate the evaluation.",
    "how": "The first 100 windows fit rate changes. Later forecasts use observed lags and a preset synthetic phase; the cycle is not estimated from test labels.",
    "concept": "Historical rates do not reveal future interventions, making regime shifts an important failure case.",
    "data": "Chronological synthetic rates allow already observed test lags in the next forecast.",
    "limit": "No real units or reserve constraints are supplied. This is not a reserves estimate, and regime shifts can increase error. The preset cycle does not imply that real wells share this periodicity.",
    "features": [
      {
        "name": "Previous-day rate"
      },
      {
        "name": "Two-day lag"
      },
      {
        "name": "Three-day lag"
      },
      {
        "name": "Preset cycle phase"
      }
    ],
    "classes": [],
    "visuals": [
      "The chronological split separates training and evaluation.",
      "Truth, one-step forecasts and persistence share a time axis.",
      "Lag contributions explain a selected forecast."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Chronological synthetic rates allow already observed test lags in the next forecast.",
        "effect": "The chronological split separates training and evaluation.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "The first 100 windows fit rate changes. Later forecasts use observed lags and a preset synthetic phase; the cycle is not estimated from test labels.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "No real units or reserve constraints are supplied. This is not a reserves estimate, and regime shifts can increase error. The preset cycle does not imply that real wells share this periodicity."
      },
      {
        "name": "Apply to new observations",
        "do": "Three lagged rates and a preset synthetic cycle enter ridge regression to learn the next change, added to yesterday’s rate for a one-step forecast.",
        "effect": "Truth, one-step forecasts and persistence share a time axis.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Lags can learn decline and persistence. Shuffling time or using future values would invalidate the evaluation.",
        "effect": "Lag contributions explain a selected forecast.",
        "trap": "No real units or reserve constraints are supplied. This is not a reserves estimate, and regime shifts can increase error. The preset cycle does not imply that real wells share this periodicity."
      }
    ]
  }
} satisfies ChapterCaseDef;
