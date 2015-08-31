'use strict';

angular.module('app', [
    'ngResource',
    'pascalprecht.translate',
    'ui.router',
    'ngAria',
    'ngAnimate',
    'ngMaterial',
    'ngMdIcons',
    'ngMessages'
]).config(function(LanguageProvider, $translateProvider, $stateProvider, $urlRouterProvider, $mdThemingProvider){

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'i18n/{lang}/{part}.json'
    });

    $translateProvider.preferredLanguage(LanguageProvider.getPreferredLanguage());
    $translateProvider.cloakClassName('hidden');
    $translateProvider.useSanitizeValueStrategy(null);

    $mdThemingProvider.theme('default')
        .primaryPalette('pink')
        .accentPalette('indigo');

    $mdThemingProvider.alwaysWatchTheme(true);

    $urlRouterProvider.otherwise('/friends/list');

    $stateProvider
        .state('main', {
            abstract: true,
            url: '',
            templateUrl: 'src/main/main.html',
            controller: 'MainCtrl',
            resolve: {
                me: function(Me){
                    return Me.get().$promise;
                }
            }
        }).state('friends', {
            abstract: true,
            parent: 'main',
            url: '/friends',
            views: {
                sidenav: {
                    templateUrl: 'src/main/sidenav/view.html',
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: 'src/main/content/friends/view.html',
                    controller: 'FriendsCtrl'
                }
            }
        }).state('friends-list', {
            parent: 'friends',
            url: '/list',
            templateUrl: 'src/main/content/friends/list/view.html',
            controller: 'FriendsListCtrl'
        }).state('friends-face', {
            parent: 'friends',
            url: '/face',
            templateUrl: 'src/main/content/friends/face/view.html',
            controller: 'FriendsFaceCtrl'
        }).state('secret-box', {
            parent: 'main',
            url: '/secretbox',
            views: {
                sidenav: {
                    templateUrl: 'src/main/sidenav/view.html',
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: 'src/main/content/secretbox/view.html',
                    controller: 'SecretBoxCtrl',
                    resolve: {
                        secretBox: function(SecretBox){
                            return SecretBox.query();
                        }
                    }
                }
            }
        }).state('secret-box-dialog', {
            parent: 'secret-box',
            url: '/:id',
            resolve: {
                dialog: function(Dialog, $stateParams){
                    return Dialog.get({id: $stateParams.id}).$promise;
                }
            },
            views: {
                'content@main': {
                    templateUrl: 'src/main/content/secretbox/dialog/view.html',
                    controller: 'DialogCtrl'
                }
            }
        }).state('connect', {
            parent: 'main',
            url: '/connect',
            views: {
                sidenav: {
                    templateUrl: 'src/main/sidenav/view.html',
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: 'src/main/content/connect/view.html',
                    controller: 'ConnectCtrl'
                }
            }
        }).state('settings', {
            parent: 'main',
            url: '/settings',
            views: {
                sidenav: {
                    templateUrl: 'src/main/sidenav/view.html',
                    controller: 'SidenavCtrl'
                },
                content: {
                    templateUrl: 'src/main/content/settings/view.html',
                    controller: 'SettingsCtrl'
                }
            }
        });

}).run(function($translatePartialLoader, $translate, $rootScope, $mdSidenav, $timeout){

    $translatePartialLoader.addPart('common');
    $translatePartialLoader.addPart('sidenav');
    $translatePartialLoader.addPart('friends');
    $translatePartialLoader.addPart('secretbox');
    $translatePartialLoader.addPart('dialog');
    $translatePartialLoader.addPart('connect');
    $translatePartialLoader.addPart('settings');
    $translatePartialLoader.addPart('basket');

    $timeout(function(){
        $translate.refresh();
    },1);

});
'use strict';

angular.module('appStub', [
    'app',
    'ngMockE2E'
]).config(function($httpProvider){

    $httpProvider.interceptors.push('HttpStubInterceptor');

}).run(function($httpBackend, GetJsonFile){

    $httpBackend.whenGET(/me$/).respond(GetJsonFile.synchronously('stub/me/GET-x.json'));
    $httpBackend.whenPOST(/me$/).respond(200);

    $httpBackend.whenGET(/secretbox$/).respond(GetJsonFile.synchronously('stub/secretbox/GET.json'));
    $httpBackend.whenPOST(/secretbox$/).respond(200);
    $httpBackend.whenDELETE(/secretbox\/.+\/.+$/).respond(200);

    $httpBackend.whenGET(/dialogs\/.*$/).respond(GetJsonFile.synchronously('stub/dialogs/GET.json'));

    $httpBackend.whenPOST(/dialogs$/).respond(200);
    $httpBackend.whenPOST(/messages$/).respond(200);

    //$httpBackend.whenJSONP(/https:\/\/www\.googleapis\.com\/plus\/v1\/people\/me\/people\/visible/).respond(GetJsonFile.synchronously('stub/friends/googlePlus.json'));
    //$httpBackend.whenJSONP(/https:\/\/api\.instagram\.com\/v1\/users\/self\/follows/).respond(GetJsonFile.synchronously('stub/friends/instagram.json'));
    //$httpBackend.whenJSONP(/https:\/\/graph.facebook.com\/v2.4\/me\/taggable_friends/).respond(GetJsonFile.synchronously('stub/friends/facebook.json'));

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenJSONP(/.*/).passThrough();
});

angular.module('appStub').service('HttpStubInterceptor', function($q, $timeout){
    var getMockedAsyncRespondTime = function (url) {
        switch (url.split(/\./).pop()) {
            case 'json':
                return 300;
            case 'html':
                // In production all views are into cachedUrl as JS Templates
                return 0;
            default:
                // Web Services
                return 800;
        }
    };
    return {
        response: function (response) {
            var defer = $q.defer();
            $timeout(function () {
                defer.resolve(response);
            }, getMockedAsyncRespondTime(response.config.url.toString()));
            return defer.promise;
        }
    };
});

angular.module('appStub').service('GetJsonFile', function(){
    this.synchronously = function(url){
        var request = new XMLHttpRequest();
        request.open('GET', url, false);
        request.send(null);
        return request.response;
    };
});
'use strict';

(function(){
    var origin = window.location.href.split(window.location.hash)[0];

    angular.module('app').constant('settings', {
        endpoint: 'rest-api/',
        toast: {
            hideDelay: 5000,
            position: 'bottom left'
        },
        socials: {
            facebook: {
                label: 'connect.label.facebook',
                auth: {
                    isCode: true,
                    patternURI: /\?code=([^&]*)#/,
                    clientId: '1642970339309039',
                    clientSecret: '22c45254414542a179b813b60928f653',
                    redirectUri: origin,
                    scope: ['user_friends']
                },
                icon: {
                    name: 'facebook',
                    color: '#3B5998'
                }
            },
            googlePlus: {
                label: 'connect.label.google-plus',
                auth: {
                    patternURI: /&access_token=([^&]+)/,
                    clientId: '205281637316-ad74m4l932db0j969qottrafu4sb08rs.apps.googleusercontent.com',
                    redirectUri: origin,
                    scope: ['https://www.googleapis.com/auth/plus.login']
                },
                icon: {
                    name: 'google-plus',
                    color: '#DA4835'
                }
            },
            instagram: {
                label: 'connect.label.instagram',
                auth: {
                    patternURI: /#access_token=([^&]+)/,
                    clientId: '5031270ba8a0440dbf50c0c78f201f1f',
                    redirectUri: origin,
                    scope: ['basic']
                },
                icon: {
                    name: 'photo_camera',
                    color: 'brown'
                }
            },
            twitter: {
                label: 'connect.label.twitter',
                auth: {
                    patternURI: /^#access_token_unknow=([^&]+)/,
                    clientId: 'r9e5QZVVUIu3ChTXr1w08fm5T',
                    clientSecret: 'tWwdJUrW4bnKsfkhXzKpzYw03LYKFZiu3fn2ePA18l2unk6DNN',
                    redirectUri: origin,
                    scope: ['user_friends']
                },
                icon: {
                    name: 'twitter',
                    color: '#1AB2E8'
                }
            },
            linkedin: {
                label: 'connect.label.linkedin',
                auth: {
                    patternURI: /code=(.*)&state/,
                    clientId: '77bmx0zg9stbsk',
                    clientSecret: 'aryHtzhM2yc9aXeS',
                    redirectUri: origin,
                    scope: ['r_basicprofile']
                },
                icon: {
                    name: 'linkedin',
                    color: '#0177B5'
                }
            }
        }
    });
})();

'use strict';

angular.module('app').provider('$cache', function(settings){

    var validity = {
        LOW: 60 * 1000,
        MEDIUM: 60 * 60 * 1000,
        HIGH: 30 * 24 * 60 * 60 * 1000
    };

    var now = function(){
        return (new Date()).getTime();
    };

    var Cache = function(name, invalidity){
        this.key = 'cache_' + name;
        this.invalidity = invalidity;
    };
    Cache.prototype.getCache = function(){
        var cache = window.localStorage.getItem(this.key);
        return JSON.parse(cache);
    };
    Cache.prototype.setCache = function(cache){
        window.localStorage.setItem(this.key, JSON.stringify(cache));
    };
    Cache.prototype.invalid = function(){
        window.localStorage.removeItem(this.key);
    };
    Cache.prototype.getData = function(){
        var cache = this.getCache();
        if(!cache || cache.timestamp + this.invalidity < now()){
            this.invalid();
            return null;
        }else{
            return cache.data;
        }
    };
    Cache.prototype.setData = function(data){
        this.timestamp = now();
        var cache = {
            data: data,
            timestamp: now()
        };
        this.setCache(cache);
    };

    this.token = {};
    this.code = {};
    for(var key in settings.socials){
        this.token[key] = new Cache('token_' + key, validity.HIGH);
        this.code[key] = new Cache('code_' + key, validity.HIGH);
    }
    this.friends = new Cache('data_friends', validity.LOW);
    this.secretBox = new Cache('data_secretBox', validity.LOW);

    this.$get = function(){
        return this;
    };

});
'use strict';

