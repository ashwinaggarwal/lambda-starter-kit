require('dotenv').config();

require('@babel/register')({
  cache: false,
  extensions: ['.js']
});

require('./main');
