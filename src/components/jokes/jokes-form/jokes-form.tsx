import './jokes-form.scss';

import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import jokesApi from '../api';
import type { JokesInterface } from '../types';

type FormValuesType = z.infer<typeof FormValues>;

const FormValues = z.object({
  Author: z
    .string()
    .min(1, {
      message: 'Please enter Author email',
    })
    .regex(
      new RegExp(
        '^[a-zA-Z0-9ÄÜÖ_. ]+@[a-zA-Z0-9ÄÜÖ_ ]+.[a-zA-Z0-9ÄÜÖ_ ]+.[a-zA-Z0-9ÄÜÖ_ ]{2,4}$'
      ),
      'Please enter a valid email!'
    ),
  Title: z.string().min(1, {
    message: 'Please enter a joke title',
  }),
  Joke: z.string().min(1, { message: 'Please enter a joke!' }),
});

interface JokesFormProps {
  isAddMode: boolean;
}

export const JokesForm = ({ isAddMode }: JokesFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  let jokeId = '';
  if (!isAddMode) {
    jokeId =
      location.pathname.split('/')[location.pathname.split('/').length - 1];
  }

  const [joke, setJoke] = useState<JokesInterface | null>(null);

  useEffect(() => {
    if (!isAddMode) {
      const getTheJokeById = async () => {
        try {
          const res = await jokesApi.getJokeById(jokeId);
          setJoke(res.data);
          const defaults = {
            Author: res.data.Author,
            Title: res.data.Title,
            Joke: res.data.Joke,
          };
          reset(defaults);
        } catch (err) {
          window.alert('an error occured, please try again later');
        }
      };

      getTheJokeById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValuesType>({
    resolver: zodResolver(FormValues),
  });

  const submitForm: SubmitHandler<FormValuesType> = async (data) => {
    data.Author = data.Author.toLowerCase();
    const joke = {
      ...data,
      CreatedAt: dayjs(new Date()).format('YYYY-MM-DD'),
      Body: data.Joke,
      Views: Math.ceil(Math.random() * 100),
    };
    try {
      if (isAddMode) {
        await jokesApi.addEditJoke('post', joke);
        window.alert('joke added');
      } else {
        await jokesApi.addEditJoke('put', joke, jokeId);
        window.alert('joke edited');
      }
      navigate('/');
    } catch (err) {
      window.alert('an error occured, please try again later');
    }
  };

  const deleteJoke = async () => {
    try {
      await jokesApi.deleteJoke(jokeId);
      window.alert('joke deleted');
      navigate('/');
    } catch (err) {
      window.alert('an error occured, please try again later');
    }
  };

  return (
    <form
      className="jokes-form__container"
      onSubmit={handleSubmit(submitForm)}
      role="presentation"
    >
      <div className="jokes-form_tabs">
        <TextField
          {...register('Author')}
          error={!!errors.Author}
          type="text"
          label={"Author's email"}
          disabled={isSubmitting}
          id="author"
          variant="outlined"
          sx={{ width: { sm: 200, md: 300 } }}
          InputLabelProps={{ shrink: true }}
        />
        {errors.Author && (
          <p className="error-message">{errors.Author.message}</p>
        )}
      </div>
      <div className="jokes-form_tabs">
        <TextField
          {...register('Title')}
          error={!!errors.Title}
          defaultValue={joke ? joke.Title : ''}
          type="text"
          label={'Title'}
          disabled={isSubmitting}
          id="title"
          variant="outlined"
          sx={{ width: { sm: 200, md: 300 } }}
          InputLabelProps={{ shrink: true }}
        />
        {errors.Title && (
          <p className="error-message">{errors.Title.message}</p>
        )}
      </div>

      <div className="jokes-form_tabs">
        <TextField
          {...register('Joke')}
          error={!!errors.Joke}
          defaultValue={joke ? joke.Joke : null}
          type="text"
          label={'Joke'}
          multiline
          rows={4}
          disabled={isSubmitting}
          id="joke"
          variant="outlined"
          sx={{ width: { sm: 200, md: 300 } }}
          InputLabelProps={{ shrink: true }}
        />

        {errors.Joke && <p className="error-message">{errors.Joke.message}</p>}
      </div>
      <div className="jokes-form_button-container">
        <Button variant="outlined" type="submit">
          {isAddMode ? 'Add' : 'Edit'}
        </Button>
        {!isAddMode && (
          <Button variant="outlined" onClick={() => deleteJoke()}>
            Delete
          </Button>
        )}
        <Button variant="outlined" onClick={() => navigate('/')}>
          Close
        </Button>
      </div>
    </form>
  );
};
