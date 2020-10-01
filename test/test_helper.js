
const mongoose = require('mongoose');
before((done)=>{
mongoose.connect('mongodb://nick:marsman1@ds113640.mlab.com:13640/practice_test', { useNewUrlParser: true ,useUnifiedTopology: true , useFindAndModify: false });
  mongoose.connection
  .once('open', () => done())
  .on('error', err => {
    console.warn('Warning', err);
  });
});

// beforeEach( done => {
//   const { drivers } = mongoose.connection.collections;
//   drivers.drop().
//   then(() => done() ).
//   catch(() => done() );
// });
