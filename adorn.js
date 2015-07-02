/**
 * adorn.js
 * Adds document navigation to a page.
 */

(function(window, document, encodeURIComponent){

	// JSONP COUNTER
	var jsonp_counter = 0;
	window.jsonp = jsonp;


	// Touch exists?
	addClass( document.documentElement, (' ' + ( "ontouchstart" in window ? '' : 'no-') + 'touch') );


	// fix HTML5 in IE
	each( "header,section,datalist,option,footer,nav,menu,aside,article,style,script".split(","), function(tag){
		document.createElement(tag);
	});

	// Add mobile ag to page.

	// Insert Meta Tag
	insertBefore( create('meta', {
		name:'viewport',
		content:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
	}), document.getElementsByTagName('script')[0] );



	// Manifest
	var manifest_json = meta("manifest") || "/manifest.json";

	// Set the toolbar, doesn't work if document body is undefined
	json(manifest_json, buildToolbar.bind(null, manifest_json));



	// ///////////////////////////////////
	// TOOLBAR
	// ///////////////////////////////////

	function buildToolbar(base, manifest){

		if(!document.body){
			// Just in case...
			ready(buildToolbar.bind(null, base, manifest));
			return;
		}

		// Set bench
		manifest = manifest || {};

		// Favicon
		manifest.favicon = meta("favicon") || rURL(manifest.favicon, base) || "/favicon.ico";

		// Author
		manifest.author = meta("author") || manifest.author;

		// Root domain
		manifest.root = rURL(manifest.root || '/', base);

		//
		// Build toolbar
		// 
		var repo_path,
			paths = (window.location.pathname||'').replace(/^\//g,'').split(/([^\/]+\/?)/).filter(function(s){return !!s});

		var url = window.location.href,
			social_btns = [],
			breadcrumbs = ['<a href="'+manifest.root+'"><img src="'+ manifest.favicon +'" alt="' + window.location.hostname + '" title="' + manifest.name + '"/></a>'];

		each( paths, function(val, index){
			breadcrumbs.push( '<a href="/'+ paths.slice(0,index+1).join('') + '">'+ val.replace(/\.(html?)$/, '') +'</a>' );
		});


		// GITHUB

		if( manifest.github && paths.length ){
			// Get the location of this file in the repo
			var repo_file = (window.location.pathname||'').replace(/^\/?([^\/]+)/g,'').replace(/\/$/, '/index.html');
			var repo = paths[0].replace(/\/$/,'');

			repo_path = "https://github.com/"+manifest.github+"/"+repo;
			social_btns = [
				'<a href="'+repo_path+'/blob/master'+ repo_file +'" target="_blank" id="adorn-edit">Edit this page</a>',
				'<a href="'+repo_path+'" class="adorn-github-button" target="_blank" title="Stars"><i class="adorn-icon-github"></i><span class="adorn-speeach-bubble"></span></a>',
			];


			// Install the GitHub widget
			// Probably could make this a little more ajaxy
			jsonp('https://api.github.com/repos/'+ manifest.github +'/'+repo+'?',function(r){
				// Add value to twitter icon
				// Add value to twitter icon
				each('.adorn-github-button span.adorn-speeach-bubble', function(){
					this.innerHTML = r.data.watchers || '';
				});
			});
		}


		// TWITTER

		var twitter_creator = manifest['twitter:creator'] || meta("twitter:creator");

		if (twitter_creator) {
			social_btns.push('<a href="https://twitter.com/share" class="adorn-twitter-button" target="_blank" data-via="'+ twitter_creator.replace('@','') +'" title="Tweet"><i class="adorn-icon-twitter"></i><span class="adorn-speeach-bubble"></span></a>');

			if(window.location.href.indexOf('http://')===0){
				// Probably could make this a little more ajaxy
				jsonp('http://urls.api.twitter.com/1/urls/count.json?url='+encodeURIComponent(url),function(r){
					// Add value to twitter icon
					each('.adorn-twitter-button span.adorn-speeach-bubble', function(){
						this.innerHTML = r.count || '';
					});
				});
			}
		}


		insertBefore(create('aside', {
			'class' : 'adorn-toolbar',
			'html' : '<div class="adorn-breadcrumbs"> '+breadcrumbs.join(' ') +'</div> <div class="adorn-links">'+ social_btns.join('<span></span>') +' <div class="clearfix"></div></div>'
		}),document.body.firstElementChild||document.body.firstChild);



		//
		// Add event to twitter button
		addEvent('.adorn-twitter-button','click',function(e) {
			
			var hashtag;

			e.preventDefault();

			var w = 550,
				h = 250,
				l = (screen.width/2)-(w/2),
				t = (screen.height/2)-(h/2);

			var hashtag = meta("twitter:hashtag") || manifest['twitter:hashtag'];

			window.open("https://twitter.com/intent/tweet?text="+ encodeURIComponent( document.title ) + (hashtag ? '&hashtags=' + hashtag : '') + "&via=" + this.getAttribute('data-via') + "&url="+ encodeURIComponent(window.location.href.replace(/#.*/,'')), 'twitter', 'width='+w+',height='+h+',left='+l+'px,top='+t+'px');
		});

		// ///////////////////////////////////
		// TOC
		// ///////////////////////////////////

		ready(buildNav);


		// ///////////////////////////////////
		// FOOTER
		// ///////////////////////////////////

		if (manifest.author) {

			ready(function() {

				var author = manifest.author.split(/\s*,\s*/);

				if (author) {
					// Add Footer link to repo
					document.body.appendChild(create('footer',{
							html : 'Authored by ' + ( author[1] ? '<a href="'+author[1]+'" rel="author">'+author[0]+'</a>' : author[0] )
						}
					));
				}

			});
		}


		// ///////////////////////////////////
		// Analytics
		// ///////////////////////////////////

		(function() {

			var tracking = manifest['ga:tracking'] || meta("ga:tracking");

			if (tracking) {
				this._gaq = this._gaq || [];
				_gaq.push(['_setAccount', tracking]);
				_gaq.push(['_trackPageview']);

				var ga = document.createElement('script');
				ga.type = 'text/javascript';
				ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				insertBefore(ga, document.getElementsByTagName('script')[0]);
			}

		})();
	}


	// ///////////////////////////////////
	// Markup
	// ///////////////////////////////////

	ready(function() {

		//
		function tryitButton(pre,func){
			var btn = create('button',{html:'tryit','class':'tryit'});
			insertAfter(btn, pre);

			addEvent(btn, 'click', function(){
				if(func){
					func();
				}
				else if(typeof(tryit)==='function'&&!tryit(pre.innerText)){
					return;
				}else{
					setTimeout( function(){ eval(pre.innerText); }, 100);
				}
			});

			if(!func){
				pre.setAttribute('contenteditable', true);
			}
		}


		// TryIt
		each('pre', function(pre){
			if(pre.className === 'tryit'||pre.className === 'tryitoffline'){
				// Create a button and insert it after the pre tag
				tryitButton(pre);
			}
		});

		// TryIt, View
		each('script', function(script){
			var func = script.getAttribute('data-tryit');
			if(func){
				// Create a button and insert it after the pre tag
				tryitButton(script,window[func]);
			}

			if(script.getAttribute('src')){

				// Add click event to open in new window
				addEvent(script, 'click', function(){
					window.open(script.getAttribute('src'), '_blank');
				});
			}
		});

		each('link', function(script){
			if(script.getAttribute('href')){

				// Add click event to open in new window
				addEvent(script, 'click', function(){
					window.open(script.getAttribute('href'), '_blank');
				});
			}
		});
	});

	// ///////////////////////////////////
	// Navigation
	// ///////////////////////////////////
	
	if (!document.querySelector || !!(document.documentElement.className||'').match(/adorn-(nav|toc)-off/)) {
		// This feature is disabled
		return;
	}

	ready(function() {

		each('h1,h2', function(tag) {

			// Get the ID of the tag
			var ref = id(tag);

			// Create an anchor for this tag
			tag.insertBefore(create('a', {name: ref, href: "#" +ref, "class": "adorn-anchor"}), tag.firstChild);
		});

	});


	function buildNav() {

		// TOC
		var last_depth = 0,
			headings = each('h1,h2');

		if (headings.length<2) {
			return;
		} 

		var toc = create('div', {'class':'adorn-toc'});
		insertAfter( toc, document.querySelector('.adorn-breadcrumbs') );

		var select = create('select');
		var options = [];
		addEvent(select, 'change', function() {
			window.location.hash = select.options[select.selectedIndex].value;
		});
		toc.appendChild(select);

		each(headings, function(tag) {

			// Get ID
			var depth = parseInt(tag.tagName.match(/[0-9]/)[0], 10),
				text = (tag.innerText||tag.textContent||tag.innerHTML),
				ref = id(tag);

			select.appendChild(create('option', {html: text, value: ref}));

			options.push(ref);

		});

		function hashChange() {
			select.selectedIndex = options.indexOf(window.location.hash.substr(1));
		}

		//
		// Is there a TOC
		if(toc){

			setTimeout(function(){
				// Lets add a class to the body
				addClass(document.documentElement,"adorn-toc-on");
			});
		}

		addEvent(window, 'hashchange', hashChange);

		// // Listen to scroll direction

		// var _prevScrollTop = document.body.scrollTop;

		// // Listen to scroll direction
		// addEvent(window, 'scroll', function(e){

		// 	var scrollTop = Math.max(document.body.scrollTop,0);
		// 	var scrollingDown = _prevScrollTop < scrollTop;
		// 	_prevScrollTop = scrollTop;

		// 	// Add a class to the documentElement describing the direction of the scroll
		// 	addClass( document.documentElement, "adorn-scroll-" + (scrollingDown ? 'down' : 'up') );
		// 	removeClass( document.documentElement, "adorn-scroll-" + (!scrollingDown ? 'down' : 'up') );
		// });


		// Listen to scroll navigation position
		var toolbar_height = document.querySelector('.adorn-toolbar').offsetHeight || 50;
		addEvent(window, 'scroll', function(e){

			// from the list of items
			// find the one which is in view on the page
			var T = window.scrollY || window.pageYOffset,
				H = ("screen" in window ? window.screen.availHeight : 500);

			var tag;

			// Find the current selection
			until( headings, function(anchor) {

				var t = findPos(anchor)[1] - toolbar_height;

				if (T < t) {

					// Stop looping
					return true;
				}

				// set the last active tag
				tag = anchor;
			});


			// Has a tag been set?
			if (tag) {
				// Set as the current selected one
				var text = (tag.innerText||tag.innerHTML),
				ref = tag.getElementsByTagName('a')[0];

				if(ref){
					ref = ref.getAttribute('href').replace(/^#/,'');
				}

				// Change the current window hash
				if( "history" in window && "replaceState" in window.history && window.location.hash !== '#'+ref ){
					history.replaceState({}, document.title, "#"+ref);
				}

				// Update the 
				hashChange();
			}

		});



		// If toc
		if(!toc){
			return;
		}

		// Add a class to the documentElement describing the direction of the scroll
		var clist = toc.classList;
		if(!clist){
			return;
		}

		// Get items that need to be static, and then float
		var tocY = findPos(toc)[1];

		// Offset Parent
		
		addEvent(window, 'scroll', function(e){
			var sY = window.scrollY || window.pageYOffset;
			if( sY > tocY ){
				clist.add( 'adorn-float' );
			}
			else{
				clist.remove('adorn-float');
			}
		});
	}

	// Auto Set/Get the ID of a tag element based
	function id(tag) {
		if (tag.id) {
			return tag.id;
		}
		var text = (tag.innerText||tag.textContent||tag.innerHTML),
			ref = text.toLowerCase().replace(/\s/g,'-').replace(/[^a-z0-9\_\-]/g, '');

		tag.id = ref;

		return ref;
	}

	// Find position of an element
	function findPos(obj) {
		var curleft = 0,
			curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while ((obj = obj.offsetParent));
		}
		return [curleft,curtop];
	}

	// Insert After
	function insertAfter(el,ref){
		ref.nextSibling?ref.parentNode.insertBefore(el,ref.nextSibling):ref.parentNode.appendChild(el);
	}

	function insertBefore(el,ref){
		ref.parentNode.insertBefore(el,ref);
	}

	//
	// Create and Append new Dom elements
	// @param node string
	// @param attr object literal
	// @param dom/stringx
	//
	function create(node,attr){

		var n = typeof(node)==='string' ? document.createElement(node) : node;

		if(typeof(attr)==='object' ){
			if( "tagName" in attr ){
				target = attr;
			}
			else{
				for(var x in attr){if(attr.hasOwnProperty(x)){

					if(x === 'text'){
						n.appendChild(document.createTextNode(attr[x]));
					}
					else if(x === 'html'){
						if(typeof(attr[x])==='string'){
							n.innerHTML = attr[x];
						}
						else{
							n.appendChild(attr[x]);
						}
					}
					else if(typeof(attr[x])==='object'){
						for(var y in attr[x]){if(attr[x].hasOwnProperty(y)){
							n[x][y] = attr[x][y];
						}}
					}
					else {
						n.setAttribute(x, attr[x]);
					}
				}}
			}
		}
		return n;
	}

	function addEvent(obj, eventName, listener) { //function to add event
		if(obj instanceof window.NodeList || typeof obj === 'string'){
			each(obj, function(elm) {
				addEvent( elm, eventName, listener );
			});
			return;
		}
		if(eventName===true){
			// execue immediatley
			listener();
			return;
		}
		if(!obj){
			return;
		}
		if (obj.addEventListener) {
			obj.addEventListener(eventName, listener, false);
		} else if(obj.attachEvent){
			// DOMContentLoaded
			if( eventName === "DOMContentLoaded" ){
				eventName = 'readystatechange';
				_listener = listener;
				listener = function(){
					if(obj.readyState === "complete"){
						_listener();
					}
				};
			}
			obj.attachEvent("on" + eventName, listener);
		}
	}

	function ready(callback){
		if( document.readyState !== "loading" && document.body ){
			callback();
		}
		else{
			addEvent(document, 'DOMContentLoaded', callback);
		}
	}

	function toggleClass(elm, className){
		if(elm.className.match(className)){
			removeClass( elm, className );
		}
		else{
			addClass(elm, className);
		}
	}

	function addClass(elm, className) {
		var reg = new RegExp("(^|\\s)"+className+"($|\\s)", 'i');
		if( !elm.className.match( reg ) ){
			elm.className += ' '+className;
		}
	}

	function removeClass(elm, className){
		var reg = new RegExp("(^|\\s)+"+className+"($|\\s)+", 'i');
		elm.className = elm.className.replace(reg, ' ');
	}

	//
	// JSONP

	function jsonp(url, callback){
		// JSONP
		// Make the anonymous function. not anonymous
		var callback_name = 'jsonp_document_' + jsonp_counter++;

		window[callback_name] = callback;
		// find a place to insert the script tag
		var sibling = document.getElementsByTagName('script')[0];
		// Create the script tag
		var script = document.createElement('script');
		// Update the path with the callback name
		script.src = (url+"&callback="+callback_name);
		script.async = true;
		// Append
		sibling.parentNode.insertBefore(script,sibling);
	}


	// JSON

	function json(url, callback) {
		var x = new XMLHttpRequest();
		x.onload = function(){
			var v;
			try {v = JSON.parse(x.response);} catch(e) {}
			callback(v);
		};
		x.onerror = callback;
		x.open("GET", url);
		x.send();
	}


	function each(matches, callback){
		if(typeof(matches)==='string'){
			matches = document.querySelectorAll(matches);
		}

		if(callback) {
			for(var i=0;i<matches.length;i++){
				callback.call(matches[i], matches[i], i );
			}
		}

		return matches || [];
	}

	// Iterate on all items until a condition has been met
	function until(matches, callback) {
		var b = false;
		each(matches, function(item){
			if( b )
				return;
			b = callback.apply(item, arguments);
		});
	}

	function meta(name){
		var content;
		try{
			content = document.querySelector('meta[name="'+name+'"]').content;
		}
		catch(e) {}

		return content;
	}

	function rURL(path, relative) {
		if (!path) {
			return '';
		}

		try {
			// This only works in a few browsers, but what the heck. i'll fix it later
			return (new URL(path, new URL(relative, window.location))).href
		}
		catch (e) {
			return path;
		}
	}

})(window, document, encodeURIComponent);