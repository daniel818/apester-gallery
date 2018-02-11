import React, { Component } from 'react';
import './App.css';
const log = console.log;

const Image = ({model, useColor, useLow, useStandard, index}) => {
  const src = useLow ? model.low_resultion : '';
  const src2 = useStandard ? model.url : src;
  return (
    <div style={{ backgroundColor: model.prominentColor, position: "absolute", width: "100%", height: "100vw", transform: `translateY(${index * 100}%)` }}>
       <img style={{ }} src={src2} />
    </div>
    );
}

const Range = (start, end, index, offset) => {
  return {
    index,
    minIndex: Math.max(start, index - offset),
    maxIndex: Math.min(end, index + offset),
  }
}

const STANDARD = 1;
const LOW_RES = 20;
const THUMBNAIL = 30;
const COLOR = 3;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
    }
    
    // bind methods
    this.calculateIndex = this.calculateIndex.bind(this);
  }

  renderImages() {
    const { data } = this.props;
    const { activeIndex } = this.state;
    const length = data.length - 1;
    log(length);
    const color = Range(0, length, activeIndex, COLOR); // { minIndex: 0, maxIndex: 50 }
  //  const low =  Range(0, length, activeIndex, LOW_RES)
  //  const standard = Range(0, length, data, activeIndex, STANDARD);
    const slidingWindow = {
      mappings: [],
      models: [],
    };

    for(let i = color.minIndex; i < color.maxIndex; i++) {

      const scaleIndez = i - color.minIndex;
      slidingWindow.mappings [scaleIndez] = {useColor: true};
      slidingWindow.models[scaleIndez] = data[i];
    }

    log(color);
    return slidingWindow.mappings.map((mapping, i) => {
        const { useColor, useLow, useStandard } = mapping;
        const model = slidingWindow.models[i];
        return <Image 
                  key={i} 
                  index={i + color.minIndex}
                  useColor={useColor} 
                  useLow={useLow}
                  useStandard={useStandard}
                  model={model} 
                   />
    });
  }
  /**
   * Some Math: 
   * step 1 - position off y axis / width (=height) gives you the index of the image in (0,0)
   * step 2 - calculate the number of images in view total height / image width (=height)
   * step 3 - divde step 2 result by two to get the center image offset
   * step 3 - add step 1 and step 3 to find the currect center index
   */
  calculateIndex() {
    const activeIndex = Math.floor(window.scrollY / window.innerWidth + window.innerHeight / window.innerWidth / 2) ;
    if(this.state.activeIndex !== activeIndex) {
      this.setState({ activeIndex });
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.calculateIndex)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.calculateIndex)
  }
  render() {
    console.log('render');

    const { data } = this.props;
    const { activeIndex } = this.state;
    const renderedImages = this.renderImages();
    return (
      <div className="App" style={{ height: data.length * window.innerWidth }}>
{/*         <img src={data[0].url} style={{position: 'absolute', transform: `translateY(${100 * data.length}%)` }}/> */}
        {renderedImages}
      </div>
    );
  }
}

export default App;
