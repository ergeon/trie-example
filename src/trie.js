// Import trie library
const Trie = require('@datastructures-js/trie');

// Define valid configurations
const availableConfigs = [
  'type=nailup,post=lumberpost,lattice=nolattice,picket=dogear,size=large',
  'type=nailup,post=lumberpost,lattice=nolattice,picket=dogear,size=short',
  'type=nailup,post=lumberpost,lattice=nolattice,picket=flattop,size=large',
  'type=nailup,post=metalpost,lattice=nolattice,picket=flattop,size=short',
  'type=nailup,post=metalpost,lattice=nolattice,picket=flattop,size=large',
  'type=pictureframe,post=lumberpost,lattice=nolattice,picket=flattop,size=large',
  'type=pictureframe,post=lumberpost,lattice=squarelattice,picket=flattop,size=large',
  'type=pictureframe,post=lumberpost,lattice=squarelattice,picket=flattop,size=short',
];
// Attribute Order
const attributeOrder = ['type', 'post', 'lattice', 'picket', 'size'];

const trie = new Trie();

// Load all configurtations
const init = () => availableConfigs.forEach(config => trie.insert(config.split(',')));
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