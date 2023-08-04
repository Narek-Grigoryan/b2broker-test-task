/// <reference lib="webworker" />

import {generateRowItemsByArraySize} from "../shared/utils";
import {FilterI} from "../components/header/header.models";

addEventListener('message', ({data}) => {
  const filterData: FilterI = data;
  const generatedRows = generateRowItemsByArraySize(filterData.arraySize);

  postMessage(generatedRows);
});
