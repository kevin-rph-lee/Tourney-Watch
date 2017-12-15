
exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary();
    table.integer('tournament_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');

};
