import React from 'react'
import './NoMatch.css'

class NoMatch extends React.Component {
	state={
		image: 'http://i.giphy.com/l117HrgEinjIA.gif'
	}
	
	render() {
    	return (
      		<div className="FourOhFour">
				<div className="bg" style={{ backgroundImage: `url(${this.state.image})`}}></div>
				<div className="code">404</div>
			</div>
    	)
  	}
}

export default NoMatch