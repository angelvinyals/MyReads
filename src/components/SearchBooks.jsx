import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListSearchBooks from  './ListSearchBooks.jsx'

class SearchBooks extends React.Component {
  constructor(props){
    super(props)
    this.state={
      query: ''
    }
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }   	

	updateQuery(query){
    this.setState({query: query.trim()})
		if (query.length){
      this.searchBooks(query)
    } else {
    	this.updateBooks('')
    }
  }    

  searchBooks (q,maxResults){
    BooksAPI.search(q,maxResults)
    .then(data=>{
      if(data.length){
        let updatedBooks = data.map(book =>{
          let index=this.props.books2.findIndex((b) => b.id===book.id)    				
          if (index<0){
            book.shelf="none"
            return book
          } else{ 
            let shelfForSearch= this.props.books2[index].shelf
            book.shelf=shelfForSearch
            return book
          }          
        })
        this.updateBooks(updatedBooks) 
      } else if (data.error) {
        this.updateBooks('')
      }
    }
    ).catch(function (err){
    })     
  }

  updateBooks(books){
    this.setState({searchBooks: books})
  }

  handleChangeShelf(shelf,book){
    if (this.state.searchBooks){
      let newSearchBooks = this.state.searchBooks
      let index = newSearchBooks.findIndex((b) => b.id===book.id)
      newSearchBooks[index].shelf = shelf //execute the manipulations
      BooksAPI.update(book,shelf)//updating books API
      this.setState({searchBooks: newSearchBooks});  //set the new state
    }
    this.props.onChangeShelf(shelf,book)    
  }

  render() {      
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">          			
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event)=> this.updateQuery(event.target.value)}
              value={this.state.query}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks 
              ? (<ListSearchBooks sBooks={this.state.searchBooks} onChangeShelf={this.handleChangeShelf} />)
              : null
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks