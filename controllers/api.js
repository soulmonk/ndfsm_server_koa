'use strict';

async function version(ctx) {
  ctx.res.success({
    v1: 'v1'
  })
}

module.exports = {
  version
};