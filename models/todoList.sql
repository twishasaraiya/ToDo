create table todoList(
    -> id int not null auto_increment,
    -> text varchar(500) not null,
    -> complete int default 0 not null,
    -> user_id int references users(id),
    -> created_date date not null,
    -> primary key(id)
    -> );
