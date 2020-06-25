import React, { Component } from "react";
import {SearchButtonWithLoading} from '../Buttons/';


import{
 ASV,
 KJV,
 KJV1900,
 DARBY,
 EMPHBBL,
 LEB,
 YLT,

 ASVtext,
 KJVtext,
 KJV1900text,
 DARBYtext,
 EMPHBBLtext,
 LEBtext,
 YLTtext,
} from '../../constants';

export default class Search extends Component {
	componentDidMount(){
		if(this.input) {
			this.input.focus();
		}
	}
	render() {
		const {
            value,
            onChange,
            onSubmit,
            setBibleVersion,
            children,
            isLoading
		} = this.props;

		return (
		<div className="search">
		    <div className="search-container">
				<form onSubmit={onSubmit}>
					<input 
						type="text" 
						value={value} 
						onChange={onChange} 
						ref={el => this.input=el}
					/>       
		            <select defaultValue="/LEB.js" onChange={event => setBibleVersion(event)}>
					    <option 
					        value={ASV}
					    >
					        {ASVtext}
					    </option>

					    <option 
					        value={KJV}
					    >
				        	{KJVtext}
				        </option>

					    <option 
					    	value={KJV1900}
				    	>
				    		{KJV1900text}
			    		</option>

					    <option 
					    	value={DARBY}
				    	>
				    		{DARBYtext}
			    		</option>

					    <option 
					    	value={EMPHBBL}
					    >
					    	{EMPHBBLtext}
					    </option>

					    <option 
					    	value={LEB}
				    	>
				    		{LEBtext}
			    		</option>

					    <option 
					    	value={YLT}
				    	>
				    		{YLTtext}
			    		</option>
					</select>
		            <SearchButtonWithLoading 
		            	className="button-search" 
		            	isLoading={isLoading}
	            	>
	            		{children}
            		</SearchButtonWithLoading>
				</form>
			</div>
		</div>
		);
	}
}
