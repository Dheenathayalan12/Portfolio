
var typed = new Typed(".text", {
    strings: ["Software Development","Programming" , "Web Development"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});


const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
})

/* =====================================================
   MOBILE NAVIGATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("myLinks");
    const menuOverlay = document.getElementById("menuOverlay");

    const navLinks = document.querySelectorAll("#myLinks a");


    /* =====================================================
       OPEN / CLOSE MENU
       ===================================================== */

    menuToggle.addEventListener("click", function () {

        const isOpen = navbar.classList.toggle("active");

        menuOverlay.classList.toggle("active", isOpen);

        menuToggle.classList.toggle("active", isOpen);

        document.body.classList.toggle("menu-open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

    });


    /* =====================================================
       CLOSE MENU FUNCTION
       ===================================================== */

    function closeMenu() {

        navbar.classList.remove("active");

        menuOverlay.classList.remove("active");

        menuToggle.classList.remove("active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    /* =====================================================
       NAVIGATION LINKS
       ===================================================== */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            /*
             * Make clicked navigation item active
             */
            navLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");


            /*
             * Close mobile sidebar
             */
            closeMenu();


            /*
             * IMPORTANT:
             *
             * There is NO preventDefault().
             *
             * Therefore:
             *
             * #Home
             * #about
             * #Skills
             * #Projects
             * #Contact
             *
             * will work normally.
             */

        });

    });


    /* =====================================================
       CLOSE MENU WHEN OVERLAY IS CLICKED
       ===================================================== */

    menuOverlay.addEventListener("click", function () {

        closeMenu();

    });


    /* =====================================================
       IMPORTANT:
       NO RESIZE EVENT
       =====================================================

       Do NOT close the sidebar when the browser window
       is resized.

       The previous resize code was causing the sidebar
       to disappear while sliding/resizing the window.
    */

});



/* =========================================================
   GRADUATION VIDEO AUDIO CONTROL
   ========================================================= */

const audioControl = document.getElementById("audioControl");

if (graduationVideo && audioControl) {

    audioControl.addEventListener("click", function () {

        /* Currently muted → turn audio ON */
        if (graduationVideo.muted) {

            graduationVideo.muted = false;

            audioControl.innerHTML =
                "<i class='bx bx-volume-full'></i>";

            audioControl.setAttribute(
                "aria-label",
                "Mute graduation video"
            );

        }

        /* Currently playing audio → MUTE */
        else {

            graduationVideo.muted = true;

            audioControl.innerHTML =
                "<i class='bx bx-volume-mute'></i>";

            audioControl.setAttribute(
                "aria-label",
                "Unmute graduation video"
            );
        }

    });

}

/* =========================================================
   INTERACTIVE STARFIELD
   ========================================================= */

const starfield = document.getElementById("starfield");
const cursorGlow = document.getElementById("cursorGlow");

