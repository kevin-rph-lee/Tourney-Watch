
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tournaments').del()
    .then(function () {
      // Inserts seed entries
      return knex('tournaments').insert([
        {
          name: 'Test Tournament',
          description: 'My tournament for testing',
          no_of_teams: 8,
          brackets:
          `{
            "teams": [
                [
                    { name: "1", flag: "in" },
                    { name: "2", flag: "in" },
                ],
                [
                    { name: "3", flag: "in" },
                    { name: "4", flag: "in" },
                ],
                [
                    { name: "5", flag: "in" },
                    { name: "6", flag: "in" }
                ],
                [
                    { name: "7", flag: "in" },
                    { name: "8", flag: "in" },
                ],


            ],

            results: [[[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]],
          }`
        }
      ]);
    });
};
