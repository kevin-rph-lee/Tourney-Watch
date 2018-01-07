
exports.up = function(knex, Promise) {
  return knex.schema.table('tournaments', function (table) {
    table.string('date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournaments', function(table) {
    table.dropColumns('date');
  });
};
