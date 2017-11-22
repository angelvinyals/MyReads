import React from 'react'
import Title from './Title'
import Book from './Book'

class ListBooks extends React.Component {
  constructor(props){
    super(props)
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }  
  	 
  handleChangeShelf(shelf,book){
    this.props.onChangeShelf(shelf,book)
  }

  render() {
    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <Title  styleClass='bookshelf-title' tag='h2' title='currentlyReading'/>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books2
                  .filter((book) => book.shelf==="currentlyReading")
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
          <div className="bookshelf">
          <Title  styleClass='bookshelf-title' tag='h2' title='Want to Read'/>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books2
                  .filter((book) => book.shelf==="wantToRead")
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
          <div className="bookshelf">
            <Title  styleClass='bookshelf-title' tag='h2' title='Read'/>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {this.props.books2
                  .filter((book) => book.shelf==="read")
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
        </div>
      </div>
    )
  }
}

export default ListBooks