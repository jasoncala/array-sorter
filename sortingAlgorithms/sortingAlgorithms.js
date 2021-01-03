export function getMergeSortAnimations(array) {
  const animations = [];
  let n = array.length;
  if (n <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, n - 1, auxiliaryArray, animations);
  return animations;
}

export function getHeapSortAnimations(array) {
  const animations = [];
  let n = array.length;

  heapSortHelper(array, n, animations);
  return animations;
}

export function getQuickSortAnimations(array) {
  const animations = [];
  let n = array.length;
  quickSortHelper(array, 0, n - 1, animations);
  return animations;
}

export function getBubbleSortAnimations(array) {
    const animations = [];
    let n = array.length;
    for (let i = 0; i < n-1; i++)
    {
        let flag = 0; 
        for (let j = 0; j < n-1- i; j++)
        {
            animations.push( [j, j+1] );
            

            if ( array[j] > array[j+1] )
            {
                
                animations.push( [ j, array[j+1] ] );
                animations.push( [ j+1, array[j] ] ); 
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                flag = 1;
            }
            else if ( array[j] <= array[j+1] ) {
                animations.push('no swap'); 
                animations.push('no swap');
            } 
            animations.push( [j, j+1] ); 
        }
        if (flag === 0) break; 
    }
    return animations;
  }

function heapSortHelper(array, n, animations){
  for (let i = Math.floor(n/2-1); i >= 0; i--){
    heapify(array, n, i, animations);
  }
  for ( let i = n-1; i > 0; i--)
  {
    animations.push( [ 0, i ] );
    animations.push( [ 0, array[i] ] );
    animations.push( [ i, array[0] ] );
    animations.push( [ 0, i ] );

    swap(array, 0, i);
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, i, animations){
  let largest = i;
  let left = 2*i + 1;
  let right = 2*i + 2;


  while ( left < n && array[left] > array[largest] )
  {
    largest = left;
  }

  while ( right < n && array[right] > array[largest] )
  {
    largest = right;
  }
  let heapSwaps = [];
  if (largest !==  i)
  {
    animations.push( [ largest, i ] ); // on
    animations.push( [ largest, array[i] ] ); // swap
    animations.push( [ i, array[largest] ] );
    animations.push( [ largest, i ] ); // off
    swap( array, largest , i);

    heapify( array, n, largest, animations);
  }
}

function quickSortHelper(
  auxiliaryArray,
  startIdx,
  endIdx,
  animations,){
  if(startIdx >= endIdx) return;

  let loc_of_pivot = partition(auxiliaryArray, startIdx, endIdx, animations);
  quickSortHelper(auxiliaryArray, startIdx, loc_of_pivot-1, animations);
  quickSortHelper(auxiliaryArray, loc_of_pivot+1, endIdx, animations);
}

function partition(auxiliaryArray, startIdx, endIdx, animations){
  let pivot = auxiliaryArray[startIdx];
  let start = startIdx;
  let end = endIdx;

  while (start < end){
    while (auxiliaryArray[start] <= pivot){
      start++;
    }

    while (auxiliaryArray[end] > pivot){
      end--;
    }

    if (start < end){
      animations.push([start, end]);
      animations.push([start, auxiliaryArray[end]]);
      animations.push([end, auxiliaryArray[start]]);
      animations.push([start, end]);

      swap(auxiliaryArray, start, end);
    }
  }
  animations.push([startIdx, end]);
  animations.push([startIdx,auxiliaryArray[end]]);
  animations.push([end, auxiliaryArray[startIdx]]);
  animations.push([startIdx, end]);

  swap(auxiliaryArray, startIdx, end);

  return end;
}


function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function swap(auxiliaryArray, start, end){
  let temp = auxiliaryArray[start];
  auxiliaryArray[start] = auxiliaryArray[end];
  auxiliaryArray[end] = temp;
}