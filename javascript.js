const display = document.getElementById('display-id');
const input = document.querySelectorAll('button');
const decimalButton = document.querySelector('decimal');


input.forEach((button) => {
  button.addEventListener('click', getInput);
});

let leftSide = [];
let leftSet = false;
let rightSide = [];
let rightSet = false;
let answerInMem = false;
let decimalSet= false;
let op = '';

function getInput(event){
  let current = event.target.textContent;
  handleInput(current);
}

function handleInput(current){
  if(current === 'AC'){
    clearAll();
    return;
  } 
  if(!leftSet) {
    if(!isNaN(Number(current))){
      leftSide.push(current);
      setDisplay(leftSide.join(''));
    } 
    else {
      if(leftSide.length === 0){
        leftSide = [0];
      }

      if(current === '←'){
        handleBackSpace();
      } 
      else if(current === '='){
        setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
        return;
      } 
      else {
        leftSet = true;
        op = current;
        setDisplay(`${Math.round(leftSide.join('')*10000)/10000}${op}`);
      }
    }
  } else if(answerInMem){
    if(!isNaN(Number(current))){
      leftSide = [];
      leftSet = false;
      leftSide.push(current);
      setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
    } else {
      if(current === '←'){
        handleBackSpace();
      } 
      else if(current === '='){
        setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
        leftSet = false;
        return;
      } 
      else {
        op = current;
        setDisplay(`${Math.round(leftSide.join('')*10000)/10000}${op}`);
      }
    }
  }
  else{
    if(!isNaN(Number(current))){
      rightSide.push(current);
      rightSet = true;
      setDisplay(`${Math.round(leftSide.join('')*10000)/10000}${op}${Math.round(rightSide.join('')*10000)/10000}`);
    } 
    else {
      if(rightSide.length === 0){
        if(current === '←'){
          handleBackSpace();
        } else if(current === '='){
          setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
          leftSet = false; 
        }
        else {
          op = current;
          setDisplay(`${Math.round(leftSide.join('')*10000)/10000}${op}`);
        }
      } 
      else {
        if(current === '←'){
          handleBackSpace();
        } 
        else {
          handleOperation(leftSide.join(''), rightSide.join(''), current);
        }
      }
    }
  }
}

function handleOperation(num1String, num2String, current){
  let answer;
  let num1 = Number(num1String);
  let num2 = Number(num2String);
  if(current === '='){
    switch(op){
      case '+':
        answer = num1 + num2;
        setDisplay(`${Math.round(answer*10000)/10000}`);
        leftSide = [answer];
        rightSide =[];
        rightSet = false;
        op = '';
        return;
      case '-':
        answer = num1 - num2;
        setDisplay(`${Math.round(answer*10000)/10000}`);
        leftSide = [answer];
        rightSide =[];
        rightSet = false;
        op = '';
        return;
      case '*':
        answer = num1 * num2;
        setDisplay(`${Math.round(answer*10000)/10000}`);
        leftSide = [answer];
        rightSide =[];
        rightSet = false;
        op = '';
        return;
      case '/':
        if(num2 === 0) { 
          divideByZero();
        } 
        else{
          answer = (num1 / num2);
          setDisplay(`${Math.round(answer*10000)/10000}`);
          leftSide = [answer];
          rightSide =[];
          rightSet = false;
          op = '';
          return;
        }
    }
  } else {
    switch(op){
      case '+':
        answer = num1 + num2;
        setDisplay(`${Math.round(answer*10000)/10000}${current}`);
        leftSide = [answer];
        rightSide =[];
        op = current;
        rightSet = false;
        return;
      case '-':
        answer = num1 - num2;
        setDisplay(`${Math.round(answer*10000)/10000}${current}`);
        leftSide = [answer];
        rightSide =[];
        op = current;
        rightSet = false;
        return;
      case '*':
        answer = num1 * num2;
        setDisplay(`${Math.round(answer*10000)/10000}${current}`);
        leftSide = [answer];
        rightSide =[];
        op = current;
        rightSet = false;
        return;
      case '/':
        if(num2 === 0) { 
        divideByZero();
        } else{
          answer = num1 / num2;
          setDisplay(`${Math.round(answer*10000)/10000}${current}`);
          leftSide = [answer];
          rightSide =[];
          op = current;
          rightSet = false;
          return;
        }
    }
  }
}

function divideByZero(){
  leftSide = [];
  rightSide = [];
  op = '';
  leftSet = false;
  rightSet = false;
  setDisplay(`ERROR`);
}

function handleBackSpace(){
  if(!leftSet){
    if(leftSide.length === 0){
      return;
    }
    else if(leftSide.length === 1){
      leftSide = [];
      setDisplay(0);
      return;
    } 
    else {
    leftSide.pop();
    setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
    return;
    }
  } 
  else if(!rightSet){
    if(op.length === 1){
      op = '';
      leftSet = false;
      setDisplay(`${Math.round(leftSide.join('')*10000)/10000}`);
      return;
    }
    else {
      leftSide = [];
      leftSet = false;
      setDisplay(0);
      return;
    } 
  } 
  else {
    if(rightSide.length === 0){
      return;
    } 
    else if(rightSide.length === 1){
      rightSide = [];
      rightSet = false;
      setDisplay(`${Math.round(leftSide.join('')*10000)/10000}${op}`);
      return;
    } else {
      rightSide.pop();
      setDisplay(leftSide.join('').concat(op).concat(rightSide.join('')));
      return;
    }
  }
}

function clearAll(){
  leftSide = [];
  rightSide = [];
  leftSet = false;
  op = '';
  setDisplay(0);
}

function setDisplay(input){
  display.textContent = input;
}