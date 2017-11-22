import React from 'react'
import Shelf from './Shelf/Shelf.jsx'
import Book from './Book'

class ListSearchBooks extends React.Component {
  constructor(props){
    super(props)
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }  
  	 
  handleChangeShelf(shelf,book){
    console.log('handleChangeShelf on  ListSEARCHBooks', shelf);
    console.log("book on LISTsearchBOOKS", book)
    this.props.onChangeShelf(shelf,book)
  }

  render() {
    return (
      
      <div className="list-books-content">
        <div className="bookshelf">
          <div className="bookshelf-books">
            <ol className="books-grid">
              {this.props.sBooks.map((b) =>   
                <li key={b.id}>                  
                  <Book 
                    book={b} 
                    onChangeShelf={this.handleChangeShelf} 
                    shelf={b.shelf} />
                </li>
                )
              }
            </ol>
          </div>
        </div>        
      </div>
    )
  }
}

export default ListSearchBooks

