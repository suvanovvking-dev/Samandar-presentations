function calculatePrice() {
  const slides = parseInt(document.getElementById('slides').value) || 0;
  const extraDesignPrice = parseInt(document.getElementById('design').value) || 0;
  const isUrgent = document.getElementById('urgent').checked;

  // 1 varoq narxi: 2000 so'm + dizayn qo'shimchasi (0 yoki 1000)
  const basePagePrice = 2000 + extraDesignPrice;
  
  let total = slides * basePagePrice;

  // Shoshilinch bo'lsa +8,000 so'm
  if (isUrgent) {
    total += 8000;
  }

  // Maksimal narx 50,000 so'mdan oshmasligi kerak
  const maxNote = document.getElementById('max-note');
  if (total > 100000) {
    total = 100000;
    maxNote.style.display = 'block'; // Max narx qo'yilganini bildirish
  } else {
    maxNote.style.display = 'none';
  }

  // Natijani ekranga chiqarish
  document.getElementById('total-price').innerText = total.toLocaleString();
}

function sendOrder() {
  const slides = document.getElementById('slides').value;
  const designSelect = document.getElementById('design');
  const designText = designSelect.options[designSelect.selectedIndex].text;
  const isUrgent = document.getElementById('urgent').checked ? "Ha" : "Yo'q";
  const totalPrice = document.getElementById('total-price').innerText;

  // O'zingizning Telegram username'ingiz
  const myTelegramUsername = "nobody_can_saw"; 

  // Telegram xabar matni
  const message = `Assalomu alaykum! Yangi prezentatsiya buyurtmasi:%0A%0A` +
                  `- Varoqlar soni: ${slides} ta%0A` +
                  `- Dizayn turi: ${designText}%0A` +
                  `- Shoshilinchligi: ${isUrgent}%0A` +
                  `- Umumiy narx: ${totalPrice} so'm`;

  window.open(`https://t.me/${myTelegramUsername}?text=${message}`, '_blank');
}
