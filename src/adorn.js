/*!*/
/*! Adorn by Andrew Dodson, https://adodson.com/adorn/LICENSE (MIT) */

import json from 'tricks/http/json';
import fullpath from 'tricks/string/fullpath';
import meta from 'tricks/dom/meta';
import ready from 'tricks/events/ready';

// Touch exists?
import 'tricks/support/touch';

// fix HTML5 in IE8
import 'tricks/support/html5';

// fix viewport in mobile
import 'tricks/support/viewport';

// Phonegap Shim
import cordovaLinks from 'tricks/helper/cordovaExternalLinks';

// Analytics
import ga from 'tricks/services/googleanalytics';

// Components
import helpers from './components/helpers';

// Inject controls into the page markup once the DOM has completely loaded.
ready(helpers);

// Widget components
import footer from './components/footer';
import sidebar from './components/sidebar';
import toolbar from './components/toolbar';


// Get the manifest
{
	// Manifest
	let manifest_json = meta('manifest') || '/manifest.json';

	// Set the toolbar, doesn't work if document body is undefined
	json(manifest_json, setup.bind(null, manifest_json));
}

// Is this a phonegap application?
// Shim up the external Links issue
cordovaLinks();


// Setup function to be called when the body and the manifest exist.
function setup(base, manifest = {}) {

	if (!document.body) {
		// Just in case...
		ready(setup.bind(null, base, manifest));
		return;
	}

	// Favicon
	manifest.favicon = meta('favicon') || fullpath(manifest.favicon, base) || '/favicon.ico';

	// Author
	manifest.author = meta('author') || manifest.author;

	// Root domain
	manifest.root = meta('root') || fullpath(manifest.root || '/', base);

	// Markup
	{
		// Toolbar
		toolbar(manifest);

		// Toolbar
		sidebar(manifest);

		// Footer
		footer(manifest);
	}

	// Analytics
	{

		let tracking = meta('ga:tracking') || manifest['ga:tracking'];

		if (tracking) {
			ga(tracking);
		}

	}

	// Service Workers
	if ('serviceWorker' in navigator) {

		let sw = meta('sw') || meta('serviceworker') || manifest['sw'] || manifest['serviceworker'];

		navigator.serviceWorker.register(sw).then(reg => {
			// Registration was successful
			console.log('Adorn: ServiceWorker registration successful with scope: ', reg.scope);
		}).catch(err => {
			// registration failed :(
			console.log('Adorn: ServiceWorker registration failed: ', err);
		});
	}
}
