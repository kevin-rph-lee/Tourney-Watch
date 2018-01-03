
exports.up = function(knex, Promise) {
  return knex.schema.createTable('highlights', function (table) {
    table.increments('id').primary();
    table.string('url');
    table.string('name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('highlights');
};
