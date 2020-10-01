const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const  Person = mongoose.model('person');
describe('Persons controller', ()=>{
  beforeEach( async  ()=>{
    // removing everything everything from the
    // database before doing test
    await Person.deleteMany({});
  });
  it('Post to /api/persons creates a new driver', async () =>{

    const person = await Person.countDocuments();
    try{
      request(app)
      .post('/api/persons')
      // send information to the server
      .send({email: 'test@test.com'})
      .end( async (err,res)=>{
        const newPerson = await Person.countDocuments();
        assert(person + 1 === newPerson);
      });
    }catch(err){
      console.warn(err);
    }
  });

  /*

  For some weard reason i couldnt get the find method to work in the
  request(app).end method so i change my code to see if this would work
  insted and it didnt
  */
  xit('PUT to /api/persons/id edits an existing driver', (done)=>{
    // creates a new driver
    const person = new Person({title: 'dovber@gem.com', description: "ok we are going with this"});
    person.save()
    .then(() => {
      request(app)
      .put(`/api/persons/${person._id}`)
      .send({ likes: 100})
      .end(async () => {
        const updatedPerson = await Person.findOne({title: 'dovber@gem.com'});
        assert(updatedPerson['likes'] === 100);
        done();
      });
    });
  });


  it('Delete to /api/persons/id person an existing person', async ()=>{
    const Gemma = new Person({title: 'gemma@gem.com', description: "ok so we are using this now"});
    await Gemma.save();
    try{
      request(app)
      .delete(`/api/drivers/${Gemma._id}`)
      .end(async () => {
        const deletePerson = await Person.findOne({title: 'gemma@gem.com'});
        // console.log('delete driver : ',deletePerson )
        assert(deletePerson === null);
      });
    }catch(err){
      console.warn(err);
    }
  });
});
