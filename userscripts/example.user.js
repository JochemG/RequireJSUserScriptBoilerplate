// ==UserScript==
// @name         RequireJS user script boilerplate
// @namespace    https://github.com/JochemG/RequireJSUserScriptBoilerplate
// @version      0.1
// @description  Boilerplate for user scripts that profit from using RequireJS
// @author       Jochem Geussens
// @match        http://*/*
// @match        https://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';
    if (window.top != window.self) {
        return;
    }

    /**
     * TODO: Adapt the path below to your local server path
     */
    var baseUrl = 'http://127.0.0.1:8888/';

    /**
     * TODO: Adapt the function below to ensure that the user script loads when the page is really done loading.
     */
    function pageLoaded() {
        return window.document.getElementsByTagName('div').length > 1;
    }

    function runRequireJs(GMRequire) {
        window.require = window.require || GMRequire;
        GMRequire.config({
            baseUrl: baseUrl
        });
        GMRequire(['main']);
    }

    var intervalHandle = null;
    function initRequireOnPageLoaded() {
        if (!pageLoaded())
            return;
        window.clearInterval(intervalHandle);

        if (!window.require) {
            var s = window.document.createElement('script');
            s.src = baseUrl + 'require.js';
            s.addEventListener('load', function() {
                runRequireJs(require);
            });
            window.document.head.appendChild(s);
        } else {
            runRequireJs(window.require);
        }
    }
    intervalHandle = window.setInterval(initRequireOnPageLoaded, 100);
})();