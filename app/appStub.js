angular.module('appStub', [
    'app',
    'ngMockE2E'
]).config(function($httpProvider){

    $httpProvider.interceptors.push('HttpStubInterceptor');

}).run(function(settings, $httpBackend, GetJsonFile){

    $httpBackend.whenGET(new RegExp(settings.endpoint + 'socials$')).respond(GetJsonFile.synchronously('stub/social/GET.json'));

    $httpBackend.whenGET(new RegExp(settings.endpoint + 'facebook/friends$')).respond(GetJsonFile.synchronously('stub/facebook/GET.json'));
    $httpBackend.whenGET(new RegExp(settings.endpoint + 'google-plus/friends$')).respond(GetJsonFile.synchronously('stub/google-plus/GET.json'));
    $httpBackend.whenGET(new RegExp(settings.endpoint + 'instagram/friends$')).respond(GetJsonFile.synchronously('stub/instagram/GET.json'));
    $httpBackend.whenGET(new RegExp(settings.endpoint + 'twitter/friends$')).respond(GetJsonFile.synchronously('stub/twitter/GET.json'));
    $httpBackend.whenGET(new RegExp(settings.endpoint + 'linkedin/friends$')).respond(GetJsonFile.synchronously('stub/linkedin/GET.json'));
    $httpBackend.whenPOST(new RegExp(settings.endpoint + 'friends$')).respond(200);

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
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