/// <reference lib="webworker" />

import {generateRowItemsByArraySize} from "../shared/utils";
import {FilterChangeI} from "../components/header/header.models";

addEventListener('message', ({data}) => {
  const filterData: FilterChangeI = data;
  const generatedRows = generateRowItemsByArraySize(filterData.arraySize);

  postMessage(generatedRows);
});
