// Generated by CoffeeScript 1.7.1
(function() {
  define(["jquery", "backbone", "underscore"], function($, Backbone, _) {
    var validatable;
    validatable = {
      renderErrors: function(model, errors) {
        this.clearErrors();
        return _.each(errors, this.renderError, this);
      },
      renderError: function(errors, attribute) {
        var err;
        err = errors.join("; ");
        this.$("#" + attribute).closest("div.form-group").addClass('has-error');
        return this.$("#" + attribute).closest("div.form-group").append('<span class="help-block">' + err + '</span>');
      },
      parseErrorResponse: function(model, response) {
        var errors;
        if (response && response.status === 403) {
          App.Vent.trigger("access_denied");
        }
        if (response && response.responseText) {
          errors = JSON.parse(response.responseText);
          return this.renderErrors(model, errors.errors);
        }
      },
      clearErrors: function() {
        this.$('.has-error').removeClass('has-error');
        return this.$('span.help-block').remove();
      }
    };
    return validatable;
  });

}).call(this);
