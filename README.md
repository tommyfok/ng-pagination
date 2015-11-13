# ng-pagination

simple pagination component

## [Demo](http://tommyfok.github.io/ng-pagination/demo.html)

## Usage

```
<div ng-pagination
     total-pages="50"
     current-page="10"
     hide-input="false"
     onchange="yourAction"></div>
```

- `total-pages` 传入总页数
- `current-page` 传入当前页码（以0开始）
- `hide-input` 是否隐藏页码输入框
- `onchange` 页码改变时的回调，依次传入两个参数
  - `currentPage` 当前页码
  - `originalPage` 之前的页码
