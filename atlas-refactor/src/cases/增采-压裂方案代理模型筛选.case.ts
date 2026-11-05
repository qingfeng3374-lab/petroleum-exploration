import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "eor-ai",
  "sceneId": "e1",
  "name": "增采-压裂方案代理模型筛选",
  "engine": "chapter",
  "kind": "surrogate",
  "task": "eor",
  "methods": [
    "opt"
  ],
  "features": [
    {
      "name": "排量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "砂比指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "段距条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [],
  "stage": "增采",
  "title": "压裂方案代理模型筛选",
  "method": "二次响应代理模型 · 约束搜索",
  "intro": "压裂响应可能非线性耦合，更多砂和更高排量并不自动意味着更好效果。",
  "what": "用二次特征岭回归近似参考试验响应，在预算约束内搜索预测高值方案。",
  "why": "参考试验代价高，代理模型能快速比较组合。热图展示如何缩小候选范围，独立误差检验近似是否值得信任。",
  "how": "拟合一次项、平方项与交互项，逐格计算响应和预算条件，选可行点的预测最大值，再用隐藏合成函数事后检验。",
  "concept": "施工、裂缝与储层之间存在复杂物理联系，这里只展示学习型代理的作用。",
  "data": "独立合成试验与无量纲效果指数，固定第三条件比较两维组合。",
  "limit": "没有进行水力压裂物理模拟，不估计真实增产量，不能直接推广到训练范围之外。",
  "visuals": [
    "响应热图展示参数耦合。",
    "预算遮罩标出不可行组合。",
    "独立残差揭示代理误差。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "独立合成试验与无量纲效果指数，固定第三条件比较两维组合。",
      "effect": "响应热图展示参数耦合。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "拟合一次项、平方项与交互项，逐格计算响应和预算条件，选可行点的预测最大值，再用隐藏合成函数事后检验。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "没有进行水力压裂物理模拟，不估计真实增产量，不能直接推广到训练范围之外。"
    },
    {
      "name": "约束内搜索",
      "do": "用二次特征岭回归近似参考试验响应，在预算约束内搜索预测高值方案。",
      "effect": "预算遮罩标出不可行组合。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "参考试验代价高，代理模型能快速比较组合。热图展示如何缩小候选范围，独立误差检验近似是否值得信任。",
      "effect": "独立残差揭示代理误差。",
      "trap": "没有进行水力压裂物理模拟，不估计真实增产量，不能直接推广到训练范围之外。"
    }
  ],
  "english": {
    "stage": "Recovery improvement",
    "title": "Surrogate screening of stimulation designs",
    "method": "Quadratic response surrogate · constrained search",
    "intro": "Stimulation responses can be nonlinear and coupled; more proppant and higher rates do not automatically help.",
    "what": "Polynomial ridge regression approximates reference responses before a budget-constrained search.",
    "why": "Trials can be expensive. Surrogates screen combinations quickly; heatmaps narrow the search while held-out errors test the approximation.",
    "how": "Linear, squared and interaction terms predict each grid cell. Feasible predictions are ranked and checked afterwards against the hidden synthetic function.",
    "concept": "Treatments, fractures and reservoirs have complex physical relationships; this illustrates a learned surrogate only.",
    "data": "Independent synthetic trials use a dimensionless response index with one condition fixed for a two-dimensional search.",
    "limit": "No hydraulic-fracturing simulation or real incremental production estimate is provided; extrapolation is unsupported.",
    "features": [
      {
        "name": "Rate index"
      },
      {
        "name": "Proppant-ratio index"
      },
      {
        "name": "Stage-spacing index"
      }
    ],
    "classes": [],
    "visuals": [
      "Response heatmaps reveal parameter interactions.",
      "The budget mask identifies infeasible combinations.",
      "Held-out residuals reveal surrogate errors."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Independent synthetic trials use a dimensionless response index with one condition fixed for a two-dimensional search.",
        "effect": "Response heatmaps reveal parameter interactions.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "Linear, squared and interaction terms predict each grid cell. Feasible predictions are ranked and checked afterwards against the hidden synthetic function.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "No hydraulic-fracturing simulation or real incremental production estimate is provided; extrapolation is unsupported."
      },
      {
        "name": "Search feasible designs",
        "do": "Polynomial ridge regression approximates reference responses before a budget-constrained search.",
        "effect": "The budget mask identifies infeasible combinations.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Trials can be expensive. Surrogates screen combinations quickly; heatmaps narrow the search while held-out errors test the approximation.",
        "effect": "Held-out residuals reveal surrogate errors.",
        "trap": "No hydraulic-fracturing simulation or real incremental production estimate is provided; extrapolation is unsupported."
      }
    ]
  }
} satisfies ChapterCaseDef;
