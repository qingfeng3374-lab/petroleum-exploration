import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-d3",
  "sceneId": "d3",
  "name": "钻井-井眼轨迹智能控制",
  "title": "井眼轨迹智能控制",
  "stage": "钻井",
  "stageId": "drilling",
  "engine": "scene",
  "family": "control",
  "method": "岭回归系统辨识＋受限滚动控制",
  "methods": [
    "opt"
  ],
  "intro": "固定工具面不能抵消地层响应变化，控制需要同时考虑偏移与动作变化约束。",
  "concept": "定向钻井要求实钻轨迹落在靶区窗口内，传统靠钻井工程师根据随钻测量数据手动调整工具面与滑动段长度。",
  "what": "岭回归辨识状态与工具面动作到下一步偏移变化的响应模型。",
  "why": "固定工具面不能抵消地层响应变化，控制需要同时考虑偏移与动作变化约束。",
  "how": "用参考响应拟合一步模型，每步枚举受限动作最小化预测偏移平方与动作代价，再在独立扰动模拟器推进。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：当前横向偏移、工具面动作、观测漂移。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "简化横向状态模型不是完整井眼几何或工业MPC，预算滑条控制允许动作变化。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "当前横向偏移",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "工具面动作",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "观测漂移",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "轨迹偏移",
      "unit": ""
    }
  ],
  "classes": [],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：当前横向偏移、工具面动作、观测漂移。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "轨迹曲线展示偏移收敛",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "岭回归辨识状态与工具面动作到下一步偏移变化的响应模型。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "用参考响应拟合一步模型，每步枚举受限动作最小化预测偏移平方与动作代价，再在独立扰动模拟器推进。",
      "effect": "受限动作序列解释纠偏",
      "trap": "简化横向状态模型不是完整井眼几何或工业MPC，预算滑条控制允许动作变化。"
    },
    {
      "name": "对照与人工复核",
      "do": "固定工具面不能抵消地层响应变化，控制需要同时考虑偏移与动作变化约束。",
      "effect": "固定工具面对照检查控制收益",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "轨迹曲线展示偏移收敛",
    "受限动作序列解释纠偏",
    "固定工具面对照检查控制收益"
  ],
  "english": {
    "title": "Directional trajectory control",
    "stage": "Drilling",
    "intro": "A fixed toolface cannot compensate for changing formation response. Control must balance tracking and action-change limits.",
    "concept": "Directional drilling adjusts toolface and sliding intervals to keep the borehole within target windows.",
    "method": "Ridge system identification + constrained receding control",
    "what": "Ridge regression identifies the response from state and toolface action to the next offset change.",
    "why": "A fixed toolface cannot compensate for changing formation response. Control must balance tracking and action-change limits.",
    "how": "Fit a one-step model on reference responses, enumerate bounded actions minimizing predicted squared offset plus action cost, then advance an independently perturbed simulator.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Lateral offset, Toolface action, Observed drift. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "A simplified lateral model is not complete well geometry or industrial MPC; the budget slider limits action changes. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Lateral offset",
        "unit": ""
      },
      {
        "name": "Toolface action",
        "unit": ""
      },
      {
        "name": "Observed drift",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Trajectory offset",
        "unit": ""
      }
    ],
    "classes": [],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Lateral offset, Toolface action, Observed drift. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Trajectory shows offset convergence",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Ridge regression identifies the response from state and toolface action to the next offset change.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Fit a one-step model on reference responses, enumerate bounded actions minimizing predicted squared offset plus action cost, then advance an independently perturbed simulator.",
        "effect": "Bounded action sequences explain correction",
        "trap": "A simplified lateral model is not complete well geometry or industrial MPC; the budget slider limits action changes."
      },
      {
        "name": "Compare and review",
        "do": "A fixed toolface cannot compensate for changing formation response. Control must balance tracking and action-change limits.",
        "effect": "Compare against a fixed-toolface baseline",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Trajectory shows offset convergence",
      "Bounded action sequences explain correction",
      "Compare against a fixed-toolface baseline"
    ]
  }
} satisfies SceneCaseDef;
