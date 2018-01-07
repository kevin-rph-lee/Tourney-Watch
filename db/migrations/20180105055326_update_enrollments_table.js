
exports.up = function(knex, Promise) {
  return knex.schema.table('enrollments', function(table) {
    table.dropColumns('avatar');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('enrollments', function (table) {
    table.string('avatar');
  });
};
