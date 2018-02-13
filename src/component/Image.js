/**
 * Created by Daniel on 12/02/2018.
 */
import React from "react";

const Image = ({
  imageModel,
  useThumbnail,
  useLowResolution,
  useStandardResolution,
  index
}) => {
  const isThumbnail = useThumbnail ? imageModel.thumbnail : "";
  const isLowRes = useLowResolution ? imageModel.low_resolution : isThumbnail;
  const isStandard = useStandardResolution
    ? imageModel.standard_resolution
    : isLowRes;

  const imageDivStyle = {
    backgroundColor: imageModel.prominentColor,
    position: "absolute",
    width: "100%",
    height: "100vw",
    //because all of the images absolute we need to calculate the position of each image accordingly
    transform: `translateY(${index * 100}%)`
  };

  return (
    <div style={imageDivStyle}>
      <img style={{ width: "100%" }} src={isStandard.url} />
    </div>
  );
};
export default Image;
