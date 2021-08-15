import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Media } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Races extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

    render() {
        const race = this.props.sportEvents.map((sportEvent) => {
          return (
            <div key={sportEvent.id} className="col-12 col-md-4 m-1">
              <Card>
                <CardBody>
                  <div className="clickable" onClick={() => this.props.onClick(sportEvent.id)}>
                    <CardImg width="100%" src={"assets/images/event-visuals/" + sportEvent.visual} alt="" />
                    <CardImgOverlay>
                      <CardTitle>
                        <div className="milky-background sport-event-name">
                        <h6>{sportEvent.start} {sportEvent.end ? ( <span> - {sportEvent.end}</span>) : null}</h6>{/**renders sportEvent.end only if it exists and != null */}
                        <h5 className="">
                          {sportEvent.name}
                        </h5>                        
                      </div>{/** /.milky-background sport-event-name */}
                      </CardTitle>                   
                    </CardImgOverlay>                                   
                    <CardText>                     
                      <h6>{sportEvent.host}</h6>
                      <p><small>in {sportEvent.postalCode} {sportEvent.city}</small></p>
                      <hr />
                      <ul className="list-unstyled">
                        {sportEvent.races.map((race) => {
                          return(
                            <li><small>{race.name}</small></li>
                          );
                        })}                      
                      </ul>                    
                    </CardText>
                  </div>{/** /.clickable */}                  
                  <a className="card-link text-decoration-none" href={sportEvent.homepage} target="_blank" rel="noreferrer"><FontAwesomeIcon icon="globe" /> Homepage</a>
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
              {race}
            </div>
          </div>
        );
    }
}

export default Races;