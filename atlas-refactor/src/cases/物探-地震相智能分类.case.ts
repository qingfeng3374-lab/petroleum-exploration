import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-s2",
  "sceneId": "s2",
  "name": "物探-地震相智能分类",
  "title": "地震相智能分类",
  "stage": "物探",
  "stageId": "seismic",
  "engine": "scene",
  "family": "shape",
  "method": "形态特征＋标准化 kNN",
  "methods": [
    "cv"
  ],
  "intro": "相带不是由一个振幅值定义；比较邻居和特征分布可解释模型为何把不同波形分到同一类。",
  "concept": "地震相是沉积环境在地震剖面上的响应，相带划分决定储层预测与井位优选，传统由解释员按反射结构、连续性、振幅特征人工归类。",
  "what": "从独立合成反射片段提取振幅与起伏形态，标准化kNN学习三类地震相。",
  "why": "相带不是由一个振幅值定义；比较邻居和特征分布可解释模型为何把不同波形分到同一类。",
  "how": "参考反射片段建立邻居库，测试片段按距离投票；改变噪声与k后检查混淆矩阵。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：振幅均方根、局部起伏、前后差异、振幅范围。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "三种简化波形不等同真实沉积相，尚未使用井标定或三维地震属性。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "振幅均方根",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "局部起伏",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "前后差异",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "振幅范围",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "地震相候选",
      "unit": ""
    }
  ],
  "classes": [
    "平行弱反射",
    "宽缓反射",
    "杂乱反射"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：振幅均方根、局部起伏、前后差异、振幅范围。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "反射波形解释形态差异",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "从独立合成反射片段提取振幅与起伏形态，标准化kNN学习三类地震相。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考反射片段建立邻居库，测试片段按距离投票；改变噪声与k后检查混淆矩阵。",
      "effect": "邻居投票给出相带依据",
      "trap": "三种简化波形不等同真实沉积相，尚未使用井标定或三维地震属性。"
    },
    {
      "name": "对照与人工复核",
      "do": "相带不是由一个振幅值定义；比较邻居和特征分布可解释模型为何把不同波形分到同一类。",
      "effect": "错分定位检验噪声敏感性",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "反射波形解释形态差异",
    "邻居投票给出相带依据",
    "错分定位检验噪声敏感性"
  ],
  "english": {
    "title": "Seismic facies classification",
    "stage": "Geophysics",
    "intro": "A facies is not defined by one amplitude. Neighbors and feature distributions explain assignments of different waveforms.",
    "concept": "Seismic facies summarize reflection patterns associated with depositional environments and guide reservoir prediction.",
    "method": "Shape features + standardized kNN",
    "what": "Standardized kNN learns three synthetic seismic facies from amplitude and roughness features.",
    "why": "A facies is not defined by one amplitude. Neighbors and feature distributions explain assignments of different waveforms.",
    "how": "Reference reflection segments form the neighbor bank. Test segments vote by distance; inspect confusion as noise and k change.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Amplitude RMS, Local roughness, Window contrast, Amplitude range. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "Three simplified waveforms are not real depositional facies; no well ties or 3D seismic attributes are used. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Amplitude RMS",
        "unit": ""
      },
      {
        "name": "Local roughness",
        "unit": ""
      },
      {
        "name": "Window contrast",
        "unit": ""
      },
      {
        "name": "Amplitude range",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Seismic facies",
        "unit": ""
      }
    ],
    "classes": [
      "Weak parallel",
      "Broad reflection",
      "Chaotic reflection"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Amplitude RMS, Local roughness, Window contrast, Amplitude range. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Waveforms explain reflection patterns",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Standardized kNN learns three synthetic seismic facies from amplitude and roughness features.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference reflection segments form the neighbor bank. Test segments vote by distance; inspect confusion as noise and k change.",
        "effect": "Neighbor votes support facies labels",
        "trap": "Three simplified waveforms are not real depositional facies; no well ties or 3D seismic attributes are used."
      },
      {
        "name": "Compare and review",
        "do": "A facies is not defined by one amplitude. Neighbors and feature distributions explain assignments of different waveforms.",
        "effect": "Misclassification reveals noise sensitivity",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Waveforms explain reflection patterns",
      "Neighbor votes support facies labels",
      "Misclassification reveals noise sensitivity"
    ]
  }
} satisfies SceneCaseDef;
