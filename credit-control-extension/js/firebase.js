/*
Key Assumptions: 
    1. Utilities are paid at a set time each month
    2. Paid first of each month
*/
getMonthlyExpenses();

function getMonthlyExpenses () {
    let ret_amt_total;
    Firebase.enableLogging(true);
    let ref = new Firebase('https://nubank-credit-control.firebaseio.com');
    let dates = [];

    let d = new Date();
    let present_date;
    if ((d.getMonth() + 1) > 9) {
        present_date = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    } else {
        present_date = "" + d.getFullYear() + "-0" + (d.getMonth() + 1) + "-" + d.getDate();
    }

    // populate dates with the first date of each month
    let first_date_of_month;
    d.setYear(present_date.slice(0, 4));
    d.setMonth(present_date.slice(5, 7) - 1);
    d.setDate(present_date.slice(8, 10));
    d.setMonth(d.getMonth() - 1);
    // define first date of month, and define look date
    if ((d.getMonth() + 1) > 9) {
        first_date_of_month = "" + d.getFullYear() + "-" + (d.getMonth() + 1) + "-00";
    } else {
        first_date_of_month = "" + d.getFullYear() + "-0" + (d.getMonth() + 1) + "-00";
    }
    
    // populate last date of month
    let last_date_of_month = present_date.slice(0, 7) + "-00";

    console.log(first_date_of_month);
    console.log(present_date);
    console.log(last_date_of_month);

    // query Firebase
    let amt_installments = [12];
    let amt_fixed = 0;
    ref.on("value", function(snapshot) {
        let income = snapshot.child("users").child("u142652").child("income").val();
        let t_ids = Object.keys(snapshot.child("users").child("u142652").child("transactions").val());
        // handled in backend
        for (let d = 0; d < 12; d++) {
            amt_installments[d] = 0;
        }
        for (let i in t_ids) {
            let trans_temp = snapshot.child("transactions").child(t_ids[i]);
            if (trans_temp.child("date").val() >= first_date_of_month && 
                    trans_temp.child("date").val() < last_date_of_month) {
                // if a transaction was not the final installment
                if (trans_temp.child("nPart").val() < trans_temp.child("nTotal").val()) {
                    console.log("Installments value: " + trans_temp.child("amount").val());
                    let rem_pay = trans_temp.child("nTotal").val() - trans_temp.child("nPart").val();
                    for (let m = 0; m < rem_pay; m++) {
                        amt_installments[m] += -1 * trans_temp.child("amount").val();
                    }
                }
                // if transaction is fixed
                if (trans_temp.child("category").val() === "Utilities" ||
                    trans_temp.child("category").val() === "Housing") {
                    amt_fixed += -1 * trans_temp.child("amount").val();
                }
            }
            if (trans_temp.child("date").val() >= last_date_of_month &&
                trans_temp.child("date").val() < present_date) {
                // if a transaction was not the final installment
                if (trans_temp.child("nPart").val() === 1 && trans_temp.child("nTotal").val() > 1) {
                    console.log("Installments value: " + trans_temp.child("amount").val());
                    let rem_pay = trans_temp.child("nTotal").val() - trans_temp.child("nPart").val();
                    for (let m = 0; m <= rem_pay; m++) {
                        amt_installments[m] += -1 * trans_temp.child("amount").val();
                    }
                }
            }
        }
        // sending array
        chrome.runtime.sendMessage({type: "setExpenses", amt_installments: amt_installments, amt_fixed: amt_fixed, income: income});

      }, () => console.log("Error"));
}


// defining helper function that gets account balance as of a set time
function getAccountBalanceAsOfTime (present_date) {
    Firebase.enableLogging(true);
    let ref = new Firebase('https://nubank-credit-control.firebaseio.com');
    // querying Firebase
    ref.once("value", function(snapshot) {
        let t_ids = Object.keys(snapshot.child("users").child("u142652").child("transactions").val());
        let balance = 0;
        for (let i in t_ids){
            let trans_temp = snapshot.child("transactions").child(t_ids[i]);
            if (trans_temp.child("date").val() <= present_date) {
                let t_amt = trans_temp.child("amount").val();
                balance += t_amt;
            }
        }
        //console.log(balance);
        return balance;
      }, () => console.log("Error"));
}