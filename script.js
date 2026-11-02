let currentTab = 0;
const totalTabs = 4; // Cover (0), Past (1), Present (2), Future (3)

function updateView() {
  for (let i = 0; i < totalTabs; i++) {
    const tab = document.getElementById(`tab-${i}`);
    if (tab) tab.classList.remove('active-tab');
  }

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => btn.classList.remove('active'));

  const activeTab = document.getElementById(`tab-${currentTab}`);
  if (activeTab) activeTab.classList.add('active-tab');

  if (navButtons[currentTab]) {
    navButtons[currentTab].classList.add('active');
  }

  // Update page counter
  const indicator = document.getElementById('pageIndicator');
  if (currentTab === 0) {
    indicator.textContent = "Cover";
  } else {
    indicator.textContent = `${currentTab} of 3`;
  }

  // Button state logic
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  prevBtn.style.opacity = currentTab === 0 ? '0.4' : '1';
  prevBtn.style.cursor = currentTab === 0 ? 'not-allowed' : 'pointer';

  nextBtn.style.opacity = currentTab === totalTabs - 1 ? '0.4' : '1';
  nextBtn.style.cursor = currentTab === totalTabs - 1 ? 'not-allowed' : 'pointer';
}

function goToTab(index) {
  currentTab = index;
  updateView();
}

function nextTab() {
  if (currentTab < totalTabs - 1) {
    currentTab++;
    updateView();
  }
}

function prevTab() {
  if (currentTab > 0) {
    currentTab--;
    updateView();
  }
}

// ----------------------------------------------------
// DYNAMIC LIVE IMAGE UPLOADER FOR COVER PHOTO
// ----------------------------------------------------
function loadCustomImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById('displayImage').src = e.target.result;
    }
    reader.readAsDataURL(file);
  }
}

// ----------------------------------------------------
// DYNAMIC 3D TILT MOUSE ENGINE
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  updateView();

  const tiltableCards = document.querySelectorAll('.cover-card-3d, .card-3d');

  tiltableCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
    });
  });
});