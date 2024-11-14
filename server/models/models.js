const sequelize =require('../db')
const{DataTypes} = require('sequelize')


const User =sequelize.define('user', {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    email: {type:DataTypes.STRING, unique: true},
    password: {type:DataTypes.STRING},
    FIO: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: 'USER'},
    image_master: {type:DataTypes.STRING, allowNull: true},
    info: {type:DataTypes.STRING, allowNull: true},
    education: {type:DataTypes.STRING, allowNull: true},
    image_certificate: {type:DataTypes.STRING, allowNull: true}
})

const Service =sequelize.define('service', {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_type: {type:DataTypes.INTEGER},
    id_master: {type:DataTypes.INTEGER},
    id_review : {type:DataTypes.INTEGER},
    name: {type:DataTypes.STRING, allowNull: false},
    image_service: {type:DataTypes.STRING, allowNull: true},
    info: {type:DataTypes.STRING, allowNull: true},
    cost: {type:DataTypes.STRING, allowNull: false}
})

const Task =sequelize.define('task', {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_type: {type:DataTypes.INTEGER},
    id_customer: {type:DataTypes.INTEGER},
    name: {type:DataTypes.STRING, allowNull: false},
    info: {type:DataTypes.STRING, allowNull: true},
    image_task: {type:DataTypes.STRING, allowNull: true},
    date: {type:DataTypes.STRING, allowNull: false},
    place: {type:DataTypes.STRING, allowNull: false},
    address: {type:DataTypes.STRING, allowNull: false},
    cost: {type:DataTypes.STRING, allowNull: false}
})

const Review =sequelize.define('review', {
    id: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    id_user: {type:DataTypes.INTEGER},
    id_service: {type:DataTypes.INTEGER},
    rate: {type:DataTypes.INTEGER, allowNull: false},
    text: {type:DataTypes.STRING, allowNull: false}
})