import * as BooksAPI from './BooksAPI'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends React.Component{
    static propTypes = {
        moveTo:PropTypes.func.isRequired,
        livroEstante:PropTypes.array
      }

      state={
        query:'',
        searchLoading:false,
        resultado:[]
      }
      componentDidMount(){
      }
      updateQuery=(query)=>{
        this.setState({ query : query })
        this.search(query.trim())
      }

      returnShelf=(id)=>{
        let shelf = "none";
        this.props.livroEstante.map((bookEstante)=>{
          if(bookEstante.id == id){
            shelf = bookEstante.shelf;
          }
        })
        return shelf;
      }

      search=(query,maxResults)=>{
        this.setState({
          searchLoading:true
        })
        BooksAPI.search(query).then(results=>{
          this.setState({
            searchLoading:false,
            resultado:results
          })
        })
      }
      render(){
        let results
        let shelfActual = "none";
        console.log(typeof this.state.resultado);
        console.log("ESTANTE"+this.props.livroEstante);
        if( Object.prototype.toString.call( this.state.resultado ) === '[object Array]' ) {
          results=this.state.resultado.map((book)=>{
            shelfActual = this.returnShelf(book.id);
            if(typeof(book.imageLinks) == 'undefined'){
              book.imageLinks = {};
              book.imageLinks.thumbnail = 'http://3.bp.blogspot.com/-s3yBaPBn8Hc/Uh4-wAZOQLI/AAAAAAAAJT8/GY9d_VJFm3o/s1600/play-books-no-cover.jpg';
            }
            
            return(
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    {(Object.prototype.toString.call( this.state.resultado ) === '[object Object]')?`No results`:''}
                    <div className="book-shelf-changer">
                      <select onChange={(e)=>{this.props.moveTo(book,e.target.value);}} defaultValue={shelfActual}>
                        <option value="" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors&&book.authors.map((author)=>{
                      return(
                        <span key={author} className="author-name"> {author}</span>
                      )
                    })}
                  </div>
                </div>
              </li>
            )
          })
        }
        return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" 
                  value={this.state.query} 
                  onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              {this.searchLoading && <div className="loader">Loading search results...</div>}<br/>
              <div className="loader">{(Object.prototype.toString.call( this.state.resultado ) === '[object Array]')?`Showing ${results.length} results`:''}<br/><br/></div>
              <div className="loader">{(Object.prototype.toString.call( this.state.resultado ) === '[object Object]')?`No results`:''}<br/><br/></div>
              <ol className="books-grid">
                {results}
              </ol>
            </div>
          </div>
        )
      }
    }
export default SearchBooks