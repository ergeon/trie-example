// Import trie library
const Trie = require('@ergeon/trie');

// Define valid configurations
const availableCars = [
  'type=base,color=black,wheels=19s,seats=gray',
  'type=base,color=black,wheels=19s,seats=white',
  'type=base,color=black,wheels=19,seats=white',
  'type=base,color=blue,wheels=19s,seats=white',
  'type=base,color=blue,wheels=19,seats=white',
  'type=base,color=red,wheels=19,seats=white',
  'type=coupe,color=white,wheels=21t,seats=black',
  'type=coupe,color=white,wheels=21ts,seats=red',
];
// Attribute Order
const attributeOrder = ['type', 'color', 'wheel', 'seats'];

const trie = new Trie();

// Load all configurtations
const init = () => availableCars.forEach(car => trie.insert(car.split(',')));
init();

function nextOptions(prefix) {
  const options = trie.getOptions(prefix);
  return options[prefix.length] || [];
}

function findClosestConfig(prefix) {
  const options = trie.getOptions(prefix);
  return [
    ...prefix,
    ...options.filter((_, index) => index >= prefix.length).map(option => option[0] || []),
  ].map(option => option.split('=')[1]).join(',');
}

module.exports = {
  nextOptions,
  findClosestConfig,
  attributeOrder,
};