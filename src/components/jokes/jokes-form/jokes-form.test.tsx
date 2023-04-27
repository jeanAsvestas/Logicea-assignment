import TestRenderer from 'react-test-renderer';
import { JokesForm } from './jokes-form';

it('renders the component as expected', () => {
  const component = TestRenderer.create(<JokesForm isAddMode={true} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
