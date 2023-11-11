create table users (
login text unique,
password text,
user_id serial PRIMARY key
);


create table user_words (
id serial primary key,
user_id integer references users(user_id),
word text
)