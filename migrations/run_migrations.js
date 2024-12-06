import connectDB from "../config/database.js";
import { createUserTable } from "./001_create_user__table.js";


const runMigraions = async () => {
    try {
        const db = await connectDB();
        await createUserTable(db);
    } catch (error) {
        console.log(`An Error occur runing migration ${error}`)        
    }    
}

runMigraions();