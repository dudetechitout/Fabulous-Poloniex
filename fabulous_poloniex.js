// ==UserScript==
// @name         Fabulous Poloniex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ability to see the total amount of BTC gained on active loans.
// @author       Fabby
// @match        https://poloniex.com/*
// @grant        none
// ==/UserScript==

var currency = "USD";

if(typeof jQuery === 'undefined'|| !jQuery){
    (function(){
        var s=document.createElement('script');
        s.setAttribute('src','http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.js');
        if(typeof jQuery=='undefined'){
            document.getElementsByTagName('head')[0].appendChild(s);
        }
    })();
}

(function(){
    var recal_ = false;
    var codeToExecute = function(){
        var y = ($(".valuePositive").clone().children().remove().end().text().split("0.0"));
       
        var i;
        var z = parseFloat("0.0" + y[1]);
        for (i = 2; i < y.length; ++i) {
            z += parseFloat("0.0" + y[i]);
        }
        
        var t_amount = z.toFixed(8) + " BTC";
        t_amount = "<a href=\"https://www.google.com/search?q=" + z.toFixed(8) + " btc+to+" + currency + "&ie=UTF-8&oe=UTF-8\" target=\"_blank\">" + t_amount + "</a>";
        
        if(recal_ === false) {
            $(".activeLoans").append("<b>Total Active Profit:</b> <span id=\"amount\">" + t_amount + "</span>");
        } else {
            $('#amount').html(t_amount);
        }
    };


    var intervalInt = window.setInterval(function(){
        if(typeof jQuery !== 'undefined' && jQuery){
            window.clearInterval(intervalInt);
            codeToExecute();
        }
    }, 500);
    
    var recal = window.setInterval(function(){
        if(typeof jQuery !== 'undefined' && jQuery){
            recal_ = true;
            codeToExecute();
        }
    }, 30000);
})();