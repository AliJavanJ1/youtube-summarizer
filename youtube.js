import { fetchTranscript } from 'youtube-transcript';
import Toastify from 'toastify-js';

// Helper function to handle the fetching and error styling for both cases
function getTranscript(videoUrl) {
  fetchTranscript(videoUrl).then(transcript_json => {
    // Simplified concatenation using map and join
    let transcript_text = transcript_json.map(item => item.text).join("\r\n\r\n");
    chrome.runtime.sendMessage({ action: "TRANSCRIPT_READY", text: transcript_text });
  }).catch(err => {
    Toastify({
      text: err.message || "Failed to load transcript",
      duration: 4000,
      gravity: "top",
      position: "right",
      style: {
        background: "#d32f2f", 
        borderRadius: "8px",
        fontSize: "14px",
        fontFamily: "Roboto, Arial, sans-serif"
      }
    }).showToast();
  });
}

document.addEventListener("mouseover", (e) => {
  // Target either a thumbnail link OR the main video player
  let link = e.target.closest('a[href^="/watch"]');
  let mainPlayer = e.target.closest('#movie_player');
  
  let targetContainer = link || mainPlayer;

  if (targetContainer && !targetContainer.querySelector('.my-custom-yt-btn')) {
    let btn = document.createElement("button");
    btn.innerText = "Explain by Gemini";
    btn.className = "my-custom-yt-btn";
    btn.style.cssText = "position:absolute; top:5px; left:5px; z-index:9999; background:red; color:white; border:none; padding:5px; cursor:pointer; border-radius:4px;";
    
    btn.addEventListener("click", async (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      
      // If it's a link, build the URL. If it's the main player, use the current page URL.
      let videoUrl = link ? "https://www.youtube.com" + link.getAttribute("href") : window.location.href;
      
      getTranscript(videoUrl);
    });

    targetContainer.appendChild(btn);

    targetContainer.addEventListener("mouseleave", () => btn.remove(), { once: true });
  }
});