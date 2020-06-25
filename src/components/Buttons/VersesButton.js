import React from "react";
import PropTypes from 'prop-types';


const VersesButton = ({ onClick, className, children}) => (
	<button onClick={onClick} className={className} type="button">
		{children}
	</button>
);

VersesButton.defaultProps = {
	className: '',
}

VersesButton.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
}

export default VersesButton;