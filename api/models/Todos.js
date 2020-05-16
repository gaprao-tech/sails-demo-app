/**
 * Todos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {type: 'string', required: true},
    category: {type: 'string'},
    status: {type: 'string', isIn: ['done', 'active'], defaultsTo: 'active'},
    username: {type: 'string', required: true} 
  },
};

