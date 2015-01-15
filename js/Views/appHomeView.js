define(['backbone', 'appServices/services', 'appViews/appPhotosTemplateView', 'text!appTemplates/homepage.html'], function (Backbone, services, appPhotosTemplateView, HomepageTemplate) {
	App.Views.HomeView = Backbone.View.extend({
		events: {
			"click button#btn": "loadMore",
			"click #search-btn": "searchByTag"
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
				services.getPhotos(this.collection);
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
			if (myTag.length != 0) {
				services.getPhotos(this.collection, myTag, 5, false);
			}
		},
		loadMore: function () {
			var myTag = $('#tagsearch').val();
			if (myTag.length != 0) {
				services.getPhotos(this.collection, myTag, 5, true);
			}
			else {
				services.getPhotos(this.collection, false, 5, true);
			}
		}
	});
	return App.Views.HomeView;
});
