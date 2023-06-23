const { User, Group, Membership } = require('./models');
const connection = require('./connection');

seedAll();

async function seedAll() {
    await connection.sync({ force: true });

    try {
        await User.bulkCreate(userSeeds());
        await Group.bulkCreate(groupSeeds());
        await createRelationships(); 
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    
    process.exit(0);
}

async function createRelationships() {
    await Membership.create({ user_id: 1, group_id: 1, is_admin: true});
    await Membership.create({ user_id: 2, group_id: 2, is_admin: true});
    await Membership.create({ user_id: 2, group_id: 1, is_admin: false});
    await Membership.create({ user_id: 3, group_id: 3, is_admin: true});
    await Membership.create({ user_id: 3, group_id: 1, is_admin: false});
}

function userSeeds() {
    return [
        {
            username: 'jayd73'
        },
        {
            username: 'melodrama_mama'
        },
        {
            username: 'alcatrazian_wizard'
        }
    ]
} 

function groupSeeds() {
    return [
        {
            name: 'All Welcome'
        },
        {
            name: 'Moms'
        },
        {
            name: 'WizardsOnly'
        }
    ]
}




