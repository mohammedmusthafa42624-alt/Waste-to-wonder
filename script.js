
const upload = document.getElementById("wasteImage");
const preview = document.getElementById("preview");
const result = document.getElementById("result");
const tutorial = document.getElementById("tutorial");

let model = null;
let selectedObject = "default";
let shownIdeas = [];
let currentIdeas = [];

const projects = {
    bottle: [
        ["Flower Pot", ["Bottle", "Soil", "Plant"], ["Clean the bottle.", "Use a safe pre-cut container.", "Add soil and a plant."]],
        ["Pen Holder", ["Bottle", "Paper", "Glue"], ["Clean the bottle.", "Decorate it with paper.", "Store pens."]],
        ["Bird Feeder", ["Bottle", "Bird seed"], ["Clean the bottle.", "Ask an adult to prepare it safely.", "Add bird seed."]],
        ["Watering Can", ["Bottle", "Water"], ["Clean the bottle.", "Ask an adult to prepare the cap.", "Use it to water plants."]],
        ["Storage Container", ["Bottle", "Labels"], ["Clean and dry the bottle.", "Use a safe container.", "Add a label."]],
        ["Desk Organizer", ["Bottle", "Decorations"], ["Clean the bottle.", "Decorate it.", "Organize stationery."]],
        ["Mini Herb Garden", ["Bottle", "Soil", "Seeds"], ["Use a safe prepared container.", "Add soil.", "Plant seeds."]],
        ["Gift Wrapper", ["Bottle", "Ribbon"], ["Clean the bottle.", "Decorate it.", "Use it as gift packaging."]],
        ["Piggy Bank", ["Bottle", "Paper"], ["Clean the bottle.", "Ask an adult to prepare an opening.", "Decorate it."]],
        ["Table Decoration", ["Bottle", "Paint"], ["Clean the bottle.", "Decorate the outside.", "Let it dry."]]
    ],

    cardboard: [
        ["Desk Organizer", ["Cardboard", "Glue"], ["Arrange cardboard sections.", "Ask an adult to cut if needed.", "Decorate it."]],
        ["Toy House", ["Cardboard box", "Colors"], ["Take a clean box.", "Draw doors and windows.", "Decorate it."]],
        ["Photo Frame", ["Cardboard", "Photo"], ["Draw a frame.", "Ask an adult to cut it.", "Attach a photo."]],
        ["Storage Box", ["Cardboard box", "Paper"], ["Clean the box.", "Cover it with paper.", "Add a label."]],
        ["Book Organizer", ["Cardboard", "Paper"], ["Arrange cardboard dividers.", "Decorate them.", "Organize books."]],
        ["Laptop Stand Model", ["Cardboard"], ["Draw a simple stand design.", "Ask an adult to prepare pieces.", "Use only for lightweight items."]],
        ["Wall Art", ["Cardboard", "Colors"], ["Draw a design.", "Color it.", "Display your artwork."]],
        ["Gift Box", ["Cardboard", "Ribbon"], ["Fold a prepared cardboard box.", "Decorate it.", "Add a ribbon."]],
        ["Table Nameplate", ["Cardboard", "Markers"], ["Fold cardboard into a stand.", "Write a name.", "Decorate it."]],
        ["Drawer Dividers", ["Cardboard"], ["Measure the drawer.", "Ask an adult to cut pieces.", "Arrange dividers."]]
    ],

    paper: [
        ["Paper Flowers", ["Waste paper", "Glue"], ["Draw flower shapes.", "Ask for help cutting.", "Assemble the flowers."]],
        ["Greeting Card", ["Paper", "Colors"], ["Fold paper.", "Draw a design.", "Write a greeting."]],
        ["Paper Basket", ["Waste paper", "Glue"], ["Roll paper strips.", "Arrange them into a basket.", "Secure with glue."]],
        ["Paper Decorations", ["Paper", "String"], ["Draw shapes.", "Cut with safe scissors.", "Hang decorations safely."]],
        ["Paper Bookmark", ["Paper", "Colors"], ["Prepare a bookmark shape.", "Draw a design.", "Decorate it."]],
        ["Paper Beads", ["Paper", "Glue"], ["Prepare paper strips.", "Roll them into beads.", "Secure with glue."]],
        ["Gift Tags", ["Paper", "String"], ["Cut tag shapes.", "Write messages.", "Attach string."]],
        ["Paper Mosaic", ["Paper", "Glue"], ["Tear paper into small pieces.", "Arrange a pattern.", "Glue onto paper."]],
        ["Mini Notebook", ["Waste paper", "Staples"], ["Arrange clean paper.", "Ask an adult to bind it.", "Create a cover."]],
        ["Paper Wall Collage", ["Paper", "Glue"], ["Choose a theme.", "Arrange paper pieces.", "Attach them to a backing sheet."]]
    ],

    spoon: [
        ["Decorative Flower", ["Clean plastic spoons", "Cardboard"], ["Arrange spoons in a flower pattern.", "Ask an adult to help assemble.", "Display it."]],
        ["Wall Art", ["Clean spoons", "Cardboard"], ["Arrange a pattern.", "Ask an adult to attach pieces.", "Display safely."]],
        ["Craft Decoration", ["Spoons", "Colors"], ["Clean the spoons.", "Decorate them.", "Let them dry."]],
        ["Mini Display", ["Spoons", "Container"], ["Clean the spoons.", "Arrange them in a container.", "Decorate it."]],
        ["Colorful Sculpture", ["Spoons", "Cardboard"], ["Plan a design.", "Arrange the spoons.", "Ask an adult to assemble."]],
        ["Photo Decor", ["Spoons", "Photo frame"], ["Clean the spoons.", "Arrange around a frame.", "Ask an adult to attach them."]],
        ["Garden Marker", ["Reusable spoon", "Marker"], ["Clean the spoon.", "Write a plant name.", "Place it safely in a pot."]],
        ["Craft Mobile", ["Spoons", "String"], ["Decorate the spoons.", "Ask an adult to assemble a hanging display.", "Hang safely."]],
        ["Color Display", ["Spoons", "Paint"], ["Clean the spoons.", "Paint them.", "Display after drying."]],
        ["Art Pattern", ["Spoons", "Cardboard"], ["Arrange a pattern.", "Ask an adult to attach it.", "Display your artwork."]]
    ],

    clothes: [
        ["Reusable Bag", ["Old cloth", "Thread"], ["Choose clean cloth.", "Ask an adult to sew the edges.", "Add handles."]],
        ["Cushion Cover", ["Old cloth", "Cushion"], ["Choose clean fabric.", "Measure the cushion.", "Ask an adult to sew it."]],
        ["Cleaning Cloth", ["Old cotton cloth"], ["Wash the cloth.", "Ask an adult to prepare suitable pieces.", "Use for cleaning."]],
        ["Patchwork Art", ["Fabric pieces", "Thread"], ["Arrange a pattern.", "Join pieces with adult help.", "Display your art."]],
        ["Fabric Bookmark", ["Old fabric", "Cardboard"], ["Prepare a cardboard strip.", "Cover it with fabric.", "Let it dry."]],
        ["Fabric Gift Wrap", ["Old cloth"], ["Wash the cloth.", "Use it to wrap a gift.", "Tie a reusable knot."]],
        ["Decorative Pillow", ["Old cloth", "Cushion filling"], ["Choose clean fabric.", "Ask an adult to sew a cover.", "Fill it safely."]],
        ["Cloth Wall Art", ["Fabric", "Cardboard"], ["Arrange fabric pieces.", "Attach them to cardboard.", "Display safely."]],
        ["Reusable Pouch", ["Old cloth", "Thread"], ["Choose clean fabric.", "Ask an adult to sew a pouch.", "Store small items."]],
        ["Fabric Garland", ["Fabric scraps", "String"], ["Arrange clean fabric pieces.", "Ask an adult to prepare them.", "Attach to string."]]
    ],

    can: [
        ["Pencil Holder", ["Clean can", "Paper"], ["Ask an adult to check for sharp edges.", "Cover the outside.", "Store pencils."]],
        ["Planter Cover", ["Clean can", "Plant pot"], ["Use a can with no sharp edges.", "Place a pot inside.", "Decorate it."]],
        ["Storage Container", ["Clean can", "Labels"], ["Check for sharp edges with an adult.", "Clean and dry it.", "Add a label."]],
        ["Desk Decoration", ["Clean can", "Colors"], ["Clean the can.", "Decorate the outside.", "Let it dry."]],
        ["Art Display", ["Clean can", "Paper"], ["Cover the outside.", "Draw a design.", "Display it."]],
        ["Gift Container", ["Clean can", "Ribbon"], ["Use only a safe can.", "Decorate it.", "Add a ribbon."]],
        ["Mini Planter Cover", ["Clean can", "Small pot"], ["Use a safe can.", "Place a pot inside.", "Display it."]],
        ["Table Organizer", ["Clean can", "Labels"], ["Clean the can.", "Add labels.", "Organize supplies."]],
        ["Pencil Set Holder", ["Clean can", "Paper"], ["Check for sharp edges with an adult.", "Decorate it.", "Arrange stationery."]],
        ["Decorative Display", ["Clean can", "Paint"], ["Clean the can.", "Decorate the outside.", "Let it dry."]]
    ],

    jar: [
        ["Flower Vase", ["Clean jar", "Flowers"], ["Wash the jar.", "Dry it.", "Add flowers."]],
        ["Storage Jar", ["Clean jar", "Label"], ["Wash and dry the jar.", "Add a label.", "Store suitable items."]],
        ["Desk Organizer", ["Clean jar", "Decorations"], ["Clean the jar.", "Decorate it.", "Store stationery."]],
        ["Plant Display", ["Jar", "Small plant pot"], ["Clean the jar.", "Place a small pot inside.", "Display it."]],
        ["Gift Container", ["Jar", "Paper", "Ribbon"], ["Clean the jar.", "Decorate it.", "Add a ribbon."]],
        ["Button Storage", ["Clean jar", "Buttons"], ["Wash and dry the jar.", "Add buttons.", "Close the lid."]],
        ["Craft Supply Jar", ["Clean jar", "Labels"], ["Clean the jar.", "Add a label.", "Store craft supplies."]],
        ["Decorative Jar", ["Clean jar", "Paint"], ["Clean the jar.", "Decorate the outside.", "Let it dry."]],
        ["Pebble Display", ["Jar", "Clean pebbles"], ["Clean the jar.", "Add clean pebbles.", "Display it safely."]],
        ["Gift Packaging", ["Jar", "Ribbon"], ["Clean the jar.", "Place a suitable gift inside.", "Decorate it."]]
    ],

    wood: [
        ["Display Stand", ["Smooth wood", "Adult help"], ["Choose safe smooth wood.", "Ask an adult to prepare it.", "Display a lightweight item."]],
        ["Photo Display", ["Wood", "Photo"], ["Choose a safe wood piece.", "Ask an adult to prepare it.", "Add a photo."]],
        ["Desk Organizer", ["Wood pieces"], ["Collect smooth wood pieces.", "Ask an adult to assemble them.", "Store stationery."]],
        ["Garden Sign", ["Wood", "Paint"], ["Choose a safe board.", "Paint a label.", "Let it dry."]],
        ["Decorative Art", ["Wood", "Paint"], ["Clean the wood.", "Draw a design.", "Display your artwork."]],
        ["Bookend Decoration", ["Smooth wood", "Paint"], ["Choose a stable prepared piece.", "Decorate it.", "Use it as a bookend with adult help."]],
        ["Plant Label", ["Wood", "Marker"], ["Choose a smooth prepared stick.", "Write a plant name.", "Place it in a pot."]],
        ["Wall Display", ["Wood", "Photo"], ["Choose a prepared wood piece.", "Add a photo with adult help.", "Display safely."]],
        ["Table Decoration", ["Wood", "Paint"], ["Clean the wood.", "Paint a design.", "Let it dry."]],
        ["Small Display Tray", ["Prepared wood", "Decorations"], ["Use a smooth prepared piece.", "Decorate it.", "Display lightweight objects."]]
    ],

    default: [
        ["Recycled Art", ["Clean waste material", "Colors"], ["Identify the material.", "Clean it safely.", "Decorate it."]],
        ["Storage Organizer", ["Suitable container", "Labels"], ["Choose a safe container.", "Decorate it.", "Add a label."]],
        ["Home Decoration", ["Clean waste material", "Decorations"], ["Clean the material.", "Choose a design.", "Decorate it safely."]],
        ["Creative Craft", ["Waste material", "Paper", "Glue"], ["Collect clean materials.", "Plan a craft.", "Assemble safely."]],
        ["Garden Decoration", ["Suitable material", "Paint"], ["Choose weather-safe material.", "Clean it.", "Decorate it."]],
        ["Gift Decoration", ["Clean material", "Ribbon"], ["Choose suitable clean material.", "Decorate it.", "Use it as gift decoration."]],
        ["Desk Display", ["Clean material", "Colors"], ["Clean the material.", "Decorate it.", "Display it."]],
        ["Reusable Container", ["Suitable container", "Label"], ["Clean the container.", "Add a label.", "Store suitable items."]],
        ["Wall Collage", ["Clean material", "Glue"], ["Arrange clean pieces.", "Create a pattern.", "Display safely."]],
        ["Garden Marker", ["Suitable material", "Marker"], ["Choose a safe material.", "Write a plant name.", "Place it near a pot."]]
    ]
};
