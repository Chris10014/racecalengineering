import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardImg, CardImgOverlay, Breadcrumb, BreadcrumbItem } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Glyphicon } from './GlyphiconComponent';
import { baseUrl } from "../shared/baseUrl";

class SportEventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Searches the sportEvent visual. If no visual exists it will be a visual taken corresponding to the sport of the sportEvent.
   * @param {sportEvent} object sportEvent
   * @returns {file name} string file name of the sportEvent visual
   */
  renderEventVisual(sportEvent, sports = this.props.sports.sports) {
    const random = (min = 0, max = 50) => {
      let num = Math.random() * (max - min) + min;

      return Math.floor(num);
    };

    if (sportEvent.visual != null && this.props.sportEvent.visual.length > 3) {
      //to be done: check if file exists
      return sportEvent.visual;
    } else {
      //doesn't work sustainable. Timing issue?
      let sporttype = sports.filter(
        (sport) => sport._id === sportEvent.races[0].race.sport
      )[0];
      console.log("bild: ", sporttype.abbr + "_" + random(1, 3) + ".jpg");

      return (
        "assets/images/event-visuals/" +
        sporttype.abbr +
        "_" +
        random(1, 3) +
        ".jpg"
      );
    }
  }

  renderRaceCard(race) {
    console.log("Race: ", race.race.racedates);
    return (
      <div key={race._id} className="col-12 col-md-6 mt-3">
        <Card className="h-100 text-white bg-dark">
          <CardBody>
            <CardImg
              className="card-img-over mb-3"
              src={baseUrl + this.renderEventVisual(this.props.sportEvent)
              }
              alt=""
            />
            <CardImgOverlay>
              <CardTitle>
                <div className="bg-dark-transparent">
                  <h6>
                    <div className="row">
                      <span className="col-10">
                        {this.props.sportEvent.dates[this.props.sportEvent.dates.length - 1].start
                          ? new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(
                    new Date(
                      Date.parse(
                        race.race.racedates[race.race.racedates.length - 1].start
                      )
                    )
                  ) : null}
                      </span>
                    </div>
                  </h6>
                  <h2>{race.race.name}</h2>
                </div>
              </CardTitle>
            </CardImgOverlay>
            <CardText>
              <h4 className="inline mt-2">
                {
                  this.props.sports.sports.filter(
                    (sport) =>
                      sport._id === race.race.sport
                  )[0].noun_de
                }
              </h4>
              &nbsp;
              {race.race.competition ? (
                <p className="inline">
                  &nbsp;&nbsp;
                  <FontAwesomeIcon icon={"stopwatch"} size="lg" />
                  {race.race.virtual ? " virtuell" : null}
                </p>
              ) : null}
              {/*Is the event a competition? */}
              <hr />
              <p>{race.race.courses.length > 1 ? "Strecken" : "Strecke"}</p>
              {race.race.courses.map((course, index) => {
                console.log("course: ", course.sport.abbr);
                return (
                  <span>
                    <Glyphicon param={course.sport.abbr.toLowerCase()} size="lg" />
                    &nbsp;{course.distance} km{" "}
                    {/* Glyph for course and distance */}
                    {index < race.race.courses.length - 1 ? (
                      <code className="text-white text-muted">
                        &nbsp;
                        <FontAwesomeIcon icon="circle" size="xs" />
                        &nbsp;
                      </code>
                    ) : null}
                    {/* Muted dot as separator between course data */}
                  </span>
                );
              })}
            </CardText>
          </CardBody>
        </Card>
      </div> /** /key=sportEvent.id */
    );
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div className="container">
          <div className="row text-center">
            <Loading text="Wettkämpfe werden geladen ..." />
          </div>
        </div>
      );
    } else if (this.props.errMess) {
      return (
        <div className="container">
          <div className="row">
            <h4>{this.props.errMess}</h4>
          </div>
        </div>
      );
    } else if (this.props.sportEvent != null) {
      console.log("sportEvent!: ", this.props.sportEvent.name);
      
      const competitions = this.props.sportEvent.races.map((race) => {
        return this.renderRaceCard(race);
      });

      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/eventcalendar">Veranstaltungen</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>
                {this.props.sportEvent.name}
              </BreadcrumbItem>
            </Breadcrumb>
            <div className="row">
              <div className="col-8">
                <h1>{this.props.sportEvent.name}</h1>
                <h3>{this.props.sportEvent.host}</h3>
                <h3>
                  {this.props.sportEvent.postalCode}{" "}
                  {this.props.sportEvent.city}
                </h3>
              </div>
              <div className="col-4">
                <img
                  className="img-fluid event-logo align-self-end"
                  src={
                    "/assets/images/event-logos/" + this.props.sportEvent.logo
                  }
                  alt=""
                  align="absmiddle"
                />
              </div>
            </div>
            <hr />
            <h2>
              {this.props.sportEvent.dates[
                this.props.sportEvent.dates.length - 1
              ].start ? (
                new Intl.DateTimeFormat("de-DE", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(
                  new Date(
                    Date.parse(
                      this.props.sportEvent.dates[
                        this.props.sportEvent.dates.length - 1
                      ].start
                    )
                  )
                )
              ) : (
                <span className="text-danger">
                  <strong>nicht terminiert</strong>
                </span>
              )}
              {this.props.sportEvent.dates[this.props.sportEvent.dates.length - 1].end &&
              this.props.sportEvent.dates[this.props.sportEvent.dates.length - 1].start ? (
                <span>
                  {" "}
                  -{" "}
                  {new Intl.DateTimeFormat("de-DE", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(
                    new Date(
                      Date.parse(
                        this.props.sportEvent.dates[this.props.sportEvent.dates.length - 1].end
                      )
                    )
                  )}
                </span>
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