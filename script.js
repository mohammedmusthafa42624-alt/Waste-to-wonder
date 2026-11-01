const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

let model = null;
let selectedObject = "";

const ideas = {
    mouse: [
        "Create a small desk decoration.",
        "Use it for a computer-themed art project.",
        "Make a creative recycled display."
    ],
    bottle: [
        "Make a flower vase.",
        "Create a plant pot.",
        "Make a bird feeder."
    ],
    paper: [
        "Create handmade greeting cards.",
        "Make paper flowers.",
        "Create a paper basket."
    ],
    cardboard: [
        "Build a desk organizer.",
        "Make a toy house.",
        "Create a photo frame."
    ],
    default: [
        "Create a decorative craft.",
        "Make a useful organizer.",
        "Try a recycled art project."
    ]
};

async function loadModel() {
    result.innerHTML = "Loading image recognition model...";
    try {
        model = await mobilenet.load();
        result.innerHTML = "Model ready! Upload a waste image.";
    } catch (error) {
        result.innerHTML = "Could not load model. Check your internet.";
    }
}

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
    selectedObject = "";
    result.innerHTML = "Image uploaded. Click Find Creative Ideas.";
}

async function getIdeas() {
    if (!upload.files.length) {
        result.innerHTML = "Please upload an image first!";
        return;
    }

    if (!model) {
        result.innerHTML = "Please wait. Model is loading...";
        return;
    }

    result.innerHTML = "🔍 Recognizing your image...";

    try {
        const predictions = await model.classify(preview);
        const label = predictions[0].className.toLowerCase();

        let category = "default";

        if (label.includes("mouse")) category = "mouse";
        else if (label.includes("bottle")) category = "bottle";
        else if (label.includes("paper")) category = "paper";
        else if (label.includes("carton") || label.includes("box")) category = "cardboard";

        const selectedIdeas = ideas[category];

        result.innerHTML = `
            <h2>🔍 Detected Object</h2>
            <p>${label}</p>
            <h2>♻️ Creative Reuse Ideas</h2>
            <ul>
                ${selectedIdeas.map(idea => `<li>${idea}</li>`).join("")}
            </ul>
        `;
    } catch (error) {
        result.innerHTML = "Image recognition failed. Please try again.";
    }
}

loadModel();
