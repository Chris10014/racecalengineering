import React, { Component } from "react";
import { Card, CardHeader, CardText, CardBody, CardTitle } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SportEventDetail from "./SportEventDetailComponent";



class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSportEvent: null
    };
  }
   
  onSportEventSelect(sportEventId) {
    this.setState({selectedSportEvent: sportEventId});
}
    

    render() {
        const race = this.props.sportEvents.map((sportEvent) => {
          return (
            <div className="col-12 col-md-4 m-1">
              <Card key={sportEvent.id} dark color="dark">   
                <CardBody>
                  <div className="clickable" onClick={() => this.onSportEventSelect(sportEvent)}>
                    <CardTitle>
                    <p>
                    {sportEvent.start}
                    {sportEvent.end ? (<span> - {sportEvent.end}</span>) : null}{" "} {/* renders only if(sportEvent.end != null) */}               
                  </p>
                      <div className="row col-12">
                        <h5 class="card-title col-9">{sportEvent.name}</h5>
                        <div className="col-3">
                          <img src={`assets/images/country-flags/svg/${sportEvent.countryCode}.svg`} alt={sportEvent.countryCode} max-width="100%" />
                        </div>
                      </div>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {sportEvent.host}
                      </h6>
                      {/* {this.props.countries.filter((country) => country.countryCode === sportEvent.countryCode)[0].countryNameEn} */}
                    </CardTitle>
                    <hr />
                    <CardText>
                      <p>Wettbewerbe</p>                      
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

                  <a href={sportEvent.homepage} target="_blank" className="card-link text-decoration-none" rel="noreferrer">
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
                  <SportEventDetail selectedSportEvent={this.state.selectedSportEvent} />
                  {/* {this.renderSportEvent(this.props.selectedSportEvent)} */}
                </div>
              </div>
          </div> 
        );
    }
}

export default Races;