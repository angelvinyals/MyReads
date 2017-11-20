import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import ListSearchBooks from  './ListSearchBooks'

//import escapeRegexp from 'escape-string-regexp'
//import sortBy from 'sort-by'
/*
The search page has a text input that may be used to find books. 
As the value of the text input changes, the books that match that 
query are displayed on the page, along with a control that lets you 
add the book to your library. To keep the interface consistent, 
you may consider re-using some of the code you used to display 
the books on the main page.
*/


class SearchBooks extends React.Component {
  constructor(props){
    super(props)
    this.state={
      query: ''
    }
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }   	

	updateQuery(query){
    console.log(query);      	
    this.setState({query: query.trim()})
		if (query.length){
      this.searchBooks(query)
    } else {
    	this.updateBooks('')
    }
  }    

  searchBooks (q,maxResults){
    console.log('entering searchBooks//////////////////////');
    BooksAPI.search(q,maxResults)// calls search on import {search} from '../BooksAPI'. Why is not really using async-await patterns?. 'Search' makes a fetch..
    .then(data=>{
    	console.log('data response : ',data)
    	if(data.length){
   			let updatedBooks = data.map(book =>{
    		  console.log('book searched :',book) 
          let index=this.props.books2.findIndex((b) => b.id===book.id)    				
        
          if (index<0){// there is NOT in  BOOKS2
            book.shelf="none"
            console.log('new book.shelf assigned: ', book.shelf)
            return book

          } else{ //There is YES in BOOKS2
            let shelfForSearch= this.props.books2[index].shelf
            console.log("shelf's value in books2 :",shelfForSearch )
            book.shelf=shelfForSearch
            return book

          }          
        })
        console.log('updatedBooks :', updatedBooks)
        console.log('calling updateBooks method *******')
  		  this.updateBooks(updatedBooks) //call updateBooks method from this component to update this.state.searchBooks with updatedBooks' data
		  } else if (data.error) {
        this.updateBooks('')
      }
    }).catch(function (err){
      console.log('error ',err)
    })     
  }
	
	updateBooks(books){
    console.log('entering updateBooks method......from SEARCHbooks........')
    this.setState({searchBooks: books})
	  //console.log('this.state.searchBooks', this.state.searchBooks)
	}
	
	handleChangeShelf(shelf,book){
    console.log('handleChangeShelf on  SearchBooks', shelf);
    console.log("book on searchBOOKS", book)      
    if (this.state.searchBooks){
    	console.log('threre is books in search tag')
      let newSearchBooks = this.state.searchBooks
      let index = newSearchBooks.findIndex((b) => b.id===book.id)
      console.log('book index in searchBooks', index)  
      newSearchBooks[index].shelf = shelf //execute the manipulations
      console.log('new Shelf', shelf)
      console.log('.-.-.-.-.-.-.-.UPDATING BOOKAPI SEARCHBOOKS.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-')
    	BooksAPI.update(book,shelf)//updating books API
      console.log('.-.-.-.-.-.-.-.UPDATING searchBooks STATE.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-')
      this.setState({searchBooks: newSearchBooks});  //set the new state
      console.log("SEARCHBOOKS state.newSearchBooks UPDATED ") 
    }
    this.props.onChangeShelf(shelf,book)    
  }	

	render() {      
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES searchby title or author. 
              So, don't worry if you don't find a specific author or title.
              Every search is limited by search terms.                              
            */}          			
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
					   {console.log('updating ListBoks....on render Searchbook')}
					   {console.log(this.state.searchBooks)}
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