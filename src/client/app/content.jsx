import React from 'react';
import axios from 'axios';

import ContentItem from './ContentItem.jsx';

class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subreddits: this.props.subreddits.slice(),
      data: null
    }
  }

  fetchData(subs) {
    let context = this;
    let subreddits = subs.join('+');
    
    let url = 'https://www.reddit.com/r/' + subreddits + '/hot.json';
    if(subreddits.length === 0) {
      url = 'https://www.reddit.com' + '/hot.json';
    }
    //console.log(url);
    axios.get(url).then(function(results) {
      //console.log(results.data.data.children);
      context.setState({data:results.data.data.children});
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  loadMore() {
    let context = this;
    let subreddits = this.props.subreddits.join('+');
    let lastpost = this.state.data[this.state.data.length-1].data.name;
    let url = 'https://www.reddit.com/r/' + subreddits + '/hot.json?after=' + lastpost;
    if(subreddits.length === 0) {
      url = 'https://www.reddit.com' + '/hot.json?after=' + lastpost;
    }
    //console.log('loadmore',url);
    axios.get(url).then(function(results) {
      //console.log(results.data.data.children);
      let newdata = context.state.data.slice().concat(results.data.data.children);
      context.setState({data:newdata});
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.fetchData(this.props.subreddits);
  }
  componentWillReceiveProps(nextprops) {
    this.setState({data:null});
    this.setState({subreddits: nextprops.subreddits.slice()});
    this.fetchData(nextprops.subreddits);
  }


  render() {
    const buttonStyle = {
      padding: '20px',
      'textAlign': 'center',
      'borderStyle': 'solid',
      'borderWidth': '1px'
    }
    if(this.state.data !== null) {
      return (
        <div>
          {
            this.state.data.map((item) => {
              return (
                <ContentItem key={item.data.id} data={item.data} />
              )
            })
          }
          <div onClick={this.loadMore.bind(this)} style={buttonStyle}>Load More</div>
        </div>
        )
    }

    return (
      <div>
        <div>Content Loading</div>
      </div>
    );
  }

}

export default Content;
