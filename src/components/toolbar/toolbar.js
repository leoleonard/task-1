import React, {Component} from "react";
import _ from 'lodash';
import classNames from 'classnames/bind';


export default class Toolbar extends Component {
  constructor(props){
    super(props);
    this.state={
      showForm:false,
      name:'',
      email:'',
      warning:''

    }
  }
//CWP in case removing elemts from the list which is executed in form but needs info in Toolbar--------
  componentWillReceiveProps(nextProps) {
    if(nextProps.data.length < 10){
      this.setState({warning:nextProps.warning,showForm:!nextProps.warning})
    }
  }
// the function handles showing warnings and clear button-------------------
  showComment(){
    const inputshaveValue= this.state.email || this.state.name;
    const {warning}= this.state;
    if(warning){
      const warningIcon = <span
        className={classNames({
          "toolbar__info_exclamation":!warning[0],
          "toolbar__info_tick":warning[0]
        })}
      ></span>;
      return (
        <span
          className={classNames({
            'toolbar__info':true,
          })}>{warningIcon}{warning[1]}</span>
      )
    }
    if(inputshaveValue){
      return (
        <button
          onClick={this.resetInputsValues.bind(this)}
          className={classNames({
            'toolbar__button-clear':true,
          })}
          >Reset fields</button>
      )
    }
  }
// action initiated by clear button to clear inputs-------------------------
  resetInputsValues(){
      this.setState({name:'',email:''})
  }
//action intiated by add user button------------------------
  toggleForm(){
    if(this.props.data.length>=10){
      this.setState({showForm:false,warning:[false,"The list is full"]})
    }else{
      this.setState({showForm:true,warning:""})
    }
  }
  //action which changes the state every time sth going on in inputs---------
  handleOnChange(e){
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({[name]:value})
  }
  //action used to clear wrnings in case of focusing on an input-----------
  handleOnFocus(e){
    e.preventDefault();
    this.setState({warning:''})
  }
  //action triggered by submit button---------------------------------------
  handleOnSubmit(e){
    e.preventDefault();
    const formIsNotEmpty= this.handleEmptyValue();
    const inputIsValid= formIsNotEmpty?this.validateInputFormat():false;
    if(inputIsValid){
      const foundSameEmail= this.handleFoundingSameEmail();
      if(!foundSameEmail){
        this.updatingData();
      } else{
        this.setState({warning:[false,"email already exists"]})
      }
    }
  }
//action initiated in handleOnSubmit() to check if both inputs are filled----------
  handleEmptyValue(){
   if(this.state.name&&this.state.email){
     this.setState({warning:''})
     return true;
   } else {
     this.setState({warning:[false,'Fill both inputs']})
     return false;
   }
  }
  //action initiated in handleOnSubmit() to check correctness of inputs' format-----------
  validateInputFormat(){
    const nameRegex = /^[a-zA-Z_ ]{5,20}$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!nameRegex.test(this.state.name)){
      this.setState({warning:[false,"wrong name"]})
      return false;
    } else if(!emailRegex.test(this.state.email)){
      this.setState({warning:[false,"wrong email"],})
      return false;
    } else {
      this.setState({warning:"",})
      return true;
    }
  }
  //action initiated in handleOnSubmit() to check if email is duplicated------
  handleFoundingSameEmail(){
    return _.find(this.props.data,el=>el.email===this.state.email);
  }
  //action initiated in handleOnSubmit() to add new user----------------------
  updatingData(){
    const randomId = Math.random().toString(16).substring(2);
    const Newobj = {id:`${randomId}`,name:`${this.state.name}`, email:`${this.state.email}`};
    this.props.updateData(Newobj);
    this.setState({name:"",email:"",showForm:false,warning:[true,"You have successfully added a user"] })

  }


  render(){
    const listIsFull= this.props.data.length>=10;
    if(this.state.showForm){
      return (
        <div
          className={classNames({
            'toolbar':true,
            'toolbar_form':true,
          })}>
          <form onSubmit={this.handleOnSubmit.bind(this)}>
            <input
              onChange={this.handleOnChange.bind(this)}
              name="name"
              type="text"
              placeholder="name"
              value={this.state.name}
              onFocus={this.handleOnFocus.bind(this)}
              autoFocus
              className={classNames({
                'toolbar__input':true,
              })}
            ></input>
            <input
              onChange={this.handleOnChange.bind(this)}
              name="email"
              type="text"
              placeholder="email"
              value={this.state.email}
              onFocus={this.handleOnFocus.bind(this)}
              className={classNames({
                'toolbar__input':true,
              })}
            ></input>
            <button
              type="submit"
              className={classNames({
                'toolbar__button':true,
                'toolbar__button_submit':true,
                'toolbar__button_disabled':false,
              })}>
              Submit</button>
            </form>
          {this.showComment()}
        </div>
      )
    }
      return (
        <div className="toolbar">
          <button
            onClick={this.toggleForm.bind(this)}
            className={classNames({
              'toolbar__button':true,
              'toolbar__button_disabled':listIsFull,
            })}>
            <div
              className={classNames({
                'toolbar__button_plus':true,
                'toolbar__button_plus_disabled':listIsFull,
              })}>
              </div>
            Add user</button>
          {this.showComment()}
        </div>
      )

  }
}
