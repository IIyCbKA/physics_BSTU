comment on database postgres is 'default administrative connection database';

create table users
(
    user_id    integer     not null
        primary key,
    surname    varchar(63) not null,
    name       varchar(63) not null,
    patronymic varchar(63) not null,
    status     varchar(63) not null
);

alter table users
    owner to admin;

create table groups
(
    group_id   serial
        primary key,
    group_name varchar(15) not null
);

alter table groups
    owner to admin;

create table students
(
    student_id integer not null
        primary key
        references users,
    group_id   integer not null
        references groups
);

alter table students
    owner to admin;

create table employees
(
    employee_id integer not null
        primary key
        references users
);

alter table employees
    owner to admin;

create table tasks
(
    task_id          serial
        primary key,
    task_name        varchar(255) not null,
    task_description varchar,
    additions_id     integer[]
);

alter table tasks
    owner to admin;

create table grades
(
    grade_id   serial
        primary key,
    student_id integer     not null
        references students,
    author_id  integer     not null
        references employees,
    task_id    integer     not null
        references tasks,
    grade      varchar(15) not null,
    unique (student_id, task_id)
);

alter table grades
    owner to admin;

create table works
(
    work_file_id serial
        primary key,
    task_id      integer not null
        references tasks,
    student_id   integer not null
        references students,
    unique (student_id, task_id)
);

alter table works
    owner to admin;

create table files
(
    file_id   serial
        primary key,
    file_name varchar not null,
    file_type varchar not null,
    path      varchar not null,
    unique (file_name, path)
);

alter table files
    owner to admin;

create table additions
(
    addition_id    serial
        primary key,
    addition_title varchar not null,
    addition_type  varchar not null
);

alter table additions
    owner to admin;

create table tasks_groups
(
    task_group_id serial
        primary key,
    task_id       integer not null
        constraint task_id
            references tasks
            on update cascade on delete cascade,
    group_id      integer not null
        constraint group_id
            references groups
            on update cascade on delete cascade
);

alter table tasks_groups
    owner to admin;


