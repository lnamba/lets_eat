
exports.up = function(knex, Promise) {
  return knex.schema.createTable('meals', function(table) {
    table.increments();
    table.string('day');
    table.integer('meal_id');
    table.boolean('accepted_meal');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('meals')
};
