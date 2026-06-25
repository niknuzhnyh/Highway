/**
 * Військовий Облік Палива PWA - app.js
 * Senior Frontend Engineer Code Implementation
 * Чистий ES6+ JavaScript, реактивні розрахунки, SPA роутер, локальне сховище + симуляція API.
 */

// Норми витрат мастильних матеріалів у % від фактичної витрати палива (завантажуються/симулюються з сервера)
const FLUID_CONSUMPTION_NORMS = {
  "Моторна олива М-14Г2К": 0.015,     // 1.5% від витрати палива
  "Моторна олива 15W-40": 0.015,      // 1.5%
  "Моторна олива М-8В": 0.012,        // 1.2%
  "Моторна олива 10W-30": 0.015,      // 1.5%
  "Трансмісійна олива ТАД-17и": 0.004, // 0.4%
  "Трансмісійна олива ТАД-17": 0.004,  // 0.4%
  "Охолоджуюча рідина ТОСОЛ-А40": 0.002, // 0.2%
  "Охолоджуюча рідина (Антифриз)": 0.002, // 0.2%
  "Антифриз G11": 0.002,              // 0.2%
  "Двотактне мастило": 0.020,         // 2.0%
  "AdBlue": 0.050                     // 5.0%
};

// ==========================================================================
// MOCK СЕРВЕРНІ ДАНІ ТА НАЛАШТУВАННЯ АКТИВІВ
// ==========================================================================
const MOCK_ASSETS = [
  {
    plate: "ЗСУ-0112",
    name: "MAN  (Вантажівка)",
    type: "vehicle",
    fuelType: "Дизель",
    baseConsumption: 26.0, // л / 100 км
    allowedFluids: ["Моторна олива М-14Г2К", "Трансмісійна олива ТАД-17и", "Охолоджуюча рідина ТОСОЛ-А40"]
  },
  {
    plate: "БТ-3452",
    name: "HMMWV M1114 (Позашляховик)",
    type: "vehicle",
    fuelType: "Дизель",
    baseConsumption: 18.0, // л / 100 км
    allowedFluids: ["Моторна олива 15W-40", "Рідина ГУР ATF", "Склоомивач зимовий"]
  },
  {
    plate: "ЗСУ-8902",
    name: "ГАЗ-66 (Бортовий кунг)",
    type: "vehicle",
    fuelType: "Бензин",
    baseConsumption: 24.0, // л / 100 км
    allowedFluids: ["Моторна олива М-8В", "Гальмівна рідина Нева", "Солідол Ж"]
  },
  {
    plate: "ГЕН-10К",
    name: "Дизель-Генератор 10кВт (Matari)",
    type: "generator",
    fuelType: "Дизель",
    baseConsumption: 4.5, // л / мотогодину
    allowedFluids: ["Моторна олива 10W-30", "Антифриз G11"]
  }
];

const MOCK_VOUCHERS = [
  { id: "T-9981-D", volume: 50, fuelType: "Дизель", status: "pending" },
  { id: "T-8874-D", volume: 20, fuelType: "Дизель", status: "pending" },
  { id: "T-5521-P", volume: 20, fuelType: "Бензин", status: "pending" },
  { id: "T-1002-D", volume: 100, fuelType: "Дизель", status: "pending" }
];

// Імітація бази даних на сервері для невідкритих дорожніх листів
// Деякі активи вже можуть мати активний лист на сервері (створений іншим водієм)
const MOCK_SERVER_ACTIVE_WAYBILLS = {
  "БТ-3452": {
    serialNumber: "DL-2026-06/042",
    plate: "БТ-3452",
    driverName: "ст. серж. Петренко І. В.",
    fuelType: "Дизель",
    baseConsumption: 18.0,
    startOdometer: 2840,
    startFuel: 45.0,
    startTalons: 80.0,
    startAdBlue: 8.0,
    startAdBlueTalons: 15.0,
    refills: [{ id: "R-1", source: "Талон T-8874-D", amount: 20 }],
    consumables: [{ name: "Моторна олива 15W-40", amount: 1.5 }],
    routes: [
      {
        id: "R-SEG-1",
        from: "ВЧ А-0000",
        to: "Блокпост №3",
        departTime: "2026-06-04T08:00",
        arriveTime: "2026-06-04T09:30",
        distSmallCity: 10,
        distMediumCity: 0,
        distBigCity: 0,
        distHighway: 25,
        distDirt: 5
      }
    ],
    status: "active"
  }
};

// ==========================================================================
// КЛАС ДЛЯ УПРАВЛІННЯ СТАНОМ (STATE MANAGEMENT)
// ==========================================================================
class AppState {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("military_user")) || null;
    this.vouchers = JSON.parse(localStorage.getItem("military_vouchers")) || MOCK_VOUCHERS;
    
    // Поточний дорожній лист у формі
    this.activeWaybill = null;
    this.activeAsset = null;

    // Списки дозволених рідин та їхніх норм споживання, що підвантажуються з сервера
    this.allowedFluids = JSON.parse(localStorage.getItem("allowed_fluids_global")) || [];
    this.fluidNorms = JSON.parse(localStorage.getItem("fluid_norms_global")) || {};
    
    // Тимчасовий стан для верифікації талонів
    this.currentMissingVoucher = null;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem("military_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("military_user");
    }
  }

  saveVouchers() {
    localStorage.setItem("military_vouchers", JSON.stringify(this.vouchers));
  }

  // Розрахунок коефіцієнтів
  static getCoefficients() {
    return {
      smallCity: 1.05,  // мале місто +5%
      mediumCity: 1.10, // середнє місто +10%
      bigCity: 1.15,    // велике місто +15%
      highway: 0.85,    // траса -15%
      dirt: 1.25        // грунт +25%
    };
  }
}

const state = new AppState();

// ==========================================================================
// SPA МАРШРУТИЗАТОР (ROUTER)
// ==========================================================================
function navigateTo(screenId) {
  document.querySelectorAll(".app-screen").forEach(screen => {
    screen.classList.remove("active");
  });
  
  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    window.scrollTo(0, 0);
  }

  // Оновлюємо відображення хедера
  const userBadge = document.getElementById("user-badge");
  if (state.currentUser) {
    userBadge.classList.remove("hidden");
    document.getElementById("user-name-display").textContent = state.currentUser.fullName;
  } else {
    userBadge.classList.add("hidden");
  }
}

// ==========================================================================
// ТОСТ-ПОВІДОМЛЕННЯ (IN-APP NOTIFICATIONS)
// ==========================================================================
function showToast(title, message, type = "info") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  
  let iconId = "icon-home";
  if (type === "error") iconId = "icon-shield-alert";
  if (type === "success") iconId = "icon-save";
  if (type === "info") iconId = "icon-file-text";

  toast.innerHTML = `
    <svg style="width: 20px; height: 20px; flex-shrink: 0; color: var(--accent-${type === 'error' ? 'red' : type === 'success' ? 'green' : 'steel'})">
      <use href="#${iconId}"></use>
    </svg>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close">&times;</button>
  `;
  
  container.appendChild(toast);
  
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    toast.remove();
  });
  
  // Автоматичне видалення через 3 секунди
  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}

// ==========================================================================
// ІНІЦІАЛІЗАЦІЯ ДОДАТКУ ТА СЛУХАЧІ ПОДІЙ
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initPWA();
  setupEventListeners();
  
  // Автоматичний вхід, якщо користувач вже авторизований
  if (state.currentUser) {
    renderDashboard();
    navigateTo("view-dashboard");
  } else {
    navigateTo("view-login");
  }
});

// Налаштування PWA Service Worker
function initPWA() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
      .then(reg => console.log("PWA Service Worker зареєстровано успішно", reg.scope))
      .catch(err => console.error("Помилка реєстрації Service Worker:", err));
  }
}

