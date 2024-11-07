const apiKey = "2eff22e3f1a07ca35d7502a9fe94d56a"; // TMDb API key

document.getElementById("search-button").addEventListener("click", function () {
  const actorName = document.getElementById("search-input").value;
  fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${apiKey}&query=${actorName}`
  )
    .then((response) => response.json())
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; // Clear previous results
      data.results.forEach((actor) => {
        const actorDiv = document.createElement("div");
        actorDiv.classList.add("actor");
        const actorImage = actor.profile_path
          ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
          : "default-image.png"; // Default image
        actorDiv.innerHTML = `
            <img src="${actorImage}" alt="${actor.name}" />
            <p>${actor.name}</p>
          `;
        // Add a click event to display the actor's details
        actorDiv.addEventListener("click", () =>
          displayActorDetails(actor, actorDiv)
        );
        resultsDiv.appendChild(actorDiv);
      });
    })
    .catch((error) => console.error("Error:", error));
});

function displayActorDetails(actor, actorDiv) {
  const actorInfoDiv = document.getElementById("actor-info");
  actorInfoDiv.innerHTML = `
    <h2>${actor.name}</h2>
    <p>Date of birth: ${actor.birth_date || "N/A"}</p>
    <p>Age: ${actor.age || "N/A"}</p>
    <p>Biography: ${actor.biography || "No biography available."}</p>
  `;
  // Highlight the selected actor in the results
  const actorDivs = document.querySelectorAll("#results .actor");
  actorDivs.forEach((div) => div.classList.remove("selected"));
  actorDiv.classList.add("selected"); // Add the "selected" class to the clicked actor
}
