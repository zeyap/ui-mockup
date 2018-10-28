import React, { PropTypes } from 'react';
import StandardTableView from '../TableView/StandardTableView'
import ListViewBase from './ListViewBase'
import ComplianceProgress from './ComplianceProgress'
import DropdownMenu from '../TableView/DropdownMenu'

class ComponentListView extends ListViewBase {

  constructor(props){
    super(props);

    let serializedByStandards = [];
    for(let key in props.detail){
        serializedByStandards.push(Object.assign(props.detail[key],{name:key}));
    }
    this.state={
        detail: serializedByStandards
    };
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
        {this.state.detail.map((app,i) =>
        <div className="list-group-item" key={i}>

          <div className="list-group-item-header">
            <div className="list-view-pf-expand">
              <span className="fa fa-angle-right"></span>
          </div>
          <div className="list-view-pf-actions">
            {/* <button className="btn btn-default">Details</button> */}
          </div>
          <div className="list-view-pf-main-info">
            <div className="list-view-pf-left">
              <span className="fa fa-plane list-view-pf-icon-sm"></span>
            </div>
            <div className="list-view-pf-body">
              <div className="list-view-pf-description">
                <div className="list-group-item-heading">
                  { app.name }
                </div>
              </div>
              
              <ComplianceProgress app={app} />
            </div>
          </div>
        </div>

        <div className="list-group-item-container container-fluid hidden" style={{padding:'15px'}}>
          {/* <div class="btn-group"> */}
         Download as ... <DropdownMenu items={['Microsoft Word','YAML']}/>
          
          <span style={{padding: '0 0.5em'}}></span>
            
            {/* <button type="button" class="btn btn-default"></button>
          </div> */}
          <div style={{height: '1em', width: '100%'}}></div>
          <StandardTableView standardKey={i} detail = {app}/>
          
        </div>
      </div>
      )}
    </div>
    )
  }

}

export default ComponentListView;
