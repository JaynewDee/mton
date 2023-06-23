const { Model, DataTypes} = require('sequelize');

const sequelize = require('./connection');

class User extends Model {}
class Group extends Model {}
class Membership extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
    }, 
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'user'
    }
)

Group.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, 
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'group'
    }
)

Membership.init(
    { 
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true, 
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            references: {
                model: User,
                key: 'id',
                unique: false
            }
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            references: {
                model: Group,
                key: 'id',
                unique: false
            }
        },
        is_admin: {
            type: DataTypes.BOOLEAN,            
            allowNull: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'membership'
    }
)

User.belongsToMany(Group, {
    through: {
        model: Membership,
        unique: false
    },
    foreignKey: 'user_id',
    as: 'memberships'
})

Group.belongsToMany(User, {
    through: {
        model: Membership,
        unique: false
    },
    foreignKey: 'group_id',
    as: 'members'
})


module.exports = {
    User,
    Group,
    Membership
}