const billAmount = document.getElementById("billAmount");
const cashGiven = document.getElementById("cashGiven");
const returnChange = document.getElementById("returnChange");

const noOfNotes = document.querySelectorAll(".noOfNotes");
const error = document.querySelector(".error");
const inputbox = document.querySelector("#inputbox");
const nextButton = document.querySelector("#nextButton");
const output = document.querySelector("#output");

const noteAmounts = [2000, 500, 100, 20, 10, 5, 1];

function next() {
  hideError();
  const bill = billAmount.value;
  if (bill > 0) {
    nextButton.style.display = "none";
    inputbox.style.display = "block";
  } else {
    showError("Enter valid bill amount");
  }
}

function check() {
  clearNotes();
  hideError();
  let bill = Number(billAmount.value);
  let cash = Number(cashGiven.value);
  if (bill > 0 && cash > 0) {
    if (bill > cash) {
      showError("Cash Given is less than bill , please enter right amount");
      return;
    } else if (bill == cash) {
      showError("No Amount Should be returned to customer");
      return;
    } else {
      calculateNotes(bill, cash);
    }
  } else {
    showError("Enter valid bill amount and cash given to continue");
  }
}

function calculateNotes(bill, cash) {
  let returnAmount = cash - bill;
  returnChange.textContent = "Return Change : " + returnAmount;
  output.style.display = "block";

  for (let i = 0; i < noteAmounts.length; i++) {
    returnAmount = compareNotes(returnAmount, noteAmounts[i], i);
  }
}

function compareNotes(remainder, noteAmount, index) {
  if (remainder >= noteAmount) {
    let notes = Math.floor(remainder / noteAmount);
    remainder = remainder - notes * noteAmount;

    noOfNotes[index].textContent = `${notes}`;
  }
  return remainder;
}

function hideError() {
  error.style.display = "none";
}

function clearNotes() {
  for (let notes of noteAmounts) {
    notes.innerText = "";
  }
}
function showError(text) {
  error.style.display = "block";
  error.innerText = text;
  output.style.display = "none";
}
