// Amélioration du site Magdeleine Solutions
document.addEventListener("DOMContentLoaded", () => {
  // 1. Amélioration de l'affichage mobile
  improveResponsiveness()

  // 2. Amélioration du slider de simulation
  if (document.getElementById("loanAmountRange")) {
    improveSimulationSlider()
  }

  // 3. Correction du défilement vers les sections
  fixSectionScrolling()
})

// 1. Amélioration de l'affichage mobile
function improveResponsiveness() {
  // Ajuster la taille des polices pour les petits écrans
  if (window.innerWidth <= 576) {
    const adjustFontSize = () => {
      document.querySelectorAll("h1").forEach((h1) => {
        h1.style.fontSize = "1.8rem"
      })
      document.querySelectorAll("h2").forEach((h2) => {
        h2.style.fontSize = "1.5rem"
      })
      document.querySelectorAll("p").forEach((p) => {
        p.style.fontSize = "0.95rem"
      })
    }

    adjustFontSize()
    window.addEventListener("resize", adjustFontSize)
  }

  // Améliorer la navigation mobile
  const menuToggle = document.getElementById("menu-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (menuToggle && navMenu) {
    // Fermer le menu lorsqu'un lien est cliqué
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        if (menuToggle.querySelector("i")) {
          menuToggle.querySelector("i").className = "fas fa-bars"
        }
      })
    })

    // Améliorer l'accessibilité du menu
    menuToggle.setAttribute("aria-expanded", "false")
    menuToggle.setAttribute("aria-controls", "nav-menu")

    menuToggle.addEventListener("click", () => {
      const isExpanded = navMenu.classList.contains("active")
      menuToggle.setAttribute("aria-expanded", !isExpanded)
    })
  }

  // Améliorer les formulaires sur mobile
  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("focus", function () {
      // Augmenter légèrement la taille sur focus pour une meilleure UX mobile
      this.style.padding = "14px 16px"
    })

    input.addEventListener("blur", function () {
      this.style.padding = ""
    })
  })
}

// 2. Amélioration du slider de simulation
function improveSimulationSlider() {
  const loanAmountRange = document.getElementById("loanAmountRange")
  const loanAmountInput = document.getElementById("loanAmount")
  const loanAmountValue = document.getElementById("loanAmountValue")

  if (loanAmountRange && loanAmountInput && loanAmountValue) {
    // Configurer le pas du slider à 1000
    loanAmountRange.step = 1000

    // Synchroniser le slider et l'input
    loanAmountRange.addEventListener("input", function () {
      // Arrondir à 1000 près
      const value = Math.round(Number.parseInt(this.value) / 1000) * 1000
      loanAmountInput.value = value

      // Formater la valeur affichée
      const formattedValue = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)

      loanAmountValue.textContent = formattedValue
    })

    // Permettre la saisie manuelle
    loanAmountInput.addEventListener("input", function () {
      let value = Number.parseInt(this.value) || 0

      // Limiter aux valeurs min/max du slider
      const min = Number.parseInt(loanAmountRange.min)
      const max = Number.parseInt(loanAmountRange.max)
      value = Math.max(min, Math.min(max, value))

      // Mettre à jour le slider
      loanAmountRange.value = value

      // Formater la valeur affichée
      const formattedValue = new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(value)

      loanAmountValue.textContent = formattedValue
    })

    // Initialiser avec les valeurs correctes
    loanAmountInput.value = loanAmountRange.value

    // Formater la valeur initiale
    const initialValue = new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(loanAmountRange.value)

    loanAmountValue.textContent = initialValue
  }
}

// 3. Correction du défilement vers les sections
function fixSectionScrolling() {
  // Sélectionner tous les liens internes
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Calculer la position avec un décalage pour le header fixe
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // Défilement fluide
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Mettre à jour l'URL sans recharger la page
        history.pushState(null, null, `#${targetId}`)
      }
    })
  })

  // Gérer le défilement initial si l'URL contient un hash
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Attendre un peu pour que la page soit complètement chargée
        setTimeout(() => {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }, 300)
      }
    }
  })
}
