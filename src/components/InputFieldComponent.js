import { Input, InputGroup } from 'reactstrap'

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function InputField(props) {
  return (
    <div className="container">
      <div className="row">
        <label className="col-form-label" for={props.id}>
          {props.label ? props.label + ":" : ""}
        </label>
        <div className="col-12">
          <InputGroup>
            <Input
              type={props.type}
              id={props.id}
              name={props.id}
              list={props.list}
              placeholder={props.placeholder}
              aria-describedby={props.id + "Help"}
              onChange={props.onChange}
              value={props.value}
            />
            {props.icon ? (
              <span className="input-group-text">
                <FontAwesomeIcon icon={props.icon} />
              </span>
            ) : null}
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