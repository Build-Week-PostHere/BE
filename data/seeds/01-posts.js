
exports.seed = function(knex) {
  // Deletes ALL existing entries

  // return knex('posts').truncate()
  //   .then(function () {

      // Inserts seed entries
      return knex('posts').insert([
        {id: 1, post_title: 'first post - Nick', post_sub_reddit: 'x', post_text: 'this is the first post', user_id: 1},
        {id: 2, post_title: 'second post', post_sub_reddit: 'y', post_text: 'this is the second post', user_id: 1},
        {id: 3, post_title: 'first post - Dan', post_sub_reddit: 'z', post_text: 'this is the Dans first post', user_id: 2}
      ]);
    // });
};
