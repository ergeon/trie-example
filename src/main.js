import React from 'react';
import ReactDOM from 'react-dom';
import trie, { attributeOrder } from './trie';

const Options = ({options, onSelect, value}) => (
  <div className="options" onSelect={onSelect}>
    {options.map(option => (
      <label key={option.key} className="option">
        <input
          type="radio"
          name={option.name}
          value={option.value}
          checked={option.key === value}
          onChange={onSelect.bind(this, option.key)}/>
        {option.value}
      </label>
    ))}
  </div>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    const nextOptions = trie.nextOptions([]);
    this.state = {
      prefix: [],
      selectedKey: nextOptions.length ? nextOptions[0] : null,
    };
  }

  onPreviousClick() {
    const {prefix} = this.state;
    const previousPrefix = prefix.slice(0, prefix.length - 1);
    const previousOptions = trie.nextOptions(previousPrefix);
    this.setState({
      prefix: previousPrefix,
      selectedKey: previousOptions.length ? previousOptions[0] : null,
    });
  }

  onNextClick() {
    const {prefix, selectedKey} = this.state;
    const nextPrefix = [...prefix, selectedKey];
    const nextOptions = trie.nextOptions(nextPrefix);
    this.setState({
      prefix: [...prefix, selectedKey],
      selectedKey: nextOptions.length ? nextOptions[0] : null,
    });
  }

  render() {
    const {prefix, selectedKey} = this.state;
    const closestConfig = trie.findClosestConfig(selectedKey ? [...prefix, selectedKey]: prefix);
    const options = trie.nextOptions(prefix).map(option => ({
      name: option.split('=')[0],
      key: option,
      value: option.split('=')[1],
    }));

    return (
      <div className="trie-example">
        <img
          className="preview-image"
          src={`./assets/${closestConfig}.jpeg`} />
        <div className="current-prefix">
          Current prefix: [{prefix.join(',')}]
        </div>
        {prefix.length < attributeOrder.length ? (
          <div className="steps">
            {attributeOrder.map((step, index) => (
              <div className={`step ${index == prefix.length ? 'active' : ''}`} key={`step-${step}`}>
                {step}
              </div>
            ))}
          </div>
        ) : null}
        {options.length ? <Options
          options={options}
          value={selectedKey}
          onSelect={selectedKey => this.setState({selectedKey})}/>: null}
        <div className="actions">
          {prefix.length ? (
            <button
              className="previous-btn"
              onClick={this.onPreviousClick.bind(this)}>
              Previous
            </button>
          ) : null}
          {prefix.length < attributeOrder.length ? (
            <button
              className="next-btn"
              onClick={this.onNextClick.bind(this)}>
              Next
            </button>
          ) : null}
        </div>
      </div>
    );
  }
}


ReactDOM.render(<App />, document.getElementById('main'));