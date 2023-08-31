export const bestBuyAPIKey = process.env.REACT_APP_BESTBUY_API_KEY;
export const pixabayAPIKey = process.env.REACT_APP_PIXABAY_API_KEY;

function merge(left, right, direction, sortParameter) {
  // Merge the two arrays: left and right

  let resultArray = [];

  // Concatenate values into the resultArray in order
  while (left.length && right.length) {
    // Check if we need to sort lowest to highest
    if (direction === "ascending") {
      // Different expressions based on different sort parameters. This occurs due to the structure of our product object
      if (sortParameter === "price") {
        if (left[0][sortParameter] < right[0][sortParameter]) {
          resultArray.push(left.shift());
        } else {
          resultArray.push(right.shift());
        }
      } else if (sortParameter === "rating") {
        const leftRating =
          left[0]["rating"]["average"] * left[0]["rating"]["count"];
        const rightRating =
          right[0]["rating"]["average"] * right[0]["rating"]["count"];
        if (leftRating < rightRating) {
          resultArray.push(left.shift());
        } else {
          resultArray.push(right.shift());
        }
      }
    } else if (direction === "descending") {
      if (sortParameter === "price") {
        if (left[0][sortParameter] > right[0][sortParameter]) {
          resultArray.push(left.shift());
        } else {
          resultArray.push(right.shift());
        }
      } else if (sortParameter === "rating") {
        const leftRating =
          left[0]["rating"]["average"] * left[0]["rating"]["count"];
        const rightRating =
          right[0]["rating"]["average"] * right[0]["rating"]["count"];
        if (leftRating > rightRating) {
          resultArray.push(left.shift());
        } else {
          resultArray.push(right.shift());
        }
      }
    }
  }

  // Spread to the resultArray because there will be one element left over after the while loop
  return [...resultArray, ...left, ...right];
}

export const mergeSort = function (
  unsortedArray,
  direction = "ascending",
  sortParameter = "price"
) {
  // No need to sort the array if the array only has one element or empty
  if (unsortedArray.length <= 1) {
    return unsortedArray;
  }
  // Figuring out the middle
  const middle = unsortedArray.length / 2;

  // Dividing the array into left and right
  const left = unsortedArray.slice(0, middle);
  const right = unsortedArray.slice(middle);

  // Using recursion to combine the left and right
  return merge(
    mergeSort(left, direction, sortParameter),
    mergeSort(right, direction, sortParameter),
    direction,
    sortParameter
  );
};
