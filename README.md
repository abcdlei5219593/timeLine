# AI 智能问答助手

一个现代化、精美的 AI 聊天应用，使用 Vue 3 + TypeScript + Vite 构建，提供类似 DeepSeek 和文心一言的用户体验。

![Vue](https://img.shields.io/badge/Vue-3.4.21-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.5.14-646CFF?style=flat-square&logo=vite&logoColor=white)

## ✨ 功能特点

### 🎨 现代化 UI 设计
- **精美界面** - 参考 DeepSeek、文心一言等主流 AI 工具的设计理念
- **深色/浅色模式** - 支持主题切换，自动保存用户偏好
- **响应式布局** - 完美适配桌面端、平板和移动端
- **流畅动画** - 精心设计的过渡效果和微交互
- **自定义滚动条** - 优雅的滚动条样式

### 💬 强大的聊天功能
- **实时对话** - 流畅的消息发送和接收
- **Markdown 支持** - 支持富文本格式，包括代码块、列表、链接等
- **代码高亮** - 使用 highlight.js 提供多语言语法高亮
- **智能时间显示** - "刚刚"、"X分钟前"等人性化时间格式
- **打字指示器** - 优雅的加载动画
- **消息动画** - 消息滑入效果，提升视觉体验

### 🎯 用户体验优化
- **侧边栏导航** - 可折叠的侧边栏，便于管理对话历史
- **快捷建议** - 预设的快捷问题提示卡片
- **自动滚动** - 新消息自动滚动到可视区域
- **自适应输入框** - 输入框高度自动调整（最高 200px）
- **键盘快捷键** - Enter 发送，Shift+Enter 换行
- **圆形头像** - 用户和 AI 都有独特的头像设计

### 🛠️ 技术亮点
- **Vue 3 Composition API** - 使用最新的 Vue 3 特性
- **TypeScript** - 完整的类型支持，提高代码可维护性
- **Vite** - 极速的开发体验和优化的生产构建
- **CSS 变量** - 动态主题切换和样式管理
- **模块化架构** - 清晰的项目结构，易于扩展

## 📦 技术栈

### 核心框架
- **Vue 3.4.21** - 渐进式 JavaScript 框架
- **TypeScript 5.2.2** - JavaScript 的超集，提供类型支持
- **Vite 4.5.14** - 下一代前端构建工具

### UI 和样式
- **CSS3** - 现代化的样式解决方案
- **CSS Variables** - 动态主题切换
- **Flexbox & Grid** - 灵活的布局系统

### 功能库
- **Axios 1.6.7** - HTTP 客户端
- **Markdown-it 14.1.0** - Markdown 解析器
- **Highlight.js 11.11.1** - 代码语法高亮（Atom One Dark 主题）

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0

### 1. 安装依赖

```bash
# 克隆项目
git clone <your-repo-url>
cd timeLine

# 安装依赖
npm install
```

### 2. 配置环境变量（可选）

复制 `.env.example` 为 `.env` 并配置你的 AI API：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 4. 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
timeLine/
├── src/
│   ├── api/
│   │   └── chat.ts           # API 接口和 mock 数据
│   ├── components/
│   │   └── AiChat.vue         # 主聊天组件
│   ├── types/
│   │   └── chat.ts            # TypeScript 类型定义
│   ├── App.vue                # 根组件
│   ├── main.ts                # 应用入口
│   ├── style.css              # 全局样式
│   └── vite-env.d.ts          # Vite 类型声明
├── public/                    # 静态资源
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── tsconfig.json              # TypeScript 配置
├── vite.config.ts             # Vite 配置
└── README.md                  # 项目文档
```

## 🎯 核心功能说明

### 1. 消息管理
- 支持用户消息和 AI 助手消息的区分显示
- 消息支持 Markdown 格式渲染
- 代码块自动语法高亮，支持多种编程语言
- 智能时间显示：刚刚、X分钟前、HH:MM 等格式

### 2. 主题切换
- **浅色模式**：清新明亮，适合白天使用
- **深色模式**：护眼舒适，适合夜间使用
- 主题偏好自动保存到 localStorage
- 使用 CSS 变量实现，切换流畅无闪烁

### 3. 侧边栏
- Logo 和应用名称展示
- 新建对话按钮（带渐变色）
- 对话历史列表（预留接口）
- 主题切换按钮
- 支持折叠/展开，移动端自动隐藏

### 4. 响应式设计
- **桌面端（>1024px）**：显示完整侧边栏和宽敞的聊天区域
- **平板（768px-1024px）**：适中的间距和布局
- **移动端（<768px）**：侧边栏折叠为汉堡菜单，优化触控体验

### 5. 输入功能
- 自适应高度的多行文本输入框
- Enter 键发送消息
- Shift + Enter 换行
- 输入时实时调整高度（最高 200px）
- 发送按钮带圆形设计和悬停动画

## 🎨 设计系统

### 颜色方案

#### 浅色模式
- **主色调**：`#667eea` → `#764ba2`（渐变）
- **背景色**：`#f9fafb`（主）、`#ffffff`（次）、`#f3f4f6`（三）
- **文字色**：`#1f2937`（主）、`#6b7280`（次）、`#9ca3af`（三）
- **边框色**：`#e5e7eb`

#### 深色模式
- **主色调**：`#667eea` → `#764ba2`（渐变）
- **背景色**：`#111827`（主）、`#1f2937`（次）、`#374151`（三）
- **文字色**：`#f9fafb`（主）、`#d1d5db`（次）、`#9ca3af`（三）
- **边框色**：`#374151`

### 间距系统
- 基础单位：`1rem = 16px`
- 小间距：`0.5rem`（8px）
- 中间距：`1rem`（16px）
- 大间距：`2rem`（32px）

### 圆角
- 小圆角：`0.5rem`（8px）
- 中圆角：`0.75rem`（12px）
- 大圆角：`1.5rem`（24px）
- 圆形：`50%`（头像、发送按钮）

### 阴影
- **浅色模式**：`rgba(0, 0, 0, 0.05)` ~ `rgba(0, 0, 0, 0.1)`
- **深色模式**：`rgba(0, 0, 0, 0.3)` ~ `rgba(0, 0, 0, 0.5)`

## 🔧 API 集成

### 使用模拟 API（默认）

项目默认使用模拟 API 响应，无需配置即可运行和测试界面。

### 接入真实 AI API

编辑 `src/api/chat.ts` 文件，配置你的 AI API。

#### OpenAI 示例

```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
})

export const sendChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.post('/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: '你是一个有帮助的助手' },
      { role: 'user', content: data.message }
    ]
  })

  return {
    reply: response.data.choices[0].message.content,
    timestamp: Date.now()
  }
}
```

#### 自定义后端 API

```typescript
export const sendChatMessage = async (data: ChatRequest): Promise<ChatResponse> => {
  const response = await apiClient.post('/chat', {
    message: data.message,
    history: data.history
  })

  return response.data
}
```

## 📝 使用说明

### 基本操作

#### 发送消息
1. 在底部输入框中输入你的问题
2. 按 `Enter` 键发送（或点击发送按钮）
3. 使用 `Shift + Enter` 进行换行

#### 使用建议问题
点击空状态下显示的建议卡片，快速开始对话

#### 切换主题
点击侧边栏底部的主题切换按钮，在浅色和深色模式之间切换

#### 清空对话
点击顶部右侧的垃圾桶图标，清空当前所有对话记录

#### 新建对话
点击侧边栏的"新对话"按钮，开始新的对话

#### 折叠侧边栏
- 点击侧边栏顶部的折叠按钮
- 移动端访问时侧边栏自动折叠

### Markdown 支持

AI 助手的回复支持 Markdown 格式：

- **粗体**：`**文字**`
- *斜体*：`*文字*`
- 代码：`` `代码` ``
- 代码块：
  ````
  ```javascript
  console.log('Hello World')
  ```
  ````
- 列表：`- 项目` 或 `1. 项目`
- 链接：`[文字](URL)`

## 🎯 自定义配置

### 修改建议问题

编辑 `src/components/AiChat.vue`：

```typescript
const suggestions = [
  '你的问题 1',
  '你的问题 2',
  '你的问题 3',
  '你的问题 4'
]
```

### 修改主题颜色

在 `src/components/AiChat.vue` 的 `<style>` 部分修改 CSS 变量：

```css
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
}
```

### 切换代码高亮主题

在 `src/App.vue` 中修改导入的主题：

```css
/* 可选主题：
   - atom-one-dark.css
   - atom-one-light.css
   - github.css
   - vs2015.css
   - monokai.css
   等等...
*/
@import 'highlight.js/styles/atom-one-dark.css';
```

### 调整侧边栏宽度

在 `src/components/AiChat.vue` 中修改：

```css
:root {
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 60px;
}
```

## 🌐 浏览器支持

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## 🛣️ 开发路线图

### 已完成 ✅
- [x] 基础聊天功能
- [x] Markdown 支持
- [x] 代码语法高亮
- [x] 深色/浅色模式
- [x] 侧边栏导航
- [x] 响应式设计
- [x] 消息动画

### 计划中 🚧
- [ ] 对话历史持久化存储
- [ ] 支持导出对话记录
- [ ] 消息编辑和重发功能
- [ ] 支持图片上传
- [ ] 支持语音输入
- [ ] 支持流式输出（打字效果）
- [ ] 添加用户认证
- [ ] 多语言支持（i18n）
- [ ] 自定义主题色选择器
- [ ] 插件系统

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发规范
1. 使用 TypeScript 编写代码
2. 遵循 Vue 3 Composition API 最佳实践
3. 保持代码风格一致
4. 添加必要的注释
5. 提交前运行 `npm run build` 确保构建成功

### 提交信息规范
```
feat: 新增功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 重构代码
perf: 性能优化
test: 测试相关
chore: 构建/工具链相关
```

### 开发流程
1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'feat: add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 提交 Pull Request

## ❓ 常见问题

### Q: 如何部署到生产环境？
A: 运行 `npm run build` 后，将 `dist` 目录部署到任何静态服务器（Nginx、Apache、Vercel、Netlify 等）。

### Q: 如何添加流式响应（打字效果）？
A: 需要后端支持 Server-Sent Events (SSE) 或 WebSocket，前端使用 EventSource 或 WebSocket API 接收流式数据。

### Q: 如何持久化对话历史？
A: 可以使用 localStorage、IndexedDB 或后端数据库存储。参考代码中已有的 localStorage 使用方式。

### Q: 移动端体验如何优化？
A: 项目已经做了响应式适配，包括：
- 侧边栏在小屏幕自动折叠
- 触控友好的按钮大小
- 优化的间距和字体大小

### Q: 如何更换 AI 模型？
A: 修改 `src/api/chat.ts` 中的 API 调用逻辑，指向你的 AI 服务端点。

### Q: 是否支持多用户？
A: 当前版本是单用户应用。如需多用户支持，需要添加用户认证系统和后端数据库。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

由 Claude Code 辅助开发

## 🙏 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Markdown-it](https://github.com/markdown-it/markdown-it) - Markdown 解析器
- [Highlight.js](https://highlightjs.org/) - 语法高亮库
- [Axios](https://axios-http.com/) - HTTP 客户端

设计灵感来自：
- [DeepSeek](https://www.deepseek.com/)
- [文心一言](https://yiyan.baidu.com/)
- [ChatGPT](https://chat.openai.com/)

---

如果这个项目对你有帮助，欢迎 Star ⭐

有问题或建议？欢迎提交 [Issue](../../issues)
