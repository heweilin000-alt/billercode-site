# Project Guidelines

## 工作流程
- **任何大的改动前，必须先和用户确认再执行，不要自作主张**
- 代码改完后不要自动推送 GitHub，等用户确认后再 push（每次 push 会触发 Vercel 自动部署，产生费用）

## 技术规范
- 使用 Next.js `<Link>` 组件（不要替换为 `<a>` 标签），通过 `prefetch={false}` 禁用预加载来节约 Vercel 资源
- Vercel 成本优先：所有页面 revalidate 设为 30 天（2592000 秒）
- Supabase 查询尽量少：用 React.cache 去重，静态数据不查数据库
