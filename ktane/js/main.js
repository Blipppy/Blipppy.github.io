const artyom = new Artyom();

const wiresCommands = [
  {
    smart: true,
    indexes: ['yellow *', 'red *', 'blue *', 'black *', 'white *'],
    action: function (i, wildcard, sentence) {
      const colors = sentence.split(' ');

      switch (colors.length) {
        case 3:
          if (!colors.includes('red')) {
            artyom.say('2');
          } else if (colors[colors.length - 1] === 'white') {
            artyom.say('3');
          } else if (countOccurrences(colors, 'blue') > 1) {
            artyom.say((colors.lastIndexOf('blue') + 1).toString());
          } else {
            artyom.say('3');
          }
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        default:
          artyom.say('try again');
      }
    },
  },
  {
    indexes: ['done'],
    action: function () {
      artyom.emptyCommands();
      artyom.addCommands(moduleCommands);
      artyom.say('ready');
    },
  },
];

const moduleCommands = {
  indexes: ['wire'],
  action: function (i, wildcard) {
    artyom.emptyCommands();
    artyom.addCommands(wiresCommands);
    artyom.say('ready');
  },
};

artyom.addCommands(moduleCommands); // Add the command with addCommands method. Now

function startOneCommandArtyom() {
  artyom.fatality(); // use this to stop any of

  setTimeout(function () {
    // if you use artyom.fatality , wait 250 ms to initialize again.
    artyom
      .initialize({
        lang: 'en-US', // A lot of languages are supported. Read the docs !
        continuous: true, // recognize 1 command and stop listening !
        listen: true, // Start recognizing
        debug: true, // Show everything in the console
        speed: 1, // talk normally
      })
      .then(function () {
        console.log('Ready to work!');
      });
  }, 250);
}

function stopArtyom() {
  artyom.emptyCommands();
  artyom.addCommands(moduleCommands);
  artyom.fatality();
}

// start piracy

countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

var Small = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

var Magnitude = {
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
  octillion: 1000000000000000000000000000,
  nonillion: 1000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000,
};

var a, n, g;

function intFromText(s) {
  a = s.toString().split(/[\s-]+/);
  n = 0;
  g = 0;
  a.forEach(feach);
  return n + g;
}

function feach(w) {
  var x = Small[w];
  if (x != null) {
    g = g + x;
  } else if (w == 'hundred') {
    g = g * 100;
  } else {
    x = Magnitude[w];
    if (x != null) {
      n = n + g * x;
      g = 0;
    } else {
      alert('Unknown number: ' + w);
    }
  }
}
