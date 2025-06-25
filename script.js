/* -----------------------------------
   Security Threats Radar Simulation
----------------------------------- */

// Config
const RADAR_RADIUS = 200;                // Half of radar width/height
const THREAT_INTERVAL_MS = 2300;         // New blip every X ms
const BLIP_LIFETIME_MS = 6000;           // Remove blip after X ms
const FEED_MAX_ITEMS = 30;               // Max list length

// DOM refs
const radar = document.getElementById('radar');
const feed  = document.getElementById('feed');

// Data pools
const countries = [
  'United States', 'India', 'Brazil', 'Germany', 'Nigeria',
  'China', 'Russia', 'Australia', 'Canada', 'Japan', 'France'
];

const threatTypes = [
  { emoji: '🛡️', label: 'DDoS' },
  { emoji: '🐟', label: 'Phishing' },
  { emoji: '💣', label: 'Malware' },
  { emoji: '🔑', label: 'Credential Stuffing' },
  { emoji: '⚔️', label: 'Brute Force' }
];

// Helpers
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomCoords() {
  /*  Generates a random point inside the circle.
      Polar method: √r to keep uniform distribution */
  const r = Math.sqrt(Math.random()) * RADAR_RADIUS;
  const theta = randomBetween(0, 2 * Math.PI);
  return {
    x: RADAR_RADIUS + r * Math.cos(theta),
    y: RADAR_RADIUS + r * Math.sin(theta)
  };
}

function createBlip() {
  const { x, y } = getRandomCoords();
  const blip = document.createElement('div');
  blip.classList.add('blip');
  blip.style.left = `${x - 4}px`;  // center blip (8px wide)
  blip.style.top  = `${y - 4}px`;
  radar.appendChild(blip);

  // Remove blip after lifetime
  setTimeout(() => blip.remove(), BLIP_LIFETIME_MS);
}

function addFeedEntry() {
  const threat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const country = countries[Math.floor(Math.random() * countries.length)];
  const now = new Date().toLocaleTimeString('en-GB', { hour12: false });

  const li = document.createElement('li');
  li.textContent = `${threat.emoji} ${threat.label} Detected — ${country} — ${now}`;
  feed.prepend(li);

  // Trim old messages
  if (feed.children.length > FEED_MAX_ITEMS) {
    feed.lastChild.remove();
  }
}

// Master loop
function spawnThreat() {
  createBlip();
  addFeedEntry();
}
setInterval(spawnThreat, THREAT_INTERVAL_MS);

// Kick-off immediately so the UI isn’t empty at load
spawnThreat();
