//  OpenShift sample Node application
const express = require('express'),
      app     = express(),
      morgan  = require('morgan');
      path = require('path');

Object.assign=require('object-assign')

app.use(morgan('combined'))

const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
      ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.get('/sample_data', (req, res) => {
  const samepleData = {
    username: 'hello world',
    id: '1234',
  };

  res.json(samepleData);
});

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
