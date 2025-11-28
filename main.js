document.addEventListener("DOMContentLoaded", () => {
  // 현재 선택된 램프 ID (1~6)
  let currentProductId = 1;

  const productCards = document.querySelectorAll(".product[data-product]");
  const detailSection = document.getElementById("product-detail");
  const detailImage = document.getElementById("detail-image");
  const tempSlider = document.getElementById("temp-slider");
  const tempText = document.getElementById("temp-label");
  const backToLamps = document.getElementById("back-to-lamps");
  const productsSection = document.getElementById("products");

  // room-1-1.png 같은 파일 경로
  function getRoomImageSrc(productId, frame) {
    return `assets/room-${productId}-${frame}.png`;
  }

  function getTempLabel(frame) {
    switch (frame) {
      case 1:
        return "Very warm";
      case 2:
        return "Warm";
      case 3:
        return "Neutral";
      case 4:
        return "Cool";
      case 5:
        return "Very cool";
      default:
        return "";
    }
  }

  // 슬라이더 색상: warm → neutral → cool
  function updateSliderVisual(frame) {
    if (!tempSlider) return;

    let color;
    if (frame <= 2) {
      // 따뜻한 쪽
      color = "#b45309"; // warm orange
    } else if (frame === 3) {
      // 중간
      color = "#f97316"; // neutral-ish
    } else if (frame === 4) {
      color = "#3b82f6"; // cool blue
    } else {
      color = "#0ea5e9"; // very cool cyan
    }

    tempSlider.style.setProperty("--slider-color", color);

    if (tempText) {
      tempText.textContent = getTempLabel(frame);
    }
  }

  // 카드 클릭 → 램프 변경 + 상세 섹션으로 스크롤
  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      const productId = Number(card.dataset.product);
      if (Number.isNaN(productId)) return;

      currentProductId = productId;

      const frame = Number(tempSlider?.value || 2) || 2;

      if (detailImage) {
        detailImage.src = getRoomImageSrc(currentProductId, frame);
      }

      updateSliderVisual(frame);

      if (detailSection) {
        detailSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 슬라이더 움직일 때 → 이미지 & 색 업데이트
  if (tempSlider) {
    tempSlider.addEventListener("input", () => {
      const frame = Number(tempSlider.value);

      if (detailImage) {
        detailImage.src = getRoomImageSrc(currentProductId, frame);
      }

      updateSliderVisual(frame);
    });
  }

  // "Go to lamp list" 버튼 → 위로 스크롤
  if (backToLamps && productsSection) {
    backToLamps.addEventListener("click", () => {
      productsSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 초기 상태 세팅
  if (tempSlider) {
    const startFrame = Number(tempSlider.value);
    if (detailImage) {
      detailImage.src = getRoomImageSrc(currentProductId, startFrame);
    }
    updateSliderVisual(startFrame);
  }
});
