import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('RESTAURANTS', table => {
        table.increments('restaurant_id').primary()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('name').notNullable()
        table.string('thumbnail')
        table.integer('max_wait_time').notNullable()

        
        // table.string('image').notNullable();
        // table.string('whatsapp').notNullable();
        // table.decimal('latitude').notNullable();
        // table.decimal('longitude').notNullable();
        // table.string('adress').notNullable();
        // table.string('city').notNullable();
        // table.string('uf', 2).notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('RESTAURANTS')
}