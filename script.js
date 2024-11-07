const apiKey = "2eff22e3f1a07ca35d7502a9fe94d56a"; // clé API TMDb

document.getElementById("search-button").addEventListener("click", function () {
  const actorName = document.getElementById("search-input").value;
  fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${actorName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; // Effacer les résultats précédents
      data.results.forEach((actor) => {
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("actor");
        const actorImage = actor.profile_path
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : "default-image.png"; // Image par défaut
        actorDiv.innerHTML = `
            <img src="${actorImage}" alt="${actor.name}" />
            <p>${actor.name}</p>
          `;
        // Ajouter un événement de clic pour afficher les détails de l'acteur
        actorDiv.addEventListener("click", () =>
          displayActorDetails(actor, actorDiv)
        );
        resultsDiv.appendChild(actorDiv);
      });
    })
    .catch((error) => console.error("Erreur:", error));
});

function displayActorDetails(actor, actorDiv) {
  const actorInfoDiv = document.getElementById("actor-info");
  actorInfoDiv.innerHTML = `
    <h2>${actor.name}</h2>
    <p>Date de naissance: ${actor.birth_date || "N/A"}</p>
    <p>Âge: ${actor.age || "N/A"}</p>
    <p>Biographie: ${actor.biography || "Aucune biographie disponible."}</p>
  `;
  // Mettre en surbrillance l'acteur sélectionné dans les résultats
  const actorDivs = document.querySelectorAll("#results .actor");
  actorDivs.forEach((div) => div.classList.remove("selected"));
  actorDiv.classList.add("selected"); // Ajouter la classe "selected" à l'acteur cliqué
}
