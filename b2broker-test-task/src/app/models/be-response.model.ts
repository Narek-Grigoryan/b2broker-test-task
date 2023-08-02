export class BeResponseModel {
  id: string = '';
  int: number = 0;
  float: number = 0;
  color: string = ''
  child: {
    id: number,
    color: string
  } = {
    id: 0,
    color: ''
  }
}
