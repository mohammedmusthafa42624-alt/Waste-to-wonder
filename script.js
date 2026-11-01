
const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const tutorial = document.getElementById("tutorial");

let model = null;
let selectedObject = "default";
let currentStep = 0;

const ideas = {
    mouse: [
        "Create a small desk decoration.",
        "Make a computer-themed art display.",
        "Create a recycled art project."
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

const tutorials = {
    mouse: {
        title: "🖱️ Mouse Recycling Art",
        steps: [
            "Choose a clean, unplugged old computer mouse.",
            "Wipe its outside surface with a dry cloth.",
            "Decorate the outside with stickers or paper.",
            "Display your computer-themed artwork."
        ]
    },
    bottle: {
        title: "🌸 Bottle Flower Pot",
        steps: [
            "Take a clean, empty plastic bottle.",
            "Ask an adult to help prepare the bottle safely.",
            "Decorate the outside with colors or stickers.",
            "Add suitable soil to the prepared container.",
            "Plant a small plant and water it."
        ]
    },
    paper: {
        title: "🌼 Paper Flowers",
        steps: [
            "Take some clean waste paper.",
            "Draw flower shapes on the paper.",
            "Ask an adult to help cut the shapes with scissors.",
            "Layer the shapes to make a flower.",
            "Decorate your paper flower."
        ]
    },
    cardboard: {
        title: "📦 Cardboard Organizer",
        steps: [
            "Take a clean cardboard box.",
            "Decide what items you want to organize.",
            "Ask an adult to help cut cardboard pieces safely.",
            "Arrange the pieces inside the box.",
            "Decorate your organizer."
        ]
    }
};

async function loadModel() {
    result.innerHTML = "Loading image recognition model...";

    try {
        model = await mobilenet.load();
        result.innerHTML = "✅ Model ready! Upload a waste image.";
    } catch (error) {
        result.innerHTML = "Could not load model. Check your internet.";
    }
}

function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    selectedObject = "default";
    currentStep = 0;

    result.innerHTML = "Image uploaded! Click Find Creative Ideas.";
    tutorial.innerHTML = "";
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

        if (label.includes("mouse")) {
            selectedObject = "mouse";
        } else if (label.includes("bottle")) {
            selectedObject = "bottle";
        } else if (label.includes("paper")) {
            selectedObject = "paper";
        } else if (
            label.includes("carton") ||
            label.includes("box")
        ) {
            selectedObject = "cardboard";
        } else {
            selectedObject = "default";
        }

        const selectedIdeas = ideas[selectedObject];

        result.innerHTML = `
            <h2>🔍 Detected Object</h2>
            <p>${label}</p>

            <h2>♻️ Creative Reuse Ideas</h2>

            <ul>
                ${selectedIdeas.map((idea, index) => `
                    <li>
                        ${idea}
                        <button onclick="showTutorial(${index})">
                            How to Make
                        </button>
                    </li>
                `).join("")}
            </ul>
        `;

    } catch (error) {
        result.innerHTML = "Image recognition failed. Please try again.";
    }
}

function showTutorial(index) {
    const data = tutorials[selectedObject];

    if (!data) {
        tutorial.innerHTML =
            "<p>Tutorial is not available for this object yet.</p>";
        return;
    }

    currentStep = 0;

    tutorial.innerHTML = `
        <h2>${data.title}</h2>
        <p id="stepText"></p>
        <p id="stepNumber"></p>

        <button onclick="previousStep()">Previous</button>
        <button onclick="nextStep()">Next Step</button>
    `;

    showCurrentStep();
}

function showCurrentStep() {
    const data = tutorials[selectedObject];

    document.getElementById("stepText").textContent =
        data.steps[currentStep];

    document.getElementById("stepNumber").textContent =
        "Step " + (currentStep + 1) + " of " + data.steps.length;
}

function nextStep() {
    const data = tutorials[selectedObject];

    if (currentStep < data.steps.length - 1) {
        currentStep++;
        showCurrentStep();
    } else {
        tutorial.innerHTML = `
            <h2>🎉 Project Completed!</h2>
            <p>Great job! You turned waste into wonder!</p>
        `;
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        showCurrentStep();
    }
}

loadModel();
