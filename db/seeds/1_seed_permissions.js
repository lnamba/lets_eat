
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {permission_type: 'admin'},
        {permission_type: 'user'},
        {permission_type: 'superuser'}
      ]);
    });
};
