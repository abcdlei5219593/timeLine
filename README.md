# vue3_tsx_vite 脚手架
基于 vite, 添加 ts、vue3、axios、vant，支持 .tsx, .vue 文件
# 开发运行
1. 安装依赖
```bash
npm i
```
2. 运行项目
```bash
npm run dev
```

# FAQ
1. 如何修改接口地址，以及node环境变量的配置？ 
   + 在 public/conf 文件夹内，每一个 .js 都需要填写，config.js 会在开发时使用。在发布到服务器时会把其他的 config.[ENV].js 的内容拷贝到 config.js 内
2. 为什么我的 store 没有内容提示？
   + 需要在 vuex.d.ts 中声明你的 <code>store</code> 结构， 可以参考 demo: 《todo》
# Example
欢迎使用到本模板的项目将项目地址通过issue的方式提交过来。格式如下：
```json
{
    "title": "", // 必填 项目名称
    "url": "", // 必填 项目访问地址
    "git": "", // 非必填 项目代码地址
}
```
