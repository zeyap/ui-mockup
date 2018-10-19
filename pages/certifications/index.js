import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import StandardsListView from '../../components/ListView/StandardsListView';
import constants from '../../core/constants';
import {getCertificationCompliance} from '../../utils/open-control-utils.js';

class AppsPage extends React.Component {

  state = { apps: [] };

  componentDidMount() {
    document.title = 'Security Central | Certifications';
  }

  componentWillMount() {
    this.getApps();
  }

  // Data stored in json/standards.json, which is defined in
  // core/constants.js
  getApps() {
    let that = this;
    fetch(constants.get_certifications_url).then(r =>r.json())
    .then(certifications=>{
      return getCertificationCompliance(certifications);
    })
    .then(certifications => {
      //collect all standards among certifications
      //get compliance
      //put back to certifications
      that.setState({apps : certifications})
    })
      // .catch(e => console.log("ERROR: Something went wrong opening standards definition"));
  }

  render() {
    // The HTML is rendered from components/ListView/StandardsListView.js
    return (
      <Layout className="container-fluid container-pf-nav-pf-vertical">
        <StandardsListView apps={ this.state.apps }/>
      </Layout>
    );
  }

}

export default AppsPage;
