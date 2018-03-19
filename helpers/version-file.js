'use strict';

const path = require('path');
const fs = require('fs');
const {randomString} = require('../libs/utils');

fs.writeFileSync(path.join(__dirname, '..', 'dist', 'version.json'), JSON.stringify({version: randomString(20)}));
