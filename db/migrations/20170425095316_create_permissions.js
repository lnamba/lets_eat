
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', function(table) {
    table.increments();
    table.string('permission_type');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
