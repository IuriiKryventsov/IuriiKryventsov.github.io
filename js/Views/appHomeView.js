define(['backbone', 'appServices/services', 'appViews/appPhotosTemplateView', 'text!appTemplates/homepage.html'], function (Backbone, services, appPhotosTemplateView, HomepageTemplate) {
		App.Views.HomeView = Backbone.View.extend({
				events: {
						"click button#btn": "loadMore",
						"click button.search-btn": "searchByTag"
				},
				el: '#content',
				template: _.template(HomepageTemplate),
				initialize: function (options) {
						this.storage = options.storage;
						this.listenTo(this.model, "change", this.checkRoutePage);
				},
				render: function () {
						this.$el.html(this.template);
						var photosTemplateView = new appPhotosTemplateView({collection: this.collection, storage: this.storage});
						photosTemplateView.render();
						if (this.collection.models.length === 0) {
								this.collection.fetch({
										data: {client_id: 'b72fa81b108841b3aaba1cd330b43a3b', loadMore: false}
								});
						}
						return this;
				},
				checkRoutePage: function () {
						var page = this.model.get("page");
						if (page === 'homepage') {
								this.render();
						}
				},
				searchByTag: function () {
						var myTag = $('#tagsearch').val();
						var counter = 5;
						if (myTag.length != 0) {
								this.collection.fetch({
										data: {client_id: 'b72fa81b108841b3aaba1cd330b43a3b'},
										url: 'https://api.instagram.com/v1/tags/' + myTag + '/media/recent?callback=?&count=' + counter,
										type: 'GET'
								}).done(this.render);
						}
				},
				loadMore: function () {
						var myTag = $('#tagsearch').val();
						var counter = 5;
						if (myTag.length != 0) {
								this.collection.fetch({
										data: {client_id: 'b72fa81b108841b3aaba1cd330b43a3b', loadMore: true},
										url: 'https://api.instagram.com/v1/tags/' + myTag + '/media/recent?callback=?&count=' + counter,
										type: 'GET'
								}).done(this.render);
						}
						else {
								this.collection.fetch({
										data: {client_id: 'b72fa81b108841b3aaba1cd330b43a3b', loadMore: true}
								});
						}
				}
		});
		return App.Views.HomeView;
});
