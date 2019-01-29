import React, { Component } from 'react'
import superagent from 'superagent'
import './search-form.css'


class RedditSearchForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchName: '',
      page: 0,
      errorClass: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault();
    const url = `https://www.reddit.com/r/${this.state.searchFormBoard}.json?limit=${this.state.searchFormLimit}`;
    console.log(url);
    superagent.get(url)
    .then(res => {
        this.setState({errorClass: ''})
        let results = res.body.data.children.map(topic => {
          return {
            url: topic.data.url,
            title: topic.data.title,
            ups: topic.data.ups
          }
        });
        this.props.onSearch(results);
    })
    .catch(error => {
        console.error(error);
        this.setState({errorClass: 'search-error'})
    })
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="star-wars-search">
        <form className={this.state.errorClass} onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="searchFormBoard"
            value={this.state.searchFormBoard}
            onChange={this.handleChange}/>
          <input
            type="number"
            name="searchFormLimit"
            min="0"
            max="100"
            value={this.state.searchFormLimit}
            onChange={this.handleChange}/>

          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default RedditSearchForm
