import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardBody, CardTitle } from "reactstrap";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SportEventDetail extends Component {

    renderSportEvent(sportEvent) {
        return (
            <div className="col-12 m-1">
                <Card key={sportEvent.id} dark color="dark">
                    <CardBody>
                        <CardTitle>
                            <p>
                                {sportEvent.start} {sportEvent.end ? (<span> - {sportEvent.end}</span>) : null}{" "} {/* renders only if(sportEvent.end != null) */}
                            </p>
                            <h5 class="card-title">{sportEvent.name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {sportEvent.host}
                            </h6>
                        </CardTitle>
                        <CardText>Mehr Details</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    render() {
        if (this.props.sportEvent != null) {
            return (
              <div className="container">
                <div className="row">
                  {this.renderSportEvent(this.props.sportEvent)}
                </div>
              </div>
            );
        } else {
            return null;
        }
    }
}

export default SportEventDetail;