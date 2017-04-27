
exports.up = function(knex, Promise) {
  return knex.schema.createTable('suggestions', function(table) {
    table.increments();
    table.boolean('accept_meal');
    table.text('meal_name');
    table.integer('user_id');
    table.foreign('user_id').references('users.id').onDelete('cascade');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('suggestions');
};
