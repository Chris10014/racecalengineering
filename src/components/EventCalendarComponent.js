import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


class EventCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const eventCalendar = this.props.sportEvents.map((sportEvent) => {
      return (
        <div key={sportEvent.id} className="col-12 col-md-6 col-lg-4">
          <Card className="h-100 text-white bg-dark">
            <CardBody>              
                <Link
                  className="text-decoration-none text-white"
                  to={`/eventcalendar/${sportEvent.id}`}
                >{/*link to the sportEvent details */}
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
                              {sportEvent.start ? (
                                sportEvent.start
                              ) : (                                
                                  "nicht terminiert"                                
                              )}
                              {sportEvent.end && sportEvent.start ? (
                                <span> - {sportEvent.end}</span>
                              ) : null} {/*renders sportEvent.end only if itself and sportEvent.start exist and != null */}
                            </span>
                            <span className="col-2">
                              <img
                                className="img-fluid"
                                src={
                                  "assets/images/country-flags/svg/" + sportEvent.countryCode.toLowerCase() + ".svg"
                                }
                                alt=""
                                align="absmiddle"
                              />
                            </span>
                          </div>{/* / .row */}
                        </h6>
                        <h4 className="">{sportEvent.name}</h4>
                      </div>{/* /.bg-dark-transparent */}
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
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {eventCalendar}
          </div>
        </div>
      </div>
    );
  }
}

export default EventCalendar;