import _ from 'lodash';
import React, {Component} from 'react';
import TableHeader from './__table__header/__table__header';
import TableItem from './__table__item/__table__item';

export default class Table extends Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.data,
    }
  }

  deleteUser(id){
    this.props.deleteUser(id);
  }

  renderItems() {
      return _.map(this.props.data,(item, index) => 
      <TableItem
      key={index}
      {...item} 
      index={index} 
      deleteUser={this.deleteUser.bind(this)}
      classType={index%2===0?"table-body__row_even":"table-body__row_odd"}/>);
  }

  sortTable(itemId){
    this.props.sortTable(itemId)
  }

  render() {
      return (
          <table className="table-main">
              <TableHeader
                sortTable={this.sortTable.bind(this)}
                sortby={this.props.sortby}
                descending={this.props.descending}
              />
              <tbody>
                  {this.renderItems()}
              </tbody>
          </table>
      );
  }
}
