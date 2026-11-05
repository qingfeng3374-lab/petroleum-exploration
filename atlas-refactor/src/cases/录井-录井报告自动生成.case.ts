import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "scene-m5",
  "sceneId": "m5",
  "name": "录井-录井报告自动生成",
  "title": "录井报告自动生成",
  "stage": "录井",
  "stageId": "mudlogging",
  "engine": "scene",
  "family": "report",
  "method": "TF-IDF近邻字段识别＋引用式模板",
  "methods": [
    "nlp"
  ],
  "intro": "自由生成报告可能补出没有记录的事实；字段识别和逐句来源能让人工快速复核缺失与误归类。",
  "concept": "单井完钻后需提交综合录井报告，内容包括地层分层、油气水显示、异常工况记录与结论建议，通常由录井工程师手工汇编。",
  "what": "TF-IDF与余弦近邻对录井语句分配字段，引用原句组装可追溯报告草稿。",
  "why": "自由生成报告可能补出没有记录的事实；字段识别和逐句来源能让人工快速复核缺失与误归类。",
  "how": "参考句拟合词表与IDF；输入文本逐行检索字段，未知语句不输出结论，缺失字段标为未提供。",
  "data": "参考、校准与测试使用分离的合成观测；输入包括：语句词项、字段参考、引用来源。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
  "limit": "是引用式模板草稿，不是大语言模型，不进行无证据的地质推理或完钻结论生成。 所有数据为合成教学数据，不能直接作为现场操作依据。",
  "features": [
    {
      "name": "语句词项",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "字段参考",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "引用来源",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "字段类型",
      "unit": ""
    }
  ],
  "classes": [
    "井深",
    "岩性",
    "油气显示",
    "工况"
  ],
  "steps": [
    {
      "name": "建立业务观测",
      "do": "参考、校准与测试使用分离的合成观测；输入包括：语句词项、字段参考、引用来源。标签仅用于参考拟合与独立检验，界面明确区分示意与测量。",
      "effect": "原文标明每个草稿字段来源",
      "trap": "只使用当前可观测量，不把目标标签当输入。"
    },
    {
      "name": "学习参考关系",
      "do": "TF-IDF与余弦近邻对录井语句分配字段，引用原句组装可追溯报告草稿。",
      "effect": "展示实际拟合系数、参考记录或Q值。",
      "trap": "拟合只使用参考样本；合成关系不等于现场机理验证。"
    },
    {
      "name": "推断与约束检查",
      "do": "参考句拟合词表与IDF；输入文本逐行检索字段，未知语句不输出结论，缺失字段标为未提供。",
      "effect": "近邻得分解释字段归类",
      "trap": "是引用式模板草稿，不是大语言模型，不进行无证据的地质推理或完钻结论生成。"
    },
    {
      "name": "对照与人工复核",
      "do": "自由生成报告可能补出没有记录的事实；字段识别和逐句来源能让人工快速复核缺失与误归类。",
      "effect": "编辑原文检查未知词与缺失字段",
      "trap": "独立数据与简单基线同时展示，结果不预设智能方法获胜。"
    }
  ],
  "visuals": [
    "原文标明每个草稿字段来源",
    "近邻得分解释字段归类",
    "编辑原文检查未知词与缺失字段"
  ],
  "english": {
    "title": "Mud-logging report generation",
    "stage": "Mud Logging",
    "intro": "Free generation can invent unrecorded facts. Field recognition and sentence provenance make omissions and misassignments reviewable.",
    "concept": "Final logging reports combine stratigraphy, fluid shows, operating events and recommendations.",
    "method": "TF-IDF nearest-field recognition + source-quoted templates",
    "what": "TF-IDF and cosine neighbors assign logging sentences to fields and assemble a source-quoted draft.",
    "why": "Free generation can invent unrecorded facts. Field recognition and sentence provenance make omissions and misassignments reviewable.",
    "how": "Reference sentences fit vocabulary and IDF. Each input line retrieves a field; unknown lines yield no conclusion and missing fields remain unspecified.",
    "data": "Reference, calibration and test observations are synthetic and separate. Inputs: Sentence terms, Field references, Source quotation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
    "limit": "This is a source-quoted template, not an LLM; it does not infer geology or invent completion conclusions. All observations are synthetic teaching data and must not guide field operations.",
    "features": [
      {
        "name": "Sentence terms",
        "unit": ""
      },
      {
        "name": "Field references",
        "unit": ""
      },
      {
        "name": "Source quotation",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Field type",
        "unit": ""
      }
    ],
    "classes": [
      "Well depth",
      "Lithology",
      "Hydrocarbon show",
      "Operating event"
    ],
    "steps": [
      {
        "name": "Build observations",
        "do": "Reference, calibration and test observations are synthetic and separate. Inputs: Sentence terms, Field references, Source quotation. Labels are used for reference fitting and held-out evaluation; schematics are distinguished from measured values.",
        "effect": "Original text grounds every draft field",
        "trap": "Use observable inputs; never provide target labels as features."
      },
      {
        "name": "Learn from references",
        "do": "TF-IDF and cosine neighbors assign logging sentences to fields and assemble a source-quoted draft.",
        "effect": "Inspect actual fitted coefficients, reference records or Q-values.",
        "trap": "Fit references only; synthetic relations do not establish field validity."
      },
      {
        "name": "Infer and check constraints",
        "do": "Reference sentences fit vocabulary and IDF. Each input line retrieves a field; unknown lines yield no conclusion and missing fields remain unspecified.",
        "effect": "Neighbor scores explain field assignment",
        "trap": "This is a source-quoted template, not an LLM; it does not infer geology or invent completion conclusions."
      },
      {
        "name": "Compare and review",
        "do": "Free generation can invent unrecorded facts. Field recognition and sentence provenance make omissions and misassignments reviewable.",
        "effect": "Edit source to inspect unknown terms and missing fields",
        "trap": "Show held-out results and a simple baseline without assuming AI wins."
      }
    ],
    "visuals": [
      "Original text grounds every draft field",
      "Neighbor scores explain field assignment",
      "Edit source to inspect unknown terms and missing fields"
    ]
  }
} satisfies SceneCaseDef;
