const inner = document.querySelector('.marquee__inner');
const spans = inner.querySelectorAll('span');

function duplicate() {
  inner.appendChild(spans[0].cloneNode(true));
}

duplicate();
