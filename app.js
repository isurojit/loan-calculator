//Listen for Submit
document.querySelector('#loan-form').addEventListener('submit', delayResults);

//Get loading image & result section
const loadingImg = document.querySelector('#loading');
const resultSection = document.querySelector('#results');

//Delay function
function delayResults(e){
    //Hiding The Result Section
    resultSection.style.display = "none";

    //Show Loader
    loadingImg.style.display = "block";

    setTimeout(calculateResults, 2000);
    e.preventDefault();
}

//Calculate Results
function calculateResults(){
    //Ui input Vars
    const inputAmount = document.querySelector('#amount');
    const inputInterest = document.querySelector('#interest');
    const inputYears = document.querySelector('#years');

    //Ui output Vars
    const outputMonthlyPayment = document.querySelector('#monthly-payment');
    const outputTotalPayment = document.querySelector('#total-payment');
    const outputTotalInterest = document.querySelector('#total-interest');

    const principal = parseFloat(inputAmount.value);
    const claculatedInterest = parseFloat(inputInterest.value) / 100/ 12;
    const calculatedPayments = parseFloat(inputYears.value) * 12;

    //Compute monthly payments
    const computeMonthlyPayment = Math.pow(1 + claculatedInterest, calculatedPayments);
    const monthly = (principal * computeMonthlyPayment * claculatedInterest) / (computeMonthlyPayment -1);

    if(isFinite(monthly)) {
        outputMonthlyPayment.value = monthly.toFixed(2);
        outputTotalPayment.value = (monthly * calculatedPayments).toFixed(2);
        outputTotalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //show results
        resultSection.style.display = 'block';

        //hide loader
        loadingImg.style.display = 'none';

    }else{
        showError('Please Check Your Numbers');

        //show results
        resultSection.style.display = 'none';

        //hide loader
        loadingImg.style.display = 'none';
    }
}

//Show Error
function showError(error){
    //create a div
    const errorDiv = document.createElement('div');

    //Get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading')

    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create Text Node nad append to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error by using set timeout after 3s
    setTimeout(clearError, 3000);
}

//Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}
