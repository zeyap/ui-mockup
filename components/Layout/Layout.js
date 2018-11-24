import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Navigation from './Navigation';
import s from './Layout.css';

class Layout extends React.Component {
  constructor(props){
    super(props);

    let currentUser = sessionStorage.getItem('user');
    // console.log(currentUser)
    if(currentUser){
      this.username = JSON.parse(currentUser).username;
    }else{
      this.logOut();
    }
  }
  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount(){
    
  }

  logOut = ()=>{
    sessionStorage.removeItem('user');
    window.location='/';
  }

  render() {
    return (
      <div>
        <Header username={this.username} logout = {this.logOut}/>
        <Navigation />
        <div className="page-body" {...this.props} className={cx(s.content, this.props.className)} />
      </div>
    );
  }
}

export default Layout;
