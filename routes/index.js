const Controller = require(`../controllers`);
module.exports = (app)=> {
  app.get(`/api`,Controller.greeting);
  app.get(`/api/persons`,Controller.getAll);
  app.post('/api/persons',Controller.create);
  app.put('/api/persons/:id',Controller.edit);
  app.delete('/api/persons/:id',Controller.delete);
}
