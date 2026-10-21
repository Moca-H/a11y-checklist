# a11y-checklist

面向发版 UI 的精简 **无障碍检查清单**，进度可分享。

- 按 WCAG 四大原则分组：可感知 / 可操作 / 可理解 / 健壮性
- 进度条 + 未完成 / 已完成筛选
- 勾选状态写在 **URL hash**（`#c=id1,id2`），复制链接即可分享评审进度
- 自带 Skip link、可见焦点、语义化复选框

这是精选入门清单，**不能替代**完整 WCAG。

在线演示：https://moca-h.github.io/a11y-checklist/

## 本地运行

```bash
npm install
npm run dev
```

## 增加检查项

编辑 `src/data/checklist.ts`，然后提 PR 即可。

## 贡献

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## License

MIT

---

## English

A compact, shareable accessibility checklist grouped by WCAG pillars. Progress lives in the URL hash so you can share a review state. This curated starter list is not a replacement for the full WCAG.
