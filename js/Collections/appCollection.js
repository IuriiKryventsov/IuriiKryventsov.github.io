define(['backbone', 'Models/photoModel'], function (Backbone, photoModel) {
		App.Collections.Photos = Backbone.Collection.extend({
				model: photoModel,
				url: 'https://api.instagram.com/v1/media/popular?callback=?&count=5',
				sync: function (method, collection, options) {
						console.log(options);
						var loadMore = options.data.loadMore;
						var _sync = Backbone.sync;
						options.success = function (response) {
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
						};
						return _sync.apply(this, [method, collection, options]);
				}
		});
		return App.Collections.Photos;
});