// Реєстрація слухачів подій для кнопок та форм
function setupEventListeners() {
  // АВТОРИЗАЦІЯ
  document.getElementById("btn-google-oauth").addEventListener("click", handleGoogleSignIn);
  document.getElementById("trigger-register-form").addEventListener("click", () => {
    document.getElementById("card-register-request").classList.toggle("hidden");
  });
  document.getElementById("btn-cancel-register").addEventListener("click", () => {
    document.getElementById("card-register-request").classList.add("hidden");
  });
  document.getElementById("form-register-request").addEventListener("submit", handleRegisterRequest);
  document.getElementById("btn-logout").addEventListener("click", handleLogout);

  // ДАШБОРД ТА НАВІГАЦІЯ
  document.getElementById("btn-go-vouchers").addEventListener("click", () => {
    renderVouchersList();
    navigateTo("view-vouchers");
  });
  document.getElementById("btn-back-dashboard").addEventListener("click", () => {
    renderDashboard();
    navigateTo("view-dashboard");
  });
  document.getElementById("btn-back-dashboard-from-vouchers").addEventListener("click", () => {
    renderDashboard();
    navigateTo("view-dashboard");
  });

  // ФОРМА ДОРОЖНЬОГО ЛИСТА
  document.getElementById("btn-add-refill").addEventListener("click", () => addRefillRow());
  document.getElementById("btn-add-custom-fluid").addEventListener("click", () => addCustomFluidRow());
  document.getElementById("btn-add-route").addEventListener("click", () => addRouteSegmentRow());
  document.getElementById("btn-save-waybill").addEventListener("click", handleSaveWaybill);
  document.getElementById("btn-close-waybill-trigger").addEventListener("click", handleCloseWaybillTrigger);
  
  // ПОПАП ПІДТВЕРДЖЕННЯ ЗАКРИТТЯ
  document.getElementById("btn-modal-cancel").addEventListener("click", () => {
    document.getElementById("modal-confirm-close").classList.add("hidden");
    document.body.classList.remove("modal-open");
  });
  document.getElementById("btn-modal-confirm").addEventListener("click", handleConfirmCloseWaybill);
  document.getElementById("btn-download-txt").addEventListener("click", downloadWaybillTxt);

  // ПОПАП ВІДСУТНОСТІ ТАЛОНА
  document.getElementById("btn-modal-missing-cancel").addEventListener("click", () => {
    document.getElementById("modal-report-missing").classList.add("hidden");
    state.currentMissingVoucher = null;
    document.body.classList.remove("modal-open");
  });
  document.getElementById("btn-modal-missing-confirm").addEventListener("click", handleConfirmMissingVoucher);
}

// ==========================================================================
// КОНТРОЛЕРИ ТА ЛОГІКА ЕКРАНІВ
// ==========================================================================

// 1. ЕКРАН ВХОДУ ТА ЗАПИТУ РЕЄСТРАЦІЇ
function handleGoogleSignIn() {
  // Симуляція OAuth 2.0
  showToast("Симуляція входу", "Запит авторизації Google OAuth 2.0...", "info");
  
  setTimeout(() => {
    // Вхід під тестовим водієм
    const mockUser = {
      fullName: "ст. серж. Петренко Іван Васильович",
      subunit: "3 механізована рота",
      email: "i.petrenko@military.gov.ua"
    };
    state.setCurrentUser(mockUser);
    showToast("Вхід виконано", `Авторизовано як: ${mockUser.fullName}`, "success");
    renderDashboard();
    navigateTo("view-dashboard");
  }, 1200);
}

function handleRegisterRequest(e) {
  e.preventDefault();
  
  const fullName = document.getElementById("reg-fullname").value;
  const subunit = document.getElementById("reg-subunit").value;
  const plates = document.getElementById("reg-plates").value;
  
  const payload = {
    fullName,
    subunit,
    requestedPlates: plates,
    timestamp: new Date().toISOString()
  };
  
  // Симуляція відправки на сервер
  console.log("ПЕРЕДАЧА ЗАПИТУ НА РЕЄСТРАЦІЮ НА СЕРВЕР:", payload);
  
  showToast("Запит надіслано", "Запит на реєстрацію передано Адміністратору частини.", "success");
  
  // Очистка та закриття форми
  document.getElementById("form-register-request").reset();
  document.getElementById("card-register-request").classList.add("hidden");
}

function handleLogout() {
  localStorage.clear();
  showToast("Вихід", "Ви вийшли з системи та очистили локальні дані", "info");
  
  setTimeout(() => {
    window.location.reload();
  }, 800);
}

