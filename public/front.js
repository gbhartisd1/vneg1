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
    console.error("Failed to fetch kits from localhost:", res.statusText);
    return [];
  }
}

async function saveKit(kit) {
  await fetch('http://localhost:3000/kits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(kit)
  });
}