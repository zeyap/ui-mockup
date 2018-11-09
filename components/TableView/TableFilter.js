import React, { PropTypes } from 'react';
import tableFilter from './tablefilter.css'

export default class TableFilter extends React.Component{
  constructor(props){
      super(props);
      this.state = {
        filterValue: "",
        filters: [],
        filterType: "ControlName"
      }
  }
  displayFilterInput = (evt)=>{
    this.setState({
      filterValue: evt.target.value
    });
  }
  componentDidMount(){
    $("#filterInput").on('keyup', (function (e) {
        if (e.keyCode == 13) {
            // Do something
            let currFilters = [...this.state.filters];
            currFilters.push(''+ this.state.filterType+": "+this.state.filterValue);
            this.props.addFilter(this.state.filterType, this.state.filterValue);
            this.setState({
              filterValue:"",
              filters: currFilters
            })
        }
    }).bind(this));
  }

  selectFilterType=(id, name)=>{
    return ()=>{
      this.clearAllSelection();
      $(id).addClass('selected');
      this.setState({
        filterType: name
      })
    }
  }
  clearAllSelection = ()=>{
      $('#filter-controlname').removeClass('selected');
      $('#filter-status').removeClass('selected');
  }
  clearAllFilters = ()=>{
    this.setState({
      filters:[]
    })
    this.props.clearFilters();
  }
  
  deleteFilter = (key)=>{
    return ()=>{
      let filters = [...this.state.filters];
      filters.splice(key,1);
      this.setState({
        filters
      })
      // this.props.clearFilters();
      // for(let i=0;i<filters.length;i++){
      //   let filter = filters[i].split(': ');
      //   this.props.addFilter(filter[0], filter[1]);
      // }
      //TODO: finish here
    }
  }

  render(){
    // console.log(this.props.totalRecordNum)
      return (<div className={tableFilter.total_width}>
    <div className={tableFilter.input_width +" "+ tableFilter.filter_inline}>
    <div className="filter-pf" id="input-filters">
      <div className="filter-pf-fields">
        <div className="input-group form-group">
          <div className="input-group-btn">
            <div className="dropdown btn-group">
              <button type="button" className="dropdown-toggle btn btn-default" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {this.state.filterType}
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu">
                <li id="filter-controlname" onClick={this.selectFilterType('#filter-controlname','ControlName')}><a>ControlName</a></li>
                <li id="filter-status" onClick={this.selectFilterType('#filter-status','Status')}><a>Status</a></li>
              </ul>
            </div>
          </div>
          <input id="filterInput" type="text" className="form-control" value={this.state.filterValue} placeholder={"Filter by "+this.state.filterType} onChange={this.displayFilterInput}/>
        </div>
      </div>
    </div>
  </div>
  {this.state.filters.length>0?(<div className={"col-sm-12"}>
    <span><b>{this.props.totalRecordNum} Results </b></span>
    <span>Active filters:</span>
    <ul className={"list-inline "+tableFilter.list_inline}>
    {this.state.filters.map((filter,key)=>(
      <li key={key}>
        <span className="label label-info">
          {filter}
          <a onClick={this.deleteFilter(key)}><span className="fa fa-times"></span></a>
        </span>
      </li>
    ))}
      
    </ul>
    <span><a onClick={this.clearAllFilters}> Clear All Filters</a></span>
  </div>):(<div></div>)}
  
    </div>);
  }
}