import React, { Component } from "react";
import { Card, CardDeck, CardColumns, CardText, CardBody, CardTitle } from "reactstrap";



class Races extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedSportEvent: null            
        }
    }

    onSportEventSelect(sportEvent) {
        this.setState({selectedSportEvent: sportEvent});
    }

    renderSportEvent(sportEvent) {
        if (sportEvent != null) {
            return(
                <Card dark color="dark">
                <CardBody>
                    <CardTitle>
                        <h5 class="card-title">{sportEvent.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{sportEvent.host}</h6>
                    </CardTitle>
                    <CardText>Mehr Details</CardText>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </CardBody>
            </Card>

            );
           
        } else {
            return null;
        }
    }

    render() {
        const race = this.props.sportEvents.map((sportEvent) => {
          return (
            <div className="col-12 col-md-4 m-1">
              <Card className="clickable"
                key={sportEvent.id}
                dark
                color="dark"
                onClick={() => this.onSportEventSelect(sportEvent)}
              >
                <CardBody>
                  <CardTitle>
                    <div className="row col-12">
                      <h5 class="card-title col-9">{sportEvent.name}</h5>
                      <div className="offset--1 col-2">
                        <img src={`assets/images/country-flags/svg/${sportEvent.countryCode}.svg`} alt={sportEvent.countryCode} width="50" />
                      </div>
                    </div>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {sportEvent.host}
                    </h6>
                    {/* {this.props.countries.filter((country) => country.countryCode === sportEvent.countryCode)[0].countryNameEn} */}
                  </CardTitle>
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
                  <a href="#" class="card-link">
                    Card link
                  </a>
                  <a href="#" class="card-link">
                    Another link
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
                </div> {/* / .row */}
                <div className="row">
                    <div className="col-12 col-md-4 m-1">
                        {this.renderSportEvent(this.state.selectedSportEvent)}
                    </div>
                </div>
            </div> /* / .container */
        );
    }
}

export default Races;