// Function to extract 2 dominant colors from canvas
    const extractDominantColors = (canvas) => {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    
    const colorMap = {}
    
    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += 200) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const alpha = data[i + 3]
        
        // Skip transparent pixels
        if (alpha < 125) continue
        
        // Group similar colors (reduce precision)
        const key = `${Math.floor(r/15)*15},${Math.floor(g/15)*15},${Math.floor(b/15)*15}`
        colorMap[key] = (colorMap[key] || 0) + 1
    }
    
    // Helper function to convert RGB to HSL
    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255
        const max = Math.max(r, g, b), min = Math.min(r, g, b)
        let h, s, l = (max + min) / 2
        
        if (max === min) {
            h = s = 0 // achromatic
        } else {
            const d = max - min
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break
                case g: h = (b - r) / d + 2; break
                case b: h = (r - g) / d + 4; break
            }
            h /= 6
        }
        return [h * 360, s * 100, l * 100]
    }
    
    // Helper function to convert HSL to RGB
    const hslToRgb = (h, s, l) => {
        h /= 360; s /= 100; l /= 100
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1/6) return p + (q - p) * 6 * t
            if (t < 1/2) return q
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
            return p
        }
        
        if (s === 0) {
            return [l * 255, l * 255, l * 255] // achromatic
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s
            const p = 2 * l - q
            const r = hue2rgb(p, q, h + 1/3)
            const g = hue2rgb(p, q, h)
            const b = hue2rgb(p, q, h - 1/3)
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
        }
    }
    
    // Helper function to enhance light colors
    const enhanceColor = (r, g, b) => {
        const [h, s, l] = rgbToHsl(r, g, b)
        
        // If color is light (lightness > 70) or desaturated (saturation < 30)
        if (l > 70 || s < 30) {
            // Increase saturation and reduce lightness
            const newS = Math.min(100, s + 10) // Boost saturation
            const newL = Math.max(25, l - 20)  // Darken
            return hslToRgb(h, newS, newL)
        }
        
        // If color is already well-saturated and not too light, return as-is
        return [r, g, b]
    }
    
    // Sort colors by frequency and get top 2
    const sortedColors = Object.entries(colorMap)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 2)
    
    if (sortedColors.length >= 2) {
        const [r1, g1, b1] = sortedColors[0][0].split(',').map(Number)
        const [r2, g2, b2] = sortedColors[1][0].split(',').map(Number)
        
        const [eR1, eG1, eB1] = enhanceColor(r1, g1, b1)
        const [eR2, eG2, eB2] = enhanceColor(r2, g2, b2)
        
        return [
            `rgb(${eR1},${eG1},${eB1})`,
            `rgb(${eR2},${eG2},${eB2})`
        ]
    } else if (sortedColors.length === 1) {
        const [r, g, b] = sortedColors[0][0].split(',').map(Number)
        const [eR, eG, eB] = enhanceColor(r, g, b)
        
        // Create a complementary darker variant
        const [h, s, l] = rgbToHsl(eR, eG, eB)
        const [darkerR, darkerG, darkerB] = hslToRgb(h, Math.min(100, s + 10), Math.max(15, l - 25))
        
        return [
            `rgb(${eR},${eG},${eB})`,
            `rgb(${darkerR},${darkerG},${darkerB})`
        ]
    }
    return ['rgb(59,130,246)', 'rgb(37,99,235)'] 
}