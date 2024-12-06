export class User{
    constructor(db){
        this.db = db;
    };

    //create new users
    async create(username, name, password) {
        const query = `
            INSERT INTO users (username, name, password) VALUES (?, ?, ?);
        
        `
        if(this.db.run){
           return new Promise((resolve, reject) =>{
            this.db.run(
                query,
                [username, name, password],
                function (err){
                    if(err) reject(err);
                    else resolve(this.lastId);
                }
            )
           });
        }
    }

    //get all users
    async getAll() {
        const query = `
            SELECT id username, name, created_at FROM users;
        
        `;
        if(this.db.all){
           return new Promise((resolve, reject) =>{
            this.db.all(
                query,
                (err, rows) =>{
                    if(err) reject(err);
                    else resolve(rows);
                }
            )
           });
        }
    }

    //get users by Id
    async getById(id) {
        const query = `
            SELECT id username, name, created_at FROM users WHERE id=?;
        
        `;
        if(this.db.get){
           return new Promise((resolve, reject) =>{
            this.db.get(
                query,
                [id],
                (err, row) =>{
                    if(err) reject(err);
                    else resolve(row);
                }
            )
           });
        }
    }

    //get users by Username
    async getByUsername(username) {
        const query = `
            SELECT id username, name, created_at FROM users WHERE username=?;
        
        `;
        if(this.db.get){
           return new Promise((resolve, reject) =>{
            this.db.get(
                query,
                [username],
                (err, row) =>{
                    if(err) reject(err);
                    else resolve(row);
                }
            )
           });
        }
    }

    //get users by Username
    async getByUsernamePassword(username) {
        const query = `
            SELECT id username, name, password, created_at FROM users WHERE username=?;
        
        `;
        if(this.db.get){
           return new Promise((resolve, reject) =>{
            this.db.get(
                query,
                [username],
                (err, row) =>{
                    if(err) reject(err);
                    else resolve(row);
                }
            )
           });
        }
    }
    
    //updated user
    async update(id){
        const query = `
            UPDATE users SET id username, name WHERE id=?;
        
        `;
        if(this.db.run){
           return new Promise((resolve, reject) =>{
            this.db.run(
                query,
                [id],
                function (err){
                    if (err){
                        reject(err);
                    }else{
                        resolve(this.changes);
                    }
                }
            )
           });
        }
    }

    //delete user
    async delete(id){
        const query = `
            DELETE FROM users WHERE id=?;
        
        `;
        if(this.db.run){
           return new Promise((resolve, reject) =>{
            this.db.run(
                query,
                [id],
                (err) => {
                    if (err){
                        reject(err);
                    }else{
                        resolve(this.changes);
                    }
                }
            )
           });
        }
    }
    
};