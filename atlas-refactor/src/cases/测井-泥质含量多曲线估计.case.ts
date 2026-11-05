import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-shale",
  "sceneId": "w2",
  "name": "测井-泥质含量多曲线估计",
  "title": "泥质含量多曲线估计",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "伽马响应会受到成分和区域背景影响，单曲线线性换算可能产生偏差。",
  "concept": "伽马响应会受到成分和区域背景影响，单曲线线性换算可能产生偏差。多曲线融合需要参考标定和独立检验。",
  "what": "二次岭回归融合伽马与辅助曲线，输出限制在0到100%的合成泥质比例。",
  "why": "伽马响应会受到成分和区域背景影响，单曲线线性换算可能产生偏差。多曲线融合需要参考标定和独立检验。",
  "how": "参考记录学习非线性交互关系，测试把多曲线估计与伽马指数直接乘100的规则比较，并显示约束前贡献。",
  "data": "独立合成参考、校准和测试记录。输入包括自然伽马指数、密度响应、中子响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "不替代真实岩心黏土分析，未实现区域泥质模型或放射性矿物校正。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "自然伽马指数",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "密度响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中子响应",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "泥质含量示意比例",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括自然伽马指数、密度响应、中子响应；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "多曲线说明信息互补",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归融合伽马与辅助曲线，输出限制在0到100%的合成泥质比例。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考记录学习非线性交互关系，测试把多曲线估计与伽马指数直接乘100的规则比较，并显示约束前贡献。",
      "effect": "比例约束与交会图检查偏差",
      "trap": "不替代真实岩心黏土分析，未实现区域泥质模型或放射性矿物校正。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "伽马响应会受到成分和区域背景影响，单曲线线性换算可能产生偏差。多曲线融合需要参考标定和独立检验。",
      "effect": "伽马规则与独立区间对照",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "多曲线说明信息互补",
    "比例约束与交会图检查偏差",
    "伽马规则与独立区间对照"
  ],
  "extension": {
    "key": "shale",
    "task": "regression",
    "projection": "percent"
  },
  "references": [
    {
      "title": "SLB Basic Well Log Interpretation",
      "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-log-interpretation",
      "note": "用于理解多曲线岩性与流体解释；本例不替代真实井标定。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Multilog shale-volume estimate",
    "stage": "Well Logging",
    "intro": "Gamma response depends on composition and background; one linear conversion can be biased. Multilog estimates require references and held-out evaluation.",
    "concept": "Gamma response depends on composition and background; one linear conversion can be biased. Multilog estimates require references and held-out evaluation.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression combines gamma ray and auxiliary logs, constraining synthetic shale fractions to 0–100%.",
    "why": "Gamma response depends on composition and background; one linear conversion can be biased. Multilog estimates require references and held-out evaluation.",
    "how": "Learn nonlinear interactions from references, compare with gamma index times 100 and inspect pre-constraint contributions.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Gamma-ray index, Density response, Neutron response. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "This does not replace core clay analysis or model regional shale transforms and radioactive-mineral corrections. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Gamma-ray index",
        "unit": ""
      },
      {
        "name": "Density response",
        "unit": ""
      },
      {
        "name": "Neutron response",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Shale-volume illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Gamma-ray index, Density response, Neutron response. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Logs show complementary information",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression combines gamma ray and auxiliary logs, constraining synthetic shale fractions to 0–100%.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Learn nonlinear interactions from references, compare with gamma index times 100 and inspect pre-constraint contributions.",
        "effect": "Bounds and crossplots inspect bias",
        "trap": "This does not replace core clay analysis or model regional shale transforms and radioactive-mineral corrections."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Gamma response depends on composition and background; one linear conversion can be biased. Multilog estimates require references and held-out evaluation.",
        "effect": "Compare gamma rules and independent intervals",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Logs show complementary information",
      "Bounds and crossplots inspect bias",
      "Compare gamma rules and independent intervals"
    ],
    "references": [
      {
        "title": "SLB Basic Well Log Interpretation",
        "url": "https://www.slb.com/resource-library/oilfield-review/defining-series/defining-log-interpretation",
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
