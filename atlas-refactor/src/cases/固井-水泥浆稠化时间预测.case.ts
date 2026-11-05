import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-cement-time",
  "sceneId": "c2",
  "name": "固井-水泥浆稠化时间预测",
  "title": "水泥浆稠化时间预测",
  "stage": "固井",
  "stageId": "cementing",
  "engine": "scene",
  "family": "regression",
  "method": "二次岭回归＋独立区间校准",
  "methods": [
    "opt"
  ],
  "intro": "稠化时间影响浆体可泵性，单一温度或固定时间不能代表不同配方条件。",
  "concept": "稠化时间影响浆体可泵性，单一温度或固定时间不能代表不同配方条件。预测必须保留误差区间。",
  "what": "二次岭回归拟合温度、缓凝和压力对合成稠化时间的交互影响。",
  "why": "稠化时间影响浆体可泵性，单一温度或固定时间不能代表不同配方条件。预测必须保留误差区间。",
  "how": "参考试验记录拟合代理，测试比较训练均值并用独立校准残差构造区间；查看温度缓凝交互项。",
  "data": "独立合成参考、校准和测试记录。输入包括温度负担、缓凝剂指标、压力指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "示意时间没有现场小时单位，也没有按稠化仪标准判断施工窗口。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "温度负担",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "缓凝剂指标",
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
    }
  ],
  "outputs": [
    {
      "name": "稠化时间示意值",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括温度负担、缓凝剂指标、压力指标；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "配方工况解释可泵时间",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "二次岭回归拟合温度、缓凝和压力对合成稠化时间的交互影响。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考试验记录拟合代理，测试比较训练均值并用独立校准残差构造区间；查看温度缓凝交互项。",
      "effect": "时间交会图检查偏差",
      "trap": "示意时间没有现场小时单位，也没有按稠化仪标准判断施工窗口。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "稠化时间影响浆体可泵性，单一温度或固定时间不能代表不同配方条件。预测必须保留误差区间。",
      "effect": "区间覆盖揭示配方外推风险",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "配方工况解释可泵时间",
    "时间交会图检查偏差",
    "区间覆盖揭示配方外推风险"
  ],
  "extension": {
    "key": "cement-time",
    "task": "regression"
  },
  "references": [
    {
      "title": "SLB Thickening Time",
      "url": "https://glossary.slb.com/en/terms/t/thickening_time",
      "note": "支持稠化时间和可泵性的概念，示例不判断施工安全窗口。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "Cement-slurry thickening-time prediction",
    "stage": "Cementing",
    "intro": "Thickening time affects pumpability; one temperature or constant duration does not describe different formulations. Estimates need uncertainty intervals.",
    "concept": "Thickening time affects pumpability; one temperature or constant duration does not describe different formulations. Estimates need uncertainty intervals.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression fits temperature, retarder and pressure interactions affecting synthetic thickening time.",
    "why": "Thickening time affects pumpability; one temperature or constant duration does not describe different formulations. Estimates need uncertainty intervals.",
    "how": "Fit a surrogate to reference trials, compare with mean duration and construct independently calibrated intervals; inspect temperature-retarder interactions.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Temperature burden, Retarder index, Pressure index. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Illustrative times are not field hours and do not certify a construction window under consistometer standards. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Temperature burden",
        "unit": ""
      },
      {
        "name": "Retarder index",
        "unit": ""
      },
      {
        "name": "Pressure index",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Thickening-time illustration",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Temperature burden, Retarder index, Pressure index. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Conditions explain pumpability duration",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Quadratic ridge regression fits temperature, retarder and pressure interactions affecting synthetic thickening time.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit a surrogate to reference trials, compare with mean duration and construct independently calibrated intervals; inspect temperature-retarder interactions.",
        "effect": "Time crossplots inspect bias",
        "trap": "Illustrative times are not field hours and do not certify a construction window under consistometer standards."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Thickening time affects pumpability; one temperature or constant duration does not describe different formulations. Estimates need uncertainty intervals.",
        "effect": "Interval coverage reveals formulation extrapolation risk",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Conditions explain pumpability duration",
      "Time crossplots inspect bias",
      "Interval coverage reveals formulation extrapolation risk"
    ],
    "references": [
      {
        "title": "SLB Thickening Time",
        "url": "https://glossary.slb.com/en/terms/t/thickening_time",
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
