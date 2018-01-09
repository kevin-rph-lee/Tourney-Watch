
exports.up = function(knex, Promise) {
  return knex.schema.table('enrollments', function (table) {
    table.decimal('k_d_ratio', 8, 2);
    table.decimal('elims_per_min', 8, 2);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('enrollments', function(table) {
    table.dropColumns('k_d_ratio', 'elims_per_min');
  });
};
