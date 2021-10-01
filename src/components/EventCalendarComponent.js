/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Row, Label, Input, InputGroup, Col } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";


class EventCalendar extends Component {
  constructor(props) {
    super(props);

    const today = new Date().toLocaleString("de-DE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }); // Creates today's date as dd.mm.yyyy

    this.state = {
      eventSearchTerm: "",
      dateSearchTerm: today.split(".").reverse().join("-"), //Converts the today's date (default value) into format yyy-mm-dd to be compatible with html 5
      countrySearchTerm: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);

  }

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
    if (dateSearchTerm !== null) {
      this.setState({ dateSearchTerm: dateSearchTerm });
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
  renderEventVisual(sportEvent) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.floor(num);
    };

    if (sportEvent.visual != null && sportEvent.visual.length > 3) {
      //to be done: check if file exists
      return sportEvent.visual;
    } else {
      return (
        sportEvent.races[0].sport.toLowerCase() + "_" + random(1, 3) + ".jpg"
      );
    }
  }

  /**
   * Renders the card view for a sport event
   * @param {sportEvent} object sportEvent
   * @returns card view of an event
   */
  renderEventCard(sportEvent) {
    return (
      <div key={sportEvent.id} className="col-12 col-md-6 col-lg-4">
        <Card className="h-100 text-white bg-dark">
          <CardBody>
            <Link
              className="text-decoration-none text-white"
              to={`/eventcalendar/${sportEvent.id}`} /*link to the sportEvent details */
            >
              <CardImg
                className="card-img-over mb-3"
                src={
                  "/assets/images/event-visuals/" +
                  this.renderEventVisual(sportEvent)
                }
                alt=""
              />
              <CardImgOverlay>
                <CardTitle>
                  <div className="bg-dark-transparent">
                    <h6 className="">
                      <div className="row">
                        <span className="col-10">
                          {sportEvent.start
                            ? sportEvent.start
                            : "nicht terminiert"}
                          {sportEvent.end && sportEvent.start ? (
                            <span> - {sportEvent.end}</span>
                          ) : null}{/*renders sportEvent.end only if itself and sportEvent.start exist and != null */}
                        </span>
                        <span className="col-2">
                          <img
                            className="img-fluid"
                            src={
                              "assets/images/country-flags/svg/" +
                              sportEvent.countryCode.toLowerCase() +
                              ".svg"
                            }
                            alt={sportEvent.countryCode}
                            align="absmiddle"
                          />
                        </span>
                      </div>
                      {/* / .row */}
                    </h6>
                    <h4 className="">{sportEvent.name}</h4>
                  </div>{/* /.bg-dark-transparent */}
                </CardTitle>
              </CardImgOverlay>
              <CardText>
                <h6 className="mt-2 text-muted">{sportEvent.host}</h6>
                <p className="text-muted">
                  <small>
                    in {sportEvent.postalCode} {sportEvent.city}
                  </small>
                </p>
                <hr />
                <ul className="list-unstyled">
                  {sportEvent.races.map((race) => {
                    return <li>{race.name}</li>;
                  })}
                </ul>
              </CardText>
            </Link>
            <a
              className="mt-auto card-link text-decoration-none"
              href={sportEvent.homepage}
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
    /**
     * Find the country code of the fist country in the countries object which matches the countrySearchTerm
     * @input object countries as object
     *
     * @returns object first country with the matching search pattern or undefined
     */
    const findCountry = this.props.countries.find((country) => {
      if (
        (country.countryNameDe ? country.countryNameDe : country.countryNameEn)
          .toLowerCase()
          .startsWith(this.state.countrySearchTerm.toLowerCase())
      ) {
        return country.countryCode; //Be carefull: findCountry can return undefined
      }
    });

    // eslint-disable-next-line array-callback-return
    const eventCalendar = this.props.sportEvents.sportEvents
      // eslint-disable-next-line array-callback-return
      .filter((sportEvent) => {
        //Country filter
        if (this.state.countrySearchTerm === "") {
          //If no search term for country exists
          return sportEvent;
        } else if (
          sportEvent.countryCode ===
          (typeof findCountry !== "undefined" ? findCountry.countryCode : "")
        ) {
          return sportEvent;
        }
        // eslint-disable-next-line array-callback-return
      })
      .filter((sportEvent) => {
        //Date filter
        if (this.state.dateSearchTerm === "") {
          return sportEvent;
        } else if (
          new Date(sportEvent.start.split(".").reverse().join("-")).getTime() >=
          new Date(
            this.state.dateSearchTerm
          ).getTime() /** to handle date = "" */
        ) {
          return sportEvent;
        }
      })
      .sort((a, b) => a.start < b.start)
      // eslint-disable-next-line array-callback-return
      .filter((sportEvent) => {
        //Event name filter
        if (this.state.eventSearchTerm === "") {
          return sportEvent;
        } else if (
          sportEvent.name
            .toLowerCase()
            .includes(this.state.eventSearchTerm.toLowerCase()) ||
          sportEvent.postalCode.startsWith(this.state.eventSearchTerm) ||
          sportEvent.city
            .toLowerCase()
            .startsWith(this.state.eventSearchTerm.toLowerCase()) ||
          sportEvent.races.find((race) =>
            race.name.toLowerCase().includes(this.state.eventSearchTerm)
          ) //Searches in the nested array "races" for "race.name"        )
        ) {
          return sportEvent;
        }
      })
      .map((sportEvent) => {
        //Maps through the filtered sportEvents object
        return this.renderEventCard(sportEvent);
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
              <Label htmlFor="eventSearchTerm">
                Veranstaltung:
              </Label>
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
            </Col>{/* / md-5 */}

            <Col md={3}>
              <Label htmlFor="dateSearchTerm">
                Datum:
              </Label>
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
            </Col>{/* / md-3 */}

            <Col md={4}>
              <Label htmlFor="countrySearchTerm">
                Land:
              </Label>
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
                Ländername eingeben.
              </div>
            </Col>{/* / md-4 */}
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
                        .startsWith(this.state.countrySearchTerm)
                    : "" ||
                      country.countryNameEn
                        .toLowerCase()
                        .startsWith(this.state.countrySearchTerm)
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
        <div className="row row-cols-1 row-cols-md-3 g-4 mt-1">
          {this.props.sportEvents.isLoading ? (
            <div className="container">
              <div className="row text-center">
                <Loading text="Veranstaltungen werden gesucht ..." />
              </div>
            </div>
          ) : this.props.sportEvents.errMess ? (
            <div className="container">
              <div className="row">
                <h4>this.props.sportEvents.errMess</h4>
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