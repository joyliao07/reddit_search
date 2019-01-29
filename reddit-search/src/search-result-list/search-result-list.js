import React, { Component } from 'react'

export default class SearchResultList extends Component {

    render() {
        return (
            <div className="results">
                <ul>
                {this.props.items.map(item => <div><a href={item.url} target="blank"><h2>{item.title}</h2></a><p>Ups: {item.ups}</p></div> )}
                </ul>
            </div>
        )
    }
}
