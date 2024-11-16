import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(`

create table "user"
(
    id              varchar constraint user_pk
                    primary key,
    firstname       varchar,
    lastname        varchar,
    email_address   varchar
);

create index user_email_address_index
    on "user" (email_address);
`);
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.raw(`
drop index user_email_address_index;
drop table "user";
`);
}
