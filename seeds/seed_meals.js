
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meals').del()
    .then(function () {
      // Inserts seed entries
      return knex('meals').insert([
        {id: 1, day: 'Monday', meal_id: 123, accepted_meal: false},
        {id: 2, day: 'Tuesday', meal_id: 456, accepted_meal: false},
        {id: 3, day: 'Wednesday', meal_id: 789, accepted_meal: false}
      ]);
    });
};
