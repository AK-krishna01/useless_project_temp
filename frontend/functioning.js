document.addEventListener('DOMContentLoaded', () => {

    // Select DOM elements
    const unitGrid = document.querySelector('.unit-grid');
    const inputValue = document.getElementById('input-value');
    const convertBtn = document.getElementById('convert-btn');
    const resultValue = document.getElementById('result-value');
  
    // Conversion categories
    const categories = [
      "Length",
      "Mass",
      "Area",
      "Volume",
      "Temperature",
      "Speed",
      "Time",
      "Energy",
      "Pressure",
      "Angle",
      "Data Storage",
      "Power"
    ];
  
    // Units and conversion factors to base units (SI)
    const unitConversions = {
      Length: { base: "m", units: { m:1, km:1000, cm:0.01, mm:0.001, mi:1609.34, yd:0.9144, ft:0.3048, in:0.0254 } },
      Mass: { base: "kg", units: { kg:1, g:0.001, mg:0.000001, lb:0.453592, oz:0.0283495 } },
      Area: { base: "m2", units: { m2:1, km2:1e6, cm2:0.0001, ft2:0.092903, in2:0.00064516, yd2:0.836127, ac:4046.86, ha:10000 } },
      Volume: { base: "m3", units: { m3:1, cm3:1e-6, l:0.001, ml:1e-6, ft3:0.0283168, in3:1.6387e-5, gal:0.00378541 } },
      Temperature: { units: ["c", "f", "k"] },
      Speed: { base: "m/s", units: { "m/s":1, "km/h":0.277778, mph:0.44704, "ft/s":0.3048, knot:0.514444 } },
      Time: { base: "s", units: { s:1, min:60, h:3600, day:86400 } },
      Energy: { base: "J", units: { J:1, kJ:1000, cal:4.184, kcal:4184, Wh:3600, kWh:3.6e6 } },
      Pressure: { base: "Pa", units: { Pa:1, kPa:1000, MPa:1e6, bar:1e5, psi:6894.76, atm:101325 } },
      Angle: { base: "deg", units: { deg:1, rad:57.2958, grad:0.9 } },
      DataStorage: { base: "B", units: { B:1, KB:1024, MB:1048576, GB:1073741824, TB:1.0995e12 } },
      Power: { base: "W", units: { W:1, kW:1000, MW:1e6, hp:745.7 } }
    };
  
    // Biju conversion factors per category
    const bijuFactors = {
      Length: 2.5,
      Mass: 3.0,
      Area: 6.0,
      Volume: 8.0,
      Temperature: null, // special conversion
      Speed: 1.8,
      Time: 4.0,
      Energy: 5.5,
      Pressure: 0.001,
      Angle: 10,
      DataStorage: 0.75,
      Power: 7.0
    };
  
    // Create and add unit dropdown dynamically
    const unitSelect = document.createElement('select');
    unitSelect.id = 'unit-select';
    unitSelect.style.marginLeft = '10px';
    document.querySelector('.search-bars').appendChild(unitSelect);
  
    let selectedCategory = null;
  
    // Create category boxes inside unitGrid
    categories.forEach(category => {
      const box = document.createElement('div');
      box.classList.add('unit-box');
      box.textContent = category;
      box.style.cursor = 'pointer';
      box.addEventListener('click', () => {
        selectedCategory = category;
        populateUnitDropdown(category);
        resultValue.textContent = `Selected category: ${category}. Enter value and choose unit.`;
      });
      unitGrid.appendChild(box);
    });
  
    // Populate units dropdown based on selected category
    function populateUnitDropdown(category) {
      unitSelect.innerHTML = ''; // clear old options
      let units = [];
  
      if(category === 'Temperature'){
        units = ['c', 'f', 'k'];
      } else {
        units = Object.keys(unitConversions[category].units);
      }
  
      units.forEach(unit => {
        const option = document.createElement('option');
        option.value = unit;
        option.textContent = unit;
        unitSelect.appendChild(option);
      });
    }
  
    // Convert Celsius to Biju Temperature scale (custom logic)
    function temperatureToBiju(celsius) {
      return (celsius * 1.2) + 10;
    }
  
    // Convert input value to base SI unit
    function toBaseUnit(category, value, unit) {
      unit = unit.toLowerCase();
      if(category === 'Temperature') {
        if(unit === 'c') return value;
        else if(unit === 'f') return (value - 32) * 5 / 9;
        else if(unit === 'k') return value - 273.15;
        else return null;
      }
      return value * unitConversions[category].units[unit];
    }
  
    // Convert base unit value to Biju units using factors
    function convertToBiju(category, baseValue) {
      if(category === 'Temperature') return temperatureToBiju(baseValue);
      return baseValue * bijuFactors[category];
    }
  
    // Update conversion result shown to user
    function updateResult() {
      if(!selectedCategory) {
        resultValue.textContent = 'Please select a category first.';
        return;
      }
      const val = parseFloat(inputValue.value);
      if(isNaN(val)) {
        resultValue.textContent = 'Please enter a valid number.';
        return;
      }
      const unit = unitSelect.value;
      const baseVal = toBaseUnit(selectedCategory, val, unit);
      if(baseVal === null) {
        resultValue.textContent = 'Unit conversion error.';
        return;
      }
      const bijuVal = convertToBiju(selectedCategory, baseVal);
      resultValue.textContent = `${val} ${unit} = ${bijuVal.toFixed(3)} Biju ${selectedCategory} units`;
    }
  
    // Attach event listeners for conversion
    convertBtn.addEventListener('click', updateResult);
  
    // Optional: you can remove these if you want only button conversion
    // inputValue.addEventListener('input', updateResult);
    // unitSelect.addEventListener('change', updateResult);
  
  });
  