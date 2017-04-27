
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'joe@joe.com', password: 'password1', name: 'Joe', about: 'I like apples.', role: 1},
        {email: 'jane@jane.com', password: 'password2', name:'Jane', about: 'I like french fries.', role: 2},
        {email: 'molly@molly.com', password: 'password3', name: 'Molly', about: 'I like tacos.', role: 2}
      ]);
    });
};
