export const replaceTemplate = (temp, data) => {
  let output = temp
    .replaceAll("{%ID%}", data.id)
    .replaceAll("{%PRODUCTNAME%}", data.productName)
    .replaceAll("{%IMAGE%}", data.image)
    .replaceAll("{%FROM%}", data.from)
    .replaceAll("{%NUTRIENTS%}", data.nutrients)
    .replaceAll("{%QUANTITY%}", data.quantity)
    .replaceAll("{%PRICE%}", data.price)
    .replaceAll("{%DESCRIPTION%}", data.description);

  if (!data.organic) output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");

  return output;
};
