import React from 'react';
import CryptoComp from './CryptoComp';
class PhotoGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR,ETH')
      .then(response => response.json())
      .then(data => this.setState({ data : Object.entries(data)}));
  }
  render() {
    return <div className="grid">
    {this.state.data.map((post, i) => <CryptoComp {...this.props} key={i} i={i} post={post}/>)}
  </div>;
  }
}
export default PhotoGrid;
