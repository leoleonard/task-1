import React, {Component} from 'react';

export default class TableHeader extends Component {
  sortTable(itemId){
    this.props.sortTable(itemId)
  }

  renderHeaderText(value){
    const {sortby,descending}=this.props;
    const arrow = !descending
      ?<div className="table-header__el__img table-header__el__img_down" />
      :<div className="table-header__el__img table-header__el__img_up" />;
    const properArrow = (sortby && sortby===value)?arrow:null;
    return properArrow;
  }

    render() {
        return (
            <thead>
              <tr
                className="table-header">
                <th
                  className="table-header__el circle">LP</th>
                <th
                  className="table-header__el"
                  onClick={this.sortTable.bind(this,"name")}>
                  {"name"}{this.renderHeaderText("name")}
                </th>
                <th
                  className="table-header__el"
                  onClick={this.sortTable.bind(this,"email")}>
                  {"email"}{this.renderHeaderText("email")}
                </th>
                <th  className="table-header__el"></th>
              </tr>
            </thead>
        );
    }//render
}//component


//
