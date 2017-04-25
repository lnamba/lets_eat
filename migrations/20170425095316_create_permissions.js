
exports.up = function(knex, Promise) {
  return knex.schema.createTable('permissions', function(table) {
    table.increments();
    table.string('permission_type');
    table.integer('user_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('permissions');
};