if (starfield) {

    /* Number of stars */
    const starCount =
        window.innerWidth <= 768 ? 70 : 140;


    /* Create stars */
    for (let i = 0; i < starCount; i++) {

        const star = document.createElement("span");

        star.classList.add("star");


        /* Random position */
        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";


        /* Random animation */
        star.style.setProperty(
            "--duration",
            (2 + Math.random() * 4) + "s"
        );

        star.style.setProperty(
            "--delay",
            (Math.random() * 5) + "s"
        );


        starfield.appendChild(star);
    }


    /* =====================================================
       DESKTOP MOUSE INTERACTION
       ===================================================== */

    if (window.innerWidth > 768) {

        const stars =
            document.querySelectorAll(".star");


        let mouseX = -1000;
        let mouseY = -1000;


        /* Mouse movement */
        document.addEventListener(
            "mousemove",
            function (event) {

                mouseX = event.clientX;
                mouseY = event.clientY;


                /* Move cursor glow */
                if (cursorGlow) {

                    cursorGlow.style.left =
                        mouseX + "px";

                    cursorGlow.style.top =
                        mouseY + "px";

                    cursorGlow.style.opacity = "1";
                }


                /* Check stars near cursor */
                stars.forEach(function (star) {

                    const rect =
                        star.getBoundingClientRect();


                    const starX =
                        rect.left + rect.width / 2;

                    const starY =
                        rect.top + rect.height / 2;


                    const distance =
                        Math.sqrt(
                            Math.pow(mouseX - starX, 2) +
                            Math.pow(mouseY - starY, 2)
                        );


                    /* Very close */
                    if (distance < 55) {

                        star.classList.add(
                            "star-shine"
                        );

                        star.classList.remove(
                            "star-near"
                        );

                    }

                    /* Nearby */
                    else if (distance < 120) {

                        star.classList.add(
                            "star-near"
                        );

                        star.classList.remove(
                            "star-shine"
                        );

                    }

                    /* Far away */
                    else {

                        star.classList.remove(
                            "star-near"
                        );

                        star.classList.remove(
                            "star-shine"
                        );
                    }

                });

            }
        );


        /* Hide cursor glow when mouse leaves */
        document.addEventListener(
            "mouseleave",
            function () {

                if (cursorGlow) {

                    cursorGlow.style.opacity = "0";
                }

            }
        );


        /* =================================================
           RANDOM STARS SHINE
           ================================================= */

        setInterval(function () {

            const randomIndex =
                Math.floor(
                    Math.random() * stars.length
                );


            const randomStar =
                stars[randomIndex];


            if (!randomStar.classList.contains("star-shine")) {

                randomStar.classList.add(
                    "random-shine"
                );


                setTimeout(function () {

                    randomStar.classList.remove(
                        "random-shine"
                    );

                }, 1200);
            }

        }, 900);

    }

}

/* =========================================================
   CONTACT FORM - WEB3FORMS
   ========================================================= */

const contactForm =
    document.getElementById("contactForm");

const contactStatus =
    document.getElementById("contactStatus");

const contactSubmit =
    document.getElementById("contactSubmit");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            /* Prevent duplicate submissions */
            if (contactSubmit.disabled) {
                return;
            }


            /* Clear previous status */
            contactStatus.className =
                "contact-status";

            contactStatus.innerHTML = "";


            /* Start loading */
            contactSubmit.disabled = true;

            contactSubmit.classList.add("loading");


            /* Collect form data */
            const formData =
                new FormData(contactForm);


            try {

                const response =
                    await fetch(
                        "https://api.web3forms.com/submit",
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            body: formData
                        }
                    );


                const result =
                    await response.json();


                /* =================================================
                   SUCCESS
                   ================================================= */

                if (response.ok) {

                    contactStatus.className =
                        "contact-status success";

                    contactStatus.innerHTML = `
                        <i class='bx bx-check-circle'></i>
                        <span>
                            Your message has been sent successfully.
                            I'll get back to you soon.
                        </span>
                    `;


                    contactSubmit.classList.remove(
                        "loading"
                    );

                    contactSubmit.classList.add(
                        "success"
                    );


                    contactSubmit.innerHTML = `
                        <span>
                            Message Sent
                        </span>

                        <i class='bx bx-check-circle'></i>
                    `;


                    /* Clear form */
                    contactForm.reset();


                    /* Return button to normal */
                    setTimeout(function () {

                        contactSubmit.classList.remove(
                            "success"
                        );

                        contactSubmit.innerHTML = `
                            <span class="submit-text">
                                Send Message
                            </span>

                            <span class="submit-loading">
                                <i class='bx bx-loader-alt bx-spin'></i>
                                Sending...
                            </span>

                            <i class='bx bx-paper-plane send-icon'></i>
                        `;

                        contactSubmit.disabled = false;

                    }, 4000);


                    /* Hide status after 6 seconds */
                    setTimeout(function () {

                        contactStatus.className =
                            "contact-status";

                        contactStatus.innerHTML = "";

                    }, 6000);

                }


                /* =================================================
                   ERROR
                   ================================================= */

                else {

                    throw new Error(
                        result.message ||
                        "Unable to send your message."
                    );

                }

            }

            catch (error) {

                console.error(
                    "Contact form error:",
                    error
                );


                contactStatus.className =
                    "contact-status error";

                contactStatus.innerHTML = `
                    <i class='bx bx-error-circle'></i>
                    <span>
                        Sorry, your message could not be sent.
                        Please try again.
                    </span>
                `;


                contactSubmit.classList.remove(
                    "loading"
                );

                contactSubmit.disabled = false;

            }

        }
    );

}

