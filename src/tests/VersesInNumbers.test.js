import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import VersesInNumbers from '../components/VersesInNumbers';

describe('VersesInNumbers', () => {
	it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<VersesInNumbers />, div);
	ReactDOM.unmountComponentAtNode(div);
	});
	test('has valid snapshot', () => {
		const component = renderer.create(<VersesInNumbers />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});