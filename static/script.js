async function fetchAlerts() {
  const alertsContainer = document.getElementById("alerts");
  const lastUpdated = document.getElementById("last-updated");
  alertsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch("/alerts");
    const data = await res.json();

    alertsContainer.innerHTML = "";

    if (data.length === 0) {
      alertsContainer.innerHTML = "<p>No breaking alerts right now.</p>";
      return;
    }

    data.forEach(alert => {
      const div = document.createElement("div");
      div.className = "alert-card";
      div.innerHTML = `
        <h3>${alert.source}</h3>
        <p><strong>${alert.timestamp}</strong></p>
        <p>${alert.news}</p>
        <a href="${alert.link}" target="_blank">Read more →</a>
      `;
      alertsContainer.appendChild(div);
    });

    const now = new Date().toLocaleTimeString();
    lastUpdated.textContent = `Last updated at ${now}`;

  } catch (err) {
    alertsContainer.innerHTML = "<p>Error fetching alerts.</p>";
    console.error(err);
  }
}

setInterval(fetchAlerts, 30000);
window.onload = fetchAlerts;
