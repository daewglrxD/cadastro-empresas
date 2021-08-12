const bcrypt = require('bcryptjs')

const check = async (password, hash) => {
    try {
        const comparison = await bcrypt.compare(password, hash)
        return comparison
    }catch (e) {
        throw new Error("Error on checking password")
    }
}

const encrypt = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (e) {
        throw new Error("Error on encrypting password")
    }
};

module.exports = { 
    check, 
    encrypt 
};
