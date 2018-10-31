import React, { PropTypes } from 'react';
import Dashboard from '../dashboard/index'
import Login from '../login/index'

class HomePage extends React.Component {

  constructor(props){
    super(props);
    this.state = { login: false };
    
  }
  componentDidMount() {
    document.title = 'Security Central | Home';
  }

  componentWillMount() {
    
  }
  
  render() {
    return (this.state.login)?(<Dashboard/>):(<Login/>);
  }

}

export default HomePage;
