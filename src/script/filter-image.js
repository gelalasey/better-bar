const searchBox = document.getElementById("searchBox");
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");
    updateGallery(filter, searchBox.value.toLowerCase());
  });
});
searchBox.addEventListener("input", () => {
  const filter = document
    .querySelector(".filter-btn.active")
    .getAttribute("data-filter");
  updateGallery(filter, searchBox.value.toLowerCase());
});
function updateGallery(category, searchTerm) {
  galleryItems.forEach((item) => {
    const matchesCategory =
      category === "all" || item.dataset.category === category;
    const matchesSearch = item.dataset.title.toLowerCase().includes(searchTerm);
    item.style.display =
      matchesCategory && matchesSearch ? "inline-block" : "none";
  });
}