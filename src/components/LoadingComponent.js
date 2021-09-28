import React from "react";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading = (props) => {
    return (
      <div className="col-12">
        <FontAwesomeIcon icon="circle-notch" className="fa-spin" color="#bbb" size="5x"/>
        <h6>{props.text ? props.text : "Inhalte werden geladen ..."}</h6>
      </div>
    );
};

// export default Loading;