// 2. ДАШБОРД (СПИСОК АКТИВІВ)
function renderDashboard() {
  const container = document.getElementById("assets-list-container");
  container.innerHTML = ""; // Очищуємо контейнер

  const archive = JSON.parse(localStorage.getItem("waybill_archive")) || [];

  // Оновлюємо Bento-карту талонів
  const totalVouchers = state.vouchers.length;
  const pendingVouchers = state.vouchers.filter(v => v.status === "pending").length;
  document.getElementById("bento-vouchers-total").textContent = totalVouchers;
  document.getElementById("bento-vouchers-pending").textContent = pendingVouchers;


  // Рендеримо картки активів техніки (однакового розміру відповідно до CSS grid)
  MOCK_ASSETS.forEach(asset => {
    const card = document.createElement("div");
    card.className = "card tactical-card asset-card";
    card.id = `asset-card-${asset.plate}`;

    const localActive = localStorage.getItem(`active_waybill_${asset.plate}`);
    if (localActive) {
      card.classList.add("active-waybill-present");
    }

    const isGen = asset.type === "generator";
    const typeLabel = isGen ? "Генератор" : "Машина";
    const iconId = isGen ? "icon-zap" : "icon-truck";

    card.innerHTML = `
      <div class="asset-card-header">
        <div class="asset-info">
          <span class="asset-title">${asset.name}</span>
          <span class="asset-meta-sub">Держ. номер: <strong class="text-white">${asset.plate}</strong> | Паливо: ${asset.fuelType}</span>
        </div>
        <div class="asset-type-badge ${isGen ? 'generator' : 'vehicle'}">
          <svg><use href="#${iconId}"></use></svg>
          <span>${typeLabel}</span>
        </div>
      </div>
      <div class="asset-actions">
        <button class="btn btn-outline btn-create-wb" data-plate="${asset.plate}">
          Створити дорожній лист
        </button>
        <button class="btn btn-accent btn-edit-wb" data-plate="${asset.plate}">
          Редагувати дорожній лист
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Додавання обробників подій до кнопок картки
  container.querySelectorAll(".btn-create-wb").forEach(btn => {
    btn.addEventListener("click", () => handleWaybillAction(btn.dataset.plate, "create"));
  });

  container.querySelectorAll(".btn-edit-wb").forEach(btn => {
    btn.addEventListener("click", () => handleWaybillAction(btn.dataset.plate, "edit"));
  });
}

// Реальний запит до сервера для отримання списку дозволених рідин та їх норм споживання
function fetchFluidsAndNormsFromServer(plate) {
  return fetch('./fluids.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Помилка відповіді сервера");
      }
      return response.json();
    })
    .then(data => {
      const assetAllowed = data.assetAllowedFluids[plate] || [];
      const commonFluids = data.commonFluids || ["Склоомивач", "Двотактне мастило"];
      const fluids = [...new Set([...assetAllowed, ...commonFluids])];
      
      const norms = {};
      fluids.forEach(f => {
        norms[f] = data.consumptionNorms[f] !== undefined ? data.consumptionNorms[f] : 0;
      });

      // Кешуємо локально та глобально в localStorage
      localStorage.setItem(`allowed_fluids_${plate}`, JSON.stringify(fluids));
      localStorage.setItem(`fluid_norms_${plate}`, JSON.stringify(norms));
      localStorage.setItem(`allowed_fluids_global`, JSON.stringify(fluids));
      localStorage.setItem(`fluid_norms_global`, JSON.stringify(norms));

      return { fluids, norms };
    })
    .catch(error => {
      console.warn("Мережева помилка завантаження рідин, використовуємо локальний кеш або резервні значення:", error);
      
      // Спроба взяти з localStorage
      const cachedFluids = localStorage.getItem(`allowed_fluids_${plate}`);
      const cachedNorms = localStorage.getItem(`fluid_norms_${plate}`);
      
      if (cachedFluids && cachedNorms) {
        return {
          fluids: JSON.parse(cachedFluids),
          norms: JSON.parse(cachedNorms)
        };
      }
      
      // Локальний резервний варіант
      const asset = MOCK_ASSETS.find(a => a.plate === plate);
      const assetFluids = asset ? asset.allowedFluids : [];
      const common = ["Склоомивач", "Двотактне мастило"];
      const fluids = [...new Set([...assetFluids, ...common])];
      
      const norms = {};
      fluids.forEach(f => {
        norms[f] = FLUID_CONSUMPTION_NORMS[f] || 0;
      });
      
      return { fluids, norms };
    });
}

// Логіка перевірки та відкриття форми дорожнього листа (LocalStorage + API check)
function handleWaybillAction(plate, actionType) {
  showToast("Перевірка бази даних", `Запит статусу активу ${plate}...`, "info");
  
  const selectedAsset = MOCK_ASSETS.find(a => a.plate === plate);
  state.activeAsset = selectedAsset;

  // Симулюємо запит до сервера для перевірки unclosed waybills та отримання рідин
  Promise.all([
    simulateServerCheck(plate),
    fetchFluidsAndNormsFromServer(plate)
  ]).then(([serverWaybill, fluidsData]) => {
    state.allowedFluids = fluidsData.fluids;
    state.fluidNorms = fluidsData.norms;

    const localWaybillStr = localStorage.getItem(`active_waybill_${plate}`);
    let activeWaybill = null;

    if (localWaybillStr) {
      activeWaybill = JSON.parse(localWaybillStr);
    } else if (serverWaybill) {
      activeWaybill = serverWaybill;
      // Кешуємо отримане з сервера у локальне сховище
      localStorage.setItem(`active_waybill_${plate}`, JSON.stringify(serverWaybill));
      showToast("Синхронізація", "Знайдено відкритий лист на сервері. Завантажено.", "success");
    }

    if (actionType === "create") {
      if (activeWaybill) {
        showToast("Увага", `Для активу ${plate} вже існує відкритий Дорожній лист! Перенаправлення на редагування.`, "error");
        openWaybillForm(activeWaybill);
      } else {
        createNewWaybillState(selectedAsset);
      }
    } else { // edit
      if (activeWaybill) {
        openWaybillForm(activeWaybill);
      } else {
        showToast("Інформація", `Не знайдено активного дорожнього листа для ${plate}. Створіть новий.`, "info");
      }
    }
  });
}

// Симуляція запиту до сервера (середній розхід завантажується та кешується)
function simulateServerCheck(plate) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Перевіряємо чи є на сервері активний лист для цього номера
      const serverActive = MOCK_SERVER_ACTIVE_WAYBILLS[plate] || null;
      
      // Також завантажуємо оновлений розхід палива (імітуємо зміну на сервері або просто отримання)
      const asset = MOCK_ASSETS.find(a => a.plate === plate);
      if (asset) {
        // Кешуємо середній розхід в LocalStorage як окремий параметр, якщо його там немає
        localStorage.setItem(`base_rate_${plate}`, asset.baseConsumption.toString());
      }
      
      resolve(serverActive);
    }, 800);
  });
}

// Створення нової структури дорожнього листа
function createNewWaybillState(asset) {
  // Визначаємо початкові дані в залежності від типу та попередніх показників
  // Спробуємо взяти одометр з минулих закритих листів або задаємо початковий
  const startOdo = asset.type === "generator" ? 120 : 5400; // Імітуємо одометр
  const startFuel = asset.type === "generator" ? 30.0 : 80.0;
  const startTalons = asset.type === "generator" ? 0 : 100;
  
  // Додаємо AdBlue для дизельної техніки
  const startAdBlue = asset.fuelType === "Дизель" ? 10.0 : 0.0;
  const startAdBlueTalons = asset.fuelType === "Дизель" ? 20.0 : 0.0;

  const cachedRate = localStorage.getItem(`base_rate_${asset.plate}`) || asset.baseConsumption;

  const serialNum = `DL-2026-06/${Math.floor(100 + Math.random() * 900)}`;

  const newWb = {
    serialNumber: serialNum,
    plate: asset.plate,
    driverName: state.currentUser.fullName,
    fuelType: asset.fuelType,
    baseConsumption: parseFloat(cachedRate),
    startOdometer: startOdo,
    startFuel: startFuel,
    startTalons: startTalons,
    startAdBlue: startAdBlue,
    startAdBlueTalons: startAdBlueTalons,
    refills: [],
    consumables: [],
    routes: [],
    status: "active",
    dateCreated: new Date().toISOString()
  };

  // Автоматично додаємо перший порожній сегмент маршруту для зручності
  newWb.routes.push(createEmptyRouteSegment());

  // Зберігаємо у локальне сховище
  localStorage.setItem(`active_waybill_${asset.plate}`, JSON.stringify(newWb));
  
  showToast("Створено", `Новий дорожній лист ${serialNum} успішно відкрито.`, "success");
  openWaybillForm(newWb);
}

function createEmptyRouteSegment() {
  return {
    id: `R-SEG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    from: "",
    to: "",
    departTime: "",
    arriveTime: "",
    distSmallCity: 0,
    distMediumCity: 0,
    distBigCity: 0,
    distHighway: 0,
    distDirt: 0
  };
}

// 3. ФОРМА ДОРОЖНЬОГО ЛИСТА - ВІДОБРАЖЕННЯ ТА РЕАКТИВНІСТЬ
function openWaybillForm(waybill) {
  state.activeWaybill = waybill;
  const asset = MOCK_ASSETS.find(a => a.plate === waybill.plate);
  state.activeAsset = asset;

  // Оновлюємо статус-бейдж
  const statusBadge = document.getElementById("waybill-status-badge");
  const formElement = document.getElementById("form-waybill");
  
  if (waybill.status === "closed") {
    statusBadge.textContent = "ЗАКРИТИЙ (ТІЛЬКИ ЧИТАННЯ)";
    statusBadge.className = "badge badge-locked";
    formElement.classList.add("read-only-state");
    // Сховати кнопки дій для закритих документів
    document.getElementById("btn-save-waybill").classList.add("hidden");
    document.getElementById("btn-close-waybill-trigger").classList.add("hidden");
  } else {
    statusBadge.textContent = "АКТИВНИЙ ДОРОЖНІЙ ЛИСТ";
    statusBadge.className = "badge badge-active";
    formElement.classList.remove("read-only-state");
    document.getElementById("btn-save-waybill").classList.remove("hidden");
    document.getElementById("btn-close-waybill-trigger").classList.remove("hidden");
  }

  // Заповнення заголовку
  document.getElementById("waybill-serial-number").textContent = `№ ${waybill.serialNumber}`;
  document.getElementById("wb-vehicle-plate").textContent = `${waybill.plate} (${asset ? asset.name : ''})`;
  document.getElementById("wb-driver-name").textContent = waybill.driverName;
  document.getElementById("wb-fuel-type").textContent = waybill.fuelType;
  document.getElementById("wb-fuel-base-rate").textContent = waybill.baseConsumption;

  // Вихідні дані
  document.getElementById("wb-start-odometer").value = waybill.startOdometer;
  document.getElementById("wb-start-fuel").value = waybill.startFuel;
  document.getElementById("wb-start-talons").value = waybill.startTalons;

  // Відображення AdBlue для дизельної техніки
  const adblueContainers = document.querySelectorAll(".container-adblue");
  if (waybill.fuelType === "Дизель") {
    adblueContainers.forEach(el => el.classList.remove("hidden"));
    document.getElementById("wb-start-adblue").value = waybill.startAdBlue !== undefined ? waybill.startAdBlue : 0.0;
    document.getElementById("wb-start-adblue-talons").value = waybill.startAdBlueTalons !== undefined ? waybill.startAdBlueTalons : 0.0;
  } else {
    adblueContainers.forEach(el => el.classList.add("hidden"));
    document.getElementById("wb-start-adblue").value = 0.0;
    document.getElementById("wb-start-adblue-talons").value = 0.0;
  }

  // Очистка та рендер заправок
  const refillContainer = document.getElementById("refill-logs-container");
  refillContainer.innerHTML = "";
  waybill.refills.forEach(refill => {
    appendRefillRowToDOM(refill);
  });

  // Очистка та рендер мастил та додаткових рідин
  const customFluidsContainer = document.getElementById("custom-fluids-container");
  customFluidsContainer.innerHTML = "";
  waybill.consumables.forEach(c => {
    appendCustomFluidRowToDOM(c);
  });

  // Очистка та рендер сегментів маршруту
  const routesContainer = document.getElementById("route-segments-container");
  routesContainer.innerHTML = "";
  waybill.routes.forEach((segment, idx) => {
    appendRouteSegmentRowToDOM(segment, idx + 1);
  });

  // Виконання живих розрахунків
  runReactiveCalculations();
  
  navigateTo("view-waybill-form");
}

// Регламентні оливи вилучено, облік ведеться через додавання рідин

// Заправки паливом під час виїзду
function addRefillRow() {
  const refill = {
    id: `REF-${Date.now()}-${Math.floor(Math.random()*100)}`,
    date: new Date().toISOString().split('T')[0],
    method: "base",
    details: "",
    talonId: "",
    source: "Налив на базі ВЧ",
    amount: 20,
    locked: false
  };
  
  state.activeWaybill.refills.push(refill);
  appendRefillRowToDOM(refill);
  runReactiveCalculations();
}

// Хелпер для санітації обсягу заправок (тільки цілі числа)
function sanitizeRefillAmount(inputEl, refill) {
  let valStr = inputEl.value.replace(/,/g, '.');
  let val = Math.round(parseFloat(valStr));
  if (isNaN(val) || val < 0) val = 0;
  refill.amount = val;
  inputEl.value = val;
  runReactiveCalculations();
}

// Хелпер для санітації обсягу рідин/мастил (максимум до тисячних)
function sanitizeFluidAmount(inputEl, fluid) {
  let valStr = inputEl.value.replace(/,/g, '.');
  let val = parseFloat(valStr);
  if (isNaN(val) || val < 0) val = 0;
  val = Math.round(val * 1000) / 1000;
  fluid.amount = val;
  inputEl.value = val;
  syncConsumablesFromDOM();
  runReactiveCalculations();
}

function appendRefillRowToDOM(refill) {
  const container = document.getElementById("refill-logs-container");
  const row = document.createElement("div");
  row.className = "log-row refill-row";
  row.dataset.refillId = refill.id;

  if (refill.locked === undefined) {
    refill.locked = false;
  }

  if (refill.date === undefined) {
    refill.date = new Date().toISOString().split('T')[0];
  }

  // Парсимо старі дані, якщо вони завантажені з сервера
  if (refill.source && refill.source.includes("Талон") && !refill.method) {
    refill.method = "talon";
    const parts = refill.source.split(" ");
    refill.talonId = parts.length > 1 ? parts[1] : "";
  } else if (!refill.method) {
    refill.method = "base";
  }

  const fuelType = state.activeWaybill.fuelType;
  // Фільтруємо талони за типом палива активної машини
  const availableTalons = state.vouchers.filter(v => v.fuelType === fuelType);

  let talonOptions = `<option value="">-- Оберіть талон --</option>`;
  availableTalons.forEach(v => {
    const isSelected = refill.talonId === v.id ? "selected" : "";
    talonOptions += `<option value="${v.id}" data-volume="${v.volume}" ${isSelected}>${v.id} (${v.volume} л)</option>`;
  });

  row.innerHTML = `
    <div class="form-group refill-date-group" style="margin: 0;">
      <input type="date" class="refill-date-input" value="${refill.date || ''}" required>
    </div>
    <div class="form-group refill-method-group" style="margin: 0;">
      <select class="refill-method-select">
        <option value="base" ${refill.method === 'base' ? 'selected' : ''}>Налив на базі ВЧ</option>
        <option value="talon" ${refill.method === 'talon' ? 'selected' : ''}>Талон з реєстру</option>
      </select>
    </div>
    <div class="form-group detail-container refill-detail-group" style="margin: 0;">
      <!-- Динамічний інпут чи селект (прихований для Налив) -->
    </div>
    <div class="refill-actions-group">
      <div class="form-group refill-amount-group" style="margin: 0;">
        <input type="number" class="refill-amount-input" value="${Math.round(refill.amount) || 0}" min="0" step="1" placeholder="Літри">
      </div>
      <button type="button" class="btn btn-outline btn-xs btn-ok-refill">ОК</button>
      <button type="button" class="btn btn-danger btn-xs btn-delete-row">
        <svg class="btn-svg-small"><use href="#icon-trash"></use></svg>
      </button>
    </div>
  `;

  const detailContainer = row.querySelector(".detail-container");
  const amountInput = row.querySelector(".refill-amount-input");
  const methodSelect = row.querySelector(".refill-method-select");
  const okBtn = row.querySelector(".btn-ok-refill");
  const dateInput = row.querySelector(".refill-date-input");

  function applyLockState() {
    const talonSelect = detailContainer.querySelector(".refill-talon-select");

    if (refill.locked) {
      amountInput.setAttribute("readonly", true);
      methodSelect.setAttribute("disabled", true);
      dateInput.setAttribute("disabled", true);
      if (talonSelect) talonSelect.setAttribute("disabled", true);
      okBtn.innerHTML = `<svg class="btn-svg-small"><use href="#icon-lock"></use></svg>`;
      okBtn.className = "btn btn-secondary btn-xs btn-ok-refill";
    } else {
      if (refill.method === "base") {
        amountInput.removeAttribute("readonly");
      } else {
        amountInput.setAttribute("readonly", true);
      }
      methodSelect.removeAttribute("disabled");
      dateInput.removeAttribute("disabled");
      if (talonSelect) talonSelect.removeAttribute("disabled");
      okBtn.textContent = "ОК";
      okBtn.className = "btn btn-outline btn-xs btn-ok-refill";
    }
  }

  function updateDetailsSection() {
    const method = methodSelect.value;
    refill.method = method;

    if (method === "base") {
      detailContainer.innerHTML = "";
      detailContainer.classList.add("hidden");
      amountInput.removeAttribute("readonly");
      refill.source = "Налив на базі ВЧ";
      refill.details = "";
    } else {
      detailContainer.innerHTML = `
        <select class="refill-talon-select">
          ${talonOptions}
        </select>
      `;
      detailContainer.classList.remove("hidden");
      amountInput.setAttribute("readonly", true);
      
      const talonSelect = detailContainer.querySelector(".refill-talon-select");
      
      // Ініціалізація джерела, якщо талон вже був обраний
      if (refill.talonId) {
        refill.source = `Талон ${refill.talonId}`;
      }

      talonSelect.addEventListener("change", (e) => {
        const selectedOption = talonSelect.options[talonSelect.selectedIndex];
        const val = e.target.value;
        refill.talonId = val;
        if (val) {
          const vol = parseFloat(selectedOption.dataset.volume) || 0;
          refill.amount = vol;
          amountInput.value = vol;
          refill.source = `Талон ${val}`;
        } else {
          refill.amount = 0;
          amountInput.value = 0;
          refill.source = "Талон (не обрано)";
        }
        runReactiveCalculations();
      });
    }
    applyLockState();
  }

  // Обробник зміни типу заправки
  methodSelect.addEventListener("change", () => {
    updateDetailsSection();
    runReactiveCalculations();
  });

  // Ініціалізуємо деталі при рендерингу
  updateDetailsSection();

  // Слухач обсягу для наливу (санітація вводу)
  amountInput.addEventListener("input", (e) => {
    if (refill.method === "base") {
      let valStr = e.target.value.replace(/,/g, '.');
      let val = Math.round(parseFloat(valStr));
      if (isNaN(val) || val < 0) val = 0;
      refill.amount = val;
      if (valStr.includes('.')) {
        e.target.value = val;
      }
      runReactiveCalculations();
    }
  });

  // Блокування введення спецсимволів та дробових розділювачів на рівні клавіатури
  amountInput.addEventListener("keydown", (e) => {
    if (["e", "E", ",", ".", "-", "+"].includes(e.key)) {
      e.preventDefault();
    }
  });

  // Санітація значення при втраті фокусу
  amountInput.addEventListener("blur", () => {
    if (refill.method === "base") {
      sanitizeRefillAmount(amountInput, refill);
    }
  });

  // Слухач дати заправки
  dateInput.addEventListener("input", (e) => {
    refill.date = e.target.value;
  });

  // Обробник блокування
  okBtn.addEventListener("click", () => {
    if (!refill.locked) {
      sanitizeRefillAmount(amountInput, refill);
    }

    refill.locked = !refill.locked;
    applyLockState();
    if (state.activeWaybill) {
      localStorage.setItem(`active_waybill_${state.activeWaybill.plate}`, JSON.stringify(state.activeWaybill));
    }
  });

  // Обробник видалення рядка
  row.querySelector(".btn-delete-row").addEventListener("click", () => {
    state.activeWaybill.refills = state.activeWaybill.refills.filter(r => r.id !== refill.id);
    row.remove();
    runReactiveCalculations();
  });

  container.appendChild(row);
}

// Довільні рідини (+ Додати custom fluid)
function addCustomFluidRow() {
  const fluid = {
    name: "",
    amount: 1
  };
  // Додамо її в загальний список
  state.activeWaybill.consumables.push(fluid);
  appendCustomFluidRowToDOM(fluid);
}

function appendCustomFluidRowToDOM(fluid) {
  const container = document.getElementById("custom-fluids-container");
  const row = document.createElement("div");
  row.className = "log-row fluid-row";

  // Використовуємо список дозволених рідин, підвантажений з сервера
  const allOptions = state.allowedFluids.length > 0 ? state.allowedFluids : (state.activeAsset ? [...state.activeAsset.allowedFluids, "Склоомивач", "Двотактне мастило"] : []);

  let selectOptions = `<option value="">-- Оберіть рідину/мастило --</option>`;
  let isCustom = fluid.name !== "" && !allOptions.includes(fluid.name);

  allOptions.forEach(opt => {
    const isSelected = fluid.name === opt ? "selected" : "";
    selectOptions += `<option value="${opt}" ${isSelected}>${opt}</option>`;
  });
  
  const isCustomSelected = isCustom ? "selected" : "";
  selectOptions += `<option value="custom" ${isCustomSelected}>Ввести вручну...</option>`;

  row.innerHTML = `
    <div class="form-group fluid-name-group" style="margin: 0; display: flex; flex-direction: column; gap: 0.5rem; width: 100%;">
      <select class="fluid-select-name">
        ${selectOptions}
      </select>
      <input type="text" class="fluid-name-input ${isCustom ? '' : 'hidden'}" value="${fluid.name}" placeholder="Назва рідини" style="min-height: 38px; padding: 0.5rem;">
    </div>
    <div class="form-group fluid-amount-group" style="margin: 0; display: flex; flex-direction: column; gap: 0.25rem;">
      <input type="number" class="fluid-amount-input" value="${fluid.amount || ''}" min="0" step="0.001" placeholder="К-сть (л/кг)">
      <span class="norm-feedback text-sm text-muted" style="font-family: var(--font-mono); display: block; white-space: nowrap; margin-top: 0.25rem;">Норма: 0.00 л</span>
    </div>
    <button type="button" class="btn btn-danger btn-xs btn-delete-row">
      <svg class="btn-svg-small"><use href="#icon-trash"></use></svg>
    </button>
  `;

  const selectEl = row.querySelector(".fluid-select-name");
  const nameInput = row.querySelector(".fluid-name-input");
  const amountInput = row.querySelector(".fluid-amount-input");

  function updateFluidName() {
    const val = selectEl.value;
    if (val === "custom") {
      nameInput.classList.remove("hidden");
      fluid.name = nameInput.value.trim();
    } else {
      nameInput.classList.add("hidden");
      fluid.name = val;
    }
    syncConsumablesFromDOM();
    runReactiveCalculations();
  }

  selectEl.addEventListener("change", () => {
    if (selectEl.value === "custom") {
      nameInput.value = "";
    }
    updateFluidName();
  });

  nameInput.addEventListener("input", () => {
    updateFluidName();
  });

  amountInput.addEventListener("input", (e) => {
    let cleanVal = e.target.value.replace(/,/g, '.');
    let val = parseFloat(cleanVal);
    if (isNaN(val) || val < 0) val = 0;
    // Запобігаємо більше ніж 3 знакам після коми
    const parts = cleanVal.split('.');
    if (parts.length > 1 && parts[1].length > 3) {
      val = Math.round(val * 1000) / 1000;
      e.target.value = val;
    }
    fluid.amount = val;
    syncConsumablesFromDOM();
  });

  amountInput.addEventListener("blur", () => {
    sanitizeFluidAmount(amountInput, fluid);
  });

  row.querySelector(".btn-delete-row").addEventListener("click", () => {
    state.activeWaybill.consumables = state.activeWaybill.consumables.filter(c => c !== fluid);
    row.remove();
    runReactiveCalculations();
  });

  container.appendChild(row);
}

function syncConsumablesFromDOM() {
  const list = [];
  document.querySelectorAll("#custom-fluids-container .log-row").forEach(row => {
    const selectVal = row.querySelector(".fluid-select-name").value;
    let name = "";
    if (selectVal === "custom") {
      name = row.querySelector(".fluid-name-input").value.trim();
    } else {
      name = selectVal;
    }
    const rawVal = row.querySelector(".fluid-amount-input").value.replace(/,/g, '.');
    let amount = parseFloat(rawVal);
    if (!isNaN(amount)) {
      amount = Math.round(amount * 1000) / 1000;
    }
    
    if (name && !isNaN(amount) && amount > 0) {
      list.push({ name, amount });
    }
  });

  state.activeWaybill.consumables = list;
}

// Додавання сегменту маршруту
function addRouteSegmentRow() {
  const segment = createEmptyRouteSegment();
  state.activeWaybill.routes.push(segment);
  appendRouteSegmentRowToDOM(segment, state.activeWaybill.routes.length);
  runReactiveCalculations();
}

function appendRouteSegmentRowToDOM(segment, index) {
  const container = document.getElementById("route-segments-container");
  const card = document.createElement("div");
  card.className = "route-card";
  card.dataset.segmentId = segment.id;

  const isGen = state.activeAsset && state.activeAsset.type === "generator";
  
  // Адаптуємо назви для генераторів
  const labelFrom = isGen ? "Місце розгортання" : "Звідки (Пункт А)";
  const labelTo = isGen ? "Ціль/Завдання" : "Куди (Пункт Б)";
  const labelDeptTime = isGen ? "Початок роботи (Дата/Час)" : "Виїзд (Дата/Час)";
  const labelArrTime = isGen ? "Кінець роботи (Дата/Час)" : "Приїзд (Дата/Час)";

  const labelDist1 = isGen ? "Хол. хід (год)" : "Мале місто (км)";
  const labelDist2 = isGen ? "Низьке нав. (год)" : "Сер. місто (км)";
  const labelDist3 = isGen ? "Середнє нав. (год)" : "Вел. місто (км)";
  const labelDist4 = isGen ? "Номінальне (год)" : "Траса (км)";
  const labelDist5 = isGen ? "Максимальне (год)" : "Грунт (км)";

  card.innerHTML = `
    <div class="route-card-header">
      <span class="segment-num">СЕГМЕНТ №${index}</span>
      <button type="button" class="btn btn-danger btn-xs btn-delete-segment" title="Видалити сегмент">
        Видалити
      </button>
    </div>
    
    <div class="route-destinations">
      <div class="form-group" style="margin: 0;">
        <label>${labelFrom}</label>
        <input type="text" class="route-from-input" value="${segment.from}" required>
      </div>
      <div class="form-group" style="margin: 0;">
        <label>${labelTo}</label>
        <input type="text" class="route-to-input" value="${segment.to}" required>
      </div>
    </div>

    <div class="route-times">
      <div class="form-group" style="margin: 0;">
        <label>${labelDeptTime}</label>
        <div class="datetime-wrapper">
          <input type="datetime-local" class="route-depart-input" value="${segment.departTime}" required>
          <button type="button" class="btn btn-outline btn-xs btn-ok-time">ОК</button>
        </div>
      </div>
      <div class="form-group" style="margin: 0;">
        <label>${labelArrTime}</label>
        <div class="datetime-wrapper">
          <input type="datetime-local" class="route-arrive-input" value="${segment.arriveTime}" required>
          <button type="button" class="btn btn-outline btn-xs btn-ok-time">ОК</button>
        </div>
      </div>
    </div>

    <label style="margin-top: 0.5rem; text-align: center; display: block; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 0.5rem;">
      Розподіл навантаження та відстаней
    </label>

    <div class="route-distances-grid">
      <div class="dist-input-group">
        <label>${labelDist1}</label>
        <input type="number" class="dist-small-input" value="${segment.distSmallCity}" min="0" step="1">
      </div>
      <div class="dist-input-group">
        <label>${labelDist2}</label>
        <input type="number" class="dist-medium-input" value="${segment.distMediumCity}" min="0" step="1">
      </div>
      <div class="dist-input-group">
        <label>${labelDist3}</label>
        <input type="number" class="dist-big-input" value="${segment.distBigCity}" min="0" step="1">
      </div>
      <div class="dist-input-group">
        <label>${labelDist4}</label>
        <input type="number" class="dist-highway-input" value="${segment.distHighway}" min="0" step="1">
      </div>
      <div class="dist-input-group">
        <label>${labelDist5}</label>
        <input type="number" class="dist-dirt-input" value="${segment.distDirt}" min="0" step="1">
      </div>
    </div>
  `;

  // Зв'язування даних
  card.querySelector(".route-from-input").addEventListener("input", (e) => {
    segment.from = e.target.value;
  });
  
  card.querySelector(".route-to-input").addEventListener("input", (e) => {
    segment.to = e.target.value;
  });
  
  card.querySelector(".route-depart-input").addEventListener("input", (e) => {
    segment.departTime = e.target.value;
  });
  
  card.querySelector(".route-arrive-input").addEventListener("input", (e) => {
    segment.arriveTime = e.target.value;
  });

  // Кнопка ОК для фіксації часу (ховає календар шляхом blur)
  card.querySelectorAll(".btn-ok-time").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const input = btn.previousElementSibling;
      if (input) {
        input.blur();
        showToast("Час зафіксовано", "Обраний час успішно збережено в дорожній лист.", "success");
      }
    });
  });

  // Реактивні події на відстанях
  const distInputs = [
    { class: ".dist-small-input", key: "distSmallCity" },
    { class: ".dist-medium-input", key: "distMediumCity" },
    { class: ".dist-big-input", key: "distBigCity" },
    { class: ".dist-highway-input", key: "distHighway" },
    { class: ".dist-dirt-input", key: "distDirt" }
  ];

  distInputs.forEach(di => {
    const inputEl = card.querySelector(di.class);

    // Очищуємо 0 при фокусі
    inputEl.addEventListener("focus", (e) => {
      if (e.target.value === "0") {
        e.target.value = "";
      }
    });

    // Запобігаємо введенню спецсимволів та дробових розділювачів на рівні клавіатури
    inputEl.addEventListener("keydown", (e) => {
      if (["e", "E", ",", ".", "-", "+"].includes(e.key)) {
        e.preventDefault();
      }
    });

    // Санітація значення при втраті фокусу
    inputEl.addEventListener("blur", (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 0) {
        val = 0;
      }
      e.target.value = val.toString();
      segment[di.key] = val;
      runReactiveCalculations();
    });

    inputEl.addEventListener("input", (e) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val) || val < 0) {
        val = 0;
      }
      if (e.target.value !== "" && e.target.value !== val.toString()) {
        e.target.value = val;
      }
      segment[di.key] = val;
      runReactiveCalculations();
    });
  });

  // Кнопка видалення сегменту
  card.querySelector(".btn-delete-segment").addEventListener("click", () => {
    // Повинен бути хоча б один сегмент
    if (state.activeWaybill.routes.length <= 1) {
      showToast("Помилка", "Дорожній лист повинен містити хоча б один сегмент маршруту.", "error");
      return;
    }

    state.activeWaybill.routes = state.activeWaybill.routes.filter(r => r.id !== segment.id);
    card.remove();
    // Оновлюємо нумерацію картки у DOM
    reindexRouteSegments();
    runReactiveCalculations();
  });

  container.appendChild(card);
}

