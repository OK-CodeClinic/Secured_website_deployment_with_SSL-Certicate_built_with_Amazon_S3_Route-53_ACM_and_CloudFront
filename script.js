const contactList = document.querySelector(".contact ul");

contactList.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
        event.preventDefault(); 
        const url = event.target.getAttribute("href");
        window.open(url, "_blank");
    }
});

<script>
    // JavaScript code for animations
    const colorfulText = document.querySelector('.colorful-text');

    colorfulText.addEventListener('mouseover', () => {
        colorfulText.style.animation = 'rainbowText 2s infinite';
    });

    colorfulText.addEventListener('mouseout', () => {
        colorfulText.style.animation = 'none';
    });
</script>