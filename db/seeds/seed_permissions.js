
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {id: 1, permission_type: 'admin'},
        {id: 2, permission_type: 'user'},
        {id: 3, permission_type: 'user'}
      ]);
    });
};
