import type { JokesInterface } from './types';
import dayjs from 'dayjs';

const colorRanges = [
  { maxViews: 25, color: 'tomato' },
  { maxViews: 50, color: 'orange' },
  { maxViews: 75, color: 'yellow' },
  { maxViews: 100, color: 'green' },
];
export class Joke {
  Author: string;
  Body: string;
  CreatedAt: string;
  Title: string;
  Views: number;
  id?: number;

  constructor(joke: JokesInterface) {
    this.Author = joke.Author;
    this.Body = joke.Body;
    this.CreatedAt = joke.CreatedAt;
    this.Title = joke.Title;
    this.Views = joke.Views;
    this.id = joke.id;
  }

  getFormatedAuthor() {
    return this.Author.replace(
      this.Author.split('@')[this.Author.split('@').length - 1].split('.')[0],
      '\\*\\*\\*'
    );
  }
  getFontColor() {
    for (const colorRange of colorRanges) {
      if (this.Views <= colorRange.maxViews) {
        return colorRange.color;
      }
    }
    return 'blue';
  }

  getFormatedDate() {
    return dayjs(this.CreatedAt).format('DD MMM YYYY');
  }
}
