
exports.up = function(knex, Promise) {
  return knex.schema.table('enrollments', function(table) {
    table.dropColumns('first_role', 'second_role', 'first_role_time_played', 'second_role_time_played');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('enrollments', function (table) {
    table.string('first_role');
    table.float('first_role_time_played');
    table.string('second_role');
    table.float('second_role_time_played');
  });
};
