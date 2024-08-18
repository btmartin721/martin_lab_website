document.addEventListener("DOMContentLoaded", function() {
    const emailLink = document.getElementById("emailLink");
    if (emailLink) {
        emailLink.href = "mailto:bradley.martin@shu.edu";
    }

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault(); // Prevent the default form submission

            // Check if the form fields exist before accessing them
            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");

            if (nameField && emailField && messageField) {
                const name = nameField.value.trim();
                const email = emailField.value.trim();
                const message = messageField.value.trim();

                if (name === "" || email === "" || message === "") {
                    // Show error message and prevent submission
                    formMessage.textContent = "Please fill in all fields.";
                    formMessage.style.color = "#d9534f"; // Colorblind-friendly red
                } else {
                    // Show sending message
                    formMessage.textContent = "Submitting form...";
                    formMessage.style.color = "#5cb85c"; // Colorblind-friendly green

                    // Use Fetch API to submit the form data
                    const formData = new FormData(form);

                    fetch("/", {
                        method: "POST",
                        body: formData,
                    })
                    .then(response => {
                        if (response.ok) {
                            formMessage.textContent = "Thank you! Your message has been sent.";
                            formMessage.style.color = "#5bc0de"; // Colorblind-friendly blue
                            form.reset(); // Reset the form
                        } else {
                            formMessage.textContent = "There was an error sending your message. Please try again later.";
                            formMessage.style.color = "#d9534f"; // Colorblind-friendly red
                        }
                    })
                    .catch(error => {
                        formMessage.textContent = "There was an error sending your message. Please try again later.";
                        formMessage.style.color = "#d9534f"; // Colorblind-friendly red
                    });
                }
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const currentLocation = window.location.href;
    const menuItems = document.querySelectorAll("nav ul li a");

    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add("active");
        }
    });
});

function searchPublications() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let publicationsList = document.getElementById('publicationsList');
    let publications = publicationsList.getElementsByTagName('li');

    for (let i = 0; i < publications.length; i++) {
        let item = publications[i].textContent || publications[i].innerText;
        if (item.toLowerCase().indexOf(input) > -1) {
            publications[i].style.display = "";
        } else {
            publications[i].style.display = "none";
        }
    }
}
