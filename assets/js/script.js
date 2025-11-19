const addModal = document.getElementById("addModal");
const profileModal = document.getElementById("profileModal");

const openAddBtn = document.getElementById("openAddModal");
const closeAddBtn = addModal.querySelector("#closeModal");

openAddBtn.addEventListener("click", () => addModal.classList.add("active"));
closeAddBtn.addEventListener("click", () => addModal.classList.remove("active"));

window.addEventListener("click", (e) => {
    if (e.target === addModal) addModal.classList.remove("active");
    if (e.target === profileModal) profileModal.classList.remove("active");
});

const expBtn = document.getElementById("showExpForm");
const expForm = document.getElementById("experienceForm");
expBtn.addEventListener("click", () => {
    expForm.style.display = expForm.style.display === "grid" ? "none" : "grid";
});

function saveEmployees(data) {
    localStorage.setItem("employees", JSON.stringify(data));
}

function loadEmployees() {
    let data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : [];
}

let employees = loadEmployees();

function createProfile(emp) {
    let profil = document.createElement("div");
    profil.classList.add("profil");

    profil.innerHTML = `
        <div class="logo-pr">
            <img src="${emp.photo}">
            <div class="profil-text">
                <p class="nom">${emp.nom}</p>
                <p class="role">${emp.role}</p>
            </div>
        </div>
        <div class="interactive-btn">
            <button class="edit">edit</button>
            <button class="remove">X</button>
        </div>
    `;

    document.querySelector(".side-bar").appendChild(profil);
    attachProfileEvents(profil);
}

function attachProfileEvents(profil) {
    profil.addEventListener("click", () => {
        const nom = profil.querySelector(".nom").textContent;
        const role = profil.querySelector(".role").textContent;
        const imgSrc = profil.querySelector("img").src;

        profileModal.querySelector(".nom").textContent = nom;
        profileModal.querySelector(".role").textContent = role;
        profileModal.querySelector(".profile-pic img").src = imgSrc;

        profileModal.classList.add("active");
    });

    profil.querySelector(".remove").addEventListener("click", (e) => {
        e.stopPropagation();
        let name = profil.querySelector(".nom").textContent;
        employees = employees.filter(emp => emp.nom !== name);
        saveEmployees(employees);
        profil.remove();
    });
}

profileModal.querySelector(".close-profile")
    .addEventListener("click", () => profileModal.classList.remove("active"));

employees.forEach(emp => createProfile(emp));

const addEmployeeForm = document.getElementById("addEmployeeForm");
const addEmployeeBtn = document.querySelector(".modal-footer button:first-child");

addEmployeeBtn.addEventListener("click", () => {
    let inputs = addEmployeeForm.querySelectorAll("input, select");

    let nom = inputs[0].value.trim();
    let email = inputs[1].value.trim();
    let role = inputs[2].value;
    let tel = inputs[3].value.trim();
    let photo = inputs[4].value.trim();
    let gender = addEmployeeForm.querySelector("input[name='gender']:checked");

    if (!nom || !email || !role || !tel || (!photo && !gender)) {
        alert("Merci de remplir tous les champs");
        return;
    }

    if (!photo) {
        let rnd = Math.floor(Math.random() * 5) + 1;
        photo = gender.value === "male"
            ? `assets/img/avatar_h${rnd}.jpg`
            : `assets/img/avatar_g${rnd}.jpg`;
    }

    let newEmployee = {
        nom,
        email,
        role,
        tel,
        photo,
    };

    employees.push(newEmployee);
    saveEmployees(employees);

    createProfile(newEmployee);

    addModal.classList.remove("active");
    addEmployeeForm.reset();
});
