import React from "react"

import "./EventItem.css"

const eventItem = (props) => (
  <li key={props.eventId} className="event__list-item">
    <div>
      <h1>{props.title}</h1>
      <h2>${props.price}</h2>
      <p>{new Date(props.date).toLocaleDateString()}</p>
    </div>
    <div className="event__list-item__control">
      {props.userId === props.creatorId ? (
        <p>You created this event</p>
      ) : (
        <button
          className="btn"
          onClick={props.onDetail.bind(this, props.eventId)}
        >
          View Details
        </button>
      )}
    </div>
  </li>
)

export default eventItem
