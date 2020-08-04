from flask import Flask
import numpy as np
from scipy.stats import norm

app = Flask(__name__)

@app.route("/rec_installments")
def get_rec_installments():
    # all units are in months
    purchase_price = 600
    cash = 500
    var = 0.15 * cash

    def p(i):
        std = (cash - purchase_price / i) / (i * var)
        return 2* (1 - norm.cdf(std))
    npp = np.vectorize(p)

    n_mo = 20
    output = npp(np.arange(1, n_mo))
    output[output>1] = 1


    return (np.argmin(output) + 1).__str__()

if __name__ == '__main__':
    app.run()