import React, { PropTypes } from 'react';
import {Wizard} from './wizard';
import axios from 'axios';
import constants from '../../core/constants'
const [remote_address,loginUrl,createUserUrl] = [constants.remote_address, constants.loginUrl, constants.createUserUrl];

export default class Login extends React.Component{
  constructor(props){
      super(props);
      this.wizardSettings = {
        title:'Sign up',
        steps:[{
          title:'Registration',
          substeps:[{name:'Sign up Information',
          items:['Username','Password','Email'],
          callbacks:[(evt)=>{//onUsernameChange
            this.setState({newUsername:evt.target.value})
          },
          (evt)=>{ //onPasswordChange
            this.setState({newPassword:evt.target.value})
          },()=>{}],
          required:[true,true,false]}]
        },{
          title:'Choose your identity',
          substeps:[{name:'Identity',
          items:['Identity'],
          callbacks:[],
          required:[true]}]
        },{
          title:'Verification',
          substeps:[{name:'Verification',items:[]}]
        }],
        finishCallback:()=>{
          axios.put(remote_address+createUserUrl, {
            "username":this.state.newUsername,
            "password":this.state.newPassword
          }).then((r)=>{
            //if r is ...
            this.setState({createSuccess:true})
          }).catch((e)=>{
            if(e.response){
              console.log(e.response);
              this.setState({createSuccess:false})
            }
          })
        }
      };

      this.state={
        userName:'',
        password:'',
        correct: true,

        newUsername:'',
        newPassword:'',
        createSuccess: false
      }
  }

  componentDidMount(){
    // $(document).ready(function() {
    //   //initialize wizard
      
    // });
  }

  logIn=()=>{
    axios.post(remote_address+loginUrl,{
      "username":this.state.userName,
      "password":this.state.password
    })
    .then((response)=>{
      console.log('success')
      let compliance=[];
      this.getUserCompliance((data)=>{
        compliance = data;
        sessionStorage.setItem('user',JSON.stringify({
          login:true,
          username: this.state.userName,
          compliance: compliance
        }));
        
        window.location="/standards";
      });
      // handle success

    })
    .catch((error) =>{
      if(error.response){
        console.log(error.response);
        this.setState({correct:false})
      }
      // handle error
      
    })
  }

  getUserCompliance = (callback)=>{
    axios.get(remote_address+constants.getUserCompliance+this.state.userName)
    .then(r=>{
      console.log(r)
      callback(r.data);
    })
    .catch((e)=>{
      callback([])
    });
  }

  showUserName = (e)=>{
    this.setState({
      userName: e.target.value,
      correct: true
    })
  }
  getPassword = (e)=>{
    this.setState({
      password: e.target.value
    })
  }

  render(){
      return (
      <div style={{position:'absolute', top:0, height: '100vh', width: '100vw', overflow:'hidden'}}>
<div className="login-pf">
<div className="login-pf-page">
  <div className="container-fluid">
    <div className="row">
      <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
        <header className="login-pf-page-header">
          {/* <img className="login-pf-brand" src="/assets/img/Logo_Horizontal_Reversed.svg" alt=" logo" /> */}
          
        </header>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
            <div className="card-pf">
              <header className="login-pf-header">
                <h1>Log In to Your Account</h1>
              </header>
              {/* <form> */}
                <div className="form-group">
                  <label className="sr-only" htmlFor="exampleInputEmail1">Username</label>
                  <input className="form-control  input-lg" onChange={this.showUserName} value={this.state.userName} id="exampleInputEmail1" placeholder="Username"/>
                </div>
                <div className="form-group">
                  <label className="sr-only"  htmlFor="exampleInputPassword1">Password
                  </label>
                  <input type="password" onChange={this.getPassword} className="form-control input-lg" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                {this.state.correct?(<div></div>):(<div style={{color:'#df3838'}}>Invalid Username or Password</div>)}
                
                <div className="form-group login-pf-settings">                      
                  <a href="#">Log in as Security Officer?</a>
                </div>
                <button onClick={this.logIn} className="btn btn-primary btn-block btn-lg">Log In</button>
              {/* </form> */}
              <p className="login-pf-signup">Need an account?
              <a className="btn btn-default wizard-pf-open wizard-pf-complete" data-target="#complete">Sign up</a></p>
            </div>
            
            <footer className="login-pf-page-footer">
              {/* <ul className="login-pf-page-footer-links list-unstyled">
                <li><a className="login-pf-page-footer-link" href="#">Terms of Use</a></li>
                <li><a className="login-pf-page-footer-link" href="#">Help</a></li>
                <li><a className="login-pf-page-footer-link" href="#">Privacy Policy</a></li>
              </ul> */}
            </footer>
          </div>
          {/* <!-- col --> */}
        </div>
        {/* <!-- row --> */}
      </div>
      {/* <!-- col --> */}
    </div>
    {/* <!-- row --> */}
  </div>
  {/* <!-- container --> */}
</div>
{/* <!-- login-pf-page --> */}

</div>
<Wizard settings={this.wizardSettings} success={this.state.createSuccess}/>
</div>);
  }
}