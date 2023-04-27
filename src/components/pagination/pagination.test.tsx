import renderer from 'react-test-renderer';
import { Pagination } from './pagination';
import { SetStateAction } from 'react';

it('renders the component as expected', () => {
  const component = renderer.create(
    <Pagination
      currentPage={1}
      setCurrentPage={function (value: SetStateAction<number>): void {
        throw new Error('Function not implemented.');
      }}
      setItemsPerPage={function (value: SetStateAction<string>): void {
        throw new Error('Function not implemented.');
      }}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
