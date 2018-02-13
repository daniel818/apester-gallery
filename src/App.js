import React, { Component } from "react";
import ImageGallery from "./component/ImageGallery";

export default class App extends Component {

  render(){
      return(
          <div>
            <ImageGallery data={this.props.data}/>
          </div>
      )
    }
}
