// Generated by CoffeeScript 1.7.1
(function() {
  define(["jquery", "underscore", "backbone", "vent", "text!templates/content/content.html"], function($, _, Backbone, Vent, contentTemplate) {
    var contentView;
    contentView = Backbone.View.extend({
      initialize: function() {},
      swapMain: function(view) {
        this.changeCurrentMainView(view);
        return this.$('#main-area').html(this.currentMainView.render().el);
      },
      changeCurrentMainView: function(view) {
        if (this.currentMainView) {
          this.currentMainView.remove();
        }
        return this.currentMainView = view;
      },
      swapSide: function(view) {
        this.changeCurrentSideView(view);
        return this.$('#sidebar').html(this.currentSideView.render().el);
      },
      changeCurrentSideView: function(view) {
        if (this.currentSideView) {
          this.currentSideView.leave();
        }
        return this.currentSideView = view;
      },
      render: function() {
        var compiledTemplate;
        compiledTemplate = _.template(contentTemplate, {
          title: 'content area'
        });
        this.$el.html(compiledTemplate);
        return this;
      },
      getImportances: function() {
        return _.uniq(this.collection.pluck("importance"));
      }
    });
    return contentView;
  });

}).call(this);
