angular.module('ngPagination', [])
.directive('ngPagination', function () {
  return {
    restrict: 'AE',
    template: [
'<div class="ng-pagination">',
'  <form ng-if="!hidePagesize" class="form-inline pull-left" ng-submit="onsizechange(fixPageSize(pagesize))">',
'    <div class="form-group {{size ? \'form-group-\' + size : \'\'}}">',
'      <label>每页显示</label>',
'      <input type="number" ng-blur="onsizechange(fixPageSize(pagesize))" ng-model="pagesize" class="form-control pagesize"> 条',
'    </div>',
'  </form>',
'  <ul class="pagination {{size ? \'pagination-\' + size : \'\'}} pull-left">',
'    <li ng-click="prev()" ng-class="{disabled:+currentPage===1}">',
'      <a href="#" aria-label="Previous">',
'        <span aria-hidden="true">&laquo;</span>',
'      </a>',
'    </li>',
'    <li ng-if="_needShow($index+1)"',
'        ng-click="setPage($index+1)"',
'        ng-class="{active:+currentPage===$index+1}"',
'        ng-repeat="page in pages track by $index">',
'      <a href="#">{{$index+1}}</a>',
'    </li>',
'    <li ng-click="next()"',
'        ng-class="{disabled:+currentPage===totalPages}">',
'      <a href="#" aria-label="Next">',
'        <span aria-hidden="true">&raquo;</span>',
'      </a>',
'    </li>',
'  </ul>',
'  <form class="ng-pagination-input" ng-if="!hideInput" ng-submit="setPage(inputPage)">',
'    共{{totalPages}}页，转到第',
'    <input type="number" class="form-control {{size ? \'input-\' + size : \'\'}}" placeholder="页码" ng-model="inputPage"> 页',
'    <button class="btn btn-primary {{size ? \'btn-\' + size : \'\'}}" type="submit">Go</button>',
'  </form>',
'</div>'
].join(''),
    scope: {
      totalPages: '=',
      currentPage: '=?',
      aside: '=?',
      onchange: '=?',
      pagesize: '=?',
      hidePagesize: '=?',
      onsizechange: '=?',
      hideInput: '=?',
      size: '@?'
    },
    link: function (scope, elem, attrs) {
      // 初始化
      scope.currentPage = scope.currentPage || 1;
      scope.inputPage = scope.currentPage;
      scope.onchange = scope.onchange || angular.noop;
      scope.pagesize = scope.pagesize || 10;

      // 生成页辅助数组
      scope.pages = new Array(scope.totalPages);

      // 设置页码
      scope.setPage = function (page) {
        scope.currentPage = page < 1
          ? 1
          : page > scope.totalPages
            ? scope.totalPages
            : page;
      };

      // 上一页
      scope.prev = function () {
        scope.currentPage = scope.currentPage > 1 ? scope.currentPage - 1 : 1;
      };

      // 下一页
      scope.next = function () {
        scope.currentPage = scope.currentPage < scope.totalPages ? scope.currentPage + 1 : scope.totalPages;
      };

      // 限制size<500
      scope.fixPageSize = function (size) {
        scope.pagesize = size > 500
          ? 500
          : size < 1
            ? 1
            : size;
        return scope.pagesize;
      };

      // 判断当前页码是否需要显示
      scope._needShow = function (index) {
        // aside意为当前页码双侧(不计首页和尾页)各显示多少个页码
        var aside = scope.aside || 5;
        if (scope.totalPages < (aside * 2 + 3)) {
          return true;
        }
        var offset = scope.currentPage < (aside + 1)
          ? aside - scope.currentPage + 1
          : scope.currentPage > (scope.totalPages - aside)
            ? (scope.totalPages - scope.currentPage - aside)
            : 0;
        return ((index >= scope.currentPage - aside + offset) && (index <= scope.currentPage + aside + offset))
               || (index === 1)
               || (index === scope.totalPages);
      };

      // 页码变化触发onchange事件
      scope.$watch('currentPage', function (currentPage, originalPage) {
        if (currentPage != originalPage) {
          scope.onchange(currentPage, originalPage, scope.pagesize);
          scope.inputPage = scope.currentPage;
        }
      });

      // 总页数变化触发事件
      scope.$watch('totalPages', function () {
        scope.pages = new Array(scope.totalPages);
      });
    }
  };
});
