
const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const tutorial = document.getElementById("tutorial");

let model = null;
let selectedObject = "default";
let currentSteps = [];
let currentStep = 0;

const projects = {
    bottle: [
        {
            title: "Bottle Flower Pot",
            steps: [
                "Take a clean, empty plastic bottle.",
                "Use a pre-cut bottle or ask an adult to cut it safely.",
                "Decorate the bottle with colors and stickers.",
                "Add soil inside the bottle.",
                "Plant a small plant and water it."
            ]
        },
        {
            title: "Bottle Desk Organizer",
            steps: [
                "Take a clean, pre-cut plastic bottle.",
                "Decorate its outside with paper.",
                "Put pencils and pens inside.",
                "Keep it on your study table."
            ]
        }
    ],

    paper: [
        {
            title: "Paper Greeting Card",
            steps: [
                "Take a clean sheet of waste paper.",
                "Fold it in half.",
                "Draw a design on the front.",
                "Write a greeting inside."
            ]
        }
    ],

    cardboard: [
        {
            title: "Cardboard Desk Organizer",
            steps: [
                "Collect clean cardboard pieces.",
                "Arrange them into small compartments.",
                "Ask an adult to help cut pieces if needed.",
                "Decorate with colored paper.",
                "Keep stationery inside."
            ]
        }
    ],

    mouse: [
        {
            title: "Mouse Recycling Art",
            steps: [
                "Use an old mouse that is disconnected from power.",
                "Clean only its outside surface.",
                "Decorate the outside with stickers.",
                "Display it as a computer-themed art piece.",
                "Send unusable electronics to an e-waste collection center."
            ]
        }
    ],

    default: [
        {
            title: "Recycled Art",
            steps: [
                "Take a clean waste item.",
                "Think of a useful way to reuse it.",
                "Decorate it using safe craft materials.",
                "Display your creation."
            ]
        }
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

function startProject() {
    document.getElementById("create").scrollIntoView({
        behavior: "smooth"
    });
}

function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    selectedObject = "default";
    result.innerHTML = "Image uploaded. Click Find Creative Ideas.";
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

    result.innerHTML = "Recognizing your image...";

    try {
        const predictions = await model.classify(preview);
        const label = predictions[0].className.toLowerCase();

        selectedObject = "default";

        if (label.includes("bottle")) {
            selectedObject = "bottle";
        } else if (label.includes("paper")) {
            selectedObject = "paper";
        } else if (label.includes("carton") ||
                   label.includes("box")) {
            selectedObject = "cardboard";
        } else if (label.includes("mouse")) {
            selectedObject = "mouse";
        }

        const selectedProjects = projects[selectedObject];

        result.innerHTML = `
            <h2>Detected Object</h2>
            <p>${label}</p>
            <h2>Creative Reuse Ideas</h2>
            ${selectedProjects.map((project, index) => `
                <div class="idea-card">
                    <h3>${project.title}</h3>
                    <button onclick="showTutorial(${index})">
                        How to Make
                    </button>
                </div>
            `).join("")}
        `;

        tutorial.innerHTML = "";

    } catch (error) {
        result.innerHTML = "Image recognition failed. Try again.";
    }
}

function showTutorial(index) {
    currentSteps = projects[selectedObject][index].steps;
    currentStep = 0;

    tutorial.scrollIntoView({ behavior: "smooth" });
    displayStep();
}

function displayStep() {
    const stepNumber = currentStep + 1;

    // Simple step illustration
    const picture = `
        <svg viewBox="0 0 300 180"
             width="100%" height="180"
             xmlns="http://www.w3.org/2000/svg">
            <rect width="300" height="180" rx="15"
                  fill="#e8f5e9"/>
            <circle cx="150" cy="75" r="48"
                    fill="#a5d6a7"/>
            <text x="150" y="88"
                  text-anchor="middle"
                  font-size="45">♻️</text>
            <text x="150" y="155"
                  text-anchor="middle"
                  font-size="16"
                  fill="#1b5e20">
                Step ${stepNumber}
            </text>
        </svg>
    `;

    tutorial.innerHTML = `
        <div class="tutorial-card">
            <h2>Step ${stepNumber} of ${currentSteps.length}</h2>

            <div class="tutorial-picture">
                ${picture}
            </div>

            <p>${currentSteps[currentStep]}</p>

            <button onclick="previousStep()"
                ${currentStep === 0 ? "disabled" : ""}>
                Previous Step
            </button>

            <button onclick="nextStep()">
                ${currentStep === currentSteps.length - 1
                    ? "Finish"
                    : "Next Step"}
            </button>
        </div>
    `;
}

function nextStep() {
    if (currentStep < currentSteps.length - 1) {
        currentStep++;
        displayStep();
    } else {
        tutorial.innerHTML = `
            <h2>🎉 Project Completed!</h2>
            <p>Great job! You gave waste a new life.</p>
        `;
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        displayStep();
    }
}

loadModel();
