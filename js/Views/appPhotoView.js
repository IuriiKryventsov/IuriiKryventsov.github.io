define(['backbone', 'text!appTemplates/photo.html'], function (Backbone, PhotoTemplate) {
		App.Views.PhotoView = Backbone.View.extend({
				events: {
						"keyup .comments-add-homepage": "addComment"
				},
				template: _.template(PhotoTemplate),
				initialize: function (options) {
						this.storage = options.storage;
						this.listenTo(this.model, "change", this.render);
						this.render();
				},
				render: function () {
						this.$el.html(this.template(this.model));
						$('.expand-comments').click(function () {
								var id = $(this).data('id');
								$("#" + id + " .photo-comment").css('display', 'block');
								$("#" + id + " .comments-count").css("display", "none");
						});
						return this;
				},
				addComment: function (e) {
						if (e.keyCode == 13) {
								var target = $(event.target);
								var id = this.model.get("id");
								var text = target.val();
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
										this.model.set('comments', repository.comments);
										this.model.set('length', commentsLength);
										this.model.set('username', 'Iurii');
										this.storage.localStorage.update(comment);
								} else {
										var commentsLength = 1;
										comment.set('comments', [
												{text: text}
										]);
										comment.set('length', commentsLength);
										this.model.set('comments', [
												{text: text}
										]);
										this.model.set('length', commentsLength);
										this.model.set('username', 'Iurii');
										this.storage.create(comment);
								}
								target.val('');
						}
				}
		});
		return App.Views.PhotoView;
});
