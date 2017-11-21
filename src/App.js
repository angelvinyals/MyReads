import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './components/SearchBooks'
import Title from './components/Title'
import ListBooks from './components/ListBooks'
import './App.css'

class BooksApp extends React.Component {
  constructor(props){
    super(props)
    this.state={}
    this.handleChangeShelf=this.handleChangeShelf.bind(this)
  }

  componentDidMount() {
    // fetch the project name, once it retrieves resolve the promsie and update the state. 
    this.getAllBooks()
      .then(result => this.setState({
          books2: result
        })
      )
    console.log('this.state.books2',this.state.books2)
  }

  getAllBooks() {
    // call to api logic .
    return BooksAPI.getAll()
  }

  ShowSearch(){
    console.log('click');
    this.setState({showSearchPage: 'true'})
  }

  handleChangeShelf(newShelf,book){
    console.log('handleChangeShelf on  App', newShelf);
    console.log("book on APP", book)
    //book.isInSearch = false // testing if it is necessary
    console.log('book.shelf before change',book.shelf)
    book.shelf= newShelf
    console.log('book.shelf changed. Now :',book.shelf)
    console.log('.-.-.-.-.-.-.-.UPDATING BOOKAPI.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-')
    BooksAPI.update(book,newShelf)//updating books API
    console.log('.-.-.-.-.-.-.-.UPDATING books2 STATE.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-')
    let newBooks2 = this.state.books2.slice() //copy the array in the state books2 that will be changed
    let index=newBooks2.findIndex((b) => b.id===book.id)
    console.log('_____________isInBook2? index= ',index)
    if (index<0){
      console.log("book is NOT in books2")
      this.setState(prevState => ({
        books2: [...prevState.books2, book]// update state.book2 adding book
        })
      )
      console.log('book added to books2', this.state.books2)
      console.log("App state.book2 UPDATED from  book.isInSearch ")
    }else {
      console.log("book is in MAIN page")
      console.log("index in books2 for the book", index)
      newBooks2[index].shelf = newShelf //execute the manipulations
      this.setState({books2: newBooks2});  //set the new state
      console.log("App state.book2 UPDATED from  NOT isInSearch")
    }
  }

  render(){
    if (!this.state.books2) {
      console.log('this.state.books2',this.state.books2)
      return (<div>loading.....</div>)
    }
    return (
      <div className="app">
        {/*<Route path="/search" component={SearchBooks}/>*/}
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
              {console.log('entering ListBooks Component')}
              {console.log('this.state.books2',this.state.books2)}
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
      </div>
    )
  }
}

export default BooksApp

