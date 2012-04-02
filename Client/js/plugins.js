
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

//jStorage
(function(g){function m(){if(e.jStorage)try{c=n(""+e.jStorage)}catch(a){e.jStorage="{}"}else e.jStorage="{}";j=e.jStorage?(""+e.jStorage).length:0}function h(){try{e.jStorage=o(c),d&&(d.setAttribute("jStorage",e.jStorage),d.save("jStorage")),j=e.jStorage?(""+e.jStorage).length:0}catch(a){}}function i(a){if(!a||"string"!=typeof a&&"number"!=typeof a)throw new TypeError("Key name must be string or numeric");if("__jstorage_meta"==a)throw new TypeError("Reserved key name");return!0}function k(){var a,
b,d,e=Infinity,f=!1;clearTimeout(p);if(c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL){a=+new Date;d=c.__jstorage_meta.TTL;for(b in d)d.hasOwnProperty(b)&&(d[b]<=a?(delete d[b],delete c[b],f=!0):d[b]<e&&(e=d[b]));Infinity!=e&&(p=setTimeout(k,e-a));f&&h()}}if(!g||!g.toJSON&&!Object.toJSON&&!window.JSON)throw Error("jQuery, MooTools or Prototype needs to be loaded before jStorage!");var c={},e={jStorage:"{}"},d=null,j=0,o=g.toJSON||Object.toJSON||window.JSON&&(JSON.encode||JSON.stringify),
n=g.evalJSON||window.JSON&&(JSON.decode||JSON.parse)||function(a){return(""+a).evalJSON()},f=!1,p,l={isXML:function(a){return(a=(a?a.ownerDocument||a:0).documentElement)?"HTML"!==a.nodeName:!1},encode:function(a){if(!this.isXML(a))return!1;try{return(new XMLSerializer).serializeToString(a)}catch(b){try{return a.xml}catch(c){}}return!1},decode:function(a){var b="DOMParser"in window&&(new DOMParser).parseFromString||window.ActiveXObject&&function(a){var b=new ActiveXObject("Microsoft.XMLDOM");b.async=
"false";b.loadXML(a);return b};if(!b)return!1;a=b.call("DOMParser"in window&&new DOMParser||window,a,"text/xml");return this.isXML(a)?a:!1}};g.jStorage={version:"0.1.6.1",set:function(a,b){i(a);if(l.isXML(b))b={_is_xml:!0,xml:l.encode(b)};else{if("function"==typeof b)return;b&&"object"==typeof b&&(b=n(o(b)))}c[a]=b;h();return b},get:function(a,b){i(a);return a in c?c[a]&&"object"==typeof c[a]&&c[a]._is_xml&&c[a]._is_xml?l.decode(c[a].xml):c[a]:"undefined"==typeof b?null:b},deleteKey:function(a){i(a);
return a in c?(delete c[a],c.__jstorage_meta&&"object"==typeof c.__jstorage_meta.TTL&&a in c.__jstorage_meta.TTL&&delete c.__jstorage_meta.TTL[a],h(),!0):!1},setTTL:function(a,b){var d=+new Date;i(a);b=Number(b)||0;if(a in c){if(!c.__jstorage_meta)c.__jstorage_meta={};if(!c.__jstorage_meta.TTL)c.__jstorage_meta.TTL={};0<b?c.__jstorage_meta.TTL[a]=d+b:delete c.__jstorage_meta.TTL[a];h();k();return!0}return!1},flush:function(){c={};h();return!0},storageObj:function(){function a(){}a.prototype=c;return new a},
index:function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&"__jstorage_meta"!=b&&a.push(b);return a},storageSize:function(){return j},currentBackend:function(){return f},storageAvailable:function(){return!!f},reInit:function(){var a;if(d&&d.addBehavior){a=document.createElement("link");d.parentNode.replaceChild(a,d);d=a;d.style.behavior="url(#default#userData)";document.getElementsByTagName("head")[0].appendChild(d);d.load("jStorage");a="{}";try{a=d.getAttribute("jStorage")}catch(b){}e.jStorage=
a;f="userDataBehavior"}m()}};(function(){var a=!1;if("localStorage"in window)try{window.localStorage.setItem("_tmptest","tmpval"),a=!0,window.localStorage.removeItem("_tmptest")}catch(b){}if(a)try{if(window.localStorage)e=window.localStorage,f="localStorage"}catch(c){}else if("globalStorage"in window)try{window.globalStorage&&(e=window.globalStorage[window.location.hostname],f="globalStorage")}catch(g){}else if(d=document.createElement("link"),d.addBehavior){d.style.behavior="url(#default#userData)";
document.getElementsByTagName("head")[0].appendChild(d);d.load("jStorage");a="{}";try{a=d.getAttribute("jStorage")}catch(h){}e.jStorage=a;f="userDataBehavior"}else{d=null;return}m();k()})()})(window.jQuery||window.$);

/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);