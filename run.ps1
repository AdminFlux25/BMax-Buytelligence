# Run this from the root of your React project (where src folder lives)

# Base paths
$componentsPath = "src\components"
$bmaxPath = Join-Path $componentsPath "BMaxAgent"
$capabilitiesPath = Join-Path $bmaxPath "capabilities"
$dataPath = "src\data"

# Create directories
New-Item -ItemType Directory -Force -Path $componentsPath | Out-Null
New-Item -ItemType Directory -Force -Path $bmaxPath | Out-Null
New-Item -ItemType Directory -Force -Path $capabilitiesPath | Out-Null
New-Item -ItemType Directory -Force -Path $dataPath | Out-Null

# BMax agent core files
New-Item -ItemType File -Force -Path (Join-Path $bmaxPath "BMaxProvider.jsx") | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $bmaxPath "BMaxEngine.js") | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $bmaxPath "useBMax.js") | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $bmaxPath "index.js") | Out-Null

# Capability modules
$capabilityFiles = @(
  "intelligentOrdering.js",
  "askDontSearch.js",
  "smartRefill.js",
  "predictiveService.js",
  "stockAwareness.js",
  "goalDriven.js",
  "financeAssistant.js",
  "familyProfiles.js"
)

foreach ($file in $capabilityFiles) {
  New-Item -ItemType File -Force -Path (Join-Path $capabilitiesPath $file) | Out-Null
}

# UI components
$uiFiles = @(
  "CopilotOverlay.jsx",
  "CopilotBubble.jsx",
  "BaymaxSmartPanel.jsx",
  "ProductCard.jsx"
)

foreach ($file in $uiFiles) {
  New-Item -ItemType File -Force -Path (Join-Path $componentsPath $file) | Out-Null
}

# Data files
$dataFiles = @(
  "purchaseHistory.json",
  "userGoals.json",
  "familyProfiles.json",
  "stockLevels.json",
  "products.json"
)

foreach ($file in $dataFiles) {
  New-Item -ItemType File -Force -Path (Join-Path $dataPath $file) | Out-Null
}

Write-Host "BMax agent structure created successfully."
