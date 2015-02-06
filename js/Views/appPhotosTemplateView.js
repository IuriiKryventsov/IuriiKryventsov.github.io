define(['backbone', 'Views/appPhotoView', 'Collections/appCollection', 'Collections/appCommentCollection'], function (Backbone, PhotoView, Collection, CommentCollection) {
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
										var photoWithComments = this.getPhotoWithComments(details);
										var photoView = new PhotoView({model: photoWithComments, storage: this.storage});
										this.$el.append(photoView.render().el);
								}, this);
								return this;
						}
				},
					getPhotoWithComments: function (photo) {
						var storage = new CommentCollection;
						var commentsObj = storage.localStorage.find({id: photo.get('id')});
						if (commentsObj) {
								photo.attributes.comments = commentsObj.comments;
								photo.set({username: 'Iurii'});
						}
						return photo;
				}
		});
		return App.Views.PhotosTemplateView;
});
