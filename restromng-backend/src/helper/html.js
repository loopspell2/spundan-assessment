function labelhtml(orderData) {
//   console.log(orderData);

  let contentHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Invoice</title>
    <style>
        body {
            font-family: 'Courier New', monospace;
            margin: 0;
            padding: 20px;
            background-color: #fff;
            color: #000;
            max-width: 600px;
            margin: 0 auto;
        }

        .invoice {
            border: 1px solid #000;
            padding: 15px;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
            border-bottom: 1px dashed #000;
            padding-bottom: 10px;
        }

        .title {
            font-size: 1.5rem;
            font-weight: bold;
        }

        .subtitle {
            font-size: 0.9rem;
        }

        .items-header {
            display: flex;
            border-bottom: 1px solid #000;
            font-weight: bold;
            padding: 5px 0;
        }

        .items-header div, .order-item div {
            padding: 5px;
        }

        .order-item {
            display: flex;
            border-bottom: 1px dotted #000;
        }

        .item-name {
            width: 40%;
        }

        .item-size {
            width: 20%;
            text-align: center;
        }

        .item-price {
            width: 20%;
            text-align: right;
        }

        .item-quantity {
            width: 20%;
            text-align: center;
        }

        .summary {
            margin-top: 15px;
            text-align: right;
        }

        .summary div {
            margin-bottom: 5px;
        }

        .final-total {
            margin-top: 10px;
            border-top: 1px double #000;
            padding-top: 5px;
            font-weight: bold;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8rem;
            border-top: 1px dashed #000;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="invoice">
        <div class="header">
            <div class="title">A LA CARTE</div>
            <div class="subtitle">Mix and match</div>
            <div class="date">Date: 07/03/2025</div>
            <div class="receipt">Receipt #: ${orderData._id}</div>
        </div>

        <div class="items-header">
            <div class="item-name">ITEM</div>
            <div class="item-size">SIZE</div>
            <div class="item-price">PRICE</div>
            <div class="item-quantity">QTY</div>
        </div>

        <div>
        ${orderData.items.map(item => `
          <div class="order-item">
            <div class="item-name">${item.item}</div>
            <div class="item-size">${item.type}</div>
            <div class="item-price">${item.cost}</div>
            <div class="item-quantity">${item.quantity}</div>
          </div>
        `).join('')}
        </div>

        <div class="summary">
            <div class="subtotal">Subtotal: ${orderData.total}</div>
            <div class="gst">GST (18%): ${orderData.gst}</div>
            <div class="restaurant-charge">Restaurant Charge (5%): ${orderData.restaurantCharge}</div>
            <div class="final-total">TOTAL: ${orderData.finalTotal}</div>
        </div>

        <div class="footer">
            Thank you for your order!
            <br>
            Please visit again
        </div>
    </div>
</body>
</html>`;

  return contentHtml;
}

module.exports = labelhtml;
