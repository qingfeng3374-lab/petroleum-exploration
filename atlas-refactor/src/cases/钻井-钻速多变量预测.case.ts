import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "drilling-ai",
  "sceneId": "d1",
  "name": "钻井-钻速多变量预测",
  "engine": "chapter",
  "kind": "regression",
  "task": "drilling",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "钻压",
      "unit": "kN",
      "range": [
        40,
        160
      ]
    },
    {
      "name": "转速",
      "unit": "rpm",
      "range": [
        50,
        180
      ]
    },
    {
      "name": "排量",
      "unit": "L/s",
      "range": [
        15,
        40
      ]
    },
    {
      "name": "地层强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [],
  "stage": "钻井",
  "title": "钻速多变量预测",
  "method": "岭回归 · 多变量监督学习",
  "intro": "相同钻压在不同转速、排量与岩石条件下会对应不同钻速，逐项看趋势容易遗漏组合影响。",
  "what": "岭回归学习多个工况输入与钻速的统计关系，为独立测试井段生成钻速估计。",
  "why": "固定平均钻速忽略工况差异。多变量模型综合输入，正则化约束不稳定系数；必须与训练均值基线比较，不能预设 AI 一定更好。",
  "how": "只在参考井段计算均值与标准差，解带 L2 惩罚的最小二乘。单点预测等于训练均值加各标准化特征贡献。",
  "concept": "钻速描述钻头破碎岩石并加深井眼的速度，统计相关不能直接解释为安全的调参因果关系。",
  "data": "合成工况与钻速配对记录，参考和测试使用不同种子。",
  "limit": "不推荐真实施工参数；没有模拟钻头磨损、井底清洁或事故约束。",
  "visuals": [
    "观测与预测散点检查偏差。",
    "模型与基线残差显示是否改善。",
    "特征贡献说明估计如何形成。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "合成工况与钻速配对记录，参考和测试使用不同种子。",
      "effect": "观测与预测散点检查偏差。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "只在参考井段计算均值与标准差，解带 L2 惩罚的最小二乘。单点预测等于训练均值加各标准化特征贡献。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不推荐真实施工参数；没有模拟钻头磨损、井底清洁或事故约束。"
    },
    {
      "name": "应用于新观测",
      "do": "岭回归学习多个工况输入与钻速的统计关系，为独立测试井段生成钻速估计。",
      "effect": "模型与基线残差显示是否改善。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "固定平均钻速忽略工况差异。多变量模型综合输入，正则化约束不稳定系数；必须与训练均值基线比较，不能预设 AI 一定更好。",
      "effect": "特征贡献说明估计如何形成。",
      "trap": "不推荐真实施工参数；没有模拟钻头磨损、井底清洁或事故约束。"
    }
  ],
  "english": {
    "stage": "Drilling",
    "title": "Multivariable penetration-rate prediction",
    "method": "Ridge regression · supervised prediction",
    "intro": "The same weight on bit can yield different rates under different rotary speeds, flows and rock conditions.",
    "what": "Ridge regression learns associations between operating variables and penetration rate to predict held-out intervals.",
    "why": "A fixed average ignores conditions. Multiple inputs and regularization may improve predictions, but the training-mean baseline must test that benefit.",
    "how": "References fit scaling before L2-regularized least squares. A prediction equals the training mean plus standardized feature contributions.",
    "concept": "Penetration rate measures how quickly a bit deepens a hole. Associations are not safe causal operating instructions.",
    "data": "Paired synthetic operating records and rates use independent reference and test seeds.",
    "limit": "No real operating settings are recommended. Wear, hole cleaning and incident constraints are omitted.",
    "features": [
      {
        "name": "Weight on bit"
      },
      {
        "name": "Rotary speed"
      },
      {
        "name": "Flow rate"
      },
      {
        "name": "Formation-strength index"
      }
    ],
    "classes": [],
    "visuals": [
      "Observed-versus-predicted scatter reveals bias.",
      "Model and baseline residuals reveal improvement.",
      "Feature contributions explain an estimate."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Paired synthetic operating records and rates use independent reference and test seeds.",
        "effect": "Observed-versus-predicted scatter reveals bias.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References fit scaling before L2-regularized least squares. A prediction equals the training mean plus standardized feature contributions.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "No real operating settings are recommended. Wear, hole cleaning and incident constraints are omitted."
      },
      {
        "name": "Apply to new observations",
        "do": "Ridge regression learns associations between operating variables and penetration rate to predict held-out intervals.",
        "effect": "Model and baseline residuals reveal improvement.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "A fixed average ignores conditions. Multiple inputs and regularization may improve predictions, but the training-mean baseline must test that benefit.",
        "effect": "Feature contributions explain an estimate.",
        "trap": "No real operating settings are recommended. Wear, hole cleaning and incident constraints are omitted."
      }
    ]
  }
} satisfies ChapterCaseDef;
