import React from 'react';
import Link from '../Link';
import history from '../../core/history';
import PfBreakpoints from './PfBreakpoints';
import PfVerticalNavigation from './PfVerticalNavigation';

class Navigation extends React.Component {

  componentDidMount() {
    // Initialize the vertical navigation
    $().setupVerticalNavigation(true);
  }

  render() {
    let location = history.getCurrentLocation();
    let homeRoutes = ['/', '/home', '/stages'];
    return (
      <div className="nav-pf-vertical">
        <ul className="list-group">
          <li className={"list-group-item secondary-nav-item-pf" + (homeRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#ipsum-secondary">
            <a>
              <span className="fa fa-dashboard" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Overview</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <div className="nav-item-pf-header">
                <a className="secondary-collapse-toggle-pf" data-toggle="collapse-secondary-nav"></a>
                <span>Overview</span>
              </div>
              <ul className="list-group">
                <li className={"list-group-item " + (location.pathname == '/home' || location.pathname == '/' ? ' active' : '')}>
                  <Link to="/home">
                    <span className="list-group-item-value">Projects</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/stages' ? ' active' : '')}>
                  <Link to="/stages">
                    <span className="list-group-item-value">Stages</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={"list-group-item" + (location.pathname == '/standards' ? ' active' : '')}>
            <Link to="/standards">
              <span className="fa fa-university" data-toggle="tooltip" title="Standards"></span>
              <span className="list-group-item-value">Standards</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/certifications' ? ' active' : '')}>
            <Link to="/certifications">
              <span className="fa fa-check-square-o" data-toggle="tooltip" title="Certifications"></span>
              <span className="list-group-item-value">Certifications</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/components' ? ' active' : '')}>
            <Link to="/components">
              <span className="fa fa-puzzle-piece" data-toggle="tooltip" title="Components"></span>
              <span className="list-group-item-value">Components</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/pages' ? ' active' : '')}>
            <Link to="/pages">
              <span className="fa fa-paper-plane" data-toggle="tooltip" title="Pages"></span>
              <span className="list-group-item-value">Pages</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/reports' ? ' active' : '')}>
            <Link to="/reports">
              <span className="fa fa-pie-chart" data-toggle="tooltip" title="Reports"></span>
              <span className="list-group-item-value">Reports</span>
            </Link>
          </li>
          <li className={"list-group-item" + (location.pathname == '/documents' ? ' active' : '')}>
            <Link to="/documents">
              <span className="fa fa-file-text" data-toggle="tooltip" title="Documents"></span>
              <span className="list-group-item-value">Documents</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}

export default Navigation;
