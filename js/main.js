console.log(
  "whoa, you checked the console. copy paste the following code and press enter: console.log(ehehe())"
);

let eheheNum = 0;

const ehehe = () => {
  if (eheheNum < 10) {
    eheheNum++;
    return eheheNum + ": do it again";
  } else if (eheheNum == 10) {
    return '10: seems you\'re committed to this. let\'s spice it up a bit. you know what to do: console.log(UPGRADE())';
  } else {
    return eheheNum + ': well, what are you waiting for?';
  }
};
