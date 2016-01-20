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

//example of get function using the opts object
reply.get(opts, function(err, answers) {
  console.log(answers); 
});

/*
  Example output
  
  What is you name?
 - name: Jason
 - username: [Anonymous] jasonxu
 (options are Male, Female, Robot, Rather not say)
 - gender: Nale
 Invalid value. (options are Male, Female, Robot, Rather not say)
 (options are Male, Female, Robot, Rather not say)
 - gender: Male
 Password, please.
 - password: *********
 Where are you now?
 - country: [US] US
 Please enter your ZIP code.
 - zip_code: 987123
 { name: 'Jason',
  username: 'jasonxu',
  gender: 'Male',
  password: 'awoivbwob',
  country: 'US',
  zip_code: 987123 }
  
 */