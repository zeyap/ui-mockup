import React, { PropTypes } from 'react';

export default class DropdownMenu extends React.Component{
  constructor(props){
      super(props);
      this.state={
          value:props.items[0]
      }
  }

  setValue = (value)=>(()=>{
      this.setState({
          value:value
      })
      this.props.onSelect(value)
  })
  render(){
      let items = this.props.items;
      return (<div className="dropdown" style={{display:"inline-block", position:"relative"}}>
    <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
        {this.state.value}
        <span className="caret"></span>
    </button>
    <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
    {items.map((item,id)=>(<li key={'dropdown'+id} role="presentation"><a role="menuitem" onClick={this.setValue(item)}>{item}</a></li>))}
    </ul>
    </div>);
  }
}