function reindexRouteSegments() {
  const cards = document.querySelectorAll("#route-segments-container .route-card");
  cards.forEach((card, idx) => {
    card.querySelector(".segment-num").textContent = `СЕГМЕНТ №${idx + 1}`;
  });
}

// Реактивний калькулятор палива (ЖИВИЙ РЕЖИМ)
function runReactiveCalculations() {
  if (!state.activeWaybill) return;

  const wb = state.activeWaybill;
  const baseRate = wb.baseConsumption;
  const coef = AppState.getCoefficients();

  let totalDistance = 0;
  let totalConsumption = 0;

  let distSmall = 0, distMedium = 0, distBig = 0, distHighway = 0, distDirt = 0;
  let consSmall = 0, consMedium = 0, consBig = 0, consHighway = 0, consDirt = 0;

  const isGen = state.activeAsset && state.activeAsset.type === "generator";
  const divisor = isGen ? 1 : 100;

  wb.routes.forEach(route => {
    const s = route.distSmallCity || 0;
    const m = route.distMediumCity || 0;
    const b = route.distBigCity || 0;
    const h = route.distHighway || 0;
    const d = route.distDirt || 0;

    distSmall += s;
    distMedium += m;
    distBig += b;
    distHighway += h;
    distDirt += d;

    const segmentDist = s + m + b + h + d;
    totalDistance += segmentDist;

    // Розрахунок витрати на сегмент:
    // Витрата = (Відстань * Розхід * Коефіцієнт) / divisor
    const cs = s * (baseRate * coef.smallCity) / divisor;
    const cm = m * (baseRate * coef.mediumCity) / divisor;
    const cb = b * (baseRate * coef.bigCity) / divisor;
    const ch = h * (baseRate * coef.highway) / divisor;
    const cd = d * (baseRate * coef.dirt) / divisor;

    consSmall += cs;
    consMedium += cm;
    consBig += cb;
    consHighway += ch;
    consDirt += cd;

    totalConsumption += (cs + cm + cb + ch + cd);
  });

  // Загальна кількість заправок
  let totalRefills = 0;
  wb.refills.forEach(r => {
    totalRefills += (r.amount || 0);
  });

  // Залишок у баку = Початковий об'єм + Заправлено - Витрачено
  const remainingFuel = wb.startFuel + totalRefills - totalConsumption;

  // Оновлюємо DOM результати
  const unit = isGen ? " год" : " км";
  document.getElementById("calc-total-distance").textContent = `${totalDistance.toFixed(1)}${unit}`;
  document.getElementById("calc-total-refills").textContent = `${Math.round(totalRefills)} л`;
  document.getElementById("calc-total-consumption").textContent = `${totalConsumption.toFixed(2)} л`;
  
  const remainingEl = document.getElementById("calc-remaining-fuel");
  remainingEl.textContent = `${remainingFuel.toFixed(2)} л`;

  // Попередження при розбіжності
  const alertEl = document.getElementById("calc-discrepancy-alert");
  if (remainingFuel < 0) {
    remainingEl.className = "calc-value text-red";
    alertEl.classList.remove("hidden");
  } else {
    remainingEl.className = "calc-value text-green";
    alertEl.classList.add("hidden");
  }

  // Розрахунок відсотка використання палива для тактичного лінійного прогрес-бару
  const availableFuel = wb.startFuel + totalRefills;
  let spentPercentage = 0;
  if (availableFuel > 0) {
    spentPercentage = (totalConsumption / availableFuel) * 100;
  }
  spentPercentage = Math.min(Math.max(spentPercentage, 0), 100);

  const percentLabel = document.getElementById("calc-utilization-percentage");
  const fillBar = document.getElementById("calc-utilization-bar");
  if (percentLabel && fillBar) {
    percentLabel.textContent = `${spentPercentage.toFixed(0)}%`;
    fillBar.style.width = `${spentPercentage}%`;
    if (remainingFuel < 0) {
      fillBar.className = "tactical-progress-bar-fill warning-fill";
      percentLabel.className = "text-red";
    } else {
      fillBar.className = "tactical-progress-bar-fill";
      percentLabel.className = "text-green";
    }
  }

  // Розрахунок AdBlue для дизельної техніки
  if (wb.fuelType === "Дизель") {
    const adblueRate = FLUID_CONSUMPTION_NORMS["AdBlue"] || 0.05;
    const adblueConsumption = totalConsumption * adblueRate;
    const adblueRemaining = (wb.startAdBlue || 0) - adblueConsumption;

    document.getElementById("calc-adblue-consumption").textContent = `${adblueConsumption.toFixed(2)} л`;
    const remainingAdblueEl = document.getElementById("calc-adblue-remaining");
    remainingAdblueEl.textContent = `${adblueRemaining.toFixed(2)} л`;

    if (adblueRemaining < 0) {
      remainingAdblueEl.className = "calc-value text-red";
    } else {
      remainingAdblueEl.className = "calc-value text-green";
    }
  }

  // Оновлюємо відображення детальної розбивки витрат палива
  const label1 = isGen ? "Холостий хід" : "Мале місто";
  const label2 = isGen ? "Низьке навантаження" : "Середнє місто";
  const label3 = isGen ? "Середнє навантаження" : "Велике місто";
  const label4 = isGen ? "Номінальне навантаження" : "Траса";
  const label5 = isGen ? "Максимальне навантаження" : "Грунт";

  const breakdownContainer = document.getElementById("calc-detailed-breakdown");
  const items = [
    { label: label1, dist: distSmall, cons: consSmall, u: isGen ? "год" : "км" },
    { label: label2, dist: distMedium, cons: consMedium, u: isGen ? "год" : "км" },
    { label: label3, dist: distBig, cons: consBig, u: isGen ? "год" : "км" },
    { label: label4, dist: distHighway, cons: consHighway, u: isGen ? "год" : "км" },
    { label: label5, dist: distDirt, cons: consDirt, u: isGen ? "год" : "км" }
  ];

  let hasItems = false;
  let breakdownHtml = `
    <h5 class="detailed-breakdown-title">
      Детальна витрата за покриттями/навантаженням:
    </h5>
    <ul class="detailed-breakdown-list">
  `;

  items.forEach(item => {
    if (item.dist > 0) {
      hasItems = true;
      breakdownHtml += `
        <li class="detailed-breakdown-item">
          <span>${item.label} (${item.dist.toFixed(1)} ${item.u}):</span>
          <span class="breakdown-val">${item.cons.toFixed(2)} л</span>
        </li>
      `;
    }
  });
  breakdownHtml += `</ul>`;

  if (hasItems) {
    breakdownContainer.innerHTML = breakdownHtml;
  } else {
    breakdownContainer.innerHTML = "";
  }

  // Оновлюємо норми витрат мастил для кожного доданого рядка в DOM
  document.querySelectorAll("#custom-fluids-container .log-row").forEach(row => {
    const selectVal = row.querySelector(".fluid-select-name").value;
    let name = "";
    if (selectVal === "custom") {
      name = row.querySelector(".fluid-name-input").value.trim();
    } else {
      name = selectVal;
    }

    const normRate = (state.fluidNorms && state.fluidNorms[name] !== undefined) ? state.fluidNorms[name] : (FLUID_CONSUMPTION_NORMS[name] || 0);
    const feedbackEl = row.querySelector(".norm-feedback");
    
    if (normRate > 0) {
      const calculatedNorm = totalConsumption * normRate;
      feedbackEl.textContent = `Норма витрати: ${calculatedNorm.toFixed(3)} л`;
    } else {
      feedbackEl.textContent = "Норма: відсутня";
    }
  });
}

