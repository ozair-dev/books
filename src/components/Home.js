import React from "react";
import './home.css';
import {Link} from 'react-router-dom'
import Card from "./Card"
import axios from 'axios'
export default class Home extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			altHomeTitle: "Loading...",
			data : []
		}
		this.handleDelete = this.handleDelete.bind(this)
	}

	componentDidMount(){
		axios
		.get("https://ozbookapi.herokuapp.com/all")
		.then(res=>{
			this.setState({data: res.data.sort((a,b)=>a.name.toLowerCase()>b.name.toLowerCase()?1:-1)})
			 if(!this.state.data[0]) return this.setState({altHomeTitle: "No Books To Show"})
		})
	}
	handleDelete = (id)=>{
		if (window.confirm('Are you sure you wish to delete this book?')){
			let data = this.state.data;
			let index = data.findIndex(doc=>doc._id===id)
			let temp = data.slice(0,index)
			temp = temp.concat(data.slice(index+1))
			axios.post("https://ozbookapi.herokuapp.com/delete", {_id: id}).then(res=>{
				if(res.data==="Done") return this.setState({data: temp})
				if(!this.state.data[0]) return this.setState({altHomeTitle: "No Books To Show"})
			})
		}
	}

	render(){
		let items = this.state.data.map((doc)=>{
			return(
				<div key={doc._id} >
					<Card onClick = {()=>this.handleDelete(doc._id) } 	data={doc} /><br/>
				</div>
				)
		})
		return (
			<div className ="home" >
				<Link to="/create" className="add_button">Add A Book</Link>
				{this.state.data[0]? items: <h1 style = {{fontSize:27, color: "purple", textAlign: 'center'}} >{this.state.altHomeTitle}</h1> }
			</div>
			)
	}
}