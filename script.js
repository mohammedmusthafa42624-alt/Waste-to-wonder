function startProject() {
    document.getElementById("create").scrollIntoView({
        behavior: "smooth"
    });
}

function previewImage(event) {
    const image = document.getElementById("preview");
    const file = event.target.files[0];

    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = "block";

        document.getElementById("result").innerHTML =
            "Image uploaded successfully!";
    }
}

function getIdeas() {

    const fileInput = document.getElementById("wasteImage");
    const result = document.getElementById("result");

    if (!fileInput.files.length) {
        result.innerHTML = "Please upload an image first!";
        return;
    }

    const fileName = fileInput.files[0].name.toLowerCase();

    let ideas = [];

    if (fileName.includes("bottle")) {

        ideas = [
            "Plastic Bottle Flower Vase",
            "Bottle Garden",
            "Self Watering Plant Pot",
            "Bottle Bird Feeder"
        ];

    } else if (fileName.includes("paper")) {

        ideas = [
            "Paper Bags",
            "Greeting Cards",
            "Paper Flowers",
            "Paper Wall Decoration"
        ];

    } else if (fileName.includes("box") || fileName.includes("cardboard")) {

        ideas = [
            "Storage Box",
            "Desk Organizer",
            "Toy House",
            "Cardboard Photo Frame"
        ];

    } else if (fileName.includes("can")) {

        ideas = [
            "Pencil Holder",
            "Mini Planter",
            "Decorative Lamp Cover",
            "Desk Decoration"
        ];

    } else {

        ideas = [
            "Creative Flower Pot",
            "DIY Wall Decoration",
            "Recycled Art",
            "Storage Organizer",
            "Beautiful Home Decoration"
        ];
    }

    let output = "<h3>♻️ Creative Reuse Ideas</h3>";

    ideas.forEach(function(idea) {
        output += "<p>✨ " + idea + "</p>";
    });

    output += "<p>Give your waste a second life! 🌍</p>";

    result.innerHTML = output;
}