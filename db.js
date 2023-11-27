import postgres from 'postgres'
import { Sequelize, DataTypes } from 'sequelize';

const sql = postgres({
    host: 'localhost',            // Postgres ip address[s] or domain name[s]
    port: 5432,          // Postgres server port[s]
    database: 'films',            // Name of database to connect to
    username: 'postgres',            // Username of database user
    password: '1111',            // Password of database user
})

sql ? console.log("connection") : console.log("not connection")

export default sql