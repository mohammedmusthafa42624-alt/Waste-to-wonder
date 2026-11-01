
const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const tutorial = document.getElementById("tutorial");

let model = null;
let selectedObject = "default";

const projects = {
    bottle: [
        ["Flower Pot", ["Plastic bottle", "Soil", "Plant", "Water"],
            ["Take a clean bottle.", "Ask an adult to cut it safely or use a pre-cut container.", "Add soil.", "Plant a small plant.", "Water the plant."]],
        ["Pen Holder", ["Bottle", "Decorative paper", "Glue"],
            ["Clean the bottle.", "Use a pre-cut container.", "Cover it with decorative paper.", "Put pens inside."]],
        ["Bird Feeder", ["Bottle", "Bird seed", "String"],
            ["Clean the bottle.", "Ask an adult to prepare any openings.", "Add bird seed.", "Place it safely outdoors."]],
        ["Watering Can", ["Bottle", "Water"],
            ["Clean the bottle.", "Ask an adult to make small holes in the cap.", "Fill with water.", "Use it for plants."]],
        ["Storage Container", ["Bottle", "Labels"],
            ["Clean and dry the bottle.", "Use a safe pre-cut container.", "Add a label.", "Store suitable small items."]
        ]
    ],

    cardboard: [
        ["Desk Organizer", ["Cardboard", "Paper", "Glue"],
            ["Collect clean cardboard.", "Arrange pieces into sections.", "Ask an adult for cutting help.", "Decorate it.", "Store stationery."]],
        ["Toy House", ["Cardboard box", "Paper", "Crayons"],
            ["Take a clean box.", "Draw doors and windows.", "Decorate the outside.", "Create a pretend house."]],
        ["Photo Frame", ["Cardboard", "Photo", "Glue"],
            ["Draw a frame shape.", "Ask an adult to cut it.", "Decorate it.", "Attach a photo."]],
        ["Storage Box", ["Cardboard box", "Paper"],
            ["Clean the box.", "Cover it with paper.", "Add a label.", "Store your items."]],
        ["Book Organizer", ["Cardboard", "Decorative paper"],
            ["Collect cardboard.", "Arrange it as book dividers.", "Ask an adult to cut if needed.", "Decorate and use it."]
        ]
    ],

    paper: [
        ["Paper Flowers", ["Waste paper", "Glue", "Crayons"],
            ["Collect clean paper.", "Draw flower shapes.", "Ask for help cutting if needed.", "Decorate and assemble."]],
        ["Greeting Card", ["Paper", "Colors"],
            ["Fold paper.", "Draw a design.", "Write a greeting.", "Give it to someone."]],
        ["Paper Basket", ["Waste paper", "Glue"],
            ["Roll paper into strips.", "Arrange strips into a basket shape.", "Secure with glue.", "Let it dry."]],
        ["Paper Decorations", ["Paper", "String", "Colors"],
            ["Draw simple shapes.", "Cut with safe scissors.", "Decorate.", "Hang them safely."]],
        ["Paper Bookmark", ["Paper", "Colors"],
            ["Cut a bookmark shape.", "Draw a design.", "Decorate it.", "Use it in a book."]
        ]
    ],

    spoon: [
        ["Decorative Flower", ["Clean plastic spoons", "Cardboard", "Glue"],
            ["Clean the spoons.", "Arrange them into a flower pattern.", "Ask an adult to help with assembly.", "Display your craft."]],
        ["Wall Art", ["Clean spoons", "Cardboard"],
            ["Collect clean spoons.", "Arrange a pattern.", "Attach them to cardboard with adult help.", "Display safely."]],
        ["Craft Decoration", ["Spoons", "Colors"],
            ["Clean the spoons.", "Decorate the handles.", "Let them dry.", "Use as craft decoration."]],
        ["Mini Display", ["Spoons", "Small container"],
            ["Clean the spoons.", "Arrange them in a container.", "Decorate the container.", "Display it."]],
        ["Colorful Sculpture", ["Spoons", "Cardboard", "Glue"],
            ["Plan a simple design.", "Arrange the spoons.", "Ask an adult to help attach them.", "Display the sculpture."]
        ]
    ],

    clothes: [
        ["Reusable Bag", ["Old cloth", "Thread"],
            ["Choose clean cloth.", "Ask an adult to sew the edges.", "Add handles.", "Use the bag."]],
        ["Cushion Cover", ["Old cloth", "Cushion"],
            ["Choose clean fabric.", "Measure the cushion.", "Ask an adult to sew it.", "Cover the cushion."]],
        ["Cleaning Cloth", ["Old cotton cloth"],
            ["Wash the cloth.", "Ask an adult to cut suitable pieces.", "Use for cleaning."]],
        ["Patchwork Art", ["Fabric pieces", "Glue or thread"],
            ["Collect clean fabric pieces.", "Arrange a pattern.", "Join them with adult help.", "Display your art."]],
        ["Fabric Bookmark", ["Old fabric", "Cardboard", "Glue"],
            ["Cut a small cardboard strip.", "Cover it with fabric.", "Let it dry.", "Use as a bookmark."]
        ]
    ],

    can: [
        ["Pencil Holder", ["Clean can", "Decorative paper"],
            ["Ask an adult to check for sharp edges.", "Cover the outside.", "Let it dry.", "Store pencils."]],
        ["Planter Cover", ["Clean can", "Small plant pot"],
            ["Use a can with no sharp edges.", "Place a plant pot inside.", "Decorate the outside.", "Display it."]],
        ["Storage Container", ["Clean can", "Labels"],
            ["Check for sharp edges with an adult.", "Clean and dry it.", "Add a label.", "Store suitable items."]],
        ["Desk Decoration", ["Clean can", "Colors"],
            ["Clean the can.", "Decorate the outside.", "Let it dry.", "Display it."]],
        ["Art Display", ["Clean can", "Paper"],
            ["Cover the outside with paper.", "Draw a design.", "Let it dry.", "Use as a display."]
        ]
    ],

    jar: [
        ["Flower Vase", ["Clean jar", "Flowers"],
            ["Wash the jar.", "Dry it.", "Decorate the outside.", "Add flowers."]],
        ["Storage Jar", ["Clean jar", "Label"],
            ["Wash and dry the jar.", "Add a label.", "Store suitable items.", "Keep the lid closed."]],
        ["Desk Organizer", ["Clean jar", "Decorations"],
            ["Clean the jar.", "Decorate it.", "Let it dry.", "Store stationery."]],
        ["Plant Display", ["Jar", "Small plant pot"],
            ["Clean the jar.", "Place a small pot inside.", "Decorate the outside.", "Display it."]],
        ["Gift Container", ["Jar", "Paper", "Ribbon"],
            ["Clean the jar.", "Decorate it.", "Add a ribbon.", "Use as gift packaging."]
        ]
    ],

    wood: [
        ["Display Stand", ["Clean wood pieces", "Adult assistance"],
            ["Choose safe, smooth wood.", "Ask an adult to prepare the pieces.", "Arrange them.", "Display a small item."]],
        ["Photo Display", ["Wood", "Photo"],
            ["Choose a safe wood piece.", "Ask an adult to prepare it.", "Add a photo.", "Display it."]],
        ["Desk Organizer", ["Wood pieces"],
            ["Collect smooth wood pieces.", "Ask an adult to assemble them.", "Decorate.", "Store stationery."]],
        ["Garden Sign", ["Wood", "Paint"],
            ["Choose a safe wood board.", "Paint a label.", "Let it dry.", "Place it in a suitable garden area."]],
        ["Decorative Art", ["Wood", "Paint"],
            ["Clean the wood.", "Draw a design.", "Decorate it.", "Display your artwork."]
        ]
    ],

    default: [
        ["Recycled Art", ["Clean waste material", "Colors", "Glue"],
            ["Identify the material.", "Clean it safely.", "Plan a simple design.", "Decorate it.", "Display your creation."]],
        ["Storage Organizer", ["Waste material", "Labels"],
            ["Choose a suitable clean container.", "Decorate it.", "Add a label.", "Store suitable items."]],
        ["Home Decoration", ["Clean waste material", "Decorations"],
            ["Clean the material.", "Choose a design.", "Decorate it safely.", "Display it."]],
        ["Creative Craft", ["Waste material", "Paper", "Glue"],
            ["Collect clean materials.", "Plan a craft.", "Assemble with safe materials.", "Let it dry."]],
        ["Garden Decoration", ["Suitable waste material", "Paint"],
            ["Choose weather-safe material.", "Clean it.", "Decorate it.", "Place it safely outdoors."]
        ]
    ]
};

