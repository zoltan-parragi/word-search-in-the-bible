import React, { Component } from "react";
import {sortBy} from 'lodash';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Buttons/';

const SORTS = {
	NONE: list => list,
	TITLE: list => sortBy(list, 'title'),
	PREVIEW: list => sortBy(list, 'preview')
}

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sortKey: 'NONE',
			isSortReverse: false,
		};
		this.onSort = this.onSort.bind(this);
	}

	onSort(sortKey) {
		const isSortReverse =
			this.state.sortKey === 'NONE' && sortKey === 'NONE'
			? false
			: this.state.sortKey === sortKey && !this.state.isSortReverse;
		this.setState({sortKey, isSortReverse});
	}

    render() {
    	const {
			list 
    	} = this.props;

    	const {
			sortKey,
			isSortReverse,
    	} = this.state;

	    const sortedList = SORTS[sortKey](list);
		const reverseSortedList = 
			isSortReverse
			? sortedList.reverse()
			: sortedList;
        
        return(
        	<div className="table">
			    <div className="sort">
			        <span className="sort-intro">Sort on this page by </span> 
		            <span>
		                <Sort 
		                    sortKey={'TITLE'}
		                    onSort={this.onSort}
		                    activeSortKey={sortKey}
		                >
		                    reference
		                </Sort>
		            </span>
		            <span className="sort-button-withmargin">
		                <Sort 
		                    sortKey={'PREVIEW'}
		                    onSort={this.onSort}
		                    activeSortKey={sortKey}
		                >
		                    verse text
		                </Sort>
		            </span>
		            <span className="sort-button-withmargin">
		                <Sort 
		                    sortKey={'NONE'}
		                    onSort={this.onSort}
		                    activeSortKey={sortKey}
		                >
		                	none
		                </Sort>
		            </span>
			    </div>
				{reverseSortedList.map(item => (
					<div key={item.title} className="verse-display">
						<h4 className="verse-display-reference">{item.title}</h4>
						<p className="verse-display-text">{item.preview}</p>
					</div>
				))}
			</div>
		);
    }
}

Table.propTypes = {
	list: PropTypes.arrayOf(
	    PropTypes.shape({
	    	title: PropTypes.string.isRequired,
	    	preview: PropTypes.string,
	    })

	).isRequired,
}

const Sort = ({
	sortKey, 
	activeSortKey, 
	onSort, 
	children
}) => {
	const sortClass = classNames(
		'button-sort',
		{'button-sort-active': sortKey === activeSortKey}
	);

	return(
	    <Button 
	        onClick={() => onSort(sortKey)}
	        className={sortClass}
	    >
	        {children}
	    </Button>
    );
}

export default Table;
export {Sort};