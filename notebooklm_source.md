# Consolidated Project: Military Driver Waybill PWA
This file contains the complete source code, configuration, and documentation of the Military Driver Waybill PWA project. It is structured for ingestion into NotebookLM.

## File: index.html
Path: `index.html`

```html
<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Військовий Облік: Дорожні Листи & Паливо</title>
  
  <!-- PWA Meta Tags -->
  <meta name="theme-color" content="#1e1e24">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="manifest.json">
  
  <link rel="stylesheet" href="style.css">
  
  <!-- Google Fonts for Tactical Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
</head>
<body>

  <!-- SVG Sprite definitions for reliable offline iconography -->
  <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
    <!-- Log Out Icon -->
    <symbol id="icon-logout" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </symbol>
    <!-- Plus Icon -->
    <symbol id="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </symbol>
    <!-- Trash Icon -->
    <symbol id="icon-trash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </symbol>
    <!-- Save Icon -->
    <symbol id="icon-save" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </symbol>
    <!-- Lock Icon -->
    <symbol id="icon-lock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </symbol>
    <!-- Shield Alert Icon -->
    <symbol id="icon-shield-alert" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </symbol>
    <!-- Vehicle Icon -->
    <symbol id="icon-truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </symbol>
    <!-- Generator Icon -->
    <symbol id="icon-zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </symbol>
    <!-- Fuel/Droplet Icon -->
    <symbol id="icon-droplet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </symbol>
    <!-- Speed/Gauge Icon -->
    <symbol id="icon-gauge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </symbol>
    <!-- User Icon -->
    <symbol id="icon-user" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </symbol>
    <!-- Document Icon -->
    <symbol id="icon-file-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </symbol>
    <!-- Ticket / Coupon Icon -->
    <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </symbol>
    <!-- Home / Dashboard Icon -->
    <symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </symbol>
    <!-- Refresh Icon -->
    <symbol id="icon-refresh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </symbol>
  </svg>

  <!-- Notification Container (Toast System) -->
  <div id="toast-container" class="toast-container"></div>

  <!-- Header Bar -->
  <header class="app-header">
    <div class="header-logo">
      <svg class="header-svg"><use href="#icon-shield-alert"></use></svg>
      <span>Облік Палива</span>
    </div>
    <div id="user-badge" class="user-badge hidden">
      <svg class="badge-user-icon"><use href="#icon-user"></use></svg>
      <span id="user-name-display" class="user-name">ст. серж. Петренко І.</span>
      <button id="btn-logout" class="btn-icon-only" title="Вийти">
        <svg><use href="#icon-logout"></use></svg>
      </button>
    </div>
  </header>

  <!-- Main Container -->
  <main class="app-viewport">

    <!-- VIEW 1: LOGIN & REGISTRATION REQUEST -->
    <section id="view-login" class="app-screen active">
      <div class="card tactical-card auth-card">
        <div class="card-header text-center">
          <h2>Вхід до системи</h2>
          <p class="subtitle text-amber">Доступ лише для уповноважених військовослужбовців</p>
        </div>
        
        <div class="card-body">
          <button id="btn-google-oauth" class="btn btn-primary btn-block btn-oauth">
            <svg class="google-logo" viewBox="0 0 24 24" width="24" height="24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.9h6.69c-.29 1.5-.14 2.8-.97 3.76v3.13h1.56c.92-.85 1.56-2.1 1.56-3.62z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.13-2.42c-.87.59-1.98.94-3.23.94-2.48 0-4.58-1.68-5.33-3.94H1.61v2.5A11.99 11.99 0 0 0 12 24z"/>
              <path fill="#FBBC05" d="M6.67 15.67A7.15 7.15 0 0 1 6.25 12c0-1.29.22-2.54.62-3.71V5.79H1.61A11.99 11.99 0 0 0 0 12c0 2.34.67 4.5 1.83 6.33l4.84-2.66z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.61 5.79l5.06 3.92c.75-2.26 2.85-3.96 5.33-3.96z"/>
            </svg>
            Увійти через Google (OAuth 2.0)
          </button>
          
          <div class="divider">або</div>
          
          <div class="text-center">
            <button id="trigger-register-form" class="btn btn-outline btn-block">
              Не зареєстровані в системі?
            </button>
          </div>
        </div>
      </div>

      <!-- Registration Request Sub-View (Modal/Collapsible Card) -->
      <div id="card-register-request" class="card tactical-card register-card hidden">
        <div class="card-header">
          <h3>Форма запиту на реєстрацію</h3>
          <p class="subtitle">Вкажіть офіційні дані підрозділу</p>
        </div>
        <form id="form-register-request" class="card-body">
          <div class="form-group">
            <label for="reg-fullname">ПІБ військовослужбовця</label>
            <input type="text" id="reg-fullname" placeholder="напр., ст. серж. Петренко Іван Васильович" required minlength="5">
          </div>
          
          <div class="form-group">
            <label for="reg-subunit">Підрозділ / Рота / Батальйон</label>
            <input type="text" id="reg-subunit" placeholder="напр., 2 механізована рота" required>
          </div>
          
          <div class="form-group">
            <label for="reg-plates">Запитувані військові номери техніки / генераторів</label>
            <input type="text" id="reg-plates" placeholder="напр., БТ-1234, Gen-45, ЗСУ 9081" required>
            <small class="form-help">Можна вказати кілька одиниць через кому</small>
          </div>

          <div class="form-actions row-grid">
            <button type="button" id="btn-cancel-register" class="btn btn-outline">Скасувати</button>
            <button type="submit" class="btn btn-accent">Надіслати запит</button>
          </div>
        </form>
      </div>
    </section>


    <!-- VIEW 2: DASHBOARD / VEHICLE MANAGEMENT -->
    <section id="view-dashboard" class="app-screen">
      <div class="dashboard-header">
        <div class="dashboard-title">
          <h2>Управління закріпленими активами</h2>
        </div>
      </div>

      <!-- Bento Grid Statistics Section -->
      <div class="bento-grid">
        <!-- Vouchers Bento Block -->
        <div class="bento-card bento-hero">
          <div class="bento-card-title">
            <svg><use href="#icon-tag"></use></svg>
            <span>Верифікація талонів</span>
          </div>
          <div class="bento-card-body">
            <p>У реєстрі талонів: <strong class="text-white" id="bento-vouchers-total">0</strong> шт. | Не підтверджено: <strong class="text-amber" id="bento-vouchers-pending">0</strong> шт.</p>
          </div>
          <div class="bento-card-actions" style="margin-top: 0.75rem; max-width: 240px;">
            <button id="btn-go-vouchers" class="btn btn-outline btn-xs btn-block">
              Відкрити реєстр
            </button>
          </div>
        </div>
      </div>

      <h3 class="section-title" style="margin-top: 1.5rem; margin-bottom: 0.75rem;">
        <svg class="sec-icon"><use href="#icon-truck"></use></svg>
        Закріплені активи техніки
      </h3>

      <div class="assets-grid" id="assets-list-container">
        <!-- Dynamically populated from javascript state -->
        <div class="card tactical-card asset-skeleton">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
        </div>
      </div>
    </section>


    <!-- VIEW 3: OFFICIAL WAYBILL FORM (DYNAMIC & REACTIVE) -->
    <section id="view-waybill-form" class="app-screen">
      <div class="form-navigation">
        <button id="btn-back-dashboard" class="btn btn-outline btn-back">
          ← До панелі активів
        </button>
        <span id="waybill-status-badge" class="badge badge-active">АКТИВНИЙ ДОРОЖНІЙ ЛИСТ</span>
      </div>

      <div class="card tactical-card waybill-container">
        <!-- WAYBILL HEADER -->
        <div class="waybill-header-section">
          <div class="waybill-title-container">
            <h1 class="waybill-main-title">ДОРОЖНІЙ ЛИСТ</h1>
            <span id="waybill-serial-number" class="serial-number">№ DL-2026-06/001</span>
          </div>

          <div class="waybill-meta-grid">
            <div class="meta-item">
              <span class="meta-label">Транспортний засіб / Машина:</span>
              <span id="wb-vehicle-plate" class="meta-value text-accent">-</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Водій:</span>
              <span id="wb-driver-name" class="meta-value text-white">-</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Тип палива:</span>
              <span id="wb-fuel-type" class="meta-value text-yellow">-</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Базовий розхід палива:</span>
              <span id="wb-fuel-base-rate" class="meta-value text-accent">- л/100 км</span>
            </div>
          </div>
        </div>

        <form id="form-waybill" class="waybill-form-body">
          
          <!-- INITIAL STATE SECTION -->
          <div class="form-section">
            <h3 class="section-title">
              <svg class="sec-icon"><use href="#icon-gauge"></use></svg>
              Вихідний стан активу
            </h3>
            
            <div class="form-row-grid-3">
              <div class="form-group">
                <label for="wb-start-odometer">Початковий одометр (км)</label>
                <input type="number" id="wb-start-odometer" class="tactical-input" min="0" required readonly>
                <small class="form-help">Зафіксовано на початку виїзду</small>
              </div>
              <div class="form-group">
                <label for="wb-start-fuel">Залишок палива в баку (л)</label>
                <input type="number" id="wb-start-fuel" class="tactical-input" min="0" step="0.1" required readonly>
                <small class="form-help">Фактична наявність у баку</small>
              </div>
              <div class="form-group">
                <label for="wb-start-talons">Початковий баланс у талонах (л)</label>
                <input type="number" id="wb-start-talons" class="tactical-input" min="0" required readonly>
                <small class="form-help">Обсяг за відомістю талонів</small>
              </div>
              <div class="form-group container-adblue">
                <label for="wb-start-adblue">Початковий залишок AdBlue (л)</label>
                <input type="number" id="wb-start-adblue" class="tactical-input" min="0" step="0.1" readonly>
                <small class="form-help">Кількість AdBlue в баку</small>
              </div>
              <div class="form-group container-adblue">
                <label for="wb-start-adblue-talons">Початковий AdBlue у талонах (л)</label>
                <input type="number" id="wb-start-adblue-talons" class="tactical-input" min="0" readonly>
                <small class="form-help">Обсяг AdBlue за талонами</small>
              </div>
            </div>
          </div>

          <!-- FUEL REFILL STOPS (TALON / CASH / MOBIL) -->
          <div class="form-section">
            <h3 class="section-title" style="margin-bottom: 1rem;">
              <svg class="sec-icon"><use href="#icon-droplet"></use></svg>
              Заправки паливом під час виїзду
            </h3>

            <div id="refill-logs-container" class="fluid-log-list">
              <!-- Dynamically Appended Fuel Refills -->
            </div>

            <div class="section-footer-actions">
              <button type="button" id="btn-add-refill" class="btn btn-xs btn-outline">
                <svg class="btn-svg-small"><use href="#icon-plus"></use></svg>
                Додати заправку
              </button>
            </div>
          </div>

          <!-- CONSUMABLES & FLUID LOGS -->
          <div class="form-section">
            <h3 class="section-title" style="margin-bottom: 1rem;">
              <svg class="sec-icon"><use href="#icon-zap"></use></svg>
              Використання мастил та додаткових рідин
            </h3>

            <!-- Custom/Allowed Fluids Container -->
            <div id="custom-fluids-container" class="fluid-log-list">
              <!-- Dynamically Appended Fluids -->
            </div>

            <div class="section-footer-actions">
              <button type="button" id="btn-add-custom-fluid" class="btn btn-xs btn-outline">
                <svg class="btn-svg-small"><use href="#icon-plus"></use></svg>
                + Додати рідину / мастило
              </button>
            </div>
          </div>

          <!-- ROUTE AND DISTANCE BREAKDOWN SECTION -->
          <div class="form-section">
            <h3 class="section-title" style="margin-bottom: 1rem;">
              <svg class="sec-icon"><use href="#icon-file-text"></use></svg>
              Маршрут руху та розбивка кілометражу
            </h3>

            <div id="route-segments-container" class="route-segments-stack">
              <!-- Route Segments appended here -->
            </div>

            <div class="section-footer-actions">
              <button type="button" id="btn-add-route" class="btn btn-xs btn-outline">
                <svg class="btn-svg-small"><use href="#icon-plus"></use></svg>
                Додати сегмент маршруту
              </button>
            </div>
          </div>

          <!-- LIVE REACTIVE CALCULATIONS CONTAINER -->
          <div class="tactical-calculator-box">
            <h4 class="calc-box-title">Розрахунок балансу витрат палива</h4>
            <div class="calc-results-grid">
              <div class="calc-item">
                <span class="calc-label">Загальна відстань:</span>
                <span id="calc-total-distance" class="calc-value text-white">0 км</span>
              </div>
              <div class="calc-item">
                <span class="calc-label">Додано заправками:</span>
                <span id="calc-total-refills" class="calc-value text-accent">0 л</span>
              </div>
              <div class="calc-item">
                <span class="calc-label">Розрахункова витрата палива:</span>
                <span id="calc-total-consumption" class="calc-value text-yellow">0.0 л</span>
              </div>
              <div class="calc-item highlight-box">
                <span class="calc-label">Залишок у баку (Розрахунковий):</span>
                <span id="calc-remaining-fuel" class="calc-value text-green">0.0 л</span>
              </div>
            </div>

            <!-- Dynamic AdBlue Calc Results (only shown for diesel) -->
            <div class="calc-results-grid container-adblue hidden" style="margin-top: 1rem; border-top: 1px dashed rgba(255, 255, 255, 0.05); padding-top: 1rem;">
              <div class="calc-item">
                <span class="calc-label">Витрата AdBlue (Розрахункова):</span>
                <span id="calc-adblue-consumption" class="calc-value text-yellow">0.0 л</span>
              </div>
              <div class="calc-item highlight-box">
                <span class="calc-label">Залишок AdBlue в баку (Розрахунковий):</span>
                <span id="calc-adblue-remaining" class="calc-value text-green">0.0 л</span>
              </div>
            </div>

            <!-- Linear fuel utilization progress bar -->
            <div class="tactical-progress-wrapper" id="calc-utilization-wrapper">
              <div class="tactical-progress-label">
                <span>Використання наявного палива</span>
                <span id="calc-utilization-percentage">0%</span>
              </div>
              <div class="tactical-progress-bar-bg">
                <div id="calc-utilization-bar" class="tactical-progress-bar-fill"></div>
              </div>
            </div>

            <!-- Detailed Fuel Breakdown List -->
            <div id="calc-detailed-breakdown"></div>
            
            <div class="alert-banner hidden" id="calc-discrepancy-alert">
              <svg class="alert-icon"><use href="#icon-shield-alert"></use></svg>
              <span>Попередження: Розрахункова витрата перевищує фактичний об'єм палива в баку! Перевірте правильність кілометражу або заправок.</span>
            </div>
          </div>

          <!-- FOOTER ACTIONS -->
          <div class="waybill-footer-actions">
            <button type="button" id="btn-save-waybill" class="btn btn-secondary btn-large">
              <svg class="btn-svg"><use href="#icon-save"></use></svg>
              Зберегти для продовження
            </button>
            
            <button type="button" id="btn-close-waybill-trigger" class="btn btn-accent btn-large">
              <svg class="btn-svg"><use href="#icon-lock"></use></svg>
              Закрити дорожній лист
            </button>
          </div>

        </form>
      </div>
    </section>


    <!-- VIEW 4: VOUCHER (TALON) VERIFICATION VIEW -->
    <section id="view-vouchers" class="app-screen">
      <div class="form-navigation">
        <button id="btn-back-dashboard-from-vouchers" class="btn btn-outline btn-back">
          ← До панелі активів
        </button>
        <span class="badge badge-neutral">РЕЄСТР ТАЛОНІВ</span>
      </div>

      <div class="card tactical-card">
        <div class="card-header">
          <h2>Фізична верифікація талонів на паливо</h2>
          <p class="subtitle text-amber">Підтвердьте фактичну наявність виданих паливних талонів</p>
        </div>
        
        <div class="card-body">
          <div id="vouchers-list-container" class="vouchers-stack">
            <!-- Dynamically populated from JS -->
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- CONFIRMATION POPUP MODAL (For Closing Waybill) -->
  <div id="modal-confirm-close" class="modal-overlay hidden">
    <div class="modal-content tactical-card">
      <div class="modal-header">
        <svg class="modal-alert-icon text-amber"><use href="#icon-shield-alert"></use></svg>
        <h3>Офіційне закриття дорожнього листа</h3>
      </div>
      <div class="modal-body">
        <p class="text-white">Увага! Закриття документа призведе до його повного блокування.</p>
        <p class="text-muted text-sm">Дані будуть передані на сервер бази даних, а локальний кеш очищено. Ви більше не зможете редагувати цей документ.</p>
        
        <div id="modal-summary-box" class="summary-box">
          <!-- Populated by JS with totals -->
        </div>

        <div class="download-container">
          <p class="download-text">Бажаєте зберегти звіт у текстовому форматі (.txt)?</p>
          <button id="btn-download-txt" class="btn btn-outline btn-block">
            <svg class="btn-svg-small"><use href="#icon-file-text"></use></svg>
            Завантажити звіт DL_Summary.txt (Опціонально)
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-modal-cancel" class="btn btn-outline">Скасувати</button>
        <button id="btn-modal-confirm" class="btn btn-accent">Підтвердити закриття</button>
      </div>
    </div>
  </div>

  <!-- REPORT MISSING VOUCHER MODAL -->
  <div id="modal-report-missing" class="modal-overlay hidden">
    <div class="modal-content tactical-card" style="border-left-color: var(--accent-red);">
      <div class="modal-header">
        <svg class="modal-alert-icon text-red" style="width: 28px; height: 28px; color: var(--accent-red);"><use href="#icon-shield-alert"></use></svg>
        <h3>Повідомити про відсутність талона</h3>
      </div>
      <div class="modal-body">
        <p class="text-white" style="margin-bottom: 0.75rem;">Ви підтверджуєте відсутність талона <strong id="modal-missing-voucher-id" class="text-yellow">-</strong>?</p>
        <p class="text-muted text-sm" style="margin-bottom: 1rem;">Інформація про невідповідність буде надіслана командуванню та техніку підрозділу.</p>
        
        <div class="form-group">
          <label for="input-missing-reason">Причина скарги / Коментар (Опціонально)</label>
          <input type="text" id="input-missing-reason" class="tactical-input" placeholder="напр., талон втрачено, пошкоджено штрих-код тощо">
        </div>
      </div>
      <div class="modal-footer">
        <button id="btn-modal-missing-cancel" class="btn btn-outline">Скасувати</button>
        <button id="btn-modal-missing-confirm" class="btn btn-danger">Підтвердити відсутність</button>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>

```

