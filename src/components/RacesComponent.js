import React, { Component } from "react";
import { Card, CardHeader, CardText, CardBody, CardTitle } from "reactstrap";



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
            return (
              <Card dark color="dark">
                <CardBody>
                  <CardTitle>
                    <h5 class="card-title">{sportEvent.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">
                      {sportEvent.host}
                    </h6>
                  </CardTitle>
                  <CardText>Mehr Details</CardText>
                  <a href="#" class="card-link">
                    Card link
                  </a>
                  <a href="#" class="card-link">
                    Offizielle Homepage
                  </a>
                </CardBody>
              </Card>
            );
           
        } else {
            return null;
        }
    }
// {'item.designation ? (
//                 <CardSubtitle>{item.designation}</CardSubtitle>
//               ) : null}'
    render() {
        const race = this.props.sportEvents.map((sportEvent) => {
          return (
            <div className="col-12 col-md-4 m-1">
              <Card key={sportEvent.id} dark color="dark">
                <CardHeader>
                  <p><strong>
                    {sportEvent.start}
                    {sportEvent.end ? (<span> - {sportEvent.end}</span>) : null}{" "} {/* renders only if(sportEvent.end != null) */}
                  </strong>                    
                  </p>
                </CardHeader>
                <CardBody>
                  <div className="clickable" onClick={() => this.onSportEventSelect(sportEvent)}>
                    <CardTitle>
                      <div className="row col-12">
                        <h5 class="card-title col-9">{sportEvent.name}</h5>
                        <div className="col-2">
                          <img src={`assets/images/country-flags/svg/${sportEvent.countryCode}.svg`} alt={sportEvent.countryCode} width="50" />
                        </div>
                      </div>
                      <h6 class="card-subtitle mb-2 text-muted">
                        {sportEvent.host}
                      </h6>
                      {/* {this.props.countries.filter((country) => country.countryCode === sportEvent.countryCode)[0].countryNameEn} */}
                    </CardTitle>
                    <CardText className="text-end">
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

                  <a href={sportEvent.website} target="_blank" class="card-link" rel="noreferrer">
                    <span className="fas fa-globe"></span> Website
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
                <div className="col-12 col-md-4 m-1">
                  {this.renderSportEvent(this.state.selectedSportEvent)}
                </div>
              </div>
          </div> 
        );
    }
}

export default Races;