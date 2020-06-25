import React from "react";
import{
 BIBLIA,
 BIBLIA_PIC,
 LOGOS,
 PARRAGI
} from '../../constants';


const Footer = () => 
	<footer>
		<div className="footer-container">
			<div className="footer-col col1">
				<a href={BIBLIA}><img src={BIBLIA_PIC} alt="biblia"/></a>
			</div>
			<div className="footer-col col2">
				<p>This site uses the <a href={BIBLIA}>Biblia</a> webservices from <a href={LOGOS}>Logos Bible Software</a>.</p>
			</div>
			<div className="footer-col col3">
		    	<p>Copyright &#9400; 2020, <a href={PARRAGI}>parragi.com</a></p>
	    </div>
	    </div>
	</footer>

export default Footer;