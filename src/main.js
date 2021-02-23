import React from 'react';
import ReactDOM from 'react-dom';
import trie from './trie';

const Options = ({options, onSelect}) => (
  <select className="options" onSelect={onSelect}>
    {options.map(option => (
      <option className="option" key={option.key} name={option.name} value={option.value}>
        {option.name}
      </option>
    ))}
  </select>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: []
    };
  }
  render() {
    const {prefix} = this.state;
    const options = trie.nextOptions(prefix).map(option => ({
      name: option,
      key: option,
      value: option,
    }));
    return (
      <div>
        <Options options={options} />
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main')); 