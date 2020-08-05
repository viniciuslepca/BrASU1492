from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from scipy.stats import norm
import math
import copy

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "<p>Server is working</p>"

@app.route("/rec_installments", methods=["POST"])
def get_rec_installments():
    data = request.get_json()
    purchase_price = data['price']
    balance = data['balance']
    income = data['income']
    bills = data['bills']
    expense_ceiling = data['expenseCeiling']
    predicted_expenses = data['predictedExpenses']
    var = 0.15 * balance
    n_months = 12

    unsorted_recommendations = make_recommendation_list(balance, purchase_price, var, n_months)
    # Create sorted list of tuples that includes the number of installments
    recommendations = []
    for index, prob in enumerate(unsorted_recommendations):
        recommendations.append({"installments": index + 1, "prob": prob})
    recommendations.sort(key=lambda dict: dict['prob'])

    # Make recommended limit line from income
    recommended_limit = 0.3 * income
    balance_by_income = balance / income
    max_offset = 2 / 3
    offset_factor = min(max_offset, balance_by_income)
    rec_limits = [0] * n_months
    for i in range(n_months):
        rec_limits[i] = (recommended_limit + offset_factor * recommended_limit * math.log(i + 1)) / (i + 1)

    # Find first recommendation that fits under the recommended limit
    rec_installments = 0
    for item in recommendations:
        bills_with_purchase = get_bills_with_current_purchase(purchase_price, bills, item['installments'])
        if fits_under_limit(bills_with_purchase, rec_limits) and fits_under_expense_ceiling(bills_with_purchase, predicted_expenses, expense_ceiling):
            rec_installments = item['installments']
            break

    return_object = {
        'rec_installments': rec_installments
    }

    return jsonify(return_object)

def get_bills_with_current_purchase(price, bills, installments):
    value_to_add = price / installments
    new_bills = copy.deepcopy(bills)
    for i in range(installments):
        new_bills[i] = bills[i] + value_to_add
    return new_bills

def fits_under_limit(bills, limit_line):
    for i in range(len(bills)):
        if bills[i] > limit_line[i]:
            return False
    return True

def fits_under_expense_ceiling(bills, predicted_expenses, ceiling):
    for i in range(len(bills)):
        if bills[i] + predicted_expenses > ceiling:
            return False
    return True

def make_recommendation_list(cash, purchase_price, var, n_months):
    def p(i):
        std = (cash - purchase_price / i) / (i * var)
        return 2 * (1 - norm.cdf(std))
    npp = np.vectorize(p)

    output = npp(np.arange(1, n_months))
    output[output>1] = 1
    print(np.argmin(output) + 1)
    return output

if __name__ == '__main__':
    app.run()