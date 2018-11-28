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
        ['%', 10, 14, 18, 20, 31, 40, 44, 50, 52, 55, 62, 68, 69, 74, 80, 80, 82],
      ],
      type: 'area'
    };
    var sparklineChart = c3.generate(sparklineChartConfig);


 // Donut configuration 1
 var data  = [[82,18,320,"Satisfied"],[10,90,40,"Partial"],[8,92,35,"Noncompliant"]];

 var donutConfig1 = [];
 for(let i=0;i<3;i++){
  donutConfig1[i] = c3ChartDefaults.getDefaultDonutConfig('A');
  donutConfig1[i].bindto = '#donut-chart-3'+(i+1);
 donutConfig1[i].data = {
   type: "donut",
   columns: [
     ["Satisfied", data[i][0]],
     ["Unsatisfied", data[i][1]],
   ],
   groups: [
     ["used", "available"]
   ],
   order: null
 };
 donutConfig1[i].size = {
   width: 180,
   height: 240
 };

 donutConfig1[i].tooltip = {
   contents: $().pfGetUtilizationDonutTooltipContentsFn('Control')
 };

 c3.generate(donutConfig1[i]);
 $().pfSetDonutChartTitle("#donut-chart-3"+(i+1), data[i][2], data[i][3]);
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
      <h1>Red Hat OpenStack Platform 13</h1>
<div className = {style.content}>

<div className={style['close-box']} style={{width:'100%'}}><div style={{borderBottom:'1px solid #dddddd'}}>
Progress
</div>
      <div id="sparkline-chart-2" className={style['chart-sparkline-size']+" chart-pf-sparkline"}>
</div>
</div>

       <div id={"donut-chart-31"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>
       <div id={"donut-chart-32"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>
       <div id={"donut-chart-33"} className={style['close-box']+" dashboard-donut-chart example-donut-chart-utilization"}></div>

       <div className={style['close-box']+' '+style['dashboard-table']}>
       <div style={{borderBottom:'1px solid #dddddd'}}>Events</div>
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
</div>

  

      </Layout> 
      
    );
  }

}

export default Dashboard;
