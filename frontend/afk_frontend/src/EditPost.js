import React, {Component} from 'react';
import axios from "axios";

class EditPost extends Component{
    
    constructor(props) {
        super(props)

        
        this.state = {
            title: this.props.title,
            postContent: this.props.postContent
        }

    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        let yourConfig = {
            headers: {
            //Follow the format:  Authorization: 'JWT token
            //eg :
            Authorization: 'JWT '+ localStorage.getItem('token')
         }} 
        axios
            .put('http://127.0.0.1:8000/threads/', this.state, yourConfig)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    alert("Thread edited");
                    this.props.updateThreads()
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    renderEditView = () => {
        return (
            <div className="field">
                <form onSubmit = {this.submitHandler} id="threadEdit">
                    <div>
                        <h2>Rediger tråd</h2>
                        <input 
                        type="text" 
                        name="title" 
                        className="inputbox"
                        id="threadtitle"
                        title = "placeholder"
                        onChange = {this.changeHandler}/>
                    </div>
                </form>
                <textarea
                    rows="12"
                    cols="64"
                    className="inputbox"
                    name="postContent"
                    form="threadPost"
                    placeholder="Skriv her..."
                    id = "postContent"
                    defaultValue = {this.props.postContent}
                    onChange= {this.changeHandler}>
                </textarea>
                <button 
                    className = "button1"
                    id="postthreadbutton" 
                    type="submit" 
                    form="threadPost">
                    Lagre
                </button>
            </div>
        )
    }

    render() {
        const { title, text } = this.state;

        return (
            this.renderEditView()
        )
    }


}

export default EditPost;

/*
renderDefaultView = () =>{
        return(
            <div 
            onClick = {this.changeEditMode}>
                {this.state.value}
            </div>
        )
    }

async fetchPostId(){
        try {
            const result = await axios.get('http://127.0.0.1:8000/threads?thread='+this.props.id)

       } catch(e){
           console.log(e)
       }
    }

*/