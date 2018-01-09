// 常用配置
module.exports = {
    // extends: ["stylelint-config-standard"],
    // 各rules的具体作用见上面链接
    rules: {
        // "block-no-empty": null,
        // "color-no-invalid-hex": true,
        // "comment-empty-line-before": [ "always", {
        //   "ignore": ["stylelint-commands", "between-comments"],
        // } ],
        // "statement-max-nesting-depth": 2,
        // "declaration-colon-space-after": "always",
        // "max-empty-lines": 4,
        // "rule-nested-empty-line-before": [ "always", {
        //   "except": ["first-nested"],
        //   "ignore": ["after-comment"],
        // } ],
        // // 允许的单位
        // "unit-whitelist": ["em", "rem", "%", "s", "ms", "px"],
        // "at-rule-no-unknown": [true, {"ignoreAtRules" :[
        //   "mixin", "extend", "content"
        // ]}]

        // "selector-class-pattern": "^[a-z]+([a-z0-9]?|[a-z0-9\\-]*[a-z0-9])$", // 限制选择器名称写法.
        // "max-nesting-depth": 2, // 允许嵌套的深度为2
        // "number-leading-zero": "never",
        // "function-url-quotes": "always", // 地址一定要写引号
        // "font-family-name-quotes": "always-where-recommended", // 字体系列中命名时带引号
        // "value-list-comma-newline-after": "always-multi-line", // 在值列表的逗号后指定一个换行符或禁止留有空格。
        // "value-keyword-case": "lower", // 属性值小写
        // "no-empty-source": null,
        // // "at-rule-no-unknown": null
        "at-rule-no-unknown": [true, {
            "ignoreAtRules": [
                "extends",
                "ignores"
            ]
        }],

        // 推荐配置
        "block-no-empty": true,
        "color-no-invalid-hex": true,
        "comment-whitespace-inside": null,
        "declaration-colon-space-after": "always",
        "declaration-colon-space-before": "never",
        "function-comma-space-after": "always",
        "function-url-quotes": "always",
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-name-no-vendor-prefix": true,
        "max-empty-lines": 5,
        "number-leading-zero": null,
        "number-no-trailing-zeros": true,
        "property-no-vendor-prefix": true,
        
        // "rule-no-duplicate-properties": true,
        // "declaration-block-no-single-line": true,
        // "rule-trailing-semicolon": "always",
        "selector-list-comma-space-before": "never",
        "selector-list-comma-newline-after": "always",
        // "selector-no-id": true,
        "string-quotes": "double",
        "value-keyword-case": "lower",
        // "value-no-vendor-prefix": true
    }
};