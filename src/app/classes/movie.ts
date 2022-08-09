export class Movie {
  title: string = '';
  director: string = '';
  duration: number = 0;
  category: [{ name: string; id: number }] = [{ name: '', id: 0 }];
  id: number = 0;
  images: [
    {
      image: string;
      name: string;
      type: string;
    }
  ] = [
    {
      image: '',
      name: '',
      type: '',
    },
  ];
  plot: string = '';
  year: number = 0;
}
