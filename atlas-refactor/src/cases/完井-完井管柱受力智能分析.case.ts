import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-co3",
  "sceneId": "co3",
  "name": "完井-完井管柱受力智能分析",
  "title": "完井管柱受力智能分析",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "regression",
  "method": "二次特征岭回归＋独立区间校准",
  "methods": [
    "opt"
  ],
  "intro": "多工况载荷叠加可能放大风险，仅检查一个工况不足以代表管柱完整性。",
  "concept": "生产管柱在温度、压力变化下产生轴向力与变形，设计不当会导致管柱屈曲、接头泄漏甚至断脱。",
  "what": "二次岭回归学习温压与管柱载荷对等效应力指数的耦合作用。",
  "why": "多工况载荷叠加可能放大风险，仅检查一个工况不足以代表管柱完整性。",
  "how": "参考工况试验拟合多项式代理，对测试工况给出应力估计和校准区间，检查交互项贡献。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：温差载荷指标、压差载荷指标、轴向载荷指标、壁厚裕度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "没有接头、屈曲或材料规范求解，应力指数不能用于验算安全系数。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "温差载荷指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "压差载荷指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "轴向载荷指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "壁厚裕度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "等效应力指数",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：温差载荷指标、压差载荷指标、轴向载荷指标、壁厚裕度指标。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "温压与载荷展示组合空间",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "二次岭回归学习温压与管柱载荷对等效应力指数的耦合作用。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考工况试验拟合多项式代理，对测试工况给出应力估计和校准区间，检查交互项贡献。",
      "effect": "应力交会图检查代理偏差",
      "trap": "没有接头、屈曲或材料规范求解，应力指数不能用于验算安全系数。"
    },
    {
      "name": "对照与人工复核",
      "do": "多工况载荷叠加可能放大风险，仅检查一个工况不足以代表管柱完整性。",
      "effect": "区间与交互贡献帮助筛查高载荷",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "温压与载荷展示组合空间",
    "应力交会图检查代理偏差",
    "区间与交互贡献帮助筛查高载荷"
  ],
  "english": {
    "title": "Completion-string load analysis",
    "stage": "Completion",
    "intro": "Combined loads can amplify risk; checking one condition does not establish string integrity.",
    "concept": "Temperature and pressure changes generate tubing loads and deformation that can cause buckling or leakage.",
    "method": "Quadratic ridge regression + independent interval calibration",
    "what": "Quadratic ridge regression learns coupled temperature, pressure and string-load effects on a stress index.",
    "why": "Combined loads can amplify risk; checking one condition does not establish string integrity.",
    "how": "Reference load trials fit a polynomial surrogate. Held-out cases receive stress estimates and calibrated intervals with interaction-term inspection.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Temperature load, Pressure load, Axial load, Wall-thickness margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "There is no connector, buckling or material-code solver; the stress index cannot certify safety factors. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Temperature load",
        "unit": ""
      },
      {
        "name": "Pressure load",
        "unit": ""
      },
      {
        "name": "Axial load",
        "unit": ""
      },
      {
        "name": "Wall-thickness margin",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Equivalent stress index",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Temperature load, Pressure load, Axial load, Wall-thickness margin. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Temperature and load tracks show combinations",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Quadratic ridge regression learns coupled temperature, pressure and string-load effects on a stress index.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference load trials fit a polynomial surrogate. Held-out cases receive stress estimates and calibrated intervals with interaction-term inspection.",
        "effect": "Stress crossplots inspect surrogate error",
        "trap": "There is no connector, buckling or material-code solver; the stress index cannot certify safety factors."
      },
      {
        "name": "Compare and review",
        "do": "Combined loads can amplify risk; checking one condition does not establish string integrity.",
        "effect": "Intervals and interaction contributions support high-load screening",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Temperature and load tracks show combinations",
      "Stress crossplots inspect surrogate error",
      "Intervals and interaction contributions support high-load screening"
    ]
  }
} satisfies SceneCaseDef;
