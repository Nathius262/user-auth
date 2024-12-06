import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';

const connectDB = async () => {
    const db_name = process.env.DB_NAME || 'sqlite'
    if(db_name === 'sqlite') {
        return new sqlite3.Database('db.sqlite', (err) =>{
            if(err){
                console.log(err)
            }
        })
    }
}

export default connectDB;