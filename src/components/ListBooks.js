import React from 'react'
import Title from './Title'
import Shelf from './Shelf/Shelf.jsx'
import Book from './Book'


class ListBooks extends React.Component {
  constructor(props){
    super(props)
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }  
  	 
  handleChangeShelf(shelf,book){
    console.log('handleChangeShelf on  ListBooks', shelf);
    console.log("book on LISTBOOKS", book)
    this.props.onChangeShelf(shelf,book)
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          <Shelf
            title="Currently Reading"  
            shelf="currentlyReading"
            books={this.props.books2}
            onChangeShelf={this.handleChangeShelf}
          />
          <Shelf 
            title="Want to Read" 
            shelf="wantToRead"
            books={this.props.books2}
            onChangeShelf={this.handleChangeShelf}
          />
          <Shelf 
            title="Read" 
            shelf="read"
            books={this.props.books2}
            onChangeShelf={this.handleChangeShelf}
          />
        </div>
      </div>
    )
  }
}

export default ListBooks