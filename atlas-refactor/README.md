# 石油勘探开发的智能化可能性地图

当前主站 v4.0.0：13 个环节、61 个场景，共 **102 个可运行案例**，包含 101 个原生学习 / 检索 / 智能优化案例和 1 个经典测井对照。本轮每个章节各增加 3 例，共新增 39 例，附 41 个不同知识来源。详见 [102案例扩充_知识检索与验收](docs/102案例扩充_知识检索与验收.md)。原网站在 `public/legacy/` 中作为兼容工作台，未修改原始项目。

后续质量复查修正了误差图、去噪真值、AI与基线分别校准、拒判评估，以及异常导入和损坏缓存导致的白屏问题。完整检查与边界见 [案例与网站整体质量复查](docs/案例与网站整体质量复查_2026-11-04.md)。

## 启动

Windows 双击 `启动网站.cmd`，或在本目录执行：

```powershell
npm ci
npm run dev -- --open
```

开发地址通常为 `http://127.0.0.1:5173/`。若端口已占用，以终端输出为准。Node.js 需满足 Vite 所需版本，开发使用 Node 24。`npm run dev` 会先自动生成案例 HTML、ZIP 与目录数据；`npm run build` 同样先生成案例再构建 `dist/`。部署时上传 `dist/` 到静态服务器；主站不要直接双击 `dist/index.html`。

Git 仓库保留源码、原站兼容快照、文档与锁文件。`node_modules/`、`dist/`、`release/`、`public/cases/`、`public/case-archives/`、`public/examples/`、测试截图和本地临时材料均被忽略；案例分发文件由上述命令重建。提交的 JSON 验收记录用于保存历史检查结果，截图可通过对应浏览器脚本重新生成。仅通过底层 Vite 命令直接启动会跳过案例生成，请使用 `npm run dev`。

## 单文件与 ZIP 案例

`release/single/` 中的 HTML 可独立双击运行，也可通过新站右上角“添加案例”上传。新站已有同 ID 内置案例时，先在案例库移除该内置版本，再导入。

新站可以直接通过“添加案例 → 导入 ZIP 压缩包”上传 `release/archives/` 中的单个案例。解压前后各限 6 MiB，最多 256 个文件。

`release/legacy/` 中每个目录都包含 `case.json` 与 `demo/index.html`，可由旧站“添加案例”上传。`release/archives/` 中是相同目录内容的 ZIP，给旧站使用前先解压。

案例使用可复现合成教学数据，在浏览器实际执行分类、回归、聚类、时序预测、稳健检测、文本检索或约束优化。观测图、模型候选、错误图、指标、训练损失或投票距离由同一计算生成。训练与测试数据分开。知识来源支持方法与业务背景，不代表使用了来源机构的现场数据或取得生产验证。

## 验证命令

```powershell
npm run check
npm test
npm run build
# 另一个终端先运行 npm run dev
npm run test:browser
node tests/compatibility.mjs
```

浏览器脚本使用本机已安装的 Chrome 无头模式。结果与截图在 `docs/`。通过 `ATLAS_TEST_URL` 指定实际预览地址；不同版本的脚本默认端口为5173或4173。

## 目录

- `src/App.svelte`：主站页面、筛选与导航；`src/components`：案例宿主与懒加载三维模型。
- `src/cases`：每例一个“大类别-小类别.case.ts”维护入口。
- `src/case-sdk`：算法、可视化、实验运行器。
- `src/scene-sdk`：84例的任务模型、D3图表、解释和运行器，含本轮39例的 `extension-models.ts`；`src/chapter-sdk`：原十二个章节案例。
- `src/services`：包读取、校验、IndexedDB 保存与导出。
- `src/data`：自动迁移的旧场景与生成的案例目录。
- `scripts/prepare.mjs`：迁移旧数据、构建单文件和兼容包；通过 `npm run build` 调用。
- `public/legacy`：保留不变的旧站快照，用于旧包运行与兼容参考。
- `release`：可分发案例；`dist`：可部署主站；`docs`：协议、验收与截图。

## 使用与审核

可从地质勘察 g1 的遥感岩性案例开始，切换三个页签，调整参数、检查像元，再体验其他章节。g1 目前绑定遥感岩性、构造线候选和矿物吸收带三个案例，可在页签上方切换。

审核本轮扩展，可在案例库搜索案例 ID：`learn-torsion` 看实际频谱，`learn-horizon-track` 看连续层位追踪，`learn-inflow` 看产液比例，`learn-charge-tradeoff` 看约束与帕累托候选，`learn-station-balance` 看库存修正异常。原有 `s5` 地震去噪、`w5` 遮挡补全、`m5` 来源报告、`co4` Q-learning 等均保留。接入检查显示61/61，原有文件、文件夹、ZIP和手动添加入口均保留。

