# 项目 Agent 规则

本项目属于长期维护独立项目，默认启用 workflow 工程体系。

---

## 1. 指令优先级

1. 用户当前会话要求
2. 当前目录及上级目录 AGENTS.md
3. 项目 docs / README / 代码规范
4. workflow / skills
5. 全局 AGENTS.md

---

## 2. workflow 执行策略

### 默认流程

复杂实现任务默认执行：

```text
workflow:brainstorming
 ->
workflow:writing-plans
  ->
implementation
  ->
review
  ->
completion verification
```
以下任务必须进入 workflow：

```text
多文件改动
公共逻辑修改
API / schema 修改
数据流修改
状态机修改
持久化修改
并发逻辑
重构
中大型功能开发
```

## 4. 文档同步要求

以下变化必须同步 docs：

- 架构变化
- 模块边界变化
- API 变化
- 字段变化
- 状态流变化
- 验证流程变化
- 关键工程决策

推荐目录：
```
docs/
  architecture.md
  api.md
  decisions.md
  conventions.md
  changelog-ai.md
```
## 5. 多代理协作

仅在满足以下条件时允许并行：

- 子任务边界清晰
- 无共享文件冲突
- scope_write 明确
- 可独立验证

默认禁止并行修改：
- shared types
- schema
- package.json
- lockfile
- CI
- 根配置
- 路由入口
## 6. 质量门禁
- Level 0 局部验证
- Level 1 回归测试
- Level 2 TDD
- Level 3 Code Review
- Level 4 Completion Verification

完成前必须：

- 验证功能
- 检查注释
- 检查文档
- 检查工作区
- 分析影响范围

## 7. 工程限制
- 函数 ≤ 50 行
- 嵌套 ≤ 3
- 圈复杂度 ≤ 10
- 禁止魔法数字
- 优先最小充分实现
- 重构默认先保持行为一致

## 8. workflow 原则
- workflow 是默认工程体系。
- 非必要不跳过 planning。
- 复杂任务优先使用 executing-plans。
- 前端任务可配合 frontend-design。
- 高风险行为变更优先 TDD。