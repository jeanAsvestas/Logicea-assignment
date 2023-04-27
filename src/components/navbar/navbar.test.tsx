import TestRenderer from 'react-test-renderer';
import { NavBar } from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders the component as expected', () => {
  const component = TestRenderer.create(
    <Router>
      <NavBar />
    </Router>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
