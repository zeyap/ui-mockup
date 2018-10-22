import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import CardView from '../../components/CardView/CardView';
import constants from '../../core/constants';
import StandardTableView from '../../components/TableView/StandardTableView'
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
        console.log(data)
      })
    }).bind(this)
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
        <StandardTableView detail={this.state.detail}/>
        </div>
      </Layout>)
    }
    
  }

}

export default UsersPage;