运行 `node tests/research-expansion.mjs` 检查本轮39例的三页签、来源、双语、重算、导出与响应式；`node tests/all-scenes.mjs` 回归此前45例。运行 `node --import tsx scripts/audit-research.mjs` 核对102例与知识来源，`node --import tsx scripts/audit-scenes.mjs` 核对全部场景、计算与101个分发包。先执行 `npm run build`，浏览器检查需启动预览并设置 `ATLAS_TEST_URL`，完整命令见本轮说明。研究与场景扩展脚本默认4173，较早脚本默认5173，建议始终显式设置地址。

新站本地管理已支持技术和场景增删改、导入案例元信息编辑、逐个恢复内置案例，以及完整内容备份。首次账号为 admin / admin123，可修改密码。支持同源旧 v1/v2 案例、技术、场景及隐藏名单迁移；跨电脑或跨端口使用备份转移。登录仅控制本机管理入口。

v3 补齐全部61场景，新增45例（含w1学习式分层对照）；v4 再为13章节各扩展3例，保留所有原有演示。每例都有背景、流程、实际计算及What / Why / How；仍为合成教学数据，不等于现场生产系统。此前版本记录见 [61场景全覆盖_实现与验收](docs/61场景全覆盖_实现与验收.md) 和 [WhatWhyHow与章节案例扩充](docs/WhatWhyHow与章节案例扩充.md)。

v1.4.0 将首页改为 D3 作业全景与方法关联图，将案例库改为单一实验工作区，五种预览运行实际算法；重新设计桌面与手机导航，主站正文主要使用 17–18 px。详见 [交互全景与实验工作区](docs/交互全景与实验工作区.md)。顶部可暂停动效，系统减少动效偏好也会生效。早期视觉记录见 [前端视觉重构说明](docs/前端视觉重构说明.md)。

v1.3.0 新增高饱和亮色主题、中英文切换，并优化正文、导航和实验控件的字号与布局。右上角可切换外观和语言，刷新后保留选择。“添加案例”保留文件导入并恢复手动窗口，可填写元信息、背景、流程和演示 HTML，支持预览与 ZIP 导出。详见 [主题双语与手动添加说明](docs/主题双语与手动添加说明.md)。

运行 `node tests/preferences.mjs` 检查主题、语言、实验状态保留以及手动案例的保存、导出与重导入；同样支持 `ATLAS_TEST_URL` 指定地址。

运行 `node tests/visual-redesign.mjs` 检查新增交互；通过 `ATLAS_TEST_URL` 指定实际开发地址。此前的算法与教学改进见 [第二轮改进记录](docs/第二轮改进记录.md)。

运行 `node tests/field-experience.mjs` 检查本轮全景、方法连接、五种实时预览、移动导航、英文与字号；支持 `ATLAS_TEST_URL` 指定地址。

下载入口已移到案例标题旁，详情页增加案例操作区，各页面新增返回按钮与当前位置导航。返回会跳过同一案例的页签并保留案例库选择；导入案例可下载完整 ZIP。详见 [操作入口与返回导航优化](docs/操作入口与返回导航优化.md)，对应检查为 `node tests/actions.mjs`。

v1.5.0 补齐设计要求与原站功能：方法反查按环节分组，增加统计矩阵，所有场景可查看完整数据清单、参考方向和跨环节相关场景；原生内容管理与完整备份恢复已接入。旧案例的快速判断、流程统计、评估和失败情形恢复完整展示。详见 [设计符合性与原站功能对照](docs/设计符合性与原站功能对照.md)。

运行 `node tests/requirements-audit.mjs` 验证新增检索、管理和备份流程；运行 `node tests/legacy-parity.mjs` 验证原站内容、旧数据迁移、密码设置和初至示例下载。均支持 `ATLAS_TEST_URL` 指定地址。

v1.6.0 将作业全景替换为 Three.js 三维作业场与 D3 可展开章节树，支持地上 / 地下视角、分层、缩放、点选和双向联动。右侧目录覆盖全部 13 环节、61 场景，支持搜索、键盘访问及详情跳转；亮暗主题和英文继续可用。详见 [三维作业场与D3章节树](docs/三维作业场与D3章节树.md)。运行 `node tests/field-3d.mjs` 验证新增交互。

v2.0.0 为原五例补齐 What / Why / How 与实时计算证据，新增十二个环节案例，增加有大小与路径检查的 ZIP 导入。案例库可按环节筛选，内置案例提供 ZIP 下载。新增验证命令为 `node tests/ai-cases.mjs` 与 `node tests/zip-import.mjs`，支持 `ATLAS_TEST_URL`。
