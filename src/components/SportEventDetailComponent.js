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
                    <div key={eventPart.id} className="col-12 mt-3">
                      <Card className="h-100 text-white bg-dark">
                        <CardBody>                          
                            {/* <CardImg width="100%" src={"assets/images/event-visuals/" + (this.props.sportEvent.visual)} alt="" /> */}
                          
                              <CardTitle>                                  
                                  <h1>
                                    {eventPart.name}
                                  </h1>
                                  <h6>
                                    <div className="row">
                                      <span className="col-10">
                                        {this.props.sportEvent.end ? eventPart.start : null}
                                      </span>                                      
                                    </div>
                                  </h6>                               
                              </CardTitle>                                                               
                            <CardText>                     
                              <h4 className="mt-2">{this.props.sports.filter((sport) => sport.code.toLowerCase() === eventPart.sport.toLowerCase())[0].de}</h4>
                              <p className="">{eventPart.endurance.de}</p>
                              <hr />
                              
                               <p>{eventPart.courses[1] ? "Strecken" : "Strecke"}</p>
                                {eventPart.courses.map((course) => {
                                  return(
                                  <span>                                     
                                        {this.props.sports.filter((sport) => sport.code === course.sport)[0].de}:&nbsp;{course.distance} km &nbsp;
                                 
                                     </span>
                                      
                                  );
                                })}                      
                                                 
                            </CardText>
                                        
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
                <h3>{this.props.sportEvent.host}</h3>
                <h3>{this.props.sportEvent.postalCode} {this.props.sportEvent.city}</h3>
            
                <hr />
                <h2>{this.props.sportEvent.start} {this.props.sportEvent.end ? <span> - {this.props.sportEvent.end}</span> : null}</h2>
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