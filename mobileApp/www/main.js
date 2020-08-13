(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");



var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Header -->\n<header id=\"header\">\n  <!-- Center Header -->\n  <div id=\"center-header\">\n      <div class=\"container\">\n          <div class=\"header-logo\">\n              <a href=\"#\" class=\"logo\">\n                  <img src=\"assets/img/logo.png\" alt=\"\">\n              </a>\n    <p>Developed by Ankur Sharma(\n          <a href=\"https://www.linkedin.com/in/ankur-sharma-341446b1/\">Contact Me </a>)</p>\n          </div>\n          <div class=\"header-ads\">\n              <img class=\"center-block\" src=\"assets/img/ad-2.jpg\" alt=\"\">\n          </div>\n      </div>\n  </div>\n  <!-- /Center Header -->\n</header>\n<!-- /Header -->\n\n\n<!-- SECTION -->\n<div class=\"section\">\n  <!-- CONTAINER -->\n  <div class=\"container-fluid\">\n      <!-- ROW -->\n      <div class=\"row\">\n          <!-- Main Column -->\n          <div class=\"col-md-12\">\n              <!-- section title -->\n              <div id=\"mainNav\" class=\"section-title\">\n                  <h2 class=\"title\">Trending News</h2>\n                  <!-- tab nav -->\n                  <ul class=\"nav nav-tabs pull-right\" role=\"tablist\">\n                      <li class=\"active\">\n                          <a data-toggle=\"tab\" (click)=\"getNews('all')\">International</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('general')\">India</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('business')\">Business</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('entertainment')\">Entertainment</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('health')\">Health</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('science')\">Science</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('sport')\">Sport</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('technology')\">Technology</a>\n                      </li>\n                      <li>\n                          <a data-toggle=\"tab\" (click)=\"getNews('offbeat')\">Offbeat</a>\n                      </li>\n                  </ul>\n                  <!-- /tab nav -->\n              </div>\n          </div>\n      </div>\n  </div>\n  <div align=\"center\" *ngIf=\"loading\"> \n      <img src=\"assets/img/loading.gif\" alt=\"Loading...\"/>\n  </div>\n  <!-- /section title -->\n  <!-- Tab content -->\n  <div id=\"all\" class=\"tab-content\">\n      <!-- tab1 -->\n      <div class=\"tab-pane fade in active\">\n          <!-- row -->\n          <div class=\"container-fluid\">\n          <div class=\"row\" style=\"display:flex;flex-wrap:wrap;\">\n              <div class=\"col-md-3 col-sm-6\" *ngFor=\"let news of newsSource\" (deferLoad)=\"news.show = true\">\n                  <div>\n                      <table style=\"border: 3px solid black;\">\n                          <tr>\n                              <td style=\"border: 3px solid black;\" *ngIf=\"news.show\">\n                                  <a (click)=\"detailNews(news.url)\">\n                                      <img src=\"{{news.urlToImage}}\" height=\"150\" width=\"100%\" alt=\"Image not Available\">\n                                  </a>\n                              </td>\n                          </tr>\n                      </table>\n                      <font size=\"2\" face=\"serif\" color=\"grey\">{{news.publishedAt}}</font>\n                      <h6>\n                          <a ng-click=\"detailNews(news.url)\">\n                              <b style=\"font-family: 'Droid Serif'; font-size: 17px\">{{news.title}}:</b>\n                              <i style=\"color:maroon;font-family: 'Playfair Display'; font-size: 15px\">{{news.description}}</i>\n                          </a>\n                      </h6>\n                  </div>\n\n\n\n              </div>\n          </div>\n    </div>\n          <hr/>\n          <!-- /ARTICLE -->\n      </div>\n  </div>\n  <!-- /row -->\n</div>\n<!-- /Main Column -->\n\n<!-- Tab content -->\n<!-- END OF TABS -->\n<!-- /ROW -->\n\n<!-- /CONTAINER -->\n<!-- /SECTION -->\n<!-- /FOOTER -->\n\n<!-- Back to top -->\n<div id=\"back-to-top\"></div>\n<!-- Back to top -->\n<script>\n  $('#back-to-top').on(\"click\", function () {\n      $('body,html').animate({\n          scrollTop: 0\n      }, 500);\n  });\n  /* \n  window.onscroll = function() {fixHeader()};\n  var navbar = document.getElementById(\"mainNav\");\n  var sticky = navbar.offsetTop;\n  function fixHeader() {\n      if (window.pageYOffset >= sticky) {\n          navbar.classList.add(\"sticky\")\n      } else {\n          navbar.classList.remove(\"sticky\");\n      }\n  }\n  */\n</script>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var AppComponent = /** @class */ (function () {
    function AppComponent(http) {
        this.http = http;
        this.title = 'BlazingNews';
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get("https://35.224.154.91:3000/all").subscribe(function (res) {
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var elem = res_1[_i];
                elem["show"] = false;
                if (elem["urlToImage"].includes("./img")) {
                    var arr = elem["urlToImage"].split("/");
                    elem["urlToImage"] = './assets/img/' + arr[2];
                }
            }
            _this.newsSource = res;
        });
    };
    AppComponent.prototype.getNews = function (source) {
        var _this = this;
        this.newsSource = null;
        this.loading = true;
        this.http.get("https://35.224.154.91:3000/" + source).subscribe(function (res) {
            for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                var elem = res_2[_i];
                elem["show"] = false;
                if (elem["urlToImage"].includes("./img")) {
                    var arr = elem["urlToImage"].split("/");
                    elem["urlToImage"] = './assets/img/' + arr[2];
                }
            }
            _this.newsSource = res;
            _this.loading = false;
        });
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _trademe_ng_defer_load__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @trademe/ng-defer-load */ "./node_modules/@trademe/ng-defer-load/dist/index.js");
/* harmony import */ var _trademe_ng_defer_load__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_trademe_ng_defer_load__WEBPACK_IMPORTED_MODULE_6__);







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _trademe_ng_defer_load__WEBPACK_IMPORTED_MODULE_6__["DeferLoadModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ankur/Documents/projects/BlazingNewsNg8/BlazingNews/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map