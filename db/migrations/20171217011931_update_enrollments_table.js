
exports.up = function(knex, Promise) {
  return knex.schema.table('tournament_enrollments', function (table) {
    table.integer('level');              
    table.string('first_role');
    table.integer('first_role_time_played');
    table.string('second_role');
    table.integer('second_role_time_played');
    table.integer('medal_gold');
    table.integer('medal_silver');
    table.integer( 'medal_bronze');
    table.integer('games_won');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournament_enrollments', function(table) {
    table.dropColumns('level', 'first_role', 'first_role_time_played',
    'second_role','second_role_time_played','medal_gold','medal_silver',
    'medal_bronze','games_won');
  });
}
