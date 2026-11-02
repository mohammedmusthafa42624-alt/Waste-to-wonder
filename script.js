const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const tutorial = document.getElementById("tutorial");

let model = null;
let selectedObject = "default";
let currentIdeas = [];
let shownIdeas = [];

// OBJECT DETAILS
const basicDetails = {
    bottle: {
        name: "Bottle",
        category: "Plastic Object",
        details: "Used to store water and other drinks.",
        materials: "Plastic"
    },
    cardboard: {
        name: "Cardboard",
        category: "Paper Product",
        details: "Used for boxes and packaging.",
        materials: "Paper"
    },
    paper: {
        name: "Paper",
        category: "Paper Product",
        details: "Used for writing, printing and drawing.",
        materials: "Paper"
    },
    spoon: {
        name: "Spoon",
        category: "Household Object",
        details: "Used for eating and serving food.",
        materials: "Plastic or metal"
    },
    clothes: {
        name: "Clothes",
        category: "Fabric Object",
        details: "Used to cover and protect the body.",
        materials: "Cotton or other fabrics"
    },
    can: {
        name: "Can",
        category: "Metal Object",
        details: "Used to store food and drinks.",
        materials: "Metal"
    },
    jar: {
        name: "Jar",
        category: "Container",
        details: "Used to store food and other items.",
        materials: "Glass or plastic"
    },
    wood: {
        name: "Wood",
        category: "Natural Material",
        details: "Used to make furniture and other objects.",
        materials: "Wood"
    },
    phone: {
        name: "Phone",
        category: "Electronic Object",
        details: "Used for communication and other digital activities.",
        materials: "Glass, plastic and metals"
    },
    default: {
        name: "Unknown Object",
        category: "Other Object",
        details: "The object could not be identified clearly.",
        materials: "Unknown"
    }
};