async function loadModel() {
    result.textContent = "Loading image recognition model...";

    try {
        model = await mobilenet.load();
        result.textContent = "Ready! Upload a waste object.";
    } catch (error) {
        result.textContent = "Model loading failed. Check your internet.";
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

    result.textContent = "Image uploaded. Click Find Creative Ideas.";
    tutorial.innerHTML = "";
}

function identifyObject(label) {
    const rules = {
        bottle: ["bottle", "flask"],
        cardboard: ["carton", "cardboard", "box"],
        paper: ["paper", "newspaper"],
        spoon: ["spoon"],
        clothes: ["shirt", "jersey", "jean", "clothing", "coat"],
        can: ["can", "tin"],
        jar: ["jar"],
        wood: ["wood", "timber", "wooden"]
    };

    for (const [category, words] of Object.entries(rules)) {
        if (words.some(word => label.includes(word))) {
            return category;
        }
    }

    return "default";
}

async function getIdeas() {
    if (!upload.files.length) {
        result.textContent = "Please upload an image first!";
        return;
    }

    if (!model) {
        result.textContent = "Please wait. Model is loading...";
        return;
    }

    result.textContent = "Recognizing object...";

    try {
        const predictions = await model.classify(preview);
        const label = predictions[0].className.toLowerCase();

        selectedObject = identifyObject(label);
        displayIdeas(label);

    } catch (error) {
        result.textContent = "Could not recognize the image.";
    }
}

function displayIdeas(label) {
    const items = projects[selectedObject];

    result.innerHTML = `
        <h2>Detected Object</h2>
        <p>${label || selectedObject}</p>
        <h2>♻️ Reuse Ideas</h2>
        ${items.map((project, index) => `
            <div class="idea-card">
                <h3>${project[0]}</h3>
                <button onclick="showTutorial(${index})">
                    How to Make
                </button>
            </div>
        `).join("")}
    `;

    tutorial.innerHTML = "";
}

function useManualObject() {
    const input = document.getElementById("manualObject");
    const name = input.value.trim().toLowerCase();

    if (!name) {
        alert("Enter an object name.");
        return;
    }

    selectedObject = identifyObject(name);
    displayIdeas(name);
}

function showTutorial(index) {
    const project = projects[selectedObject][index];

    tutorial.innerHTML = `
        <h2>${project[0]}</h2>
        <h3>Materials Required</h3>
        <ul>
            ${project[1].map(item => `<li>${item}</li>`).join("")}
        </ul>
        <h3>Step-by-Step Instructions</h3>
        <ol>
            ${project[2].map(step => `<li>${step}</li>`).join("")}
        </ol>
        <p>♻️ Great job giving waste a new life!</p>
    `;

    tutorial.scrollIntoView({ behavior: "smooth" });
}

loadModel();