angular.module('app').factory('Me', function(settings, $resource){

    return $resource(settings.endpoint + 'me');

});
'use strict';

angular.module('app').factory('Friend', function(settings, $q, $resource, $injector, $http, SecretBox, $timeout, $cache){

    var Friend = $resource(settings.endpoint + 'friends');

    Friend.query = function(){
        var deferred = $q.defer();

        if($cache.friends.getData()){
            $timeout(function(){
                deferred.notify($cache.friends.getData());
                deferred.resolve($cache.friends.getData());
            }, 1);
        }else{
            SecretBox.query().then(function(secretBox){

                var promises = [];
                var friendsOnNotify = [];

                var equals = function(friend1, friend2){
                    return friend1.id === friend2.id && friend1.type === friend2.type;
                };

                var areInLove = function(secretBox, friend){
                    return secretBox.some(function(secretBoxItem){
                        return equals(secretBoxItem.friend, friend);
                    });
                };

                var isVisible = function(){
                    return true;
                };

                angular.forEach(settings.socials, function(social, name){
                    var socialService = $injector.get(name);
                    var promise = socialService.getFriends();
                    promise.then(function(){

                    }, function(){

                    }, function(friends){
                        deferred.notify(friends.map(function(friend){
                            friend.love = areInLove(secretBox, friend);
                            friend.visibility = isVisible();
                            friendsOnNotify.push(friend);
                            return friend;
                        }));
                    });
                    promises.push(promise);
                });

                $q.all(promises).then(function(){
                    $cache.friends.setData(friendsOnNotify);
                    deferred.resolve(friendsOnNotify);
                });
            });
        }

        return deferred.promise;
    };

    return Friend;

});
'use strict';

angular.module('app').factory('SecretBox', function(settings, $resource, $q, $cache){

    var SecretBox = $resource(settings.endpoint + 'secretbox/:type/:id');

    return {
        query: function(){
            var cache = $cache.secretBox.getData();
            if(cache){
                return $q.when(cache);
            }

            var deferred = $q.defer();
            SecretBox.query(function(secretBox){
                $cache.secretBox.setData(secretBox);
                deferred.resolve(secretBox);
            }, deferred.reject);
            return deferred.promise;
        },
        save: function(friend){
            var deferred = $q.defer();
            SecretBox.save(friend).$promise.then(function(){
                var secretBox = $cache.secretBox.getData();
                secretBox.push({
                    friend: {
                        id: friend.id,
                        type: friend.type,
                        verified: false,
                        inLove: false
                    },
                    lastUpdate: (new Date()).getTime(),
                    hasNews: false,
                    messages: null
                });
                $cache.secretBox.setData(secretBox);
                deferred.resolve();
            }, deferred.reject);
            return deferred.promise;
        },
        delete: function(friend){
            var deferred = $q.defer();
            SecretBox.delete(friend).$promise.then(function(){
                var secretBox = $cache.secretBox.getData();
                var getIndex = function(type, id){
                    for(var i in secretBox){
                        if(secretBox[i].friend.type === type && secretBox[i].friend.id === id){
                            return i;
                        }
                    }
                };
                secretBox.splice(getIndex(friend.type, friend.id), 1);
                $cache.secretBox.setData(secretBox);
                deferred.resolve();
            }, deferred.reject);
            return deferred.promise;
        }
    };

});
'use strict';

angular.module('app').factory('Message', function(settings, $resource){

    return $resource(settings.endpoint + 'messages');

});
'use strict';

angular.module('app').factory('Dialog', function(settings, $resource){

    return $resource(settings.endpoint + 'dialogs/:id', {'id': '@id'});

});
'use strict';

angular.module('app').provider('Language', function(){

    this.getPreferredLanguage = function(){
        var browserLang = navigator.language || navigator.userLanguage;
        switch (browserLang){
            case 'fr':
                return 'fr';
            default:
                return 'en';
        }
    };

    this.$get = function(){

    };

});
'use strict';

angular.module('app').directive('basketContent', function($timeout){
    return {
        restrict: 'E',
        scope: {
            basket: '=basket'
        },
        templateUrl: 'src/components/basket-content/view.html',
        link: function($scope){

            $scope.$watch(function(){
                return $scope.basket.loves;
            }, function(val, oldVal){
                if(val !== oldVal){
                    $scope.moveMinusOne = true;
                    $timeout(function(){
                        $scope.moveMinusOne = false;
                    }, 2000);
                }
            });
        }
    };
});
'use strict';

