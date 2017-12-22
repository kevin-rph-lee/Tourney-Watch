
exports.up = function(knex, Promise) {
  return knex.schema.table('tournaments', function (table) {
    table.integer('creator_user_id');              
    table.boolean('is_started');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournaments', function(table) {
    table.dropColumns('creator_user_id', 'is_started');
  });
};
