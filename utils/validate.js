const dns = require('dns');
require('express');
const validate = (hostname, orig_url) => {
   return new Promise ((resolve, reject) => { 


dns.lookup(hostname, (err, address, family) => {
    console.log(orig_url);
      if (err) {
        console.error(err);
        resolve(false);
      }else {
          console.log(hostname);
          console.log("ip_address = ", address);
        resolve(true);
      }
     });
    })  

};
module.exports = validate;