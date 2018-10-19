import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import StandardsListView from '../../components/ListView/StandardsListView';
import constants from '../../core/constants';
import {addStandardsControlFamilies, getStandardsComplianceData} from '../../utils/open-control-utils.js';

class AppsPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { apps: [] };
    this.apps = []; 
  }

  componentDidMount() {
    document.title = 'Security Central | Standards';
  }

  componentWillMount() {
    this.getApps();
  }

  // Data stored in json/standards.json, which is defined in
  // core/constants.js
  getApps = ()=> {
    let that = this;
    fetch(constants.get_standards_url).then(r => r.json())
      .then(standards => {
        return addStandardsControlFamilies(standards);
      })
      .then(standards=>{
        return getStandardsComplianceData(standards);
      })
      .then((result)=>{
        // console.log('result',result)
        this.apps = result;
        that.setState({apps : this.apps});
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
