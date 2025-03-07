const signin = async (formData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    username: formData.username,
    password: formData.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/auth/signin",
      requestOptions
    );
    const result = await response.json();
    if (!response.ok) {
      return result;
    }
    return result;
  } catch (error) {
    console.error("Error during signin:", error);
    return error;
  }
};

const signup = async (formData) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: formData.fullname,
    username: formData.username,
    password: formData.password,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
    credentials: "include",
  };

  try {
    const response = await fetch(
      "http://localhost:5000/auth/signup",
      requestOptions
    );
    const result = await response.json();
    if (!response.ok) {
      return result;
    }
    return result;
  } catch (error) {
    console.error("Error during signin:", error);
    return error;
  }

};

module.exports = {
  signin,
  signup
};
