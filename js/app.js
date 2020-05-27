// listen for button submit on the loan form
document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // hide results
  document.querySelector("#results").style.display = "none";
  // show loader
  document.querySelector("#loading").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults() {
  const uiAmount = document.querySelector("#amount");
  const uiInterest = document.querySelector("#interest");
  const uiTerm = document.querySelector("#term");
  const uiMonthlyPayment = document.querySelector("#monthly-payment");
  const uiTotalPayment = document.querySelector("#total-payment");
  const uiTotalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(uiAmount.value);
  const calculatedAPR = parseFloat(uiInterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(uiTerm.value) * 12;

  // calculate monthly payments
  const x = Math.pow(1 + calculatedAPR, calculatedPayments);
  const calculatedMonthly = (principal * x * calculatedAPR) / (x - 1);

  if (isFinite(calculatedMonthly)) {
    uiMonthlyPayment.value = calculatedMonthly.toFixed(2);
    uiTotalPayment.value = (calculatedMonthly * calculatedPayments).toFixed(2);
    uiTotalInterest.value = (
      calculatedMonthly * calculatedPayments -
      principal
    ).toFixed(2);
    showResHideLoad();
  } else {
    showError("Please check the values you have input");
  }
}

function showResHideLoad() {
  // show results
  document.querySelector("#results").style.display = "block";
  // hide loader
  document.querySelector("#loading").style.display = "none";
}

function hideResHideLoad() {
  // show results
  document.querySelector("#results").style.display = "none";
  // hide loader
  document.querySelector("#loading").style.display = "none";
}

function showError(error) {
  hideResHideLoad();
  // create a div for the error alert
  const errorDiv = document.createElement("div");
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  // assign bootstrap's alert classes with the alert in red
  errorDiv.className = "alert alert-danger";
  // create a text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert the error above the heading using the insertBefore method
  // which takes what you want to insert and where you want to insert that before
  card.insertBefore(errorDiv, heading);
  // clear error after three seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
