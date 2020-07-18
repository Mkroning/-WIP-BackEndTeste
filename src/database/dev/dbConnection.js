import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the database');
});

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KeyboardEvent,
    email VARCHAR(100) UNIQUE NOT NULL, 
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    create_on DATE NOT NULL)`;

  pool.query(userCreateQuery)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

const createNaverTable = () => {
  const naverCreateQuery = `CREATE TABLE IF NOT EXISTS navers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL, 
    admission_date DATE NOT NULL,
    job_role VARCHAR(100) NOT NULL,
    projects INTEGER REFERENCES project(id) ON DELETE CASCADE)`;

    pool.query(naverCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createProjectTable = () => {
  const projectCreateQuery = `CREATE TABLE IF NOT EXISTS project
  (id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL)`;
}

const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool.query(usersDropQuery)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

const dropNaverTable = () => {
  const naverDropQuery = 'DROP TABLE IF EXISTS navers';
  pool.query(naverDropQuery)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

const dropProjectTable = () => {
  const projectsDropQuery = 'DROP TABLE IF EXISTS projects';
  pool.query(projectsDropQuery)
  .then((res) => {
    console.log(res);
    pool.end();
  })
  .catch((err) => {
    console.log(err);
    pool.end();
  });
};

const createAllTables = () => {
  createUserTable();
  createNaverTable();
  createProjectTable();
};

const dropAllTables = () => {
  dropUserTable();
  dropNaverTable();
  dropProjectTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

export {
  createAllTables,
  dropAllTables,
};

require('make-runnable');

