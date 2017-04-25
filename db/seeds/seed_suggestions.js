
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('suggestions').del()
    .then(function () {
      // Inserts seed entries
      return knex('suggestions').insert([
        {id: 1, accept_meal: false, meal_name: 'lasagna'},
        {id: 2, accept_meal: false, meal_name: 'tacos'},
        {id: 3, accept_meal: false, meal_name: 'grilled cheese'}
      ]);
    });
};
