/**
 * Created by Daniel on 12/02/2018.
 */
import React from 'react'

const Image = ({model, useColor, useLow, useStandard, index}) => {
    const src = useLow ? model.low_resolution : '';
    const src2 = useStandard ? model.standard_resolution : src;

    const imageStyle = {
        backgroundColor: model.prominentColor,
        position: "absolute",
        width: "100%",
        height: "100vw", //keep it the same as width
        transform: `translateY(${index * 100}%)` //because all absolute we need to calculate position of image
    }

    return (
        <div style={imageStyle}>
            <img style={{ width: "100%"}} src={src2.url} />
        </div>
    );
}
export default Image