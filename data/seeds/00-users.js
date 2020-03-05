
const bcrypt = require('bcryptjs')

exports.seed = function(knex) {
  // Deletes ALL existing entries

  // return knex('users').truncate()
  //   .then(function () {

      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'Nick', password: bcrypt.hashSync('pass', 8)},
        {id: 2, username: 'Daniel', password: bcrypt.hashSync('pass', 8)},
        {id:3, username: 'Josiah', password: bcrypt.hashSync('pass', 8)}
      ]);
    // });
};
