// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Hide email link if JavaScript is disabled
    const emailLink = document.getElementById("emailLink");
    emailLink.href = "mailto:bradley.martin@shu.edu";

    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Honeypot check
        if (document.getElementById("website").value !== "") {
            formMessage.textContent = "Submission failed.";
            return;
        }

        const formData = new FormData(form);

        try {
            const response = await fetch("/submit_form", { // Replace with your backend endpoint
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                formMessage.textContent = "Thank you! Your message has been sent.";
                form.reset();
            } else {
                formMessage.textContent = "There was an error sending your message. Please try again later.";
            }
        } catch (error) {
            formMessage.textContent = "There was an error sending your message. Please try again later.";
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
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    let formMessage = document.getElementById('formMessage');

    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Please fill in all fields.";
        formMessage.style.color = "red";
    } else {
        formMessage.textContent = "Thank you for your message! I will get back to you shortly.";
        formMessage.style.color = "green";
        // In a real application, this is where you would send the form data to the server
        document.getElementById('contactForm').reset(); // Reset form fields
    }
});
