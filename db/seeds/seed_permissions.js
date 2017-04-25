
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('permissions').del()
    .then(function () {
      // Inserts seed entries
      return knex('permissions').insert([
        {id: 1, permission_type: 'admin', user_id: 2},
        {id: 2, permission_type: 'user', user_id: 1},
        {id: 3, permission_type: 'user', user_id: 3}
      ]);
    });
};
