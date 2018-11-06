import React, { PropTypes } from 'react';

export default class DropdownMenu extends React.Component{
  constructor(props){
      super(props);
      this.state={
          value:props.value===undefined?props.items[0]:props.value
      }
      
  }

  setValue = (value)=>(()=>{
      this.setState({
          value:value
      })
      if(this.props.onSelect)
        this.props.onSelect(value);
  })

  componentWillReceiveProps(nextProps) {
  // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.value!==undefined && nextProps.value !== this.state.value) {
        this.setState({ value: nextProps.value });
    }
}
  render(){
      let items = this.props.items;
      return (
      <div className="dropdown" style={{display:"inline-block", position:"relative"}}>
        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown">
            {this.state.value}
            <span className="caret"></span>
        </button>
        <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
            {items.map((item,id)=>(<li key={'dropdown'+id} role="presentation"><a role="menuitem" onClick={this.setValue(item)}>{item}</a></li>))}
        </ul>
    </div>
    );
  }
}