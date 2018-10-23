import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import CardView from '../../components/CardView/CardView';
import constants from '../../core/constants';
import ComponentListView from '../../components/ListView/ComponentListView'
import {getComponents, getComponent} from '../../utils/open-control-utils.js';
import history from '../../core/history';

class UsersPage extends React.Component {
  constructor(props){
    super(props)
    this.state = { users: [], showDetail: -1 };
  }
  

  componentDidMount() {
    document.title = 'Security Central | Components';
  }

  componentWillMount() {
    this.getUsers();
  }

  getUsers() {
    let that = this;
    getComponents(data=>{
      that.setState({users : data})
    })
  }

  openForm = (i)=>{
    return (function(){
      //request component
      getComponent(this.state.users[i].url,data=>{
        this.setState({
          detail: data,
          showDetail:i
        })
      })
    }).bind(this)
  }

  back = ()=>{
    this.setState({
      showDetail:-1
    })
  }

  render() {
    if(this.state.showDetail===-1){
        return (
          <Layout>
            <div className="container-fluid container-pf-nav-pf-vertical container-cards-pf">
              {this.state.users.length?(<CardView users={ this.state.users} onClickFunctions={this.openForm}/>)
              :(<div></div>)}
            </div>
          </Layout>
        );
      
    }else{
      return (
      <Layout>
      
      <div className="container-fluid container-pf-nav-pf-vertical container-cards-pf">
      <button className="btn btn-default" type="button" onClick={this.back}>Back</button>
      
        <ComponentListView detail={this.state.detail}/>
        </div>
      </Layout>)
    }
    
  }

}

export default UsersPage;
