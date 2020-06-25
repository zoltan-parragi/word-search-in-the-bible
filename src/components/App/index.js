import React, { Component } from "react";
import "../../stylesheets/main.scss";
import classNames from 'classnames';
import Table from '../TableAndSort/';
import Header from '../Header/';
import Search from '../Search/';
import VersesButton from '../Buttons/';
import VersesInNumbers from '../VersesInNumbers/';
import Footer from '../Footer/';


import{
 DEFAULT_QUERY,
 PATH_BASE,
 PATH_SEARCH,
 DEFAULT_BIBLE_VERSION,
 PARAM_SEARCH,
 SEARCH_MODE,
 LIST_START,
 LIST_LIMIT,
 KEY,

 DEFAULT_VERSE_MIN_NUM,
 DEFAULT_VERSE_MAX_NUM
} from '../../constants';

const updateSearchVerses= (result) => (prevState) => {
    const {resultCache, searchTerm, bibleVersion} = prevState;
	const oldVerses = (resultCache && resultCache[searchTerm]) || {};
	return {
		resultCache: {
		    ...resultCache,
		    [searchTerm]: { ...oldVerses, [bibleVersion]: result} 
        },
        isLoading: false,
	};
};

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchTerm: DEFAULT_QUERY,

			resultCache: null,
            searchKey: '',

			pageResult: null,
			minVerseNumberOnPage: DEFAULT_VERSE_MIN_NUM,
			maxVerseNumberOnPage: DEFAULT_VERSE_MAX_NUM,
			bibleVersion: DEFAULT_BIBLE_VERSION,

			prevBtnDisabled: true,
			nextBtnDisabled: false,

			error: null,
			isLoading: false,
		};
		this.needsToSearch = this.needsToSearch.bind(this);
		this.nextPage = this.nextPage.bind(this);
		this.previousPage = this.previousPage.bind(this);
		this.setBibleVersion = this.setBibleVersion.bind(this);
		this.setSearchVerses = this.setSearchVerses.bind(this);
		this.setOldVerses = this.setOldVerses.bind(this);
		this.setFirstVersesOnPage = this.setFirstVersesOnPage.bind(this);
		this.fetchSearchVerses = this.fetchSearchVerses.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	needsToSearch(searchTerm, bibleVersion) {
        return !(this.state.resultCache[searchTerm] && this.state.resultCache[searchTerm][bibleVersion]);
    }

	setBibleVersion(event) {
		this.setState({
			bibleVersion: event.target.value,
		});
	}

	setSearchVerses(result) {
		this.setState(updateSearchVerses(result));
        const {resultCache, searchTerm, bibleVersion, minVerseNumberOnPage, maxVerseNumberOnPage} = this.state;
		this.setFirstVersesOnPage(resultCache, searchTerm, bibleVersion, minVerseNumberOnPage, maxVerseNumberOnPage);
	}

	setOldVerses() {
		const {resultCache, searchTerm, bibleVersion, minVerseNumberOnPage, maxVerseNumberOnPage} = this.state;
		this.setFirstVersesOnPage(resultCache, searchTerm, bibleVersion, minVerseNumberOnPage, maxVerseNumberOnPage);
	}

	setFirstVersesOnPage(resultCache, searchTerm, bibleVersion, minVerseNumberOnPage, maxVerseNumberOnPage) {
		this.setState({
			minVerseNumberOnPage: DEFAULT_VERSE_MIN_NUM,
		    maxVerseNumberOnPage: DEFAULT_VERSE_MAX_NUM,
			pageResult: resultCache[searchTerm][bibleVersion].results.slice(DEFAULT_VERSE_MIN_NUM, DEFAULT_VERSE_MAX_NUM)
		});
	}
 
	fetchSearchVerses(searchTerm, bibleVersion) {
		this.setState({isLoading: true});
		fetch(
			`${PATH_BASE}${PATH_SEARCH}${bibleVersion}?${PARAM_SEARCH}${searchTerm}&${SEARCH_MODE}&${LIST_START}&${LIST_LIMIT}&${KEY}`
		)
			.then(response => response.json())
			.then(result => this.setSearchVerses(result))
			.catch(error => this.setState({error}));
	}

	componentDidMount() {
		const { searchTerm, bibleVersion} = this.state;
		this.setState({ searchKey: searchTerm });
		this.fetchSearchVerses(searchTerm, bibleVersion);
	}


	nextPage() {
		const {maxVerseNumberOnPage, resultCache, searchKey, bibleVersion} = this.state;
		if(resultCache[searchKey][bibleVersion] === undefined) {return};

		const newMaxNumber =
			maxVerseNumberOnPage + 10 < resultCache[searchKey][bibleVersion].resultCount
				? maxVerseNumberOnPage + 10
				: resultCache[searchKey][bibleVersion].resultCount;

		const newMinNumber = 
		  resultCache[searchKey][bibleVersion].resultCount === 0 
		    ? 0
		    : newMaxNumber === Math.floor(newMaxNumber/10)*10 
		    ?  newMaxNumber-10 
		    : Math.floor(newMaxNumber/10)*10;

 
		this.setState({
			pageResult: resultCache[searchKey][bibleVersion].results.slice(
				newMinNumber,
				newMaxNumber
			),
			minVerseNumberOnPage: newMinNumber,
			maxVerseNumberOnPage: newMaxNumber,
			prevBtnDisabled: !newMinNumber,
			nextBtnDisabled: !(newMaxNumber - resultCache[searchKey][bibleVersion].resultCount),
			sortKey: 'NONE',
			isSortReverse: false
		});
	}

	previousPage() {
		const { minVerseNumberOnPage, maxVerseNumberOnPage, resultCache, searchKey, bibleVersion} = this.state;
		if(resultCache[searchKey][bibleVersion] === undefined) {return};

		const newMaxNumber = 
		    (maxVerseNumberOnPage < 10)
		     ? maxVerseNumberOnPage
		  : (Math.floor(maxVerseNumberOnPage/10) !== maxVerseNumberOnPage/10) 
		    ? (Math.floor(maxVerseNumberOnPage/10))*10 
		  : (maxVerseNumberOnPage === 10) 
		    ? maxVerseNumberOnPage 
		    : maxVerseNumberOnPage-10;
		const newMinNumber = 
		  minVerseNumberOnPage !== 0
		    ? minVerseNumberOnPage - 10 
		    : minVerseNumberOnPage;

		this.setState({
			pageResult: resultCache[searchKey][bibleVersion].results.slice(
				newMinNumber,
				newMaxNumber
			),
			minVerseNumberOnPage: newMinNumber,
			maxVerseNumberOnPage: newMaxNumber,
			prevBtnDisabled: !newMinNumber,
			nextBtnDisabled: !(newMaxNumber - resultCache[searchKey][bibleVersion].resultCount),
			sortKey: 'NONE',
			isSortReverse: false

		});
	}

	onSearchChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	onSearchSubmit(event) {
		const { searchTerm, bibleVersion} = this.state;
		this.setState({ 
			searchKey: searchTerm,
			sortKey: 'NONE',
			isSortReverse: false
		});
		if(this.needsToSearch(searchTerm, bibleVersion )) {
		    this.fetchSearchVerses(searchTerm, bibleVersion);
	    } else {
	    	this.setOldVerses();
	    }
		event.preventDefault();
	}

	render() {
		const { 
			searchTerm, 
           
            resultCache,
            bibleVersion,
            searchKey,

			pageResult, 
			minVerseNumberOnPage, 
			maxVerseNumberOnPage,

			prevBtnDisabled,
			nextBtnDisabled,

			error,
			isLoading
		} = this.state;
        const list = pageResult || []; 
        const versesTotal = ( resultCache && resultCache[searchKey] && resultCache[searchKey][bibleVersion] && resultCache[searchKey][bibleVersion].resultCount) || 0;

		const prevBtnClass = classNames(
			'button-versesinfo',
			{'button-disabled': prevBtnDisabled}
		);

		const nextBtnClass = classNames(
			'button-versesinfo',
			{'button-disabled': nextBtnDisabled}
		);

		return (
			<div className="page">
			    <div className="without-footer">
					<Header />
					<main>
						<Search
							value={searchTerm}
							onChange={this.onSearchChange}
							onSubmit={this.onSearchSubmit}
							setBibleVersion={this.setBibleVersion}
							isLoading={isLoading}
						>
							Search
						</Search>

						<div className="versesinfo">
							<VersesInNumbers 
								versesTotal={versesTotal}
								minVerseNumberOnPage = {minVerseNumberOnPage} 
								maxVerseNumberOnPage = {maxVerseNumberOnPage}
							/>

							<div className="versesinfo-buttons">		
								<VersesButton className={prevBtnClass}  onClick={() => this.previousPage()}>&lt; Previous page</VersesButton>
								<VersesButton className={nextBtnClass} onClick={() => this.nextPage()}>Next page &gt;</VersesButton>
                            </div>
                        </div>

                        
	                    { error
	                      ? <div className="interactions">
	                          <p>Ooops..., something went wrong.</p>
	                        </div>
	                      : <Table 
	                           list={list} 
	                        />
	                    }

						<div className="versesinfo">
							<VersesInNumbers 
								versesTotal={versesTotal}
								minVerseNumberOnPage = {minVerseNumberOnPage} 
								maxVerseNumberOnPage = {maxVerseNumberOnPage}
							/>

							<div className="versesinfo-buttons">		
								<VersesButton className={prevBtnClass} onClick={() => this.previousPage()}>&lt; Previous page</VersesButton>
								<VersesButton className={nextBtnClass} onClick={() => this.nextPage()}>Next page &gt;</VersesButton>
	                        </div>
	                    </div>
                    </main>
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;


