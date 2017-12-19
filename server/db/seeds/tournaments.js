
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tournaments').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournaments').insert([
        {name: 'Test Tournament', description: 'My tournament for testing', no_of_teams: 8}
      ]);
    });
};
