import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isShow:false,
    errorStatus:false,
    errorMsg:'',
  }

  onSubmitSuccess = (token) => {
    Cookies.set('jwt_token',"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOlsiYzQ5MGRmYTgtZWJmMy00NTE5LWI1M2EtZDc1Y2I3NGJlMDUwIiwiVXJ2aXNoIiwiU2hhaCIsInVydmlzaC5zaGFoQHB1c2hwYWsuYWkiXSwiaWF0IjoxNjQ5NzUyODc0LCJleHAiOjE2ODEyODg4NzR9.13UfXk_CVjKSqyC5pq2HgQK6KKI_PPM886C0dZB5CtM",{expires:30})
    //console.log(token)
    const {history} = this.props
    history.replace('/')
    
    
    
    
  }

  onSubmitFailure=errorMsg=>{
    //console.log(errorMsg)
    this.setState({errorStatus:true,errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
  
    const url = 'http://13.76.214.165:8001/api/login'
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response
    //console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    }else{
      this.onSubmitFailure(data.statusText)
    }
  }

  


  onShowPassword=(event)=>{
    this.setState({isShow:true})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }


  renderPasswordField = () => {
    const {password,isShow} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          Password
        </label>
        <br/>
        <input
          type={isShow?"text":"password"}
          id="password"
          placeholder=' Enter Password'
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
        <button className='button-text' onClick={this.onShowPassword}>show</button>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    const jwtToken=Cookies.get("jwt_token")
    if (jwtToken!==undefined){
      return <Redirect to='/'/>
    }
    return (
      <>
        <label className="input-label" htmlFor="username">
          Email
        </label>
        <br/>
        <input
          type="text"
          id="username"
          placeholder=" Enter Email Id"
          className="email-input-filed"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  render() {
    const{errorStatus,errorMsg}=this.state
    return (
      <div className="login-form-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
        
        
        <form className="form-container" onSubmit={this.submitForm}>
          <h1>SignIn</h1>
          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <button type="submit" className="sign-button">
            SignIn
          </button>
          <p className='password-text'>Forgot Password?</p>
          <p className='signin-text'>Don't have an account ? <label className='password-text'>SignIn</label></p>
          {errorStatus&& <p className='error-msg'>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm