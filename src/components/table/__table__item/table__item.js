import React, {Component} from 'react';

export default class TableItem extends Component {
    deleteUser(id){
      this.props.deleteUser(id);
    }

    render() {
      const {id,index,name,email,classType} = this.props;
        return (
            <tr className={`table-body__row ${classType}`}>
              <th className="table-body__row__el"><div className="circle">{index+1}</div></th>
              <th  className="table-body__row__el">{name}</th>
              <th  className="table-body__row__el">{email}</th>
              <th  className="table-body__row__el" onClick={this.deleteUser.bind(this,id)}><div className="table-body__row__el_cross-icon"></div></th>
            </tr>
        );
    }
}
