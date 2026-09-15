document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE NAVBAR - CLOSE AFTER CLICK
    ===================================================== */

    const navLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarCollapse = document.getElementById("navbarNav");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains("show")
            ) {
                const bsCollapse =
                    bootstrap.Collapse.getInstance(navbarCollapse);

                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }

        });

    });


    /* =====================================================
       ACTIVE NAVBAR LINK ON SCROLL
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const updateActiveNav = function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    };


    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =====================================================
       CONTACT FORM VALIDATION
    ===================================================== */

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            let isValid = true;


            /* Reset previous validation */

            [name, email, message].forEach(function (field) {

                field.classList.remove("is-invalid");

            });


            if (formStatus) {
                formStatus.textContent = "";
                formStatus.className = "";
            }


            /* Validate name */

            if (name.value.trim() === "") {

                name.classList.add("is-invalid");
                isValid = false;

            }


            /* Validate email */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (
                email.value.trim() === "" ||
                !emailPattern.test(email.value.trim())
            ) {

                email.classList.add("is-invalid");
                isValid = false;

            }


            /* Validate message */

            if (message.value.trim() === "") {

                message.classList.add("is-invalid");
                isValid = false;

            }


            /* Show result */

            if (!isValid) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please fill in all fields correctly.";

                    formStatus.className = "form-error";

                }

                return;
            }


            /*
             * This is client-side validation only.
             * No backend/email service is connected yet.
             */

            if (formStatus) {

                formStatus.textContent =
                    "Thank you! Your message has been validated successfully.";

                formStatus.className = "form-success";

            }


            /* Clear form after successful validation */

            contactForm.reset();

        });

    }


    /* =====================================================
       REMOVE INVALID STATE WHILE USER TYPES
    ===================================================== */

    const formFields = document.querySelectorAll(
        "#contactForm input, #contactForm textarea"
    );

    formFields.forEach(function (field) {

        field.addEventListener("input", function () {

            if (field.value.trim() !== "") {
                field.classList.remove("is-invalid");
            }

        });

    });


});