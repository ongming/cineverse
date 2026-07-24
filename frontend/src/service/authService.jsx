import {users} from "../data/users.js";

function login(email, password) {
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        return user;
    }
    return null;
    
}

export default login;