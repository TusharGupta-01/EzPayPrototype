function togglePassword(el) {
  const input = document.querySelector(el.getAttribute("toggle"));
  if (input.type === "password") {
    input.type = "text";
    el.innerHTML = `<img src="./eye.png" alt="show">`;
    // el.textContent = "Hide";
  } else {
    input.type = "password";
    el.innerHTML = `<img src="./hidden.png" alt="show">`;
  }
}
