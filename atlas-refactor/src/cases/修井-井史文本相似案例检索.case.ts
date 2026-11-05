import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "workover-ai",
  "sceneId": "wo1",
  "name": "修井-井史文本相似案例检索",
  "engine": "chapter",
  "kind": "retrieval",
  "task": "workover",
  "methods": [
    "nlp"
  ],
  "features": [
    {
      "name": "词项权重",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "classes": [
    "检漏与管柱维护",
    "清防蜡作业",
    "泵检修"
  ],
  "stage": "修井",
  "title": "井史文本相似案例检索",
  "method": "TF-IDF · 余弦相似度 · 加权投票",
  "intro": "症状文本可以对应多种成因，寻找可追查的相似井史比直接生成一份方案更有依据。",
  "what": "历史井史拟合 TF-IDF，按余弦相似度检索，再用相似度给历史方案加权投票。",
  "why": "单关键词会遗漏症状组合。多词项检索保留支持记录，词项贡献可以说明为什么这些案例排在前面。",
  "how": "训练语料建立词表和 IDF，查询映射到已知词；归一化向量点积得到相似度，没有匹配词就不输出方案。",
  "concept": "文本相似不代表设备状态相同，也不代表处置方案已经得到现场确认。",
  "data": "空格分词的合成中文井史和独立评估文本，可输入多个症状词查询。",
  "limit": "不是大语言模型或诊断系统，不会自动理解未见同义词，不提供施工决定。",
  "visuals": [
    "词项贡献定位匹配依据。",
    "相似案例条形图展示真实余弦相似度。",
    "独立文本集混淆矩阵揭示方案混淆。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "空格分词的合成中文井史和独立评估文本，可输入多个症状词查询。",
      "effect": "词项贡献定位匹配依据。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "训练语料建立词表和 IDF，查询映射到已知词；归一化向量点积得到相似度，没有匹配词就不输出方案。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "不是大语言模型或诊断系统，不会自动理解未见同义词，不提供施工决定。"
    },
    {
      "name": "检索历史证据",
      "do": "历史井史拟合 TF-IDF，按余弦相似度检索，再用相似度给历史方案加权投票。",
      "effect": "相似案例条形图展示真实余弦相似度。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "单关键词会遗漏症状组合。多词项检索保留支持记录，词项贡献可以说明为什么这些案例排在前面。",
      "effect": "独立文本集混淆矩阵揭示方案混淆。",
      "trap": "不是大语言模型或诊断系统，不会自动理解未见同义词，不提供施工决定。"
    }
  ],
  "english": {
    "stage": "Workover",
    "title": "Similar-case retrieval from well histories",
    "method": "TF-IDF · cosine similarity · weighted voting",
    "intro": "Symptoms can have multiple causes. Inspectable historical matches provide evidence rather than unsupported generated plans.",
    "what": "Historical texts fit TF-IDF, cosine similarity retrieves neighbours, and similarities weight design votes.",
    "why": "One keyword misses combinations. Multi-term retrieval preserves supporting records, and term contributions explain the ranking.",
    "how": "Historical documents fit vocabulary and IDF. Normalized dot products score known query terms; no matched terms means no suggestion.",
    "concept": "Textual similarity does not establish equipment condition or a field-approved intervention.",
    "data": "Space-tokenized synthetic Chinese histories support multi-symptom queries and independent text evaluation.",
    "limit": "This is not a language model or diagnostic system. Unseen synonyms are not inferred and no operating decisions are issued.",
    "features": [
      {
        "name": "Term weight"
      }
    ],
    "classes": [
      "Leak and tubing inspection",
      "Wax treatment",
      "Pump maintenance"
    ],
    "visuals": [
      "Term contributions identify matching evidence.",
      "Neighbour bars show actual cosine similarities.",
      "A held-out confusion matrix reveals confused interventions."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Space-tokenized synthetic Chinese histories support multi-symptom queries and independent text evaluation.",
        "effect": "Term contributions identify matching evidence.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "Historical documents fit vocabulary and IDF. Normalized dot products score known query terms; no matched terms means no suggestion.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "This is not a language model or diagnostic system. Unseen synonyms are not inferred and no operating decisions are issued."
      },
      {
        "name": "Retrieve historical evidence",
        "do": "Historical texts fit TF-IDF, cosine similarity retrieves neighbours, and similarities weight design votes.",
        "effect": "Neighbour bars show actual cosine similarities.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "One keyword misses combinations. Multi-term retrieval preserves supporting records, and term contributions explain the ranking.",
        "effect": "A held-out confusion matrix reveals confused interventions.",
        "trap": "This is not a language model or diagnostic system. Unseen synonyms are not inferred and no operating decisions are issued."
      }
    ]
  }
} satisfies ChapterCaseDef;
