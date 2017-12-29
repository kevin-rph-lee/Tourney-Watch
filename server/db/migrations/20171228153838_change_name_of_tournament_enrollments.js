
exports.up = function(knex, Promise) {
  return knex.schema.renameTable('tournament_enrollments', 'enrollments') 
};

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('enrollments', 'tournament_enrollments')
};
