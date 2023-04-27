import './jokes-table.scss';
import { Suspense, useEffect, useState } from 'react';
import { JokeRow } from './jokes-row';
import { Pagination } from '../../pagination/pagination';
import jokesApi from '../api';
import type { JokesInterface } from '../types';

export const JokesTable = () => {
  const [jokes, setJokes] = useState<JokesInterface[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jokesPerPage, setJokesPerPage] = useState('5');

  useEffect(() => {
    const getIt = async () => {
      try {
        const res = await jokesApi.getJokesByPage(currentPage, jokesPerPage);
        setJokes(res.data);
      } catch (err) {
        window.alert('An error occured, please try again later');
      }
    };

    getIt();
  }, [currentPage, jokesPerPage]);

  return (
    <div className="table-container">
      {jokes?.length != 0 ? (
        <Suspense fallback={<h2>Loading...</h2>}>
          <table className="table-container__table">
            <thead>
              <tr>
                <td>Title</td>
                <td>Author</td>
                <td>Created Date</td>
                <td>Views</td>
              </tr>
            </thead>
            <tbody>
              {jokes
                ? jokes.map((joke: JokesInterface) => {
                    return <JokeRow joke={joke} key={joke.id} />;
                  })
                : null}
            </tbody>
          </table>
        </Suspense>
      ) : (
        <h2>No jokes to show</h2>
      )}

      {/* {jokes?.length == 0 ? <h2>No jokes to show</h2> : null} */}
      <>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={setJokesPerPage}
        />
      </>
    </div>
  );
};
