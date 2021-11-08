const { Sequelize } = require('sequelize');

let sequelize = null;
if (sequelize == null) {
    sequelize = new Sequelize('sqlite:database.sqlite3');
}

(async () => await sequelize.sync())();
// sequelize.sync();

module.exports = sequelize;