// Збереження Дорожнього Листа (Save to Continue)
function handleSaveWaybill() {
  if (!state.activeWaybill) return;

  // Синхронізуємо мастила перед збереженням
  syncConsumablesFromDOM();

  // Оновлюємо LocalStorage
  const plate = state.activeWaybill.plate;
  localStorage.setItem(`active_waybill_${plate}`, JSON.stringify(state.activeWaybill));

  // Симулюємо відправку на сервер
  showToast("Збереження", "Передача актуального стану на сервер...", "info");
  
  setTimeout(() => {
    showToast("Збережено", `Поточний стан дорожнього листа № ${state.activeWaybill.serialNumber} записано в базу.`, "success");
    renderDashboard();
    navigateTo("view-dashboard");
  }, 800);
}

// Тригер закриття Дорожнього Листа (Відкриває модальне вікно)
function handleCloseWaybillTrigger() {
  if (!state.activeWaybill) return;
  
  // Валідація заповненості полів маршруту
  let invalid = false;
  state.activeWaybill.routes.forEach(r => {
    if (!r.from || !r.to || !r.departTime || !r.arriveTime) {
      invalid = true;
    }
  });

  if (invalid) {
    showToast("Неможливо закрити", "Будь ласка, заповніть усі пункти та час виїзду/приїзду в сегментах маршруту перед закриттям.", "error");
    return;
  }

  // Обчислюємо кінцеві показники для звіту в попапі
  const wb = state.activeWaybill;
  const baseRate = wb.baseConsumption;
  const coef = AppState.getCoefficients();

  let totalDistance = 0;
  let totalConsumption = 0;

  const isGen = state.activeAsset && state.activeAsset.type === "generator";
  const divisor = isGen ? 1 : 100;

  wb.routes.forEach(route => {
    const s = route.distSmallCity || 0;
    const m = route.distMediumCity || 0;
    const b = route.distBigCity || 0;
    const h = route.distHighway || 0;
    const d = route.distDirt || 0;

    totalDistance += (s + m + b + h + d);
    totalConsumption += (
      (s * (baseRate * coef.smallCity) / divisor) +
      (m * (baseRate * coef.mediumCity) / divisor) +
      (b * (baseRate * coef.bigCity) / divisor) +
      (h * (baseRate * coef.highway) / divisor) +
      (d * (baseRate * coef.dirt) / divisor)
    );
  });

  let totalRefills = 0;
  wb.refills.forEach(r => {
    totalRefills += (r.amount || 0);
  });

  const finalFuel = wb.startFuel + totalRefills - totalConsumption;
  const unit = isGen ? " мотогодин" : " км";

  // Рендеримо інформацію в модальному вікні
  const summaryBox = document.getElementById("modal-summary-box");
  let summaryHtml = `
    <div class="summary-item"><span>Номер листа:</span><span>${wb.serialNumber}</span></div>
    <div class="summary-item"><span>Машина/Номер:</span><span>${wb.plate}</span></div>
    <div class="summary-item"><span>Водій:</span><span>${wb.driverName}</span></div>
    <div class="summary-item"><span>Пройдено всього:</span><span>${totalDistance.toFixed(1)}${unit}</span></div>
    <div class="summary-item"><span>Заправлено палива:</span><span>${Math.round(totalRefills)} л</span></div>
    <div class="summary-item"><span>Розрахована витрата:</span><span>${totalConsumption.toFixed(2)} л</span></div>
  `;

  if (wb.fuelType === "Дизель") {
    summaryHtml += `
      <div class="summary-item"><span>Початковий AdBlue:</span><span>${(wb.startAdBlue || 0).toFixed(1)} л</span></div>
      <div class="summary-item"><span>AdBlue у талонах:</span><span>${(wb.startAdBlueTalons || 0).toFixed(1)} л</span></div>
    `;
  }

  summaryHtml += `
    <div class="summary-total"><span>Кінцевий залишок:</span><span>${finalFuel.toFixed(2)} л</span></div>
  `;
  summaryBox.innerHTML = summaryHtml;

  document.getElementById("modal-confirm-close").classList.remove("hidden");
  document.body.classList.add("modal-open");
}

