import React, { Component } from "react";
import { Input, InputGroup, Button } from 'reactstrap'

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchField(props) {
  return (
    <div className="container">
      <div className="row">
        <label className="col-form-label" for={props.id}>{props.label ? props.label + ":" : ""}</label>
        <div className="col-12 col-md-4">
          <InputGroup>
            <Input
              type="text"
              id={props.label}
              placeholder={props.placeholder}
              aria-describedby={props.id + "Help"}
            />
            <Button className="btn btn-dark">
              <FontAwesomeIcon icon="search" size="" />
            </Button>
          </InputGroup>
          <div className="form-text" id={props.id + "Help"}>
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchField;