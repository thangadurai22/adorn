!function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;o<r.length;o++)s(r[o]);return s}({1:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function setup(base){var manifest=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];if(!document.body)return void _utilsEventsReady2["default"](setup.bind(null,base,manifest));manifest.favicon=_utilsDomMeta2["default"]("favicon")||_utilsStringRURL2["default"](manifest.favicon,base)||"/favicon.ico",manifest.author=_utilsDomMeta2["default"]("author")||manifest.author,manifest.root=_utilsStringRURL2["default"](manifest.root||"/",base),_componentsToolbar2["default"](manifest),_componentsFooter2["default"](manifest);var tracking=_utilsDomMeta2["default"]("ga:tracking")||manifest["ga:tracking"];tracking&&_utilsServicesGoogleanalytics2["default"](tracking)}var _utilsHttpJson=require("./utils/http/json"),_utilsHttpJson2=_interopRequireDefault(_utilsHttpJson),_utilsStringRURL=require("./utils/string/rURL"),_utilsStringRURL2=_interopRequireDefault(_utilsStringRURL),_utilsDomMeta=require("./utils/dom/meta"),_utilsDomMeta2=_interopRequireDefault(_utilsDomMeta),_utilsEventsReady=require("./utils/events/ready"),_utilsEventsReady2=_interopRequireDefault(_utilsEventsReady);require("./utils/support/touch"),require("./utils/support/html5"),require("./utils/support/viewport");var _utilsServicesGoogleanalytics=require("./utils/services/googleanalytics"),_utilsServicesGoogleanalytics2=_interopRequireDefault(_utilsServicesGoogleanalytics),_componentsHelpers=require("./components/helpers"),_componentsHelpers2=_interopRequireDefault(_componentsHelpers),_componentsToolbar=require("./components/toolbar"),_componentsToolbar2=_interopRequireDefault(_componentsToolbar),_componentsFooter=require("./components/footer"),_componentsFooter2=_interopRequireDefault(_componentsFooter);_utilsEventsReady2["default"](_componentsHelpers2["default"]);var manifest_json=_utilsDomMeta2["default"]("manifest")||"/manifest.json";_utilsHttpJson2["default"](manifest_json,setup.bind(null,manifest_json))},{"./components/footer":2,"./components/helpers":3,"./components/toolbar":4,"./utils/dom/meta":13,"./utils/events/ready":16,"./utils/http/json":18,"./utils/services/googleanalytics":20,"./utils/string/rURL":22,"./utils/support/html5":24,"./utils/support/touch":25,"./utils/support/viewport":26}],2:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _utilsEventsReady=require("../utils/events/ready"),_utilsEventsReady2=_interopRequireDefault(_utilsEventsReady),_utilsDomCreate=require("../utils/dom/create"),_utilsDomCreate2=_interopRequireDefault(_utilsDomCreate);exports["default"]=function(manifest){manifest.author&&_utilsEventsReady2["default"](function(){var author=manifest.author.split(/\s*,\s*/);author&&document.body.appendChild(_utilsDomCreate2["default"]("footer",{html:"Authored by "+(author[1]?'<a href="'+author[1]+'" rel="author">'+author[0]+"</a>":author[0])}))})},module.exports=exports["default"]},{"../utils/dom/create":6,"../utils/events/ready":16}],3:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function tryitButton(pre,func){var btn=_utilsDomCreate2["default"]("button",{html:"tryit","class":"tryit"});_utilsDomInsertAfter2["default"](btn,pre),_utilsEventsOn2["default"](btn,"click",function(){if(func)func();else{if("function"==typeof tryit&&!tryit(pre.innerText))return;setTimeout(function(){return eval(pre.innerText)},100)}}),func||pre.setAttribute("contenteditable",!0)}Object.defineProperty(exports,"__esModule",{value:!0});var _utilsDomEach=require("../utils/dom/each"),_utilsDomEach2=_interopRequireDefault(_utilsDomEach),_utilsEventsOn=require("../utils/events/on"),_utilsEventsOn2=_interopRequireDefault(_utilsEventsOn),_utilsDomCreate=require("../utils/dom/create"),_utilsDomCreate2=_interopRequireDefault(_utilsDomCreate),_utilsDomInsertAfter=require("../utils/dom/insertAfter"),_utilsDomInsertAfter2=_interopRequireDefault(_utilsDomInsertAfter);exports["default"]=function(){_utilsDomEach2["default"]("pre",function(pre){("tryit"===pre.className||"tryitoffline"===pre.className)&&tryitButton(pre)}),_utilsDomEach2["default"]("script",function(script){var func=script.getAttribute("data-tryit");func&&tryitButton(script,window[func]),script.getAttribute("src")&&_utilsEventsOn2["default"](script,"click",function(){window.open(script.getAttribute("src"),"_blank")})}),_utilsDomEach2["default"]("link",function(script){script.getAttribute("href")&&_utilsEventsOn2["default"](script,"click",function(){window.open(script.getAttribute("href"),"_blank")})})},module.exports=exports["default"]},{"../utils/dom/create":6,"../utils/dom/each":7,"../utils/dom/insertAfter":11,"../utils/events/on":15}],4:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function buildNav(){function hashChange(){select.selectedIndex=options.indexOf(window.location.hash.substr(1))}var headings=_utilsDomEach2["default"]("h1,h2");if(document.querySelector&&!(document.documentElement.className||"").match(/adorn-(nav|toc)-off/)&&(_utilsDomEach2["default"](headings,function(tag){var ref=_utilsDomId2["default"](tag);tag.insertBefore(_utilsDomCreate2["default"]("a",{name:ref,href:"#"+ref,"class":"adorn-anchor"}),tag.firstChild)}),!(headings.length<2))){var toc=_utilsDomCreate2["default"]("div",{"class":"adorn-toc"});document.querySelector(".adorn-breadcrumbs").appendChild(toc);var select=_utilsDomCreate2["default"]("select"),options=[];_utilsEventsOn2["default"](select,"change",function(){window.location.hash=select.options[select.selectedIndex].value}),toc.appendChild(select);var _group=select;_utilsDomEach2["default"](headings,function(tag){var depth=parseInt(tag.tagName.match(/[0-9]/)[0],10),text=tag.innerText||tag.textContent||tag.innerHTML,ref=_utilsDomId2["default"](tag);1===depth&&(_group=_utilsDomCreate2["default"]("optgroup",{label:text}),select.appendChild(_group)),_group.appendChild(_utilsDomCreate2["default"]("option",{html:text,value:ref})),options.push(ref)}),toc&&setTimeout(function(){_utilsDomAddClass2["default"](document.documentElement,"adorn-toc-on")}),_utilsEventsOn2["default"](window,"hashchange",hashChange);var toolbar_height=document.querySelector(".adorn-toolbar").offsetHeight||50;if(_utilsEventsOn2["default"](window,"scroll",function(e){{var tag,T=window.scrollY||window.pageYOffset;"screen"in window?window.screen.availHeight:500}if(_utilsDomUntil2["default"](headings,function(anchor){var t=_utilsDomFindPos2["default"](anchor)[1]-toolbar_height;return t>T?!0:void(tag=anchor)}),tag){var ref=(tag.innerText||tag.innerHTML,tag.getElementsByTagName("a")[0]);ref&&(ref=ref.getAttribute("href").replace(/^#/,"")),"history"in window&&"replaceState"in window.history&&window.location.hash!=="#"+ref&&history.replaceState({},document.title,"#"+ref),hashChange()}}),toc){var clist=toc.classList;if(clist){var tocY=_utilsDomFindPos2["default"](toc)[1];_utilsEventsOn2["default"](window,"scroll",function(e){var sY=window.scrollY||window.pageYOffset;sY>tocY?clist.add("adorn-float"):clist.remove("adorn-float")})}}}}Object.defineProperty(exports,"__esModule",{value:!0});var _utilsDomEach=require("../utils/dom/each"),_utilsDomEach2=_interopRequireDefault(_utilsDomEach),_utilsHttpJsonp=require("../utils/http/jsonp"),_utilsHttpJsonp2=_interopRequireDefault(_utilsHttpJsonp),_utilsDomUntil=require("../utils/dom/until"),_utilsDomUntil2=_interopRequireDefault(_utilsDomUntil),_utilsDomAddClass=require("../utils/dom/addClass"),_utilsDomAddClass2=_interopRequireDefault(_utilsDomAddClass),_utilsEventsOn=require("../utils/events/on"),_utilsEventsOn2=_interopRequireDefault(_utilsEventsOn),_utilsDomCreate=require("../utils/dom/create"),_utilsDomCreate2=_interopRequireDefault(_utilsDomCreate),_utilsDomFindPos=require("../utils/dom/findPos"),_utilsDomFindPos2=_interopRequireDefault(_utilsDomFindPos),_utilsDomId=require("../utils/dom/id"),_utilsDomId2=_interopRequireDefault(_utilsDomId),_utilsStringQuerystringify=require("../utils/string/querystringify"),_utilsStringQuerystringify2=_interopRequireDefault(_utilsStringQuerystringify),_utilsDomInsertBefore=require("../utils/dom/insertBefore"),_utilsDomInsertBefore2=_interopRequireDefault(_utilsDomInsertBefore),_utilsDomInsertAfter=require("../utils/dom/insertAfter"),_utilsDomMeta=(_interopRequireDefault(_utilsDomInsertAfter),require("../utils/dom/meta")),_utilsDomMeta2=_interopRequireDefault(_utilsDomMeta),_utilsEventsReady=require("../utils/events/ready"),_utilsEventsReady2=_interopRequireDefault(_utilsEventsReady),_utilsHelperPopup=require("../utils/helper/popup"),_utilsHelperPopup2=_interopRequireDefault(_utilsHelperPopup);exports["default"]=function(manifest){var repo_path,paths=(window.location.pathname||"").replace(/^\//g,"").split(/([^\/]+\/?)/).filter(function(s){return!!s}),url=window.location.href,social_btns=[],breadcrumbs=['<a href="'+manifest.root+'"><img src="'+manifest.favicon+'" alt="'+window.location.hostname+'" title="'+manifest.name+'"/></a>'];if(_utilsDomEach2["default"](paths,function(val,index){breadcrumbs.push('<a href="/'+paths.slice(0,index+1).join("")+'">'+val.replace(/\.(html?)$/,"")+"</a>")}),manifest.github){var repo_file=(window.location.pathname||"").replace(/^\/?([^\/]+)/g,"").replace(/\/$/,"/index.html"),repo=manifest.github;!repo.match("/")&&paths.length&&(repo+="/"+paths[0].replace(/\/$/,"")),repo.match("/")&&(repo_path="https://github.com/"+repo,social_btns=['<a href="'+repo_path+"/blob/master"+repo_file+'" target="_blank" id="adorn-edit">Edit this page</a>','<a href="'+repo_path+'" class="adorn-github-button" target="_blank" title="Stars"><i class="adorn-icon-github"></i><span class="adorn-speeach-bubble"></span></a>'],_utilsHttpJsonp2["default"]("https://api.github.com/repos/"+manifest.github+"/"+repo+"?",function(r){_utilsDomEach2["default"](".adorn-github-button span.adorn-speeach-bubble",function(item){item.innerHTML=r.data.watchers||""})}))}var twitter_creator=manifest["twitter:creator"]||_utilsDomMeta2["default"]("twitter:creator");twitter_creator&&(social_btns.push(['<a href="https://twitter.com/share" class="adorn-twitter-button" target="_blank" data-via="'+twitter_creator.replace("@","")+'" title="Tweet"><i class="adorn-icon-twitter"></i></a>','<a href="https://twitter.com/search?ref_src=twsrc%5Etfw&q='+encodeURIComponent(url)+'" class="adorn-twitter-count" target="_blank"><span class="adorn-speeach-bubble"></span></a>'].join("")),_utilsHttpJsonp2["default"]("https://cdn.syndication.twitter.com/widgets/tweetbutton/count.json?url="+encodeURIComponent(url),function(r){_utilsDomEach2["default"](".adorn-twitter-count span.adorn-speeach-bubble",function(item){item.innerHTML=r.count||"",item.title="This page has been shared "+r.count+" times, view these tweets"})})),_utilsDomInsertBefore2["default"](_utilsDomCreate2["default"]("aside",{"class":"adorn-toolbar",html:'<div class="adorn-breadcrumbs"> '+breadcrumbs.join(" ")+'</div> <div class="adorn-links">'+social_btns.join("<span></span>")+' <div class="clearfix"></div></div>'}),document.body.firstElementChild||document.body.firstChild),_utilsEventsOn2["default"](".adorn-twitter-button","click",function(e){e.preventDefault();var options={width:550,height:250},params={text:encodeURIComponent(document.title),via:twitter_creator.replace("@",""),url:encodeURIComponent(window.location.href.replace(/#.*/,""))},hashtag=_utilsDomMeta2["default"]("twitter:hashtag")||manifest["twitter:hashtag"];hashtag&&(params.hashtag=hashtag),_utilsHelperPopup2["default"]("https://twitter.com/intent/tweet?"+_utilsStringQuerystringify2["default"](params),"twitter",options)}),_utilsEventsReady2["default"](buildNav)},module.exports=exports["default"]},{"../utils/dom/addClass":5,"../utils/dom/create":6,"../utils/dom/each":7,"../utils/dom/findPos":8,"../utils/dom/id":10,"../utils/dom/insertAfter":11,"../utils/dom/insertBefore":12,"../utils/dom/meta":13,"../utils/dom/until":14,"../utils/events/on":15,"../utils/events/ready":16,"../utils/helper/popup":17,"../utils/http/jsonp":19,"../utils/string/querystringify":21}],5:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each),_hasClass=require("./hasClass"),_hasClass2=_interopRequireDefault(_hasClass);exports["default"]=function(elements,className){return _each2["default"](elements,function(el){_hasClass2["default"](el,className)||(el.className+=" "+className)})},module.exports=exports["default"]},{"./each":7,"./hasClass":9}],6:[function(require,module,exports){"use strict";function create(node,attr){var n="string"==typeof node?document.createElement(node):node;if("object"==typeof attr)if("tagName"in attr)target=attr;else for(var x in attr)if(attr.hasOwnProperty(x))if("text"===x)n.appendChild(document.createTextNode(attr[x]));else if("html"===x)"string"==typeof attr[x]?n.innerHTML=attr[x]:n.appendChild(attr[x]);else if("object"==typeof attr[x])for(var y in attr[x])attr[x].hasOwnProperty(y)&&(n[x][y]=attr[x][y]);else n.setAttribute(x,attr[x]);return n}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=create,module.exports=exports["default"]},{}],7:[function(require,module,exports){"use strict";function each(matches){var callback=arguments.length<=1||void 0===arguments[1]?function(){}:arguments[1];if(matches instanceof Element||matches instanceof HTMLDocument||matches instanceof Window)return callback(matches),[matches];if("string"==typeof matches&&(matches=document.querySelectorAll(matches)),callback)for(var i=0;i<matches.length;i++)callback.call(matches[i],matches[i],i);return matches||[]}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=each,module.exports=exports["default"]},{}],8:[function(require,module,exports){"use strict";function findPos(obj){var curleft=0,curtop=0;if(obj.offsetParent)do curleft+=obj.offsetLeft,curtop+=obj.offsetTop;while(obj=obj.offsetParent);return[curleft,curtop]}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=findPos,module.exports=exports["default"]},{}],9:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _until=require("./until"),_until2=_interopRequireDefault(_until);exports["default"]=function(elements,className){var reg=new RegExp("(^|\\s)"+className+"($|\\s)","i");return _until2["default"](elements,function(el){return el.className&&el.className.match(reg)})},module.exports=exports["default"]},{"./until":14}],10:[function(require,module,exports){"use strict";function id(tag){if(tag.id)return tag.id;var text=tag.innerText||tag.textContent||tag.innerHTML,ref=text.toLowerCase().replace(/\s/g,"-").replace(/[^a-z0-9\_\-]/g,"");return tag.id=ref,ref}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=id,module.exports=exports["default"]},{}],11:[function(require,module,exports){"use strict";function insertAfter(el,ref){ref.nextSibling?ref.parentNode.insertBefore(el,ref.nextSibling):ref.parentNode.appendChild(el)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=insertAfter,module.exports=exports["default"]},{}],12:[function(require,module,exports){"use strict";function insertBefore(el,ref){ref.parentNode.insertBefore(el,ref)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=insertBefore,module.exports=exports["default"]},{}],13:[function(require,module,exports){"use strict";function meta(name){var content;try{content=document.querySelector('meta[name="'+name+'"]').content}catch(e){}return content}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=meta,module.exports=exports["default"]},{}],14:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _each=require("./each"),_each2=_interopRequireDefault(_each);exports["default"]=function(elements,callback){var bool;return _each2["default"](elements,function(el){bool||(bool=callback(el))}),bool},module.exports=exports["default"]},{"./each":7}],15:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function on(elements,eventnames,callback){var useCapture=arguments.length<=3||void 0===arguments[3]?!1:arguments[3];return eventnames=eventnames.split(/\s+/),_domEach2["default"](elements,function(el){eventnames.forEach(function(eventname){return el.addEventListener(eventname,callback,useCapture)})})}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=on;var _domEach=require("../dom/each"),_domEach2=_interopRequireDefault(_domEach);module.exports=exports["default"]},{"../dom/each":7}],16:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function ready(callback){"loading"!==document.readyState&&document.body?callback():_on2["default"](document,"DOMContentLoaded",callback)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=ready;var _on=require("./on"),_on2=_interopRequireDefault(_on);module.exports=exports["default"]},{"./on":15}],17:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}function popup(url,target){var options=arguments.length<=2||void 0===arguments[2]?{}:arguments[2];return dimensions.forEach(generatePosition.bind(options)),window.open(url,target,_stringQuerystringify2["default"](options,","))}function generatePosition(_ref){var _ref2=_slicedToArray(_ref,2),Position=_ref2[0],Dimension=_ref2[1],position=Position.toLowerCase(),dimension=Dimension.toLowerCase();if(this[dimension]&&!(position in this)){var dualScreenPos=void 0!==window["screen"+Position]?window["screen"+Position]:screen[position],d=screen[dimension]||window["inner"+Dimension]||documentElement["client"+Dimension];this[position]=parseInt((d-this[dimension])/2,10)+dualScreenPos}}Object.defineProperty(exports,"__esModule",{value:!0});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();exports["default"]=popup;var _stringQuerystringify=require("../string/querystringify"),_stringQuerystringify2=_interopRequireDefault(_stringQuerystringify),documentElement=document.documentElement,dimensions=[["Top","Height"],["Left","Width"]];module.exports=exports["default"]},{"../string/querystringify":21}],18:[function(require,module,exports){"use strict";function json(url,callback){var x=new XMLHttpRequest;x.onload=function(){var v;try{v=JSON.parse(x.response)}catch(e){}callback(v)},x.onerror=callback,x.open("GET",url),x.send()}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=json,module.exports=exports["default"]},{}],19:[function(require,module,exports){"use strict";function jsonp(url,callback){var callback_name="_tricks_jsonp_"+counter++;window[callback_name]=callback;var sibling=document.getElementsByTagName("script")[0],script=document.createElement("script");script.src=url+"&callback="+callback_name,script.async=!0,sibling.parentNode.insertBefore(script,sibling)}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=jsonp;var counter=0;module.exports=exports["default"]},{}],20:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _domInsertBefore=require("../dom/insertBefore"),_domInsertBefore2=_interopRequireDefault(_domInsertBefore);exports["default"]=function(tracking){window._gaq=window._gaq||[],_gaq.push(["_setAccount",tracking]),_gaq.push(["_trackPageview"]);var ga=document.createElement("script");ga.type="text/javascript",ga.async=!0,ga.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js",_domInsertBefore2["default"](ga,document.getElementsByTagName("script")[0])},module.exports=exports["default"]},{"../dom/insertBefore":12}],21:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(hash){var delimiter=arguments.length<=1||void 0===arguments[1]?"&":arguments[1],seperator=arguments.length<=2||void 0===arguments[2]?"=":arguments[2];return Object.keys(hash).map(function(name){var value=hash[name];return name+(null!==value?seperator+value:"")}).join(delimiter)},module.exports=exports["default"]},{}],22:[function(require,module,exports){"use strict";function rURL(path,relative){if(!path)return"";try{return new URL(path,new URL(relative,window.location)).href||path}catch(e){return path}}Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=rURL,module.exports=exports["default"]},{}],23:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports["default"]=function(property,enabled){document.documentElement.className=document.documentElement.className+" "+(enabled?"":"no-")+property},module.exports=exports["default"]},{}],24:[function(require,module,exports){"use strict";"header,section,datalist,option,footer,nav,menu,aside,article,style,script".split(",").forEach(function(tag){return document.createElement(tag)})},{}],25:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}Object.defineProperty(exports,"__esModule",{value:!0});var _CSSSupports=require("./CSSSupports"),_CSSSupports2=_interopRequireDefault(_CSSSupports),result="ontouchstart"in window;_CSSSupports2["default"]("touch",result),exports["default"]=result,module.exports=exports["default"]},{"./CSSSupports":23}],26:[function(require,module,exports){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{"default":obj}}var _domInsertBefore=require("../dom/insertBefore"),_domInsertBefore2=_interopRequireDefault(_domInsertBefore),_domCreate=require("../dom/create"),_domCreate2=_interopRequireDefault(_domCreate);_domInsertBefore2["default"](_domCreate2["default"]("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"}),document.getElementsByTagName("script")[0])},{"../dom/create":6,"../dom/insertBefore":12}]},{},[1]);
//# sourceMappingURL=adorn.js.map