import { Category } from './category';
import { Image } from './image';

export class Movie {
  title: string = '';
  director: string = '';
  duration: number = 0;
  category: Category[] = [{ name: '', id: 0 }];
  id: number = 0;
  images: Image[] = [];
  plot: string = '';
  year: number = 0;
}
