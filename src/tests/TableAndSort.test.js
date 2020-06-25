import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BaseButton from '../components/Buttons';
import Table, {Sort} from '../components/TableAndSort';

Enzyme.configure({ adapter: new Adapter() });

describe('Table', () => {
	const props = {
		list: [
			{ title: '1', preview: 'x'},
			{ title: '2', preview: 'y'},
		],
		sortKey: 'TITLE',
		isSortReverse: false,
	};
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<Table { ...props } />, div);
	});
	test('has a valid snapshot', () => {
		const component = renderer.create(
			<Table { ...props } />
	    );
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('shows two items in list', () => {
		const element = shallow(
			<Table { ...props } />
		);
		expect(element.find('.verse-display').length).toBe(2);
	});


});

describe('Sort', () => {
	const props = {
    	children: 'button',
	}
	it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Sort {...props}/>, div);
	ReactDOM.unmountComponentAtNode(div);
	});
	test('has valid snapshot', () => {
		const component = renderer.create(<Sort {...props}/>);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
