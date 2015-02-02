define(['backbone'], function (Backbone) {
		App.Routers.Router = Backbone.Router.extend({
				routes: {
						"": 'setDefault',
						'photos': 'viewRoute',
						'photos/:id': 'detailsRoute',
						'*other': 'setDefault'
				},
				initialize: function (options) {
						this.appModel = options.model;
				},
				setDefault: function () {
						window.location = window.location.origin + window.location.pathname + '#/photos';
				},
				viewRoute: function () {
						this.appModel.set({page: "homepage"});
				},
				detailsRoute: function (id) {
						this.appModel.set({page: "detailspage", id: id});
				}
		});
		return App.Routers.Router;
});
