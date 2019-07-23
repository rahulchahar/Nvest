import React from 'react';
import { Link } from 'react-router';

const CryptoComp = React.createClass({

  render() {
  	const { post, i, comments } = this.props;
    return (
      <Link to={`/view/${post[0]}`}>
        <div className="single-photo">
          {post[0]},{post[1]}	
        </div>
      </Link>
    )
  }
});

export default CryptoComp;