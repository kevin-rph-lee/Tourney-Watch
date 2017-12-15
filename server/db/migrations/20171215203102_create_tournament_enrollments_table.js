
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournament_enrollments', function (table) {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('team_id');
    table.integer('tournament_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournament_enrollments');

};
