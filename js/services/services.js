define(['backbone', 'text!appTemplates/comments.html', 'appCollections/appCommentCollection'], function (Backbone, CommentsTemplate, CommentCollection) {
	var services = {
		getPhotos: function (collection, tagName, count, loadMore) {
			var url;
			var tagName = $('#tagsearch').val();
			if (tagName) {
				if (count) {
					var counter = count;
				}
				url = 'https://api.instagram.com/v1/tags/' + tagName + '/media/recent?callback=?&count=' + counter;
			}
			else {
				url = 'https://api.instagram.com/v1/media/popular?callback=?&count=' + 5;
			}
			Backbone.ajax({
				url: url,
				dataType: 'jsonp',
				type: 'GET',
				data: {client_id: 'b72fa81b108841b3aaba1cd330b43a3b'},
				success: function (response) {
					if (loadMore) {
						var myModels = [];
						for (var i = 0; i < collection.models.length; i++) {
							myModels.push(collection.models[i]);
						}
						for (var i = 0; i < response.data.length; i++) {
							response.data[i].comments = null;
							myModels.push(response.data[i]);
						}
						collection.reset(myModels);
					}
					else {
						for (var i = 0; i < response.data.length; i++) {
							response.data[i].comments = null;
						}
						collection.reset(response.data);
					}
				}
			});
		},
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
