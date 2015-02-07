requirejs.config({
		baseUrl: "js",
		paths: {
				jquery: 'library/jquery-2.1.1',
				backbone: 'library/backbone',
				underscore: 'library/underscore',
				backboneLocalStorage: 'library/backbone.localStorage',
				text: 'library/text',
				globals: 'globals',
				Collections: 'Collections',
				Router: 'Router',
				Models: 'Models',
				Views: 'Views',
				Templates: 'templates'
		},
		shim: {
				'underscore': {
						exports: '_'
				},
				'backbone': {
						deps: ['underscore', 'jquery'],
						exports: 'Backbone'
				}
		}
});
require(["jquery", "application"], function ($, Application) {
		$(document).ready(function () {
				Application.init();
		});
});