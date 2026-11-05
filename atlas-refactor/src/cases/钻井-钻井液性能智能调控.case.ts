import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-d5",
  "sceneId": "d5",
  "name": "钻井-钻井液性能智能调控",
  "title": "钻井液性能智能调控",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "optimize",
  "method": "二次岭回归代理＋约束网格搜索",
  "methods": [
    "ts",
    "opt"
  ],
  "intro": "单独提高一种处理剂不一定同时改善携岩和滤失，多参数组合需要在成本约束内筛选。",
  "concept": "钻井液的密度、黏度、滤失量直接影响井壁稳定与携岩能力，现场按班测量并人工调整处理剂加量。",
  "what": "二次岭回归代理学习处理剂组合与合成流变—滤失综合性能。",
  "why": "单独提高一种处理剂不一定同时改善携岩和滤失，多参数组合需要在成本约束内筛选。",
  "how": "固定温度条件，对21×21加量组合预测综合性能；先按预算过滤再找高响应点。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：增黏剂加量指标、降滤失剂加量指标、循环温度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "综合性能函数与预算是教学设定，不是可直接配制的钻井液配方。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "增黏剂加量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "降滤失剂加量指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "循环温度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "性能综合指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：增黏剂加量指标、降滤失剂加量指标、循环温度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "输入轨迹说明配方空间",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归代理学习处理剂组合与合成流变—滤失综合性能。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "固定温度条件，对21×21加量组合预测综合性能；先按预算过滤再找高响应点。",
      "effect": "响应热图展示加量耦合",
      "trap": "综合性能函数与预算是教学设定，不是可直接配制的钻井液配方。"
    },
    {
      "name": "对照与人工复核",
      "do": "单独提高一种处理剂不一定同时改善携岩和滤失，多参数组合需要在成本约束内筛选。",
      "effect": "预算遮罩与误差阻止盲目推荐",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "输入轨迹说明配方空间",
    "响应热图展示加量耦合",
    "预算遮罩与误差阻止盲目推荐"
  ],
  "english": {
    "title": "Drilling-fluid control",
    "stage": "Drilling",
    "intro": "Increasing one additive need not improve both transport and filtration; combinations need cost-constrained screening.",
    "concept": "Fluid density, viscosity and filtration affect wellbore stability and cuttings transport.",
    "method": "Quadratic ridge surrogate + constrained grid search",
    "what": "A quadratic ridge surrogate learns synthetic rheology/filtration performance from additive combinations.",
    "why": "Increasing one additive need not improve both transport and filtration; combinations need cost-constrained screening.",
    "how": "At fixed temperature, predict a 21×21 dose grid, filter by budget and select a high-response feasible point.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Viscosifier dose, Filtrate reducer dose, Circulation temperature. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "The performance function and budget are teaching assumptions, not a field-ready mud formulation. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Viscosifier dose",
        "unit": ""
      },
      {
        "name": "Filtrate reducer dose",
        "unit": ""
      },
      {
        "name": "Circulation temperature",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Performance index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Viscosifier dose, Filtrate reducer dose, Circulation temperature. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Inputs explain the formulation space",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "A quadratic ridge surrogate learns synthetic rheology/filtration performance from additive combinations.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "At fixed temperature, predict a 21×21 dose grid, filter by budget and select a high-response feasible point.",
        "effect": "Heatmap shows additive interactions",
        "trap": "The performance function and budget are teaching assumptions, not a field-ready mud formulation."
      },
      {
        "name": "Compare and review",
        "do": "Increasing one additive need not improve both transport and filtration; combinations need cost-constrained screening.",
        "effect": "Budget masks and errors qualify recommendations",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Inputs explain the formulation space",
      "Heatmap shows additive interactions",
      "Budget masks and errors qualify recommendations"
    ]
  }
} satisfies SceneCaseDef;
