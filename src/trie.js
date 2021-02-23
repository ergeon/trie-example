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

module.exports = {
  nextOptions: function (prefix) {
    const prefixNode = trie.find(prefix)
    console.log(prefix, prefixNode);
    const options = [];
    prefixNode.getChildren().forEach(value => options.push(value.char));
  
    return options;
  },
  findClosestConfig: prefix => trie.findClosestWord(prefix),
  attributeOrder,
};