import React from 'react'

class Title extends React.Component {
  	
	render() {
      	const TagName = this.props.tag ; 
    	return (
      		<div className={this.props.styleClass}>
                  <TagName> {this.props.title} </TagName>
            </div>
    	)
  	}
}

export default Title