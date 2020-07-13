import React, { Component } from "react";
import { getAllOrders } from "./helper/adminapicall";
import { API } from "../backend";

export default class Orders extends Component {
  render() {
    return (
      <div>
        <h2>Manage Orders</h2>
      </div>
    );
  }
}
