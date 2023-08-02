import {BeResponseModel} from "../models/be-response.model";

export function isInt(value: any): boolean {
  if (isNaN(value)) {
    return false;
  }

  const x = parseFloat(value);
  return (x | 0) === x;
}

export function generateRowItemsByArraySize(arraySize: number): BeResponseModel[] {
  const generatedArray: BeResponseModel[] = [];

  for (let i = 0; i < arraySize; i++) {
    generatedArray.push(generateRowItem(i + 100));
  }

  return generatedArray;
}

function generateRowItem(id: number): BeResponseModel {
  return {
    id: id.toString(),
    int: Math.floor(Math.random() * 1000),
    float: Math.random(),
    color:  getRandomHexColor(),
    child: {
      id: id + 1,
      color: getRandomHexColor()
    }
  }
}

function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