angular.module('app').directive('bodyMessageAction', function(){
    return {
        restrict: 'E',
        scope: {
            titleLabel: '@',
            messageLabel: '@',
            action: '@',
            actionLabel: '@'
        },
        templateUrl: 'src/components/body-message-action/view.html',
        link: function(){

        }
    };
});
'use strict';

angular.module('app').directive('friendPreview', function(settings){
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            friend: '=friend'
        },
        templateUrl: 'src/components/friend-preview/view.html',
        link: function($scope){
            $scope.getSocialIcon = function(social){
                if(social){
                    return settings.socials[social].icon;
                }
            };
        }
    };
});
'use strict';

angular.module('app').provider('Connection', function(settings, $cacheProvider){

    var findPatternInURI = function(pattern){
        var reg = window.location.href.match(pattern);
        return reg && reg[1] ? reg[1] : null;
    };

    for(var i in settings.socials){
        var hash = findPatternInURI(settings.socials[i].auth.patternURI);
        if(hash){
            if(settings.socials[i].auth.isCode){
                $cacheProvider.code[i].setData(hash);
                window.location = window.location.href.split('?')[0] + '#/';
            }else{
                $cacheProvider.token[i].setData(hash);
            }
            break;
        }
    }

    this.$get = function($q){
      return function(args){

          this.getToken = function(){
            var deferred = $q.defer();
            var token = $cacheProvider.token[args.name].getData();
            var code = $cacheProvider.code[args.name].getData();
            if(token){
                deferred.resolve(token);
            }else if(code){
                args.getTokenWithCode(code).then(function(token){
                    $cacheProvider.code[args.name].invalid();
                    $cacheProvider.token[args.name].setData(token);
                    deferred.resolve(token);
                });
            }else{
                args.sendTokenRequest();
                deferred.reject(token);
            }
            return deferred.promise;
          };

          this.close = function(){
              var deferred = $q.defer();
              args.sendConnectionClose().then(function(){
                  $cacheProvider.code[args.name].invalid();
                  $cacheProvider.token[args.name].invalid();
                  deferred.resolve();
              }, deferred.reject);
              return deferred.promise;
          };

          this.isConnected = function(){
              return $cacheProvider.token[args.name].getData() !== null;
          };

          this.isImplemented = function(){
              return args.isImplemented;
          };

          this.getFriends = function(){
              var code = $cacheProvider.code[args.name].getData();
              var deferred = $q.defer();
              if(code){
                  var connection = this;
                  connection.getToken().then(function(){
                      deferred.resolve(connection.isConnected()? args.getFriends($cacheProvider.token[args.name].getData(), connection.getToken, connection.close) : []);
                  });
              }else{
                  deferred.resolve(this.isConnected()? args.getFriends($cacheProvider.token[args.name].getData(), this.getToken, this.close) : []);
              }
              return deferred.promise;
          };

      };
    };


});
'use strict';

angular.module('app').factory('googlePlus', function(settings, Connection, $http, $q, Friend) {

    var LIMIT_TOKEN_STATUS = 401;
    var UNAUTH_STATUS = 403;

    var connection =  new Connection({
        name: 'googlePlus',
        isImplemented: true,
        sendTokenRequest: function(){
            var url = 'https://accounts.google.com/o/oauth2/auth';
            url += '?client_id=' + settings.socials.googlePlus.auth.clientId;
            url += '&redirect_uri=' + settings.socials.googlePlus.auth.redirectUri;
            url += '&response_type=token';
            url += '&state=security_token';
            url += '&approval_prompt=force';
            url += '&include_granted_scopes=true';
            url += '&scope=' + settings.socials.googlePlus.auth.scope.join(' ');
            window.location = url;
            return $q.when();
        },
        sendConnectionClose: function(){
            return $q.when();
        },
        getFriends: function(token, getNewToken, close){

            var getFriendPage = function(nextPageToken){
                var subDeferred = $q.defer();
                $http.jsonp('https://www.googleapis.com/plus/v1/people/me/people/visible', {
                    params: {
                        access_token: token,
                        callback: 'JSON_CALLBACK',
                        maxResults: 100,
                        fields : 'items(id, displayName,image/url,objectType),nextPageToken',
                        pageToken: nextPageToken
                    }
                }).then(function(response){
                    if(response.data.error && (response.data.error.code === LIMIT_TOKEN_STATUS || response.data.error.code === UNAUTH_STATUS)){
                        close().then(function(){
                            getNewToken().then(function(){
                                subDeferred.reject(response.data.error.message);
                            }, subDeferred.reject);
                        });
                    }else{
                        subDeferred.resolve(response.data);
                    }
                }, subDeferred.reject);
                return subDeferred.promise;
            };

            var deferred = $q.defer();

            var calbackResponse = function(response){
                var friends = response.items.reduce(function(friends, friend){
                    if(friend.objectType === 'person'){
                        friends.push(new Friend({
                            id: friend.id,
                            name: friend.displayName,
                            picture: friend.image.url,
                            type: 'googlePlus'
                        }));
                    }
                    return friends;
                }, []);

                deferred.notify(friends);

                if(response.nextPageToken){
                    getFriendPage(response.nextPageToken).then(calbackResponse, deferred.reject);
                }else{
                    deferred.resolve();
                }

            };
            getFriendPage().then(calbackResponse, deferred.reject);

            return deferred.promise;
        }
    });

    return connection;

});
'use strict';

