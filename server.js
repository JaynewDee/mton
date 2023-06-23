require('dotenv').config();

const { connection, User, Group } = require('./db');

const PORT = process.env.PORT || 3001;

const app = require('express')();

const handlers = {
    sayHello: (_, res) => res.json({ status: 200, message: 'HELLO, FAM!'}),
    getAllUsers: async (_, res) => {
        try {
            const users = await User.findAll(); 
            res.json(users);
        } catch (err) {
            console.error(err);
        }
    },
    getAllMemberships: async (_, res) => {
        try {
            const memberships = await User.findAll({ 
                include: [{ model: Group, as: 'memberships'}]
            });

            res.json(memberships);
        } catch (err) {
            console.error(err);
        }
    },
    getAllGroups: async (_, res) => {
        try {
            const groups = await Group.findAll();
            res.json(groups);
        } catch (err) {
            console.error(err);
        }
    },
    getAllMembers: async (_, res) => {
        try {
            const members = await Group.findAll({ 
                include: [{ model: User, as: 'members' }]
            })
            res.json(members)
        } catch (err) {
            console.error(err)
        } 
    }
}

app.get('/', handlers.sayHello);
app.get('/users', handlers.getAllUsers);
app.get('/users/memberships', handlers.getAllMemberships);
app.get('/groups', handlers.getAllGroups);
app.get('/groups/members', handlers.getAllMembers);

connection.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});