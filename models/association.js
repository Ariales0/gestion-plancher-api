const User = require('./user');
const Broker = require('./broker');
const Thermostat = require('./thermostat');

function initAssociations() {
   User.hasMany(Thermostat, {
       foreignKey: 'user_id',
       as: 'thermostats'
   });

   Broker.hasMany(Thermostat, {
       foreignKey: 'broker_id',
       as: 'thermostats' 
   });

   Thermostat.belongsTo(User, {
       foreignKey: 'user_id',
       as: 'user'
   });

   Thermostat.belongsTo(Broker, {
       foreignKey: 'broker_id',
       as: 'broker'
   });
}

module.exports = { initAssociations };