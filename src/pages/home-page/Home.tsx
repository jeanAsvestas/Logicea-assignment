import { Link } from 'react-router-dom';
import { JokesTable } from '../../components/jokes/jokes-table/jokes-table';
import './Home.scss';

export const Home = () => {
  return (
    <>
      <JokesTable />
      <br />
      <Link to="/add" className="home_add-button">
        Add new Joke
      </Link>
    </>
  );
};
