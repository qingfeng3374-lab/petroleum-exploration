import type {SceneCaseDef} from '../scene-sdk/types';
export default {
  "id": "learn-symbols",
  "sceneId": "g3",
  "name": "地质勘察-地质图符号形态分类",
  "title": "地质图符号形态分类",
  "stage": "地质勘察",
  "stageId": "geology",
  "engine": "scene",
  "family": "classification",
  "method": "图形形态特征＋kNN",
  "methods": [
    "cv",
    "nlp"
  ],
  "intro": "历史扫描图中的符号需要结构化后才能检索。",
  "concept": "历史扫描图中的符号需要结构化后才能检索。形态特征应容忍位置和轻微噪声，同时保留原图供复核。",
  "what": "从观测二值图提取面积、周长和形态矩，kNN识别三类简化地质图符号。",
  "why": "历史扫描图中的符号需要结构化后才能检索。形态特征应容忍位置和轻微噪声，同时保留原图供复核。",
  "how": "参考自绘图符训练近邻分类，目标图像的特征完全由像素计算；切换样本检查面积与周长如何影响票数。",
  "data": "独立合成参考与测试记录。输入包括前景面积比例、边界面积比、圆度指标、径向二阶矩；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
  "limit": "三种自绘形状不是完整FGDC符号集，没有OCR、版面分析或地理配准。 本例为合成教学实验，不直接用于现场操作。",
  "features": [
    {
      "name": "前景面积比例",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "边界面积比",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "圆度指标",
      "unit": "",
      "range": [
        0,
        1
      ]
    },
    {
      "name": "径向二阶矩",
      "unit": "",
      "range": [
        0,
        1
      ]
    }
  ],
  "outputs": [
    {
      "name": "图符类别",
      "unit": ""
    }
  ],
  "classes": [
    "圆形参考",
    "三角参考",
    "十字参考"
  ],
  "steps": [
    {
      "name": "从专业观测建立输入",
      "do": "独立合成参考与测试记录。输入包括前景面积比例、边界面积比、圆度指标、径向二阶矩；知识来源只支撑概念，没有下载或冒充来源中的现场数据。",
      "effect": "原始图符与形态量并列",
      "trap": "输入从观测构造，测试真值不进入特征。"
    },
    {
      "name": "从参考记录学习方法",
      "do": "从观测二值图提取面积、周长和形态矩，kNN识别三类简化地质图符号。",
      "effect": "查看实际权重、距离或参考尺度。",
      "trap": "参数只由参考记录学习，检验数据用于复核。"
    },
    {
      "name": "解释推断与约束作用",
      "do": "参考自绘图符训练近邻分类，目标图像的特征完全由像素计算；切换样本检查面积与周长如何影响票数。",
      "effect": "近邻距离解释符号归类",
      "trap": "三种自绘形状不是完整FGDC符号集，没有OCR、版面分析或地理配准。"
    },
    {
      "name": "与简单基线独立对照",
      "do": "历史扫描图中的符号需要结构化后才能检索。形态特征应容忍位置和轻微噪声，同时保留原图供复核。",
      "effect": "像素翻转检验扫描噪声",
      "trap": "结果不预设新方法获胜，结合误差与失败条件判断。"
    }
  ],
  "visuals": [
    "原始图符与形态量并列",
    "近邻距离解释符号归类",
    "像素翻转检验扫描噪声"
  ],
  "extension": {
    "key": "symbols",
    "task": "classification"
  },
  "references": [
    {
      "title": "USGS FGDC Geologic Map Symbols",
      "url": "https://www.usgs.gov/programs/national-cooperative-geologic-mapping-program/science/national-geologic-map-database-0",
      "note": "用于了解地质图符号标准；演示使用自绘的简化形状。"
    },
    {
      "title": "scikit-learn Nearest Neighbors",
      "url": "https://scikit-learn.org/stable/modules/neighbors.html",
      "note": "方法依据：参考标准化、距离与近邻学习；计算为纯前端自实现。"
    }
  ],
  "english": {
    "title": "Geological-map symbol recognition",
    "stage": "Geological Survey",
    "intro": "Scanned-map symbols need structure before retrieval. Shape features should tolerate position and mild noise while preserving the original image for review.",
    "concept": "Scanned-map symbols need structure before retrieval. Shape features should tolerate position and mild noise while preserving the original image for review.",
    "method": "Observed shape features + kNN",
    "what": "Extract area, perimeter and moments from observed binary images; kNN recognizes three simplified map-symbol types.",
    "why": "Scanned-map symbols need structure before retrieval. Shape features should tolerate position and mild noise while preserving the original image for review.",
    "how": "Self-drawn reference symbols fit the neighbor classifier. Target features are computed entirely from pixels; inspect how area and perimeter affect votes.",
    "data": "Independent synthetic reference and test records. Inputs include Foreground area, Boundary-area ratio, Circularity, Radial moment. Sources support concepts; their field data have not been downloaded or substituted.",
    "limit": "Three self-drawn shapes are not the full FGDC symbol set; OCR, layout analysis and georegistration are absent. This is a synthetic teaching experiment, not a field operation tool.",
    "features": [
      {
        "name": "Foreground area",
        "unit": ""
      },
      {
        "name": "Boundary-area ratio",
        "unit": ""
      },
      {
        "name": "Circularity",
        "unit": ""
      },
      {
        "name": "Radial moment",
        "unit": ""
      }
    ],
    "outputs": [
      {
        "name": "Symbol class",
        "unit": ""
      }
    ],
    "classes": [
      "Circle reference",
      "Triangle reference",
      "Cross reference"
    ],
    "steps": [
      {
        "name": "Build inputs from observations",
        "do": "Independent synthetic reference and test records. Inputs include Foreground area, Boundary-area ratio, Circularity, Radial moment. Sources support concepts; their field data have not been downloaded or substituted.",
        "effect": "Display original symbols and shape measures",
        "trap": "Build features from observations; held-out truth is not an input."
      },
      {
        "name": "Learn from reference records",
        "do": "Extract area, perimeter and moments from observed binary images; kNN recognizes three simplified map-symbol types.",
        "effect": "Inspect actual weights, distances or reference scales.",
        "trap": "Fit parameters on references only; evaluation data supports review."
      },
      {
        "name": "Explain inference and constraints",
        "do": "Self-drawn reference symbols fit the neighbor classifier. Target features are computed entirely from pixels; inspect how area and perimeter affect votes.",
        "effect": "Neighbor distances explain assignments",
        "trap": "Three self-drawn shapes are not the full FGDC symbol set; OCR, layout analysis and georegistration are absent."
      },
      {
        "name": "Compare against a simple baseline",
        "do": "Scanned-map symbols need structure before retrieval. Shape features should tolerate position and mild noise while preserving the original image for review.",
        "effect": "Pixel flips probe scan noise",
        "trap": "Do not assume the new method wins; inspect errors and failure conditions."
      }
    ],
    "visuals": [
      "Display original symbols and shape measures",
      "Neighbor distances explain assignments",
      "Pixel flips probe scan noise"
    ],
    "references": [
      {
        "title": "USGS FGDC Geologic Map Symbols",
        "url": "https://www.usgs.gov/programs/national-cooperative-geologic-mapping-program/science/national-geologic-map-database-0",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      },
      {
        "title": "scikit-learn Nearest Neighbors",
        "url": "https://scikit-learn.org/stable/modules/neighbors.html",
        "note": "Supports the stated business concept or mathematical method. The experiment uses independently generated teaching data, not the source data or production software."
      }
    ]
  }
} satisfies SceneCaseDef;
