import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-co4",
  "sceneId": "co4",
  "name": "完井-智能完井滑套控制策略",
  "title": "智能完井滑套控制策略",
  "stage": "完井",
  "stageId": "completion",
  "engine": "scene",
  "family": "control",
  "method": "表格 Q-learning＋动作约束",
  "methods": [
    "opt"
  ],
  "intro": "持续全开会提前消耗压力并增加产水；控制策略需要权衡当前产出与后续状态。",
  "concept": "智能完井通过多段滑套控制各段产液，理论上可抑制出水、均衡贡献，但滑套启闭时序的组合空间极大。",
  "what": "表格Q-learning在24个离散含水—压力状态学习三个滑套动作的长期回报。",
  "why": "持续全开会提前消耗压力并增加产水；控制策略需要权衡当前产出与后续状态。",
  "how": "450个合成训练回合更新Q表，测试按动作约束选择最大Q值，与相同扰动下持续全开策略比较。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：当前含水比例、当前压力比例、滑套开度动作。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "24状态玩具环境不是储层数值模拟器，奖励权重不能直接用作真实滑套控制目标。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "当前含水比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "当前压力比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "滑套开度动作",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "模拟净收益",
      "unit": ""
    }
  ],
  "classes": [
    "关闭",
    "半开",
    "全开"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：当前含水比例、当前压力比例、滑套开度动作。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "含水轨迹解释状态演化",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "表格Q-learning在24个离散含水—压力状态学习三个滑套动作的长期回报。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "450个合成训练回合更新Q表，测试按动作约束选择最大Q值，与相同扰动下持续全开策略比较。",
      "effect": "当前状态Q值解释动作选择",
      "trap": "24状态玩具环境不是储层数值模拟器，奖励权重不能直接用作真实滑套控制目标。"
    },
    {
      "name": "对照与人工复核",
      "do": "持续全开会提前消耗压力并增加产水；控制策略需要权衡当前产出与后续状态。",
      "effect": "累计净回报检查长期取舍",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "含水轨迹解释状态演化",
    "当前状态Q值解释动作选择",
    "累计净回报检查长期取舍"
  ],
  "english": {
    "title": "Intelligent-completion sleeve control",
    "stage": "Completion",
    "intro": "Always opening can deplete pressure and increase water; control must balance current output and future state.",
    "concept": "Segmented sleeves can balance inflow and limit water, but control sequences interact across intervals.",
    "method": "Tabular Q-learning + action constraints",
    "what": "Tabular Q-learning learns long-run values for three valve actions in 24 discrete water/pressure states.",
    "why": "Always opening can deplete pressure and increase water; control must balance current output and future state.",
    "how": "450 synthetic training episodes update the Q-table. Held-out control selects the best allowed Q action and compares with always-open under identical disturbances.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Water fraction, Pressure fraction, Valve action. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "The 24-state toy environment is not a reservoir simulator; reward weights cannot guide real valve control. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Water fraction",
        "unit": ""
      },
      {
        "name": "Pressure fraction",
        "unit": ""
      },
      {
        "name": "Valve action",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Simulated net reward",
        "unit": ""
      }
    ],
    "classes": [
      "Closed",
      "Half open",
      "Fully open"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Water fraction, Pressure fraction, Valve action. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Water trajectories explain state evolution",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "Tabular Q-learning learns long-run values for three valve actions in 24 discrete water/pressure states.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "450 synthetic training episodes update the Q-table. Held-out control selects the best allowed Q action and compares with always-open under identical disturbances.",
        "effect": "State Q-values explain action selection",
        "trap": "The 24-state toy environment is not a reservoir simulator; reward weights cannot guide real valve control."
      },
      {
        "name": "Compare and review",
        "do": "Always opening can deplete pressure and increase water; control must balance current output and future state.",
        "effect": "Cumulative net rewards inspect long-term tradeoffs",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Water trajectories explain state evolution",
      "State Q-values explain action selection",
      "Cumulative net rewards inspect long-term tradeoffs"
    ]
  }
} satisfies SceneCaseDef;
