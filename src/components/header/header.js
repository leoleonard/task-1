import React, {Component} from 'react';

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state={
      data:this.props.data,

    }
  }

  render() {
      return (
        <div className="header">
          <a className="header__logo" href="https://unamo.com/"></a>
          <a className="header__link" href="https://unamo.com/">{`
            www.unamo.com`}</a>
        </div>
      );
  }
}
