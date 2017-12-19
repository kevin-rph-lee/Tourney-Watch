
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
      // Inserts seed entries
      return knex('teams').insert([
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1},
        {tournament_id: 1}
      ]);
    });
};
