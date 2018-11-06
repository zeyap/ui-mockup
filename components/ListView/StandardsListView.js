import React, { PropTypes } from 'react';
import StandardTableView from '../TableView/StandardTableView'
import ListViewBase from './ListViewBase'
import ComplianceProgress from './StandardComplianceProgress'

class StandardsListView extends ListViewBase {

  constructor(props){
    super(props);
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
                <dd>{app.inheritingComponents?app.inheritingComponents.join(', '):''}</dd>
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
