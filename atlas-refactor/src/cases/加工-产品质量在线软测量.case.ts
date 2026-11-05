import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "refining-ai",
  "sceneId": "r5",
  "name": "加工-产品质量在线软测量",
  "engine": "chapter",
  "kind": "regression",
  "task": "refining",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "温度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "压力指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "原料性质指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [],
  "stage": "加工",
  "title": "产品质量在线软测量",
  "method": "岭回归 · 过程变量软测量",
  "intro": "化验有采样和分析延迟，在线过程变量更频繁，软测量学习两者对应关系来提示质量变化。",
  "what": "配对过程变量和化验指标训练岭回归，从在线观测估计无量纲质量指数。",
  "why": "固定均值忽略原料和工况变化。学习模型结合多个变量，但必须用独立误差证明近似效果，而不能把估计冒充化验结果。",
  "how": "参考配对记录拟合标准化和正则化系数，新数据的特征贡献相加生成预测，同时对照真值、残差和均值基线。",
  "concept": "软测量用容易测量的量估计难以实时测量的量，训练时必须正确对齐观测时刻。",
  "data": "合成过程变量与质量指数配对，真实应用还需要采样和化验延迟对齐。",
  "limit": "不输出真实辛烷值、产品合格判定或操作建议，原料改变后需要重新验证。",
  "visuals": [
    "观测与预测散点检查偏差。",
    "模型与基线残差显示是否改善。",
    "特征贡献说明估计如何形成。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "合成过程变量与质量指数配对，真实应用还需要采样和化验延迟对齐。",
      "effect": "观测与预测散点检查偏差。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "参考配对记录拟合标准化和正则化系数，新数据的特征贡献相加生成预测，同时对照真值、残差和均值基线。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不输出真实辛烷值、产品合格判定或操作建议，原料改变后需要重新验证。"
    },
    {
      "name": "应用于新观测",
      "do": "配对过程变量和化验指标训练岭回归，从在线观测估计无量纲质量指数。",
      "effect": "模型与基线残差显示是否改善。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "固定均值忽略原料和工况变化。学习模型结合多个变量，但必须用独立误差证明近似效果，而不能把估计冒充化验结果。",
      "effect": "特征贡献说明估计如何形成。",
      "trap": "不输出真实辛烷值、产品合格判定或操作建议，原料改变后需要重新验证。"
    }
  ],
  "english": {
    "stage": "Processing",
    "title": "Online quality soft sensing",
    "method": "Ridge regression · process soft sensing",
    "intro": "Laboratory measurements are delayed, while process variables are frequent. Soft sensing learns their relationship to track quality changes.",
    "what": "Paired process and laboratory-style variables train ridge regression to estimate a dimensionless quality index.",
    "why": "A fixed mean ignores feed and operating changes. Independent errors must justify the learned approximation; estimates are not laboratory results.",
    "how": "Reference pairs fit scaling and regularized coefficients. Contributions form new predictions alongside truth, residuals and a mean baseline.",
    "concept": "Soft sensing estimates difficult-to-measure quantities from accessible variables; training pairs must be correctly time-aligned.",
    "data": "Synthetic process-quality pairs illustrate a task that needs sampling and laboratory-delay alignment in practice.",
    "limit": "This does not provide real octane numbers, product certification or operating advice. Feed changes require revalidation.",
    "features": [
      {
        "name": "Temperature index"
      },
      {
        "name": "Pressure index"
      },
      {
        "name": "Flow index"
      },
      {
        "name": "Feed-property index"
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
        "do": "Synthetic process-quality pairs illustrate a task that needs sampling and laboratory-delay alignment in practice.",
        "effect": "Observed-versus-predicted scatter reveals bias.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "Reference pairs fit scaling and regularized coefficients. Contributions form new predictions alongside truth, residuals and a mean baseline.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "This does not provide real octane numbers, product certification or operating advice. Feed changes require revalidation."
      },
      {
        "name": "Apply to new observations",
        "do": "Paired process and laboratory-style variables train ridge regression to estimate a dimensionless quality index.",
        "effect": "Model and baseline residuals reveal improvement.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "A fixed mean ignores feed and operating changes. Independent errors must justify the learned approximation; estimates are not laboratory results.",
        "effect": "Feature contributions explain an estimate.",
        "trap": "This does not provide real octane numbers, product certification or operating advice. Feed changes require revalidation."
      }
    ]
  }
} satisfies ChapterCaseDef;
