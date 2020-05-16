/**
 * TodosController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  markAsDone: async(req, res) => {
    let todo = await Todos.updateOne({id: req.param('id')}).set({status: "done"})
    return res.ok(todo)
  },
  unDone: async(req, res) => {
    let todo = await Todos.updateOne({id: req.param('id')}).set({status: "active"})
    return res.ok(todo)
  }

};

