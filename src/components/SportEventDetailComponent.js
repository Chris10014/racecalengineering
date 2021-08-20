import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

class SportEventDetail extends Component {
    constructor(props) {
      super(props);
      this.state = {
       
      };
    }

    renderGlyph(param) {
  switch (param) {
    case "swim":
      return "swimmer";
    case "bike":
      return "biking";
    case "ctf":
      return "biking";
    case "rtf":
      return "biking";
    case "mtb":
      return "biking";
    case "run":
      return "running";
    case "walk":
      return "walking";
    case "dot":
      return "circle";

    default:
      return "question";
  }
}
  
      render() {
          if(this.props.sportEvent != null) {
          const competitions = this.props.sportEvent.races.map((race) => {
                 return (
                    <div key={race.id} className="col-12 mt-3">
                      <Card className="h-100 text-white bg-dark">
                        <CardBody>                          
                            {/* <CardImg width="100%" src={"assets/images/event-visuals/" + (this.props.sportEvent.visual)} alt="" /> */}
                          
                              <CardTitle>                                  
                                  <h1>
                                    {race.name}
                                  </h1>
                                  <h6>
                                    <div className="row">
                                      <span className="col-10">
                                        {this.props.sportEvent.end ? race.start : null}
                                      </span>                                      
                                    </div>
                                  </h6>                               
                              </CardTitle>                                                               
                            <CardText>   
                                            
                              <h4 className="inline mt-2">{this.props.sports.filter((sport) => sport.code.toLowerCase() === race.sport.toLowerCase())[0].de}</h4>&nbsp;
                              { race.endurance.de ? <code className="text-white"><p className="inline"> /&nbsp;{race.endurance.de}</p></code>
                               : null  }                        
                              <hr />                              
                              <p>{race.courses[1] ? "Strecken" : "Strecke"}</p>
                                {race.courses.map((course, index) => {
                                  return(
                                  <span> 
                                    <FontAwesomeIcon icon={this.renderGlyph(course.sport.toLowerCase())} size="lg"/>&nbsp;{course.distance} km
                                    { (index < (race.courses.length - 1)) ?  <code className="text-white text-muted">&nbsp;<FontAwesomeIcon icon={this.renderGlyph('dot')} size="xs"/>&nbsp;</code> : null}
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
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/eventcalendar">Veranstaltungen</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>{this.props.sportEvent.name}</BreadcrumbItem>
                </Breadcrumb>
                <h1>{this.props.sportEvent.name}</h1>
                <h3>{this.props.sportEvent.host}</h3>
                <h3>
                  {this.props.sportEvent.postalCode}{" "}
                  {this.props.sportEvent.city}
                </h3>

                <hr />
                <h2>
                  {this.props.sportEvent.start}{" "}
                  {this.props.sportEvent.end ? (
                    <span> - {this.props.sportEvent.end}</span>
                  ) : null}
                </h2>
                <div className="row">{competitions}</div>
              </div>
            </div>
          );
      } else {
          return null;
      }
  }
}
  
export default SportEventDetail;