import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-watercut",
  "sceneId": "pr2",
  "name": "采油-含水率多工况软测量",
  "title": "含水率多工况软测量",
  "stage": "采油",
  "stageId": "production",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts"
  ],
  "intro": "产出含水率是水量占总液量的比例，与井筒持水率并不相同。",
  "concept": "产出含水率是水量占总液量的比例，与井筒持水率并不相同。单项电学响应不足以直接判断含水率。",
  "what": "二次岭回归融合产出与流动指标，预测限制在0到100%的合成含水比例。",
  "why": "产出含水率是水量占总液量的比例，与井筒持水率并不相同。单项电学响应不足以直接判断含水率。",
  "how": "参考配对记录拟合响应，约束投影保证比例范围；独立检验和区间检查不同工况下的偏差。",
  "data": "独立合成参考、校准和测试记录。输入包括产出水响应指标、流动条件指标、油相响应指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不是多相流计量仪，数据没有标准状况换算或真实相速度解算。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "产出水响应指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流动条件指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "油相响应指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "含水率示意比例",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括产出水响应指标、流动条件指标、油相响应指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "多源指标区分持率与产出比例",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归融合产出与流动指标，预测限制在0到100%的合成含水比例。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考配对记录拟合响应，约束投影保证比例范围；独立检验和区间检查不同工况下的偏差。",
      "effect": "有界预测与交会图联动",
      "trap": "不是多相流计量仪，数据没有标准状况换算或真实相速度解算。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "产出含水率是水量占总液量的比例，与井筒持水率并不相同。单项电学响应不足以直接判断含水率。",
      "effect": "区间提示工况迁移风险",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "多源指标区分持率与产出比例",
    "有界预测与交会图联动",
    "区间提示工况迁移风险"
  ],
  "extension": {
    "key": "watercut",
    "task": "regression",
    "projection": "percent"
  },
  "references": [
    {
      "title": "SLB Water Cut",
      "url": "https://glossary.slb.com/terms/w/water_cut",
      "note": "区分产出水体积比例与井筒持水率，演示仅用合成比例。"
    },
    {
      "title": "SLB Water-cut Meter",
      "url": "https://glossary.slb.com/en/terms/w/water-cut_meter",
      "note": "说明持水率和含水率并不等同，避免把单项电学读数当作含水率。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Multicondition water-cut soft sensing",
    "stage": "Production",
    "intro": "Produced water cut is water rate over total liquid rate and differs from borehole holdup. One electrical response cannot directly determine it.",
    "concept": "Produced water cut is water rate over total liquid rate and differs from borehole holdup. One electrical response cannot directly determine it.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression combines production and flow indicators to predict synthetic water fractions bounded to 0–100%.",
    "why": "Produced water cut is water rate over total liquid rate and differs from borehole holdup. One electrical response cannot directly determine it.",
    "how": "Fit paired reference responses, project into valid fraction bounds and use held-out errors and intervals to inspect condition-dependent bias.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Produced-water response, Flow-condition index, Oil-response index. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This is not a multiphase flowmeter and omits standard-condition conversion and real phase velocities. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Produced-water response",
        "unit": ""
      },
      {
        "name": "Flow-condition index",
        "unit": ""
      },
      {
        "name": "Oil-response index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Water-cut illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Produced-water response, Flow-condition index, Oil-response index. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Inputs distinguish holdup from produced fractions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression combines production and flow indicators to predict synthetic water fractions bounded to 0–100%.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit paired reference responses, project into valid fraction bounds and use held-out errors and intervals to inspect condition-dependent bias.",
        "effect": "Link bounded estimates and crossplots",
        "trap": "This is not a multiphase flowmeter and omits standard-condition conversion and real phase velocities."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Produced water cut is water rate over total liquid rate and differs from borehole holdup. One electrical response cannot directly determine it.",
        "effect": "Intervals flag condition-transfer risk",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Inputs distinguish holdup from produced fractions",
      "Link bounded estimates and crossplots",
      "Intervals flag condition-transfer risk"
    ],
    "references": [
      {
        "title": "SLB Water Cut",
        "url": "https://glossary.slb.com/terms/w/water_cut",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "SLB Water-cut Meter",
        "url": "https://glossary.slb.com/en/terms/w/water-cut_meter",
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
