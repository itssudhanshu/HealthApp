import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import PropTypes from 'prop-types'



export default  function Navbar(props) {


    const [prompt, setPrompt] = useState('');
    const [generatedText, setGeneratedText] = useState('');

    const handleChange = (event) => {
    setPrompt(event.target.value);
    };

    const handleGenerateText = async () => {
    setGeneratedText("")
    const genAI = new GoogleGenerativeAI("AIzaSyAYI-K0-z7OAcTjQp1f1AS7t9Yq27o8WLU");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(
    "Give me breif about " + prompt + " healthy or not and if not why in 30-40 words, Also give me macro distribution like the following Protein : g, Carbs : g, Fats : g. And if the above statement is not related to food by any chance please return " + "Please ask something related to food :)" );
    const response = await result.response;
    const text = await response.text();
    setGeneratedText(text);
    }





    return(
        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">{props.title}</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">{props.aboutText}</a>
        </li>
      </ul>
        <input className="form-control me-2" 
          style={{
              width : "25%" 
         }}  
          value={prompt} onChange={handleChange} 
          type="search" placeholder="Ask Anything!" 
          aria-label="Search"/>
    <button style={{
          width : "auto",
          height : "auto"
    }}  
          onClick={handleGenerateText} 
          type="button" 
          className="btn btn-primary" 
          data-bs-toggle="modal" 
          data-bs-target="#exampleModal">
  Go!
</button>


<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Response</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        {generatedText}
      </div>
      <div className="modal-footer">
        <button  type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
</nav>
    );
}   


Navbar.propTypes = {
    title : PropTypes.string.isRequired,
    aboutText : PropTypes.string
}

Navbar.defaultProps = {
    title: 'Tuber',
    aboutText: 'About'
  };