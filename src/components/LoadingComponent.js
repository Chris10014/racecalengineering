import React from "react";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading = () => {
    return (
      <div className="col-12">
        <FontAwesomeIcon icon="circle-notch" rotation={270} className="fa-spin" size="10x"/>
        <p>Inhalt wird geladen ...</p>
      </div>
    );
};

// export default Loading;