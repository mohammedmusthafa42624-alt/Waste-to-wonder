const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");

let selectedIdeas = [];

const ideas = {
  bottle: [
    "Make a small flower vase.",
    "Create a self-watering plant pot.",
    "Turn it into a bird feeder."
  ],
  paper: [
    "Make handmade greeting cards.",
    "Create paper flowers.",
    "Make a colorful paper basket."
  ],
  cardboard: [
    "Build a desk organizer.",
    "Make a toy house.",
    "Create a photo frame."
  ],
  can: [
    "Make a pencil holder.",
    "Create a decorative planter.",
    "Turn it into a desk organizer."
  ],
  plastic: [
    "Make a small storage container.",
    "Create a plant pot.",
    "Make a DIY pen stand."
  ],
  default: [
    "Create a decorative craft.",
    "Make a useful home organizer.",
    "Try a creative recycled art project."
  ]
};

function previewImage(event) {
  const file = event.target.files[0];

  if (!file) return;

  preview.src = URL.createObjectURL(file);
  preview.style.display = "block";
  result.innerHTML = "";
  selectedIdeas = [];

  const name = file.name.toLowerCase();

  for (const item of ["bottle", "paper", "cardboard", "can", "plastic"]) {
    if (name.includes(item)) {
      selectedIdeas = ideas[item];
      break;
    }
  }

  if (selectedIdeas.length === 0) {
    selectedIdeas = ideas.default;
  }
}

function getIdeas() {
  if (!upload.files.length) {
    result.innerHTML = "<p>Please upload a waste image first!</p>";
    return;
  }

  result.innerHTML = `
    <h2>♻️ Creative Reuse Ideas</h2>
    <ul>
      ${selectedIdeas.map(idea => `<li>${idea}</li>`).join("")}
    </ul>
    <p>Let's turn waste into wonder! 🌍</p>
  `;
}
