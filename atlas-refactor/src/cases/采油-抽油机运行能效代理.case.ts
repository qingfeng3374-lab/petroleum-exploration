import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-pump-energy",
  "sceneId": "pr1",
  "name": "采油-抽油机运行能效代理",
  "title": "抽油机运行能效代理",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "cv"
  ],
  "intro": "运行强度提高不一定改善单位产液能效，低充满或高载荷会改变收益。",
  "concept": "运行强度提高不一定改善单位产液能效，低充满或高载荷会改变收益。多参数联合比只看电流更可解释。",
  "what": "岭回归学习冲次、冲程、载荷与有效排液到合成能耗指数的耦合。",
  "why": "运行强度提高不一定改善单位产液能效，低充满或高载荷会改变收益。多参数联合比只看电流更可解释。",
  "how": "参考运行记录拟合多项式代理，独立测试与平均能耗对照，并查看冲次冲程交互贡献。",
  "data": "独立合成参考、校准和测试记录。输入包括冲次指标、冲程指标、载荷指标、有效排液指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "未积分真实功图或电机效率，指数没有实际千瓦时单位。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "冲次指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "冲程指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "载荷指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "有效排液指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "单位排液能耗指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括冲次指标、冲程指标、载荷指标、有效排液指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "工况指标展示能耗来源",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "岭回归学习冲次、冲程、载荷与有效排液到合成能耗指数的耦合。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考运行记录拟合多项式代理，独立测试与平均能耗对照，并查看冲次冲程交互贡献。",
      "effect": "能耗预测对照独立目标",
      "trap": "未积分真实功图或电机效率，指数没有实际千瓦时单位。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "运行强度提高不一定改善单位产液能效，低充满或高载荷会改变收益。多参数联合比只看电流更可解释。",
      "effect": "交互项说明效率并非单调",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "工况指标展示能耗来源",
    "能耗预测对照独立目标",
    "交互项说明效率并非单调"
  ],
  "extension": {
    "key": "pump-energy",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Dynamometer Card",
      "url": "https://glossary.slb.com/Terms/d/dynamometer_card.aspx",
      "note": "用于理解载荷、位移与泵工况；能效指数为合成响应。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Rod-pump operating-energy surrogate",
    "stage": "Production",
    "intro": "Higher operating intensity need not improve energy per delivered liquid; fill and load alter returns. Joint inputs add context beyond current alone.",
    "concept": "Higher operating intensity need not improve energy per delivered liquid; fill and load alter returns. Joint inputs add context beyond current alone.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Ridge regression learns stroke, load and effective-delivery effects on a synthetic energy-per-delivery index.",
    "why": "Higher operating intensity need not improve energy per delivered liquid; fill and load alter returns. Joint inputs add context beyond current alone.",
    "how": "Fit a polynomial surrogate to references, compare against average energy on held-out records and inspect stroke-rate/length interactions.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Stroke-rate index, Stroke-length index, Load index, Effective-delivery index. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Real dynamometer work and motor efficiency are not integrated; the index is not measured kilowatt-hours. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Stroke-rate index",
        "unit": ""
      },
      {
        "name": "Stroke-length index",
        "unit": ""
      },
      {
        "name": "Load index",
        "unit": ""
      },
      {
        "name": "Effective-delivery index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Energy-per-delivery index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Stroke-rate index, Stroke-length index, Load index, Effective-delivery index. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Operating inputs explain energy sources",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Ridge regression learns stroke, load and effective-delivery effects on a synthetic energy-per-delivery index.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit a polynomial surrogate to references, compare against average energy on held-out records and inspect stroke-rate/length interactions.",
        "effect": "Compare predicted energy and held-out targets",
        "trap": "Real dynamometer work and motor efficiency are not integrated; the index is not measured kilowatt-hours."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Higher operating intensity need not improve energy per delivered liquid; fill and load alter returns. Joint inputs add context beyond current alone.",
        "effect": "Interactions explain nonmonotonic efficiency",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Operating inputs explain energy sources",
      "Compare predicted energy and held-out targets",
      "Interactions explain nonmonotonic efficiency"
    ],
    "references": [
      {
        "title": "SLB Dynamometer Card",
        "url": "https://glossary.slb.com/Terms/d/dynamometer_card.aspx",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Ridge Regression",
        "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
