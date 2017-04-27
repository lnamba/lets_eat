
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('suggestions').del()
    .then(function () {
      // Inserts seed entries
      return knex('suggestions').insert([
        {accept_meal: false, meal_name: 'lasagna', user_id: 1},
        {accept_meal: false, meal_name: 'tacos', user_id: 3}
      ]);
    });
};
