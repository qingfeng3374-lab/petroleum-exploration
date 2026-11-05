import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-m4",
  "sceneId": "m4",
  "name": "录井-钻时曲线地层划分",
  "title": "钻时曲线地层划分",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "boundary",
  "method": "多尺度窗口特征＋逻辑回归界面检测",
  "methods": [
    "ts"
  ],
  "intro": "单点钻时跳变也可能来自钻压调整；多尺度持续变化与独立参考标注有助于减少噪声误判。",
  "concept": "钻时（每米钻进耗时）间接反映岩石可钻性，在录井阶段是判断岩性变化、卡取层界面的重要依据。",
  "what": "逻辑回归从钻时曲线的多尺度左右窗差学习层界邻域特征。",
  "why": "单点钻时跳变也可能来自钻压调整；多尺度持续变化与独立参考标注有助于减少噪声误判。",
  "how": "参考曲线训练界面分类器，测试曲线逐窗打分，阈值调节后对照相邻差分规则。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：短窗均值差、长窗均值差、相邻跳变、局部斜率。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "曲线为无量纲模拟钻时，不执行岩屑迟到校正，也不自动命名真实地层。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "短窗均值差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "长窗均值差",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "相邻跳变",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部斜率",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "层界邻域",
      "unit": ""
    }
  ],
  "classes": [
    "层内",
    "界面候选"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：短窗均值差、长窗均值差、相邻跳变、局部斜率。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "钻时轨迹与候选位置联动",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "逻辑回归从钻时曲线的多尺度左右窗差学习层界邻域特征。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考曲线训练界面分类器，测试曲线逐窗打分，阈值调节后对照相邻差分规则。",
      "effect": "窗口贡献说明界面证据",
      "trap": "曲线为无量纲模拟钻时，不执行岩屑迟到校正，也不自动命名真实地层。"
    },
    {
      "name": "对照与人工复核",
      "do": "单点钻时跳变也可能来自钻压调整；多尺度持续变化与独立参考标注有助于减少噪声误判。",
      "effect": "真值邻域检查漏检误检",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "钻时轨迹与候选位置联动",
    "窗口贡献说明界面证据",
    "真值邻域检查漏检误检"
  ],
  "english": {
    "title": "Formation segmentation from drilling time",
    "stage": "Mud Logging",
    "intro": "A drilling-time jump can reflect parameter adjustment. Persistent multiscale changes and independent labels help reject noise.",
    "concept": "Time spent drilling each meter indirectly reflects drillability and changes in lithology.",
    "method": "Multiscale windows + logistic boundary detection",
    "what": "Logistic regression learns boundary neighborhoods from multiscale left/right drilling-time contrasts.",
    "why": "A drilling-time jump can reflect parameter adjustment. Persistent multiscale changes and independent labels help reject noise.",
    "how": "Reference curves train a boundary classifier. Score test windows and compare adjustable thresholds with adjacent-difference rules.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Short-window contrast, Long-window contrast, Adjacent jump, Local slope. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "The curve is a dimensionless drilling-time simulation; it does not correct cuttings lag or name real formations. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Short-window contrast",
        "unit": ""
      },
      {
        "name": "Long-window contrast",
        "unit": ""
      },
      {
        "name": "Adjacent jump",
        "unit": ""
      },
      {
        "name": "Local slope",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Boundary neighborhood",
        "unit": ""
      }
    ],
    "classes": [
      "Within layer",
      "Boundary candidate"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Short-window contrast, Long-window contrast, Adjacent jump, Local slope. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Link drilling-time tracks and candidate positions",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Logistic regression learns boundary neighborhoods from multiscale left/right drilling-time contrasts.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference curves train a boundary classifier. Score test windows and compare adjustable thresholds with adjacent-difference rules.",
        "effect": "Window contributions explain boundary evidence",
        "trap": "The curve is a dimensionless drilling-time simulation; it does not correct cuttings lag or name real formations."
      },
      {
        "name": "Compare and review",
        "do": "A drilling-time jump can reflect parameter adjustment. Persistent multiscale changes and independent labels help reject noise.",
        "effect": "Labeled neighborhoods reveal misses and false detections",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Link drilling-time tracks and candidate positions",
      "Window contributions explain boundary evidence",
      "Labeled neighborhoods reveal misses and false detections"
    ]
  }
} satisfies SceneCaseDef;
