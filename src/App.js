import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books:[],
    loading:false
  }
  getAllBooks=()=>{
    this.setState({
      loading:true
    })
    BooksAPI.getAll().then((books)=>{
      this.setState({
        books,
        loading:false
      })
    })
  }
  componentDidMount(){
    this.getAllBooks()
  }
  moveTo=(book,shelf)=>{
    BooksAPI.update(book,shelf).then(()=>{
      this.getAllBooks()
    })
  }

  render() {
    console.log(`BOOKS =${this.state.books}`)
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            loadState={this.state.loading}
            moveTo={this.moveTo}
          />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks 
            search={this.search}
            searchLoading={this.state.searchLoading}
            moveTo={this.moveTo}
            livroEstante={this.state.books}
          />
        )}/>
        
      </div>
    )
  }
}

export default BooksApp
