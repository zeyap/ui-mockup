import React, { PropTypes } from 'react';
import './standardTableView.css'
import Pagination from './Pagination'

import TableFilter from './TableFilter'
import tableview from './tableview.css'
import DropdownMenu from './DropdownMenu'
import DropdownTextbox from './DropdownTextbox'
import StatusIcon from './StatusIcon'

import axios from 'axios';
import constants from '../../core/constants'

class StandardTableView extends React.Component {
  constructor(props){
    super(props);
    this.standardKey = this.props.standardKey;

    let isControlSelected=this.initControlStatus(6,0);
    //checkboxes
    this.state={
      isControlSelected,
      ifAllSelected: false,
      numberPerPage: 6,
      currentPage: 0,
      detail: Object.entries(this.props.detail),
      viewOnly: this.props.viewOnly
    }
    this.selectedNumber =0;

    this.complianceToUpdate={};
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
    let ifAllSelected = false;
    if(this.selectedNumber < this.paginatedDetail.length){
      for(let i=0;i<this.paginatedDetail.length;i++){
        isControlSelected[i]=1;
      }
      this.showSelectMenu();
      this.selectedNumber = this.paginatedDetail.length;
      ifAllSelected=true;
    }else{
      for(let i=0;i<this.paginatedDetail.length;i++){
        isControlSelected[i]=0;
      }
      this.hideSelectMenu();
      this.selectedNumber =0;
      ifAllSelected=false;
    }
    this.setState({
      isControlSelected,
      ifAllSelected
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
        isControlSelected:this.initControlStatus(this.state.numberPerPage,0),
        ifAllSelected: false
      });
      this.hideSelectMenu();
    }
  }

  setNumberPerPage=()=>{
    return (numPerPage)=>{
      this.setState({
        numberPerPage: numPerPage,
        isControlSelected:this.initControlStatus(numPerPage,0),
        ifAllSelected: false
      });
      this.hideSelectMenu();
    }
  }

  addFilter = (field, containedWord)=>{
    let filtered=[];
    if(field === 'ControlName'){
      filtered = this.state.detail.filter((item)=>item[0].indexOf(containedWord)>-1);
    }
    if(field === 'Status'){
      filtered = this.state.detail.filter((item)=>item[1]['implementation_status'].indexOf(containedWord)>-1);
    }
    this.setState({
      detail:filtered,
      isControlSelected:this.initControlStatus(this.state.numberPerPage,0),
      ifAllSelected: false
    })
    this.hideSelectMenu();
  }

  clearFilters=()=>{
    this.setState({
      detail:Object.entries(this.props.detail),
      isControlSelected:this.initControlStatus(this.state.numberPerPage,0),
      ifAllSelected: false
    })
    this.hideSelectMenu();
  }

  setStatusInBatch=(status)=>{
    for(let i=0;i<this.paginatedDetail.length;i++){
      if(this.paginatedDetail[i][1] instanceof Object && this.state.isControlSelected[i]){
        this.paginatedDetail[i][1].implementation_status = status;
        this.complianceToUpdate[this.paginatedDetail[i][1].control_key]={
          Control:this.paginatedDetail[i][1].control_key,
          Status:status
        }
      }
    }
    this.updateDetail();
  }
  setImplementationStatus = (controlSelected, indexInPage)=>{
    return (status)=>{
      controlSelected.implementation_status = status;
      this.complianceToUpdate[controlSelected.control_key]={
        Control:controlSelected.control_key,
        Status:status
      };
      this.updateDetail();
    }
  }

  updateDetail = ()=>{
    let start = this.state.numberPerPage*this.state.currentPage;
    let end = start+this.state.numberPerPage;
    let detail = this.state.detail.slice(0,start).concat(this.paginatedDetail).concat(this.state.detail.slice(end));
    this.setState({
      detail
    })

    let temp=[];
    for(let key in this.complianceToUpdate){
      let compliance = this.complianceToUpdate[key];
      compliance.Status = ((status)=>{
        let ans = 7;
        if(status==='Complete'){
          ans = 1;
        }else if(status==="Partial"){
          ans=2;
        }
        else if(status==='Planned'){
          ans=3;
        }else if(status ==='None'){
          ans=4;
        }else if(status==='Implemented'){
          ans=5;
        }else if(status==='Unknown'){
          ans=6;
        }else if(status==='Not applicable'){
          ans=7;
        }
        return ans;
      })(compliance.Status);
      temp.push(compliance);
    }
    
    let that = this;
    let userData = JSON.parse(sessionStorage.getItem('user'));
    userData.compliance.forEach((item)=>{
      if(undefined===this.complianceToUpdate[item.Control]){
        temp.push(item);
      }
    })
    // console.log(temp);
      
    let username = userData.username;
    axios.put(constants.remote_address+constants.updateCompliance,{
      "username":username,
      "controls":temp
    }).then((r)=>{
      // console.log(r)
      that.complianceToUpdate={};
      userData.compliance = temp;
      sessionStorage.setItem('user',JSON.stringify(userData));

    }).catch((e)=>{
      console.log(e);
    })
  }

  render() {
    // console.log(this.state.isControlSelected)
    const Implementation_Status=['Not applicable', 'None','Unknown','Implemented','Planned','Partial', 'Complete'];
    let start = this.state.numberPerPage*this.state.currentPage;
    let end = start+this.state.numberPerPage;
    this.paginatedDetail = this.state.detail.slice(start,end);
    // console.log(start,end)
    // console.log(this.state.detail)
    let totalRecordNum = this.state.detail.length;
    return (<div>
    <div className={tableview.row}>
      <TableFilter totalRecordNum={totalRecordNum} addFilter={this.addFilter} clearFilters={this.clearFilters}/>
      <div style={{position:'absolute', right:'0'}}>Download as ... <DropdownMenu items={['Microsoft Word','YAML']}/></div>
    </div>

    {/* Table HTML */}
    <table className="table table-striped table-bordered table-hover" id="table1" style={{"minWidth":"0",tableLayout: "fixed", width: "100%"}}>
    <thead><tr>
    <th style={{width:"35px"}}><input type="checkbox" checked={this.state.ifAllSelected} onChange={this.toggleSelectAll}/></th>
    <th colSpan="7">
      <div className={tableview.row} style={{transform:'translateY(10%)'}}>
        <div style={{opacity:0}} id="selectMenu" className={tableview.left}>
          <span>Set status ...</span>
          <DropdownMenu onSelect={this.setStatusInBatch} items={Implementation_Status}/>
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
          <th >Status {this.state.viewOnly?(<span></span>):(<span id="statusHelp" onMouseEnter={()=>{$('#statusHelp').tooltip('show');}} title="Manually refresh page if status doesn't update correctly" className="pficon pficon-help"></span>)}</th>
        </tr>
      </thead>

      <tbody>
      {this.paginatedDetail.map((control,controlid)=>{
        
        let suffix = '-'+this.standardKey+'-'+controlid;
        // console.log(control[1].implementation_status)
        if(control[1].implementation_status===undefined){
          return (<tr key={controlid}></tr>)
        }
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

          <td style={{whiteSpace: 'nowrap'}}>
          <StatusIcon status={control[1].implementation_status}/>
            {this.state.viewOnly?(<span>{control[1].implementation_status}</span>):(<DropdownMenu value={control[1].implementation_status.split('_').map((word)=>(word.charAt(0).toUpperCase() + word.slice(1))).join(' ')} 
            onSelect={this.setImplementationStatus(control[1],controlid)} items={Implementation_Status}/>)}
          </td>
          
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
