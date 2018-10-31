import React, { PropTypes } from 'react';
import './standardTableView.css'
import Pagination from './Pagination'
import TableFilter from './TableFilter'
import tableview from './tableview.css'
import DropdownMenu from './DropdownMenu'
import DropdownTextbox from './DropdownTextbox'

class StandardTableView extends React.Component {
  constructor(props){
    super(props);
    this.standardKey = this.props.standardKey;

    let isControlSelected=this.initControlStatus(6,0);
    //checkboxes
    this.state={
      isControlSelected,
      numberPerPage: 6,
      currentPage: 0
    }
    this.selectedNumber =0;
  }
  componentDidMount() {
    
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount(){
    
  }

  initControlStatus = (size,value)=>{
    let isControlSelected=[];
    for(let i=0;i<size;i++){
      isControlSelected[i] =value;
    }
    return isControlSelected;
  }

  toggleSelectAll = ()=>{
    let isControlSelected = [...this.state.isControlSelected];
    this.selectedNumber = isControlSelected.reduce((accum,item)=>accum+item,0);
    if(this.selectedNumber < this.detail.length){
      for(let i=0;i<this.detail.length;i++){
        isControlSelected[i]=1;
      }
      this.showSelectMenu();
      this.selectedNumber = this.detail.length;
      
    }else{
      for(let i=0;i<this.detail.length;i++){
        isControlSelected[i]=0;
      }
      this.hideSelectMenu();
      this.selectedNumber =0;
    }
    this.setState({
      isControlSelected
    })
    
  }

  selectCheckbox = (controlid)=>{
    return (()=>{
      let isControlSelected = [...this.state.isControlSelected];
      isControlSelected[controlid] = isControlSelected[controlid]===0?1:0;
      this.setState({
        isControlSelected
      })
      if(isControlSelected[controlid]===0){
        this.selectedNumber--;
      }else{
        this.selectedNumber++;
      }
      
      if(this.selectedNumber===0){
        this.hideSelectMenu();
      }else{
        this.showSelectMenu();
      }
      
    }).bind(this);
  }

  showSelectMenu = ()=>{
    let selectmenu = $("#selectMenu");
    if(selectMenu){
      selectmenu.css("opacity",1);
      selectmenu.css("transition","opacity 0.2s");
    }
  }

  hideSelectMenu = ()=>{
    let selectmenu = $("#selectMenu");
    if(selectMenu){
      selectmenu.css("opacity",0);
      selectmenu.css("transition","opacity 0.2s");
    }
  }

  setPageNumber=()=>{
    return (currPage)=>{
      this.setState({
        currentPage: currPage,
        isControlSelected:this.initControlStatus(this.state.numberPerPage,0)
      })
    }
  }

  setNumberPerPage=()=>{
    return (numPerPage)=>{
      this.setState({
        numberPerPage: numPerPage,
        isControlSelected:this.initControlStatus(numPerPage,0)
      })
    }
  }

  render() {
    let start = this.state.numberPerPage*this.state.currentPage;
    let end = start+this.state.numberPerPage;
    this.detail = Object.entries(this.props.detail).slice(start,end);
    let totalRecordNum = Object.entries(this.props.detail).length;
    return (<div>
    <div className={tableview.row}>
      <TableFilter/>
    </div>
    {/* Table HTML */}
    <table className="table table-striped table-bordered table-hover" id="table1" style={{"minWidth":"0",tableLayout: "fixed", width: "100%"}}>
    <thead><tr>
    <th style={{width:"35px"}}><input type="checkbox" onChange={this.toggleSelectAll}/></th>
    <th colSpan="7">
      <div className={tableview.row} style={{transform:'translateY(10%)'}}>
        <div style={{opacity:0}} id="selectMenu" className={tableview.left}>
          <span>Set status ...</span>
          <DropdownMenu items={['Complete','Partial','Unknown','Planned','Not Applicable']}/>
        </div>
        <div className={tableview.right}>
          <Pagination totalRecordNum={totalRecordNum} setNumberPerPage={this.setNumberPerPage()} setPageNumber={this.setPageNumber()}/>
        </div>
      </div>
    </th></tr></thead>
      <thead>
        <tr>
          <th></th>
          <th>ControlName</th>
          <th>CoveredBy</th>
          <th colSpan="4">Narrative</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
      {this.detail.map((control,controlid)=>{
        let suffix = '-'+this.standardKey+'-'+controlid;
        return(
        <tr key={controlid}>
          <td>
            <label className="sr-only" >Select all rows</label>
            <input type="checkbox" onChange={this.selectCheckbox(controlid)} checked={this.state.isControlSelected[controlid]}/>
          </td>
          
          <td>{control[0]}</td>
          <td>{control[1].covered_by}</td>
          <td colSpan="4" style={{padding:0, wordWrap: "break-word"}}>
          {(control[1].narrative)?(
              <div style={{margin:'5px'}}>
            {control[1].narrative.map((item,itemid)=>(<DropdownTextbox text={item.text} id={suffix+'-'+itemid} key={itemid}/>))}
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
  </div>
    )
  }

}

export default StandardTableView;
