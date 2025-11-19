const addModal = document.getElementById("addModal");
const profileModal = document.getElementById("profileModal");

const openAddBtn = document.getElementById("openAddModal");
const closeAddBtn = addModal.querySelector("#closeModal");

openAddBtn.addEventListener("click", () => {
    addModal.classList.add("active");
});

closeAddBtn.addEventListener("click", () => {
    addModal.classList.remove("active");
});

document.querySelectorAll(".profil").forEach(p => {
    p.addEventListener("click", () => {
        const nom = p.querySelector(".nom").textContent;
        const role = p.querySelector(".role").textContent;
        const imgSrc = p.querySelector("img").src;

        profileModal.querySelector(".nom").textContent = nom;
        profileModal.querySelector(".role").textContent = role;
        profileModal.querySelector(".profile-pic img").src = imgSrc;

        profileModal.classList.add("active");
    });
});

profileModal.querySelector(".close-profile").addEventListener("click", () => {
    profileModal.classList.remove("active");
});

window.addEventListener("click", e => {
    if (e.target === addModal) addModal.classList.remove("active");
    if (e.target === profileModal) profileModal.classList.remove("active");
});

const expBtn = document.getElementById("showExpForm");
const expForm = document.getElementById("experienceForm");

expBtn.addEventListener("click", () => {
    expForm.style.display = expForm.style.display === "grid" ? "none" : "grid";
});
