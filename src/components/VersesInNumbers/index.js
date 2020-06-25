import React from "react";

const VersesInNumbers = ({ versesTotal, minVerseNumberOnPage, maxVerseNumberOnPage }) => 
	<div className = "versesinfo-numbers">
	    <span className="versesinfo-numbers-total">The number of verses: {versesTotal}</span>
	    {   (versesTotal === 0)
			? <span className="versesinfo-numbers-page">page: {1}</span>
			: <span className="versesinfo-numbers-page">page: {(minVerseNumberOnPage)/10 + 1}</span>
		}
		{   (versesTotal === 0)
			? <span className="versesinfo-numbers-verses">verses: {0} </span>
			: (versesTotal > maxVerseNumberOnPage) 
			? <span className="versesinfo-numbers-verses">verses: {minVerseNumberOnPage + 1} - {maxVerseNumberOnPage}</span> 
			: <span className="versesinfo-numbers-verses">verses: {minVerseNumberOnPage + 1} - {versesTotal}</span>
		}
	</div>

export default VersesInNumbers;