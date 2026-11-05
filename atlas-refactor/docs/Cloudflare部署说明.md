# Cloudflare Workers 部署说明与黑屏排查

## 本项目应发布哪个目录

网站使用 Svelte / TypeScript / Vite，需要先构建。唯一发布目录是 **`atlas-refactor/dist/`**；仓库根目录、`atlas-refactor/` 和 `atlas-refactor/src/` 都不是生产发布目录。

仓库根目录的 `wrangler.jsonc` 已指定 `assets.directory = "./atlas-refactor/dist"`，并增加发布前构建步骤 `build.command = "npm run build"`。`dist/` 在 Git 中被忽略，属于正常做法，由部署过程生成。

## GitHub 连接 Workers Builds 的推荐设置

打开 Cloudflare → Workers & Pages → `petroleum-exploration` → Settings → Build，使用以下配置：

| 设置 | 值 |
| --- | --- |
| 仓库 | `qingfeng3374-lab/petroleum-exploration` |
| 生产分支 | `main` |
| 根目录 / Root directory | 仓库根目录，留空；不要填 `atlas-refactor` 或 `src` |
| 构建命令 / Build command | 可留空，由发布前步骤构建 |
| 部署命令 / Deploy command | `npm run deploy`；也兼容默认 `npx wrangler deploy` |
| 构建变量 `NODE_VERSION` | `24` |

安装阶段在根目录执行 `npm ci`，安装锁定的 Wrangler。发布时 Wrangler 自动运行 `npm run build`，安装网站目录依赖、生成案例、执行 Vite 生产构建并检查产物，再读取发布目录。Workers Builds 默认会检测根目录的 `package-lock.json`；若关闭了自动依赖安装，请设置构建命令为 `npm ci`。只执行安装不会生成网站，构建由发布前步骤完成。

如果控制台仍保留独立构建命令 `npm run build` 也可正常部署，但随后 Wrangler 会再次构建；推荐按上表留空，避免重复。若控制台或自定义包装工具主动禁用了 Wrangler 构建，请改用显式部署命令 `npm run build && npx wrangler deploy`。

**删除部署命令中旧的 `--assets .`、`--assets ./atlas-refactor` 等参数。**CLI 的错误目录参数会覆盖配置文件，继续把源码发布出去。使用上表命令即可。

保存后从最新 `main` 提交重新构建部署。旧部署的“重试”可能仍然使用旧提交或旧设置，需核对构建日志里的提交号。构建日志应出现：

```text
Migrated 13 stages / 61 scenes; built 101 self-contained AI cases.
vite ... building ... for production...
Deployment check passed: compiled JS/CSS, legacy resources and 102 case packages are present in dist/.
```

此次已在锁定的 Wrangler 4.157.0 下验证直接部署路径，包含 `WORKERS_CI=1` 环境。`npx wrangler deploy` 的日志会先出现 `[custom build] Running: npm run build`；应先确认这一行，再检查生成案例与 Vite 构建结果。

## 安装脚本警告与缺少 dist 的区别

`npm warn allow-scripts` 是 npm 的安装脚本许可提示。项目已按锁定版本声明 root 的 `esbuild@0.28.2`、`workerd@1.20261103.1`，以及网站目录直接和传递依赖中的 `esbuild@0.25.12`、`esbuild@0.28.2`。更新依赖时需要一并复查这些声明。

`The directory specified by assets.directory ... does not exist` 则表示网站未构建，或构建在生成产物前失败。2026-11-05 20:04 的日志在安装后直接执行了 `npx wrangler deploy`，当时缺少发布前构建步骤，因此 `/opt/buildhome/repo/atlas-refactor/dist` 不存在；本次补上该步骤，不能通过把源码目录当成 assets 来绕过错误。

