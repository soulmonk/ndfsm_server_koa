'use strict';

class RestBase {
  constructor(/*model*/) {
    // this.model = model;
  }

  // abstract
  get model () {
    throw new Error('Abstract');
  }

  async list(ctx) {
    ctx.res.success(await this.model.find({}, '-__v'));
  }

  async get(ctx) {
    const model = await this.model.findOne({_id: ctx.params.id}, '-__v');
    if (!model) {
      return ctx.res.notFound();
    }
    ctx.res.success(model);
  }

  async update(ctx) {
    const model = await this.model.findOne({_id: ctx.params.id}, '-__v');
    if (!model) {
      return ctx.res.notFound();
    }
    // todo required fields
    model.set(ctx.request.body);
    await model.save();
    ctx.res.success(model);
  }

  async create(ctx) {
    const body = ctx.request.body;
    // todo required fields
    const model = await this.model.create(body);

    ctx.res.created(model);
  }

  async delete(ctx) {
    ctx.res.notImplemented();
  }
}

module.exports = RestBase;
