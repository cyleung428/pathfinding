import React, { Component } from "react";
import "./MainText.css";

export default class MainText extends Component {
  render() {
    return (
      <div id="showText">
        <ul>
          <li>
            <div className="show-node show-node-start"></div>
            Start Node
          </li>
          <li>
            <div className="show-node show-node-finish"></div>
            Target Node
          </li>
          <li>
            <div className="show-node show-node-visited"></div>
            Visited Node
          </li>
          <li>
            <div className="show-node show-node-wall"></div>
            Wall
          </li>
          <li>
            <div className="show-node show-node-shortest-path"></div>
            Shortest Path
          </li>
        </ul>
      </div>
    );
  }
}
