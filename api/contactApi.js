import { BASE_URL } from "./baseApi.js";

// Add a new contact
export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${BASE_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating contact:", error);
    return null;
  }
};

function myFunction(
  message = "Thank you! Your contact form has been submitted successfully."
) {
  console.log("toast");
  var x = document.getElementById("snackbar");
  x.innerText = message; // Set the dynamic message
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

export const handleSubmitContactForm = async (event) => {
  event.preventDefault(); // Prevent form reload

  const firstName = document.getElementById("fname")?.value;
  const lastName = document.getElementById("lname")?.value;
  const phone = document.getElementById("phonenum")?.value;
  const email = document.getElementById("emailaddrs")?.value;
  const comment = document.getElementById("comment")?.value;

  const submitButton = document.getElementById("started");
  const originalButtonText = submitButton.innerHTML; // Store original text

  // Validate inputs
  if (!firstName || !lastName || !phone || !email) {
    myFunction("Please fill all details.");
    return;
  }

  try {
    // Change button text to loading GIF
    submitButton.innerHTML = `<div class="loader" ></div>`;

    // Call the API to create a contact
    const response = await createContact({
      firstName,
      lastName,
      phone,
      email,
      comment,
    });

    if (response) {
      console.log("Form submitted successfully. We will reach you soon!");

      // Clear the form after successful submission
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("phonenum").value = "";
      document.getElementById("emailaddrs").value = "";
      document.getElementById("comment").value = "";
      myFunction();
    }
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    myFunction(
      "An error occurred while submitting the form. Please try again later."
    );
  } finally {
    // Restore original button text
    submitButton.innerHTML = originalButtonText;

  }
};
