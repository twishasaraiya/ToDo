create table users(
    -> id int not null auto_increment,
    -> username varchar(100) not null,
    -> password varchar(100) not null,
    -> created_date date,
    -> primary key(id)
    -> );
