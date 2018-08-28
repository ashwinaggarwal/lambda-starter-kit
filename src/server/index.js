require('dotenv').config();

require('@babel/register')({ /* eslint import/no-extraneous-dependencies:0 */
  cache: false,
  extensions: ['.js']
});

require('./main');
