import React from 'react';

const SideBarIcon = ({
  src,
  alt,
  text,
}) => (
  <div className="hvrbox">
    <img src={src} alt={alt} className="hvrbox-layer_bottom" width={"45px"}/>
    <div className="hvrbox-layer_top">
      <div className="hvrbox-text">
        {text}
      </div>
    </div>
  </div>
)

export default SideBarIcon;