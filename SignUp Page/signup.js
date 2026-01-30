document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-wizard");
  const progress = document.querySelector(".progress");
  const steps = document.querySelectorAll(".step");
  const stepsContainer = document.querySelector(".steps-container");
  const countrySelect = document.getElementById("country-select");
  const langSelect = document.getElementById("lang-select");
  const stepIndicators = document.querySelectorAll(".progress-container li");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const submitButton = document.querySelector(".submit-btn");

  document.documentElement.style.setProperty("--steps", stepIndicators.length);
  let currentStep = 0;

  const updateProgress = () => {
    let width = currentStep / (stepIndicators.length - 1);
    progress.style.transform = `scaleX(${width})`;

    stepsContainer.style.height = steps[currentStep].offsetHeight + "px";

    stepIndicators.forEach((indicator, index) => {
      indicator.classList.toggle("current", currentStep === index);
      indicator.classList.toggle("done", currentStep > index);
    });
    steps.forEach((step, index) => {
      step.style.transform = `translateX(-${currentStep * 100}%)`;
      step.classList.toggle("current", currentStep === index);
    });
    updateButton();
  };

  const updateButton = () => {
    prevButton.hidden = currentStep === 0;
    nextButton.hidden = currentStep >= stepIndicators.length - 1;
    submitButton.hidden = !nextButton.hidden;
  };

  const isValidStep = () => {
    const fields = steps[currentStep].querySelectorAll("input , textarea");
    return [...fields].every((feild) => feild.reportValidity());
  };

  const inputs = form.querySelectorAll("input , textarea");
  inputs.forEach((input) =>
    input.addEventListener("focus", (e) => {
      const focusedElement = e.target;
      const focusedStep = [...steps].findIndex((step) =>
        step.contains(focusedElement),
      );

      if (focusedStep !== -1 && focusedStep !== currentStep) {
        if (!isValidStep()) return;
        currentStep = focusedStep;
        updateProgress();
      }

      stepsContainer.scrollTop = 0;
      stepsContainer.scrollLeft = 0;
    }),
  );

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) return;

    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));

    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";

    setTimeout(() => {
      document.querySelector(".completed").hidden = false;
    }, 3000);
  });

  prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (currentStep > 0) {
      currentStep--;
      updateProgress();
    }
  });
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (!isValidStep()) return;
    if (currentStep < stepIndicators.length - 1) {
      currentStep++;
      updateProgress();
    }
  });

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Australia",
    "Austria",
    "Bangladesh",
    "Belgium",
    "Brazil",
    "Canada",
    "China",
    "Colombia",
    "Denmark",
    "Egypt",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",
    "Japan",
    "Kenya",
    "Malaysia",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Philippines",
    "Poland",
    "Portugal",
    "Russia",
    "Saudi Arabia",
    "Singapore",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Vietnam",
  ];

  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country; // The value sent to the server
    option.textContent = country; // The text user sees
    countrySelect.appendChild(option);
  });
  const langs = [
    "English",
    "Mandarin Chinese",
    "Hindi",
    "Spanish",
    "French",
    "Arabic",
    "Bengali",
    "Russian",
    "Portuguese",
    "Urdu",
    "Indonesian",
    "German",
    "Japanese",
    "Swahili",
    "Marathi",
    "Telugu",
    "Turkish",
    "Tamil",
    "Vietnamese",
    "Korean",
    "Italian",
  ];

  langs.forEach((lang) => {
    const option = document.createElement("option");
    option.value = lang; // The value sent to the server
    option.textContent = lang; // The text user sees
    langSelect.appendChild(option);
  });

  const openBtn = document.querySelector(".ques");
  const modal = document.getElementById("guideline-modal");
  const closeBtn = document.querySelector(".close-btn");

  // 1. Open the modal
  openBtn.addEventListener("click", (e) => {
    e.preventDefault(); // Stop link from jumping
    modal.classList.add("active");
  });

  // 2. Close when clicking the "X"
  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  // 3. Close when clicking the dark background (outside the box)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  updateProgress();
});
