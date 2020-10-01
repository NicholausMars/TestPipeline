const Person = require('../models/person');

module.exports ={
  greeting( req, res ){
    res.send({hi:'there'});
  },
  async getAll(req,res, next){
    try{
      const allPerson = await Person.find();
      res.send(allPerson);
    }catch(err){
     // dealing with the crashing of or server
     // goes to the next middle ware on the chain
      next(err);
    }
  },
  async create(req,res, next){
    const personProps = req.body;
    //  console.log(req.body)
    try{
      const newPerson = await Person.create(personProps);
      res.status(201).send(newPerson);
    }catch(err){
     // dealing with the crashing of or server
     // goes to the next middle ware on the chain
      next(err);
    }
  },
  async edit(req, res, next){
    const personId = req.params.id;
    const personProps = req.body;
    //console.log(personProps)
    try{
      /*set if feild does not exit will add on*/
      await Person.findOneAndUpdate({ _id: personId}, personProps);
      const person = await Person.findOne({_id: personId});
      res.status(204);
    }catch(err){
      next(err);
    }
  },
  async delete(req, res, next){
    const personId = req.params.id;
   try{
      const person = await Person.findOneAndDelete({ _id: personId});
      res.status(204);
    }catch(err){
      next(err);
    }
  }
};
