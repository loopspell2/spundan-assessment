const placeOrder = async (items) => {
  console.log("items: ", items);

  const converted = convertPayload(items);
  console.log("converted: ", converted);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    items: converted,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch("http://localhost:5000/order", requestOptions);

    if (!response.ok) {
      const result = await response.json();
      return result;
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/pdf")) {
      const pdfBlob = await response.blob();

      displayPdfInBrowser(pdfBlob);

      downloadPdf(pdfBlob, "order_receipt.pdf");

      return {
        status: true,
        message: "pdf download successfully"
      };
    } else {
      const data = await response.json();
      console.log("Response data:", data);
      return data;
    }
  } catch (error) {
    console.error("Error placing order:", error);
    return {
      status: false,
      message:error.message
    }
  }
};

function convertPayload(items) {
  if (!Array.isArray(items)) {
    console.error("Items is not an array:", items);
    return [];
  }

  return items.map((item) => ({
    item: item.item,
    type: item.size,
    cost: item.price,
    quantity: item.quantity,
  }));
}

const displayPdfInBrowser = (pdfBlob) => {
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Option 1: Open in a new tab
  // window.open(pdfUrl, '_blank');

  const iframe = document.createElement("iframe");
  iframe.src = pdfUrl;
  iframe.style.width = "100%";
  iframe.style.height = "500px";

  const container = document.getElementById("pdf-container"); // Create this element in your HTML
  if (container) {
    container.innerHTML = "";
    container.appendChild(iframe);
  }
};

const downloadPdf = (pdfBlob, filename) => {
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

module.exports = {
  placeOrder,
};
