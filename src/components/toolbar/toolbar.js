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
        alert:''
  
      }
    }

    componentWillReceiveProps(nextProps) {
      if(nextProps.data.length < 10){
        this.setState({alert:nextProps.alert,showForm:!nextProps.alert})
      }
    }

    showComment(){
      const inputshaveValue= this.state.email || this.state.name;
      const {alert}= this.state;
      if(alert){
        const alertIcon = <span
          className={classNames({
            "toolbar__info_exclamation":!alert[0],
            "toolbar__info_tick":alert[0]
          })}
        ></span>;
        return (
          <span
            className={classNames({
              'toolbar__info':true,
            })}>{alertIcon}{alert[1]}</span>
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

    resetInputsValues(){
        this.setState({name:'',email:''})
    }

    toggleForm(){
      if(this.props.data.length>=10){
        this.setState({showForm:false,alert:[false,"The list is full"]})
      }else{
        this.setState({showForm:true,alert:""})
      }
    }

    handleOnChange(e){
      const target = e.target;
      const value = target.value;
      const name = target.name;
      this.setState({[name]:value})
    }

    handleOnFocus(e){
      e.preventDefault();
      this.setState({alert:''})
    }

    handleOnSubmit(e){
      e.preventDefault();
      const formIsNotEmpty= this.handleEmptyValue();
      const inputIsValid= formIsNotEmpty?this.validateInputFormat():false;
      if(inputIsValid){
        const foundSameEmail= this.handleFoundingSameEmail();
        if(!foundSameEmail){
          this.updatingData();
        } else{
          this.setState({alert:[false,"email already exists"]})
        }
      }
    }

    handleEmptyValue(){
        if(this.state.name&&this.state.email){
          this.setState({alert:''})
          return true;
        } else {
          this.setState({alert:[false,'Fill both inputs']})
          return false;
        }
       }
  
    validateInputFormat(){
      const nameRegex = /^[a-zA-Z_ ]{5,20}$/;
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!nameRegex.test(this.state.name)){
        this.setState({alert:[false,"wrong name"]})
        return false;
      } else if(!emailRegex.test(this.state.email)){
        this.setState({alert:[false,"wrong email"],})
        return false;
      } else {
        this.setState({alert:"",})
        return true;
      }
    }

    handleFoundingSameEmail(){
      return _.find(this.props.data,el=>el.email===this.state.email);
    }

    updatingData(){
      const randomId = Math.random().toString(16).substring(2);
      const Newobj = {id:`${randomId}`,name:`${this.state.name}`, email:`${this.state.email}`};
      this.props.updateData(Newobj);
      this.setState({name:"",email:"",showForm:false,alert:[true,"You have successfully added a user"] })
  
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
  