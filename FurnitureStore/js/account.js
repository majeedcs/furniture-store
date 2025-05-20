document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault(); // stops the default action that normally happens when a form is submitted

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const phone = document.getElementById("phone").value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (!emailRegex.test(email)) {
    alert("Invalid email format");
    return;
  }

  if (!passwordRegex.test(password)) {
    alert("Password too weak (Min 8 characters, 1 uppercase, 1 lowercase, 1 number)");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const userData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName: document.getElementById("lastName").value.trim(),
    email,
    password,
    phone,
    street: document.getElementById("street").value.trim(),
    apartment: document.getElementById("apartment").value.trim(),
    postalCode: document.getElementById("postalCode").value.trim(),
    city: document.getElementById("city").value.trim(),
    province: document.getElementById("province").value.trim(),
    country: document.getElementById("country").value.trim()
  };

  localStorage.setItem("userAccount", JSON.stringify(userData));
  alert("Account created successfully!");
  document.getElementById("registerForm").reset();
});
