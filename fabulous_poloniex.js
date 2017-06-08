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
    var hash = undefined;
    var codeToExecute = function(){
        var y = ($(".valuePositive").clone().children().remove().end().text().replace(/(\d+\.\d{8})/g, '$1,').split(','));
        var x = ($(".feeCurrency").clone().children().remove().end().text().split(' '));
        recal_ = (hash === ($(".activeLoans .date").clone().children().remove().end().text()));
        y.pop();
        x.shift();
        
        var i;
        var z = {};
        for (i = y.length - 1; i >= 0; i--) {
            if(typeof z[x[i]] === 'undefined')
                z[x[i]] = 0;
            
            z[x[i]] += parseFloat(y[i]);
        }
        
        var keys = Object.keys(z);
        
        if(recal_ === false) {
            if(hash === undefined)
                $(".activeLoans").append("<b>Total Active Profit:</b><br/><div id='profitAmounts'></div>");

            hash = ($(".activeLoans .date").clone().children().remove().end().text());
            $("#profitAmounts").html = "";
            for(var j = 0; j < keys.length; j++){
                var i = keys[j];
                var c = z[i];
                var t_amount = c.toFixed(8) + " " + i;
                t_amount = "<a href=\"https://www.google.com/search?q=" + c.toFixed(8) + " " + i.toLowerCase() + "+to+" + currency + "&ie=UTF-8&oe=UTF-8\" target=\"_blank\">" + t_amount + "</a>";
                $("#profitAmounts").append("- <span id=\"amount_" + i + "\">" + t_amount + "</span><br/>");
            }
        } else {
            for(var j = 0; j < keys.length; j++){
                var i = keys[j];
                var c = z[i];
                var t_amount = c.toFixed(8) + " " + i;
                t_amount = "<a href=\"https://www.google.com/search?q=" + c.toFixed(8) + " " + i.toLowerCase() + "+to+" + currency + "&ie=UTF-8&oe=UTF-8\" target=\"_blank\">" + t_amount + "</a>";
                $('#amount_' + i).html(t_amount);
            }
        }
    };


    var intervalInt = window.setInterval(function(){
        if(typeof jQuery !== 'undefined' && jQuery){
            window.clearInterval(intervalInt);
            codeToExecute();
        }
    }, 4000);
    
    var recal = window.setInterval(function(){
        if(typeof jQuery !== 'undefined' && jQuery){
            codeToExecute();
        }
    }, 30000);
})();
