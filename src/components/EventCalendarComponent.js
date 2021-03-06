/* eslint-disable array-callback-return */
import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Label,
  Input,
  InputGroup,
  Col,
} from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

class EventCalendar extends Component {
  constructor(props) {
    super(props);    

    this.state = {
      eventSearchTerm: "",
      dateSearchTerm: this.today(), //.split(".").reverse().join("-"), //Converts the today's date (default value) into format yyy-mm-dd to be compatible with html 5
      countrySearchTerm: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.today = this.today.bind(this);
  }

  today() {
    return (new Date()
        .toLocaleString("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .split(".")
        .reverse()
        .join("-")
    );
}// Creates today's date as dd.mm.yyyy

  componentDidMount() {
    /**
     * To persist the input data of the search fields when a user clicked on event details and then back to the overview.
     * If the user closes the browser window, the sessionStorage will be cleared and the default value of the states are loaded when the page is opened again.
     */
    const eventSearchTerm = sessionStorage.getItem("eventSearchTerm");
    if (eventSearchTerm !== null) {
      this.setState({ eventSearchTerm: eventSearchTerm });
    } 
    const dateSearchTerm = sessionStorage.getItem("dateSearchTerm");
    if (dateSearchTerm && dateSearchTerm.length !== 0) {
      this.setState({ dateSearchTerm: dateSearchTerm });
    } else {
      this.setState({ dateSearchTerm: this.today() });
    }
    const countrySearchTerm = sessionStorage.getItem("countrySearchTerm");
    if (countrySearchTerm !== null) {
      this.setState({ countrySearchTerm: countrySearchTerm });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
    sessionStorage.setItem([name], value);
  }

  /**
   * Searches the sportEvent visual. If no visual exists it will be a visual taken corresponding to the sport of the sportEvent.
   * @param {sportEvent} object sportEvent
   * @returns {file name} string file name of the sportEvent visual
   */
  renderEventVisual(sportEvent, sports = this.props.sports.sports) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.floor(num);
    };

    if (sportEvent.visual !== null && sportEvent.visual.length > 3) {
      //to be done: check if file exists
      return sportEvent.visual;
    } else {//doesn't work sustainable. Timing issue?
      let sporttype = sports.filter(
        (sport) => sport._id === sportEvent.races[0].race.sport
      )[0];
      console.log("bild: ", sporttype.abbr + "_" + random(1, 3) + ".jpg");

      return "assets/images/event-visuals/" + sporttype.abbr + "_" + random(1, 3) + ".jpg";
    }
  }

  /**
   * Renders the card view for a sport event
   * @param {sportEvent} object sportEvent
   * @returns card view of an event
   */
  renderEventCard(eventDate) {
    
    console.log("sportEvent from renderEvntCard: ", eventDate);
    return (
      <div key={eventDate._id} className="col-12 col-md-6 col-lg-4">
        <Card className="h-100 text-white bg-dark">
          <CardBody>
            <Link
              className="text-decoration-none text-white"
              to={`/eventcalendar/${eventDate._id}`} /*link to the sportEvent details */
            >
              <CardImg
                className="card-img-over mb-3"
                src={
                  // "/assets/images/event-visuals/" +
                  baseUrl + this.renderEventVisual(eventDate.sportEvent)
                }
                alt=""
              />
              <CardImgOverlay>
                <CardTitle>
                  <div className="bg-dark-transparent">
                    <h6 className="">
                      <div className="row">
                        <span className="col-10">
                          {}
                          {eventDate.start
                            ? new Intl.DateTimeFormat("de-DE", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(new Date(Date.parse(eventDate.start)))
                            : "nicht terminiert"}

                          {eventDate.end &&
                          eventDate.start &&
                          eventDate.end !== eventDate.start ? (
                            <span>
                              {" "}
                              -{" "}
                              {new Intl.DateTimeFormat("de-DE", {
                                year: "numeric",
                                month: "short",
                                day: "2-digit",
                              }).format(new Date(Date.parse(eventDate.end)))}
                            </span>
                          ) : null}
                          {/*renders sportEvent.end only if itself and sportEvent.start exist and != null */}
                        </span>
                        <span className="col-2">
                          <img
                            className="img-fluid"
                            src={
                              baseUrl +
                              "assets/images/country-flags/svg/" +
                              eventDate.sportEvent.country.countryCode.toLowerCase() +
                              ".svg"
                            }
                            alt={eventDate.sportEvent.country.countryCode}
                            align="absmiddle"
                          />
                        </span>
                      </div>
                      {/* / .row */}
                    </h6>
                    <h4 className="">{eventDate.sportEvent.name}</h4>
                  </div>
                  {/* /.bg-dark-transparent */}
                </CardTitle>
              </CardImgOverlay>
              <CardText>
                <h6 className="mt-2 text-muted">
                  {eventDate.sportEvent.organiser.name}
                </h6>
                <p className="text-muted">
                  <small>
                    in {eventDate.sportEvent.postalCode}{" "}
                    {eventDate.sportEvent.city}
                  </small>
                </p>
                <hr />
                <ul className="list-unstyled">
                  {eventDate.sportEvent.races.map((race) => {
                    return <li>{race.name}</li>;
                  })}
                </ul>
              </CardText>
            </Link>
            <a
              className="mt-auto card-link text-decoration-none"
              href={eventDate.sportEvent.homepage}
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon="globe" /> Homepage
            </a>
          </CardBody>
        </Card>
      </div> /** /key=sportEvent.id */
    );
  }

  render() {       
    const eventCalendar = this.props.eventDates.eventDates
      .filter((eventDate) => {
        //Filter by start date
        if (this.state.dateSearchTerm === "") {
          return eventDate;
        } else if (
          new Date(eventDate.start).getTime() >=
          new Date(
            this.state.dateSearchTerm
          ).getTime() /** to handle date = "" */
        ) {
          return eventDate;
        }
      })
      .filter((eventDate) => {
        //Filter by sportEvent name, race name, postalCode, city
        if (this.state.eventSearchTerm === "") {
          return eventDate;
        } else if (
          eventDate.sportEvent.name
            .toLowerCase()
            .includes(this.state.eventSearchTerm.toLowerCase()) ||
          eventDate.sportEvent.postalCode
            .toString()
            .startsWith(this.state.eventSearchTerm) ||
          eventDate.sportEvent.city
            .toLowerCase()
            .startsWith(this.state.eventSearchTerm.toLowerCase()) ||
          eventDate.sportEvent.races.find((race) =>
            race.race.name.toLowerCase().includes(this.state.eventSearchTerm)
          ) //Searches in the nested array "races" for "race.name"        )
        ) {
          return eventDate;
        }
      })
      .filter((eventDate) => {
        //Filter by country
        if (this.state.countrySearchTerm === "") {
          //If no search term for country exists
          return eventDate;
        } else if (
          eventDate.sportEvent.country.countryNameDe
            .toLowerCase()
            .startsWith(this.state.countrySearchTerm.toLowerCase())
        ) {
          return eventDate;
        }
      })
      //Sort by start date and sportEvent name
      .sort((a, b) => a.sportEvent.name > b.sportEvent.name)
      .sort((a, b) => a.start > b.start)
      .map((eventDate) => {
        return this.renderEventCard(eventDate);
      });
    

    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Veranstaltungen</BreadcrumbItem>
          </Breadcrumb>
          <h1>Veranstaltungskalender</h1>
          <hr />
          {/* input fields for event search and event filter */}
          <Row>
            <Col md={5}>
              <Label htmlFor="eventSearchTerm">Veranstaltung:</Label>
              <InputGroup>
                <Input
                  type="search"
                  id="eventSearchTerm"
                  name="eventSearchTerm"
                  placeholder="Name, PLZ, Ort ..."
                  value={this.state.eventSearchTerm}
                  aria-describedby="eventSearchTermHelp"
                  onChange={this.handleInputChange}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon="search" />
                </span>
              </InputGroup>
              <div className="form-text" id="eventSearchTermHelp">
                Name, Postleitzahl oder Ort eingeben.
              </div>
            </Col>
            {/* / md-5 */}

            <Col md={3}>
              <Label htmlFor="dateSearchTerm">Datum:</Label>
              <InputGroup>
                <Input
                  type="date"
                  id="dateSearchTerm"
                  name="dateSearchTerm"
                  placeholder="TT.MM.JJJJ"
                  value={this.state.dateSearchTerm}
                  aria-describedby="dateSearchTermHelp"
                  onChange={this.handleInputChange}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon="calendar-alt" />
                </span>
              </InputGroup>
              <div className="form-text" id="dateSearchTermHelp">
                Startdatum eingeben.
              </div>
            </Col>
            {/* / md-3 */}

            <Col md={4}>
              <Label htmlFor="countrySearchTerm">Land:</Label>
              <InputGroup>
                <Input
                  type="text"
                  id="countrySearchTerm"
                  name="countrySearchTerm"
                  placeholder="Land ..."
                  value={this.state.countrySearchTerm}
                  aria-describedby="countrySearchHelp"
                  list="countriesDe"
                  autoComplete="off"
                  onChange={this.handleInputChange}
                />
                <span className="input-group-text">
                  <FontAwesomeIcon icon="flag" />
                </span>
              </InputGroup>
              <div className="form-text" id="countrySearchHelp">
                L??ndername eingeben.
              </div>
            </Col>
            {/* / md-4 */}
          </Row>
          {/* datalist for country search input field */}
          <datalist id="countriesDe">
            {this.props.countries
              .filter((country) => {
                if (this.state.countrySearchTerm === null) {
                  //do nothing
                } else if (
                  country.countryNameDe
                    ? country.countryNameDe
                        .toLowerCase()
                        .startsWith(
                          this.state.countrySearchTerm.toLocaleLowerCase()
                        )
                    : "" ||
                      country.countryNameEn
                        .toLowerCase()
                        .startsWith(
                          this.state.countrySearchTerm.toLocaleLowerCase()
                        )
                ) {
                  return country;
                }
              })
              .map((country) => {
                return country.countryNameDe ? (
                  <option value={country.countryNameDe}></option>
                ) : (
                  <option value={country.countryNameEn}></option>
                );
              })}
          </datalist>
        </div>
        <div className="br-icon text-center">
          <Link to={`/createsportevent`}>
            {/*link to the create a sportEvent */}
            <FontAwesomeIcon icon="plus-circle" size="3x" />
          </Link>
          <p className="text-muted">Veranstaltung hinzuf??gen&nbsp;</p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {this.props.eventDates.isLoading ? (
            <div className="container">
              <div className="row text-center">
                <Loading text="Veranstaltungen werden gesucht ..." />
              </div>
            </div>
          ) : this.props.eventDates.errMess ? (
            <div className="container">
              <div className="row">
                <h4>{this.props.eventDates.errMess}</h4>
              </div>
            </div>
          ) : eventCalendar.length !== 0 ? (
            eventCalendar
          ) : (
            <div className="container">
              <div className="row co-12 text-center">
                <h6>
                  Die Suche ergab leider kein Ergebnis.&nbsp;&nbsp;
                  <FontAwesomeIcon icon="sad-tear" color="#bbb" size="lg" />
                </h6>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default EventCalendar;
