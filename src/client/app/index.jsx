import React from 'react';
import {render} from 'react-dom';

import Header from './Header.jsx';
import Content from './Content.jsx';
import Search from './Search.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      subreddits: []
    }
  }

  addSubs (sub) {
    //console.log('added:',sub);
    if(sub.length > 0 && this.state.subreddits.indexOf(sub) === -1) {
      let newsub = this.state.subreddits.slice();
      newsub.push(sub);
      this.setState({ 
        subreddits: newsub
      })
    }

  }

  removeSubs(index) {
    //console.log(this.state.subreddits)
    let newsub = this.state.subreddits.slice();
    newsub.splice(index,1);
    this.setState({
      subreddits: newsub
    })

  }

  clearSub () {
    if(this.state.subreddits.length !== 0) {
      this.setState({
        subreddits : []
      })
    }
  }

  render () {
    return (
        <div style={{backgroundColor: '#e6f3f7'}}>
          <Header />
          <Search subreddits={this.state.subreddits} addSubs={this.addSubs.bind(this)} clearSub={this.clearSub.bind(this)} removeSubs={this.removeSubs.bind(this)}  />
          <Content subreddits={this.state.subreddits} />
        </div>
      )
  }
}

render(<App/>, document.getElementById('app'));