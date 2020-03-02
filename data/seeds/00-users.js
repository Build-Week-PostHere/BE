
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Nick', password: 'pass'},
        {id: 2, username: 'Daniel', password: 'pass'},
        {id:3, username: 'Josiah', password: 'pass'}
      ]);
    });
};