## File: style.css
Path: `style.css`

```css
/* ==========================================================================
   Tactical Military CSS Design System - Bento Grid PWA Style Rules
   ========================================================================== */

:root {
  /* Color Palette - Bento Obsidian/Tactical Mode */
  --bg-primary: #0b0c0f;       /* Deep matte black/obsidian */
  --bg-secondary: #111318;     /* Obsidian graphite panel */
  --bg-card: #161920;          /* Brushed steel dark base card */
  --border-color: #242936;     /* Subtle panel border */
  --border-focus: #00D2FF;     /* Neon cyan focus */
  --text-primary: #f5f6f9;     /* High-contrast text */
  --text-muted: #808a9d;       /* Muted gray for meta data */
  
  --accent-cyan: #00D2FF;      /* Neon Cyan */
  --accent-cyan-glow: rgba(0, 210, 255, 0.35);
  --accent-blue: #0066FF;      /* Electric Blue */
  --accent-blue-glow: rgba(0, 102, 255, 0.25);
  --accent-yellow: #FFD600;    /* Tactical bright yellow */
  --accent-red: #FF3B30;       /* Neon Red */
  --accent-green: #00E676;     /* Neon Green */
  --accent-steel: #4f6d7a;     /* Muted Steel */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --transition-speed: 0.25s;
  
  --font-display: 'Outfit', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

/* Reset and Global Styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: 16px;
  line-height: 1.5;
  overflow-x: hidden;
  padding-bottom: 2rem;
}

/* Scrollbar customization */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--bg-primary);
}
::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: var(--radius-sm);
}

/* responsive SPA Shell Layout */
.app-viewport {
  max-width: 760px;
  margin: 0 auto;
  padding: 1rem;
  min-height: calc(100vh - 64px);
}

/* Header Styling */
.app-header {
  background-color: var(--bg-secondary);
  border-bottom: 2px solid var(--accent-blue);
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
}

.header-svg {
  width: 24px;
  height: 24px;
  color: var(--accent-cyan);
}

.user-badge {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(0, 212, 255, 0.08);
  border: 1px solid var(--accent-cyan);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
}

.user-name {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-yellow);
}

/* Screen Transitions (SPA structure) */
.app-screen {
  display: none;
  animation: fadeIn var(--transition-speed) ease-in-out;
}

.app-screen.active {
  display: block;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Bento Grid System */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.bento-card {
  background-color: var(--bg-card);
  background-image: linear-gradient(145deg, #1d212b 0%, #111319 100%);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.03), 0 10px 30px rgba(0, 0, 0, 0.6);
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  transition: transform var(--transition-speed), border-color var(--transition-speed), box-shadow var(--transition-speed);
}

/* Brushed steel texture lines overlay */
.bento-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.005) 50%, rgba(0, 0, 0, 0.05) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}

.bento-card:hover {
  border-color: rgba(0, 210, 255, 0.35);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.7), 0 0 15px rgba(0, 210, 255, 0.15);
  transform: translateY(-2px);
}

/* Bento Hero Block spans full width */
.bento-hero {
  grid-column: span 2;
  border-left: 4px solid var(--accent-cyan);
}

.bento-card-title {
  font-size: 1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bento-card-title svg {
  width: 20px;
  height: 20px;
  color: var(--accent-cyan);
}

.bento-stats-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.bento-stat-item {
  background-color: rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 0.75rem 0.5rem;
  text-align: center;
}

.bento-stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.bento-stat-value {
  font-family: var(--font-mono);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--accent-cyan);
  margin-top: 0.25rem;
  text-shadow: 0 0 10px rgba(0, 210, 255, 0.3);
}

.bento-stat-value.yellow {
  color: var(--accent-yellow);
  text-shadow: 0 0 10px rgba(255, 214, 0, 0.3);
}

.bento-stat-value.white {
  color: var(--text-primary);
  text-shadow: none;
}

.bento-card-body {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.bento-card-actions {
  margin-top: 1rem;
}

/* Tactical UI Cards (Classic Bento items of the list) */
.card {
  background-color: var(--bg-card);
  background-image: linear-gradient(145deg, #1d212b 0%, #111319 100%);
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--accent-steel);
  border-radius: var(--radius-md);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.03), 0 8px 30px rgba(0, 0, 0, 0.5);
  margin-bottom: 1.25rem;
  overflow: hidden;
  position: relative;
  transition: transform var(--transition-speed), border-color var(--transition-speed), box-shadow var(--transition-speed);
}

.card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.005) 50%, rgba(0, 0, 0, 0.05) 50%);
  background-size: 100% 4px;
  pointer-events: none;
}

.card:hover {
  border-color: rgba(0, 102, 255, 0.25);
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.05), 0 12px 40px rgba(0, 0, 0, 0.6);
  transform: translateY(-1px);
}

.tactical-card {
  border-left-color: var(--accent-steel);
}

.auth-card {
  border-left-color: var(--accent-yellow);
  margin-top: 2rem;
}

.register-card {
  border-left-color: var(--accent-blue);
}

.card-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  background-color: rgba(0, 0, 0, 0.25);
}

.card-header h2, .card-header h3 {
  font-size: 1.3rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.subtitle {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.card-body {
  padding: 1.25rem;
}

/* Typography Helpers */
.text-center { text-align: center; }
.text-white { color: var(--text-primary); }
.text-muted { color: var(--text-muted); }
.text-amber { color: var(--accent-yellow); }
.text-yellow { color: var(--accent-yellow); font-family: var(--font-mono); }
.text-accent { color: var(--accent-cyan); font-family: var(--font-mono); }
.text-green { color: var(--accent-green); font-family: var(--font-mono); }
.text-red { color: var(--accent-red); font-family: var(--font-mono); }
.text-sm { font-size: 0.85rem; }

.divider {
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 1.5rem 0;
  text-transform: uppercase;
}

.divider::before, .divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-color);
}

.divider:not(:empty)::before { margin-right: 1em; }
.divider:not(:empty)::after { margin-left: 1em; }

/* Interactive Elements - Forms */
.form-group {
  margin-bottom: 1.25rem;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="number"],
input[type="date"],
input[type="datetime-local"] {
  width: 100%;
  min-height: 48px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 1rem;
  transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
}

select {
  width: 100%;
  min-height: 48px;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 0.75rem 2.5rem 0.75rem 1rem;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 1rem;
  transition: border-color var(--transition-speed), box-shadow var(--transition-speed);
  
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23f5f6f9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1.25rem;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--accent-cyan);
  box-shadow: 0 0 10px var(--accent-cyan-glow);
}

input[readonly] {
  background-color: rgba(255, 255, 255, 0.02);
  border-color: var(--border-color);
  color: var(--text-muted);
  cursor: not-allowed;
}

.form-help {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
  display: block;
}

.datetime-wrapper {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.datetime-wrapper input {
  flex: 1;
  min-width: 0;
}

.btn-ok-time {
  min-height: 48px !important;
  padding: 0 1rem !important;
  flex-shrink: 0;
}

/* Grid Layout Forms */
.row-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-row-grid-3 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.form-row-grid-3 .form-group {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.5rem;
  margin-bottom: 0;
}

.form-row-grid-3 .form-group label {
  margin-bottom: 0;
}

@media (min-width: 576px) {
  .form-row-grid-3 {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Button UI Components (Touch Targets min-height: 48px) */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-speed) ease;
  gap: 0.75rem;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.btn-block {
  width: 100%;
}

.btn-primary {
  background-color: var(--accent-blue);
  color: var(--text-primary);
  border-bottom: 3px solid rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 10px var(--accent-blue-glow);
}

.btn-primary:hover {
  background-color: #1a75ff;
  box-shadow: 0 4px 15px rgba(0, 102, 255, 0.4);
}

.btn-accent {
  background-color: var(--accent-cyan);
  color: #0b0c0f;
  border-bottom: 3px solid #00abd1;
  box-shadow: 0 4px 12px var(--accent-cyan-glow);
}

.btn-accent:hover {
  background-color: #33dbff;
  box-shadow: 0 4px 18px rgba(0, 210, 255, 0.5);
}

.btn-secondary {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-outline {
  background-color: transparent;
  border: 1.5px solid var(--border-color);
  color: var(--text-primary);
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.03);
  border-color: var(--accent-cyan);
  color: var(--accent-cyan);
}

.btn-danger {
  background-color: var(--accent-red);
  color: var(--text-primary);
}

.btn-danger:hover {
  background-color: #ff5247;
}

.btn-xs {
  min-height: 36px !important;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
}

.btn-large {
  min-height: 52px;
  flex: 1;
}

/* Icon Buttons */
.btn-icon-only {
  background: none;
  border: none;
  color: var(--text-muted);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}

.btn-icon-only:hover {
  background-color: rgba(255,255,255,0.05);
  color: var(--text-primary);
}

.btn-icon-only svg {
  width: 20px;
  height: 20px;
}

.btn-svg {
  width: 20px;
  height: 20px;
}

.btn-svg-small {
  width: 16px;
  height: 16px;
}

/* Dashboard Assets View */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-title h2 {
  font-size: 1.5rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-primary);
}

.btn-vouchers-nav {
  min-height: 48px;
}

/* Asset Cards (uniform sizes in Grid) */
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.asset-card {
  border-left-color: var(--accent-steel);
  transition: transform var(--transition-speed) ease, border-color var(--transition-speed) ease;
}

.asset-card.active-waybill-present {
  border-left-color: var(--accent-yellow);
}

.asset-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid var(--border-color);
}

.asset-type-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.asset-type-badge.generator {
  color: var(--accent-yellow);
}

.asset-type-badge.vehicle {
  color: var(--accent-cyan);
}

.asset-type-badge svg {
  width: 16px;
  height: 16px;
}

.asset-info {
  display: flex;
  flex-direction: column;
}

.asset-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-primary);
}

.asset-meta-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.asset-actions {
  padding: 1rem 1.25rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background-color: rgba(0,0,0,0.15);
}

/* Skeleton Loading styles */
.asset-skeleton {
  padding: 2rem 1.25rem;
}

.skeleton-line {
  height: 20px;
  background-color: var(--border-color);
  margin-bottom: 10px;
  border-radius: 4px;
  animation: pulse 1.5s infinite alternate;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes pulse {
  0% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* Waybill Form Interface styling */
.form-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-back {
  padding: 0.5rem 1rem;
  min-height: 40px;
}

.badge {
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.badge-active {
  background-color: rgba(0, 230, 118, 0.1);
  border: 1.5px solid var(--accent-green);
  color: var(--accent-green);
  text-shadow: 0 0 5px rgba(0, 230, 118, 0.4);
}

.badge-warning {
  background-color: rgba(255, 59, 48, 0.1);
  border: 1.5px solid var(--accent-red);
  color: var(--accent-red);
}

.badge-neutral {
  background-color: rgba(0, 210, 255, 0.08);
  border: 1.5px solid var(--accent-cyan);
  color: var(--accent-cyan);
}

.badge-locked {
  background-color: rgba(255, 255, 255, 0.05);
  border: 1.5px solid var(--border-color);
  color: var(--text-muted);
}

.waybill-container {
  border-left-color: var(--accent-blue);
}

/* Document-style header */
.waybill-header-section {
  padding: 1.5rem;
  border-bottom: 2px dashed var(--border-color);
  background-color: rgba(0,0,0,0.3);
}

.waybill-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.waybill-main-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.serial-number {
  font-family: var(--font-mono);
  color: var(--accent-cyan);
  font-weight: 700;
}

.waybill-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
}

.meta-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
}

.meta-value {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: 700;
}

.waybill-form-body {
  padding: 1.5rem;
}

.form-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 1.5rem;
}

.section-title {
  font-size: 1.05rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-primary);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sec-icon {
  width: 18px;
  height: 18px;
  color: var(--accent-cyan);
}

.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-footer-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
}

/* Fluid Row Items (Refills & Fluids) */
.fluid-log-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.log-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.01);
  border: 1px solid var(--border-color);
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
  animation: slideIn var(--transition-speed) ease-out;
}

.log-row > div {
  flex: 1 1 140px;
}

.refill-actions-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex: 1 1 140px;
}

.refill-actions-group .refill-amount-group {
  flex: 1 !important;
}

.log-row button.btn-delete-row,
.log-row button.btn-ok-refill {
  flex: 0 0 48px !important;
  width: 48px !important;
  height: 48px !important;
  padding: 0 !important;
  min-height: 48px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}

.consumables-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

/* Route Segment Card Stack */
.route-segments-stack {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.route-card {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent-cyan);
  border-radius: var(--radius-sm);
  padding: 1.25rem 1rem;
  position: relative;
}

.route-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
}

.segment-num {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-yellow);
}

.route-destinations {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.route-times {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.route-distances-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}

@media (max-width: 600px) {
  .route-distances-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.dist-input-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.dist-input-group label {
  font-size: 0.7rem;
  margin-bottom: 4px;
  text-align: center;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.2;
}

.dist-input-group input {
  min-height: 38px;
  padding: 0.25rem 0.5rem;
  text-align: center;
  font-size: 0.9rem;
}

/* Tactical Fuel Live Calculator styling */
.tactical-calculator-box {
  background-color: var(--bg-secondary);
  background-image: linear-gradient(145deg, #1d212b 0%, #111319 100%);
  border: 1px solid var(--border-color);
  border-top: 3px solid var(--accent-cyan);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  margin: 1.5rem 0;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.03), 0 8px 30px rgba(0, 0, 0, 0.5);
  position: relative;
}

.calc-box-title {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--accent-yellow);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 0.5rem;
}

.calc-results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 1rem;
}

.calc-item {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  background-color: rgba(0,0,0,0.25);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
}

.calc-label {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.calc-value {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.highlight-box {
  border: 1px solid var(--accent-cyan);
  background-color: rgba(0, 210, 255, 0.05);
}

.highlight-box .calc-value {
  font-size: 1.3rem;
  color: var(--accent-cyan);
  text-shadow: 0 0 10px var(--accent-cyan-glow);
}

/* Linear Progress Bar */
.tactical-progress-wrapper {
  margin-top: 1.25rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.05);
  padding-top: 1rem;
}

.tactical-progress-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 0.4rem;
}

.tactical-progress-bar-bg {
  height: 8px;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--border-color);
}

.tactical-progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-cyan) 100%);
  width: 0%;
  border-radius: 4px;
  transition: width var(--transition-speed) ease-in-out;
  box-shadow: 0 0 8px rgba(0, 210, 255, 0.5);
}

.tactical-progress-bar-fill.warning-fill {
  background: linear-gradient(90deg, #ff5247 0%, var(--accent-red) 100%);
  box-shadow: 0 0 8px rgba(255, 59, 48, 0.5);
}

.alert-banner {
  background-color: rgba(255, 59, 48, 0.1);
  border: 1px solid var(--accent-red);
  border-radius: var(--radius-sm);
  padding: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--text-primary);
  animation: blink 2s infinite ease-in-out;
}

.alert-banner.hidden {
  display: none !important;
}

.alert-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-red);
  flex-shrink: 0;
}

@keyframes blink {
  0% { border-color: var(--accent-red); }
  50% { border-color: transparent; }
  100% { border-color: var(--accent-red); }
}

.waybill-footer-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
}

/* Voucher Registry View styling */
.vouchers-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.voucher-card {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--accent-steel);
  border-radius: var(--radius-sm);
  padding: 1rem;
}

.voucher-card.discrepancy {
  border-left-color: var(--accent-red);
  background-color: rgba(255, 59, 48, 0.03);
}

.voucher-card.confirmed {
  border-left-color: var(--accent-green);
  background-color: rgba(0, 230, 118, 0.03);
}

.voucher-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.voucher-number {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.voucher-info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding-bottom: 0.5rem;
}

.voucher-status-text {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.status-pending { color: var(--accent-yellow); }
.status-confirmed { color: var(--accent-green); }
.status-missing { color: var(--accent-red); }

/* Confirmation Modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem 1rem;
  z-index: 200;
  overflow-y: auto;
  overscroll-behavior: contain;
  backdrop-filter: blur(4px);
  animation: fadeIn var(--transition-speed);
}

.modal-overlay.hidden {
  display: none !important;
}

.modal-content {
  margin: auto;
  max-width: 500px;
  width: 100%;
  border-left-color: var(--accent-yellow);
}

body.modal-open {
  overflow: hidden;
}

.modal-header {
  padding: 1.25rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.modal-alert-icon {
  width: 28px;
  height: 28px;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  background-color: rgba(0,0,0,0.25);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.summary-box {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
  margin: 1rem 0;
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.summary-total {
  border-top: 1px solid var(--border-color);
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  font-weight: 700;
  color: var(--accent-yellow);
}

.download-container {
  border-top: 1px dashed var(--border-color);
  margin-top: 1rem;
  padding-top: 1rem;
}

.download-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
}

/* Toast/In-App Notification styling */
.toast-container {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px);
  max-width: 400px;
  z-index: 300;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast {
  background-color: var(--bg-card);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-sm);
  padding: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.6);
  animation: slideDown var(--transition-speed) cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast.toast-error {
  border-color: var(--accent-red);
  border-left: 4px solid var(--accent-red);
}

.toast.toast-success {
  border-color: var(--accent-green);
  border-left: 4px solid var(--accent-green);
}

.toast.toast-info {
  border-color: var(--accent-steel);
  border-left: 4px solid var(--accent-steel);
}

.toast-body {
  flex-grow: 1;
}

.toast-title {
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 2px;
}

.toast-msg {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
  padding: 0 4px;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-50px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Locked Form Display State */
.read-only-state input,
.read-only-state select,
.read-only-state button:not(.btn-back):not(#btn-download-txt) {
  pointer-events: none;
  opacity: 0.6;
}

.hidden {
  display: none !important;
}

/* Detailed breakdown list styles */
.detailed-breakdown-title {
  margin-top: 1.25rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
  padding-bottom: 0.25rem;
  letter-spacing: 0.05em;
  font-weight: 700;
}

.detailed-breakdown-list {
  list-style: none;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detailed-breakdown-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  font-family: var(--font-mono);
  font-size: 0.9rem;
}

.detailed-breakdown-item span:first-child {
  color: var(--text-primary);
}

.detailed-breakdown-item .breakdown-val {
  color: var(--accent-yellow);
  font-weight: 700;
}

/* User Badge user-icon styling */
.badge-user-icon {
  width: 16px;
  height: 16px;
  color: var(--accent-yellow);
  flex-shrink: 0;
}

/* Mobile Responsive Styling Tweaks for Screens <= 768px */
@media (max-width: 768px) {
  .btn-ok-time {
    display: none !important;
  }

  .form-navigation {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }

  .form-navigation .btn-back {
    width: 100%;
    justify-content: center;
  }

  .form-navigation .badge {
    text-align: center;
    width: 100%;
  }

  .asset-actions {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .route-destinations {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .route-times {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .waybill-footer-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .waybill-footer-actions .btn-large {
    width: 100%;
  }
  
  .route-card {
    padding: 0.75rem;
  }

  /* Refill and Fluid Log rows mobile layouts */
  .fluid-row {
    flex-wrap: wrap !important;
  }
  .fluid-row .fluid-name-group {
    flex: 1 0 100% !important;
    width: 100% !important;
  }
  .fluid-row .fluid-amount-group {
    flex: 1 1 0% !important;
  }
  .fluid-row .btn-delete-row {
    flex: 0 0 48px !important;
    align-self: flex-start;
  }

  .refill-row {
    flex-wrap: wrap !important;
  }
  .refill-row .refill-date-group {
    flex: 1 1 calc(50% - 0.375rem) !important;
  }
  .refill-row .refill-method-group {
    flex: 1 1 calc(50% - 0.375rem) !important;
  }
  .refill-row .refill-detail-group {
    flex: 1 0 100% !important;
    width: 100% !important;
  }
  .refill-row .refill-actions-group {
    flex: 1 0 100% !important;
    width: 100% !important;
  }
}

/* Mobile Responsive Styling Tweaks for Screens <= 500px */
@media (max-width: 500px) {
  .app-header {
    padding: 0 0.75rem;
  }
  
  .header-logo span {
    font-size: 1rem;
  }

  .user-name {
    display: none;
  }

  .user-badge {
    padding: 0.25rem 0.5rem;
    gap: 0.5rem;
  }

  .section-header-flex {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

/* Extra small screen tweaks */
@media (max-width: 480px) {
  .route-distances-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
}

```

