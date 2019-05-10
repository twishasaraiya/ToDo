create table todoList(
   id int not null auto_increment,
   text text not null,
   complete int default 0 not null,
   user_id int references users(id),
   created_date date not null,
   color varchar(10) default '#fff',
   primary key(id)
    -> );
