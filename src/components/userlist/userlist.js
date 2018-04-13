import React, {Component} from "react";
import Header from './../header/header';
import Table from './../table/table';
import Toolbar from './../toolbar/toolbar';
import _ from 'lodash';


export default class Userlist extends Component {
  constructor(props){
    super(props);
    this.state={
      data:'',
      sortby:'',
      descending:false,
      alert:''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users').then(resp => resp.json())
      .then(data => {
          if(data.length!==0){
            this.setState({
              data:data
            })
          } else if (data.length===0){
            console.log("Failed to download data from server");
          }
        }
      );
  }

updateData(newData){
  const data= this.state.data?this.state.data:[];
  data.push(newData);
  this.setState({data:data,alert:"" })
  fetch(`https://jsonplaceholder.typicode.com/users`, {
          method : 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(newData)
      });
}


sortTable(itemId){
  let data = Array.from(this.state.data);
  const descending = this.state.sortby === itemId && !this.state.descending;
  data.sort((a,b)=>{
    return ( descending
      ?((a[itemId]>b[itemId])? 1:-1)
      :((a[itemId]<b[itemId])? 1:-1)
    )});

  this.setState({
    data:data,
    sortby:itemId,
    descending:descending
  })
}

deleteUser(id){
  const data= this.state.data?this.state.data:[]
  _.remove(data, item => item.id === id);
  this.setState({data:data,alert:[false,"You have successfully removed a user"]})
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method : 'DELETE',
      });
}

  render(){
    const noUsersInfo = <span>No users</span>;
    return (
      <div className="userlist">
        <Header/>
        <Toolbar
          data={this.state.data}
          alert={this.state.alert}
          updateData={this.updateData.bind(this)}
        ></Toolbar>
        <Table
          data={this.state.data}
          deleteUser={this.deleteUser.bind(this)}
          sortTable={this.sortTable.bind(this)}
          sortby={this.state.sortby}
          descending={this.state.descending}
        >
        </Table>
        {this.state.data.length?'':noUsersInfo}
      </div>
    )
  }
}
