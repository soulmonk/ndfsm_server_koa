function authenticated(levels = []) {
  return (ctx, next) => {
    if (ctx.state.user) {
      if (levels.length) {
        // TODO check user level
      }
      return next();
    }
    ctx.res.forbidden();
  }
}

module.exports = {
  authenticated
};
