import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Header from '../components/Header';

describe('Header', () => {
	it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Header />, div);
	ReactDOM.unmountComponentAtNode(div);
	});
	test('has valid snapshot', () => {
		const component = renderer.create(<Header />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});