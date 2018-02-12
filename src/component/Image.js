/**
 * Created by Daniel on 12/02/2018.
 */
import React from 'react'

const Image = ({model, useThumb, useLow, useStandard, index}) => {

    const src = useThumb ? model.thumbnail : '';
    const src2 = useLow ? model.low_resolution : src;
    const src3 = useStandard ? model.standard_resolution : src2;

    const imageStyle = {
        backgroundColor: model.prominentColor,
        position: "absolute",
        width: "100%",
        height: "100vw", //keep it the same as width
        transform: `translateY(${index * 100}%)` //because all absolute we need to calculate position of image
    }

    return (
        <div style={imageStyle}>
            <img style={{ width: "100%"}} src={src3.url}  alt={model.prominentColor}/>
        </div>
    );
}
export default Image