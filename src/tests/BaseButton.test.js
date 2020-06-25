import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import BaseButton from '../components/Buttons';

describe('BaseButton', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<BaseButton>base button</BaseButton>, div);
		ReactDOM.unmountComponentAtNode(div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<BaseButton>base button</BaseButton>
		);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});