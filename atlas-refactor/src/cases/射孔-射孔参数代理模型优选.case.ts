import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "perforation-ai",
  "sceneId": "p1",
  "name": "射孔-射孔参数代理模型优选",
  "engine": "chapter",
  "kind": "surrogate",
  "task": "perforation",
  "methods": [
    "opt"
  ],
  "features": [
    {
      "name": "孔密指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "穿透深度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "相位条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [],
  "stage": "射孔",
  "title": "射孔参数代理模型优选",
  "method": "二次特征岭回归 · 约束网格搜索",
  "intro": "射孔效果取决于参数组合。先学习参考试验的响应，再低成本筛选候选。",
  "what": "岭回归拟合一次项、平方项与交互项，用约束网格搜索筛选预测响应较高的组合。",
  "why": "增大单一参数不一定持续改善效果。响应热图能展示耦合、高值区和预算边界，独立残差说明代理模型是否可靠。",
  "how": "用独立参考试验拟合代理，在固定第三条件下计算 21×21 个组合，只在预算内找预测最大值；真值只用于事后验证。",
  "concept": "射孔孔道沟通井筒与近井储层，地层和工程条件共同影响结果。",
  "data": "合成试验、独立测试与搜索组合分开，响应是无量纲指标。",
  "limit": "预算和响应函数是教学设定，不代表真实产能或射孔施工建议。",
  "visuals": [
    "响应热图展示参数耦合。",
    "预算遮罩标出不可行组合。",
    "独立残差揭示代理误差。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "合成试验、独立测试与搜索组合分开，响应是无量纲指标。",
      "effect": "响应热图展示参数耦合。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "用独立参考试验拟合代理，在固定第三条件下计算 21×21 个组合，只在预算内找预测最大值；真值只用于事后验证。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "预算和响应函数是教学设定，不代表真实产能或射孔施工建议。"
    },
    {
      "name": "约束内搜索",
      "do": "岭回归拟合一次项、平方项与交互项，用约束网格搜索筛选预测响应较高的组合。",
      "effect": "预算遮罩标出不可行组合。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "增大单一参数不一定持续改善效果。响应热图能展示耦合、高值区和预算边界，独立残差说明代理模型是否可靠。",
      "effect": "独立残差揭示代理误差。",
      "trap": "预算和响应函数是教学设定，不代表真实产能或射孔施工建议。"
    }
  ],
  "english": {
    "stage": "Perforation",
    "title": "Surrogate-assisted perforation design",
    "method": "Polynomial ridge surrogate · constrained grid search",
    "intro": "Perforation response depends on parameter combinations. Reference trials train a cheap screening surrogate.",
    "what": "Ridge regression fits linear, squared and interaction terms, followed by constrained search over predicted responses.",
    "why": "Increasing one input need not keep helping. Heatmaps reveal interactions, promising regions and budget limits; held-out residuals test reliability.",
    "how": "References fit the surrogate. A 21×21 grid fixes the third condition, filters by budget and selects the best prediction; truth checks it afterwards.",
    "concept": "Perforations connect a well with its near-well formation under geological and engineering constraints.",
    "data": "Synthetic reference, held-out and search sets remain separate. Responses are dimensionless indices.",
    "limit": "Budgets and response functions are educational, not real productivity estimates or operating advice.",
    "features": [
      {
        "name": "Shot-density index"
      },
      {
        "name": "Penetration-depth index"
      },
      {
        "name": "Phasing-condition index"
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
        "do": "Synthetic reference, held-out and search sets remain separate. Responses are dimensionless indices.",
        "effect": "Response heatmaps reveal parameter interactions.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References fit the surrogate. A 21×21 grid fixes the third condition, filters by budget and selects the best prediction; truth checks it afterwards.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "Budgets and response functions are educational, not real productivity estimates or operating advice."
      },
      {
        "name": "Search feasible designs",
        "do": "Ridge regression fits linear, squared and interaction terms, followed by constrained search over predicted responses.",
        "effect": "The budget mask identifies infeasible combinations.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Increasing one input need not keep helping. Heatmaps reveal interactions, promising regions and budget limits; held-out residuals test reliability.",
        "effect": "Held-out residuals reveal surrogate errors.",
        "trap": "Budgets and response functions are educational, not real productivity estimates or operating advice."
      }
    ]
  }
} satisfies ChapterCaseDef;
