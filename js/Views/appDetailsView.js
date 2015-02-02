define(['backbone', 'appServices/services', 'appCollections/appCommentCollection', 'text!appTemplates/details.html', 'text!appTemplates/comments.html'], function (Backbone, services, CommentCollection, DetailsTemplate, CommentsTemplate) {
		App.Views.DetailsView = Backbone.View.extend({
				events: {
						"click #addBtn": "addComment",
						"keyup #comments-add": "addComment"
				},
				el: '#content',
				template: _.template(DetailsTemplate),
				initialize: function (options) {
						this.appmodel = options.appmodel;
						this.storage = options.storage;
						this.listenTo(this.appmodel, "change", this.getPhotoData);
						this.listenTo(this.model, "change", this.render);
				},
				getPhotoData: function () {
						var page = this.appmodel.get("page");
						if (page === 'detailspage') {
								var id = this.appmodel.get("id");
								services.getPhotoObj(this.model, id);
						}
				},
				render: function () {
						this.$el.html(this.template(this.model.toJSON()));
						var height = $('#photo-details').css("height");
						$('#details-information').css("height", height);
				},
				addComment: function (e) {
						if (!e.keyCode || e.keyCode === 13) {
								var id = this.appmodel.get("id");
								var text = $('#comments-add').val();
								if (text.length < 1) {
										return false;
								}
								var commentModel = Backbone.Model.extend();
								var comment = new commentModel({username: 'Iurii', id: id, length: 0});
								var repository = this.storage.localStorage.find(comment);
								if (repository) {
										var commentsLength = repository.length + 1;
										repository.comments.push({text: text});
										comment.set('comments', repository.comments);
										comment.set('length', commentsLength);
										this.storage.localStorage.update(comment);
								} else {
										var commentsLength = 1;
										comment.set('comments', [
												{text: text}
										]);
										comment.set('length', commentsLength);
										this.storage.create(comment);
								}
								$('#comments-add').val('');
								$('#comments-field').html('');

								var compileComment = function (comment, context) {
										var commentsObj = context.localStorage.find(comment);
										var template = _.template(CommentsTemplate);
										$('#comments-field').append(template(commentsObj));
								};

								compileComment(comment, this.storage);
						}
				}
		});
		return App.Views.DetailsView;
})
;

