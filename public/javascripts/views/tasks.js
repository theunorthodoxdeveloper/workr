// Generated by CoffeeScript 1.7.1
(function() {
  define(["jquery", "underscore", "backbone", "vent", "views/task", "text!templates/tasks/tasks.hbs", "text!templates/partials/filter_dropdown.hbs", "handlebars"], function($, _, Backbone, Vent, TaskView, tasksTemplate, filterTemplate, Handlebars) {
    var tasks;
    tasks = Backbone.View.extend({
      template: Handlebars.compile(tasksTemplate),
      events: {
        "click #filterablearea a": "setFilter"
      },
      initialize: function() {
        this.childViews = [];
        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(this.collection, "reset", this.render);
        this.listenTo(Vent, "task:create", this.renderNewTask);
        this.listenTo(Vent, "collection:add", this.render);
        this.on("change:filterValue", this.filterByImportance, this);
        this.collection.fetch({
          reset: true
        });
        return this.filterValue = void 0;
      },
      render: function() {
        this.$el.html(this.template({
          collection: this.collection
        }));
        this.$el.find("#filterablearea").append(this.createImportanceSelect());
        this.collection.forEach(this.renderTask, this);
        Vent.trigger('app.event');
        return this;
      },
      renderNewTask: function(model) {
        if (typeof this.filterValue === 'undefined') {
          this.collection.fetch({
            reset: true
          });
          return Vent.trigger("collection:add");
        } else {
          return this.filterByImportance();
        }
      },
      renderTask: function(model) {
        var view;
        view = new TaskView({
          model: model,
          collection: this.collection
        });
        this.childViews.push(view);
        return this.$('#taskList').append(view.render().el);
      },
      setFilter: function(e) {
        e.preventDefault();
        this.filterValue = $(e.currentTarget).attr("data-ref");
        return this.trigger("change:filterValue");
      },
      filterByImportance: function() {
        var filterValue, filtered, val;
        if (this.filterValue === 'tasks-live') {
          this.collection.fetch({
            success: (function(_this) {
              return function(collection) {
                return _this.render();
              };
            })(this)
          });
          return this.filterValue = void 0;
        } else if (this.filterValue === 'tasks-archive') {
          return this.collection.fetch({
            url: '/tasks/archive',
            success: (function(_this) {
              return function(collection) {
                return _this.render();
              };
            })(this)
          });
        } else {
          this.collection.fetch({
            silent: true
          });
          filterValue = this.filterValue;
          if (filterValue === 'importance-high') {
            val = '1';
          } else if (filterValue === 'importance-medium') {
            val = '2';
          } else {
            val = '3';
          }
          filtered = _.filter(this.collection.models, function(item) {
            return item.get("importance").toLowerCase() === val;
          });
          this.collection.reset(filtered);
          return this.render();
        }
      },
      createImportanceSelect: function() {
        return $(filterTemplate);
      }
    });
    return tasks;
  });

}).call(this);
