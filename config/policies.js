/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */


module.exports.policies = {
  TodosController: {
    '*': 'isAuthenticated',

    // Allow anyone to access the login action, even if they're not logged in.
    // 'login': true
  }
};
