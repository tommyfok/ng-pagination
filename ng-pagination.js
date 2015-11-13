angular.module('ngPagination', [])
.directive('ngPagination', function () {
  return {
    restrict: 'AE',
    template: [
'<div class="ng-pagination">',
'  <ul class="pagination {{size ? \'pagination-\' + size : \'\'}} pull-left">',
'    <li ng-click="prev()" ng-class="{disabled:+currentPage===0}">',
'      <a href="#" aria-label="Previous">',
'        <span aria-hidden="true">&laquo;</span>',
'      </a>',
'    </li>',
'    <li ng-if="_needShow($index)"',
'        ng-click="setPage($index)"',
'        ng-class="{active:+currentPage===$index}"',
'        ng-repeat="page in pages track by $index">',
'      <a href="#">{{$index+1}}</a>',
'    </li>',
'    <li ng-click="next()"',
'        ng-class="{disabled:+currentPage===totalPages-1}">',
'      <a href="#" aria-label="Next">',
'        <span aria-hidden="true">&raquo;</span>',
'      </a>',
'    </li>',
'  </ul>',
'  <form class="ng-pagination-input" ng-if="!hideInput" ng-submit="setPage(inputPage-1)">',
'    共{{totalPages}}页，转到第',
'    <input type="number" class="form-control {{size ? \'input-\' + size : \'\'}}" placeholder="页码" ng-model="inputPage"> 页',
'    <button class="btn btn-primary {{size ? \'btn-\' + size : \'\'}}" type="submit">Go!</button>',
'  </form>',
'</div>'
].join(''),
    scope: {
      currentPage: '=?',
      totalPages: '=',
      onchange: '=?',
      hideInput: '=?',
      size: '@?'
    },
    link: function (scope, elem, attrs) {
      // 初始化
      scope.currentPage = scope.currentPage || 0;
      scope.inputPage = scope.currentPage + 1;
      scope.onchange = scope.onchange || angular.noop;

      // 生成页辅助数组
      scope.pages = new Array(scope.totalPages);

      // 设置页码
      scope.setPage = function (page) {
        scope.currentPage = page < 0
          ? 0
          : page > scope.totalPages - 1
            ? scope.totalPages - 1
            : page;
      };

      // 上一页
      scope.prev = function () {
        scope.currentPage = scope.currentPage > 0 ? scope.currentPage - 1 : 0;
      };

      // 下一页
      scope.next = function () {
        scope.currentPage = scope.currentPage < scope.totalPages - 1 ? scope.currentPage + 1 : scope.currentPage;
      };

      // 判断当前页码是否需要显示
      scope._needShow = function (index) {
        // aside意为当前页码双侧各显示多少个页码
        var aside = 5;
        if (scope.totalPages < (aside * 2 + 1)) {
          return true;
        }
        var offset = scope.currentPage < aside
          ? aside - scope.currentPage
          : (scope.currentPage + aside) > (scope.totalPages - 1)
            ? (scope.totalPages - scope.currentPage - aside - 1)
            : 0;
        return ((index > scope.currentPage - aside + offset)
               && (index < scope.currentPage + aside + offset)) || (index === 0)
               || (index === scope.totalPages - 1);
      };

      // 页码变化触发onchange事件
      scope.$watch('currentPage', function (currentPage, originalPage) {
        if (currentPage != originalPage) {
          scope.onchange(currentPage, originalPage);
          scope.inputPage = scope.currentPage + 1;
        }
      });

      // 总页数变化触发事件
      scope.$watch('totalPages', function () {
        scope.pages = new Array(scope.totalPages);
      });
    }
  };
});
