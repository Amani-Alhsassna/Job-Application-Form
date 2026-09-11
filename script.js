document.addEventListener("DOMContentLoaded", function () {

    let currentStep = 1;
    const totalSteps = 6;

    const stepTitles = [
        "Personal Information",
        "Education",
        "Professional Information",
        "Skills & Languages",
        "Experience & Projects",
        "Documents & Final Details"
    ];

    // Elements

    const welcomePage = document.getElementById("welcomePage");
    const application = document.getElementById("application");
    const successPage = document.getElementById("successPage");

    const applicationForm =
        document.getElementById("applicationForm");

    const startEmail =
        document.getElementById("startEmail");

    const emailError =
        document.getElementById("emailError");

    const continueButton =
        document.getElementById("continueButton");

    const backButton =
        document.getElementById("backButton");

    const nextButton =
        document.getElementById("nextButton");

    const submitButton =
        document.getElementById("submitButton");

    const submitAnotherButton =
        document.getElementById("submitAnotherButton");

    const stepTitle =
        document.getElementById("stepTitle");

    const stepNumber =
        document.getElementById("stepNumber");

    const progress =
        document.getElementById("progress");

    const skillRange =
        document.getElementById("skillLevel");

    const skillValue =
        document.getElementById("skillValue");


    // =====================================
    // START APPLICATION
    // =====================================

    continueButton.addEventListener("click", function () {

        const email = startEmail.value.trim();

        if (email === "") {

            emailError.textContent =
                "Please enter your email address.";

            return;
        }

        if (!startEmail.checkValidity()) {

            emailError.textContent =
                "Please enter a valid email address.";

            return;
        }

        emailError.textContent = "";

        const applicationEmail =
            document.getElementById("email");

        if (applicationEmail) {
            applicationEmail.value = email;
        }

        welcomePage.style.display = "none";
        application.style.display = "block";

        currentStep = 1;

        showStep(1);

        window.scrollTo(0, 0);
    });


    // =====================================
    // SHOW STEP
    // =====================================

    function showStep(step) {

        const steps =
            document.querySelectorAll(".form-step");

        steps.forEach(function (section) {
            section.classList.remove("active");
        });

        const currentSection =
            document.getElementById("step" + step);

        if (currentSection) {
            currentSection.classList.add("active");
        }

        stepTitle.textContent =
            stepTitles[step - 1];

        stepNumber.textContent =
            "Step " + step + " of " + totalSteps;

        const percentage =
            (step / totalSteps) * 100;

        progress.style.width =
            percentage + "%";


        // Back button

        if (step === 1) {
            backButton.style.display = "none";
        } else {
            backButton.style.display = "inline-block";
        }


        // Next / Submit

        if (step === totalSteps) {

            nextButton.style.display = "none";

            submitButton.style.display = "inline-block";

        } else {

            nextButton.style.display = "inline-block";

            submitButton.style.display = "none";
        }
    }


    // =====================================
    // VALIDATE STEP
    // =====================================

    function validateCurrentStep() {

        const currentSection =
            document.getElementById(
                "step" + currentStep
            );

        if (!currentSection) {
            return true;
        }


        const requiredFields =
            currentSection.querySelectorAll(
                "input[required], select[required], textarea[required]"
            );


        for (let field of requiredFields) {

            if (!field.checkValidity()) {

                field.reportValidity();

                return false;
            }
        }


        // Skills

        if (currentStep === 4) {

            const skills =
                document.querySelectorAll(
                    'input[name="skills"]:checked'
                );

            const languages =
                document.querySelectorAll(
                    'input[name="languages"]:checked'
                );


            if (skills.length === 0) {

                alert(
                    "Please select at least one technical skill."
                );

                return false;
            }


            if (languages.length === 0) {

                alert(
                    "Please select at least one language."
                );

                return false;
            }
        }


        return true;
    }


    // =====================================
    // NEXT
    // =====================================

    nextButton.addEventListener("click", function () {

        if (!validateCurrentStep()) {
            return;
        }

        if (currentStep < totalSteps) {

            currentStep++;

            showStep(currentStep);

            window.scrollTo(0, 0);
        }
    });


    // =====================================
    // BACK
    // =====================================

    backButton.addEventListener("click", function () {

        if (currentStep > 1) {

            currentStep--;

            showStep(currentStep);

            window.scrollTo(0, 0);
        }
    });


    // =====================================
    // SKILL LEVEL
    // =====================================

    if (skillRange && skillValue) {

        skillRange.addEventListener("input", function () {

            skillValue.textContent =
                skillRange.value + "%";
        });
    }


    // =====================================
    // SUBMIT APPLICATION
    // =====================================
    // IMPORTANT:
    // This uses CLICK instead of form submit.
    // Therefore browser validation cannot
    // block the success page before JavaScript.

    submitButton.addEventListener("click", function () {

        // Make sure we are on Step 6

        if (currentStep !== totalSteps) {
            return;
        }


        // Check final step

        if (!validateCurrentStep()) {
            return;
        }


        // Hide application

        application.style.display = "none";


        // SHOW SUCCESS PAGE

        successPage.style.display = "flex";


        // Scroll to top

        window.scrollTo(0, 0);
    });


    // =====================================
    // SUBMIT ANOTHER APPLICATION
    // =====================================

    submitAnotherButton.addEventListener(
        "click",
        function () {

            // Clear form

            applicationForm.reset();


            // Clear starting email

            startEmail.value = "";


            // Clear error

            emailError.textContent = "";


            // Reset skill slider

            if (skillRange && skillValue) {

                skillRange.value = 50;

                skillValue.textContent = "50%";
            }


            // Reset step

            currentStep = 1;


            // Hide success

            successPage.style.display = "none";


            // Hide application

            application.style.display = "none";


            // Show welcome

            welcomePage.style.display = "flex";


            // Reset first step

            showStep(1);


            window.scrollTo(0, 0);
        }
    );


    // =====================================
    // INITIAL STATE
    // =====================================

    welcomePage.style.display = "flex";

    application.style.display = "none";

    successPage.style.display = "none";

    showStep(1);

});