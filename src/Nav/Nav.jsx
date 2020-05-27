import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

export default class NavBar extends Component {
  render() {
    const {
      algorithm,
      reset,
      visualizePath,
      changeAlgorithm,
      resetPath,
    } = this.props;
    return (
      <Navbar bg="light">
        <Navbar.Brand>Pathfinding Visualization</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Maze Generation" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => {}}>
                Random Generation
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => {}}>Recursive</NavDropdown.Item>
            </NavDropdown> */}
            <NavDropdown title="Algorithm" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeAlgorithm("BFS")}>
                BFS
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeAlgorithm("AStar")}>
                A*
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => reset()}>Reset</Nav.Link>
            <Nav.Link onClick={() => resetPath()}>Reset Path</Nav.Link>
            <Nav.Link onClick={() => visualizePath()}>
              Visualize {algorithm}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
