import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-co2",
  "sceneId": "e3",
  "name": "增采-CO2驱压力配注响应筛选",
  "title": "CO2驱压力配注响应筛选",
  "stage": "增采",
  "stageId": "eor",
  "engine": "scene",
  "family": "optimize",
  "method": "双响应岭回归代理＋约束帕累托搜索",
  "methods": [
    "opt"
  ],
  "intro": "CO2驱受压力和流体条件影响，增加注入强度也伴随资源代价。",
  "concept": "CO2驱受压力和流体条件影响，增加注入强度也伴随资源代价。收益与资源应同时展示。",
  "what": "双响应岭回归近似压力配注到合成驱油响应和资源消耗的关系。",
  "why": "CO2驱受压力和流体条件影响，增加注入强度也伴随资源代价。收益与资源应同时展示。",
  "how": "参考代理试验拟合两个输出，约束网格搜索预算与资源上限内的候选，再显示非支配点。",
  "data": "独立合成参考、校准和测试记录。输入包括注入压力指标、配注强度指标、流体不利条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "没有相态闪蒸、细管实验或实际MMP，不能据此确定注入压力。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "注入压力指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "配注强度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "流体不利条件",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "驱油响应指数",
      "unit": ""
    },
    {
      "name": "注入资源指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考、校准和测试记录。输入包括注入压力指标、配注强度指标、流体不利条件；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "压力配注空间展示作用条件",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "双响应岭回归近似压力配注到合成驱油响应和资源消耗的关系。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考代理试验拟合两个输出，约束网格搜索预算与资源上限内的候选，再显示非支配点。",
      "effect": "双响应解释效益与资源",
      "trap": "没有相态闪蒸、细管实验或实际MMP，不能据此确定注入压力。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "CO2驱受压力和流体条件影响，增加注入强度也伴随资源代价。收益与资源应同时展示。",
      "effect": "帕累托点展示可行权衡",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "压力配注空间展示作用条件",
    "双响应解释效益与资源",
    "帕累托点展示可行权衡"
  ],
  "extension": {
    "key": "co2",
    "task": "design",
    "constraint": {
      "weights": [
        0.55,
        0.45
      ],
      "secondMax": 60
    }
  },
  "references": [
    {
      "title": "US DOE Enhanced Oil Recovery",
      "url": "https://www.energy.gov/hgeo/enhanced-oil-recovery",
      "note": "支持CO2驱油背景，合成响应不代表矿场增油量。"
    },
    {
      "title": "SLB Minimum Miscibility Pressure",
      "url": "https://glossary.slb.com/en/Terms/m/minimum_miscibility_pressure.aspx",
      "note": "支持压力、温度与组分相关的混相概念，不估计真实MMP。"
    },
    {
      "title": "scikit-learn Ridge Regression",
      "url": "https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification",
      "note": "方法依据：带正则化的回归与多项式特征；不调用Python服务。"
    }
  ],
  "english": {
    "title": "CO2-flood pressure-allocation screening",
    "stage": "Enhanced Recovery",
    "intro": "CO2-flood response depends on pressure and fluid conditions; stronger injection also uses resources. Benefit and resource demand need joint presentation.",
    "concept": "CO2-flood response depends on pressure and fluid conditions; stronger injection also uses resources. Benefit and resource demand need joint presentation.",
    "method": "Two-response ridge surrogate + constrained Pareto search",
    "what": "Two ridge surrogates approximate synthetic recovery response and resource use from pressure and allocation.",
    "why": "CO2-flood response depends on pressure and fluid conditions; stronger injection also uses resources. Benefit and resource demand need joint presentation.",
    "how": "Fit two outputs to reference surrogate trials and search within budget and resource limits, displaying nondominated points.",
    "data": "Independent synthetic reference, calibration and test records. Inputs include Injection-pressure index, Allocation intensity, Fluid-condition burden. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Phase flash, slim-tube testing and actual MMP are absent; no operational injection pressure is determined. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Injection-pressure index",
        "unit": ""
      },
      {
        "name": "Allocation intensity",
        "unit": ""
      },
      {
        "name": "Fluid-condition burden",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Recovery-response index",
        "unit": ""
      },
      {
        "name": "Injection-resource index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference, calibration and test records. Inputs include Injection-pressure index, Allocation intensity, Fluid-condition burden. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Settings show pressure-allocation conditions",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Two ridge surrogates approximate synthetic recovery response and resource use from pressure and allocation.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Fit two outputs to reference surrogate trials and search within budget and resource limits, displaying nondominated points.",
        "effect": "Dual responses explain benefit and resource use",
        "trap": "Phase flash, slim-tube testing and actual MMP are absent; no operational injection pressure is determined."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "CO2-flood response depends on pressure and fluid conditions; stronger injection also uses resources. Benefit and resource demand need joint presentation.",
        "effect": "Pareto points show feasible tradeoffs",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Settings show pressure-allocation conditions",
      "Dual responses explain benefit and resource use",
      "Pareto points show feasible tradeoffs"
    ],
    "references": [
      {
        "title": "US DOE Enhanced Oil Recovery",
        "url": "https://www.energy.gov/hgeo/enhanced-oil-recovery",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "SLB Minimum Miscibility Pressure",
        "url": "https://glossary.slb.com/en/Terms/m/minimum_miscibility_pressure.aspx",
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