// REUSE IDEAS
const projects = {
    bottle: [
        ["Bottle Planter", ["Plastic bottle", "Soil", "Plant"], ["Clean the bottle.", "Ask an adult to help prepare it safely.", "Add soil and a small plant."]],
        ["Bottle Pen Stand", ["Plastic bottle", "Colors"], ["Clean and dry the bottle.", "Ask an adult to help with any cutting.", "Decorate it and use it as a pen stand."]],
        ["Bottle Flower Vase", ["Plastic bottle", "Paint"], ["Clean the bottle.", "Decorate its outside.", "Place artificial flowers inside."]],
        ["Bottle Storage", ["Plastic bottle", "Labels"], ["Clean and dry the bottle.", "Add a label.", "Store suitable small items."]],
        ["Bottle Bird Feeder", ["Plastic bottle", "Bird seed"], ["Ask an adult to help prepare it.", "Use only safe, smooth edges.", "Place suitable bird food inside."]],
        ["Bottle Watering Can", ["Plastic bottle", "Water"], ["Clean the bottle.", "Ask an adult to make small holes in the cap.", "Use it to water plants."]],
        ["Bottle Desk Organizer", ["Plastic bottle", "Decorations"], ["Clean the bottle.", "Decorate it.", "Use it to organize stationery."]],
        ["Bottle Piggy Bank", ["Plastic bottle", "Paper"], ["Clean the bottle.", "Ask an adult to prepare the opening.", "Decorate and use it for saving coins."]],
        ["Bottle Garden Decor", ["Plastic bottle", "Paint"], ["Clean the bottle.", "Decorate it with paint.", "Display it near a garden."]],
        ["Bottle Art", ["Plastic bottle", "Paint"], ["Clean the bottle.", "Use paint to create patterns.", "Display your artwork."]]
    ],

    cardboard: [
        ["Cardboard Organizer", ["Cardboard box", "Glue"], ["Collect clean cardboard.", "Arrange it into sections.", "Use it to organize stationery."]],
        ["Cardboard Photo Frame", ["Cardboard", "Colors"], ["Draw a frame shape.", "Ask an adult to help cut it.", "Decorate and display a photo."]],
        ["Cardboard Pen Holder", ["Cardboard tube", "Glue"], ["Take a clean cardboard tube.", "Decorate it.", "Use it as a pen holder."]],
        ["Cardboard Mini House", ["Cardboard", "Colors"], ["Draw a simple house design.", "Ask an adult to help cut pieces.", "Join and decorate the pieces."]],
        ["Cardboard Wall Art", ["Cardboard", "Paint"], ["Draw a design.", "Color the cardboard.", "Display it on a wall."]],
        ["Cardboard Storage Box", ["Cardboard box", "Paper"], ["Clean the box.", "Cover it with decorative paper.", "Store suitable items."]],
        ["Cardboard Bookmark", ["Cardboard", "Markers"], ["Cut a bookmark with adult help.", "Decorate it.", "Use it in a book."]],
        ["Cardboard Toy", ["Cardboard", "Colors"], ["Draw a simple toy design.", "Ask an adult to help prepare pieces.", "Decorate and assemble it."]],
        ["Cardboard Desk Tray", ["Cardboard", "Glue"], ["Collect clean cardboard.", "Arrange it into a tray shape.", "Use it to hold stationery."]],
        ["Cardboard Collage", ["Cardboard", "Paper"], ["Collect clean paper pieces.", "Arrange them into a picture.", "Glue them onto cardboard."]]
    ],

    paper: [
        ["Paper Flowers", ["Old paper", "Glue"], ["Fold paper into flower shapes.", "Secure them with glue.", "Arrange the flowers."]],
        ["Paper Gift Bag", ["Old paper", "Glue"], ["Fold paper into a bag shape.", "Secure the edges.", "Decorate the bag."]],
        ["Paper Wall Art", ["Old paper", "Colors"], ["Draw a design.", "Color the paper.", "Display your artwork."]],
        ["Paper Bookmark", ["Old paper", "Markers"], ["Cut a bookmark shape.", "Decorate it.", "Use it in a book."]],
        ["Paper Greeting Card", ["Old paper", "Colors"], ["Fold the paper.", "Draw a greeting design.", "Write a message."]],
        ["Paper Origami", ["Old paper"], ["Choose a simple origami design.", "Fold the paper carefully.", "Display your creation."]],
        ["Paper Collage", ["Old paper", "Glue"], ["Tear paper into small pieces.", "Arrange them into a picture.", "Glue them onto a sheet."]],
        ["Paper Notebook Cover", ["Old paper", "Notebook"], ["Choose clean paper.", "Cover the notebook.", "Decorate the cover."]],
        ["Paper Gift Decoration", ["Old paper", "Ribbon"], ["Fold paper into decorations.", "Attach them to a gift.", "Arrange neatly."]],
        ["Paper Basket", ["Old paper", "Glue"], ["Roll paper into strips.", "Ask an adult for help assembling the basket.", "Use it for lightweight items."]]
    ],

    spoon: [
        ["Spoon Wall Art", ["Clean old spoons", "Cardboard"], ["Clean the spoons.", "Arrange them into a design.", "Ask an adult to help attach them securely."]],
        ["Spoon Plant Label", ["Clean spoon", "Marker"], ["Clean the spoon.", "Write a plant name on it.", "Place it near a plant."]],
        ["Spoon Decoration", ["Clean spoon", "Paint"], ["Clean and dry the spoon.", "Decorate the handle.", "Display it safely."]],
        ["Spoon Craft Display", ["Clean spoons", "Cardboard"], ["Arrange the spoons.", "Create a pattern.", "Ask an adult to help secure the display."]],
        ["Spoon Holder", ["Clean spoons", "Container"], ["Clean the spoons.", "Choose a suitable container.", "Store them neatly."]],
        ["Spoon Garden Decor", ["Clean spoon", "Paint"], ["Clean the spoon.", "Paint a simple design.", "Display it near a plant."]],
        ["Spoon Art", ["Clean spoon", "Colors"], ["Choose a simple design.", "Decorate the spoon.", "Display your artwork."]],
        ["Spoon Gift Decor", ["Clean spoon", "Ribbon"], ["Clean the spoon.", "Add a ribbon decoration.", "Use it as gift decoration."]],
        ["Spoon Collection Display", ["Clean spoons", "Display stand"], ["Clean the spoons.", "Arrange them on a display stand.", "Keep them in a safe place."]],
        ["Spoon Storage", ["Clean spoons", "Container"], ["Wash and dry the spoons.", "Arrange them in a container.", "Keep them ready for reuse."]]
    ],

    clothes: [
        ["Old T-shirt Bag", ["Old T-shirt"], ["Choose a clean old T-shirt.", "Ask an adult to help with any cutting.", "Use it as a reusable bag."]],
        ["Fabric Cushion Cover", ["Old clothes", "Cushion"], ["Choose clean fabric.", "Ask an adult to help sew it.", "Use it as a cushion cover."]],
        ["Fabric Bookmark", ["Old fabric", "Ribbon"], ["Choose a clean fabric piece.", "Fold it neatly.", "Use it as a bookmark."]],
        ["Cloth Decoration", ["Old fabric", "Glue"], ["Choose colorful fabric.", "Arrange it into a design.", "Use it for decoration."]],
        ["Reusable Cleaning Cloth", ["Old cotton clothes"], ["Wash the old clothes.", "Allow them to dry.", "Use suitable pieces for cleaning."]],
        ["Fabric Wall Art", ["Old fabric", "Frame"], ["Choose clean fabric.", "Arrange it in a frame.", "Display it."]],
        ["Fabric Gift Wrap", ["Old cloth"], ["Choose a clean cloth.", "Wrap a suitable gift.", "Tie it neatly."]],
        ["Fabric Doll Decoration", ["Old fabric", "Buttons"], ["Choose clean fabric.", "Plan a simple decoration.", "Ask an adult to help with sewing."]],
        ["Cloth Storage Pouch", ["Old fabric", "Thread"], ["Choose clean fabric.", "Ask an adult to help sew a pouch.", "Store lightweight items."]],
        ["Fabric Patch Art", ["Old fabric", "Glue"], ["Collect clean fabric pieces.", "Arrange them into a pattern.", "Create a fabric collage."]]
    ],

    can: [
        ["Can Pencil Holder", ["Clean can", "Paint"], ["Make sure an adult checks the can for sharp edges.", "Decorate only if it is safe to handle.", "Use it as a pencil holder."]],
        ["Can Plant Pot", ["Clean can", "Soil"], ["Use a can with no sharp edges.", "Ask an adult to prepare drainage safely.", "Add soil and a plant."]],
        ["Can Decoration", ["Clean can", "Paint"], ["Choose a safe can.", "Ask an adult to check its edges.", "Decorate the outside."]],
        ["Can Storage", ["Clean can"], ["Choose a safe container.", "Clean and dry it.", "Store suitable items."]],
        ["Can Desk Organizer", ["Clean can", "Colors"], ["Ask an adult to check the edges.", "Decorate the outside.", "Use it to organize stationery."]],
        ["Can Garden Decor", ["Clean can", "Paint"], ["Choose a safe can.", "Decorate its outside.", "Display it in a suitable place."]],
        ["Can Art Display", ["Clean can", "Paint"], ["Clean the can.", "Ask an adult to check it.", "Create a decorative display."]],
        ["Can Flower Holder", ["Clean can", "Artificial flowers"], ["Choose a safe can.", "Decorate its outside.", "Place artificial flowers inside."]],
        ["Can Stationery Box", ["Clean can"], ["Use a can with safe edges.", "Clean it thoroughly.", "Store stationery."]],
        ["Can Gift Holder", ["Clean can", "Ribbon"], ["Choose a safe can.", "Decorate it.", "Use it to hold a small gift."]]
    ],

    jar: [
        ["Jar Flower Vase", ["Clean jar", "Flowers"], ["Wash and dry the jar.", "Decorate its outside.", "Place flowers inside."]],
        ["Jar Storage", ["Clean jar", "Label"], ["Wash and dry the jar.", "Add a label.", "Store suitable items."]],
        ["Jar Pencil Holder", ["Clean jar", "Paint"], ["Clean the jar.", "Decorate the outside.", "Use it for stationery."]],
        ["Jar Decoration", ["Clean jar", "Colors"], ["Clean the jar.", "Decorate its outside.", "Display it safely."]],
        ["Jar Gift Container", ["Clean jar", "Ribbon"], ["Clean and dry the jar.", "Decorate it.", "Use it as a gift container."]],
        ["Jar Plant Display", ["Clean jar", "Small plant"], ["Choose a suitable jar.", "Add a suitable plant.", "Display it in a safe place."]],
        ["Jar Art", ["Clean jar", "Paint"], ["Clean the jar.", "Paint a design on the outside.", "Allow it to dry."]],
        ["Jar Desk Organizer", ["Clean jar"], ["Wash and dry the jar.", "Decorate it if desired.", "Use it to store stationery."]],
        ["Jar Button Storage", ["Clean jar", "Buttons"], ["Clean the jar.", "Add buttons.", "Close the lid and store it."]],
        ["Jar Decoration Display", ["Clean jar", "Decorations"], ["Clean the jar.", "Add safe decorations.", "Display it carefully."]]
    ],

    wood: [
        ["Wooden Photo Display", ["Clean wood", "Photo"], ["Choose a smooth, safe wood piece.", "Ask an adult to help prepare it.", "Display a photo."]],
        ["Wooden Plant Marker", ["Wood piece", "Marker"], ["Choose a smooth wood piece.", "Write a plant name.", "Place it near a plant."]],
        ["Wooden Desk Decor", ["Wood piece", "Paint"], ["Clean the wood.", "Decorate it.", "Display it on a desk."]],
        ["Wooden Wall Art", ["Wood piece", "Paint"], ["Choose a safe wood piece.", "Create a design.", "Ask an adult to help mount it."]],
        ["Wooden Storage Box", ["Wood pieces"], ["Use a ready-made safe box.", "Decorate it.", "Store suitable items."]],
        ["Wooden Garden Decor", ["Wood piece", "Paint"], ["Choose weather-suitable wood.", "Decorate it.", "Display it in a garden."]],
        ["Wooden Bookmark", ["Thin smooth wood", "Marker"], ["Choose a smooth, thin piece.", "Decorate it.", "Use it as a bookmark."]],
        ["Wooden Art Display", ["Wood piece", "Colors"], ["Clean the wood.", "Paint a design.", "Display your artwork."]],
        ["Wooden Table Decor", ["Wood piece", "Paint"], ["Choose a stable wood piece.", "Decorate it.", "Display it safely."]],
        ["Wooden Gift Decor", ["Wood piece", "Ribbon"], ["Choose a smooth wood piece.", "Add decoration.", "Use it as a gift decoration."]]
    ],

    phone: [
        ["Phone Stand", ["Old phone", "Ready-made stand"], ["Make sure the phone is switched off if it is damaged.", "Use a suitable ready-made stand.", "Reuse the phone as a display device only if it works safely."]],
        ["Electronic Recycling", ["Old phone"], ["Do not open the phone.", "Take it to an authorized e-waste collection center.", "Follow the center's recycling instructions."]],
        ["Phone Donation", ["Working old phone"], ["Check that the phone works.", "Remove personal information with adult guidance.", "Donate it through a trusted organization."]]
    ]
};

