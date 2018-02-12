import React, { Component } from "react";
import Image from "./component/Image";

import _ from "lodash";

const STANDARD_RES = 1;
const LOW_RES = 4;
const THUMBNAIL_RES = 6;
const WINDOW_SIZE = 8;

const RANGES = [
  { type: "windowRange", name: WINDOW_SIZE },
  { type: "thumbnail", name: THUMBNAIL_RES },

  { type: "lowRange", name: LOW_RES },
  { type: "standardRange", name: STANDARD_RES }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    // bind methods
    this.calculateIndex = this.calculateIndex.bind(this);
  }

  renderImages() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    const length = data.length - 1;

    //Array that hold the type of range and the array of ranges
    const ranges = RANGES.map(range => {
      return {
        type: range.type,
        range: _.range(
          Math.max(activeIndex - WINDOW_SIZE, 0),
          Math.min(activeIndex + range.name, length),
          1
        )
      };
    });

    //Destructuring
    const {
      windowRange = ranges[0],
      thumRange = ranges[1],
      lowRange = ranges[2],
      standardRange = ranges[3]
    } = ranges;

    const slidingWindow = windowRange.range.map(i => {
      return { index: i, useColor: true };
    });

    //Itirate over the thumb res range and check if its in the window range => if it is update useThumb to true
    thumRange.range.forEach(i => {
      const obj = _.find(slidingWindow, winObj => winObj.index === i);
      obj.useThumb = true;
    });

    //Itirate over the low res range and check if its in the window range => if it is update useLow to true
    lowRange.range.forEach(i => {
      const obj = _.find(slidingWindow, winObj => winObj.index === i);
      obj.useLow = true;
    });

    //Itirate over the stnd res range and check if its in the window range => if it is update useStandard to true
    standardRange.range.forEach(i => {
      const obj = _.find(slidingWindow, winObj => winObj.index === i);
      obj.useStandard = true;
    });

    return slidingWindow.map(mapping => {
      const { useThumb, useLow, useStandard, index } = mapping;
      const model = data[index];

      return (
        <Image
          key={index}
          index={index}
          useThumb={useThumb}
          useLow={useLow}
          useStandard={useStandard}
          model={model}
        />
      );
    });
  }

  /**
   * CalculateIndex:
   * step 1 - position off y axis / width (=height) gives you the index of the image in (0,0)
   * step 2 - calculate the number of images in view total height / image width (=height)
   * step 3 - divde step 2 result by two to get the center image offset
   * step 3 - add step 1 and step 3 to find the currect center index
   */
  calculateIndex() {
    const activeIndex = Math.floor(
      window.scrollY / window.innerWidth +
        window.innerHeight / window.innerWidth / 2
    );
    if (this.state.activeIndex !== activeIndex) {
      this.setState({ activeIndex });
    }
  }
  componentDidMount() {
    window.addEventListener("scroll", this.calculateIndex);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.calculateIndex);
  }

  render() {
    const { data } = this.props;
    const scrollStyle = { height: data.length * window.innerWidth }; //Make the scroller realistic to the  number of images

    return (
      <div className="App" style={scrollStyle}>
        {this.renderImages()}
      </div>
    );
  }
}

export default App;
