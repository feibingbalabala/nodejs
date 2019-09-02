const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

suite.add('RefExp#test', function() {
    /o/.test('Hellow World!');
})
.add('String#indexOf', function() {
    'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
    !!'Hello World'.match(/o/);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({'async': true})