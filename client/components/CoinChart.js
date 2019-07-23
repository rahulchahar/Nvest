import React from 'react';
import StreamingDemo from './DynChart';

class CoinChart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			data:null
		}
	}
	componentDidMount(){
	let path= ((window.location.pathname).split("/"))[2];
	this.setState({
		data: path
	});
	}
	render(){return(<div className="chart"><StreamingDemo coin={this.state.data}/></div>)}}

export default CoinChart;
