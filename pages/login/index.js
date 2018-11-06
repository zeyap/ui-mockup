import React, { PropTypes } from 'react';
import {wizard, Wizard} from './wizard'

export default class Login extends React.Component{
  constructor(props){
      super(props);
      this.wizardSettings = {
        title:'Sign up',
        steps:[{
          title:'Registration',
          substeps:[{name:'Sign up Information',
          items:['Username','Password','Email'],
          required:[true,true,false]}]
        },{
          title:'Choose your identity',
          substeps:[{name:'Identity',
          items:['Identity'],
          required:[true]}]
        },{
          title:'Verification',
          substeps:[{name:'Verification',items:[]}]
        }]
      }
  }

  componentDidMount(){
    $(document).ready(function() {
    //initialize wizard
    var completeWizard = new wizard(".btn.wizard-pf-complete");
  });

  
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
          <p>
            This is placeholder text, only. Use this area to place any information or introductory message about your application that may be relevant for users.
          </p>
        </header>
        <div className="row">
          <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
            <div className="card-pf">
              <header className="login-pf-header">
                <h1>Log In to Your Account</h1>
              </header>
              <form>
                <div className="form-group">
                  <label className="sr-only" htmlFor="exampleInputEmail1">Email address</label>
                  <input className="form-control  input-lg" id="exampleInputEmail1" placeholder="Email address"/>
                </div>
                <div className="form-group">
                  <label className="sr-only"  htmlFor="exampleInputPassword1">Password
                  </label>
                  <input type="password" className="form-control input-lg" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group login-pf-settings">
                      <label className="checkbox-label">
                        <input type="checkbox"/> Keep me logged in for 30 days
                      </label>
                      <a href="#">Forgot password?</a>
                </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Log In</button>
              </form>
              <p className="login-pf-signup">Need an account?
              <a className="btn btn-default wizard-pf-open wizard-pf-complete" data-target="#complete">Sign up</a></p>
            </div>
            
            <footer className="login-pf-page-footer">
              <ul className="login-pf-page-footer-links list-unstyled">
                <li><a className="login-pf-page-footer-link" href="#">Terms of Use</a></li>
                <li><a className="login-pf-page-footer-link" href="#">Help</a></li>
                <li><a className="login-pf-page-footer-link" href="#">Privacy Policy</a></li>
              </ul>
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
<Wizard settings={this.wizardSettings}/>
</div>);
  }
}