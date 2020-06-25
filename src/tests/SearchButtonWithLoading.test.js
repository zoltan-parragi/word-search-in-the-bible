import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import SearchButtonWithLoading, {Loading, SearchButton} from '../components/Buttons';

describe('SearchButton', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SearchButton>Search button</SearchButton>, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<SearchButton>Search button</SearchButton>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
})

describe('Loading', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Loading />, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Loading />
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe('SearchButtonWithLoading', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<SearchButtonWithLoading>Search button</SearchButtonWithLoading>, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<SearchButtonWithLoading>Search button</SearchButtonWithLoading>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
