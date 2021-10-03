import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Label, Form, FormGroup, Input, InputGroup, Col } from "reactstrap";
import { Link } from "react-router-dom";

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
              <Form>
                <FormGroup>
                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="eventName">Name:</Label>
                    </Col>
                    <Col md={4}>
                      <Input
                        type="text"
                        id="eventName"
                        name="eventName"
                        placeholder="Name"
                        aria-describedby="eventNameHelp"
                        list="eventNames"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="eventNameHelp">
                    Name der Veranstaltung eingeben.
                  </div>

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

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="eventHost">Veranstalter:</Label>
                    </Col>
                    <Col md={4}>
                      <Input
                        type="text"
                        id="eventHost"
                        name="eventHost"
                        placeholder="Veranstalter"
                        aria-describedby="eventHostHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="eventHostHelp">
                    Name des Veranstalters eingeben.
                  </div>

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="postalCode">PLZ:</Label>
                    </Col>
                    <Col md={2}>
                      <Input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        placeholder="Postleitzahl"
                        aria-describedby="postalCodeHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="postalCodeHelp">
                    Postleitzahl eingeben.
                  </div>

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="city">Stadt:</Label>
                    </Col>
                    <Col md={4}>
                      <Input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Stadt"
                        aria-describedby="cityHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="cityHelp">
                    Stadt eingeben.
                  </div>

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="start">Von:</Label>
                    </Col>
                    <Col md={2}>
                      <Input
                        type="date"
                        id="start"
                        name="start"
                        placeholder="TT.MM.JJJJ"
                        aria-describedby="startHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="startHelp">
                    Startdatum eingeben.
                  </div>

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="end">Bis:</Label>
                    </Col>
                    <Col md={2}>
                      <Input
                        type="date"
                        id="end"
                        name="end"
                        placeholder="TT.MM.JJJJ"
                        aria-describedby="endHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="endHelp">
                    Enddatum eingeben.
                  </div>

                  <InputGroup>
                    <Col md={2}>
                      <Label htmlFor="homepage">Homepage:</Label>
                    </Col>
                    <Col md={4}>
                      <Input
                        type="url"
                        id="homepage"
                        name="homepage"
                        placeholder="https:// ..."
                        aria-describedby="homepageHelp"
                      />
                    </Col>
                  </InputGroup>
                  <div className="form-text offset-2" id="homepageHelp">
                    Homepageadresse des Veranstalters eingeben.
                  </div>
                </FormGroup>
              </Form>
            </div>
          </div>
        );
    }

}
export default CreateSportEvent;
