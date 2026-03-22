const button = document.getElementById("searchBtn");

button.addEventListener("click", loadRepos);

window.onload = () => {
    const defaultUser = "gis3ll3-m";
    document.getElementById("username").value = defaultUser;
    fetchRepos(defaultUser);
};

function loadRepos() {
    const user = document.getElementById("username").value;
    fetchRepos(user);
}

function fetchRepos(user) {
    fetch(`https://api.github.com/users/${user}/repos?per_page=10`)
        .then(res => {
            if (!res.ok) {
                throw new Error("User not found");
            }
            return res.json();
        })
        .then(data => {
            const repoBoxes = document.querySelectorAll(".repo");

            if (data.length == 0) {
                alert("User has no repositories");
                return;
            }

            data.forEach((repo, i) => {
                const box = repoBoxes[i];

                box.style.display="block";

                //NAME of repo
                const nameSpan = box.querySelector(".repo-name");
                nameSpan.textContent = repo.name;
                box.querySelector(".name").href = repo.html_url;

                //DESCRIPTION
                const repoDesc = box.querySelector(".description");
                if (repo.description) {
                    repoDesc.textContent = repo.description;
                } else {
                    repoDesc.textContent = "No description";
                }

                //DATE CREATED, UPDATED, and NUM OF WATCHERS
                box.querySelector(".created").textContent =
                    "Created: " + new Date(repo.created_at).toLocaleDateString();

                box.querySelector(".updated").textContent =
                    "Updated: " + new Date(repo.updated_at).toLocaleDateString();

                box.querySelector(".watchers").textContent =
                    "Watchers: " + repo.watchers_count;

                //LANGUAGES
                fetch(repo.languages_url)
                    .then(res => res.json())
        
                .then(langs => {
                    const lang = box.querySelector(".languages");
                    const list = Object.keys(langs);

                    if (list.length > 0) {
                        lang.textContent = "Languages: " + list.join(", ");
                    } else {
                        lang.textContent = "Languages: NONE";
                    }
                });
                });

                 for (let i = data.length; i <= repoBoxes.length, i++;) {
                    repoBoxes[i].style.display="none";
        
    }
});




}