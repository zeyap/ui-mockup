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
    let homeRoutes = ['/', '/home', '/dashboard'];
    let auditRoutes = ['/discover', '/visualize', '/timeline'];
    let complianceRoutes = ['/standards', '/components', '/certifications', '/pages', '/reports', '/documents'];
    let protectionRoutes = ['/media', '/ids', '/selinux'];
    let codeRoutes = ['/code', '/analysis'];
    let pinRoutes = ['/code', '/analysis'];
    return (
      <div className="nav-pf-vertical">
        <ul className="list-group">
	  <li className={"list-group-item" + (homeRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}>
            <Link to="/dashboard">
              <span className="fa fa-dashboard" data-toggle="tooltip" title="Dashboard"></span>
              <span className="list-group-item-value">Dashboard</span>
            </Link>
          </li>
          <li className={"list-group-item secondary-nav-item-pf" + (auditRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#auditing-secondary">
            <a>
              <span className="fa pficon-screen" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Auditing</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <ul className="list-group">
                <li className={"list-group-item" + (location.pathname == '/discover' ? ' active' : '')}>
                  <Link to="/discover">
                    <span className="list-group-item-value">Discover</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/visualize' ? ' active' : '')}>
                  <Link to="/visualize">
                    <span className="list-group-item-value">Visualize</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/timeline' ? ' active' : '')}>
                  <Link to="/timeline">
                    <span className="list-group-item-value">Timeline</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={"list-group-item secondary-nav-item-pf" + (complianceRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#compliance-secondary">
            <a>
              <span className="fa fa-university" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Compliance</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <ul className="list-group">             
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
          </li>
	  <li className={"list-group-item secondary-nav-item-pf" + (protectionRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#protection-secondary">
            <a>
              <span className="fa fa-shield" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Protection</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <ul className="list-group">
                <li className={"list-group-item" + (location.pathname == '/media' ? ' active' : '')}>
                  <Link to="/media">
                    <span className="list-group-item-value">Media Control</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/ids' ? ' active' : '')}>
                  <Link to="/ids">
                    <span className="list-group-item-value">Instrusion Detection</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/selinux' ? ' active' : '')}>
                  <Link to="/selinux">
                    <span className="list-group-item-value">SELinux Policies</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
	  <li className={"list-group-item secondary-nav-item-pf" + (codeRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#code-secondary">
            <a>
              <span className="fa fa-bug" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Code Analysis</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <ul className="list-group">
                <li className={"list-group-item" + (location.pathname == '/code' ? ' active' : '')}>
                  <Link to="/code">
                    <span className="list-group-item-value">Scan</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/analysis' ? ' active' : '')}>
                  <Link to="/analysis">
                    <span className="list-group-item-value">Analysis</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
	  <li className={"list-group-item secondary-nav-item-pf" + (pinRoutes.indexOf(location.pathname) >= 0 ? ' active' : '')}
              data-target="#pin-secondary">
            <a>
              <span className="fa pficon-topology" data-toggle="tooltip"></span>
              <span className="list-group-item-value">PIN Testing</span>
            </a>
            <div id="-secondary" className="nav-pf-secondary-nav">
              <ul className="list-group">
                <li className={"list-group-item" + (location.pathname == '/' ? ' active' : '')}>
                  <Link to="/media">
                    <span className="list-group-item-value">Scan</span>
                  </Link>
                </li>
                <li className={"list-group-item " + (location.pathname == '/ids' ? ' active' : '')}>
                  <Link to="/ids">
                    <span className="list-group-item-value">Analysis</span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li className={"list-group-item " + (location.pathname == '/comms' ? ' active' : '')}>
            <Link to="/comms">
              <span className="fa fa-envelope" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Communications</span>
            </Link>
          </li>
	  <li className={"list-group-item " + (location.pathname == '/reports' ? ' active' : '')}>
            <Link to="/reports">
     	      <span className="fa fa-pie-chart" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Reports</span>
            </Link>
          </li>
          <li className={"list-group-item " + (location.pathname == '/config' ? ' active' : '')}>
            <Link to="/config">
	      <span className="fa pficon-settings" data-toggle="tooltip"></span>
              <span className="list-group-item-value">Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    );
  }

}

export default Navigation;
