/*
Key Assumptions: 
    1. Utilities are paid at a set time each month
    2. Paid first of each month
*/


// Create firebase instance (connecting to database)
// console.log(getAccountBalanceAsOfTime("2019-12-20"));
// console.log(getAmountOfKnownPayments("2020-02-23"));

getAmountOfPaymentsRemainingInMonth("2020-02-23", 1);
const bg = chrome.extension.getBackgroundPage();
const amt_total = bg.monthlyExpenses;
console.log(amt_total);
/*
console.log("Final Log: " + getAmountRemainingSync("2020-02-23", 1))
function getAmountRemainingSync(date, n_mo) {
    console.log("Made it inside")
    const jsInitChecktimer = setInterval(checkForJS_Finish, 500);
    var ret_val;
    function checkForJS_Finish () {
        const ret_val = getAmountOfPaymentsRemainingInMonth(date, n_mo);
        if (typeof ret_val != "undefined") {
            clearInterval (jsInitChecktimer);
        }
    }
    return ret_val;
}
*/

// defining helper function that gets account balance as of a set time
function getAccountBalanceAsOfTime (present_date) {
    Firebase.enableLogging(true);
    var ref = new Firebase('https://nubank-credit-control.firebaseio.com');
    // querying Firebase
    ref.once("value", function(snapshot) {
        t_ids = Object.keys(snapshot.child("users").child("u142652").child("transactions").val());
        var balance = 0;
        for (var i in t_ids){
            trans_temp = snapshot.child("transactions").child(t_ids[i])
            if (trans_temp.child("date").val() <= present_date) {
                t_amt = trans_temp.child("amount").val()
                balance += t_amt;
            }
        }
        //console.log(balance);
        return balance;
      }, () => console.log("Error"));
}



function getMonthlyExpenses (present_date, item_cost, n_installments) {
    var monthly_expenses = [];
    for (var i = 0; i < 12; i ++) {
        var first_date_of_month = present_date.slice(0, 8) + "00";
        var expected_expenses = getAmountOfPaymentsRemainingInMonth(first_date_of_month, i + 1);
        if (i < n_installments) {
            expected_expenses += item_cost / n_installments;
        }
        monthly_expenses.push(expected_expenses);
    }

}



/* @params 
*   present_date : a specific date in format string "YYYY-MM-DD"
*   n_mo_back: an int, the number of months back to make estimation
*  @returns
*   float: the expected amount of payments remaining for the rest of the month
*/
function getAmountOfPaymentsRemainingInMonth (present_date, n_mo_back) {
    var ret_amt_total;
    Firebase.enableLogging(true);
    var ref = new Firebase('https://nubank-credit-control.firebaseio.com');
    var look_date;
    var first_date_of_month;
    var last_date_of_month;
    var days_left_in_mo;

    var d = new Date();
    d.setYear(present_date.slice(0, 4));
    d.setMonth(present_date.slice(5, 7) - 1);
    d.setDate(present_date.slice(8, 10));
    d.setMonth(d.getMonth() - n_mo_back);

    // define days left in month
    days_left_in_mo = 30 - d.getDate();

    // define first date of month, and define look date
    if ((d.getMonth() + 1) > 9) {
        first_date_of_month = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-00";
        look_date = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + present_date.slice(8, 10);
    } else {
        first_date_of_month = "" + d.getFullYear() + "-0" + (d.getMonth() + 1) + "-00";
        look_date = "" + d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + present_date.slice(8, 10);
    }

    // define last date of month
    d.setMonth(d.getMonth() + 1);
    if ((d.getMonth() + 1) > 9) {
        last_date_of_month = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-00";
    } else {
        last_date_of_month = "" + d.getFullYear() + "-0" + (d.getMonth() + 1) + "-00";
    }

    //console.log(first_date_of_month.toString())
    //console.log(look_date.toString())
    //console.log(last_date_of_month.toString())


    // query Firebase
    ref.on("value", function(snapshot) {
        t_ids = Object.keys(snapshot.child("users").child("u142652").child("transactions").val());
        var amt_total_spent = 0; // total amount of dollars spent in month
        var amt_installments = 0; // total left to pay to installments
        var amt_fixed = 0; // total left to pay to fixed costs (e.g. Housing, Utilities, etc)
        var amt_guess = 0; // guess for random values

        for (var i in t_ids){
            trans_temp = snapshot.child("transactions").child(t_ids[i])
            if (trans_temp.child("date").val() >= first_date_of_month && 
                    trans_temp.child("date").val() < last_date_of_month &&
                    trans_temp.child("category").val() != "Utilities" &&
                    trans_temp.child("category").val() != "Housing" &&
                    trans_temp.child("amount").val() < 0) {
                // accumulate total spent
                amt_total_spent += (-1 * trans_temp.child("amount").val());
            }
            if (trans_temp.child("date").val() >= look_date && 
                    trans_temp.child("date").val() < last_date_of_month) {
                // if a transaction was not the final installment
                if (trans_temp.child("nPart").val() <= trans_temp.child("nTotal").val() - n_mo_back) {
                    amt_installments += -1 * trans_temp.child("amount").val();
                }
                // if the transaction is not a unpaid fixed cost (i.e. utilities / housing)
                if (trans_temp.child("category").val() == "Utilities" || 
                        trans_temp.child("category").val() == "Housing") {
                    amt_fixed += -1 * trans_temp.child("amount").val();
                }
            }
        }
        // we guess due to chance the average amount of spending not accounted for
        // as being uniformlly distributed over the duration of the month
        amt_guess = (days_left_in_mo / 30) * (amt_total_spent - amt_installments)
        //console.log(amt_installments);
        //console.log(amt_fixed);
        //console.log(amt_guess);
        var amt_total = amt_installments + amt_fixed + amt_guess;
        console.log(amt_total);
        chrome.runtime.sendMessage({type: "setMonthlyExpenses", amt_total: amt_total});
        ret_amt_total = amt_total;
      }, () => console.log("Error"));
      return ret_amt_total;
}