# Script para aplicar cambios al archivo index.css

$cssFile = "index.css"
$content = Get-Content $cssFile -Raw

# Cambio 1: Agregar text-decoration: none a .feature-card
$content = $content -replace '(\.feature-card \{[^}]*box-shadow: 0 4px 6px rgba\(0,0,0,0\.05\);)', '$1`r`n  text-decoration: none; /* Quita el subrayado del enlace */'

# Cambio 2: Agregar estilos a .feature-card__name
$content = $content -replace '(\.feature-card__name \{[^}]*font-family: var\(--font-heading\);)', '$1`r`n  text-decoration: none; /* Quita el subrayado del nombre del producto */`r`n  transition: text-decoration 0.3s ease; /* Transición suave para el subrayado */'

# Cambio 3: Agregar media query para hover en desktop después de .feature-card__name
$featureCardNameEnd = '\.feature-card__name \{[^}]*\}'
$mediaQueryInsert = "`r`n`r`n/* Efecto hover solo en desktop para mostrar que es clickeable */`r`n@media (min-width: 768px) {`r`n  .feature-card:hover .feature-card__name {`r`n    text-decoration: underline; /* Muestra el subrayado solo en hover en desktop */`r`n  }`r`n}"
$content = $content -replace "($featureCardNameEnd)", "`$1$mediaQueryInsert"

# Cambio 4: Agregar text-decoration: none a .feature-card__description
$content = $content -replace '(\.feature-card__description \{[^}]*line-height: 1\.6;)', '$1`r`n  text-decoration: none; /* Quita el subrayado de la descripción */'

# Cambio 5: Modificar .testimonials-carousel__slide para mobile y agregar estilos para desktop
$oldTestimonialSlide = '\.testimonials-carousel__slide \{[^}]*min-width: 100%;[^}]*padding: 1rem 10%;[^}]*\/\* Provides space on the sides \*\/[^}]*box-sizing: border-box;[^}]*background-color: #DCF8C6;[^}]*\/\* WhatsApp-like green \*\/[^}]*padding: 1\.5rem;[^}]*border-radius: 12px 12px 12px 0;[^}]*position: relative;[^}]*text-align: left;[^}]*box-shadow: 0 4px 12px rgba\(0,0,0,0\.08\);[^}]*max-width: 800px;[^}]*\/\* Limit width for better readability \*\/[^}]*margin: 0 auto;[^}]*\/\* Center the slide content \*\/[^}]*\}'

$newTestimonialSlide = @"
.testimonials-carousel__slide {
  min-width: 100%;
  padding: 1.5rem;
  box-sizing: border-box;
  background-color: #DCF8C6; /* WhatsApp-like green */
  border-radius: 12px 12px 12px 0;
  position: relative;
  text-align: left;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  margin: 0 auto; /* Center the slide content */
}

/* Estilos específicos para desktop - tarjetas más cuadradas con vista previa */
@media (min-width: 768px) {
  .testimonials-carousel {
    overflow: visible; /* Permite ver las tarjetas adyacentes */
  }
  
  .testimonials-carousel__slides-container {
    padding: 0 20%; /* Espacio para mostrar 20% de cada lado */
  }
  
  .testimonials-carousel__slide {
    min-width: 60%; /* Tarjeta principal ocupa 60% del ancho total */
    max-width: 500px; /* Ancho máximo para mantener proporción cuadrada */
    margin: 0 20%; /* Margen de 20% a cada lado */
    padding: 2rem;
    flex-shrink: 0; /* Evita que las tarjetas se compriman */
  }
}
"@

$content = $content -replace $oldTestimonialSlide, $newTestimonialSlide

# Guardar el archivo
$content | Set-Content $cssFile -NoNewline

Write-Host "Cambios aplicados exitosamente a index.css" -ForegroundColor Green
