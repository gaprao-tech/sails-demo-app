/**
 * Todos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    todo: {type: 'string', required: true},
    status: {type: 'string', isIn: ['done', 'active'], defaultsTo: 'active'},
    username: {type: 'string', required: true} 
  },
};

