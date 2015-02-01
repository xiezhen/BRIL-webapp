//
// This is a module for faking data for the OTHER1 detector, for demo purposes.
//
// The 'getData' function creates a structure with two arrays, each with 50 values
// which are drawn from a gaussian, approximated by a Box-Muller transform
//
var mean = 100, sigma = 10; // parameters of the gaussian
var gaussian1 = function(x1,x2,mean,sigma) {
  z = Math.sqrt(-2 * Math.log(x1)) * Math.cos( 2 * Math.PI * x2 );
  return(Math.round(mean + sigma * z));
}
var gaussian2 = function(x1,x2,mean,sigma) {
  z = Math.sqrt(-2 * Math.log(x1)) * Math.sin( 2 * Math.PI * x2 );
  return(Math.round(mean + sigma * z));
}

var getData = function() {
  var i, data = {
// the OTHER1 detectors, unimaginatively named 1 and 2
    OTHER1_1:[],
    OTHER1_2:[]
  };
  for ( i=0; i<25; i++ ) {
    var u1 = Math.random(), u2 = Math.random();
    data.OTHER1_1.push(gaussian1(u1,u2,mean,sigma) * (25+i)/25);
    data.OTHER1_1.push(gaussian2(u1,u2,mean,sigma) * (25+i)/25);
  }
  for ( i=0; i<25; i++ ) {
    var u1 = Math.random(), u2 = Math.random();
    data.OTHER1_2.push(gaussian1(u1,u2,mean+20,sigma) * (50-i)/25);
    data.OTHER1_2.push(gaussian2(u1,u2,mean+20,sigma) * (50-i)/25);
  }
  return(data);
};

module.exports = {
  get: function(request,response) {
    response.writeHead(200,{
        "Content-type":  "application/json",
        "Cache-control": "max-age=0"
      });
    var res = { // fake data generated here...
      data: getData(),
      // runNumber: 1234567,
      timestamp: (new Date).getTime()
    };
    logVerbose(JSON.stringify(res));
    response.end(JSON.stringify(res));
  }
};