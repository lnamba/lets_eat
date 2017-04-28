
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('email');
    table.string('password');
    table.string('name');
    table.text('about');
    table.integer('role').defaultsTo(2);
    table.foreign('role').references('roles.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
