import { Link } from 'react-router-dom';
import type { JokesInterface } from '../types';
import { Joke } from '../joke-model';

interface RowProps {
  joke: JokesInterface;
}

export const JokeRow = ({ joke }: RowProps) => {
  const jokeObj = new Joke(joke);
  return (
    <tr>
      <td>
        <Link to={`/edit/${jokeObj.id}`}>{jokeObj.Title}</Link>
      </td>
      <td>{jokeObj.getFormatedAuthor()}</td>
      <td>{jokeObj.getFormatedDate()}</td>
      <td>
        <span style={{ color: `${jokeObj.getFontColor()}` }}>{joke.Views}</span>
      </td>
    </tr>
  );
};
