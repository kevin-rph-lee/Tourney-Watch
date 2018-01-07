
exports.up = function(knex, Promise) {
  return knex.schema.table('teams', function (table) {
    table.string('team_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('teams', function(table) {
    table.dropColumns('team_name');
  });
};
