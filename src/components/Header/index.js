import React from "react";

const Header = ({ children }) => 
    <header>
	    <div className="header-container">
	        <h1>Words in the <span className="orange">Bible</span></h1>
	        <p>Search the word you choose in Bible translations.</p>
        </div>
    </header>;

export default Header;