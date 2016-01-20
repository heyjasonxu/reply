var reply = require('reply');

// yes/no question you want to ask
reply.confirm('Are you my friend?', function(err, yes){
  //reply was yes
  if (!err && yes)
    console.log("Sweet, lets go hang out!");
  //reply was no
  else
    console.log("Wow, you just broke my heart");
});



/* 
Example Output

Are you my friend?
 - yes/no: [yes] yes
Sweet, lets go hang out!

Are you my friend?
 - yes/no: [yes] no
Wow, you just broke my heart
*/