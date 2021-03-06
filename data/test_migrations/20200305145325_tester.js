
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments()
        tbl.string('username', 60).unique().notNullable()
        tbl.string('password', 60).notNullable()
    })
    .createTable('posts', tbl => {
        tbl.increments()
        tbl.string('post_title', 60).unique().notNullable()
        tbl.string('post_sub_reddit', 90)
        tbl.string('post_text', 255).notNullable()
        tbl.string('dated', 255).notNullable()
        // foreign key
        tbl.integer('user_id')
          .notNullable()
          .unsigned()
          .references('id')
          .inTable('users')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts')
    .dropTableIfExists('users')
};
