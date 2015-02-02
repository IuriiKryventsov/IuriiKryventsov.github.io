define(['backbone', 'text!appTemplates/comments.html', 'appCollections/appCommentCollection'], function (Backbone, CommentsTemplate, CommentCollection) {
		var services = {
				getPhotoObj: function (model, id) {
						var url = 'https://api.instagram.com/v1/media/' + id + '?access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587';
						var storage = new CommentCollection;
						Backbone.ajax({
								url: url,
								dataType: 'jsonp',
								type: 'GET',
								success: function (response) {
										var commentsObj = storage.localStorage.find({id: id});
										if (commentsObj != null) {
												response.data.comments = commentsObj;
										}
										model.set('data', response.data);
								}
						});
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
		};
		return services;
});
