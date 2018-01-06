exports.up = function(knex, Promise) {
  return knex.schema.table('enrollments', function (table) {
    table.string('role_summary');              
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('enrollments', function(table) {
    table.dropColumns('role_summary');
  });
};