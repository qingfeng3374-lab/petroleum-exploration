import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-e5",
  "sceneId": "e5",
  "name": "增采-微生物采油菌群活性预测",
  "title": "微生物采油菌群活性预测",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "菌群活性有适宜条件而非单调增长，低阶代理也可能无法表达全部生物过程，需要查看误差。",
  "concept": "微生物驱通过菌群代谢产物改善原油流动，菌群活性受营养液配方、温度、盐度影响，效果显现慢。",
  "what": "二次岭回归近似温度、营养、盐度与菌浓到合成菌群活性的非线性关系。",
  "why": "菌群活性有适宜条件而非单调增长，低阶代理也可能无法表达全部生物过程，需要查看误差。",
  "how": "参考培养指标拟合二次项与交互项，校准集形成误差区间，测试工况变化检验低阶近似局限。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：温度条件指标、营养条件指标、盐度负担、菌浓指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "未模拟菌群动力学或矿场增油，活性指标不能转为菌剂添加建议。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "温度条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "营养条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "盐度负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "菌浓指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "菌群活性示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：温度条件指标、营养条件指标、盐度负担、菌浓指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "培养条件展示非单调影响",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归近似温度、营养、盐度与菌浓到合成菌群活性的非线性关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考培养指标拟合二次项与交互项，校准集形成误差区间，测试工况变化检验低阶近似局限。",
      "effect": "活性交会图检查低阶近似",
      "trap": "未模拟菌群动力学或矿场增油，活性指标不能转为菌剂添加建议。"
    },
    {
      "name": "对照与人工复核",
      "do": "菌群活性有适宜条件而非单调增长，低阶代理也可能无法表达全部生物过程，需要查看误差。",
      "effect": "误差与区间暴露模型不足",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "培养条件展示非单调影响",
    "活性交会图检查低阶近似",
    "误差与区间暴露模型不足"
  ],
  "english": {
    "title": "Microbial recovery activity",
    "stage": "Enhanced Recovery",
    "intro": "Activity has favorable conditions rather than monotonic growth; a low-order surrogate can miss biological complexity and needs error review.",
    "concept": "Microbial metabolites influence oil mobility; activity depends on nutrients, temperature and salinity.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression approximates nonlinear synthetic microbial activity from temperature, nutrients, salinity and concentration.",
    "why": "Activity has favorable conditions rather than monotonic growth; a low-order surrogate can miss biological complexity and needs error review.",
    "how": "Reference culture indicators fit quadratic and interaction terms. Calibration supplies intervals, and shifted tests probe approximation limits.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Temperature condition, Nutrient condition, Salinity burden, Microbial concentration. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Microbial dynamics and field incremental oil are not modeled; activity is not a dosing recommendation. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Temperature condition",
        "unit": ""
      },
      {
        "name": "Nutrient condition",
        "unit": ""
      },
      {
        "name": "Salinity burden",
        "unit": ""
      },
      {
        "name": "Microbial concentration",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Microbial-activity illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Temperature condition, Nutrient condition, Salinity burden, Microbial concentration. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Conditions show nonmonotonic effects",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression approximates nonlinear synthetic microbial activity from temperature, nutrients, salinity and concentration.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference culture indicators fit quadratic and interaction terms. Calibration supplies intervals, and shifted tests probe approximation limits.",
        "effect": "Activity crossplots inspect low-order approximation",
        "trap": "Microbial dynamics and field incremental oil are not modeled; activity is not a dosing recommendation."
      },
      {
        "name": "Compare and review",
        "do": "Activity has favorable conditions rather than monotonic growth; a low-order surrogate can miss biological complexity and needs error review.",
        "effect": "Errors and intervals expose model limitations",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Conditions show nonmonotonic effects",
      "Activity crossplots inspect low-order approximation",
      "Errors and intervals expose model limitations"
    ]
  }
} satisfies SceneCaseDef;
