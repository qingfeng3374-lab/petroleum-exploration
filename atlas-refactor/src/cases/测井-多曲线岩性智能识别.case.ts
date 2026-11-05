import type {ChapterCaseDef} from '../chapter-sdk/types';
export default {
  "id": "welllog-ai",
  "sceneId": "w4",
  "name": "测井-多曲线岩性智能识别",
  "engine": "chapter",
  "kind": "classification",
  "task": "welllog",
  "methods": [
    "ts"
  ],
  "features": [
    {
      "name": "自然伽马",
      "unit": "API",
      "range": [
        20,
        150
      ]
    },
    {
      "name": "密度",
      "unit": "g/cm³",
      "range": [
        2.1,
        2.9
      ]
    },
    {
      "name": "中子孔隙度",
      "unit": "",
      "range": [
        0,
        0.45
      ]
    }
  ],
  "classes": [
    "砂岩",
    "泥岩",
    "碳酸盐岩"
  ],
  "stage": "测井",
  "title": "多曲线岩性智能识别",
  "method": "kNN · 多曲线融合分类",
  "intro": "低伽马可以对应砂岩，也可能对应碳酸盐岩。单曲线判断容易混淆，需要融合不同物理响应。",
  "what": "kNN 融合 GR、密度与中子孔隙度，用标注参考数据为独立井段提供岩性候选。",
  "why": "曲线物理响应具有互补性，多曲线空间能区分单 GR 上重叠的样本，近邻记录让判断依据可追查。",
  "how": "仅用参考井样本标准化量纲，按多曲线距离选择 k 个近邻并投票。曲线、候选与真值条带沿相同采样索引对齐。",
  "concept": "测井观测地层物理响应，不能直接从一条曲线读取唯一岩性名称。",
  "data": "三条合成曲线与三类岩性标签；参考和测试独立，索引不是实际井深。",
  "limit": "没有井径、泥浆和仪器环境校正，不同区块分布变化可能使近邻关系失效。",
  "visuals": [
    "特征散点展示类别重叠。",
    "预测、基线与真值条带对齐。",
    "近邻投票或权重贡献解释单个候选。"
  ],
  "steps": [
    {
      "name": "准备观测与参照",
      "do": "三条合成曲线与三类岩性标签；参考和测试独立，索引不是实际井深。",
      "effect": "特征散点展示类别重叠。",
      "trap": "参考与测试保持分离。"
    },
    {
      "name": "拟合智能方法",
      "do": "仅用参考井样本标准化量纲，按多曲线距离选择 k 个近邻并投票。曲线、候选与真值条带沿相同采样索引对齐。",
      "effect": "模型参数来自参考数据，不读取测试真值。",
      "trap": "没有井径、泥浆和仪器环境校正，不同区块分布变化可能使近邻关系失效。"
    },
    {
      "name": "应用于新观测",
      "do": "kNN 融合 GR、密度与中子孔隙度，用标注参考数据为独立井段提供岩性候选。",
      "effect": "预测、基线与真值条带对齐。",
      "trap": "调整参数后检查实际计算变化。"
    },
    {
      "name": "对照、解释与复核",
      "do": "曲线物理响应具有互补性，多曲线空间能区分单 GR 上重叠的样本，近邻记录让判断依据可追查。",
      "effect": "近邻投票或权重贡献解释单个候选。",
      "trap": "没有井径、泥浆和仪器环境校正，不同区块分布变化可能使近邻关系失效。"
    }
  ],
  "english": {
    "stage": "Well logging",
    "title": "Lithology from multiple well logs",
    "method": "kNN · multi-log classification",
    "intro": "Low gamma ray can indicate sandstone or carbonate. Multiple physical responses help separate ambiguous samples.",
    "what": "kNN combines gamma ray, density and neutron porosity to assign held-out lithology candidates.",
    "why": "Complementary responses can distinguish samples overlapping on GR, while neighbours expose the evidence behind a label.",
    "how": "References fit scaling before multi-log neighbour voting. Logs, candidate strips and truth strips align on one sample index.",
    "concept": "Well logs measure physical responses; one log does not uniquely determine a lithology.",
    "data": "Three synthetic logs and lithology classes use independent reference and test records. Indices are not real depths.",
    "limit": "Borehole and instrument corrections are omitted. Cross-field distribution changes can invalidate neighbours.",
    "features": [
      {
        "name": "Gamma ray"
      },
      {
        "name": "Bulk density"
      },
      {
        "name": "Neutron porosity"
      }
    ],
    "classes": [
      "Sandstone",
      "Shale",
      "Carbonate"
    ],
    "visuals": [
      "Feature scatter reveals overlapping classes.",
      "Model, baseline and truth strips are aligned.",
      "Neighbour votes or weight contributions explain a candidate."
    ],
    "steps": [
      {
        "name": "Prepare observations and references",
        "do": "Three synthetic logs and lithology classes use independent reference and test records. Indices are not real depths.",
        "effect": "Feature scatter reveals overlapping classes.",
        "trap": "Keep references and tests separate."
      },
      {
        "name": "Fit the intelligent method",
        "do": "References fit scaling before multi-log neighbour voting. Logs, candidate strips and truth strips align on one sample index.",
        "effect": "Parameters come from references, not test labels.",
        "trap": "Borehole and instrument corrections are omitted. Cross-field distribution changes can invalidate neighbours."
      },
      {
        "name": "Apply to new observations",
        "do": "kNN combines gamma ray, density and neutron porosity to assign held-out lithology candidates.",
        "effect": "Model, baseline and truth strips are aligned.",
        "trap": "Inspect actual recalculation after changing parameters."
      },
      {
        "name": "Compare, explain and review",
        "do": "Complementary responses can distinguish samples overlapping on GR, while neighbours expose the evidence behind a label.",
        "effect": "Neighbour votes or weight contributions explain a candidate.",
        "trap": "Borehole and instrument corrections are omitted. Cross-field distribution changes can invalidate neighbours."
      }
    ]
  }
} satisfies ChapterCaseDef;