// LIVING THINGS CHECK
function isLivingThing(label) {
    const blockedWords = [
        "person", "human", "man", "woman", "boy", "girl",
        "face", "head", "hand", "arm", "leg", "foot",
        "neck", "body", "skin", "finger", "people",
        "dog", "cat", "bird", "animal", "horse", "cow",
        "elephant", "lion", "tiger", "monkey", "fish",
        "rabbit", "snake", "butterfly", "insect",
        "flower", "plant", "tree", "leaf", "grass",
        "vegetable", "fruit", "mushroom"
    ];

    return blockedWords.some(word =>
        label.toLowerCase().includes(word)
    );
}

// LOAD AI MODEL
async function loadModel() {
    result.innerHTML = "<p>Loading object recognition...</p>";

    try {
        if (typeof mobilenet === "undefined") {
            result.innerHTML = "<p>AI library not loaded. Check your internet connection.</p>";
            return;
        }

        model = await mobilenet.load();
        result.innerHTML = "<p>Ready! Upload a waste object photo.</p>";
    } catch (error) {
        console.error(error);
        result.innerHTML = "<p>Could not load the model. Please refresh the page.</p>";
    }
}

// PREVIEW IMAGE
function previewImage(event) {
    const file = event.target.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    result.innerHTML = "";
    tutorial.innerHTML = "";
    currentIdeas = [];
    shownIdeas = [];
}

