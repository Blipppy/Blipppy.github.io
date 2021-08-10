const artyom = new Artyom();

let edgework = {
  serial: '',
};

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
          if (
            countOccurences(colors, 'red') > 1 &&
            parseInt(edgework.serial[edgework.serial.length - 1]) % 2 == 1
          ) {
            artyom.say((colors.lastIndexOf('red') + 1).toString());
          } else if (
            colors[colors.length - 1] == 'yellow' &&
            countOccurences(colors, 'red') == 0
          ) {
            artyom.say('1');
          } else if (countOccurences(colors, 'blue') == 1) {
            artyom.say('1');
          } else if (countOccurences(colors, 'yellow') > 1) {
            artyom.say('4');
          } else {
            artyom.say('2');
          }
          break;
        case 5:
          if (
            colors[colors.length - 1] === 'black' &&
            parseInt(edgework.serial[edgework.serial.length - 1]) % 2 == 1
          ) {
            artyom.say('4');
          } else if (
            countOccurrences(colors, 'red') == 1 &&
            countOccurrences(colors, 'yellow') >= 1
          ) {
            artyom.say('1');
          } else if (countOccurences(colors, 'black') == 0) {
            artyom.say('2');
          } else {
            artyom.say('1');
          }
          break;
        case 6:
          if (
            countOccurrences(colors, 'yellow') == 0 &&
            parseInt(edgework.serial[edgework.serial.length - 1]) % 2 == 1
          ) {
            artyom.say('3');
          } else if (
            countOccurrences(colors, 'yellow') == 1 &&
            countOccurrences(colors, 'white') > 1
          ) {
            artyom.say('4');
          } else if (countOccurrences(colors, 'red') == 0) {
            artyom.say('6');
          } else {
            artyom.say('4');
          }
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
      artyom.addCommands(mainCommands);
      artyom.say('ready');
    },
  },
];

const mainCommands = [
  {
    indexes: ['wire'],
    action: function (i, wildcard) {
      artyom.emptyCommands();
      artyom.addCommands(wiresCommands);
      artyom.say('ready');
    },
  },
  {
    smart: true,
    indexes: ['serial *', 'cereal *'], // https://www.reddit.com/r/TIHI
    action: function (i, wildcard) {
      natoPhonAlph = {
        'alpha': 'A',
        'bravo': 'B',
        'charlie': 'C',
        'delta': 'D',
        'echo': 'E',
        'foxtrot': 'F',
        'golf': 'G',
        'hotel': 'H',
        'india': 'I',
        'juliet': 'J',
        'kilo': 'K',
        'lima': 'L',
        'mike': 'M',
        'november': 'N',
        'oscar': 'O',
        'papa': 'P',
        'quebec': 'Q',
        'romeo': 'R',
        'sierra': 'S',
        'tango': 'T',
        'uniform': 'U',
        'victor': 'V',
        'whiskey': 'W',
        'x-ray': 'X',
        'yankee': 'Y',
        'zulu': 'Z',
      };
      let serial = '';
      let chars = wildcard.split(' ').map((c) => {
        if (c.match(/^\d+$/gi)) {
          return c.split('');
        } else {
          return c;
        }
      });
      chars = chars.flat();
      console.log(chars);
      for (const char of chars) {
        serial += char.match(/\d/)
          ? char
          : natoPhonAlph[char] || intFromText(char);
      }
      edgework.serial = serial;
      let element = document.getElementById('edgework');
      element.innerHTML = `serial: ${edgework.serial}`;
    },
  },
];

artyom.addCommands(mainCommands);

function startOneCommandArtyom() {
  artyom.fatality();

  setTimeout(function () {
    artyom
      .initialize({
        lang: 'en-US',
        continuous: true,
        listen: true,
        debug: true,
        speed: 1,
      })
      .then(function () {
        console.log('Ready to work!');
        artyom.say('started');
      });
  }, 250);
}

function stopArtyom() {
  artyom.emptyCommands();
  artyom.addCommands(mainCommands);
  artyom.say('shutting down');
  artyom.fatality();
}

// <piracy>

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
      console.log('cry about it');
    }
  }
}

// </piracy>
