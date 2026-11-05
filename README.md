# 石油勘探开发的智能化可能性地图

一个结合三维地质概念、石油作业链与浏览器内智能算法实验的可视化教学网站。当前包含 **13 个作业环节、61 个场景、102 个可运行案例**（101 个原生案例与 1 个经典动态规划对照）。

主站使用 Svelte 5、TypeScript、Vite、Three.js 与 D3，支持三维地层与作业场、可展开章节树、中英文与亮暗主题切换、What / Why / How 案例讲解、独立检验与误差可视化，以及 ZIP、文件夹、单文件和手动案例接入。演示使用合成教学数据，核心计算在浏览器本地运行。

## 本地运行

建议使用 Node.js 24。进入网站目录后安装并启动：

```powershell
cd atlas-refactor
npm ci
npm run dev -- --open
```

Windows 也可双击 [启动网站.cmd](atlas-refactor/启动网站.cmd)。首次安装依赖需要联网。开发启动会先生成案例资源，通常访问 `http://127.0.0.1:5173/`，实际地址以终端输出为准。

## 检查与构建

在 `atlas-refactor/` 中执行：

```powershell
npm run check
npm test
npm run build
npm run preview -- --open
```

`npm run build` 生成可部署的 `dist/`、单文件 HTML、逐案例 ZIP 和旧站兼容目录。将 `dist/` 上传到静态服务器即可；不要直接双击主站 `index.html`。浏览器专项检查需要本机 Chrome 和已启动的网站，具体命令见 [网站说明](atlas-refactor/README.md)。

## 仓库结构

| 路径 | 内容 |
| --- | --- |
| `atlas-refactor/src/` | 页面、组件、三维模型、算法、101 个原生案例定义 |
| `atlas-refactor/public/legacy/` | 原站兼容快照与原始案例模板，属于构建必需输入 |
| `atlas-refactor/scripts/` | 案例生成、审计与课程打包脚本 |
| `atlas-refactor/tests/` | 单元测试与浏览器检查 |
| `atlas-refactor/docs/` | 接入协议、设计说明与历史验收记录 |
| `网站重构方案.md`、`AI重构提示词.md` | 项目设计材料 |
| `项目展示视频文稿_4分50秒_一镜到底.md` | 一镜到底展示脚本 |

## Git 忽略规则

根目录和网站目录分别维护 `.gitignore`。依赖、编译输出、生成的案例 HTML/ZIP、浏览器截图、临时报告工作区、课程提交材料目录和本地配置不提交；源码、锁文件、旧站构建输入和技术文档保留。

生成目录为 `atlas-refactor/dist/`、`atlas-refactor/release/`、`atlas-refactor/public/cases/`、`atlas-refactor/public/case-archives/` 和 `atlas-refactor/public/examples/`，均可通过构建重新生成。本地课程 Word、课程案例压缩包及排版中间文件继续保存在工作区，不随源码推送。
