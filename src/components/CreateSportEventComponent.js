import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Label, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const validUrl = (val) => /^([Hh][Tt][Tt][Pp][Ss]?):\/\/(.+)$/i.test(val);

class CreateSportEvent extends Component {
    constructor(props) {
    super(props);

    this.state = {
      eventName: "" /*Used for <datalist> auto filled by react-redux-form*/
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
      console.log("State is: " + JSON.stringify(values));
      alert("State is: " + JSON.stringify(values));    
    }

    render() {
        return (
          <div className="container">
            <div className="row">
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/eventcalendar">Veranstaltungen</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Veranstaltung eintragen</BreadcrumbItem>
              </Breadcrumb>
              <h1>Neue Veranstaltung eintragen</h1>
              <hr />
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="eventName">
                    Veranstaltung:
                  </Label>
                  <Col md={10}>
                    <Control
                      type="text"
                      model=".eventName"
                      id="eventName"
                      name="eventName"
                      placeholder="Verstanstaltungsname ..."
                      className="form-control"
                      aria-describedby="eventNameHelp"
                      list="eventNames"
                      autoComplete="off"
                      validators={{
                        required,
                        minLength: minLength(3),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".eventName"
                      show="touched"
                      messages={{
                        required: "Verstanstaltungsname eingeben.",
                        minLength:
                          "Der Name muss mindesten aus 3 Zeichen bestehen.",
                      }}
                    />
                  </Col>
                  <Col
                    md={{ offset: 2 }}
                    className="form-text"
                    id="eventNameHelp"
                  >
                    Name der Veranstaltung eingeben.
                  </Col>
                </Row>

                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="host">
                    Veranstalter:
                  </Label>
                  <Col md={10}>
                    <Control
                      type="text"
                      model=".host"
                      id="host"
                      name="host"
                      placeholder="Verstanstalter ..."
                      className="form-control"
                      aria-describedby="hostHelp"
                      validators={{
                        required,
                        minLength: minLength(3),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".host"
                      show="touched"
                      messages={{
                        required: "Veranstalter eingeben.",
                        minLength: "Mindesten 3 Zeichen eingeben.",
                      }}
                    />
                  </Col>
                  <Col md={{ offset: 2 }} className="form-text" id="hostHelp">
                    Name des Veranstalters eingeben.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="postalCode">
                    Postleitzahl:
                  </Label>
                  <Col md={4}>
                    <Control
                      type="Number"
                      model=".postalCode"
                      id="postalCode"
                      name="postalCode"
                      placeholder="PLZ"
                      className="form-control"
                      aria-describedby="postalCodeHelp"
                      valid
                      ators={{
                        required,
                        isNumber,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".postalCode"
                      show="touched"
                      messages={{
                        required: "PLZ eingeben.",
                        isNumber: "Nur Zahlen eingeben.",
                      }}
                    />
                  </Col>
                  <Col
                    md={{ offset: 2 }}
                    className="form-text"
                    id="postalCodeHelp"
                  >
                    Postleitzahl eingeben (nur Ziffern).
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="city">
                    Stadt:
                  </Label>
                  <Col md={10}>
                    <Control
                      type="text"
                      model=".city"
                      id="city"
                      name="city"
                      placeholder="Städtename ..."
                      className="form-control"
                      aria-describedby="cityHelp"
                      validators={{
                        required,
                        minLength: minLength(3),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".city"
                      show="touched"
                      messages={{
                        required: "Städename eingeben.",
                        minLength: "Mindesten 3 Zeichen eingeben."
                      }}
                    />
                  </Col>
                  <Col md={{ offset: 2 }} className="form-text" id="cityHelp">
                    Ort der Veranstaltung eingeben.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="start">Von:</Label>
                  <Col md={4}>
                    <Control
                      type="date"
                      model=".start"
                      id="start"
                      name="start"
                      placeholder="tt.mm.jjjj"
                      className="form-control"
                      aria-describedby="startHelp"
                      validators={{ 
                        required
                       }}
                    />
                    <Errors
                    className="text-danger"
                    model=".start"
                    show="touched"
                    messages={{ 
                      required: "Startdatum eingeben"
                     }} />
                  </Col>
                  <Col md={{ offset: 2 }} className="form-text" id="startHelp">
                    Erster Veranstaltungstag.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="end">Bis (optional):</Label>
                  <Col md={4}>
                    <Control
                      type="date"
                      model=".end"
                      id="end"
                      name="end"
                      placeholder="tt.mm.jjjj"
                      className="form-control"
                      aria-describedby="endHelp"
                    />
                  </Col>
                  <Col md={{ offset: 2 }} className="form-text" id="endHelp">
                    Letzter Versanstaltungstag.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="homepage">
                    Homepage:
                  </Label>
                  <Col md={10}>
                    <Control
                      type="url"
                      model=".homepage"
                      id="homepage"
                      name="homepage"
                      placeholder="http(s):// ..."
                      className="form-control"
                      aria-describedby="homepageHelp"
                      validators={{ 
                        required, validUrl
                       }}
                    />
                    <Errors
                    className="text-danger"
                    model=".homepage"
                    show="touched"
                    messages={{ 
                      required: "Internetadresse der Veranstalterhomepage eingeben.",
                      validUrl: "Internetadresse im richtigen Format eingeben: http(s)://..."
                     }} />
                  </Col>
                  <Col
                    md={{ offset: 2 }}
                    className="form-text"
                    id="homepageHelp"
                  >
                    Internetadresse der Veranstalterhomepage eingeben.
                  </Col>
                </Row>

                <Row className="form-group mb-3">
                  <Col md={{ size: 10, offset: 2 }}>
                    <Button type="submit" color="primary">
                      Speichern
                    </Button>
                    &nbsp;&nbsp;
                    <Button type="reset" color="danger" value="cancel">
                      Abbrechen
                    </Button>
                  </Col>
                </Row>
              </LocalForm>

              <datalist id="eventNames">
                {this.props.sportEvents.sportEvents
                  .filter((sportEvent) => {
                    if (this.state.eventName === null) {
                      //do nothing
                    } else if (
                      sportEvent.name
                        ? sportEvent.name
                            .toLowerCase()
                            .startsWith(this.state.eventName)
                        : ""
                    ) {
                      return sportEvent;
                    }
                  })
                  .map((sportEvent) => {
                    return sportEvent.name ? (
                      <option value={sportEvent.name}></option>
                    ) : (
                      ""
                    );
                  })}
              </datalist>
            </div>
          </div>
        );
    }

}
export default CreateSportEvent;