angular.module('app').factory('instagram', function(settings, Connection, $q, $http, Friend){

    var LIMIT_TOKEN_STATUS = 429;
    var INVALID_TOKEN_STATUS = 400;

    var connection =  new Connection({
        name: 'instagram',
        isImplemented: true,
        sendTokenRequest: function(){
            var url = 'https://instagram.com/oauth/authorize/';
            url += '?client_id=' + settings.socials.instagram.auth.clientId;
            url += '&redirect_uri=' + settings.socials.instagram.auth.redirectUri;
            url += '&response_type=token';
            url += '&scope=' + settings.socials.instagram.auth.scope.join('+');
            window.location = url;
        },
        sendConnectionClose: function(){
            return $q.when();
        },
        getFriends: function(token, getNewToken, close){
            var deferred = $q.defer();
            $http.jsonp('https://api.instagram.com/v1/users/self/follows', {
                params: {
                    access_token: token,
                    callback: 'JSON_CALLBACK',
                    count: 1000
                }
            }).then(function(response){
                if(response.data.meta.code === LIMIT_TOKEN_STATUS || response.data.meta.code === INVALID_TOKEN_STATUS){
                    close().then(function(){
                        getNewToken().then(function(){
                            deferred.reject(response.data.meta.error_message);
                        }, deferred.reject);
                    });
                }else{
                    deferred.notify(response.data.data.map(function(friend){
                        var name = friend.username;
                        if(friend.full_name){
                            name += ' (' + friend.full_name + ')';
                        }
                        return new Friend({
                            id: friend.id,
                            name: name,
                            picture: friend.profile_picture,
                            type: 'instagram'
                        });
                    }));
                    deferred.resolve();
                }
            }, deferred.reject);
            return deferred.promise;
        }
    });

    return connection;

});
'use strict';

angular.module('app').factory('facebook', function(settings, Connection, Friend, $http, $q) {

    return new Connection({
        name: 'facebook',
        isImplemented: true,
        sendTokenRequest: function(){
            var url = 'https://www.facebook.com/v2.0/dialog/oauth';
            url += '?app_id=' + settings.socials.facebook.auth.clientId;
            url += '&redirect_uri=' + settings.socials.facebook.auth.redirectUri;
            url += '&scope=' + settings.socials.facebook.auth.scope.join(',');
            window.location = url;
            return $q.when();
        },
        getTokenWithCode: function(code){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: 'https://graph.facebook.com/oauth/access_token',
                params: {
                    code: code,
                    client_id: settings.socials.facebook.auth.clientId,
                    client_secret: settings.socials.facebook.auth.clientSecret,
                    redirect_uri: settings.socials.facebook.auth.redirectUri
                }
            }).then(function(resp){
                var token = resp.data.match(/access_token\=([^&]+)/)[1];
                deferred.resolve(token);
            });
            return deferred.promise;
        },
        sendConnectionClose: function(){
            return $q.when();
        },
        getFriends: function(token){
            var deferred = $q.defer();
            $http.jsonp('https://graph.facebook.com/v2.4/me/taggable_friends?limit=1000&fields=id,name,picture', {
                params: {
                    access_token: token,
                    callback: 'JSON_CALLBACK'
                }
            }).then(function(response){
                deferred.notify(response.data.data.map(function(friend){
                    return new Friend({
                        id: friend.id,
                        name: friend.name,
                        picture: friend.picture.data.url,
                        type: 'facebook'
                    });
                }));
                deferred.resolve();
            });
            return deferred.promise;
        }
    });

});
'use strict';

angular.module('app').factory('linkedin', function(Connection, $http) {

    return new Connection({
        name: 'linkedin',
        isImplemented: false,
        sendTokenRequest: function(){
            throw 'Not Implemented';
        },
        sendConnectionClose: function(){
            throw 'Not Implemented';
        },
        getFriends: function(token){
            return $http.jsonp('https://api.linkedin.com/v1/people/~:(num-connections)', {
                params: {
                    format: 'jsonp',
                    oauth2_access_token: token,
                    callback: 'JSON_CALLBACK'
                }
            });
        }
    });

});