## File: app.js
Path: `app.js`

```javascript
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

```

## File: sw.js
Path: `sw.js`

```javascript
const CACHE_NAME = "military-waybill-v34";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./manifest.json",
  "./fluids.json"
];

// Установка Service Worker та кешування ресурсів
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Service Worker: кешування статичних ресурсів");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Активація Service Worker та видалення застарілих кешів
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: видалення старого кешу", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Стратегія Cache-First з переходом на мережу при відсутності в кеші
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(networkResponse => {
          // Якщо відповідь успішна, можна закешувати динамічно (за потреби)
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Якщо офлайн і немає в кеші
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});

```

## File: manifest.json
Path: `manifest.json`

```json
{
  "short_name": "ВійськОблік",
  "name": "Військовий Облік Дорожніх Листів та Палива",
  "icons": [
    {
      "src": "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23556b2f' stroke-width='2'><path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/></svg>",
      "type": "image/svg+xml",
      "sizes": "512x512",
      "purpose": "any maskable"
    }
  ],
  "start_url": "./index.html",
  "background_color": "#121316",
  "theme-color": "#1e1e24",
  "display": "standalone",
  "orientation": "portrait"
}

```

## File: fluids.json
Path: `fluids.json`

```json
{
  "consumptionNorms": {
    "Моторна олива М-14Г2К": 0.015,
    "Моторна олива 15W-40": 0.015,
    "Моторна олива М-8В": 0.012,
    "Моторна олива 10W-30": 0.015,
    "Трансмісійна олива ТАД-17и": 0.004,
    "Трансмісійна олива ТАД-17": 0.004,
    "Охолоджуюча рідина ТОСОЛ-А40": 0.002,
    "Охолоджуюча рідина (Антифриз)": 0.002,
    "Антифриз G11": 0.002,
    "Двотактне мастило": 0.020,
    "AdBlue": 0.050,
    "Склоомивач": 0.0,
    "Рідина ГУР ATF": 0.0,
    "Склоомивач зимовий": 0.0,
    "Гальмівна рідина Нева": 0.0,
    "Солідол Ж": 0.0
  },
  "assetAllowedFluids": {
    "ЗСУ-0112": [
      "Моторна олива М-14Г2К",
      "Трансмісійна олива ТАД-17и",
      "Охолоджуюча рідина ТОСОЛ-А40"
    ],
    "БТ-3452": [
      "Моторна олива 15W-40",
      "Рідина ГУР ATF",
      "Склоомивач зимовий"
    ],
    "ЗСУ-8902": [
      "Моторна олива М-8В",
      "Гальмівна рідина Нева",
      "Солідол Ж"
    ],
    "ГЕН-10К": [
      "Моторна олива 10W-30",
      "Антифриз G11"
    ]
  },
  "commonFluids": [
    "Склоомивач",
    "Двотактне мастило"
  ]
}

```

