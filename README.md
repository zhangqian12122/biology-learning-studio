# 福建高中生物学习站

人教版新课标 · 师生共享题库 · 互动实验 · 细胞图鉴 3D 模型

🔗 **在线演示（GitHub Pages，国内可直接打开）**：
https://zhangqian12122.github.io/biology-learning-studio/

> 静态演示版包含细胞图鉴 3D 模型、互动实验与内置题库练习；进度保存在浏览器本地。
> 完整版（教师中心 + 共享题库云端同步）见下方 Cloudflare Workers 部署说明。

## 功能

- **互动实验**（/lab）：14 个过程动画实验——酶促反应、光合作用、质壁分离、组织检测（斐林试剂/碘液/双缩脲/苏丹Ⅲ）、过氧化氢分解、色素分离、基因工程四步流程、DNA 粗提取、PCR 等，每个实验附「实验参考」（原理/材料/步骤/考点）。
- **细胞图鉴**（/cells）：7 个标本（动物细胞、植物细胞、叶绿体、线粒体、大肠杆菌、草履虫、保卫细胞与气孔），每个都有：
  - 教学剖面图（对齐课本插画，点结构编号高亮 + 功能说明）
  - 卡通实景 3D 模型（three.js 渲染，拖拽旋转 / 滚轮缩放 / 结构发光高亮；保卫细胞支持吸水张开 / 失水闭合联动）
- **题库与错题**（/practice）：全部 / 错题复习 / 智能排序三种模式，进度保存在本机，作答匿名同步供教师端统计。
- **教师中心**（/teacher）：口令登录，增补 / 修订 / 下架题目，查看每题作答统计与模块覆盖缺口。

## 技术栈

- vinext（Vite + React Server Components）
- three.js（卡通 toon 渲染，命令式场景；WebGL 不可用时自动降级 SVG 剖面）
- Tailwind CSS 4 · recharts · lucide-react
- Cloudflare Workers + D1（SQLite）

## 本地开发

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # 构建到 dist/
```

> 3D 模型需要浏览器支持 WebGL（几乎所有现代浏览器都支持）。

## 部署到 Cloudflare Workers

方式一（推荐）：GitHub Actions 自动部署

1. 在 Cloudflare 创建 API Token（权限：Workers Scripts 编辑 + D1 编辑，账户资源选你的账户）。
2. 在本仓库 Settings → Secrets and variables → Actions 添加：
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`（账户仅有一个时可省略）
3. push 到 main 即自动构建、创建/绑定 D1 数据库并部署，地址形如 `https://<worker-name>.<account>.workers.dev`。

方式二：本地部署

```bash
npx wrangler login
npm run build
node scripts/resolve-d1.mjs   # 创建/绑定 D1 数据库（首次需要）
npx wrangler deploy --config dist/server/wrangler.json
```

首次部署后建议执行一次 `npx wrangler d1 execute site-creator-d1 --remote --command "SELECT 1"` 确认数据库可达；题库为空时站点会自动使用内置题目，不会空白。
