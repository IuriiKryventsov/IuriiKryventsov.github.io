define(['backbone', 'appViews/appPhotoView', 'appCollections/appCollection', 'appServices/services'], function (Backbone, PhotoView, Collection, services) {
		App.Views.PhotosTemplateView = Backbone.View.extend({
				el: '#photosList',
				initialize: function (options) {
						this.storage = options.storage;
						this.listenTo(this.collection, 'reset', this.render);
				},
				render: function () {
						$('#photosList').html('');
						if (this.collection && this.collection.length > 0) {
								this.collection.each(function (details) {
										var photoWithComments = services.getPhotoWithComments(details);
										var photoView = new PhotoView({model: photoWithComments, storage: this.storage});
										this.$el.append(photoView.render().el);
								}, this);
								return this;
						}
				}
		});
		return App.Views.PhotosTemplateView;
});