## File: API_DOCUMENTATION.md
Path: `API_DOCUMENTATION.md`

```markdown
# Специфікація API та Схеми Взаємодії з Сервером

Цей документ описує архітектуру взаємодії між клієнтським PWA-додатком **«Військовий Облік: Дорожні Листи & Паливо»** та серверною частиною (Backend API). Специфікація розроблена з урахуванням автономності додатка (Offline-First) та специфіки військового обліку.

---

## 1. Загальні вимоги та Архітектурні принципи

1. **Протокол**: HTTPS, RESTful API.
2. **Формат даних**: JSON.
3. **Авторизація**: Bearer Token (JWT), отриманий після успішної автентифікації через Google OAuth 2.0. Токен передається в заголовку `Authorization: Bearer <JWT_TOKEN>`.
4. **Принцип Offline-First**:
   * Клієнт зберігає активний стан у `localStorage` та `IndexedDB`.
   * При відновленні мережевого з'єднання проводиться фонова синхронізація (Background Sync).
   * Запити на зміну стану (створення, редагування, закриття дорожніх листів) чергуються в черзі `outbox` та надсилаються на сервер послідовно.

---

## 2. Схеми Даних (Data Schemas)

### 2.1. Користувач (User)
```json
{
  "id": "usr_99812401",
  "fullName": "ст. серж. Петренко Іван Васильович",
  "email": "i.petrenko@military.gov.ua",
  "subunit": "3 механізована рота",
  "role": "driver"
}
```

### 2.2. Актив / Техніка (Asset)
Може бути вантажівкою, легковим автомобілем (тип `vehicle`) або генератором (тип `generator`).
```json
{
  "plate": "БТ-3452",
  "name": "HMMWV M1114 (Позашляховик)",
  "type": "vehicle",
  "fuelType": "Дизель",
  "baseConsumption": 18.0,
  "allowedFluids": [
    "Моторна олива 15W-40",
    "Рідина ГУР ATF",
    "Склоомивач зимовий"
  ]
}
```

### 2.3. Дорожній лист (Waybill)
Головний документ обліку. Містить сегменти маршруту, заправки та витратні матеріали.
```json
{
  "serialNumber": "DL-2026-06/042",
  "plate": "БТ-3452",
  "driverName": "ст. серж. Петренко І. В.",
  "fuelType": "Дизель",
  "baseConsumption": 18.0,
  "startOdometer": 2840,
  "startFuel": 45.0,
  "startTalons": 80.0,
  "startAdBlue": 8.0,
  "startAdBlueTalons": 15.0,
  "refills": [
    {
      "id": "REF-1719342081000",
      "date": "2026-06-25",
      "method": "talon",
      "talonId": "T-8874-D",
      "source": "Талон T-8874-D",
      "amount": 20,
      "locked": true
    }
  ],
  "consumables": [
    {
      "name": "Моторна олива 15W-40",
      "amount": 1.5
    }
  ],
  "routes": [
    {
      "id": "R-SEG-1719342082000",
      "from": "ВЧ А-0000",
      "to": "Блокпост №3",
      "departTime": "2026-06-25T08:00",
      "arriveTime": "2026-06-25T09:30",
      "distSmallCity": 10,
      "distMediumCity": 0,
      "distBigCity": 0,
      "distHighway": 25,
      "distDirt": 5
    }
  ],
  "status": "active",
  "dateCreated": "2026-06-25T07:45:00Z",
  "dateClosed": null
}
```

### 2.4. Талон на паливо (Voucher)
```json
{
  "id": "T-9981-D",
  "volume": 50,
  "fuelType": "Дизель",
  "status": "pending" 
}
```
*Примітка щодо `status`*: 
* `pending` — виданий водієві, очікує підтвердження в наявності або заправки.
* `used` — використаний для заправки під час виїзду.
* `verified` — фізично верифікований водієм у реєстрі.
* `missing` — повідомлено про відсутність чи втрату.

---

## 3. Маршрути запитів (API Routes)

### 3.1. Автентифікація та Профіль

#### `POST /api/v1/auth/google`
Обмін Google OAuth authorization code на JWT-токен додатка.
* **Request Payload**:
  ```json
  {
    "code": "4/0AdQt8q..."
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOi...",
    "user": {
      "id": "usr_99812401",
      "fullName": "ст. серж. Петренко Іван Васильович",
      "email": "i.petrenko@military.gov.ua",
      "subunit": "3 механізована рота"
    }
  }
  ```

#### `POST /api/v1/auth/register-request`
Надсилання запиту на додавання нового користувача до системи командуванням частини.
* **Request Payload**:
  ```json
  {
    "fullName": "ст. серж. Петренко Іван Васильович",
    "subunit": "2 механізована рота",
    "requestedPlates": "БТ-1234, Gen-45",
    "timestamp": "2026-06-25T19:30:00Z"
  }
  ```
* **Response (202 Accepted)**:
  ```json
  {
    "message": "Запит успішно надіслано адміністратору частини",
    "requestId": "req_887410"
  }
  ```

---

### 3.2. Управління активами (Assets)

#### `GET /api/v1/assets`
Отримання списку техніки, закріпленої за поточним авторизованим водієм.
* **Response (200 OK)**:
  ```json
  [
    {
      "plate": "БТ-3452",
      "name": "HMMWV M1114 (Позашляховик)",
      "type": "vehicle",
      "fuelType": "Дизель",
      "baseConsumption": 18.0
    }
  ]
  ```

#### `GET /api/v1/assets/{plate}/fluids`
Отримання дозволених мастильних матеріалів/рідин та норм їх споживання для конкретного активу.
* **Response (200 OK)**:
  ```json
  {
    "assetAllowedFluids": {
      "БТ-3452": ["Моторна олива 15W-40", "Рідина ГУР ATF", "Склоомивач зимовий"]
    },
    "commonFluids": ["Склоомивач", "Двотактне мастило"],
    "consumptionNorms": {
      "Моторна олива 15W-40": 0.015,
      "Рідина ГУР ATF": 0.005,
      "Склоомивач зимовий": 0.0,
      "Склоомивач": 0.0,
      "Двотактне мастило": 0.02
    }
  }
  ```

---

### 3.3. Дорожні листи (Waybills)

#### `GET /api/v1/waybills/active?plate={plate}`
Перевірка наявності активного (незакритого) дорожнього листа на сервері для цього номера техніки (у випадку, якщо інший водій почав зміну).
* **Response (200 OK - Знайдено)**: повертає об'єкт Waybill (див. п. 2.3) зі статусом `"active"`.
* **Response (404 Not Found - Відсутній)**:
  ```json
  {
    "message": "Активного дорожнього листа для цієї техніки не знайдено"
  }
  ```

#### `POST /api/v1/waybills`
Створення нового дорожнього листа на сервері.
* **Request Payload**:
  ```json
  {
    "plate": "БТ-3452",
    "startOdometer": 2840,
    "startFuel": 45.0,
    "startTalons": 80.0,
    "startAdBlue": 8.0,
    "startAdBlueTalons": 15.0
  }
  ```
* **Response (201 Created)**: Повертає створений Waybill з присвоєним серійним номером (`serialNumber`).

#### `PUT /api/v1/waybills/{serialNumber}`
Проміжне збереження стану дорожнього листа водієм (для запобігання втраті даних).
* **Request Payload**: Повний або частковий об'єкт Waybill (сегменти маршруту, заправки, мастила).
* **Response (200 OK)**:
  ```json
  {
    "status": "saved",
    "updatedAt": "2026-06-25T19:35:10Z"
  }
  ```

#### `POST /api/v1/waybills/{serialNumber}/close`
Офіційне закриття дорожнього листа. Ця дія остаточна і блокує подальше редагування.
* **Request Payload**: Повний фінальний об'єкт Waybill.
* **Response (200 OK)**:
  ```json
  {
    "status": "closed",
    "serialNumber": "DL-2026-06/042",
    "summary": {
      "totalDistance": 40.0,
      "totalConsumption": 7.47,
      "remainingFuel": 57.53,
      "adblueRemaining": 7.63
    },
    "message": "Документ успішно закріплено в архіві бази даних"
  }
  ```

---

### 3.4. Реєстр та верифікація талонів (Vouchers)

#### `GET /api/v1/vouchers`
Отримання реєстру талонів на паливо, закріплених за поточним водієм.
* **Response (200 OK)**: Список об'єктів талонів.

#### `POST /api/v1/vouchers/{id}/verify`
Підтвердження водієм фізичної наявності талона (кнопка «Підтвердити наявність» у реєстрі).
* **Response (200 OK)**:
  ```json
  {
    "id": "T-9981-D",
    "status": "verified"
  }
  ```

#### `POST /api/v1/vouchers/{id}/report-missing`
Надсилання скарги/рапорту про відсутність або втрату талона.
* **Request Payload**:
  ```json
  {
    "reason": "талон втрачено під час виконання бойового завдання"
  }
  ```
* **Response (200 OK)**:
  ```json
  {
    "id": "T-9981-D",
    "status": "missing",
    "reportedAt": "2026-06-25T19:40:00Z"
  }
  ```

---

## 4. Особливості реалізації синхронізації (Offline/Online)

### 4.1. Логіка генерації ID на клієнті
Для роботи в офлайн-режимі всі заправки та сегменти маршруту створюються з тимчасовими унікальними ідентифікаторами на стороні клієнта за маскою `REF-[timestamp]-[random]` та `R-SEG-[timestamp]-[random]`. 
Сервер повинен приймати ці ID і зберігати їх для мапінгу зв'язків.

### 4.2. Порядок вирішення конфліктів (Conflict Resolution)
* **Принцип "Останній запис перемагає" (Last-Write-Wins)** для проміжних збережень стану дорожнього листа (`PUT /api/v1/waybills/{serialNumber}`).
* Якщо статус дорожнього листа на сервері вже має значення `"closed"`, будь-які подальші спроби відправити `PUT` або `POST /close` відхиляються сервером з помилкою `409 Conflict`. Клієнтське PWA у такому випадку має автоматично перевести форму в режим `read-only` та очистити локальну копію з черги синхронізації.

### 4.3. Валідація формул розрахунку палива
Незважаючи на те, що клієнт робить живі розрахунки в інтерфейсі (клас `AppState.getCoefficients()`), сервер **зобов'язаний самостійно перерахувати** витрату палива на основі переданих сегментів маршруту при виклику `/close` для запобігання підробці даних. Якщо серверний розрахунок розходиться з клієнтським більш ніж на 0.01 л, запис зберігається з прапорцем `discrepancy_detected` для аудиту техніком підрозділу.

```
