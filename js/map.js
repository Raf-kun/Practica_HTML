document.addEventListener('DOMContentLoaded', function() {
  const regions = document.querySelectorAll('.region, .city');
  const tooltip = document.getElementById('tooltip');
  const ttTitle = document.getElementById('tt-title');
  const ttDesc = document.getElementById('tt-desc');
  const infoContent = document.getElementById('info-content');
  const placeholder = document.querySelector('.placeholder');
  const regionInfo = document.getElementById('region-info');
  const regionName = document.getElementById('region-name');
  const regionType = document.getElementById('region-type');
  const statPopulation = document.getElementById('stat-population');
  const statArea = document.getElementById('stat-area');
  const statCapital = document.getElementById('stat-capital');
  const regionDescription = document.getElementById('region-description');

  let selectedElement = null;

  // Функция для показа информации о регионе
  function showRegionInfo(element) {
    const name = element.getAttribute('data-name');
    const description = element.getAttribute('data-description');
    const population = element.getAttribute('data-population');
    const area = element.getAttribute('data-area');
    const capital = element.getAttribute('data-capital');
    const isCity = element.classList.contains('city');

    // Скрываем placeholder и показываем информацию
    placeholder.style.display = 'none';
    regionInfo.style.display = 'block';

    // Заполняем данные
    regionName.textContent = name;
    regionType.textContent = isCity ? 'Город центрального подчинения' : 'Провинция';
    regionType.className = `region-type ${isCity ? 'city-type' : 'province-type'}`;
    
    statPopulation.textContent = population;
    statArea.textContent = area;
    statCapital.textContent = capital;
    regionDescription.textContent = description;
  }

  // Функция для сброса выбора
  function resetSelection() {
    if (selectedElement) {
      selectedElement.classList.remove('selected');
      selectedElement = null;
    }
    placeholder.style.display = 'flex';
    regionInfo.style.display = 'none';
  }

  // Обработчики событий для регионов
  regions.forEach(region => {
    // Клик по региону
    region.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Снимаем выделение с предыдущего элемента
      if (selectedElement && selectedElement !== this) {
        selectedElement.classList.remove('selected');
      }
      
      // Переключаем выделение текущего элемента
      if (this.classList.contains('selected')) {
        this.classList.remove('selected');
        selectedElement = null;
        resetSelection();
      } else {
        this.classList.add('selected');
        selectedElement = this;
        showRegionInfo(this);
      }
    });

    // Наведение мыши (подсказка)
    region.addEventListener('mouseenter', function(e) {
      if (this === selectedElement) return;
      
      const name = this.getAttribute('data-name');
      const feature = this.getAttribute('data-description').split('.')[0] + '.';
      
      ttTitle.textContent = name;
      ttDesc.textContent = feature;
      
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY - 15) + 'px';
      tooltip.style.opacity = '1';
    });

    region.addEventListener('mousemove', function(e) {
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY - 15) + 'px';
    });

    region.addEventListener('mouseleave', function() {
      if (this === selectedElement) return;
      tooltip.style.opacity = '0';
    });

    // Поддержка клавиатуры
    region.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Предотвращаем изменение размера SVG при клике
  const svg = document.querySelector('svg');
  svg.style.flexShrink = '0';
  svg.style.minWidth = '100%';
  svg.style.height = 'auto';

  // Инициализация
  resetSelection();
});