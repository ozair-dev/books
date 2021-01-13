import React from 'react'
import Card from "./Card"
import axios from 'axios'
import './card.css'
import {Link,  useHistory} from "react-router-dom"
export default function(props){
	let history = useHistory();
	const handleClick = (id)=>{
		axios.post("https://ozbookapi.herokuapp.com/delete", {_id: id})
		.then(res=>{
			history.push("/")
		})
	}
	return (
		<div style={{display: 'flex', 'flexDirection':'column', alignItems: 'center'}} >
			<h1 style= {{color: 'green', display: 'block'}}>Book Saved</h1>
			<Card onClick={()=>handleClick(props.location.state._id)} data = {props.location.state}/>
			<br/>
			<Link to="/" className="go_home" style = {{textAlign: "center"}} >Go Home</Link>
		</div>
		)
}