// IDENTIFY OBJECT
async function identifyObject() {
    if (!upload.files || !upload.files[0]) {
        alert("Please upload an image first!");
        return;
    }

    if (!model) {
        alert("AI model is still loading. Please wait.");
        return;
    }

    result.innerHTML = "<p>Identifying object...</p>";
    tutorial.innerHTML = "";

    try {
        const predictions = await model.classify(preview);
        console.log(predictions);

        const label = predictions[0].className.toLowerCase();

        if (isLivingThing(label)) {
            selectedObject = "default";
            currentIdeas = [];
            shownIdeas = [];

            result.innerHTML = `
                <h2>Detected Object</h2>
                <p>AI Prediction: ${escapeHTML(label)}</p>
                <h3>No reuse ideas for this object.</h3>
            `;
            return;
        }

        if (label.includes("water bottle") || label.includes("bottle")) {
            selectedObject = "bottle";
        } else if (
            label.includes("carton") ||
            label.includes("cardboard") ||
            label.includes("box")
        ) {
            selectedObject = "cardboard";
        } else if (
            label.includes("paper") ||
            label.includes("envelope")
        ) {
            selectedObject = "paper";
        } else if (label.includes("spoon")) {
            selectedObject = "spoon";
        } else if (
            label.includes("jersey") ||
            label.includes("shirt") ||
            label.includes("clothing") ||
            label.includes("sweatshirt")
        ) {
            selectedObject = "clothes";
        } else if (
            label.includes("can") ||
            label.includes("tin")
        ) {
            selectedObject = "can";
        } else if (label.includes("jar")) {
            selectedObject = "jar";
        } else if (label.includes("wood")) {
            selectedObject = "wood";
        } else if (
            label.includes("cellular telephone") ||
            label.includes("mobile phone") ||
            label.includes("smartphone") ||
            label.includes("telephone")
        ) {
            selectedObject = "phone";
        } else {
            selectedObject = "default";
            currentIdeas = [];
            shownIdeas = [];

            result.innerHTML = `
                <h2>What object is this?</h2>
                <p>AI Prediction: ${escapeHTML(label)}</p>
                <input id="objectNameInput"
                    type="text"
                    placeholder="Enter object name">
                <button onclick="checkUnknownObject()">
                    Submit
                </button>
            `;
            return;
        }

        const object = basicDetails[selectedObject];

        currentIdeas = projects[selectedObject] || [];
        shownIdeas = [];

        result.innerHTML = `
            <h2>Detected Object: ${escapeHTML(object.name)}</h2>
            <p>AI Prediction: ${escapeHTML(label)}</p>
            <p>Confidence: ${(predictions[0].probability * 100).toFixed(1)}%</p>
            <button onclick="showBasicDetails()">View Details</button>
            <button onclick="startProject()">Show Reuse Ideas</button>
        `;

    } catch (error) {
        console.error(error);
        result.innerHTML = "<p>Could not identify the image. Please try another clear photo.</p>";
    }
}

