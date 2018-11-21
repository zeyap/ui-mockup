import React, { PropTypes } from 'react';
import './standardTableView.css'
import Pagination from './Pagination'
import TableFilter from './TableFilter'
import tableview from './tableview.css'
import DropdownMenu from './DropdownMenu'
import DropdownTextbox from './DropdownTextbox'
import StatusIcon from './StatusIcon'

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
      detail: Object.entries(this.props.detail)
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
      this.paginatedDetail[i][1].implementation_status = status;
    }
    this.updateDetail();
  }
  setImplementationStatus = (controlSelected, indexInPage)=>{
    return (status)=>{
      controlSelected.implementation_status = status;
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
  }

  render() {
    const Implementation_Status=['Not applicable', 'None','Unknown','Implemented','Planned','Partial', 'Complete'];
    let start = this.state.numberPerPage*this.state.currentPage;
    let end = start+this.state.numberPerPage;
    this.paginatedDetail = this.state.detail.slice(start,end);
    // console.log(start,end)
    
    let totalRecordNum = this.state.detail.length;
    // console.log('render',totalRecordNum)
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
          <th >Status</th>
        </tr>
      </thead>

      <tbody>
      {this.paginatedDetail.map((control,controlid)=>{
        
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

          <td style={{whiteSpace: 'nowrap'}}>
          <StatusIcon status={control[1].implementation_status}/>
            <DropdownMenu value={control[1].implementation_status.split('_').map((word)=>(word.charAt(0).toUpperCase() + word.slice(1))).join(' ')} 
            onSelect={this.setImplementationStatus(control[1],controlid)} items={Implementation_Status}/>
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
