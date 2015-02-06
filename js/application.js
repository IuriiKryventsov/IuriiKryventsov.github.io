/**
	*  Application object
	*/
define(['Models/appModel', 'Models/photoModel', 'Views/appDetailsView', 'Views/appHomeView', 'Views/appPhotosTemplateView', 'Router/appRouter', 'Collections/appCollection', 'Collections/appCommentCollection', 'globals/globals', 'jquery', 'backbone'], function (AppModel, PhotoModel, DetailsView, HomeView, PhotosTemplateView, Router, PhotoCollection, CommentCollection, globals, $, Backbone) {
		var Application = (function () {
				var self = null;
				//Model
				var photoModel, appModel;
				//Collection
				var photosCollection = new PhotoCollection();
				var storage = new CommentCollection();
				//Views
				var homeView, detailsView;
				//Controller(Router)
				var appRouter;
				// Constructor
				var module = function () {
						self = this;
				};
				module.prototype =
				{
						constructor: module,
						init: function () {
								self.initModel();
								self.initView();
								self.initRouter();
						},
						initModel: function () {
								photoModel = new PhotoModel();
								appModel = new AppModel();
						},
						initView: function () {
								homeView = new HomeView({model: appModel, collection: photosCollection, storage: storage});
								detailsView = new DetailsView({
										appmodel: appModel,
										model: photoModel,
										collection: photosCollection,
										storage: storage
								});
						},
						initRouter: function () {
								appRouter = new Router({model: appModel});
								Backbone.history.start();
						}
				};
				return module;
		})();
		return Application;
});

