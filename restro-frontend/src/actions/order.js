const placeOrder = async (items) => {

    console.log("items : ", ...items);

  let converted = convertPayload(items);

  console.log("converted : ",converted);



  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    items,
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
      // Get the PDF as a blob
      const pdfBlob = await response.blob();

      // Option 1: Display PDF in browser (using an iframe or object tag)
      displayPdfInBrowser(pdfBlob);

      // Option 2: Download the PDF file
      downloadPdf(pdfBlob, "order_receipt.pdf");

      return true;
    } else {
      // Handle non-PDF response
      const data = await response.json();
      console.log("Response data:", data);
      return data;
    }
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

function convertPayload(rawData) {
    return rawData.items.map((item) => ({
      item: item.item,
      type: item.size,
      cost: item.price,
      quantity: item.quantity,
    }));
  }

// Function to display PDF in browser
const displayPdfInBrowser = (pdfBlob) => {
  // Create a URL for the blob
  const pdfUrl = URL.createObjectURL(pdfBlob);

  // Option 1: Open in a new tab
  // window.open(pdfUrl, '_blank');

  // Option 2: Display in an iframe on the current page
  const iframe = document.createElement("iframe");
  iframe.src = pdfUrl;
  iframe.style.width = "100%";
  iframe.style.height = "500px";

  // Add iframe to a container in your page
  const container = document.getElementById("pdf-container"); // Create this element in your HTML
  if (container) {
    container.innerHTML = "";
    container.appendChild(iframe);
  }
};

// Function to download PDF file
const downloadPdf = (pdfBlob, filename) => {
  const url = URL.createObjectURL(pdfBlob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
};

module.exports = {
  placeOrder,
};
