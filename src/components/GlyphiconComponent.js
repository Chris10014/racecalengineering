 import React from "react";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 /**
   * Translates the abbreviation of sports into the corresponding FontAwesome glyphicon.
   * Needed in loops and filter() functions when the glyphicon is created dynamically.
   * @param {props.param} param string for glyphicon
   * @param {props.size} size of the glyphicon optional
   * @returns the glyphicon
   */
  export const Glyphicon = (props) => {
    switch (props.param) {
      case "swim":
        return <FontAwesomeIcon icon="swimmer" size={props.size ? props.size : ""} />;
      case "bike":
        return <FontAwesomeIcon icon="biking" size={props.size ? props.size : ""} />;
      case "ctf":
        return <FontAwesomeIcon icon="biking" size={props.size ? props.size : ""} />;
      case "rtf":
        return <FontAwesomeIcon icon="biking" size={props.size ? props.size : ""} />;
      case "rb":
        return <FontAwesomeIcon icon="biking" size={props.size ? props.size : ""} />;
      case "mtb":
        return <FontAwesomeIcon icon="biking" size={props.size ? props.size : ""} />;
      case "run":
        return <FontAwesomeIcon icon="running" size={props.size ? props.size : ""} />;
      case "walk":
        return <FontAwesomeIcon icon="walking" size={props.size ? props.size : ""} />;

      default:
        return <FontAwesomeIcon icon="question" size={props.size ? props.size : ""} />;
    }
  }