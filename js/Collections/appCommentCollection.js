define(['backbone', 'backboneLocalStorage'], function (Backbone) {
		App.Collections.Comments = Backbone.Collection.extend({
				localStorage: new Backbone.LocalStorage("comments-store")
		});
		return App.Collections.Comments;
});

