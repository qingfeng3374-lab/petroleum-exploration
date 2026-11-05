import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-c2",
  "sceneId": "c2",
  "name": "固井-注水泥参数优化",
  "title": "注水泥参数优化",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "opt"
  ],
  "intro": "更高排量不总能改善封固，密度窗口与漏失敏感性使单变量经验难以覆盖组合变化。",
  "concept": "注水泥设计要确定水泥浆密度、流变性、排量与替浆方案，目标是在不漏失的前提下实现全封固。",
  "what": "二次岭回归拟合浆体、排量与合成顶替性能，搜索预算内组合。",
  "why": "更高排量不总能改善封固，密度窗口与漏失敏感性使单变量经验难以覆盖组合变化。",
  "how": "固定漏失敏感条件计算配方—排量网格，用资源预算过滤再选择预测顶替性能较高的候选。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：浆体流变指标、泵排量指标、漏失敏感指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "未进行真实水力计算或密度窗口校核，不能把教学预算当作现场安全边界。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "浆体流变指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "泵排量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "漏失敏感指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "顶替性能指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：浆体流变指标、泵排量指标、漏失敏感指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "输入范围说明浆体与井况",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归拟合浆体、排量与合成顶替性能，搜索预算内组合。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定漏失敏感条件计算配方—排量网格，用资源预算过滤再选择预测顶替性能较高的候选。",
      "effect": "热图展示顶替性能耦合",
      "trap": "未进行真实水力计算或密度窗口校核，不能把教学预算当作现场安全边界。"
    },
    {
      "name": "对照与人工复核",
      "do": "更高排量不总能改善封固，密度窗口与漏失敏感性使单变量经验难以覆盖组合变化。",
      "effect": "预算边界与独立误差共同复核",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "输入范围说明浆体与井况",
    "热图展示顶替性能耦合",
    "预算边界与独立误差共同复核"
  ],
  "english": {
    "title": "Cementing parameter optimization",
    "stage": "Cementing",
    "intro": "Higher rates do not always improve placement; loss sensitivity and operating windows complicate one-variable rules.",
    "concept": "Slurry density, rheology, rate and displacement design must achieve isolation without losses.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "Quadratic ridge regression models slurry, rate and synthetic displacement performance, then searches feasible combinations.",
    "why": "Higher rates do not always improve placement; loss sensitivity and operating windows complicate one-variable rules.",
    "how": "At fixed loss sensitivity, evaluate a formulation/rate grid, filter by resource budget and select a high predicted displacement candidate.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Slurry rheology, Pump rate, Loss sensitivity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "No real hydraulic or density-window calculation is performed; the teaching budget is not a field safety boundary. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Slurry rheology",
        "unit": ""
      },
      {
        "name": "Pump rate",
        "unit": ""
      },
      {
        "name": "Loss sensitivity",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Displacement performance",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Slurry rheology, Pump rate, Loss sensitivity. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Inputs explain slurry and well conditions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression models slurry, rate and synthetic displacement performance, then searches feasible combinations.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed loss sensitivity, evaluate a formulation/rate grid, filter by resource budget and select a high predicted displacement candidate.",
        "effect": "Heatmap reveals coupled displacement performance",
        "trap": "No real hydraulic or density-window calculation is performed; the teaching budget is not a field safety boundary."
      },
      {
        "name": "Compare and review",
        "do": "Higher rates do not always improve placement; loss sensitivity and operating windows complicate one-variable rules.",
        "effect": "Review budget boundaries alongside held-out errors",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Inputs explain slurry and well conditions",
      "Heatmap reveals coupled displacement performance",
      "Review budget boundaries alongside held-out errors"
    ]
  }
} satisfies SceneCaseDef;
