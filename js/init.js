requirejs.config({
	baseUrl: "js/library",
	paths: {
		jquery: 'jquery-2.1.1',
		backbone: 'backbone',
		underscore: 'underscore',
		backboneLocalStorage: 'backbone.localStorage',
		text: 'text',
		globals: '../globals',
		appServices: '../services',
		appCollections: '../Collections',
		appRouter: '../Router',
		appModels: '../Models',
		appViews: '../Views',
		appTemplates: '../templates'
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
require(["jquery", "../application"], function ($, Application) {
	$(document).ready(function () {
		var myApplication = new Application();
		myApplication.init();
	});
});