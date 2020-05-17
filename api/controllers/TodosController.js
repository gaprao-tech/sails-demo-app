/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  _config: {
    shortcuts: false,
    rest: false
  },
  list: async(req, res) => {
    let todos = await Todos.find({username: req.user.username})
    return res.ok(todos)
  },
  add: async(req, res) => {
    let todo = await Todos.create({todo: req.body.todo, username: req.user.username}).fetch()
    return res.ok(todo)
  },
  delete: async(req, res) => {
    let result = await Todos.findOne({id: req.param('id'), username: req.user.username})
    if (result === undefined) {
        return res.status(404).json({error: 'not found'})
    } else if (result.username != req.user.username) {
        return res.status(403).json({error: 'forbidden'})
    }

    let todo = await Todos.destroyOne({id: req.param('id'), username: req.user.username})
    return res.ok(todo)
  },
  markAsDone: async(req, res) => {
    let result = await Todos.findOne({id: req.param('id'), username: req.user.username})
    if (result === undefined) {
        return res.status(404).json({error: 'not found'})
    } else if (result.username != req.user.username) {
        return res.status(403).json({error: 'forbidden'})
    }

    let todo = await Todos.updateOne({id: req.param('id'), username: req.user.username}).set({status: "done"})
    return res.ok(todo)
  },
  unDone: async(req, res) => {
    let result = await Todos.findOne({id: req.param('id'), username: req.user.username})
    if (result === undefined) {
        return res.status(404).json({error: 'not found'})
    } else if (result.username != req.user.username) {
        return res.status(403).json({error: 'forbidden'})
    }

    let todo = await Todos.updateOne({id: req.param('id'), username: req.user.username}).set({status: "active"})
    return res.ok(todo)
  }

};

