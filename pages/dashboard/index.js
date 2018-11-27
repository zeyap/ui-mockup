import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import ProjectListView from '../../components/ListView/ProjectListView';
import constants from '../../core/constants';
import style from './dashboardstyle.css'

class Dashboard extends React.Component {

  state = { projects: [] };

  componentDidMount() {
    document.title = 'Security Central | Dashboard';
    var c3ChartDefaults = $().c3ChartDefaults();

  
    // Sparkline Chart 
    var c3ChartDefaults = $().c3ChartDefaults();
    var sparklineChartConfig = c3ChartDefaults.getDefaultSparklineConfig();
    sparklineChartConfig.bindto = '#sparkline-chart-2';
    sparklineChartConfig.size = {
      height: 200
      // width: 100%
    };
    sparklineChartConfig.data = {
      columns: [
        ['%', 10, 14, 12, 20, 31, 27, 44, 36, 52, 55, 62, 68, 69, 88, 74, 88, 91],
      ],
      type: 'area'
    };
    var sparklineChart = c3.generate(sparklineChartConfig);


 // Donut configuration 1
 var donutConfig1 = [];
 for(let i=0;i<3;i++){
  donutConfig1[i] = c3ChartDefaults.getDefaultDonutConfig('A');
  donutConfig1[i].bindto = '#donut-chart-3'+(i+1);
 donutConfig1[i].data = {
   type: "donut",
   columns: [
     ["Satisfied", 3],
     ["Unsatisfied", 97],
   ],
   groups: [
     ["used", "available"]
   ],
   order: null
 };
 donutConfig1[i].size = {
   width: 180,
   height: 180
 };

 donutConfig1[i].tooltip = {
   contents: $().pfGetUtilizationDonutTooltipContentsFn('Control')
 };

 c3.generate(donutConfig1[i]);
 $().pfSetDonutChartTitle("#donut-chart-3"+(i+1), "3", "Control Satisfied");
 }
 

 

 jQuery(document).ready(function() {
  jQuery('[data-toggle="tooltip"]').tooltip();
});

}


//
  componentWillMount() {
    this.getProjects();
  }

  getProjects() {
    let that = this;
    fetch(constants.get_projects_url).then(r => r.json())
      .then(data => {
        that.setState({projects : data})
      })
      .catch(e => console.log("Booo"));
  }

  render() {
    return (
      
      <Layout className="container-fluid container-pf-nav-pf-vertical">

<div className = {style.content}>

<div className={style['close-box']} style={{width:'100%'}}><div style={{borderBottom:'1px solid #dddddd'}}>
</div>
      <div id="sparkline-chart-2" className={style['chart-sparkline-size']+" chart-pf-sparkline"}>
</div>
</div>

       <div id={"donut-chart-31"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>
       <div id={"donut-chart-32"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>
       <div id={"donut-chart-33"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>

       <div className={style['close-box']+' '+style['dashboard-table']}>
       <div style={{borderBottom:'1px solid #dddddd'}}>Red Hat OpenStack Platform 13</div>
       <table className="table table-striped table-bordered table-hover" id="table1">
  <thead>
    <tr>
      <th>ControlName</th>
      <th>CoveredBy</th>
      <th>Narrative</th>
      <th colSpan="2">Status</th>
    </tr>
    
  </thead>
  <tbody>
  <tr>
      <td>AC-1</td>
      <td>NIST-800-53</td>
      <td>N/A</td>
      <td colSpan="2"> not applicable</td>
    </tr>
  </tbody>
  <tbody>
  <tr>
      <td>AC-2 (1)</td>
      <td>NIST-800-53</td>
      <td>N/A</td>
      <td colSpan="2"> planned</td>
    </tr>
  </tbody>
  <tbody>
  <tr>
      <td>AC-3</td>
      <td>NIST-800-53</td>
      <td>The OpenStack Identity service</td>
      <td colSpan="2"> complete</td>
    </tr>
  </tbody>
</table>
       </div>

       <div className="progress">
  <div className="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{"width": '25%'}} data-toggle="tooltip" title="25% Used">
    <span className="sr-only">25% Used</span>
  </div>
  <div className="progress-bar progress-bar-remaining" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": "75%"}} data-toggle="tooltip" title="75% Available">
    <span className="sr-only">75% Available</span>
  </div>
</div>
</div>

  

      </Layout> 
      
    );
  }

}

export default Dashboard;
