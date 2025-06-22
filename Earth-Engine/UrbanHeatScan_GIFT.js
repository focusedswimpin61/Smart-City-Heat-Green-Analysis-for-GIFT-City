// -----------------------------------------------------------------------------
// UrbanHeatScan – GIFT City Smart-Sustainability Dashboard (LST, NDVI, NDBI, MNDWI)
// Author: Tejas Sharma  |  Date: 2025-09
// -----------------------------------------------------------------------------

// 1) REGION OF INTEREST  ------------------------------------------------------
var gift = ee.Geometry.Point(72.6836, 23.1550);        // GIFT City centroid
var aoi  = gift.buffer(15000).bounds();                // 30 km box (≈smart-city & hinterland)

// 2) CONFIG: YEARS & DATE WINDOW ---------------------------------------------
var years = ['2015', '2022'];                          // compare these two Mays
var monthWindow = ['05-01', '05-31'];                  // pre-monsoon, hot & clear

// 3) COMMON FUNCTIONS ---------------------------------------------------------
var scale  = 30;                                       // Landsat native resolution

// 3a) Convert ST_B10 (Kelvin *10) ➜ °C
var addLST = function(img) {
  var lst = img.select('ST_B10')
               .multiply(0.00341802).add(149.0)
               .subtract(273.15)
               .rename('LST_C');
  return img.addBands(lst);
};

// 3b) NDVI
var addNDVI = function(img) {
  var ndvi = img.normalizedDifference(['SR_B5', 'SR_B4'])
               .rename('NDVI');
  return img.addBands(ndvi);
};

// 3c) NDBI  (Built-up: (SWIR - NIR) / (SWIR + NIR))
var addNDBI = function(img) {
  var ndbi = img.normalizedDifference(['SR_B6', 'SR_B5'])
               .rename('NDBI');
  return img.addBands(ndbi);
};

// 3d) MNDWI (Water index: (Green - SWIR) / (Green + SWIR))
var addMNDWI = function(img) {
  var mndwi = img.normalizedDifference(['SR_B3', 'SR_B6'])
               .rename('MNDWI');
  return img.addBands(mndwi);
};

// Palette presets
var lstVis  = {min: 30, max: 45, palette:['blue','cyan','lime','yellow','orange','red','darkred']};
var ndviVis = {min: 0,  max: 0.6, palette:['brown','beige','lightgreen','green','darkgreen']};
var ndbiVis = {min:-0.2,max: 0.4, palette:['navy','purple','grey','orange','red']};
var mndwiVis= {min:-0.5,max: 0.5, palette:['brown','khaki','aqua','blue']};

// Containers
var yearlyImages = {};

// 4) LOOP THROUGH YEARS -------------------------------------------------------
years.forEach(function(yr){
  var start = yr + '-' + monthWindow[0];
  var end   = yr + '-' + monthWindow[1];

  var col = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
              .filterDate(start, end)
              .filterBounds(aoi)
              .filterMetadata('CLOUD_COVER', 'less_than', 10)
              .map(addLST)
              .map(addNDVI)
              .map(addNDBI)
              .map(addMNDWI);

  var median = col.median().clip(aoi);
  yearlyImages[yr] = median;                       // store

  // ---------- VISUAL LAYERS ----------
  Map.addLayer(median.select('LST_C'),  lstVis,  'LST '+yr);
  Map.addLayer(median.select('NDVI'),   ndviVis, 'NDVI '+yr, false);
  Map.addLayer(median.select('NDBI'),   ndbiVis, 'NDBI '+yr, false);
  Map.addLayer(median.select('MNDWI'),  mndwiVis,'MNDWI '+yr, false);

  // ---------- ZONAL STATS ----------
  var stats = median.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: scale,
      maxPixels: 1e13
  });
  print('Mean values for', yr, stats);
});

// 5) DIFFERENCE IMAGES (2022 − 2015) -----------------------------------------
var delta_LST  = yearlyImages['2022'].select('LST_C').subtract(yearlyImages['2015'].select('LST_C')).rename('Δ_LST');
var delta_NDVI = yearlyImages['2022'].select('NDVI').subtract(yearlyImages['2015'].select('NDVI')).rename('Δ_NDVI');

Map.addLayer(delta_LST,  {min:-2, max:4, palette:['green','white','red']},  'Δ LST (22-15)');
Map.addLayer(delta_NDVI, {min:-0.2,max:0.2,palette:['red','white','green']},'Δ NDVI (22-15)', false);

// 6) SCATTER PLOT (LST vs NDVI, 2022) ----------------------------------------
var sample = yearlyImages['2022'].select(['NDVI','LST_C']).sample({
  region: aoi, scale: scale, numPixels: 5000, seed: 42
});
var chart = ui.Chart.feature.byFeature(sample, 'NDVI', ['LST_C'])
  .setChartType('ScatterChart')
  .setOptions({
      title: 'GIFT City 2022: NDVI vs LST',
      hAxis: {title:'NDVI (green cover)'},
      vAxis: {title:'LST °C'},
      pointSize: 3,
      trendlines: {0: {showR2:true, visibleInLegend:true}}
  });
print(chart);

// 7) OPTIONAL EXPORTS ---------------------------------------------------------
// Uncomment to export high-res GeoTIFFs or PNGs to Drive
/*
Export.image.toDrive({
  image: yearlyImages['2022'].select('LST_C'),
  description: 'GIFT_LST_2022',
  folder: 'EarthEngineExports',
  fileNamePrefix: 'GIFT_LST_2022',
  region: aoi,
  scale: 30,
  maxPixels: 1e13
});
*/

// 8) MAP SETTINGS -------------------------------------------------------------
Map.centerObject(gift, 12);
Map.addLayer(aoi, {color:'white'}, 'AOI Boundary', false);
