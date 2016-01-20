var reply = require('reply');
 
var opts = {
  name: {
    message : 'What is you name?',
    allow_empty: false // will require an answer 
  },
  username: {
    default : 'Anonymous', // if left empty, will fall back to this value 
    type    : 'string'    // ensure value is not a number 
  },
  gender: {
    options : ['Male', 'Female', 'Robot', 'Rather not say']
  },
  password: {
    message : 'Password, please.',
    type    : 'password',
    regex   : /(\w{6})/,
    error   : 'Six chars minimum. Try again.'
  },
  country: {
    message : 'Where are you now?',
    default : get_country // use the function below to provide a default/fallback answer 
  },
  zip_code: {
    message : 'Please enter your ZIP code.',
    type    : 'number', // reply uses the JS primitives, as returned by `typeof var` 
    depends_on: {
      country: 'US'
    }
  }
}
 
function get_country(answers) {
  // answers contains the values given up to this point. 
  if (answers.username == 'johnsmith')
    return 'US';
  else // we'll simply guess it from the LANG variable 
    return process.env.LANG.split(/_|\./)[1]; 
}
 
reply.get(opts, function(err, answers) {
  console.log(answers); 
  //example output
  /* { name: 'John Smith', 
       username: 'johnsmith',
       gender: 'Male', 
       password: '123abc',
       country: 'US',
       zip_code: 12345 } */
});