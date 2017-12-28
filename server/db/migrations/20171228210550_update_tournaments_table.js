
exports.up = function(knex, Promise) {
  return knex.schema.table('tournaments', function (table) {
    table.string('twitch_channel');              
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('tournaments', function(table) {
    table.dropColumns('twitch_channel');
  });
};
