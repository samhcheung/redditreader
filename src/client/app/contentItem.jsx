import React from 'react';

class ContentItem extends React.Component {



  constructor(props) {
    super(props);
  }


  render() {
    const contentBox = {
      paddingLeft: '20px',
      paddingRight: '20px',
      margin: '0px',
      backgroundColor: '#d3d3d3'
    }
    const defaulticon = 'http://icons.iconarchive.com/icons/fasticon/web-2/128/Reddit-icon.png';
    const date = new Date(this.props.data.created_utc*1000);
    function timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
      <div style={contentBox} className="media">
        <a className="media-left" href={this.props.data.url}>
          <img style={{maxWidth: '75px', height:'auto'}} className="media-object" src={this.props.data.thumbnail.indexOf('http') !== -1 ? this.props.data.thumbnail : defaulticon}></img>
        </a>
        
        <div className="media-middle media-body">
          <a style={{fontSize:'18px'}} href={this.props.data.url}>{this.props.data.title}</a>
          <div>submitted {timeSince(date)} ago by {this.props.data.author} in /r/{this.props.data.subreddit}</div>
          <a style={{fontWeight: 'bold'}} href={'https://www.reddit.com'+this.props.data.permalink}>{this.props.data.ups} comments</a>
        </div>
      </div>
    );
  }

}

export default ContentItem;
