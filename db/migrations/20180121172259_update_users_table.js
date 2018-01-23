
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function (table) {
    table.boolean('custom-avatar');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumns('custom-avatar');
  });
};
