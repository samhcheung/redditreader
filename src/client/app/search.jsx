import React from 'react';

import axios from 'axios';
class Search extends React.Component {



  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  updateInput(event) {
    this.setState({
      input: event.target.value
    })
  }

  checkAddSub() {
    //Check to see if subreddit exists before putting it into the subreddit state array
    let context = this;
    let url = 'https://www.reddit.com/r/' + this.state.input + '/about.json'
    axios.get(url).then(function(results) {
      //console.log(results);
      context.props.addSubs(context.state.input); 
      context.setState({input: ''});
    })
    .catch(function (error) {
        console.log(error);
        context.setState({input: ''});
      });

  }


  render() {
    const searchBox = {
      padding: '20px',
    }
    const searchBar = {
      width: '300px'
    }
    const selectedSubs = {
      margin: '5px'
    }
    return (
      <div style={searchBox}>
        <input style={searchBar} value={this.state.input} onChange={ (event) => { this.updateInput(event) } } placeholder="Type a subreddit and hit add subreddit"></input>
        <div className="btn btn-default" onClick={ this.checkAddSub.bind(this) }>Add Subreddit</div>
        <div className="btn btn-default" onClick={this.props.clearSub}>Clear Subreddits</div>
        <br/>
        <div>{
            this.props.subreddits.map((sub,index) => {
              return (
                <a onClick={ () => {this.props.removeSubs(index)} } style={selectedSubs} className="btn btn-info" key={index}>{sub}</a>
              )
            })
          }</div>
      </div>
    );
  }

}

export default Search;
