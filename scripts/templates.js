angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("src/main/main.html","<md-toolbar layout=\"row\">\n    <div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"end start\">\n        <md-button ng-click=\"toggleSidenav(\'left\')\" hide-gt-sm aria-label=\"{{\'common.toogle.label\' | translate}}\">\n            <md-tooltip>\n                {{\'common.toogle.label\' | translate}}\n            </md-tooltip>\n            <ng-md-icon icon=\"view_headline\" size=\"30\"></ng-md-icon>\n        </md-button>\n        <h1 flex=\"50\" ui-sref=\"friends\">{{\'common.navbar.title\' | translate}}</h1>\n        <p class=\"login\">{{me.login}}</p>\n    </div>\n</md-toolbar>\n<section layout=\"row\" flex>\n    <md-sidenav ui-view=\"sidenav\"  md-swipe-left=\"toggleSidenav(\'left\')\" layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"></md-sidenav>\n    <div layout=\"column\" id=\"content\" layout-fill flex flex-md=\"72\">\n        <md-content ui-view=\"content\" class=\"state-{{state.current.name}}\" layout=\"column\"></md-content>\n    </div>\n</section>");
$templateCache.put("src/components/friend-preview/view.html","<div layout=\"row\">\n    <ng-md-icon class=\"friend-preview-social-icon\" icon=\"{{getSocialIcon(friend.type).name}}\" ng-style=\"{fill: getSocialIcon(friend.type).color}\" size=\"20\"></ng-md-icon>\n    <img ng-src=\"{{friend.picture}}\" class=\"avatar\" alt=\"{{friend.name}}\"/>\n    <div flex layout=\"row\" layout-align=\"center center\">\n        <ng-transclude flex></ng-transclude>\n        <ng-md-icon ng-if=\"friend.love\" icon=\"favorite\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n    </div>\n</div>\n");
$templateCache.put("src/main/sidenav/view.html","<md-content>\n    <md-list>\n        <md-list-item ng-repeat=\"entry in entries\">\n            <md-button class=\"md-primary\" ui-sref=\"{{entry.uiSref}}\" ng-click=\"toggleSidenav(\'left\')\" aria-label=\"{{entry.label | translate}}\">\n                {{entry.label | translate}}\n                <ng-md-icon icon=\"{{entry.icon}}\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n    </md-list>\n\n    <div class=\"socialCarousel\" layout=\"row\" layout-align=\"center end\">\n        <ng-md-icon icon=\"{{selectedIcon.name}}\" style=\"fill: {{selectedIcon.color}}\" size=\"50\" options=\"{{option}}\"></ng-md-icon>\n    </div>\n\n</md-content>");
$templateCache.put("src/main/content/connect/view.html","<md-grid-list\n    md-cols-sm=\"2\"\n    md-cols-md=\"2\"\n    md-cols-lg=\"3\"\n    md-cols-gt-lg=\"4\"\n    md-row-height=\"3:4\"\n    md-row-height-gt-lg=\"6:7\"\n>\n    <md-grid-tile ng-repeat=\"(type, connection) in connections\">\n        <md-whiteframe class=\"md-whiteframe-z2\" layout=\"column\" layout-align=\"center center\">\n            <ng-md-icon icon=\"{{connection.icon.name}}\" style=\"fill: {{connection.icon.color}}\" size=\"100\"></ng-md-icon>\n            <md-button\n                    class=\"md-raised\"\n                    ng-class=\"{\'md-primary\': !isConnected(type)}\"\n                    aria-label=\"{{connection.label | translate}}\"\n                    ng-disabled=\"isNotImplemented(type)\"\n                    ng-click=\"connectToogle($event, type)\">\n                <h3 ng-if=\"!isNotImplemented(type) && isConnected(type)\">{{\'connect.is.connected\' | translate}}</h3>\n                <h3 ng-if=\"!isNotImplemented(type) && !isConnected(type)\">{{\'connect.is.not.connected\' | translate}}</h3>\n                <h3 ng-if=\"isNotImplemented(type)\">{{\'connect.is.not.implemented\' | translate}}</h3>\n            </md-button>\n        </md-whiteframe>\n    </md-grid-tile>\n</md-grid-list>");
$templateCache.put("src/main/content/dialog/view.html","<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-content>\n\n            <md-list ng-if=\"unreadDialogs.length > 0\">\n                <md-subheader class=\"md-no-sticky\">{{\'dialog.unread.title\' | translate}} : {{unreadDialogs.length}}</md-subheader>\n                <md-list-item class=\"md-3-line dialog-unread\" ng-repeat=\"dialog in unreadDialogs\">\n                    <friend-preview friend=\"dialog.friend\" flex>\n                        <h3>{{ dialog.friend.name }}</h3>\n                        <p>{{ dialog.messages[dialog.messages.length - 1].when | date}}</p>\n                    </friend-preview>\n                    <md-button class=\"md-fab md-primary\" ui-sref=\"dialog-show({id: dialog.id})\" aria-label=\"{{\'dialog.read.message.btn\' | translate}}\">\n                        <ng-md-icon icon=\"forum\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                </md-list-item>\n            </md-list>\n\n            <md-divider></md-divider>\n\n            <md-list ng-if=\"readDialogs.length > 0\">\n                <md-subheader class=\"md-no-sticky\">{{\'dialog.read.title\' | translate}} : {{readDialogs.length}}</md-subheader>\n                <md-list-item class=\"md-3-line dialog-read\" ng-repeat=\"dialog in readDialogs\">\n                    <friend-preview friend=\"dialog.friend\" flex>\n                        <h3>{{ dialog.friend.name }}</h3>\n                        <p>{{ dialog.messages[dialog.messages.length - 1].when | date}}</p>\n                    </friend-preview>\n                    <md-button class=\"md-fab md-raised\" ui-sref=\"dialog-show({id: dialog.id})\" aria-label=\"{{\'dialog.read.message.btn\' | translate}}\">\n                        <ng-md-icon icon=\"forum\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                    </div>\n                </md-list-item>\n            </md-list>\n\n        </md-content>\n\n    </md-card>\n</div>");
$templateCache.put("src/main/content/friends/view.html","<md-progress-linear ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n\n<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-card-content ng-if=\"friends.length === 0 && !loading\">\n            <h1>{{ \'friends.no.friend.title\' | translate }} :\'(</h1>\n            <p>{{ \'friends.no.friend.description\' | translate }}</p>\n\n            <md-button ui-sref=\"connect\" class=\"md-raised md-primary\" aria-label=\"{{\'friends.no.friend.button\' | translate}}\">\n                {{\'friends.no.friend.button\' | translate}}\n            </md-button>\n        </md-card-content>\n\n        <md-card-content ng-if=\"friends.length > 0 && filteringFriends.length === 0 && !loading\">\n            <p>{{ \'friends.filter.no.friend.description\' | translate }}</p>\n        </md-card-content>\n\n        <md-card-content ng-show=\"friends.length > 0 && filteringFriends.length > 0\">\n\n            <md-list class=\"friend-list\">\n\n                <md-list-item>\n                    <md-input-container flex=\"100\">\n                        <label>{{\'friends.filter.name.label\' | translate}}</label>\n                        <input ng-model=\"filter.search\" type=\"text\"/>\n                    </md-input-container>\n                </md-list-item>\n\n                <md-list-item\n                        layout=\"row\"\n                        ng-repeat=\"friend in friends | filter:filter.search | friendFilter:filter | orderBy:\'name\' as filteringFriends track by friend.id\">\n                    <friend-preview friend=\"friend\" flex>\n                        <p>{{ friend.name }}</p>\n                    </friend-preview>\n\n                    <md-menu md-position-mode=\"target-right target\" md-offset=\"0 -7\">\n                        <md-button aria-label=\"Open phone interactions menu\" class=\"md-icon-button\" ng-click=\"openMenu($mdOpenMenu, $event)\">\n                            <ng-md-icon flex=\"15\" icon=\"more_vert\" style=\"fill: pink\" size=\"30\"></ng-md-icon>\n                        </md-button>\n                        <md-menu-content width=\"2\">\n                            <md-menu-item ng-if=\"friend.visibility\">\n                                <md-button aria-label=\"{{\'friends.list.menu.action.toggle.love\' | translate}}\" ng-click=\"toogleLove(friend)\">\n                                    <ng-md-icon icon=\"{{getLoveIcon(friend)}}\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n                                </md-button>\n                            </md-menu-item>\n                            <md-menu-item ng-if=\"!friend.love\">\n                                <md-button ng-disabled=\"friend.love\" aria-label=\"{{\'friends.list.menu.action.toggle.visibility\' | translate}}\" ng-click=\"toggleFriendVisibility(friend)\">\n                                    <ng-md-icon icon=\"{{friend.visibility ? \'visibility_off\' : \'visibility\'}}\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n                                </md-button>\n                            </md-menu-item>\n                        </md-menu-content>\n                    </md-menu>\n                </md-list-item>\n\n            </md-list>\n\n        </md-card-content>\n\n        <friends-filter ng-show=\"friends.length > 0 && !loading\" filter=\"filter\" result=\"filteringFriends.length\"></friends-filter>\n\n    </md-card>\n</div>");
$templateCache.put("src/main/content/settings/view.html","<form md-content layout-padding class=\"autoScroll\" name=\"settingsForm\" ng-submit=\"submit()\">\n\n    <md-input-container>\n        <label>{{\'settings.login.placeholder\' | translate}}</label>\n        <input ng-model=\"meCopy.login\" name=\"login\" type=\"text\" required ng-minlength=\"5\" ng-maxlength=\"15\"/>\n        <ng-md-icon icon=\"account_circle\" size=\"50\"></ng-md-icon>\n        <div ng-messages=\"settingsForm.login.$error\">\n            <div ng-message=\"required\">{{\'settings.login.error.required\' | translate}}</div>\n            <div ng-message=\"maxlength\">{{\'settings.login.error.maxlength\' | translate}}</div>\n            <div ng-message=\"minlength\">{{\'settings.login.error.minlength\' | translate}}</div>\n        </div>\n    </md-input-container>\n\n    <md-input-container>\n        <label>{{\'settings.password.placeholder\' | translate}}</label>\n        <input ng-model=\"meCopy.password\" name=\"password\" type=\"password\" required ng-minlength=\"5\" ng-maxlength=\"15\"/>\n        <ng-md-icon icon=\"vpn_key\" size=\"50\"></ng-md-icon>\n        <div ng-messages=\"settingsForm.password.$error\">\n            <div ng-message=\"required\">{{\'settings.password.error.required\' | translate}}</div>\n            <div ng-message=\"maxlength\">{{\'settings.password.error.maxlength\' | translate}}</div>\n            <div ng-message=\"minlength\">{{\'settings.password.error.minlength\' | translate}}</div>\n        </div>\n    </md-input-container>\n\n    <md-input-container>\n        <label>{{\'settings.email.placeholder\' | translate}}</label>\n        <input ng-model=\"meCopy.email\" name=\"email\" type=\"email\" required/>\n        <ng-md-icon icon=\"mail\" size=\"50\"></ng-md-icon>\n        <div ng-messages=\"settingsForm.email.$error\">\n            <div ng-message=\"required\">{{\'settings.email.error.required\' | translate}}</div>\n            <div ng-message=\"email\">{{\'settings.email.error.email\' | translate}}</div>\n        </div>\n    </md-input-container>\n\n    <div layout=\"row\" layout-align=\"end start\">\n        <md-button type=\"submit\" class=\"md-raised md-primary\" ng-disabled=\"!settingsForm.$valid\">{{\'settings.form.submit.label\' | translate}}</md-button>\n    </div>\n\n</form>\n\n<md-divider ></md-divider>\n\n<md-button type=\"button\" class=\"md-raised md-warn\" ng-click=\"disconnect()\">{{\'settings.disconnect.btn.label\' | translate}}</md-button>");
$templateCache.put("src/main/content/dialog/show/view.html","<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-content>\n\n            <md-list>\n                <md-subheader class=\"md-no-sticky\">\n                    <md-button class=\"md-icon-button\" aria-label=\"{{\'dialog.show.back.btn\' | translate}}\" ui-sref=\"dialog\">\n                        <ng-md-icon icon=\"arrow_back\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                    <p>{{ dialog.friend.name }}</p>\n                </md-subheader>\n                <md-list-item class=\"md-3-line\" ng-repeat=\"message in dialog.messages | orderBy:\'when\'\" layout=\"row\">\n                    <friend-preview friend=\"dialog.friend\" flex>\n                        <p class=\"date\">{{message.when | date}}</p>\n                        <p class=\"no-wrap\">{{message.what}}</p>\n                    </friend-preview>\n                </md-list-item>\n\n            </md-list>\n\n            <md-divider></md-divider>\n\n            <form name=\"sendMessageForm\" ng-submit=\"sendMessage()\" novalidate>\n                <md-input-container flex>\n                    <label>{{\'dialog.show.send.message.label\' | translate}}</label>\n                    <textarea ng-model=\"newMessage.what\" columns=\"1\" md-maxlength=\"150\" required></textarea>\n                </md-input-container>\n\n                <md-button class=\"md-fab md-primary submit-btn\" aria-label=\"{{\'dialog.show.send.message.submit.label\' | translate}}\" ng-disabled=\"!sendMessageForm.$valid\">\n                    <ng-md-icon icon=\"send\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                </md-button>\n            </form>\n\n        </md-content>\n    </md-card>\n</div>");
$templateCache.put("src/main/content/friends/filter/view.html","<md-fab-speed-dial md-direction=\"up\" md-open=\"isOpen\" class=\"md-fling\">\n    <md-fab-trigger>\n        <md-button aria-label=\"menu\" class=\"md-fab md-primary filter-btn\">\n            <p><strong>{{result}}</strong></p>\n            <ng-md-icon icon=\"search\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n        </md-button>\n    </md-fab-trigger>\n    <md-fab-actions>\n        <md-button class=\"md-fab md-raised md-mini\" ng-repeat=\"(key, social) in socials\" ng-value=\"key\" aria-label=\"{{social.label | translate}}\" ng-click=\"socialToggle(key)\">\n            <ng-md-icon icon=\"{{social.icon.name}}\" ng-style=\"{fill: socialIsSeleced(key) ? social.icon.color : \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.not.love.label\' | translate}}\" ng-click=\"loveSelected(false)\">\n            <ng-md-icon icon=\"favorite_outline\" ng-style=\"{fill: loveIsSelected(false) ? \'pink\': \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.love.label\' | translate}}\" ng-click=\"loveSelected(true)\">\n            <ng-md-icon icon=\"favorite\" ng-style=\"{fill: loveIsSelected(true) ? \'pink\': \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.hide.label\' | translate}}\" ng-click=\"visibilityToggle()\">\n            <ng-md-icon icon=\"{{filter.visibility? \'visibility\': \'visibility_off\'}}\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n    </md-fab-actions>\n</md-fab-speed-dial>");}]);