本次使用不含 `node_modules` 和 `dist` 的独立源代码副本验证：npm 11.21.2 安装根目录依赖后，直接执行 `npx wrangler deploy --dry-run`，在 `WORKERS_CI=1` 下自动完成构建并读取 252 个静态文件；根目录与网站目录的脚本许可待确认项均为空。类型检查零错误、零警告，84 项单元测试通过；Wrangler 本地浏览器检查通过三维首页、案例计算、主题同步、ZIP 与旧站入口，页面错误为零。这些是本地构建与运行验证，不等同于已完成 Cloudflare 生产发布。

## 本机验证与部署

在仓库根目录执行：

```powershell
npm ci
npm run build
npm run deploy:check
npm run preview:cloudflare -- --port 8787
```

`deploy:check` 会先运行构建，再检查部署配置，不发布；`preview:cloudflare` 也会先构建，再在本机模拟 Workers 静态资源服务。首页使用 `#/` 路由，不需要服务器把不存在的 JS 请求重写为首页。上面的手动 `npm run build` 可用于单独排查构建问题；直接执行 `deploy:check` 也能从空产物目录开始。

预览启动后，在另一个终端的仓库根目录执行 `npm run test:cloudflare`，检查编译入口的 MIME 类型、三维首页、案例计算、主题同步、ZIP 与经典案例。可用环境变量 `ATLAS_TEST_URL` 指定实际线上网址。截图和检查结果写入被 Git 忽略的 `.wrangler/`。

Windows 本机执行根目录构建会用 `npm ci` 重新安装网站依赖，需先停止正在运行的开发服务器，避免原生依赖文件被占用。Cloudflare 构建在独立环境中执行，不受本机服务影响。

如果由本机发布，先完成 Cloudflare 登录，再执行 `npm run deploy`。该命令重新构建后发布到配置中的 Worker。GitHub 连接部署时，直接按前面的控制台设置操作即可。

## 手动上传静态资源

如果当前 Worker 采用拖拽上传文件的方式，先运行 `npm run build`，再上传 **`atlas-refactor/dist/` 内的全部文件**。上传层级应是根部直接有 `index.html`、`assets/`、`cases/`、`case-archives/`、`legacy/`，不要再嵌套一层 `dist/`。

## 2026-11-05 线上黑屏的实测原因

当时的线上首页返回了源码版 `index.html`，而非构建后的页面：

| 请求 | 实测结果 | 影响 |
| --- | --- | --- |
| `/` | 200，页面引用 `/src/main.ts` | 未经过 Vite 生产构建 |
| `/src/main.ts` | 200，`Content-Type: video/mp2t` | 浏览器拒绝作为 JavaScript 模块执行 |
| `/legacy/assets/core/case-demo-host.js` | 404 | 公共兼容脚本未复制到发布根目录 |
| `/favicon.svg` | 404 | 公共资源路径同样不完整 |

浏览器报错为：`Failed to load module script ... MIME type of "video/mp2t"`。因此应用没有挂载到 `#app`，只能看见 HTML 预设的深色背景。

修复方法是构建并部署正确的目录，不是把 `.ts` 强行改成 JavaScript MIME 类型；未编译的 Svelte、TypeScript 和裸模块导入仍需要 Vite 处理。

## 发布后核对

1. 首页源代码应引用 `/assets/index-....js` 或 `./assets/index-....js`，不再请求 `/src/main.ts`。
2. 构建后的 JS / CSS、`/favicon.svg` 和 `/legacy/assets/core/case-demo-host.js` 返回 200。
3. 首页标题、三维地层、13 / 61 / 102 统计正常显示。
4. 打开遥感岩性识别，三个页签能切换，演示计算与 ZIP 下载正常。
5. 测井经典案例、主题切换与 ZIP 导入可用。需要时按 Ctrl + F5 更新浏览器缓存；缓存刷新不能代替重新构建部署。

参考：[Workers 静态资源配置](https://developers.cloudflare.com/workers/static-assets/binding/)、[Workers Builds 构建设置](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)、[HTML 路由处理](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/)。
