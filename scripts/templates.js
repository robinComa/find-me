angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("src/main/main.html","<md-toolbar layout=\"row\">\n    <div class=\"md-toolbar-tools\" layout=\"row\">\n        <md-button ng-click=\"toggleSidenav(\'left\')\" hide-gt-sm aria-label=\"{{\'common.toogle.label\' | translate}}\">\n            <md-tooltip>\n                {{\'common.toogle.label\' | translate}}\n            </md-tooltip>\n            <ng-md-icon icon=\"view_headline\" size=\"30\"></ng-md-icon>\n        </md-button>\n        <h1>{{\'common.navbar.title\' | translate}}</h1>\n    </div>\n</md-toolbar>\n<section layout=\"row\" flex>\n    <md-sidenav ui-view=\"sidenav\" layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"></md-sidenav>\n    <div layout=\"column\" id=\"content\" layout-fill>\n        <md-content ui-view=\"content\" layout=\"column\" flex></md-content>\n    </div>\n</section>");
$templateCache.put("src/main/sidenav/view.html","<md-content>\n    <md-list>\n\n        <md-list-item ng-repeat=\"entry in entries\">\n            <md-button class=\"md-primary\" ui-sref=\"{{entry.uiSref}}\" aria-label=\"{{entry.label | translate}}\">\n                {{entry.label | translate}}\n                <ng-md-icon icon=\"{{entry.icon}}\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n\n    </md-list>\n</md-content>");
$templateCache.put("src/main/content/connect/view.html","<md-grid-list\n        md-cols-sm=\"1\" md-cols-md=\"2\" md-cols-gt-md=\"6\"\n        md-row-height-gt-md=\"1:1\" md-row-height=\"2:2\"\n        md-gutter=\"12px\" md-gutter-gt-sm=\"8px\" >\n\n    <md-grid-tile md-rowspan=\"2\" md-colspan=\"2\" md-rowspan-sm=\"1\" md-colspan-sm=\"1\" ng-repeat=\"(type, connection) in connections\">\n        <ng-md-icon icon=\"{{connection.icon.name}}\" style=\"fill: {{connection.icon.color}}\" size=\"200\"></ng-md-icon>\n        <md-grid-tile-footer layout=\"row\">\n            <h3>{{connection.label | translate}}</h3>\n            <md-button class=\"md-fab\" aria-label=\"{{connection.label | translate}}\" ng-click=\"connect(type)\">\n                <ng-md-icon icon=\"login\" size=\"40\"></ng-md-icon>\n            </md-button>\n        </md-grid-tile-footer>\n    </md-grid-tile>\n\n</md-grid-list>");
$templateCache.put("src/main/content/friends/view.html","<md-content>\n    <md-list>\n\n        <md-list-item ng-repeat=\"friend in friends | orderBy:\'name\'\" layout=\"row\" ng-click=\"toogleLove(friend)\">\n            <img ng-src=\"{{friend.image}}\" class=\"md-avatar\" alt=\"{{friend.name}}\" />\n            <div flex class=\"md-list-item-text\" layout=\"row\">\n                <ng-md-icon flex=\"10\" icon=\"{{friend.social.icon.name}}\" style=\"fill: {{friend.social.icon.color}}\" size=\"20\"></ng-md-icon>\n                <p flex=\"80\">\n                    {{ friend.name }}\n                </p>\n                <ng-md-icon flex=\"10\" icon=\"{{getLoveIcon(friend)}}\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n            </div>\n        </md-list-item>\n\n    </md-list>\n</md-content>");
$templateCache.put("src/main/content/home/view.html","<div layout=\"column\" layout-align=\"center center\" layout-fill>\n    <ng-md-icon icon=\"{{selectedIcon.name}}\" style=\"fill: {{selectedIcon.color}}\" size=\"300\" options=\"{{option}}\"></ng-md-icon>\n</div>");}]);