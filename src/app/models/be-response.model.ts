export class BeResponseModel {
  id: string = '';
  int: number = 0;
  float: number = 0;
  color: string = ''
  child: {
    id: string,
    color: string
  } = {
    id: '',
    color: ''
  }
}
