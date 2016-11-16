﻿/**
 *  @fileoverview
 *
 *  Scripts to go directly into the head element
 *  These should be very small and therefore they should not be included as a file, but as inline JS
 *
 *  @author Daniel Lewis
 */

(function (document, window ) {

    /**
     *	Update the no-js class to js
     */
    var html = document.documentElement;
    html.className = html.className.replace(/\bno-js\b/, 'js');

    /**
     *	Creates a dummy version of $
     *	Any functions add will be queued to run after jQuery is built and ready
     */
    window.$ = function (fn) {
        var q = window.$.q = window.$.q || [];
        q.push(fn);
        if (typeof fn !== 'function') {
            throw new Error('jQuery not yet loaded');
        }
    };

    /**
     *	Cookie banner
     */
    if (/\beprivacy=3(;|$)/i.test(document.cookie)) {
        html.className += ' hide-cookie-monster';
    }

    /**
     *  Are (session) cookies accepted
     */
    document.cookie = 'z=1; path=/';
    if (/(?:^| )z=1(?:;|$)/.test(document.cookie)) {
        document.cookie = 'z=; expires=' + new Date(0).toUTCString() + '; path=/';
    } else {
        html.className = html.className += ' no-cookies';
    }

    /**
     *  Do we need to load any polyfills
     *  See http://kangax.github.io/compat-table/es5/
     *  If the browser doesn't support bind we will load them all
     *  We are not supporting IE7
     */
    if (!$.bind) {
        // We were using an escaped character for the closing script
        // but Ugligy JS was minifying it
        // Use the replace instead
        document.write('<script src="/static/build/js/polyfills.js"><~script>'.replace('~','/'));
    }

}(document, window ));



