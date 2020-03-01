import React from "react";
import axios from "axios";

class ThreadPost extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            title: ''
        }
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('http://127.0.0.1:8000/threads/', this.state)
            .then(response => {
                console.log(response)
                if (response.status == 201) {
                    alert("Thread posted");
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { title, text } = this.state;

        return (
            <div className="field">
                <form onSubmit = {this.submitHandler} id="threadPost">
                    <div>
                        <h2>Opprett tråd</h2>
                        <input 
                        type="text" 
                        name="title" 
                        value = {title}
                        placeholder = "Tittel"
                        onChange = {this.changeHandler}/>
                    </div>
                </form>
                <textarea
                    rows="12"
                    cols="70"
                    name="threadContent"
                    form="threadPost"
                    placeholder="Skriv her..."
                    id = "threadContent"
                    onChange= {this.changeHandler}>{text}
                </textarea>
                <button 
                    className = "register-button" 
                    type="submit" 
                    form="threadPost">
                    Publiser
                </button>
            </div>
        )
    }
}

export default ThreadPost