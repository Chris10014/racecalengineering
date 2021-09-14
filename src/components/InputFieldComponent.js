import React, { Component } from "react";
import { Input, InputGroup, Button } from 'reactstrap'

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputField(props) {
  return (
    <div className="container">
      <div className="row">
        <label className="col-form-label" for={props.id}>{props.label ? props.label + ":" : ""}</label>
        <div className="col-12">
          <InputGroup>
            <Input
              type={props.type}
              id={props.label}
              name={props.id}
              placeholder={props.placeholder}              
              aria-describedby={props.id + "Help"}
              value={props.default}
              onChange={props.onChange}
            />
            {props.icon ? 
            <Button className="btn btn-dark">
              <FontAwesomeIcon icon={props.icon} size="" />
            </Button> : null
            }
            
          </InputGroup>
          <div className="form-text" id={props.id + "Help"}>
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputField;