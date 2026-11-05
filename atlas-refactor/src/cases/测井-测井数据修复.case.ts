import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-w5",
  "sceneId": "w5",
  "name": "测井-测井数据修复",
  "title": "测井数据修复",
  "stage": "测井",
  "stageId": "welllog",
  "engine": "scene",
  "family": "repair",
  "method": "跨曲线岭回归插补",
  "methods": [
    "ts"
  ],
  "intro": "长缺口内简单线性插值无法恢复层内变化；仍存在的辅助曲线可提供额外证据。",
  "concept": "实际测井曲线常有缺失段、异常跳变与井径垮塌段，直接进入解释会造成参数失真，传统靠人工插值与经验修补。",
  "what": "岭回归从完整参考井学习其他曲线到目标曲线的跨曲线关系。",
  "why": "长缺口内简单线性插值无法恢复层内变化；仍存在的辅助曲线可提供额外证据。",
  "how": "测试井人为遮住两个连续区间；模型不读取缺失目标值，仅从辅助曲线补全，并与缺口端点插值比较。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：密度辅助曲线、中子辅助曲线、已知深度相位。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "辅助曲线失配时插补也会失真；合成深度相位已知，不声称修复真实坏井段。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "密度辅助曲线",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "中子辅助曲线",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "已知深度相位",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "补全目标曲线",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：密度辅助曲线、中子辅助曲线、已知深度相位。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "缺失区间与可见曲线分开显示",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "岭回归从完整参考井学习其他曲线到目标曲线的跨曲线关系。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "测试井人为遮住两个连续区间；模型不读取缺失目标值，仅从辅助曲线补全，并与缺口端点插值比较。",
      "effect": "重建与端点插值叠加比较",
      "trap": "辅助曲线失配时插补也会失真；合成深度相位已知，不声称修复真实坏井段。"
    },
    {
      "name": "对照与人工复核",
      "do": "长缺口内简单线性插值无法恢复层内变化；仍存在的辅助曲线可提供额外证据。",
      "effect": "只在遮挡区计算误差",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "缺失区间与可见曲线分开显示",
    "重建与端点插值叠加比较",
    "只在遮挡区计算误差"
  ],
  "english": {
    "title": "Well-log data reconstruction",
    "stage": "Well Logging",
    "intro": "Linear interpolation cannot recover changes inside long gaps; available auxiliary logs provide additional evidence.",
    "concept": "Missing intervals, abrupt artifacts and washouts can distort downstream interpretation.",
    "method": "Cross-log ridge-regression imputation",
    "what": "Ridge regression learns cross-log relationships from complete reference wells.",
    "why": "Linear interpolation cannot recover changes inside long gaps; available auxiliary logs provide additional evidence.",
    "how": "Mask two continuous test-well intervals. Predict only from auxiliary logs without reading hidden targets, comparing against endpoint interpolation.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Density auxiliary log, Neutron auxiliary log, Known depth phase. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Misaligned auxiliary logs distort imputation; synthetic depth phase is known and real bad-hole repair is not established. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Density auxiliary log",
        "unit": ""
      },
      {
        "name": "Neutron auxiliary log",
        "unit": ""
      },
      {
        "name": "Known depth phase",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Reconstructed target log",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Density auxiliary log, Neutron auxiliary log, Known depth phase. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Separate gaps from visible observations",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Ridge regression learns cross-log relationships from complete reference wells.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Mask two continuous test-well intervals. Predict only from auxiliary logs without reading hidden targets, comparing against endpoint interpolation.",
        "effect": "Overlay reconstruction and endpoint interpolation",
        "trap": "Misaligned auxiliary logs distort imputation; synthetic depth phase is known and real bad-hole repair is not established."
      },
      {
        "name": "Compare and review",
        "do": "Linear interpolation cannot recover changes inside long gaps; available auxiliary logs provide additional evidence.",
        "effect": "Evaluate error only inside masked intervals",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Separate gaps from visible observations",
      "Overlay reconstruction and endpoint interpolation",
      "Evaluate error only inside masked intervals"
    ]
  }
} satisfies SceneCaseDef;
