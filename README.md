# 🌆 UrbanHeatScan – Smart-City Heat & Green Analysis for GIFT City, Gujarat 🇮🇳

> **Remote-sensing dashboard that tracks how India’s first smart city heats up (or cools down) and how its green cover evolves over time.**

---

## 🛰️ Project Overview

- **Goal:** Detect Urban Heat Island (UHI) intensity and green-cover change in GIFT City (*2015 vs 2022*).
- **Datasets:** Landsat-8 Surface Temperature, NDVI, NDBI, MNDWI via Google Earth Engine.
- **Key Findings:**  
  _“Between 2015 and 2022, GIFT City’s average LST rose by approximately 2°C while NDVI decreased by 10–15%, reflecting expansion of built-up areas and vegetation loss.”  

---

## 🚀 Key Features

- Land Surface Temperature (LST) heatmaps
- NDVI vegetation distribution maps
- NDBI built-up index & MNDWI water index
- Δ-Change layers (2022 – 2015) for each indicator
- Scatter plot: NDVI vs LST (see cooling effect of vegetation)
- Zonal statistics printed in console
- One-click GeoTIFF/PNG export stubs

---

## 🛠️ Tech Stack / Tools

`Google Earth Engine (JS)`, `Remote Sensing`, `Landsat-8`, `Python (Streamlit / geemap)`, `GIS`, `Sustainability Analytics`

---

## 🔁 How to Re-run the Analysis

1. **Create** an [Earth Engine account](https://signup.earthengine.google.com/)
2. **Open** `earth_engine/UrbanHeatScan_GIFT.js` in the Earth Engine Code Editor
3. **Click Run** and toggle map layers as desired
4. _(Optional)_ Uncomment `Export.image.toDrive` blocks to save GeoTIFF/PNG outputs

---

## 🗂️ Repository Structure

```
├── earth_engine/
│   └── UrbanHeatScan_GIFT.js
├── data/
│   └── (sample outputs, GeoTIFFs)
├── screenshots/
│   └── (visual previews)
├── streamlit_dashboard/
│   └── app.py
├── README.md
```

---

## 📸 Screenshots / GIF Previews

<!-- Paste screenshots or GIFs here -->
- _[Screenshot 1: LST Heatmap]_
![LST 2015](https://github.com/user-attachments/assets/947a96fa-1650-4073-a7ab-f8b91e2c0504)
![LST 2022](https://github.com/user-attachments/assets/7f41b7b7-d6a3-46c2-808e-1f8468210fc4)


- _[Screenshot 2: NDVI Map]_
- ![NDVI 2015](https://github.com/user-attachments/assets/59ddf380-ee65-49a6-a54e-2dbc2a98917a)
![NDVI 2022](https://github.com/user-attachments/assets/82f27a31-d103-4e2c-8acb-797d87fa850f)
 
- _[GIF: Layer toggling demo]_
![image](https://github.com/user-attachments/assets/e42f0da2-3d47-4077-bf30-f3e4cba1a588)

---

## 📊 Results & Insights

### 🌡️ Urban Heat Trends (2015–2022)
Between May 2015 and May 2022, GIFT City experienced a noticeable rise in land surface temperature (LST). Based on satellite-derived thermal data, the average surface temperature within a 30 km radius increased by approximately 2.3°C, reflecting the growing impact of urban heat island effects as smart city infrastructure expanded.
### 🌱 Green Cover Evolution
Green vegetation cover, measured using NDVI (Normalised Difference Vegetation Index), declined by an estimated 10–15% in core development zones. This suggests that while the city grew rapidly, natural land and tree cover were likely replaced by impervious surfaces like roads and buildings.
### 🏙️ Built-up & Waterbody Changes
By comparing satellite imagery over the years, built-up areas visibly expanded—especially around the planned commercial and residential sectors. Minor variations were also observed in surface water bodies, indicating slight improvements due to man-made interventions (e.g., water features or retention ponds), but not enough to offset the heat or green loss.
### 📉 NDVI vs LST: Cooling Correlations
A spatial comparison of NDVI and LST layers reveals a clear inverse relationship: regions with higher vegetation consistently recorded lower temperatures, emphasizing the importance of green infrastructure in heat mitigation. These findings reinforce that urban forestry and sustainable land use planning are vital for long-term climate resilience.
---

## 🔮 Future Work

- Time-series GIF (2013–2024)
- Interactive Streamlit dashboard
- Green-roof policy simulation tools

---

## 👤 Author & License

**Tejas Sharma**  
MIT License

---
