export default function getRandomIndexes(){
  let randomIndexes = [];
  let i = 0;
  while(i<=8){
    randomIndexes.push(randomInteger(0,51) + ' ');
    i++;
    for (let k = 0 ; k<randomIndexes.length-1; k++){
      if (randomIndexes[k] == randomIndexes[randomIndexes.length-1]){
        randomIndexes.pop();
        i--;
      }
    }
  }
   randomIndexes =  randomIndexes.concat(randomIndexes.slice());
   randomIndexes = mixArray(randomIndexes);
   return randomIndexes;
}



  function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function mixArray(arr){
  let a,b,c
  for (let j  = 0; j<arr.length-1; j++){
    a = randomInteger(0,17);
    b  = arr[a];
    c = arr[0];
    arr[a] = c;
    arr[0] = b;
  }
  return arr;
}
