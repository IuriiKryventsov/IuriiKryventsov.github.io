define(['backbone'], function (Backbone) {
	var appModel = Backbone.Model.extend({
		defaults: {
			page: "mainpage",
			id: "id"
		}
	});
	return appModel;
});

