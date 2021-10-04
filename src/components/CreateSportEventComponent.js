import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Label, Form, FormGroup, Input, InputGroup, Col, Row, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { LocalForm, Control, Errors } from "react-redux-form";

class CreateSportEvent extends Component {
    constructor(props) {
    super(props);

    this.state = {
      eventName: "",
      eventHost: "",
      postalCode: "",
      city: "",
      homepage: "",
      eventStart: "",
      eventEnd: ""
    }

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
                  <Label md={2} htmlFor="eventName">Veranstaltung:</Label>
                  <Col md={10}>
                    <Control.text model=".eventName" id="eventName" name="eventName"
                      placeholder="Verstanstaltungsname ..."
                      className="form-control"
                      aria-describedby="eventNameHelp"
                      list="eventNames"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="eventNameHelp">
                      Name der Veranstaltung eingeben.
                  </Col>
                </Row>
                
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="host">Veranstalter:</Label>
                  <Col md={10}>
                    <Control.text model=".host" id="host" name="host"
                      placeholder="Verstanstalter ..."
                      className="form-control"
                      aria-describedby="hostHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="hostHelp">
                      Name des Veranstalters eingeben.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="postalCode">Postleitzahl:</Label>
                  <Col md={4}>
                    <Control type="Number" model=".postalCode" id="postalCode" name="postalCode"
                      placeholder="PLZ"
                      className="form-control"
                      aria-describedby="postalCodeHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="postalCodeHelp">
                      Postleitzahl eingeben (nur Ziffern).
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="city">Stadt:</Label>
                  <Col md={10}>
                    <Control.text model=".city" id="city" name="city"
                      placeholder="Städtename ..."
                      className="form-control"
                      aria-describedby="cityHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="cityHelp">
                      Ort der Veranstaltung eingeben.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="start">Von:</Label>
                  <Col md={4}>
                    <Control type="date" model=".start" id="start" name="start"
                      placeholder="tt.mm.jjjj"
                      className="form-control"
                      aria-describedby="startHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="startHelp">
                      Erster Veranstaltungstag.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="end">Bis:</Label>
                  <Col md={4}>
                    <Control type="date" model=".end" id="end" name="end"
                      placeholder="tt.mm.jjjj"
                      className="form-control"
                      aria-describedby="endHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="endHelp">
                      Letzter Versanstaltungstag.
                  </Col>
                </Row>
                <Row className="form-group mb-3">
                  <Label md={2} htmlFor="homepage">Von:</Label>
                  <Col md={10}>
                    <Control type="url" model=".homepage" id="homepage" name="homepage"
                      placeholder="https:// ..."
                      className="form-control"
                      aria-describedby="homepageHelp"
                    />
                  </Col>
                  <Col md={{offset: 2}} className="form-text" id="homepageHelp">
                      Internetadresse der Veranstalterhomepage eingeben.
                  </Col>
                </Row>
                
                <Row className="form-group mb-3">
                  <Col md={{size: 10, offset: 2}}>
                    <Button type="submit" color="primary">
                      Speichern
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
             
                  {/* <datalist id="eventNames">
                    {this.props.sportEvents
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
                        return (sportEvent.name ? 
                          <option value={sportEvent.name}></option> : ""                     
                        );
                      })}
                  </datalist> */}

                  
            </div>
          </div>
        );
    }

}
export default CreateSportEvent;
