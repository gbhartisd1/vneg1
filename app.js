const kitListSection = document.getElementById("kit-list-section");
const kitFormSection = document.getElementById("kit-form-section");
const kitForm = document.getElementById("kit-form");
const kitListDiv = document.getElementById("kit-list");

document.getElementById("show-form").onclick = () => {
  kitListSection.style.display = "none";
  kitFormSection.style.display = "";
};
document.getElementById("show-list").onclick = () => {
  kitListSection.style.display = "";
  kitFormSection.style.display = "none";
};

function getKits() {
  return JSON.parse(localStorage.getItem("kits") || "[]");
}

function saveKits(kits) {
  localStorage.setItem("kits", JSON.stringify(kits));
}

function renderKits() {
  const kits = getKits();
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

kitForm.onsubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const kit = {
    title: form.title.value.trim(),
    description: form.description.value.trim(),
    instructions: form.instructions.value.trim(),
    image: form.image.value.trim() || ""
  };
  if (!kit.title || !kit.description || !kit.instructions) return;
  const kits = getKits();
  kits.unshift(kit); // show newest first
  saveKits(kits);
  renderKits();
  form.reset();
  kitListSection.style.display = "";
  kitFormSection.style.display = "none";
};

// Initial render
renderKits();