const kitListSection = document.getElementById("kit-list-section");
const kitFormSection = document.getElementById("kit-form-section");
const kitForm = document.getElementById("kit-form");
const kitListDiv = document.getElementById("kit-list");

//db work : VIBECODED PLS CHECK
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Kit = mongoose.model('Kit', {
  title: String,
  description: String,
  instructions: String,
  image: String
});
const app = express();
app.use(cors());
app.use(express.json());

app.get('/kits', async (req, res) => {
  const kits = await Kit.find().sort({ _id: -1 });
  res.json(kits);
});

app.post('/kits', async (req, res) => {
  const kit = new Kit(req.body);
  await kit.save();
  res.status(201).json(kit);
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));


// Frontend code: ALSO VIBE CODED SORRY MOTHER EARTH
document.getElementById("show-form").onclick = () => {
  kitListSection.style.display = "none";
  kitFormSection.style.display = "";
};
document.getElementById("show-list").onclick = () => {
  kitListSection.style.display = "";
  kitFormSection.style.display = "none";
};

async function getKits() {
  const res = await fetch("http://localhost:3000/kits");
  if (res.ok){
    return await res.json();
  } else {
    console.error("Failed to fetch kits friom localhost:", res.statusText);
    return [];
  }
}

async function saveKits(kits) {
  await fetch('http://localhost:3000/kits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kit)
  });
}

async function renderKits() {
  const kits = await getKits();
  if (kits.length === 0) {
    kitListDiv.innerHTML = "<p>No kits shared yet. Be the first to share!</p>";
    return;
  }
  kitListDiv.innerHTML = kits.map(kit => `
    <div class="kit">
      ${kit.image ? `<img src="${kit.image}" class="kit-image" alt="kit image">` : ''}
      <div class="kit-content">
        <div class="kit-title">${kit.title}</div>
        <div class="kit-desc">${kit.description}</div>
        <div class="kit-instructions"><b>How to make it:</b><br>${kit.instructions}</div>
      </div>
    </div>
  `).join('');
}

kitForm.onsubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const kit = {
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    instructions: form.instructions.value.trim(),
    image: form.image.value.trim() || ""
  };
  if (!kit.title || !kit.description || !kit.instructions) return;
  await saveKit(kit);
  await renderKits();
  form.reset();
  kitListSection.style.display = "";
  kitFormSection.style.display = "none";
};

// Initial render
renderKits();