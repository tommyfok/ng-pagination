# ng-pagination

simple pagination component

## [Demo](http://tommyfok.github.io/ng-pagination/demo.html)

## Usage

```
<div ng-pagination
     size="sm"
     pagesize="10"
     total-pages="50"
     current-page="10"
     hide-input="false"
     onchange="yourAction"
     onsizechange="onsizechange"></div>
```

- `size` 组件尺寸，可选`lg`/`sm`，留空为普通尺寸
- `pagesize` 每页显示行数
- `total-pages` 总页数
- `current-page` 当前页码
- `hide-input` 是否隐藏页码输入框
- `onchange` 页码改变时的回调，依次传入两个参数
  - `currentPage` 当前页码
  - `originalPage` 之前的页码
- `onsizechange` pagesize改变时的回调，传入`pagesize`作为参数

## Deps
- angular: 1.3+
- bootstrap: 3.3+
