console.log(
  "whoa, you checked the console. copy paste the following into the console and press enter: console.log(ehehe())"
);

let eheheNum = 0;
let upgradeReq = 10;

const ehehe = () => {
  if (eheheNum < upgradeReq) {
    eheheNum++;
    return eheheNum + ": do it again";
  } else if (eheheNum == upgradeReq) {
    return eheheNum + ': seems you\'re committed to this. let\'s spice it up a bit. you know what to do: console.log(UPGRADE())';
  } else {
    return eheheNum + ': well, what are you waiting for? console.log(UPGRADE())';
  }
}

const UPGRADE = () => {
  // do things
  return 'sorry, this doesnt do anything yet';
}