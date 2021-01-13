import React from "react"
import axios from "axios"
import './form.css'
export default class Form extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			showWarning: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	componentDidMount(){
		if(this.props.location.state){
			let editData = this.props.location.state;
			document.querySelector("#name").value = editData.name;
			document.querySelector("#author").value = editData.author;
			document.querySelector("#price").value= editData.price;
			document.querySelector("#review").value = editData.review;
			document.querySelector("#rating").value = editData.rating;
			document.querySelector("#publish_year").value = editData.publish_year;
			document.querySelector("#publisher").value = editData.publisher;
		}
	}
	handleSubmit = (e)=>{
		e.preventDefault();
		let data = {
			name: document.querySelector("#name").value,
			author: document.querySelector("#author").value,
			price: document.querySelector("#price").value,
			review: document.querySelector("#review").value,
			rating: document.querySelector("#rating").value,
			publish_year: document.querySelector("#publish_year").value,
			publisher: document.querySelector("#publisher").value
		}
		if(this.props.location.state){
			data._id = this.props.location.state._id
			axios.put("https://ozbookapi.herokuapp.com/update", data)
			.then(res=>{
				this.props.history.push({
					pathname: '/saved',
					state: res.data
				})
			})
		}else{
			
			axios.post("https://ozbookapi.herokuapp.com/create", data)
			.then(res=>{
				this.props.history.push({
					pathname: '/saved',
					state: res.data.ops[0]
				})
			}).catch(err=>this.setState({showWarning: true}))
		}
	}

	render(){
		return (
			<div>
				<button  className="go_home" onClick = {()=>this.props.history.push("/")} >Go Home</button>
				<form onSubmit = {this.handleSubmit} >
					<h1 className="title">New Book</h1>
					<input  id="name" type = 'text' required onChange = {(e)=>this.setState({name: e.target.value}) } placeholder="Book Name..." /><br/>
					<input id="author" type = 'text' required onChange = {(e)=>this.setState({author: e.target.value}) } placeholder="Author's Name..." /><br/>
					<input id="price" type = 'number' step="0.01" min='1' max="100000" required onChange = {(e)=>this.setState({price: e.target.value}) } placeholder="Price($)..." /><br/>
					<input id="review" type = 'text' required onChange = {(e)=>this.setState({review: e.target.value}) } placeholder="Review..." /><br/>
					<input id="rating" type = 'number' step="0.1" max="10" required onChange = {(e)=>this.setState({rating: e.target.value}) } placeholder="Rating..." /><br/>
					<input id="publish_year" type = 'number' min="1000" max="3000" required onChange = {(e)=>this.setState({publish_year: e.target.value}) } placeholder="Pubish Year" /><br/>
					<input id="publisher" type = 'text' required onChange = {(e)=>this.setState({publisher: e.target.value}) } placeholder="Publisher" /><br/>
					{this.state.showWarning&& <p style = {{color: "red"}} >Book with this name already exists</p>}
					<button className="save_button" >Save Book</button>
				</form>
			</div>
			)
	}
}