/**
 *
 *
 *
 *  var adaptToModel = function(dto){
        return new FriendModel(dto.id, dto.firstName + ' ' + dto.lastName, dto.pictureUrl, 'linkedin');
    };

 this.adaptToModels = function(dto){
        if(dto && dto.data && dto.data.numConnections){
            var models = [];
            for(var i = 0; i < dto.data.numConnections; i++){
                models.push(adaptToModel({
                    id: i,
                    firstName: 'Fake First Name',
                    lastName: i,
                    pictureUrl: 'https://media.licdn.com/mpr/mprx/0_io443xgIdsvMEmnciSRb3pp6IjA9oDnc3e2b3j0zqUL6zWTB72Hq7gwRLrldWoBRGdV6asDHmXt1'
                }));
            }
            return models;
        }else{
            return [];
        }
    };

angular.module('app').provider('$linkedin', function(settings){

    var getUriCode = function(hash){
        var reg = hash.match(/code=(.*)&state/);
        return reg && reg[1] ? reg[1] : null;
    };

    var code = getUriCode(window.location.href);

    if(code){
        window.localStorage.setItem('access_code_linkedin', code);
    }
    code = window.localStorage.getItem('access_code_linkedin');

    var token = window.localStorage.getItem('access_token_linkedin');

    this.$get = function($q, $http){

        return {
        getToken: function(){
                var deferred = $q.defer();
                if(token){
                    deferred.resolve(token);
                }else if(code){
                    $http.get('https://www.linkedin.com/uas/oauth2/accessToken', {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        params: {
                            grant_type: 'authorization_code',
                            code: code,
                            redirect_uri: settings.socials.linkedin.auth.redirectUri,
                            client_id: settings.socials.linkedin.auth.clientId,
                            client_secret: settings.socials.linkedin.auth.clientSecret
                        }
                    }).then(function(resp){
                        token = resp.data.access_token;
                        window.localStorage.setItem('access_token_linkedin', token);
                        deferred.resolve(token);
                    });
                }
                return deferred.promise;
            },
            connect: function(){
                if(code){
                    return $q.when(code);
                }else{
                    var url = 'https://www.linkedin.com/uas/oauth2/authorization';
                    url += '?client_id=' + settings.socials.linkedin.auth.clientId;
                    url += '&redirect_uri=' + settings.socials.linkedin.auth.redirectUri;
                    url += '&response_type=code';
                    url += '&state=abcde';
                    url += '&scope=' + settings.socials.linkedin.auth.scope.join(' ');
                    window.location = url;
                    return $q.when();
                }
            }
        };

    };

});
 */
'use strict';

angular.module('app').factory('twitter', function(settings, Connection, $q, $http) {
    return new Connection({
        name: 'twitter',
        isImplemented: false,
        sendTokenRequest: function(){
            var timestamp = (new Date().getTime()).toString();
            var oauth_timestamp = timestamp.substring(0, timestamp.length - 3);

            var authorization = 'OAuth oauth_callback="' + settings.socials.twitter.auth.redirectUri + '",';
            authorization += 'oauth_consumer_key="' + settings.socials.twitter.auth.clientId + '",';
            authorization += 'oauth_nonce="8317b2ae48c58507f3563df90874335b",';
            authorization += 'oauth_signature="RcJu7Hg%2BFihZ8DwIzJqbFivrJOA%3D",';
            authorization += 'oauth_signature_method="HMAC-SHA1",';
            authorization += 'oauth_timestamp="' + oauth_timestamp + '",';
            authorization += 'oauth_version="1.0"';
            console.log(authorization);
            console.log(new Date().getTime() / 1000);
            $http.post('https://api.twitter.com/oauth/request_token', {
                headers: {
                    Authorization: authorization
                }
            }).then(function(data){
                console.log(data);
            }, function(data){
                console.log(data);
            });
            //var url = 'https://api.twitter.com/oauth/authorize';
            //url += '?oauth_token=';
            //url += settings.socials.twitter.auth.clientId;
            //window.location = url;
        },
        getTokenWithCode: function(code){
            var deferred = $q.defer();
            deferred.resolve(code);
            return deferred.promise;
        },
        sendConnectionClose: function(){
            return $q.when();
        },
        getFriends: function(){
            var deferred = $q.defer();
            // https://dev.twitter.com/rest/tools/console
            // https://api.twitter.com/1.1/friends/ids.json
            // https://api.twitter.com/1.1/users/lookup.json?user_id=6693582,F1717226282,2277815413
            return deferred.promise;
        }
    });
});
'use strict';

angular.module('app').controller('MainCtrl', function($scope, $mdSidenav, me, $state){

    $scope.me = me;
    $scope.state = $state;

    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };

});
'use strict';

