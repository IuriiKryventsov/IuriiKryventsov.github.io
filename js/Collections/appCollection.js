define(['backbone', 'appModels/photoModel'], function (Backbone, photoModel) {
	App.Collections.Photos = Backbone.Collection.extend({
		model: photoModel
	});
	return App.Collections.Photos;
});

