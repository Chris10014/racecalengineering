import React, { Component } from "react";
import { Navbar, NavbarBrand } from "reactstrap";

class Header extends Component {

    render() {
        return (
            <div className="container">
                <Navbar className="sticky-top" dark color="dark">
                    <div className="container">
                        <NavbarBrand href="/">Big Points</NavbarBrand>
                    </div> {/* / .container */}
                </Navbar>
            </div> /* / .container */
            
        );
    }
}

export default Header;