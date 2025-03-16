var fs = require('fs').promises;
const filePath = 'models/users.json';

async function loadUsers() {
    try {
        let data = await fs.readFile(filePath, 'utf8');
        return data.length > 0 ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error while loading users: ", error);
        return [];
    }
}

async function saveUsers(users) {
    try {
        await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error while saving users: ", error);
    }
}

async function saveUser(req) {
    let users = await loadUsers();
    let user = {
        id: users.length ? users[users.length - 1].id + 1 : 0,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }
    users.push(user);
    await saveUsers(users);
    return user;
}

function getUserForm() {
    let formSubmits = {action: '/register', method: 'POST'};
    let formInputs = [
        {label: 'username', text: 'Username', type: 'text', required: true},
        {label: 'password', text: 'Password', type: 'password', required: true},
        {label: 'email', text: 'E-Mail address', type: 'email', required: true}
    ];
    return { formSubmits, formInputs };
}

const getAllUsersAPI = async (req, res) => {
    let users = await loadUsers();
    res.status(200).json({ "success": true, users });
};

const createUser = async (req, res) => {
    let user = await saveUser(req);
    let form = getUserForm();
    res.render('registration', { title: 'Registration', submit_button: 'Register', formSubmits: form.formSubmits, formInputs: form.formInputs, user });
};

const createUserAPI = async (req, res) => {
    let user = await saveUser(req);
    res.status(201).json({ "success": true, user });
};

const newUser = (req, res) => {
    let form = getUserForm();
    res.render('registration', { title: 'Registration', submit_button: 'Register', formSubmits: form.formSubmits, formInputs: form.formInputs });
};

const readUserAPI = async (req, res) => {
    let users = await loadUsers();
    let user = users.find(u => u.id === parseInt(req.params.userID));
    if (user) {
        res.status(200).json({ "success": true, user });
    } else {
        res.status(404).json({ "success": false, message: "User not found" });
    }
};

const updateUserAPI = async (req, res) => {
    let users = await loadUsers();
    let index = users.findIndex(u => u.id === parseInt(req.params.userID));
    if (index === -1) {
        return createUser(req, res);
    } else {
        if (req.body.username !== undefined) {
            users[index].username = req.body.username;
        }
        if (req.body.password !== undefined) {
            users[index].password = req.body.password;
        }
        if (req.body.email !== undefined) {
            users[index].email = req.body.email;
        }
        await saveUsers(users);
        res.status(200).json({ "success": true, user: users[index] });
    }
};

const deleteUserAPI = async (req, res) => {
    let users = await loadUsers();
    let index = users.findIndex(u => u.id === parseInt(req.params.userID));
    if(index !== -1) {
        users.splice(index, 1);
        await saveUsers(users);
    }
    res.status(200).json({ "success": true });
};

module.exports = {
    getAllUsersAPI,
    createUser,
    createUserAPI,
    newUser,
    readUserAPI,
    updateUserAPI,
    deleteUserAPI
}