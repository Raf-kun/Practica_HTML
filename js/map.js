/*
  Скрипт:
   - Вешает hover/move/leave обработчики для элементов с data-name/data-feature.
   - Показывает аккуратно позиционированную подсказку (tooltip) около курсора.
   - По клику регион получает класс .selected, и его данные копируются в правую панель.
   - Поддерживает клавиатурную навигацию (Enter/Space для клика).
   - Легко адаптируется: просто указывайте data-name и data-feature у элементов SVG.
*/

(function(){
  const tooltip = document.getElementById('tooltip');
  const ttTitle = document.getElementById('tt-title');
  const ttDesc  = document.getElementById('tt-desc');
  const infoBox = document.getElementById('info-box');
  const container = document.querySelector('.map-container');

  // селектор: все области и города. Можно поменять на специфичные классы.
  const items = container.querySelectorAll('[data-name][data-feature]');

  // вспомогательная функция: показать tooltip
  function showTooltip(name, feature, clientX, clientY){
    ttTitle.textContent = name;
    ttDesc.textContent = feature;
    tooltip.setAttribute('aria-hidden', 'false');
    tooltip.classList.add('show');
    positionTooltip(clientX, clientY);
  }

  // позиционируем тултип рядом с курсором, но проверяем границы окна
  function positionTooltip(clientX, clientY){
    const offset = 12;
    const ttRect = tooltip.getBoundingClientRect();
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    // default center above cursor
    let left = clientX;
    let top = clientY - offset;

    // не выходим за левую/правую границу
    if (left - ttRect.width/2 < 8) left = ttRect.width/2 + 8;
    if (left + ttRect.width/2 > winW - 8) left = winW - ttRect.width/2 - 8;

    // если мало места сверху — показываем снизу
    if (top - ttRect.height < 8) top = clientY + offset + ttRect.height/2;

    tooltip.style.left = left + 'px';
    tooltip.style.top  = top + 'px';
  }

  // скрыть тултип
  function hideTooltip(){
    tooltip.classList.remove('show');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  // снятие выделения со всех
  function clearSelection(){
    container.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
  }

  // установка содержимого правой панели
  function fillInfo(name, feature, el){
    const html = `
      <strong>${escapeHtml(name)}</strong>
      <p style="color:var(--muted); margin-top:8px;">${escapeHtml(feature)}</p>
    
      <p style="margin-top:10px; font-size:13px;">
        ID элемента: <code style="background:#fafafa;padding:3px 6px;border-radius:4px;border:1px solid #eee;">${el.id || '(нет id)'}</code>
      </p>
    `;
    infoBox.innerHTML = html;
  }

  // простая эскейп-функция для безопасности вставки текста
  function escapeHtml(str){
    return String(str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  // обработчики для каждого интерактивного элемента
  items.forEach(el => {
    // mouse enter => show tooltip
    el.addEventListener('mouseenter', (ev) => {
      const name = el.dataset.name;
      const feature = el.dataset.feature;
      showTooltip(name, feature, ev.clientX, ev.clientY);
    });

    // mouse move => перемещаем tooltip
    el.addEventListener('mousemove', (ev) => {
      positionTooltip(ev.clientX, ev.clientY);
    });

    // mouse leave => скрываем
    el.addEventListener('mouseleave', () => {
      hideTooltip();
    });

    // keyboard accessibility: Enter / Space
    el.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        el.click();
      }
      // наведение через стрелки не реализовано (можно расширить)
    });

    // click => выбрать/подсветить
    el.addEventListener('click', (ev) => {
      clearSelection();
      el.classList.add('selected');
      hideTooltip();
      fillInfo(el.dataset.name, el.dataset.feature, el);
      // Optional: прокрутка правой панели в видимую область, или другое поведение
    });
  });

  // клик по пустому месту — снять выделение
  document.addEventListener('click', (ev) => {
    // если клик был внутри .map-container и по элементу с data-name, он уже обработан
    // если клик снаружи — чистим
    const inside = ev.target.closest('.map-container');
    if (!inside) {
      clearSelection();
      infoBox.innerHTML = 'Наведите мышь или кликните на регион — тут появится подробная информация.';
    }
  });

  // скрыть тултип при скролле/resize
  window.addEventListener('scroll', hideTooltip, {passive:true});
  window.addEventListener('resize', hideTooltip);

  // улучшение UX: по наведению на метки показываем outline для фокуса (для touch можно отключить)
  // -- оставлено пустым, при необходимости можно добавить адаптивное поведение.

  // Инициализация: (опционально) можно заранее выбрать регион
  // document.getElementById('sichuan').classList.add('selected');
  // fillInfo('Сычуань', 'Панды и острая кухня', document.getElementById('sichuan'));

})();
