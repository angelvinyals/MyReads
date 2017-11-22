import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks.jsx'
import Title from './components/Title.jsx'
import ListBooks from './components/ListBooks.jsx'
import NoMatch from './components/NoMatch/NoMatch.jsx'
import './App.css'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state={}
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }

  componentDidMount() {
    this.getAllBooks()
      .then(result => this.setState({
          books2: result
        })
      )
    console.log('this.state.books2',this.state.books2)
  }

  getAllBooks() {
    return BooksAPI.getAll()
  }

  ShowSearch(){
    this.setState({showSearchPage: 'true'})
  }

  handleChangeShelf(newShelf,book){
    book.shelf= newShelf
    BooksAPI.update(book,newShelf)
    let newBooks2 = this.state.books2.slice() 
    let index=newBooks2.findIndex((b) => b.id===book.id)
    if (index<0){
      this.setState(prevState => ({
        books2: [...prevState.books2, book]
        })
      )
    }else {
      newBooks2[index].shelf = newShelf 
      this.setState({books2: newBooks2}); 
    }
  }

  render(){
    if (!this.state.books2) {
     return (<div>loading.....</div>)
    }
    return (
      <div className="app">
        <Switch>
          <Route path="/search"
            render={ ()=>(
              <SearchBooks
                books2={this.state.books2}
                onChangeShelf={this.handleChangeShelf}
              />
            )}
          />
          <Route exact path="/"
            render={ ()=>(
              <div className="list-books">
                <Title  styleClass='list-books-title' tag='h1' title='MyReads'/>
                <ListBooks
                  books2={this.state.books2}
                  onChangeShelf={this.handleChangeShelf}
                />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp

