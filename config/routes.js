/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'GET /login': { view: 'pages/login' },
  'POST /login': 'AuthController.loginView',
  'GET /register': { view: 'pages/register' },
  'POST /register': 'AuthController.registerView',
  'GET /users/info': 'UsersController.user',
  'POST /auth/login': 'AuthController.login',
  'POST /auth/register': 'AuthController.register',
  '/auth/logout': 'AuthController.logout',

  'GET /todos': 'TodosController.list',
  'POST /todos': 'TodosController.add',
  'DELETE /todos/:id': 'TodosController.delete',
  'PATCH /todos/:id/done': 'TodosController.markAsdone',
  'PATCH /todos/:id/undone': 'TodosController.unDone',


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
