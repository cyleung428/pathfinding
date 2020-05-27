import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    const { algorithm, reset, visualizePath, changeAlgorithm } = this.props;
    return (
      <Navbar bg="light">
        <Navbar.Brand>Pathfinding Visualization</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Home</Nav.Link>
            <NavDropdown title="Algorithm" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeAlgorithm("BFS")}>
                BFS
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeAlgorithm("AStar")}>
                A*
              </NavDropdown.Item>
              {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
            <Nav.Link onClick={() => reset()}>Reset</Nav.Link>
            <Nav.Link onClick={() => visualizePath()}>
              Visualize {algorithm}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
