import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Media } from "reactstrap";

// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SportEventDetail from "./SportEventDetailComponent";



class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSportEvent: null,
    };
  }

  onSportEventSelect(sportEvent) {
    this.setState({ selectedSportEvent: sportEvent });
  }

  render() {
    const race = this.props.sportEvents.map((sportEvent) => {
      return (
        <div className="col-12 col-md-4 m-1">
          <Card>
            <CardBody>
              <div
                className="clickable"
                onClick={() => this.onSportEventSelect(sportEvent)}
              >
                <CardImg width="100%" src={sportEvent.visual} alt="" />
                <CardTitle>
                  <p className="">
                    {sportEvent.start}
                    {sportEvent.end ? ( <span> - {sportEvent.end}</span> ) : null} {/* renders sportEvent.end only if(sportEvent.end != null) */}
                  </p>
                  <CardImgOverlay>
                    <div className="milky-background">
                      <h5 className="card-title col-9 sport-event-name">
                        {sportEvent.name}
                      </h5>
                      {/* <div className="col-3">
                          <img src={`assets/images/country-flags/svg/${sportEvent.countryCode}.svg`} alt={sportEvent.countryCode} max-width="100%" />
                        </div> */}
                    </div>{/* / .milky-background */}
                  </CardImgOverlay>
                  <Media>
                    <Media right middle>
                      <Media
                        object
                        className="card-country-flag"
                        src={ "assets/images/country-flags/svg/" + sportEvent.countryCode + ".svg" }
                        alt=""
                      />
                    </Media>
                    <Media body className="ml-5">
                      <Media heading>
                        <h6>{sportEvent.host}</h6>
                      </Media>
                      {/* {this.props.countries.filter((country) => country.countryCode === sportEvent.countryCode)[0].countryNameEn} */}
                      <p>
                        <small>
                          in {sportEvent.postalCode} {sportEvent.city}
                        </small>
                      </p>
                    </Media>
                    {/* <div className="col-3">
                          <img src={ "assets/images/country-flags/svg/" + sportEvent.countryCode + ".svg"} alt={sportEvent.countryCode} max-width="50%" />
                        </div> */}
                  </Media>
                </CardTitle>
                <hr />
                <CardText>
                  <ul className="list-unstyled">
                    {sportEvent.races.map((race) => {
                      return (
                        <li>
                          <small>{race.name}</small>
                        </li>
                      );
                    })}
                  </ul>
                </CardText>
              </div>
              <a
                href={sportEvent.homepage}
                target="_blank"
                className="card-link text-decoration-none"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon="globe" /> Homepage
              </a>
            </CardBody>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <h1>Veranstaltungskalender</h1>
          {race}
        </div>
        <div className="row">
          <div className="">
            <SportEventDetail
              selectedSportEvent={this.state.selectedSportEvent}
            />
            {/* {this.renderSportEvent(this.props.selectedSportEvent)} */}
          </div>
        </div>
      </div>
    );
  }
}

export default Races;