import React, { Component } from "react";
import Image from "./component/Image";

import _ from "lodash";

// const Image = ({model, useColor, useLow, useStandard, index}) => {
//   const src = useLow ? model.low_resolution : '';
//   const src2 = useStandard ? model.standard_resolution : src;
//   return (
//     <div style={{ backgroundColor: model.prominentColor, position: "absolute", width: "100%", height: "100vw", transform: `translateY(${index * 100}%)` }}>
//        <img style={{ }} src={src2.url} />
//     </div>
//     );
// }
const STANDARD = 1;
const LOW_RES = 4;
const THUMBNAIL = 30;
const COLOR = 8;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };

    // bind methods
    this.calculateIndex = this.calculateIndex.bind(this);
    this.getIndices = this.getIndices.bind(this)
  }

  //getting the minIndex and maxIndex ( of each resolution )
  getIndices(start, end, index, offset) {
    return {
      index,
      minIndex: Math.max(start, index - offset),
      maxIndex: Math.min(end, index + offset)
    };
  }

  renderImages() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    const length = data.length - 1;
    const color = this.getIndices(0, length, activeIndex, COLOR); // { minIndex: 0, maxIndex: 50 }
    const low = this.getIndices(0, length, activeIndex, LOW_RES);

    // const standard = Range(0, length, data, activeIndex, STANDARD);
    const slidingWindow = {
      mappings: [],
      models: []
    };

    const colorRange = _.range(color.minIndex, color.maxIndex, 1);
    const lowRange = _.range(low.minIndex, low.maxIndex, 1);
    console.log("coloerRange", colorRange);
    console.log("lowRange", lowRange);

    const renderColor = colorRange.map(i => {
      const scaleIndex = i - color.minIndex;
      //console.log("i", i);
      //console.log("scaleIndex", scaleIndex);
      slidingWindow.mappings[scaleIndex] = { useColor: true };
      //slidingWindow.models[scaleIndex] = data[i];
    });

    const renderLow = lowRange.map(i => {
      //const scaleIndex = i - color.minIndex;
      //slidingWindow.mappings[scaleIndex] = { useLow: true };
      return { useLow: true };
    });
    console.log(renderLow);

    slidingWindow.mappings.splice(lowRange[0], 0, ...renderLow);

    for (let i = colorRange[0]; i < slidingWindow.mappings.length; i++) {
      slidingWindow.models[i] = data[i];
      console.log(slidingWindow.models);
    }

    console.log("mapping", slidingWindow.mappings);
    console.log("low", low);
    console.log("color", color);

    return slidingWindow.mappings.map((mapping, i) => {
      const { useColor, useLow, useStandard } = mapping;
      const model = slidingWindow.models[i];

      return (
        <Image
          key={i}
          index={i + color.minIndex}
          useColor={useColor}
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
    console.log("render");
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
