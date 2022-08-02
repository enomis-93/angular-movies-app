export class Movie {
  title: string = '';
  director: string = ' ';
  duration: number = 0;
  category: [{ name: string; id: number }] = [{ name: '', id: 0 }];
  id: number = 0;
  path_locandina: string = '';
  plot: string = '';
  year: number = 0;
}
