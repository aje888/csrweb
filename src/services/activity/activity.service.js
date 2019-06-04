// Initializes the `activity` service on path `/activity`
const createService = require('feathers-nedb');
const model = require('../../models/activity.model');
const hooks = require('./activity.hooks');
const db = require('mongoose');
const m2s = require('mongoose-to-swagger');

module.exports = function (app) {
  const Model = model.createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  const activityService = createService(options);

  const swaggerSchema = m2s(model.schema);

  // swagger spec for this service, see http://swagger.io/specification/
  activityService.docs = {
    description: 'A service to send and receive activities',
    definitions: {
      'activity_list': {
        $ref: '#/definitions/activity'
      },
      activity: swaggerSchema
    },
    operations: {
      find: {
        summary: 'FIND'
      },
      get: {
        summary: 'GET'
      },
      create: {
        summary: 'POST'
      },
      update: {
        summary: 'PUT'
      },
      remove: {
        summary: 'DELETE'
      },
      patch: {
        summary: 'PATCH'
      },
      
    }
  };

  // Initialize our service with any options it requires
  app.use('/activity', activityService);

  // Get our initialized service so that we can register hooks
  const service = app.service('activity');

  service.hooks(hooks);

  service.schema = model.schema;
};
