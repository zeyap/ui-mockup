import React, { PropTypes } from 'react';

class StandardTableView extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount(){
    
  }

  render() {
    console.log(this.props.detail)
    return (<div>
    {/* <div>{this.props.detail.name}</div>
        {this.props.detail.satisfies.map((control,id)=>(
          <div key={id}>{control.control_key} {control.implementation_status}</div>
        ))} */}


    {/* Table HTML */}
    <table className="table table-striped table-bordered table-hover" id="table1">
      <thead>
        <tr>
          <th><label className="sr-only" htmlFor="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"/></th>
          <th>ControlName</th>
          <th>Browser</th>
          <th>Platform(s)</th>
          <th>Engine Version</th>
          <th>CSS Grade</th>
          <th colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th><label className="sr-only" htmlFor="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"/></th>
          <td>Rendering Engine</td>
          <td>Browser</td>
          <td>Platform(s)</td>
          <td>Engine Version</td>
          <td>CSS Grade</td>
          <td colSpan="2">Actions</td>
        </tr>
      </tbody>
      
    </table>

    {/* <form className="content-view-pf-pagination table-view-pf-pagination clearfix" id="pagination1">
      <div className="form-group">
        <select className="selectpicker pagination-pf-pagesize">
          <option value="6">6</option>
          <option value="10" >10</option>
          <option value="15" selected="selected">15</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <span>per page</span>
      </div>
      <div className="form-group">
        <span><span className="pagination-pf-items-current">1-15</span> of <span className="pagination-pf-items-total">75</span></span>
        <ul className="pagination pagination-pf-back">
          <li className="disabled"><a href="#" title="First Page"><span className="i fa fa-angle-double-left"></span></a></li>
          <li className="disabled"><a href="#" title="Previous Page"><span className="i fa fa-angle-left"></span></a></li>
        </ul>
        <label htmlFor="pagination1-page" className="sr-only">Current Page</label>
        <input className="pagination-pf-page" type="text" value="1" id="pagination1-page"/>
        <span>of <span className="pagination-pf-pages">5</span></span>
        <ul className="pagination pagination-pf-forward">
          <li><a href="#" title="Next Page"><span className="i fa fa-angle-right"></span></a></li>
          <li><a href="#" title="Last Page"><span className="i fa fa-angle-double-right"></span></a></li>
        </ul>
      </div>
    </form> */}
  </div>
    )
  }

}

export default StandardTableView;
