import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Media } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

    render() {
        const race = this.props.sportEvents.map((sportEvent) => {
          return (
            <div key={sportEvent.id} className="col-12 col-md-4">
              <Card className="h-100 text-white bg-dark">
              
                <CardBody>
                  <div>
                  <Link className="text-decoration-none text-white" to={`/races/${sportEvent.id}`}>
                    <CardImg width="100%" src={"assets/images/event-visuals/" + (sportEvent.visual)} alt="" />
                    <CardImgOverlay>
                      <CardTitle>
                        <div className="milky-background">
                          <h2 className="sport-event-name">
                            <div className="row">
                              <span className="col-10">
                                {sportEvent.start} {sportEvent.end ? (<span> - {sportEvent.end}</span>) : null}{/**renders sportEvent.end only if it exists and != null */}
                              </span>
                              <span className="col-2">
                                <img className="img-fluid" src={"assets/images/country-flags/svg/" + (sportEvent.countryCode).toUpperCase() + ".svg"} alt="" align="absmiddle" />
                              </span>
                            </div>
                          </h2>
                          <h1 className="sport-event-name">
                            {sportEvent.name}
                          </h1>
                        </div>{/** /.milky-background sport-event-name */}
                      </CardTitle>
                    </CardImgOverlay>                                   
                    <CardText>                     
                      <h6 className="mt-2 text-muted">{sportEvent.host}</h6>
                      <p className="text-muted"><small>in {sportEvent.postalCode} {sportEvent.city}</small></p>
                      <hr />
                      <ul className="list-unstyled">
                        {sportEvent.races.map((race) => {
                          return(
                            <li>{race.name}</li>
                          );
                        })}                      
                      </ul>                    
                    </CardText>
                </Link>

                  </div>{/** /.clickable */}                  
                  <a className="mt-auto card-link text-decoration-none" href={sportEvent.homepage} target="_blank" rel="noreferrer"><FontAwesomeIcon icon="globe" /> Homepage</a>
                </CardBody>
              </Card>
            </div>/** /key=sportEvent.id */
          );
        });

        return (
          <div className="container">
            <div className="row">
              <h1>Veranstaltungskalender</h1>
              <hr />
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {race}
              </div>              
            </div>
          </div>
        );
    }
}

export default Races;