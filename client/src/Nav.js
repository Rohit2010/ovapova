import React from 'react';
import './App.css';
 
 function Nav(){
     return(
 <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
  <a class="navbar-brand" href="#" style={{marginLeft:100}}>WebOmega</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse background" id="navbarSupportedContent" style={{marginLeft:975}}>
  
  <ul class="navbar-nav mr-right">
 
    <li class="nav-item active">
      <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
    </li>
 
    <li class="nav-item active">
      <a class="nav-link" href="#">Features</a>
    </li>
 
    <li class="nav-item active">
      <a class="nav-link" href="#">Services</a>
    </li>
 
    <li class="nav-item">
      <a class="nav-link active" href="#">About us</a>
    </li>
 
  </ul>

  </div>
</nav>

);
}

export default Nav;