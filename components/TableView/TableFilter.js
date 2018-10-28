import React, { PropTypes } from 'react';
import tableFilter from './tablefilter.css'

export default class TableFilter extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
      return (<div className={tableFilter.total_width}>
    <div className={tableFilter.input_width +" "+ tableFilter.filter_inline}>
    <div className="filter-pf" id="input-filters">
      <div className="filter-pf-fields">
        <div className="input-group form-group">
          <div className="input-group-btn">
            <div className="dropdown btn-group">
              <button type="button" className="dropdown-toggle btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Field
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li className="selected"><a href="#">ControlName</a></li>
                <li><a href="#">Narrative</a></li>
                <li><a href="#">Status</a></li>
              </ul>
            </div>
          </div>
          <input type="text" className="form-control" value="" placeholder="Filter by Name"/>
        </div>
      </div>
    </div>
  </div>
  <div className={"col-sm-12 "+tableFilter.filter_inline}>
                <span><b>40 Results </b></span>
                <span>Active filters:</span>
                <ul className={"list-inline "+tableFilter.list_inline}>
                  <li>
                    <span className="label label-info">
                      Name: nameofthething
                      <a href="#"><span className="fa fa-times"></span></a>
                    </span>
                  </li>
                  <li>
                    <span className="label label-info">
                      Name: nameofthething
                      <a href="#"><span className="fa fa-times"></span></a>
                    </span>
                  </li>
                  <li>
                    <span className="label label-info">
                      Name: nameofthething
                      <a href="#"><span className="fa fa-times"></span></a>
                    </span>
                  </li>
                </ul>
                <span><a href="#"> Clear All Filters</a></span>
              </div>
    </div>);
  }
}