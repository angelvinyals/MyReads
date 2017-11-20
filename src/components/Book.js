import React from 'react'
import ReadSelector from './ReadSelector'
class Book extends React.Component {  
  constructor(props) {
    super(props);    	      
    this.handleChangeShelf = this.handleChangeShelf.bind(this);    
  } 
  
  BookSelected(value){
    console.log('1')
    this.props.moveTo(value)
  }
  
  handleChangeShelf(shelf){      
    console.log('handleChangeShelf on  book', shelf);
    let book= this.props.book
    console.log("book", book)
    this.props.onChangeShelf(shelf,book)
  }
  
	render() {  
  	let authors
    if (this.props.book.authors){
    	authors= <div className="book-authors">{this.props.book.authors.map((a,i,arr) => <p key={this.props.book.id+i} className="book-authors-list">{a}</p>)}</div>;
    } else {
   		authors= <div className="book-authors"><p key={this.props.book.id} className="book-authors-list">{"anonymous"}</p></div>;
    }
  	let smallThumbnail
    if (this.props.book.imageLinks.smallThumbnail){
      smallThumbnail = this.props.book.imageLinks.smallThumbnail
    } else {
    	smallThumbnail = 'none'
    }
  
  	return (
  		<div className="book">
        <div className="book-top">      			
          <div className="book-cover" 
      			style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})` }}>
		      </div>
          <ReadSelector 
            onChangeShelf={this.handleChangeShelf} 
            shelf={this.props.shelf} 
          />
        </div>
        <div className="book-title">
          {this.props.book.title}
        </div>
		    {authors}            
      </div>	       
    )
  }
}

export default Book