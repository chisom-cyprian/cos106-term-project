// ============================================================
// contact.js - Contact form validation
// Demonstrates: form validation, event handling, DOM manipulation.
// Checks: no field empty, valid email format, phone digits only.
// ============================================================

(function () {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d+$/;

  function setError(fieldId, hasError) {
    document.getElementById(fieldId).classList.toggle("has-error", hasError);
  }

  function validate() {
    let valid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    const nameOk = name.length > 0;
    setError("field-name", !nameOk);
    if (!nameOk) valid = false;

    const emailOk = email.length > 0 && emailPattern.test(email);
    setError("field-email", !emailOk);
    if (!emailOk) valid = false;

    const phoneOk = phone.length > 0 && phonePattern.test(phone);
    setError("field-phone", !phoneOk);
    if (!phoneOk) valid = false;

    const messageOk = message.length > 0;
    setError("field-message", !messageOk);
    if (!messageOk) valid = false;

    return valid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    success.classList.remove("show");

    if (validate()) {
      success.classList.add("show");
      form.reset();
    } else {
      const firstError = form.querySelector(
        ".has-error input, .has-error textarea",
      );
      if (firstError) firstError.focus();
    }
  });

  ["name", "email", "phone", "message"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      document.getElementById("field-" + id).classList.remove("has-error");
    });
  });
})();