// CHECK UNKNOWN OBJECT
function checkUnknownObject() {
    const input = document.getElementById("objectNameInput");
    const name = input.value.trim().toLowerCase();

    if (!name) {
        alert("Please enter the object name!");
        return;
    }

    if (isLivingThing(name)) {
        result.innerHTML = `
            <h2>${escapeHTML(name)}</h2>
            <h3>No reuse ideas for this object.</h3>
        `;
        return;
    }

    const objectMap = {
        "bottle": "bottle",
        "plastic bottle": "bottle",
        "cardboard": "cardboard",
        "box": "cardboard",
        "paper": "paper",
        "spoon": "spoon",
        "clothes": "clothes",
        "shirt": "clothes",
        "can": "can",
        "tin": "can",
        "jar": "jar",
        "wood": "wood",
        "phone": "phone",
        "mobile": "phone"
    };

    const key = objectMap[name];

    if (key && projects[key]) {
        selectedObject = key;
        currentIdeas = projects[key];
        shownIdeas = [];

        result.innerHTML = `
            <h2>Object: ${escapeHTML(basicDetails[key].name)}</h2>
            <button onclick="startProject()">Show Reuse Ideas</button>
        `;
    } else {
        result.innerHTML = `
            <h2>Object: ${escapeHTML(name)}</h2>
            <h3>No reuse ideas available for this object.</h3>
        `;
    }
}

