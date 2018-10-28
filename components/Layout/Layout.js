import React, { PropTypes } from 'react';
import cx from 'classnames';
import Header from './Header';
import Navigation from './Navigation';
import s from './Layout.css';

class Layout extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount(){
    
  }

  render() {
    return (
      <div>
        <Header />
        <Navigation />
        <div className="page-body" {...this.props} className={cx(s.content, this.props.className)} />
      </div>
    );
  }
}

export default Layout;
