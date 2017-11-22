import React from 'react'
import Title from '../Title'
import Book from  '../Book'
import './Shelf.css'

class Shelf extends React.Component {	
	constructor(props){
	    super(props)
	    this.handleChangeShelf=this.handleChangeShelf.bind(this)
	} 

	handleChangeShelf(shelf,book){
	    console.log('handleChangeShelf on  Shelf', shelf);
	    console.log("book on SHELF", book)
	    this.props.onChangeShelf(shelf,book)
	}

	render() {
    	return (
    		<div className="bookshelf">
            	<Title  styleClass='bookshelf-title' tag='h2' title={this.props.title}/>
            	<div className="bookshelf-books">
            		<ol className="books-grid">
		                {this.props.books
		                	.filter((book) => book.shelf===this.props.shelf)
		                	.map((b) =>
			                    <li key={b.id}>
			                    	<Book 
										book={b}
										onChangeShelf={this.handleChangeShelf}
										shelf={b.shelf}
				                    />
			                    </li>
							)
		                }
					</ol>
				</div>
			</div>
    	)
  	}
}

export default Shelf