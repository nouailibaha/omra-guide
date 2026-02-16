// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/assets/js/service-worker.js")
      .then((registration) => {
        console.log(
          "Service Worker registered successfully:",
          registration.scope,
        );
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}

// Handle PWA Install Prompt
let deferredPrompt;
const installPrompt = document.getElementById("installPrompt");
const installBtn = document.getElementById("installBtn");
const dismissBtn = document.getElementById("dismissBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the mini-infobar from appearing
  e.preventDefault();
  // Save the event for later
  deferredPrompt = e;
  // Show install prompt
  installPrompt.classList.remove("hidden");
});

installBtn.addEventListener("click", async () => {
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    // Clear the prompt
    deferredPrompt = null;
    installPrompt.classList.add("hidden");
  }
});

dismissBtn.addEventListener("click", () => {
  installPrompt.classList.add("hidden");
});

// Hide install prompt if already installed
window.addEventListener("appinstalled", () => {
  installPrompt.classList.add("hidden");
  console.log("PWA installed successfully");
});