angular.module('app').controller('SidenavCtrl', function(settings, $scope, $interval, SecretBox){

    SecretBox.query().then(function(secretBox){
        $scope.secretBox = secretBox;
        $scope.nbSecretBoxNews = $scope.secretBox.filter(function(secret){
            return secret.hasNews;
        }).length;
    });

    var duration = 2000;
    var i = 0;
    var keys = Object.keys(settings.socials);

    $scope.selectedIcon = settings.socials[keys[i]].icon;

    $interval(function(){
        $scope.selectedIcon = settings.socials[keys[i % keys.length]].icon;
        i++;
    }, duration);

    $scope.option = {
        rotation: 'none',
        duration: duration,
        easing : 'sine-out'
    };

});
'use strict';

angular.module('app').controller('FriendsCtrl', function(settings, me, $scope, $state, Friend, $filter, $mdToast, $mdDialog, $translate, $timeout, SecretBox, $cache){

    var isListState = function(){
        return $state.current.name === 'friends-list';
    };

    $scope.toggleListFace = function(){
        if(isListState()){
            $state.go('friends-face');
        }else{
            $state.go('friends-list');
        }
    };

    $scope.listOrFaceIcon = function(){
        return isListState() ? 'face': 'list';
    };

    $scope.loading = true;

    $scope.friends = [];
    Friend.query().then(function(){
        $scope.loading = false;
    }, function(){}, function(friends){
        $scope.friends = $scope.friends.concat(friends);
        updateFilteringFriends();
    });

    $scope.filter = {};

    var filter = function(friends, filter){
        return $filter('friendFilter')(friends, filter);
    };

    var updateFilteringFriends = function(){
        $scope.filteringFriends = filter($scope.friends, $scope.filter);
    };

    $scope.$watch(function(){
        return $scope.filter;
    }, updateFilteringFriends, true);

    $scope.$watch(function(){
        return $scope.filteringFriends;
    }, updateFilteringFriends, true);

    $scope.toogleLove = function(friend, ev){

        var friendCopy = angular.copy(friend);
        friendCopy.love = !friendCopy.love;

        if(friendCopy.love && me.basket.loves < 1){
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title($translate.instant('friends.no.more.love.dialog.title') + ' :\'(')
                    .content($translate.instant('friends.no.more.love.dialog.content'))
                    .ariaLabel($translate.instant('friends.no.more.love.dialog.content'))
                    .ok($translate.instant('friends.no.more.love.dialog.action'))
                    .targetEvent(ev)
            );
        }else{
            if(friendCopy.love){
                me.basket.loves--;
                SecretBox.save(friendCopy).then(function(){

                    friend.love = friendCopy.love;
                    $cache.friends.invalid();

                    if(friend.love){
                        $mdToast.show(
                            $mdToast.simple()
                                .content($translate.instant('friends.list.love.toast.content', {
                                    name: friend.name
                                }))
                                .position(settings.toast.position)
                                .hideDelay(settings.toast.hideDelay)
                        );
                    }

                }, function(){
                    me.basket.loves++;
                });
            }else{
                SecretBox.delete({
                    id: friendCopy.id,
                    type: friendCopy.type
                }).then(function(){
                    friend.love = friendCopy.love;
                    $cache.friends.invalid();
                });
            }

        }
    };

    $scope.toggleFriendVisibility = function(friend){
        friend.visibility = !friend.visibility;
        var toast = $mdToast.simple()
            .content($translate.instant(friend.visibility ? 'friends.list.show.toast.content' : 'friends.list.hide.toast.content', {
                name: friend.name
            }))
            .action($translate.instant('friends.list.hide.toast.cancel'))
            .highlightAction(false)
            .position(settings.toast.position)
            .hideDelay(settings.toast.hideDelay);
        $mdToast.show(toast).then(function(response) {
            if ( response === 'ok' ) {
                friend.visibility = !friend.visibility;
            }
        });
    };

});
'use strict';

angular.module('app').controller('FriendsListCtrl', function($scope){

    $scope.openMenu = function($mdOpenMenu, ev) {
        $mdOpenMenu(ev);
    };

    $scope.$parent.filter = {
        visibility: true,
        love: [false],
        type: ['instagram', 'googlePlus', 'facebook']
    };

    $scope.getLoveIcon = function(friend){
        if(friend.love === true){
            return 'favorite';
        }else if(friend.love === false){
            return 'favorite_outline';
        }else if(friend.love === undefined){
            return 'sync_problem';
        }
    };

});
'use strict';

angular.module('app').filter('friendFilter', function($filter) {
    return function( items, filter ) {
        if(!items){
            return [];
        }
        var friends = items.filter(function(item){
            var keep = filter.visibility === item.visibility;
            keep = keep && filter.love.indexOf(item.love) !== -1;
            keep = keep && filter.type.indexOf(item.type) !== -1;
            return keep;
        });
        friends = $filter('filter')(friends, filter.search);
        friends = $filter('orderBy')(friends, 'name');
        return friends;
    };
});
'use strict';

