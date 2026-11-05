import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-r2",
  "sceneId": "r2",
  "name": "加工-催化裂化产物预测",
  "title": "催化裂化产物预测",
  "stage": "加工",
  "stageId": "refining",
  "engine": "scene",
  "family": "multi",
  "method": "多输出二次岭回归",
  "methods": [
    "opt",
    "ts"
  ],
  "intro": "单一汽油收率忽略副产物和物料衡算，多输出必须一起检查才能避免互相矛盾的预测。",
  "concept": "催化裂化（FCC）产品分布（干气、液化气、汽油、柴油、油浆）受原料性质、反应温度、剂油比等多因素影响，是炼厂效益的核心。",
  "what": "五个二次岭回归模型分别预测催化裂化馏分，再投影到非负且总和100%的收率组合。",
  "why": "单一汽油收率忽略副产物和物料衡算，多输出必须一起检查才能避免互相矛盾的预测。",
  "how": "参考配对记录拟合各馏分，预测先截断负值再归一化，切换输出查看误差并展示完整分布。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：反应强度指标、剂油比指标、原料特性指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "低阶合成代理不是深度反应动力学；归一化保证总量但不能保证真实化学机理。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "反应强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "剂油比指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "原料特性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "干气收率",
      "unit": ""
    },
    {
      "name": "液化气收率",
      "unit": ""
    },
    {
      "name": "汽油收率",
      "unit": ""
    },
    {
      "name": "柴油收率",
      "unit": ""
    },
    {
      "name": "油浆收率",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：反应强度指标、剂油比指标、原料特性指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "原料与操作变量展示耦合",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "五个二次岭回归模型分别预测催化裂化馏分，再投影到非负且总和100%的收率组合。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考配对记录拟合各馏分，预测先截断负值再归一化，切换输出查看误差并展示完整分布。",
      "effect": "五输出表检查收率组成",
      "trap": "低阶合成代理不是深度反应动力学；归一化保证总量但不能保证真实化学机理。"
    },
    {
      "name": "对照与人工复核",
      "do": "单一汽油收率忽略副产物和物料衡算，多输出必须一起检查才能避免互相矛盾的预测。",
      "effect": "总和与误差检验物料一致性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "原料与操作变量展示耦合",
    "五输出表检查收率组成",
    "总和与误差检验物料一致性"
  ],
  "english": {
    "title": "FCC product-yield forecasting",
    "stage": "Refining",
    "intro": "A gasoline-only estimate ignores coproducts and mass balance; joint output checks prevent inconsistent predictions.",
    "concept": "Feedstock, reaction temperature and catalyst-to-oil ratio jointly determine catalytic-cracking product yields.",
    "method": "Multi-output quadratic ridge regression",
    "what": "Five quadratic ridge models predict FCC fractions and project them onto nonnegative yields summing to 100%.",
    "why": "A gasoline-only estimate ignores coproducts and mass balance; joint output checks prevent inconsistent predictions.",
    "how": "Fit each fraction on paired references, clip negative predictions and renormalize, then inspect per-output errors and the full distribution.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Reaction severity, Catalyst-oil ratio, Feed-property index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "A low-order synthetic surrogate is not deep reaction kinetics; normalization preserves totals but not real chemistry. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Reaction severity",
        "unit": ""
      },
      {
        "name": "Catalyst-oil ratio",
        "unit": ""
      },
      {
        "name": "Feed-property index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Dry-gas yield",
        "unit": ""
      },
      {
        "name": "LPG yield",
        "unit": ""
      },
      {
        "name": "Gasoline yield",
        "unit": ""
      },
      {
        "name": "Diesel yield",
        "unit": ""
      },
      {
        "name": "Slurry yield",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Reaction severity, Catalyst-oil ratio, Feed-property index. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Feed and operating variables show coupling",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Five quadratic ridge models predict FCC fractions and project them onto nonnegative yields summing to 100%.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit each fraction on paired references, clip negative predictions and renormalize, then inspect per-output errors and the full distribution.",
        "effect": "Five-output table checks yield composition",
        "trap": "A low-order synthetic surrogate is not deep reaction kinetics; normalization preserves totals but not real chemistry."
      },
      {
        "name": "Compare and review",
        "do": "A gasoline-only estimate ignores coproducts and mass balance; joint output checks prevent inconsistent predictions.",
        "effect": "Sum and errors inspect material consistency",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Feed and operating variables show coupling",
      "Five-output table checks yield composition",
      "Sum and errors inspect material consistency"
    ]
  }
} satisfies SceneCaseDef;
