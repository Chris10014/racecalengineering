/* eslint-disable array-callback-return */
import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import InputField from "./InputFieldComponent";


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
      countrySearchTerm: ""
    };

    this.handleOnChangeEventSearch = this.handleOnChangeEventSearch.bind(this);
    this.handleOnChangeDateSearch = this.handleOnChangeDateSearch.bind(this);
    this.handleOnChangeCountrySearch = this.handleOnChangeCountrySearch.bind(this);
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

  handleOnChangeEventSearch(searchTerm) {
    this.setState({ eventSearchTerm: searchTerm });
    sessionStorage.setItem("eventSearchTerm", searchTerm);
  }

  handleOnChangeDateSearch(searchTerm) {
    this.setState({ dateSearchTerm: searchTerm });
    sessionStorage.setItem("dateSearchTerm", searchTerm);
  }

  handleOnChangeCountrySearch(searchTerm) {
    this.setState({ countrySearchTerm: searchTerm });
    sessionStorage.setItem("countrySearchTerm", searchTerm);
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
 
  render() {

    /**
     * Find the country code of the fist country in the countries object which matches the countrySearchTerm
     * @input object countries as object 
     * 
     * @returns object first country with the matching search pattern or undefined 
     */
    const findCountry = this.props.countries.find((country) => {
      if((country.countryNameDe ? country.countryNameDe : country.countryNameEn).toLowerCase().startsWith(this.state.countrySearchTerm.toLowerCase())) {
          return country.countryCode; //Be carefull: findCountry can return undefined
      }
    })

    // eslint-disable-next-line array-callback-return
    const eventCalendar = this.props.sportEvents
      // eslint-disable-next-line array-callback-return
      .filter((sportEvent) => { //Country filter
        if (this.state.countrySearchTerm === "") { //If no search term for country exists
          return sportEvent;
        } else if (sportEvent.countryCode === (typeof findCountry !== "undefined" ? findCountry.countryCode : ""))
         {
          return sportEvent;
        }
      // eslint-disable-next-line array-callback-return
      }).filter((sportEvent) => { //Date filter
        if(this.state.dateSearchTerm === "") {
          return sportEvent
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
      .filter((sportEvent) => { //Event name filter
        if (
          this.state.eventSearchTerm === ""
        ) {
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
      }).map((sportEvent) => {
        return (
          <div key={sportEvent.id} className="col-12 col-md-6 col-lg-4">
            <Card className="h-100 text-white bg-dark">
              <CardBody>
                <Link
                  className="text-decoration-none text-white"
                  to={`/eventcalendar/${sportEvent.id}`}
                >
                  {/*link to the sportEvent details */}
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
                              ) : null}{" "}
                              {/*renders sportEvent.end only if itself and sportEvent.start exist and != null */}
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
                      </div>
                      {/* /.bg-dark-transparent */}
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
          <div className="row">
            <div className="col-12 col-md-5">
              <InputField
                id="eventSearch"
                type="search"
                label="Veranstaltung"
                placeholder="Name, PLZ oder Ort ..."
                text="Name, Postleitzahl oder Ort eingeben."
                icon="search"
                value={this.state.eventSearchTerm}
                onChange={(event) => {
                  this.handleOnChangeEventSearch(event.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-3">
              <InputField
                id="dateSearch"
                type="date"
                label="Datum"
                placeholder="Suche Vernstaltungen ab Datum ..."
                text="Startdatum eingeben."
                icon="calendar-alt"
                value={this.state.dateSearchTerm}
                onChange={(event) => {
                  this.handleOnChangeDateSearch(event.target.value);
                }}
              />
            </div>
            <div className="col-12 col-md-4">  
              <InputField
                id="countrySearch"
                type="text"
                list="countriesDe"
                label="Land"
                placeholder="Land ..."
                text="Ländername eingeben."
                icon="flag"
                value={this.state.countrySearchTerm}
                onChange={(event) => {
                  this.handleOnChangeCountrySearch(event.target.value);
                }}
              />
              <datalist id="countriesDe">
                {this.props.countries.map((country) => {
                  return (
                   country.countryNameDe ?
                    <option value={country.countryNameDe}></option> :
                    <option value={country.countryNameEn}></option>
                  );                  
                })}               
              </datalist>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {eventCalendar.length !== 0 ? (
              eventCalendar
            ) : (
              <p>
                Die Suche ergab leider kein Ergebnis.{" "}
                <FontAwesomeIcon icon="sad-tear" size="lg" />
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EventCalendar;