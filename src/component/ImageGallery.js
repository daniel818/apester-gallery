/**
 * Created by Daniel on 13/02/2018.
 */
import React, { Component } from "react";
import Image from "./Image";

import _ from "lodash";

//Constants
const STANDARD_RESOLUTION = 5;
const LOW_RESOLUTION = 10;
const THUMBNAIL_RESOLUTION = 20;
const WINDOW_SIZE = 40;
const RESOLUTIONS_RANGES = [
  { type: "windowRange", name: WINDOW_SIZE },
  { type: "thumbnailRange", name: THUMBNAIL_RESOLUTION },
  { type: "lowResolutionRange", name: LOW_RESOLUTION },
  { type: "standardResolutionRange", name: STANDARD_RESOLUTION }
];

export default class ImageGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      windowWidth: window.innerWidth
    };
    // Bind method
    this.calculateIndex = this.calculateIndex.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.calculateIndex);
    window.addEventListener("resize", this.calculateIndex);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.calculateIndex);
    window.removeEventListener("resize", this.calculateIndex);
  }
  /**
   * CalculateIndex:
   * step 1 - position off y axis / width (=height) gives you the index of the image in (0,0)
   * step 2 - calculate the number of images in view total height / image width (=height)
   * step 3 - divide step 2 result by two to get the center image offset
   * step 3 - add step 1 and step 3 to find the current center index
   */
  calculateIndex() {
    const imagePerWindow = window.innerHeight / window.innerWidth;
    const activeImageIndex = Math.floor(
      window.scrollY / window.innerWidth + imagePerWindow / 2
    );

    if (this.state.activeIndex !== activeImageIndex) {
      this.setState({ activeImageIndex });
    }
  }

  /**
   * Create an array of resolutionRangesArray
   * for each resolution and for the window
   * @param resolutionRangesArray
   */
  getResolutionRanges(resolutionRangesArray) {
    const { activeIndex } = this.state;
    const length = this.props.data.length - 1;

    return resolutionRangesArray.map(range => {
      return {
        type: range.type,
        range: _.range(
          Math.max(activeIndex - range.name, 0),
          Math.min(activeIndex + range.name, length),
          1
        )
      };
    });
  }

  /**
   *  Iterate over the [type]resolution range and check the
   *  location in the Array, update accordingly to the resolution type
   * @param resolutionRangeArray
   * @param slidingWindow
   * @param imageUseType
   */
  updateImageResolution(resolutionRangeArray, slidingWindow, imageUseType) {
    resolutionRangeArray.forEach(i => {
      const imageObj = _.find(slidingWindow, winObj => winObj.index === i);
      imageObj[imageUseType] = true;
    });
  }

  /**
   * Render The images Resolution by range of each resolution Type
   */
  renderImages() {
    const ResolutionsRanges = this.getResolutionRanges(RESOLUTIONS_RANGES);
    const [
      windowRange,
      thumbnailRange,
      lowResolutionRange,
      standardResolutionRange
    ] = ResolutionsRanges;

    const slidingWindow = windowRange.range.map(i => {
      return { index: i, useColor: true };
    });

    this.updateImageResolution(
      thumbnailRange.range,
      slidingWindow,
      "useThumbnail"
    );
    this.updateImageResolution(
      lowResolutionRange.range,
      slidingWindow,
      "useLowResolution"
    );
    this.updateImageResolution(
      standardResolutionRange.range,
      slidingWindow,
      "useStandardResolution"
    );

    return slidingWindow.map(imageObject => {
      const {useThumbnail, useLowResolution, useStandardResolution, index} = imageObject;
      const imageModel = this.props.data[index];

      return (
        <Image
          key={index}
          index={index}
          useThumbnail={useThumbnail}
          useLowResolution={useLowResolution}
          useStandardResolution={useStandardResolution}
          imageModel={imageModel}
        />
      );
    });
  }

  render() {
    //let the scroll bar  represent the expected height of the page and move respond well to scrolling
    const scrollStyle = { height: this.props.data.length * window.innerWidth };

    return <div style={scrollStyle}>{this.renderImages()}</div>;
  }
}
