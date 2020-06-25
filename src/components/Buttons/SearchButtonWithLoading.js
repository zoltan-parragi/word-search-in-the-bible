import React from "react";

const SearchButton = ({ className = "", children}) => (
	<button className={className} type="submit">
		{children}
	</button>
);

const Loading = () => 
    <div className="button-search">Loading... </div> 

const withLoading = (Component) => ({isLoading, ...rest}) =>
    isLoading
        ? <Loading />
        : <Component {...rest} />

const SearchButtonWithLoading = withLoading(SearchButton);

export default SearchButtonWithLoading;
export {
	SearchButtonWithLoading,
	SearchButton,
	Loading,
	withLoading
};