//CREATE USER TABLE TO DB
export const createUserTable = async (db) => {
    if(db.run){
        return new Promise((resolve, reject) => {
            const query = `
                CREATE TABLE IF NOT EXISTS users(
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    username VARCAR(255) UNIQUE NOT NULL,
                    name VARCAR(500) NULL,
                    password TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP                    
                );
            `;
            db.run(
                query,
                (err) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve();
                    }
                }
            )
        })
    }
}