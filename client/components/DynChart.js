import React, { PureComponent } from 'react';
import { Label, LineChart, BarChart, Line, Bar, Brush, CartesianGrid, ReferenceLine,XAxis, YAxis, Tooltip, Highlight } from 'recharts';

const data = [];

const initialState = {
  data,
  barIndex : 'uv',
  left : 0,
  right : 0
};

export default class StreamingDemo extends React.Component {

	constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    setInterval(this.handleChangeData.bind(this), 5000)
  }
  handleChangeData(){  
    var check = null;
    var toBeChanged = true;
    fetch(`https://min-api.cryptocompare.com/data/price?fsym=${this.props.coin}&tsyms=USD`)
      .then(response => response.json())
      .then(currVal => this.setState({ currVal : Object.values(currVal)}));
      this.setState( ( { data : cdata, left = 0 } ) => {
      return { 
        data : cdata.concat( { name : (cdata.length+1)+'', uv : 0} ), 
        animation : true, 
        left : left - 45
        };
    } );
    // insert
    setTimeout( () => {
      if(check != this.state.currVal[0]){
        this.setState( ( { data : cdata } ) => {
        cdata[ cdata.length - 1 ].uv = this.state.currVal[0];
        check = this.state.currVal[0];
        return { data : cdata.slice(-10), animation : true }
      } ); 
      }
      
    }, 1200 );  
  };

  render() {
    const { data, barIndex,animation, left, right } = this.state;
    console.log(this.state.data);
    return (
      <div className="highlight-bar-charts">
      {this.props.coin}
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid stroke='#b7bcfb'/>
            <XAxis dataKey="name" padding={{left: left, right: -300}} tick={true} domain={['dataMin -5', 'dataMax + 5']}/>
            <YAxis type="number" domain={['dataMin - 0.1', 'dataMax + 0.1']} />
            <Tooltip />
            <Line type='zig-zag' dataKey={barIndex}  dot={true} stroke='#ff7300' isAnimationActive={animation} animationEasing={'linear'} animationDuration={0}/>
          </LineChart> 

      </div>
    );
  }
}
