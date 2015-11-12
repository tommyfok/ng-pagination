var ngPaginationTpl = [
'<nav>',
'  <ul class="pagination">',
'    <li ng-click="prev()" ng-class="{disabled:+currentPage===0}">',
'      <a href="#" aria-label="Previous">',
'        <span aria-hidden="true">&laquo;</span>',
'      </a>',
'    </li>',
'    <li ng-click="setPage($index)"',
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
'</nav>'
].join('');

angular.module('ngPagination', [])
.directive('ngPagination', function () {
  return {
    restrict: 'AE',
    template: ngPaginationTpl,
    scope: {
      currentPage: '=?',
      totalPages: '=',
      onchange: '=?'
    },
    link: function (scope, elem, attrs) {
      // 初始化
      scope.currentPage = scope.currentPage || 0;
      scope.onchange = scope.onchange || angular.noop;

      // 生成页辅助数组
      scope.pages = new Array(scope.totalPages);

      // 设置页码
      scope.setPage = function (page) {
        scope.currentPage = page;
      };

      // 上一页
      scope.prev = function () {
        scope.currentPage = scope.currentPage > 0 ? scope.currentPage - 1 : 0;
      };

      // 下一页
      scope.next = function () {
        scope.currentPage = scope.currentPage < scope.totalPages - 1 ? scope.currentPage + 1 : scope.currentPage;
      };

      // 页码变化触发onchange事件
      scope.$watch('currentPage', function (currentPage, originalPage) {
        if (currentPage != originalPage) {
          scope.onchange(currentPage, originalPage);
        }
      });

      // 总页数变化触发事件
      scope.$watch('totalPages', function () {
        scope.pages = new Array(scope.totalPages);
      });
    }
  };
});
