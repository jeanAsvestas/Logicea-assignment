import './pagination.scss';
import { Dispatch, SetStateAction } from 'react';

interface PaginationInterface {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setItemsPerPage: Dispatch<SetStateAction<string>>;
}

export const Pagination = ({
  currentPage,
  setCurrentPage,
  setItemsPerPage,
}: PaginationInterface) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(event.target.value);
    setCurrentPage(1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const firstPage = () => {
    setCurrentPage(1);
  };

  return (
    <div className="pagination__container">
      <label htmlFor="itemsPerPage">Jokes per page</label>
      <select name="itemsPerPage" onChange={handleChange}>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <button
        disabled={currentPage == 1 ? true : false}
        onClick={() => firstPage()}
      >
        &#60;&#60;
      </button>
      <button
        disabled={currentPage == 1 ? true : false}
        onClick={() => previousPage()}
      >
        &#60;
      </button>
      <span>{`Page ${currentPage}`}</span>
      <button
        disabled={currentPage == 6 ? true : false}
        onClick={() => nextPage()}
      >
        &#62;
      </button>
    </div>
  );
};
