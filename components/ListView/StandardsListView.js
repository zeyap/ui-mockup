import React, { PropTypes } from 'react';
import StandardTableView from '../TableView/StandardTableView'
import ListViewBase from './ListViewBase'
import ComplianceProgress from './StandardComplianceProgress'
import {getComponent}  from '../../utils/open-control-utils.js';

class StandardsListView extends ListViewBase {

  constructor(props){
    super(props);
    this.state={
      componentCompletedControls:0,
      componentPartialControls:0
    }
  }
  componentDidMount() {
    this.bindExpand();
  }

  componentDidUpdate() {
    this.unbind();
    this.bindExpand();
  }

  componentWillUnmount(){
    this.unbind();
  }

  showComponentDetail = (standardKey, componentUrl,id,compName)=>{
    return ()=>{
      let standardCompliance={
        satisfied:0,
        partial:0
      };
      let comp = {url:componentUrl, name:compName};
      
      getComponent(comp,data=>{
        console.log(comp.name,data)
        standardCompliance=data[standardKey.split(/[\s]+[-]*/).join('-')];

        let tooltip = $('#componentTooltip-'+id);
        this.setState({
          componentCompletedControls:standardCompliance.satisfied,
          componentPartialControls:standardCompliance.partial
        });
        
        tooltip.tooltip('show');
        
      });
      
    }
  }

  hideDetail = (id)=>{
    return ()=>{
      let tooltip = $('#componentTooltip-'+id);
      tooltip.tooltip('hide');
    }
    
  }
  
  componentWillReceiveProps(nextProp){
    if(nextProp.apps !== this.props.apps){
      return true;
    }
  }

  openComponent = (standardKey,compUrl)=>{
    return ()=>{
      window.sessionStorage.setItem('component',JSON.stringify({url:compUrl,standard:standardKey}))
      window.location = '/components/detail';
    }
  }

  render() {
    // eslint-disable-line no-use-before-define
    return (
      <div className="list-group list-view-pf list-view-pf-view">

        {this.props.apps.map((app,i) =>
        <div className="list-group-item" key={i}>

          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa fa-book list-view-pf-icon-sm"></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  { app.name }
                </div>
              </div>
                <ComplianceProgress app={app}/>
            </div>
          </div>
        </div>

        <div className="list-group-item-container container-fluid hidden">
          <div className="close">
            <span className="pficon pficon-close"></span>
          </div>
          <p>
            <i>{ app.description }</i>
            <br /><br />
          </p>
          
          <div className="row">
            <div className="col-md-3">
            </div>
            <div className="col-md-9">
              <dl className="dl-horizontal">
                <dt>Control Familes:</dt>
                <dd>{app.controlFamilies}</dd>
                <dt>Total Controls: </dt>
                <dd>{app.totalControls}</dd>
                <dt>Inheriting Components: </dt>

                <dd>{app.inheritingComponents?Object.entries(app.inheritingComponents).map((comp,id)=>
                (<div key={id} style={{margin: "0 0.5em 0 0"}}>
                <a id={"componentTooltip-"+id} onMouseLeave={this.hideDetail(id)} onMouseEnter={this.showComponentDetail(app.key,comp[1],id,comp[0])} onClick={this.openComponent(app.key,comp[1])} data-toggle="tooltip" data-placement="top" 
                data-original-title={'Completed: '+this.state.componentCompletedControls+'/'+app.totalControls+';   '+'Partially: '+this.state.componentPartialControls+'/'+app.totalControls}>
                 {comp[0]}</a></div>))
                :(<div></div>)}</dd>

              </dl>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
    )
  }

}

export default StandardsListView;
