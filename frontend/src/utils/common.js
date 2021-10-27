function capitalize(string) {
  let sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    if (sentence[i][0] === undefined) continue;
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

function capitalizeFirstLetter(sentence) {
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

export { 
  capitalize,
  capitalizeFirstLetter,
};