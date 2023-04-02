
const devSite = require('../config/dev');
const devSite38 = require('../config/dev2');
const prod78Site = require('../config/prod2_78');
const prod52Site = require('../config/prod2_52');
const test132Site = require('../config/test');
//console.log("env file",process.env.REACT_APP_START_PROJECT);
const _config = {
    development:devSite,
    development38:devSite38,
    production52:prod52Site,
    development78:prod78Site,
    test132:test132Site,
} 

// edit .env to development devSite on develop mode
// edit .env to production52 prod52Site on  productionmode
// edit .env to development78 prod78Site on test modes

export default Object.freeze(Object.assign({}, _config[process.env.REACT_APP_START_PROJECT].default));

 