// SHOW BASIC DETAILS
function showBasicDetails() {
    const object = basicDetails[selectedObject];

    result.innerHTML = `
        <h2>Object Details</h2>
        <p><strong>Object:</strong> ${escapeHTML(object.name)}</p>
        <p><strong>Category:</strong> ${escapeHTML(object.category)}</p>
        <p><strong>About:</strong> ${escapeHTML(object.details)}</p>
        <p><strong>Materials:</strong> ${escapeHTML(object.materials)}</p>
        <button onclick="identifyAgain()">Back</button>
        <button onclick="startProject()">Show Reuse Ideas</button>
    `;
}

// BACK TO DETECTION RESULT
function identifyAgain() {
    const object = basicDetails[selectedObject];

    result.innerHTML = `
        <h2>Detected Object: ${escapeHTML(object.name)}</h2>
        <button onclick="showBasicDetails()">View Details</button>
        <button onclick="startProject()">Show Reuse Ideas</button>
    `;
}

// START REUSE PROJECTS
function startProject() {
    if (!projects[selectedObject]) {
        result.innerHTML = "<h3>No reuse ideas for this object.</h3>";
        return;
    }

    currentIdeas = projects[selectedObject];
    shownIdeas = [];

    result.innerHTML = `
        <h2>Reuse Ideas for ${escapeHTML(basicDetails[selectedObject].name)}</h2>
        <button onclick="generateMoreIdeas()">Generate More Ideas</button>
    `;

    tutorial.innerHTML = `<div id="ideasList"></div>`;

    generateMoreIdeas();
}

// GENERATE MORE IDEAS
function generateMoreIdeas() {
    const list = document.getElementById("ideasList");

    if (!list) return;

    const remaining = currentIdeas.filter(
        idea => !shownIdeas.includes(idea)
    );

    if (remaining.length === 0) {
        list.innerHTML += "<p>No more ideas available.</p>";
        return;
    }

    remaining.slice(0, 5).forEach(idea => {
        shownIdeas.push(idea);

        list.innerHTML += `
            <div class="idea-card">
                <h3>${escapeHTML(idea[0])}</h3>
                <p><strong>Materials:</strong> ${idea[1].map(escapeHTML).join(", ")}</p>
                <button onclick="showTutorial('${escapeHTML(idea[0])}')">
                    View Tutorial
                </button>
            </div>
        `;
    });
}

// SHOW TUTORIAL
function showTutorial(projectName) {
    const idea = currentIdeas.find(item => item[0] === projectName);

    if (!idea) return;

    tutorial.innerHTML = `
        <div class="tutorial-card">
            <h2>${escapeHTML(idea[0])}</h2>
            <h3>Materials Required</h3>
            <ul>
                ${idea[1].map(item => `<li>${escapeHTML(item)}</li>`).join("")}
            </ul>
            <h3>Steps</h3>
            <ol>
                ${idea[2].map(step => `<li>${escapeHTML(step)}</li>`).join("")}
            </ol>
            <button onclick="startProject()">Back to Ideas</button>
        </div>
    `;

    tutorial.scrollIntoView({ behavior: "smooth" });
}

// PROTECT TEXT DISPLAY
function escapeHTML(text) {
    return String(text).replace(/[&<>"']/g, function(character) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[character];
    });
}

// START
loadModel();
