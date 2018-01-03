
exports.up = function(knex, Promise) {
  return knex.schema.createTable('match_ups', function (table) {
    table.increments('id').primary();
    table.integer('game_id');
    table.integer('team_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('match_ups');

};