// Остаточне підтвердження закриття листа
function handleConfirmCloseWaybill() {
  const wb = state.activeWaybill;
  const plate = wb.plate;

  wb.status = "closed";
  wb.dateClosed = new Date().toISOString();

  // Оновлюємо стан у локальному сховищі
  localStorage.setItem(`active_waybill_${plate}`, JSON.stringify(wb));

  // Симулюємо відправку на сервер та закриття документа
  showToast("Надсилання", "Відправка фінального реєстру дорожнього листа...", "info");

  setTimeout(() => {
    // Очищуємо активний лист з LocalStorage (оскільки він завершений, на дашборді кнопка Створити буде активна)
    localStorage.removeItem(`active_waybill_${plate}`);
    
    // Зберігаємо закритий лист в архіві
    const archive = JSON.parse(localStorage.getItem("waybill_archive")) || [];
    archive.push(wb);
    localStorage.setItem("waybill_archive", JSON.stringify(archive));

    document.getElementById("modal-confirm-close").classList.add("hidden");
    document.body.classList.remove("modal-open");
    showToast("Успішно", `Дорожній лист № ${wb.serialNumber} закрито та архівовано на сервері.`, "success");
    
    renderDashboard();
    navigateTo("view-dashboard");
  }, 1200);
}

// Функція скачування текстового звіту дорожнього листа (.txt)
function downloadWaybillTxt() {
  const wb = state.activeWaybill;
  if (!wb) return;

  const isGen = state.activeAsset && state.activeAsset.type === "generator";
  const unit = isGen ? "год" : "км";
  const labelDist = isGen ? "Мотогодини" : "Маршрутний кілометраж";

  let txtContent = `==================================================
ЗВІТ ДОРОЖНЬОГО ЛИСТА (ОФІЦІЙНИЙ ДОКУМЕНТ)
==================================================
Документ номер: № ${wb.serialNumber}
Статус: ЗАКРИТИЙ
Дата створення: ${new Date(wb.dateCreated).toLocaleString("uk-UA")}
Дата закриття: ${new Date().toLocaleString("uk-UA")}

АКТИВ ТА ЕКІПАЖ:
--------------------------------------------------
Військова техніка: ${wb.plate} (${state.activeAsset ? state.activeAsset.name : 'Транспорт'})
Тип палива: ${wb.fuelType}
Водій: ${wb.driverName}

ПОЧАТКОВИЙ СТАН:
--------------------------------------------------
Початковий одометр: ${wb.startOdometer} ${unit}
Початковий залишок у баку: ${wb.startFuel} л
Початковий залишок у талонах: ${wb.startTalons} л
${wb.fuelType === "Дизель" ? `Початковий залишок AdBlue: ${wb.startAdBlue || 0} л\nПочатковий AdBlue у талонах: ${wb.startAdBlueTalons || 0} л\n` : ""}
ЗАПРАВКИ ПІД ЧАС ВИЇЗДУ:
--------------------------------------------------\n`;

  if (wb.refills.length === 0) {
    txtContent += "Не зафіксовано заправок.\n";
  } else {
    wb.refills.forEach((r, idx) => {
      txtContent += `${idx + 1}. Дата: ${r.date || "-"} | Джерело: ${r.source} | Об'єм: ${r.amount} л\n`;
    });
  }

  txtContent += `\nВИТРАТИ МАСТИЛ ТА РІДИН:
--------------------------------------------------\n`;
  
  if (wb.consumables.length === 0) {
    txtContent += "Витрати мастил не зафіксовано.\n";
  } else {
    wb.consumables.forEach((c, idx) => {
      txtContent += `${idx + 1}. Мастило: ${c.name} | Об'єм: ${c.amount} л\n`;
    });
  }

  txtContent += `\nСЕГМЕНТИ МАРШРУТУ ТА ${labelDist.toUpperCase()}:
--------------------------------------------------\n`;

  let totalDistance = 0;
  const coef = AppState.getCoefficients();
  let totalConsumption = 0;

  const divisor = isGen ? 1 : 100;

  wb.routes.forEach((route, idx) => {
    const s = route.distSmallCity || 0;
    const m = route.distMediumCity || 0;
    const b = route.distBigCity || 0;
    const h = route.distHighway || 0;
    const d = route.distDirt || 0;
    const segDist = s + m + b + h + d;
    totalDistance += segDist;

    const segCons = (
      (s * (wb.baseConsumption * coef.smallCity) / divisor) +
      (m * (wb.baseConsumption * coef.mediumCity) / divisor) +
      (b * (wb.baseConsumption * coef.bigCity) / divisor) +
      (h * (wb.baseConsumption * coef.highway) / divisor) +
      (d * (wb.baseConsumption * coef.dirt) / divisor)
    );
    totalConsumption += segCons;

    txtContent += `Сегмент ${idx + 1}: ${route.from} -> ${route.to}
  Час виїзду: ${route.departTime ? new Date(route.departTime).toLocaleString("uk-UA") : "-"}
  Час приїзду: ${route.arriveTime ? new Date(route.arriveTime).toLocaleString("uk-UA") : "-"}
  Відстань сегменту: ${segDist.toFixed(1)} ${unit} (М.Місто: ${s}${unit}, С.Місто: ${m}${unit}, В.Місто: ${b}${unit}, Траса: ${h}${unit}, Грунт: ${d}${unit})
  Витрачено палива на сегменті: ${segCons.toFixed(2)} л\n\n`;
  });

  let totalRefills = 0;
  wb.refills.forEach(r => totalRefills += r.amount);
  const finalFuel = wb.startFuel + totalRefills - totalConsumption;

  txtContent += `==================================================
ПІДСУМКОВІ ПОКАЗНИКИ:
--------------------------------------------------
Загальна пройдена відстань: ${totalDistance.toFixed(1)} ${unit}
Загальний об'єм заправок: ${totalRefills} л
Загальна розрахована витрата: ${totalConsumption.toFixed(2)} л
Кінцевий залишок палива в баку: ${finalFuel.toFixed(2)} л
Кінцевий одометр (розрахунковий): ${(wb.startOdometer + totalDistance).toFixed(1)} ${unit}
==================================================`;

  const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Waybill_Summary_${wb.plate}_${wb.serialNumber.replace(/\//g, '_')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast("Скачування", "Звіт дорожнього листа збережено в завантаження.", "success");
}

// 4. ЕКРАН ВЕРИФІКАЦІЇ ТАЛОНІВ (VOUCHERS)
function renderVouchersList() {
  const container = document.getElementById("vouchers-list-container");
  container.innerHTML = "";

  state.vouchers.forEach(v => {
    const card = document.createElement("div");
    card.className = `voucher-card ${v.status === 'confirmed' ? 'confirmed' : v.status === 'missing' ? 'discrepancy' : ''}`;
    card.dataset.voucherId = v.id;

    let statusText = "Очікує верифікації";
    let statusClass = "status-pending";

    if (v.status === "confirmed") {
      statusText = "Підтверджено в наявності";
      statusClass = "status-confirmed";
    } else if (v.status === "missing") {
      statusText = "Звіт про відсутність";
      statusClass = "status-missing";
    }

    card.innerHTML = `
      <div class="voucher-head">
        <span class="voucher-number">${v.id}</span>
        <span class="voucher-status-text ${statusClass}">${statusText}</span>
      </div>
      <div class="voucher-info-row">
        <span>Об'єм: <strong>${v.volume} л</strong></span>
        <span>Тип палива: <strong>${v.fuelType}</strong></span>
      </div>
      <div class="row-grid action-buttons-vouchers">
        <button class="btn btn-outline btn-confirm-possession btn-xs" ${v.status !== 'pending' ? 'disabled' : ''}>
          Підтвердити наявність
        </button>
        <button class="btn btn-danger btn-report-missing btn-xs" ${v.status !== 'pending' ? 'disabled' : ''}>
          Повідомити про відсутність
        </button>
      </div>
    `;

    // Обробники
    card.querySelector(".btn-confirm-possession").addEventListener("click", () => {
      v.status = "confirmed";
      state.saveVouchers();
      renderVouchersList();
      showToast("Підтверджено", `Талон ${v.id} підтверджено у фізичному володінні водія.`, "success");
    });

    card.querySelector(".btn-report-missing").addEventListener("click", () => {
      state.currentMissingVoucher = v;
      document.getElementById("modal-missing-voucher-id").textContent = v.id;
      document.getElementById("input-missing-reason").value = "";
      document.getElementById("modal-report-missing").classList.remove("hidden");
      document.body.classList.add("modal-open");
    });

    container.appendChild(card);
  });
}

// Обробник підтвердження відсутності талона в модальному вікні
function handleConfirmMissingVoucher() {
  const v = state.currentMissingVoucher;
  if (!v) return;

  const reason = document.getElementById("input-missing-reason").value.trim();
  v.status = "missing";
  state.saveVouchers();
  renderVouchersList();
  triggerMissingTalonAlert(v, reason);

  document.getElementById("modal-report-missing").classList.add("hidden");
  state.currentMissingVoucher = null;
  document.body.classList.remove("modal-open");
}

// Подвійне сповіщення про розбіжність
function triggerMissingTalonAlert(voucher, reason = "") {
  const reasonText = reason ? ` (причина: ${reason})` : "";
  
  // 1. Екранне попередження (Toast + In-App Push Popup)
  showToast(
    "КРИТИЧНА ПОМИЛКА",
    `Зафіксовано відсутність талона №${voucher.id}!${reasonText} Інформацію надіслано техніку підрозділу.`,
    "error"
  );

  // 2. Симуляція відправки на два канали (In-App API Push + Email Dispatch)
  console.warn("=== КРИТИЧНЕ ОПОВІЩЕННЯ ПРО РОЗБІЖНІСТЬ ===");
  console.log(`КАНАЛ 1 (PUSH): Надіслано повідомлення на термінал Unit Technician (Технік частини).`);
  console.log(`КАНАЛ 2 (EMAIL): Надіслано офіційні листи на адреси:
    - Водій: ${state.currentUser.email}
    - Технік частини: tech.support@military.gov.ua
    Вміст: Повідомляємо про невідповідність/втрату талона № ${voucher.id} (${voucher.volume} л, ${voucher.fuelType}) водієм ${state.currentUser.fullName}.${reason ? ` Вказана причина: ${reason}.` : ""}`);
}
