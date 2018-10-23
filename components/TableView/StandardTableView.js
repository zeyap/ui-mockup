import React, { PropTypes } from 'react';
import './standardTableView.css'

class StandardTableView extends React.Component {
  constructor(props){
    super(props);
    this.detail = Object.entries(this.props.detail);
  }
  componentDidMount() {
    this.detail.forEach((control,controlid)=>{
      if(control[1].narrative===undefined)return;
      control[1].narrative.forEach((item,itemid)=>{
        let collapseBody = $("#collapse-"+controlid+'-'+itemid);
        collapseBody.collapse('hide');
        $("#collapse-header-"+controlid+'-'+itemid).on("click",(function(){
          collapseBody.collapse('toggle');
          let sign = $("#collapse-sign-"+controlid+'-'+itemid);
          sign.toggleClass('fa-angle-down');
          sign.toggleClass('fa-angle-right');
        }));
        
      })
    })
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount(){
    
  }

  render() {
    return (<div>
    {/* Table HTML */}
    <table className="table table-striped table-bordered table-hover" id="table1" style={{"minWidth":"0"}}>
      <thead>
        <tr>
          <th><label className="sr-only" htmlFor="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"/></th>
          <th>ControlName</th>
          <th>CoveredBy</th>
          <th colSpan="4">Narrative</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {this.detail.map((control,controlid)=>{
        return(
        <tr key={controlid}>
          <td><label className="sr-only" htmlFor="selectAll">Select all rows</label><input type="checkbox" id="selectAll" name="selectAll"/></td>
          <td>{control[0]}</td>
          <td>{control[1].covered_by}</td>
          <td colSpan="4" style={{padding:0}}>
          {(control[1].narrative)?(
              <div className="panel-group" id="accordion-markup" style={{"width":"400px",margin:'5px'}}>
            {control[1].narrative.map((item,itemid)=>(<div key={itemid} className="panel panel-default">
                <div className="panel-heading" id={"collapse-header-"+controlid+'-'+itemid}>
                  <h4 className="panel-title">
                    <div data-toggle="collapse" data-parent="#accordion-markup">
                    <div style={{display:"inline-block", width:'15px'}} className="fa fa-angle-down" id={"collapse-sign-"+controlid+'-'+itemid}></div>
                    <div style={{fontSize:'0.9em',fontWeight:'lighter',display: "inline-block",width: "90%",overflow: "hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {item.text}
                    </div>
                    </div>
                  </h4>
                </div>
                <div className="panel-collapse collapse in" id={"collapse-"+controlid+'-'+itemid}>
                  <div className="panel-body">
                    {item.text}
                  </div>
                </div>
              </div>))}
            </div>)
              :(<div></div>)}
          </td>
          <td>{control[1].implementation_status==='complete'?(
            <div style={{fontSize: '1.2em',margin: '5px'}}>
              <span className="pficon pficon-ok" style={{width:'20px'}}></span>
              {control[1].implementation_status}
            </div>
          ):status==='partial'?(
            <div style={{fontSize: '1.2em',margin: '5px'}}>
              <span className="pficon pficon-warning-triangle-o" style={{width:'20px'}}></span>
              {control[1].implementation_status}
            </div>
          ):(
            <div style={{fontSize: '1.2em',margin: '5px'}}>
              <span className="pficon pficon-error-circle-o" style={{width:'20px'}}></span>
              {'  '+control[1].implementation_status}
            </div>
          )}</td>
        </tr>
        )
        })}
        

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
