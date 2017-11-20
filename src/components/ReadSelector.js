import React from 'react'

class ReadSelector extends React.Component {
  	constructor(props) {
    	super(props);    	      
    	this.handleChange = this.handleChange.bind(this);    
    } 

   handleChange(e) {
     console.log('handleChangeShelf on ReadSelector', e.target.value);
    this.props.onChangeShelf(e.target.value);
    // this.setState({value: e.target.value});
  }

	render() {
      	return (
          	<div className="book-shelf-changer">          		
         		 		<select  
          					value={this.props.shelf}
        					onChange={this.handleChange} 
          				>
          					
          					<option value="currentlyReading">Currently Reading</option>
          					<option value="wantToRead">Want to Read</option>
          					<option value="read">Read</option>
          					<option value="none" >None</option>
          					
          				</select>
          			
          </div>
    	);
    }
}

      /*    
   <option value="none" >None</option>
   
*/



          
    	
export default ReadSelector