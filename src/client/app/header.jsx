import React from 'react';

class Header extends React.Component {



  constructor(props) {
    super(props);
  }


  render() {
    const headerStyle = {
      padding: '20px',
      'fontSize' : '20px',

    }
    return (
      <div>
        <div style={headerStyle}>Reddit Reader</div>
      </div>
    );
  }

}

export default Header;
