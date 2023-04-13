module.exports = {
  "extends": [
    "stylelint-config-standard",
  ],
  "plugins": [
    "stylelint-scss",
    "stylelint-declaration-block-no-ignored-properties"
  ],
  "rules": {
    "indentation": 4,
    // 选择器的命名规则 kebab-case，对于第三方组件可放宽限制
    "selector-class-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
    // 关闭一些规则
    "selector-type-no-unknown": null,
    "selector-pseudo-element-no-unknown": null,
    "block-no-empty": null,
    "color-hex-length": null,
    "at-rule-empty-line-before": null,
    "at-rule-name-case": null,
    "rule-empty-line-before": null
  }
}
