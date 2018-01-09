
exports.up = function(knex, Promise) {
  return knex.schema.table('tournaments', function (table) {
    table.decimal('DPS', 8, 2);
    table.decimal('HPS', 8, 2);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournaments', function(table) {
    table.dropColumns('DPS', 'HPS');
  });
};
