
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tournaments', function (table) {
    table.increments('id').primary();
    table.string('description');
    table.integer('no_of_teams');
    table.string('name');
    table.boolean('is_ready');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tournaments');
};
