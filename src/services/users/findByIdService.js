const { findByIdDB } = require("@repository/users");

module.exports = async (id) => {
    const user = await findByIdDB(id);
    if(user == null){
        throw {name:"UserNotFound"}
    }
    return user; 
}