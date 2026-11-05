import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "completion-ai",
  "sceneId": "co1",
  "name": "完井-完井方式相似案例优选",
  "engine": "chapter",
  "kind": "classification",
  "task": "completion",
  "methods": [
    "opt"
  ],
  "features": [
    {
      "name": "渗透性指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "出砂倾向",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "岩石稳定性",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [
    "裸眼完井",
    "套管射孔",
    "防砂完井"
  ],
  "stage": "完井",
  "title": "完井方式相似案例优选",
  "method": "kNN · 历史方案分类",
  "intro": "完井方式受储层和岩石稳定性共同影响，可先查找相似历史条件来解释方案来源。",
  "what": "kNN 从渗透性、出砂倾向和稳定性检索近邻，给出三类历史方案的投票候选。",
  "why": "多条件决定适配性，单指标分支会遗漏信息。近邻能综合条件并展示支持案例，但学到的是历史选择，不是证明方案最优。",
  "how": "参考案例拟合标准化参数，按欧氏距离选 k 个近邻计票；与只按出砂倾向的基线比较，并测试分布变化后的误判。",
  "concept": "裸眼、套管射孔与防砂结构解决不同问题，分类结果仍需工程约束审核。",
  "data": "合成储层条件与三类方案标签，标签代表教学中的历史选择。",
  "limit": "不是经济或安全优化器，不生成施工设计书，也不能把票数解释为成功率。",
  "visuals": [
    "特征散点展示类别重叠。",
    "预测、基线与真值条带对齐。",
    "近邻投票或权重贡献解释单个候选。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "合成储层条件与三类方案标签，标签代表教学中的历史选择。",
      "effect": "特征散点展示类别重叠。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "参考案例拟合标准化参数，按欧氏距离选 k 个近邻计票；与只按出砂倾向的基线比较，并测试分布变化后的误判。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不是经济或安全优化器，不生成施工设计书，也不能把票数解释为成功率。"
    },
    {
      "name": "应用于新观测",
      "do": "kNN 从渗透性、出砂倾向和稳定性检索近邻，给出三类历史方案的投票候选。",
      "effect": "预测、基线与真值条带对齐。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "多条件决定适配性，单指标分支会遗漏信息。近邻能综合条件并展示支持案例，但学到的是历史选择，不是证明方案最优。",
      "effect": "近邻投票或权重贡献解释单个候选。",
      "trap": "不是经济或安全优化器，不生成施工设计书，也不能把票数解释为成功率。"
    }
  ],
  "english": {
    "stage": "Completion",
    "title": "Completion selection from similar cases",
    "method": "kNN · historical-design classification",
    "intro": "Completion choices depend on reservoir conditions and stability. Similar historical cases expose the precedent.",
    "what": "kNN retrieves neighbours using permeability, sanding tendency and stability to vote for historical design classes.",
    "why": "Multiple conditions determine suitability. Neighbours combine them and expose supporting cases, but learn historical choices rather than prove optimality.",
    "how": "Historical references fit scaling before distance-based voting, evaluated against a sanding-only rule and a shift preset.",
    "concept": "Open-hole, cased-perforated and sand-control designs address different problems and need engineering review.",
    "data": "Synthetic conditions and design labels represent historical choices in a teaching scenario.",
    "limit": "This is not an economic or safety optimizer and does not issue designs or success probabilities.",
    "features": [
      {
        "name": "Permeability index"
      },
      {
        "name": "Sanding tendency"
      },
      {
        "name": "Rock stability"
      }
    ],
    "classes": [
      "Open-hole",
      "Cased and perforated",
      "Sand control"
    ],
    "visuals": [
      "Feature scatter reveals overlapping classes.",
      "Model, baseline and truth strips are aligned.",
      "Neighbour votes or weight contributions explain a candidate."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Synthetic conditions and design labels represent historical choices in a teaching scenario.",
        "effect": "Feature scatter reveals overlapping classes.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "Historical references fit scaling before distance-based voting, evaluated against a sanding-only rule and a shift preset.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "This is not an economic or safety optimizer and does not issue designs or success probabilities."
      },
      {
        "name": "Apply to new observations",
        "do": "kNN retrieves neighbours using permeability, sanding tendency and stability to vote for historical design classes.",
        "effect": "Model, baseline and truth strips are aligned.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Multiple conditions determine suitability. Neighbours combine them and expose supporting cases, but learn historical choices rather than prove optimality.",
        "effect": "Neighbour votes or weight contributions explain a candidate.",
        "trap": "This is not an economic or safety optimizer and does not issue designs or success probabilities."
      }
    ]
  }
} satisfies ChapterCaseDef;
