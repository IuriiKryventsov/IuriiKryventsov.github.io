define(['backbone', 'Collections/appCommentCollection'], function (Backbone, CommentCollection) {
		App.Models.Details = Backbone.Model.extend({
				url: function () {
						return 'https://api.instagram.com/v1/media/' + this.id + '?access_token=16384709.6ac06b4.49b97800d7fd4ac799a2c889f50f2587'
				},
				sync: function (method, model, options) {
						var id = model.id;
						var storage = new CommentCollection;
						var _sync = Backbone.sync;
						options.success = function (response) {
								var commentsObj = storage.localStorage.find({id: id});
								if (commentsObj != null) {
										response.data.comments = commentsObj;
								}
								model.set('data', response.data);
						};
						return _sync.apply(this, [method, model, options]);
				}
		});
		return App.Models.Details;
});
