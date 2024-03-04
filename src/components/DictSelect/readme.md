# 目录
index.vue // 视图文件，使用 useDictData 获取到想要的字典数据，并作展示，目前只要形式为 el-select
```js
    // DictSelect 组件已全局注册
    // DictType 从 localDictDefine 映入
    <DictSelect v-model="apiParams.select" :type="DictType.EMS_TYPE"></DictSelect>
```
localDictDefine.ts // 一些本地写死的字典数据
type.d.ts // 字典数据结构定义
useDictData.ts // 获取字典数据的 hook，所有想要的字典数据都从这个 hook 取