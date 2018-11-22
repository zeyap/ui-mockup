import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import CardView from '../../components/CardView/CardView';
import constants from '../../core/constants';
import ComponentListView from '../../components/ListView/ComponentListView'
import {getComponents, getComponent} from '../../utils/open-control-utils.js';
import history from '../../core/history';

class AppsPage extends React.Component {
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
      that.setState({users : data});

      if(this.props.route.params.param==='detail'){
        let component = JSON.parse(window.sessionStorage.getItem('component'));
        for(let i=0;i<data.length;i++){
          if(data[i].url === component.url){
            (that.openForm(i,component.standard))();
            break;
          }
        }
        that.back = ()=>{
          window.location = '/standards';
          window.sessionStorage.setItem('component',null);
        }
      }

    })
  }

  openForm = (i,filterStandard)=>{
    return (function(){
      //request component
      getComponent(this.state.users[i].url, this.state.users[i].name, data=>{

        if(filterStandard){
          filterStandard = filterStandard.split(/[\s|-]+/).join('-');
          //filter 'data'
          for(let standardKey in data){
            if(filterStandard===standardKey){
              data = {[standardKey]:data[standardKey]};
            }
          }
        }

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
            <button style={{display:'block', width:'100px', margin: '20px'}} className="btn btn-default" type="button">Create New</button>
              {this.state.users.length?(<CardView users={ this.state.users} onClickFunctions={this.openForm}/>)
              :(<div></div>)}
            </div>
          </Layout>
        );
      
    }else{
      console.log(this.state.showDetail)
      return (
      <Layout>
      <div className="container-fluid container-pf-nav-pf-vertical container-cards-pf">
      <button style={{display:'inline-block', width:'50px'}} className="btn btn-default" type="button" onClick={this.back}>Back</button>
      <div style={{display:'inline-block', margin:'0 20px', transform:'translateY(3px)'}} className="card-pf-title">
        {this.state.users[this.state.showDetail].name}
      </div>
        <ComponentListView detail={this.state.detail}/>
        </div>
      </Layout>)
    }
    
  }

}

export default AppsPage;