angular.module('app').directive('friendsFilter', function(settings){
    return {
        restrict: 'E',
        templateUrl: 'src/main/content/friends/list/filter/view.html',
        scope: {
            filter: '=',
            result: '='
        },
        link: function(scope, el){
            scope.socials = settings.socials;

            scope.isOpen = false;

            scope.$watch(function(){
                return scope.isOpen;
            }, function(val){
                angular.element(el).find('md-fab-actions').css({
                    display: val ? 'flex': 'none'
                });
            });

            scope.socialToggle = function(value){
                var index = scope.filter.type.indexOf(value);
                if(index !== -1){
                    scope.filter.type.splice(index, 1);
                }else{
                    scope.filter.type.push(value);
                }
            };
            scope.socialIsSeleced = function(type){
                return scope.filter.type.indexOf(type) !== -1;
            };

            scope.loveSelected = function(value){
                var index = scope.filter.love.indexOf(value);
                if(index !== -1){
                    scope.filter.love.splice(index, 1);
                }else{
                    scope.filter.love.push(value);
                }
            };
            scope.loveIsSelected = function(love){
                return scope.filter.love.indexOf(love) !== -1;
            };

            scope.visibilityToggle = function(){
                scope.filter.visibility = !scope.filter.visibility;
            };
        }
    };

});
'use strict';

angular.module('app').controller('FriendsFaceCtrl', function($scope){

    $scope.$parent.filter = {
        visibility: true,
        love: [false],
        type: ['instagram', 'googlePlus', 'facebook']
    };

    $scope.refreshFace = function(friends){
        if(friends.length > 0){
            var randomIndex = Math.floor(Math.random()*friends.length);
            $scope.friend = friends[randomIndex];
        }else{
            $scope.friend = null;
        }
    };

    $scope.$watch(function(){
        return $scope.filteringFriends;
    }, $scope.refreshFace, true);

});
'use strict';

angular.module('app').controller('ConnectCtrl', function($scope, settings, $translate, $mdDialog, $injector, $cache){

    $scope.connections = settings.socials;

    var disconnectAction = function(socialService, name){
        var confirm = $mdDialog.confirm()
            .parent(angular.element(document.body))
            .title($translate.instant('connect.disconnect.confirmation.title'))
            .content($translate.instant('connect.disconnect.confirmation.content', {
                name: $translate.instant('connect.label.' + name)
            }))
            .ariaLabel($translate.instant('connect.disconnect.confirmation.title'))
            .ok($translate.instant('connect.disconnect.confirmation.ok'))
            .cancel($translate.instant('connect.disconnect.confirmation.cancel'))
            .targetEvent(event);
        $mdDialog.show(confirm).then(function() {
            $scope.connectionModel[name] = false;
            socialService.close();
        }, function(){
            $scope.connectionModel[name] = true;
        });
    };

    $scope.toggleConnection = function(name){
        var socialService = $injector.get(name);
        $cache.friends.invalid();
        if(socialService.isConnected()){
            disconnectAction(socialService, name);
        }else{
            socialService.getToken().then(function(){

            });
        }
    };

    $scope.isConnected = function(name){
      return $injector.get(name).isConnected();
    };

    $scope.isNotImplemented = function(name){
        return !$injector.get(name).isImplemented();
    };

    $scope.connectionModel = {};
    for(var type in settings.socials){
        $scope.connectionModel[type] = $scope.isConnected(type);
    }

});
'use strict';

angular.module('app').controller('SettingsCtrl', function($scope, me){

    $scope.meCopy = angular.copy(me);

    $scope.submit = function(){
        $scope.meCopy.$save().then(function(){
            me.login = $scope.meCopy.login;
            me.email = $scope.meCopy.email;
        });
    };

    $scope.disconnect = function(){

    };

});
'use strict';

angular.module('app').controller('SecretBoxCtrl', function($scope, secretBox){

    $scope.secretBox = secretBox;

});
'use strict';

angular.module('app').filter('orderByFresh', function() {
    return function( items ) {
        return items.sort(function(a, b){
            var aStamp = a.lastUpdate  / (a.hasNews ? 1 : 1000);
            var bStamp = b.lastUpdate  / (b.hasNews ? 1 : 1000);
            return (aStamp - bStamp) < 0 ? 1 : -1;
        });
    };
});
'use strict';

angular.module('app').controller('DialogCtrl', function(settings,$scope, dialog, Message){

    $scope.dialog = dialog;

    $scope.newMessage = new Message();

    $scope.sendMessage = function(){
        $scope.newMessage.$save().then(function(){
            $scope.newMessage.when = (new Date()).getTime();
            $scope.dialog.messages.push($scope.newMessage);
            $scope.newMessage = new Message();
        });
    };

});