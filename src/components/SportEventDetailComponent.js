import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody, CardTitle, CardImg, CardImgOverlay } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SportEventDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
       
      };
    }
  
      render() {
          if(this.props.sportEvent != null) {
          const competition = this.props.sportEvent.races.map((eventPart) => {
                 return (
                    <div key={eventPart.id} className="col-12 col-md-6 mt-5">
                      <Card className="h-100 text-white bg-dark">
                        <CardBody>
                          <div>
                            <CardImg width="100%" src={"assets/images/event-visuals/" + (this.props.sportEvent.visual)} alt="" />
                            <CardImgOverlay>
                              <CardTitle>
                                <div className="milky-background">
                                  <h2>
                                    <div className="row">
                                      <span className="col-10">
                                        {eventPart.start}
                                      </span>
                                      
                                    </div>
                                  </h2>
                                  <h1>
                                    {eventPart.name}
                                  </h1>
                                </div>{/** /.milky-background sport-event-name */}
                              </CardTitle>
                            </CardImgOverlay>                                   
                            <CardText>                     
                              <h6 className="mt-2 text-muted">{eventPart.sport}</h6>
                              <p className="text-muted">{eventPart.endurance}</p>
                              <hr />
                              <ul className="list-unstyled">
                                {eventPart.courses.map((course) => {
                                  return(
                                    <li>{course.type}</li>
                                  );
                                })}                      
                              </ul>                    
                            </CardText>
                          </div>{/** /.clickable */}                  
                          <a className="mt-auto card-link text-decoration-none" href={this.props.sportEvent.homepage} target="_blank" rel="noreferrer"><FontAwesomeIcon icon="globe" /> Homepage</a>
                        </CardBody>
                      </Card>
                    </div>/** /key=sportEvent.id */
                  );

              
            
          } 
          );
  
          return (
            <div className="container">
              <div className="row">
                <h1>{this.props.sportEvent.name}</h1>
                <hr />
                <div className="row">
                  {competition}
                </div>              
              </div>
            </div>
          );
      } else {
          return null;
      }
  }
}
  
export default SportEventDetail;