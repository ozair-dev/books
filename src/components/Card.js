import React from 'react'
import "./card.css"
import {Link} from 'react-router-dom'
export default function Card(props){
	return (
		<div className='card' >
			<h2 className='book_title'>{props.data.name}</h2>
			<p className="card_content"><strong>Author: </strong>{props.data.author}</p>
			<p className="card_content"><strong>Price: </strong>{props.data.price}$</p>
			<p className="card_content"><strong>Review: </strong>{props.data.review}</p>
			<p className="card_content"><strong>Rating: </strong>{props.data.rating}</p>
			<p className="card_content"><strong>Publish Year: </strong>{props.data.publish_year}</p>
			<p className="card_content"><strong>Publisher: </strong>{props.data.publisher}</p>
			<Link to={{pathname: "/update", state: props.data}} className="edit_button" >Edit</Link>
			<br/>
			<button className ="delete_button" onClick= {props.onClick} >Delete</button>
		</div>
		)
}