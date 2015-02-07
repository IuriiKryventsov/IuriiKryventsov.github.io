define(['Models/appModel', 'Models/photoModel', 'Views/appDetailsView', 'Views/appHomeView', 'Views/appPhotosTemplateView', 'Router/appRouter', 'Collections/appCollection', 'Collections/appCommentCollection', 'globals/globals', 'jquery', 'backbone'],
		function (AppModel, PhotoModel, DetailsView, HomeView, PhotosTemplateView, Router, PhotoCollection, CommentCollection, globals, $, Backbone) {
				var Application = (function () {
						var photoModel = new PhotoModel(),
								appModel = new AppModel(),
								photosCollection = new PhotoCollection(),
								storage = new CommentCollection(),
								homeView = new HomeView({model: appModel, collection: photosCollection, storage: storage}),
								detailsView = new DetailsView({appmodel: appModel, model: photoModel, collection: photosCollection, storage: storage});
						var module = {
								init: function () {
										var appRouter = new Router({model: appModel});
										Backbone.history.start();
								}
						};
						return module;
				})();
				return Application;
		});

