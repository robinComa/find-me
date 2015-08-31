angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("src/main/main.html","<md-toolbar layout=\"row\">\n    <div class=\"md-toolbar-tools\" layout=\"row\" layout-align=\"end start\">\n        <md-button title=\"{{\'common.toogle.label\' | translate}}\"\n                   aria-label=\"{{\'common.toogle.label\' | translate}}\"\n                   ng-click=\"toggleSidenav(\'left\')\" hide-gt-sm\n                   class=\"md-icon-button btn-toggle-sidenav\">\n            <ng-md-icon icon=\"view_headline\" style=\"fill: pink\" size=\"30\"></ng-md-icon>\n        </md-button>\n        <h1 flex=\"50\"><a ui-sref=\"friends\">{{\'common.navbar.title\' | translate}}</a></h1>\n        <basket-content basket=\"me.basket\"></basket-content>\n    </div>\n</md-toolbar>\n<section layout=\"row\" flex>\n    <md-sidenav ui-view=\"sidenav\"  md-swipe-left=\"toggleSidenav(\'left\')\" layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia(\'gt-sm\')\"></md-sidenav>\n    <div layout=\"column\" id=\"content\" layout-fill flex flex-md=\"72\">\n        <md-content ui-view=\"content\" class=\"state-{{state.current.name}}\" layout=\"column\" flex></md-content>\n    </div>\n</section>");
$templateCache.put("src/main/sidenav/view.html","<md-content>\n    <md-list>\n        <md-list-item>\n            <md-button class=\"md-primary\" ui-sref=\"friends-list\" ng-click=\"toggleSidenav(\'left\')\" aria-label=\"{{\'sidenav.entry.label.friends\' | translate}}\">\n                {{\'sidenav.entry.label.friends\' | translate}}\n                <ng-md-icon icon=\"group\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n        <md-list-item>\n            <md-button class=\"md-primary\" ui-sref=\"secret-box\" ng-click=\"toggleSidenav(\'left\')\" aria-label=\"{{\'sidenav.entry.label.secretbox\' | translate}}\">\n                {{\'sidenav.entry.label.secretbox\' | translate}}\n                <span class=\"nb-secret-box-news\">{{nbSecretBoxNews}}</span>\n                <ng-md-icon icon=\"favorite_outline\" size=\"14\" class=\"icon-love\"></ng-md-icon>\n                <ng-md-icon icon=\"markunread_mailbox\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n        <md-list-item>\n            <md-button class=\"md-primary\" ui-sref=\"connect\" ng-click=\"toggleSidenav(\'left\')\" aria-label=\"{{\'sidenav.entry.label.connect\' | translate}}\">\n                {{\'sidenav.entry.label.connect\' | translate}}\n                <ng-md-icon icon=\"apps\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n        <md-list-item>\n            <md-button class=\"md-primary\" ui-sref=\"settings\" ng-click=\"toggleSidenav(\'left\')\" aria-label=\"{{\'sidenav.entry.label.settings\' | translate}}\">\n                {{\'sidenav.entry.label.settings\' | translate}}\n                <ng-md-icon icon=\"settings_applications\" size=\"30\"></ng-md-icon>\n            </md-button>\n        </md-list-item>\n    </md-list>\n\n    <div class=\"socialCarousel\" layout=\"row\" layout-align=\"center end\">\n        <ng-md-icon icon=\"{{selectedIcon.name}}\" style=\"fill: {{selectedIcon.color}}\" size=\"50\" options=\"{{option}}\"></ng-md-icon>\n    </div>\n\n</md-content>");
$templateCache.put("src/components/basket-content/view.html","<p class=\"label-love-length\">{{basket.loves}}</p>\n<ng-md-icon icon=\"favorite\" style=\"fill: pink\" size=\"25\" class=\"icon-love\"></ng-md-icon>\n<ng-md-icon ng-if=\"moveMinusOne\" icon=\"exposure_minus_1\" style=\"fill: pink\" size=\"20\" class=\"icon-minus-one\"></ng-md-icon>\n\n<md-button title=\"{{\'basket.shopping.link.label\' | translate}}\"\n           aria-label=\"{{\'basket.shopping.link.label\' | translate}}\"\n           class=\"md-icon-button btn-shopping\">\n    <ng-md-icon icon=\"add_shopping_cart\" style=\"fill: pink\" size=\"30\"></ng-md-icon>\n</md-button>");
$templateCache.put("src/components/body-message-action/view.html","<div layout=\"column\" layout-align=\"center center\">\n    <h1>{{ titleLabel | translate }} :\'(</h1>\n    <p>{{ messageLabel | translate }}</p>\n\n    <md-button ui-sref=\"{{action}}\" class=\"md-raised md-primary\" aria-label=\"{{actionLabel | translate}}\">\n        {{actionLabel | translate}}\n    </md-button>\n</div>");
$templateCache.put("src/components/friend-preview/view.html","<div layout=\"row\">\n    <ng-md-icon class=\"friend-preview-social-icon\" icon=\"{{getSocialIcon(friend.type).name}}\" ng-style=\"{fill: getSocialIcon(friend.type).color}\" size=\"20\"></ng-md-icon>\n    <img ng-src=\"{{friend.picture}}\" class=\"avatar\" alt=\"{{friend.name}}\"/>\n    <div flex layout=\"row\" layout-align=\"center center\">\n        <ng-transclude flex></ng-transclude>\n        <ng-md-icon ng-if=\"friend.love\" icon=\"favorite\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n    </div>\n</div>\n");
$templateCache.put("src/main/content/connect/view.html","<div layout=\"row\">\n\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n        <md-card-content>\n\n            <md-list>\n                <md-list-item ng-repeat=\"(type, connection) in connections\">\n\n                    <md-switch\n                            aria-label=\"{{connection.label | translate}}\"\n                            class=\"md-primary\"\n                            ng-model=\"connectionModel[type]\"\n                            ng-change=\"toggleConnection(type)\"\n                            ng-disabled=\"isNotImplemented(type)\">\n\n                        <div layout=\"row\" layout-align=\"center center\">\n                            <ng-md-icon icon=\"{{connection.icon.name}}\" style=\"fill: {{connection.icon.color}}\" size=\"30\"></ng-md-icon>\n                            <p ng-if=\"!isNotImplemented(type) && isConnected(type)\">{{\'connect.is.connected\' | translate}}</p>\n                            <p ng-if=\"!isNotImplemented(type) && !isConnected(type)\">{{\'connect.is.not.connected\' | translate}}</p>\n                            <p ng-if=\"isNotImplemented(type)\">{{\'connect.is.not.implemented\' | translate}}</p>\n                        </div>\n\n                    </md-switch>\n\n                    <md-divider ng-if=\"!$last\"></md-divider>\n\n                </md-list-item>\n            </md-list>\n\n        </md-card-content>\n    </md-card>\n\n</div>");
$templateCache.put("src/main/content/friends/view.html","<md-progress-linear ng-if=\"loading\" md-mode=\"indeterminate\"></md-progress-linear>\n\n<div layout=\"row\" flex ui-view></div>\n\n<md-button ng-if=\"friends.length > 0 && !loading\" ng-click=\"toggleListFace()\" class=\"btn-toggle-list-face md-raised md-fab md-raised\" aria-label=\"TODO!!!!!!!!!!!!!!!!\">\n    <ng-md-icon icon=\"{{listOrFaceIcon()}}\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n</md-button>");
$templateCache.put("src/main/content/secretbox/view.html","<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-card-content ng-if=\"friends.length === 0\" flex>\n            <body-message-action\n                    title-label=\"secretbox.no.friend.title\"\n                    message-label=\"secretbox.no.friend.description\"\n                    action-label=\"secretbox.no.friend.button\"\n                    action=\"friends-list\">\n            </body-message-action>\n        </md-card-content>\n\n        <md-card-content ng-if=\"secretBox.length > 0\" flex layout=\"column\">\n\n            <md-list>\n                <md-list-item ng-repeat=\"secret in secretBox | orderByFresh track by secret.messages\" ng-class=\"{unread: secret.hasNews}\">\n                    <friend-preview friend=\"secret.friend\" flex>\n                        <ng-md-icon ng-if=\"secret.friend.verified\" icon=\"beenhere\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n                        <ng-md-icon ng-if=\"secret.friend.inLove\" icon=\"favorite\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n                        <ng-md-icon ng-if=\"!secret.friend.inLove\" icon=\"favorite_outline\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n                        <p>{{ secret.friend.name }}</p>\n                        <time>{{secret.lastUpdate | date:\'short\'}}</time>\n                    </friend-preview>\n                    <md-button ng-if=\"secret.friend.inLove\" class=\"md-fab md-raised\" ui-sref=\"secret-box-dialog({id: secret.messages})\" aria-label=\"{{\'dialog.read.message.btn\' | translate}}\">\n                        <ng-md-icon icon=\"forum\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                    <md-divider ng-if=\"!$last\"></md-divider>\n                </md-list-item>\n            </md-list>\n\n        </md-card-content>\n\n    </md-card>\n</div>");
$templateCache.put("src/main/content/settings/view.html","<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-content>\n            <form md-content layout-padding class=\"autoScroll\" name=\"settingsForm\" ng-submit=\"submit()\">\n\n                <md-input-container>\n                    <label>{{\'settings.login.placeholder\' | translate}}</label>\n                    <input ng-model=\"meCopy.login\" name=\"login\" type=\"text\" required ng-minlength=\"5\" ng-maxlength=\"15\"/>\n                    <ng-md-icon icon=\"account_circle\" size=\"50\"></ng-md-icon>\n                    <div ng-messages=\"settingsForm.login.$error\">\n                        <div ng-message=\"required\">{{\'settings.login.error.required\' | translate}}</div>\n                        <div ng-message=\"maxlength\">{{\'settings.login.error.maxlength\' | translate}}</div>\n                        <div ng-message=\"minlength\">{{\'settings.login.error.minlength\' | translate}}</div>\n                    </div>\n                </md-input-container>\n\n                <md-input-container>\n                    <label>{{\'settings.password.placeholder\' | translate}}</label>\n                    <input ng-model=\"meCopy.password\" name=\"password\" type=\"password\" required ng-minlength=\"5\" ng-maxlength=\"15\"/>\n                    <ng-md-icon icon=\"vpn_key\" size=\"50\"></ng-md-icon>\n                    <div ng-messages=\"settingsForm.password.$error\">\n                        <div ng-message=\"required\">{{\'settings.password.error.required\' | translate}}</div>\n                        <div ng-message=\"maxlength\">{{\'settings.password.error.maxlength\' | translate}}</div>\n                        <div ng-message=\"minlength\">{{\'settings.password.error.minlength\' | translate}}</div>\n                    </div>\n                </md-input-container>\n\n                <md-input-container>\n                    <label>{{\'settings.email.placeholder\' | translate}}</label>\n                    <input ng-model=\"meCopy.email\" name=\"email\" type=\"email\" required/>\n                    <ng-md-icon icon=\"mail\" size=\"50\"></ng-md-icon>\n                    <div ng-messages=\"settingsForm.email.$error\">\n                        <div ng-message=\"required\">{{\'settings.email.error.required\' | translate}}</div>\n                        <div ng-message=\"email\">{{\'settings.email.error.email\' | translate}}</div>\n                    </div>\n                </md-input-container>\n\n                <div layout=\"row\" layout-align=\"end start\">\n                    <md-button type=\"submit\" class=\"md-raised md-primary\" ng-disabled=\"!settingsForm.$valid\">{{\'settings.form.submit.label\' | translate}}</md-button>\n                </div>\n\n            </form>\n\n            <md-divider ></md-divider>\n\n            <md-button type=\"button\" class=\"md-raised md-warn\" ng-click=\"disconnect()\">{{\'settings.disconnect.btn.label\' | translate}}</md-button>\n        </md-content>\n    </md-card>\n</div>");
$templateCache.put("src/main/content/friends/face/view.html","<md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n    <md-card-content layout=\"column\"layout-align=\"center center\" ng-if=\"!friend\" flex>\n        <p>{{\'friends.face.no.result\' | translate}}</p>\n    </md-card-content>\n\n    <md-card-content layout=\"column\" layout-align=\"center center\" ng-if=\"friend\">\n        <h1>{{ friend.name }}</h1>\n\n        <div layout=\"row\" layout-align=\"center center\">\n            <img ng-src=\"{{friend.picture}}\" alt=\"{{ friend.name }}\" flex/>\n            <md-button aria-label=\"{{\'friends.face.next\' | translate}}\" class=\"next md-icon-button\" ng-click=\"refreshFace(filteringFriends)\">\n                <ng-md-icon icon=\"chevron_right\" style=\"fill: pink\" size=\"180\"></ng-md-icon>\n            </md-button>\n        </div>\n\n        <div layout=\"row\" layout-align=\"center center\" class=\"btn-toolbar-choice\">\n            <md-button class=\"md-fab md-primary\" ng-disabled=\"friend.love\" aria-label=\"{{\'friends.list.menu.action.toggle.visibility\' | translate}}\" ng-click=\"toggleFriendVisibility(friend)\">\n                <ng-md-icon icon=\"visibility_off\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n            </md-button>\n            <md-button class=\"md-fab md-primary\" aria-label=\"{{\'friends.list.menu.action.toggle.love\' | translate}}\" ng-click=\"toogleLove(friend, $event)\">\n                <ng-md-icon icon=\"favorite\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n            </md-button>\n        </div>\n\n        <md-button class=\"btn-length md-fab md-raised md-mini\" aria-label=\"length\">\n            {{filteringFriends.length}}\n        </md-button>\n\n    </md-card-content>\n\n</md-card>");
$templateCache.put("src/main/content/friends/list/view.html","<md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n    <md-card-content ng-if=\"friends.length === 0 && !loading\">\n        <body-message-action\n                title-label=\"friends.no.friend.title\"\n                message-label=\"friends.no.friend.description\"\n                action-label=\"friends.no.friend.button\"\n                action=\"connect\">\n        </body-message-action>\n    </md-card-content>\n\n    <md-card-content ng-if=\"friends.length > 0\" flex layout=\"column\">\n\n        <md-input-container flex=\"10\">\n            <label>{{\'friends.filter.name.label\' | translate}}</label>\n            <input ng-model=\"filter.search\" type=\"text\"/>\n            <ng-md-icon ng-click=\"filter.search = \'\'\" ng-if=\"filter.search\" icon=\"clear\" size=\"50\"></ng-md-icon>\n        </md-input-container>\n\n        <p ng-if=\"friends.length > 0 && filteringFriends.length === 0 && !loading\">{{ \'friends.filter.no.friend.description\' | translate }}</p>\n\n        <md-virtual-repeat-container flex>\n            <div\n                class=\"repeated-item\" layout=\"row\"\n                md-virtual-repeat=\"friend in filteringFriends\">\n\n                <friend-preview friend=\"friend\" flex>\n                    <p>{{ friend.name }}</p>\n                </friend-preview>\n\n                <md-menu md-position-mode=\"target-right target\" md-offset=\"0 -7\">\n                    <md-button aria-label=\"Open phone interactions menu\" class=\"md-icon-button\" ng-click=\"openMenu($mdOpenMenu, $event)\">\n                        <ng-md-icon flex=\"15\" icon=\"more_vert\" style=\"fill: pink\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                    <md-menu-content width=\"2\">\n                        <md-menu-item ng-if=\"friend.visibility\">\n                            <md-button aria-label=\"{{\'friends.list.menu.action.toggle.love\' | translate}}\" ng-click=\"toogleLove(friend, $event)\">\n                                <ng-md-icon icon=\"{{getLoveIcon(friend)}}\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n                            </md-button>\n                        </md-menu-item>\n                        <md-menu-item ng-if=\"!friend.love\">\n                            <md-button ng-disabled=\"friend.love\" aria-label=\"{{\'friends.list.menu.action.toggle.visibility\' | translate}}\" ng-click=\"toggleFriendVisibility(friend)\">\n                                <ng-md-icon icon=\"{{friend.visibility ? \'visibility_off\' : \'visibility\'}}\" style=\"fill: pink\" size=\"40\"></ng-md-icon>\n                            </md-button>\n                        </md-menu-item>\n                    </md-menu-content>\n                </md-menu>\n\n            </div>\n        </md-virtual-repeat-container>\n\n    </md-card-content>\n\n    <friends-filter ng-show=\"friends.length > 0\" filter=\"filter\" result=\"filteringFriends.length\"></friends-filter>\n\n</md-card>");
$templateCache.put("src/main/content/secretbox/dialog/view.html","<div layout=\"row\">\n    <md-card flex offset-gt-md=\"25\" flex-gt-md=\"50\">\n\n        <md-content>\n\n            <md-list>\n                <md-subheader class=\"md-no-sticky\">\n                    <md-button class=\"md-icon-button\" aria-label=\"{{\'dialog.show.back.btn\' | translate}}\" ui-sref=\"secret-box\">\n                        <ng-md-icon icon=\"arrow_back\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                    </md-button>\n                    <p>{{ dialog.friend.name }}</p>\n                </md-subheader>\n                <md-list-item class=\"md-3-line\" ng-repeat=\"message in dialog.messages | orderBy:\'when\'\" layout=\"row\">\n                    <friend-preview friend=\"dialog.friend\" flex>\n                        <p class=\"date\">{{message.when | date}}</p>\n                        <p class=\"no-wrap\">{{message.what}}</p>\n                    </friend-preview>\n                </md-list-item>\n\n            </md-list>\n\n            <md-divider></md-divider>\n\n            <form name=\"sendMessageForm\" ng-submit=\"sendMessage()\" novalidate>\n                <md-input-container flex>\n                    <label>{{\'dialog.show.send.message.label\' | translate}}</label>\n                    <textarea ng-model=\"newMessage.what\" columns=\"1\" md-maxlength=\"150\" required></textarea>\n                </md-input-container>\n\n                <md-button class=\"md-fab md-primary submit-btn\" aria-label=\"{{\'dialog.show.send.message.submit.label\' | translate}}\" ng-disabled=\"!sendMessageForm.$valid\">\n                    <ng-md-icon icon=\"send\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n                </md-button>\n            </form>\n\n        </md-content>\n    </md-card>\n</div>");
$templateCache.put("src/main/content/friends/list/filter/view.html","<md-fab-speed-dial md-direction=\"up\" md-open=\"isOpen\" class=\"md-fling\">\n    <md-fab-trigger>\n        <md-button aria-label=\"menu\" class=\"md-fab md-primary filter-btn\">\n            <ng-md-icon icon=\"search\" ng-style=\"{fill: \'pink\'}\" size=\"30\"></ng-md-icon>\n        </md-button>\n    </md-fab-trigger>\n    <md-fab-actions>\n        <md-button class=\"md-fab md-raised md-mini\" ng-repeat=\"(key, social) in socials\" ng-value=\"key\" aria-label=\"{{social.label | translate}}\" ng-click=\"socialToggle(key)\">\n            <ng-md-icon icon=\"{{social.icon.name}}\" ng-style=\"{fill: socialIsSeleced(key) ? social.icon.color : \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.not.love.label\' | translate}}\" ng-click=\"loveSelected(false)\">\n            <ng-md-icon icon=\"favorite_outline\" ng-style=\"{fill: loveIsSelected(false) ? \'pink\': \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.love.label\' | translate}}\" ng-click=\"loveSelected(true)\">\n            <ng-md-icon icon=\"favorite\" ng-style=\"{fill: loveIsSelected(true) ? \'pink\': \'grey\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n        <md-button class=\"md-fab md-raised md-mini\" aria-label=\"{{\'friends.filter.hide.label\' | translate}}\" ng-click=\"visibilityToggle()\">\n            <ng-md-icon icon=\"{{filter.visibility? \'visibility\': \'visibility_off\'}}\" ng-style=\"{fill: \'pink\'}\" size=\"20\"></ng-md-icon>\n        </md-button>\n    </md-fab-actions>\n</md-fab-speed-dial>\n\n<md-button class=\"btn-length md-fab md-raised md-mini\" aria-label=\"length\">\n    {{result}}\n</md-button>");}]);