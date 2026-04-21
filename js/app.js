import { createId, getSeedData } from "./data.js";

const STORAGE_KEY = "poultry-farm-command-center-v1";

const EMPTY_FARM = {
  name: "Poultry Farm Command Center",
  ownerName: "",
  location: "",
  contact: "",
  notes: "",
};

const EMPTY_SHED = {
  id: "",
  name: "",
  type: "Broiler",
  capacity: 0,
  currentBirds: 0,
  ageDays: 0,
  breed: "",
  batchCode: "",
  supervisor: "",
  placementDate: "",
  targetTemp: 0,
  targetHumidity: 0,
  notes: "",
};

const EMPTY_VACCINATION = {
  id: "",
  shedId: "",
  disease: "",
  vaccineName: "",
  method: "",
  dose: "",
  batchNo: "",
  dueDate: "",
  completedDate: "",
  technician: "",
  notes: "",
};

const EMPTY_LOG = {
  id: "",
  date: "",
  shedId: "",
  openingBirds: 0,
  closingBirds: 0,
  mortality: 0,
  culls: 0,
  feedKg: 0,
  waterLiters: 0,
  eggsCollected: 0,
  avgWeight: 0,
  temperature: 0,
  humidity: 0,
  medicine: "",
  notes: "",
};

const EMPTY_INVENTORY = {
  id: "",
  name: "",
  category: "",
  quantity: 0,
  unit: "",
  reorderLevel: 0,
  supplier: "",
  expiryDate: "",
  unitCost: 0,
};

const EMPTY_TASK = {
  id: "",
  title: "",
  shedId: "",
  category: "",
  dueDate: "",
  priority: "Medium",
  assignedTo: "",
  completed: false,
  notes: "",
};

const EMPTY_FINANCE = {
  id: "",
  date: "",
  type: "Expense",
  category: "",
  shedId: "",
  counterparty: "",
  amount: 0,
  notes: "",
};

const el = (id) => document.getElementById(id);

const elements = {
  navButtons: [...document.querySelectorAll(".nav-link")],
  sections: [...document.querySelectorAll(".content-section")],
  farmNameHeading: el("farmNameHeading"),
  farmMeta: el("farmMeta"),
  dailyFocusTitle: el("dailyFocusTitle"),
  dailyFocusText: el("dailyFocusText"),
  lastSavedLabel: el("lastSavedLabel"),
  statSheds: el("statSheds"),
  statBirds: el("statBirds"),
  statOccupancy: el("statOccupancy"),
  statMortality: el("statMortality"),
  statVaccines: el("statVaccines"),
  statNet: el("statNet"),
  statCapacityText: el("statCapacityText"),
  statBirdMixText: el("statBirdMixText"),
  statOccupancyText: el("statOccupancyText"),
  statMortalityText: el("statMortalityText"),
  statVaccinesText: el("statVaccinesText"),
  statFinanceText: el("statFinanceText"),
  alertList: el("alertList"),
  upcomingVaccinationsBody: el("upcomingVaccinationsBody"),
  shedSnapshotBody: el("shedSnapshotBody"),
  activityFeed: el("activityFeed"),
  insightCards: el("insightCards"),
  shedCards: el("shedCards"),
  vaccinationTableBody: el("vaccinationTableBody"),
  dailyLogTableBody: el("dailyLogTableBody"),
  opsPulse: el("opsPulse"),
  inventoryAlerts: el("inventoryAlerts"),
  inventoryTableBody: el("inventoryTableBody"),
  taskSummary: el("taskSummary"),
  taskBoard: el("taskBoard"),
  financeSummary: el("financeSummary"),
  financeTableBody: el("financeTableBody"),
  reportCards: el("reportCards"),
  exportDataBtn: el("exportDataBtn"),
  importDataInput: el("importDataInput"),
  resetDataBtn: el("resetDataBtn"),
  farmProfileForm: el("farmProfileForm"),
  farmNameInput: el("farmNameInput"),
  ownerNameInput: el("ownerNameInput"),
  locationInput: el("locationInput"),
  contactInput: el("contactInput"),
  farmNotesInput: el("farmNotesInput"),
  shedForm: el("shedForm"),
  vaccinationForm: el("vaccinationForm"),
  vaccShedId: el("vaccShedId"),
  vaccDueDate: el("vaccDueDate"),
  dailyLogForm: el("dailyLogForm"),
  logDateInput: el("logDateInput"),
  logShedId: el("logShedId"),
  logOpeningBirds: el("logOpeningBirds"),
  inventoryForm: el("inventoryForm"),
  taskForm: el("taskForm"),
  taskShedId: el("taskShedId"),
  taskDueDate: el("taskDueDate"),
  financeForm: el("financeForm"),
  financeShedId: el("financeShedId"),
  financeDate: el("financeDate"),
};

let state = loadState();

init();

function init() {
  bindNavigation();
  bindGlobalActions();
  bindForms();
  populateSelectors();
  setDefaultFormValues();
  renderApp();
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return normalizeState(getSeedData());
    }

    return normalizeState(JSON.parse(raw));
  } catch (error) {
    console.error("Failed to load local farm data:", error);
    return normalizeState(getSeedData());
  }
}

function normalizeState(data) {
  const source = data && typeof data === "object" ? data : {};

  return {
    version: 1,
    savedAt: source.savedAt || new Date().toISOString(),
    farm: { ...EMPTY_FARM, ...(source.farm || {}) },
    sheds: Array.isArray(source.sheds)
      ? source.sheds.map((shed) => ({
          ...EMPTY_SHED,
          ...shed,
          id: shed.id || createId("shed"),
        }))
      : [],
    vaccinations: Array.isArray(source.vaccinations)
      ? source.vaccinations.map((vaccination) => ({
          ...EMPTY_VACCINATION,
          ...vaccination,
          id: vaccination.id || createId("vacc"),
        }))
      : [],
    dailyLogs: Array.isArray(source.dailyLogs)
      ? source.dailyLogs.map((log) => ({
          ...EMPTY_LOG,
          ...log,
          id: log.id || createId("log"),
        }))
      : [],
    inventory: Array.isArray(source.inventory)
      ? source.inventory.map((item) => ({
          ...EMPTY_INVENTORY,
          ...item,
          id: item.id || createId("stock"),
        }))
      : [],
    tasks: Array.isArray(source.tasks)
      ? source.tasks.map((task) => ({
          ...EMPTY_TASK,
          ...task,
          id: task.id || createId("task"),
        }))
      : [],
    finance: Array.isArray(source.finance)
      ? source.finance.map((entry) => ({
          ...EMPTY_FINANCE,
          ...entry,
          id: entry.id || createId("fin"),
        }))
      : [],
  };
}

function bindNavigation() {
  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showSection(button.dataset.target || "overview");
    });
  });
}

function bindGlobalActions() {
  elements.exportDataBtn.addEventListener("click", exportData);
  elements.importDataInput.addEventListener("change", importData);
  elements.resetDataBtn.addEventListener("click", resetToSeedData);

  elements.logShedId.addEventListener("change", syncOpeningBirdsToSelectedShed);

  elements.vaccinationTableBody.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === "complete-vaccine" && id) {
      markVaccinationComplete(id);
    }
  });

  elements.taskBoard.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const action = target.dataset.action;
    const id = target.dataset.id;

    if (!action || !id) {
      return;
    }

    if (action === "toggle-task") {
      toggleTaskCompletion(id);
    }

    if (action === "delete-task") {
      deleteTask(id);
    }
  });
}

function bindForms() {
  elements.farmProfileForm.addEventListener("submit", handleFarmProfileSubmit);
  elements.shedForm.addEventListener("submit", handleShedSubmit);
  elements.vaccinationForm.addEventListener("submit", handleVaccinationSubmit);
  elements.dailyLogForm.addEventListener("submit", handleDailyLogSubmit);
  elements.inventoryForm.addEventListener("submit", handleInventorySubmit);
  elements.taskForm.addEventListener("submit", handleTaskSubmit);
  elements.financeForm.addEventListener("submit", handleFinanceSubmit);
}

function showSection(target) {
  elements.navButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === target);
  });

  elements.sections.forEach((section) => {
    section.classList.toggle("is-active", section.id === `section-${target}`);
  });
}

function renderApp() {
  populateSelectors();
  setDefaultFormValues();
  renderHeader();
  renderOverview();
  renderSheds();
  renderVaccinations();
  renderOperations();
  renderInventory();
  renderTasks();
  renderFinance();
  fillFarmProfileForm();
  updateLastSavedLabel();
}

function renderHeader() {
  const totalBirds = sum(state.sheds.map((shed) => Number(shed.currentBirds)));
  elements.farmNameHeading.textContent = state.farm.name || "Poultry Farm Command Center";
  elements.farmMeta.textContent = `${state.farm.ownerName || "Owner not set"} • ${
    state.farm.location || "Location not set"
  } • ${state.sheds.length} sheds • ${formatNumber(totalBirds)} live birds`;
}

function renderOverview() {
  const totalCapacity = sum(state.sheds.map((shed) => Number(shed.capacity)));
  const totalBirds = sum(state.sheds.map((shed) => Number(shed.currentBirds)));
  const occupancy = totalCapacity ? (totalBirds / totalCapacity) * 100 : 0;
  const mortalityRate = getRecentMortalityRate();
  const vaccineLoad = getDueVaccinations().length;
  const monthlyFinance = getMonthlyFinanceSummary();
  const typeMix = getBirdMixText();

  elements.statSheds.textContent = formatNumber(state.sheds.length);
  elements.statBirds.textContent = formatNumber(totalBirds);
  elements.statOccupancy.textContent = `${occupancy.toFixed(1)}%`;
  elements.statMortality.textContent = `${mortalityRate.toFixed(2)}%`;
  elements.statVaccines.textContent = formatNumber(vaccineLoad);
  elements.statNet.textContent = formatCurrency(monthlyFinance.net);
  elements.statCapacityText.textContent = `${formatNumber(totalCapacity)} total bird capacity across the farm.`;
  elements.statBirdMixText.textContent = typeMix;
  elements.statOccupancyText.textContent = `${formatNumber(totalBirds)} birds are currently housed.`;
  elements.statMortalityText.textContent = `Based on the last 7 days of shed logs.`;
  elements.statVaccinesText.textContent = `${vaccineLoad} vaccination records need attention soon.`;
  elements.statFinanceText.textContent = `${formatCurrency(monthlyFinance.income)} income vs ${formatCurrency(
    monthlyFinance.expense,
  )} expense this month.`;

  renderAlerts();
  renderUpcomingVaccinations();
  renderShedSnapshot();
  renderActivityFeed();
  renderInsights();
  updateDailyFocus();
}

function renderAlerts() {
  const alerts = getFarmAlerts();

  if (!alerts.length) {
    elements.alertList.innerHTML = `<li class="alert-item is-success"><strong>All clear</strong><p>No urgent farm alert is active right now.</p></li>`;
    return;
  }

  elements.alertList.innerHTML = alerts
    .map(
      (alert) => `
        <li class="alert-item ${alert.tone ? `is-${alert.tone}` : ""}">
          <strong>${escapeHtml(alert.title)}</strong>
          <p>${escapeHtml(alert.text)}</p>
        </li>
      `,
    )
    .join("");
}

function renderUpcomingVaccinations() {
  const upcoming = [...state.vaccinations]
    .sort((left, right) => compareDateStrings(left.dueDate, right.dueDate))
    .slice(0, 8);

  if (!upcoming.length) {
    elements.upcomingVaccinationsBody.innerHTML = `<tr><td colspan="5"><div class="empty-state">No vaccination records yet.</div></td></tr>`;
    return;
  }

  elements.upcomingVaccinationsBody.innerHTML = upcoming
    .map((record) => {
      const shed = getShedById(record.shedId);
      const status = getVaccinationStatus(record);
      return `
        <tr>
          <td>${escapeHtml(shed?.name || "Farm")}</td>
          <td>${escapeHtml(record.disease)}</td>
          <td>${escapeHtml(record.vaccineName)}</td>
          <td>${formatDate(record.dueDate)}</td>
          <td><span class="status-pill ${status.className}">${escapeHtml(status.label)}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderShedSnapshot() {
  if (!state.sheds.length) {
    elements.shedSnapshotBody.innerHTML = `<tr><td colspan="5"><div class="empty-state">Add your first shed to start farm tracking.</div></td></tr>`;
    return;
  }

  elements.shedSnapshotBody.innerHTML = state.sheds
    .map((shed) => {
      const latestLog = getLatestLogForShed(shed.id);
      const occupancy = getOccupancyPercentage(shed);
      const outputText =
        shed.type === "Layer"
          ? `${formatNumber(latestLog?.eggsCollected || 0)} eggs`
          : `${Number(latestLog?.avgWeight || 0).toFixed(2)} kg avg`;

      return `
        <tr>
          <td>${escapeHtml(shed.name)}</td>
          <td>${formatNumber(shed.currentBirds)}</td>
          <td>${occupancy.toFixed(1)}%</td>
          <td>${formatNumber(latestLog?.mortality || 0)}</td>
          <td>${escapeHtml(outputText)}</td>
        </tr>
      `;
    })
    .join("");
}

function renderActivityFeed() {
  const activities = getRecentActivities().slice(0, 8);

  if (!activities.length) {
    elements.activityFeed.innerHTML = `<div class="empty-state">Activity will appear here after you add farm records.</div>`;
    return;
  }

  elements.activityFeed.innerHTML = activities
    .map(
      (activity) => `
        <article class="activity-item">
          <time>${formatDate(activity.date)}</time>
          <strong>${escapeHtml(activity.title)}</strong>
          <p>${escapeHtml(activity.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderInsights() {
  const highestOccupancy = [...state.sheds].sort((left, right) => getOccupancyPercentage(right) - getOccupancyPercentage(left))[0];
  const bestLayer = state.sheds
    .filter((shed) => shed.type === "Layer")
    .sort((left, right) => (getLatestLogForShed(right.id)?.eggsCollected || 0) - (getLatestLogForShed(left.id)?.eggsCollected || 0))[0];
  const dueVaccines = getDueVaccinations();
  const lowStock = getLowStockItems();

  const cards = [
    highestOccupancy
      ? {
          label: "Most occupied shed",
          value: highestOccupancy.name,
          text: `${getOccupancyPercentage(highestOccupancy).toFixed(1)}% full with ${formatNumber(
            highestOccupancy.currentBirds,
          )} birds.`,
        }
      : null,
    bestLayer
      ? {
          label: "Best laying shed",
          value: bestLayer.name,
          text: `${formatNumber(getLatestLogForShed(bestLayer.id)?.eggsCollected || 0)} eggs in the latest log.`,
        }
      : null,
    {
      label: "Health attention",
      value: dueVaccines.length ? `${dueVaccines.length} records` : "No urgent dose",
      text: dueVaccines.length
        ? `${getShedById(dueVaccines[0].shedId)?.name || "Farm"} needs vaccine follow-up first.`
        : "Vaccination schedule is in a comfortable state right now.",
    },
    {
      label: "Stock pressure",
      value: lowStock.length ? `${lowStock.length} low items` : "Healthy stock",
      text: lowStock.length
        ? `${lowStock[0].name} is already at or below reorder level.`
        : "No inventory line is currently below its reorder point.",
    },
  ].filter(Boolean);

  elements.insightCards.innerHTML = cards
    .map(
      (card) => `
        <article class="insight-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");
}

function updateDailyFocus() {
  const alerts = getFarmAlerts();
  const leadAlert = alerts[0];

  if (leadAlert) {
    elements.dailyFocusTitle.textContent = leadAlert.title;
    elements.dailyFocusText.textContent = leadAlert.text;
    return;
  }

  elements.dailyFocusTitle.textContent = "Farm is stable";
  elements.dailyFocusText.textContent = "Use the report cards to spot future pressure before it becomes a problem.";
}

function renderSheds() {
  if (!state.sheds.length) {
    elements.shedCards.innerHTML = `<div class="empty-state">No sheds added yet. Use the form below to create the first shed.</div>`;
    return;
  }

  elements.shedCards.innerHTML = state.sheds
    .map((shed) => {
      const occupancy = getOccupancyPercentage(shed);
      const latestLog = getLatestLogForShed(shed.id);
      const nextVaccine = getNextVaccinationForShed(shed.id);
      const openTasks = state.tasks.filter((task) => task.shedId === shed.id && !task.completed).length;
      const latestClimate = latestLog
        ? `${Number(latestLog.temperature).toFixed(1)}°C • ${formatNumber(latestLog.humidity)}%`
        : `${Number(shed.targetTemp).toFixed(1)}°C target • ${formatNumber(shed.targetHumidity)}% target`;
      const outputText =
        shed.type === "Layer"
          ? `${formatNumber(latestLog?.eggsCollected || 0)} eggs`
          : `${Number(latestLog?.avgWeight || 0).toFixed(2)} kg avg`;

      return `
        <article class="shed-card">
          <div class="card-topline">
            <div>
              <p class="eyebrow" style="color: var(--rust);">${escapeHtml(shed.type)}</p>
              <h4>${escapeHtml(shed.name)}</h4>
            </div>
            <span class="badge">${escapeHtml(shed.supervisor)}</span>
          </div>

          <div class="meter">
            <div class="card-row">
              <span>Occupancy</span>
              <strong>${occupancy.toFixed(1)}%</strong>
            </div>
            <div class="meter-track">
              <div class="meter-fill" style="width: ${Math.min(occupancy, 100).toFixed(1)}%;"></div>
            </div>
          </div>

          <div class="metric-grid">
            <div class="metric-box">
              <span>Birds</span>
              <strong>${formatNumber(shed.currentBirds)}</strong>
            </div>
            <div class="metric-box">
              <span>Age</span>
              <strong>${formatNumber(shed.ageDays)} days</strong>
            </div>
            <div class="metric-box">
              <span>Batch</span>
              <strong>${escapeHtml(shed.batchCode)}</strong>
            </div>
          </div>

          <div class="card-row">
            <span>Latest climate</span>
            <span class="meta-text">${escapeHtml(latestClimate)}</span>
          </div>
          <div class="card-row">
            <span>Latest output</span>
            <span class="meta-text">${escapeHtml(outputText)}</span>
          </div>
          <div class="card-row">
            <span>Next vaccine</span>
            <span class="meta-text">${nextVaccine ? formatDate(nextVaccine.dueDate) : "No schedule set"}</span>
          </div>
          <div class="card-row">
            <span>Open tasks</span>
            <span class="meta-text">${formatNumber(openTasks)}</span>
          </div>
          <p class="meta-text">${escapeHtml(shed.notes || "No special shed note recorded.")}</p>
        </article>
      `;
    })
    .join("");
}

function renderVaccinations() {
  if (!state.vaccinations.length) {
    elements.vaccinationTableBody.innerHTML = `<tr><td colspan="9"><div class="empty-state">Add the first vaccination record to start health tracking.</div></td></tr>`;
    return;
  }

  const sorted = [...state.vaccinations].sort((left, right) => compareDateStrings(left.dueDate, right.dueDate));

  elements.vaccinationTableBody.innerHTML = sorted
    .map((record) => {
      const shed = getShedById(record.shedId);
      const status = getVaccinationStatus(record);
      const actionButton = record.completedDate
        ? `<span class="meta-text">Done</span>`
        : `<button class="table-action" type="button" data-action="complete-vaccine" data-id="${record.id}">Mark complete</button>`;

      return `
        <tr>
          <td>${escapeHtml(shed?.name || "Farm")}</td>
          <td>${escapeHtml(record.disease)}</td>
          <td>${escapeHtml(record.vaccineName)}</td>
          <td>${escapeHtml(record.method)}</td>
          <td>${escapeHtml(record.dose)}</td>
          <td>${formatDate(record.dueDate)}</td>
          <td>${record.completedDate ? formatDate(record.completedDate) : "Pending"}</td>
          <td><span class="status-pill ${status.className}">${escapeHtml(status.label)}</span></td>
          <td>${actionButton}</td>
        </tr>
      `;
    })
    .join("");
}

function renderOperations() {
  renderOpsPulse();

  if (!state.dailyLogs.length) {
    elements.dailyLogTableBody.innerHTML = `<tr><td colspan="10"><div class="empty-state">Daily operational logs will appear here.</div></td></tr>`;
    return;
  }

  const sorted = [...state.dailyLogs].sort((left, right) => compareDateStrings(right.date, left.date));
  elements.dailyLogTableBody.innerHTML = sorted
    .map((log) => {
      const shed = getShedById(log.shedId);
      return `
        <tr>
          <td>${formatDate(log.date)}</td>
          <td>${escapeHtml(shed?.name || "Farm")}</td>
          <td>${formatNumber(log.openingBirds)} → ${formatNumber(log.closingBirds)}</td>
          <td>${formatNumber(log.mortality)}</td>
          <td>${Number(log.feedKg).toFixed(1)}</td>
          <td>${formatNumber(log.waterLiters)}</td>
          <td>${formatNumber(log.eggsCollected)}</td>
          <td>${Number(log.avgWeight).toFixed(2)}</td>
          <td>${Number(log.temperature).toFixed(1)}°C / ${formatNumber(log.humidity)}%</td>
          <td>${escapeHtml(log.notes || "No extra note")}</td>
        </tr>
      `;
    })
    .join("");
}

function renderOpsPulse() {
  const latestDate = getLatestLogDate();

  if (!latestDate) {
    elements.opsPulse.innerHTML = `<div class="empty-state">Add a daily log to unlock feed, water, egg, and mortality pulse cards.</div>`;
    return;
  }

  const dayLogs = state.dailyLogs.filter((log) => log.date === latestDate);
  const cards = [
    {
      label: `Feed on ${formatDate(latestDate)}`,
      value: `${sum(dayLogs.map((log) => Number(log.feedKg))).toFixed(1)} kg`,
      text: `${formatNumber(dayLogs.length)} shed logs recorded.`,
    },
    {
      label: "Water usage",
      value: `${formatNumber(sum(dayLogs.map((log) => Number(log.waterLiters))))} L`,
      text: "Track heat stress and line performance from this number.",
    },
    {
      label: "Egg collection",
      value: `${formatNumber(sum(dayLogs.map((log) => Number(log.eggsCollected))))}`,
      text: "Layer sheds contribute here while broilers stay at zero.",
    },
    {
      label: "Mortality",
      value: formatNumber(sum(dayLogs.map((log) => Number(log.mortality)))),
      text: "Check any sudden jump against climate and vaccine schedule.",
    },
  ];

  elements.opsPulse.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderInventory() {
  renderInventoryAlerts();

  if (!state.inventory.length) {
    elements.inventoryTableBody.innerHTML = `<tr><td colspan="8"><div class="empty-state">Inventory entries will appear here after you add stock lines.</div></td></tr>`;
    return;
  }

  const sorted = [...state.inventory].sort((left, right) => inventoryPriority(right) - inventoryPriority(left));

  elements.inventoryTableBody.innerHTML = sorted
    .map((item) => {
      const status = getInventoryStatus(item);
      return `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.category)}</td>
          <td>${formatNumber(item.quantity)} ${escapeHtml(item.unit)}</td>
          <td>${formatNumber(item.reorderLevel)} ${escapeHtml(item.unit)}</td>
          <td>${escapeHtml(item.supplier)}</td>
          <td>${item.expiryDate ? formatDate(item.expiryDate) : "N/A"}</td>
          <td>${formatCurrency(item.unitCost)}</td>
          <td><span class="status-pill ${status.className}">${escapeHtml(status.label)}</span></td>
        </tr>
      `;
    })
    .join("");
}

function renderInventoryAlerts() {
  const lowStock = getLowStockItems();
  const expiringSoon = state.inventory.filter((item) => isExpiringSoon(item.expiryDate));
  const cards = [];

  if (lowStock.length) {
    cards.push({
      label: "Reorder now",
      value: `${lowStock.length} items`,
      text: `${lowStock[0].name} is already at or below its reorder level.`,
    });
  }

  if (expiringSoon.length) {
    cards.push({
      label: "Expiry watch",
      value: `${expiringSoon.length} items`,
      text: `${expiringSoon[0].name} should be used or replaced soon.`,
    });
  }

  if (!cards.length) {
    cards.push({
      label: "Stock health",
      value: "Stable",
      text: "No urgent stock shortage or expiry pressure is active right now.",
    });
  }

  elements.inventoryAlerts.innerHTML = cards
    .map(
      (card) => `
        <article class="summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderTasks() {
  const totalTasks = state.tasks.length;
  const openTasks = state.tasks.filter((task) => !task.completed);
  const overdueTasks = openTasks.filter((task) => getTaskStatus(task).label === "Overdue");
  const dueToday = openTasks.filter((task) => getTaskStatus(task).label === "Due today");

  elements.taskSummary.innerHTML = [
    {
      label: "Open tasks",
      value: `${openTasks.length}`,
      text: "Active work items waiting on action.",
    },
    {
      label: "Overdue",
      value: `${overdueTasks.length}`,
      text: "Finish these first to reduce farm risk.",
    },
    {
      label: "Due today",
      value: `${dueToday.length}`,
      text: "Good list for the next farm round.",
    },
    {
      label: "Completed",
      value: `${totalTasks - openTasks.length}`,
      text: "Closed tasks stay visible for accountability.",
    },
  ]
    .map(
      (card) => `
        <article class="summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");

  if (!state.tasks.length) {
    elements.taskBoard.innerHTML = `<div class="empty-state">No tasks yet. Add your first biosecurity or maintenance task below.</div>`;
    return;
  }

  const sorted = [...state.tasks].sort((left, right) => taskPriority(right) - taskPriority(left));

  elements.taskBoard.innerHTML = sorted
    .map((task) => {
      const status = getTaskStatus(task);
      const shed = getShedById(task.shedId);
      return `
        <article class="task-card ${status.label === "Overdue" ? "is-overdue" : ""} ${
          task.completed ? "is-completed" : ""
        }">
          <div class="task-meta">
            <div>
              <span class="badge">${escapeHtml(task.priority)}</span>
              <h4>${escapeHtml(task.title)}</h4>
            </div>
            <span class="status-pill ${status.className}">${escapeHtml(status.label)}</span>
          </div>
          <p>${escapeHtml(task.notes || "No extra instruction added.")}</p>
          <div class="card-row">
            <span>Category</span>
            <span class="meta-text">${escapeHtml(task.category)}</span>
          </div>
          <div class="card-row">
            <span>Shed</span>
            <span class="meta-text">${escapeHtml(shed?.name || "Whole farm")}</span>
          </div>
          <div class="card-row">
            <span>Assigned to</span>
            <span class="meta-text">${escapeHtml(task.assignedTo)}</span>
          </div>
          <div class="card-row">
            <span>Due date</span>
            <span class="meta-text">${formatDate(task.dueDate)}</span>
          </div>
          <div class="task-actions">
            <button class="ghost-action" type="button" data-action="toggle-task" data-id="${task.id}">
              ${task.completed ? "Reopen" : "Mark done"}
            </button>
            <button class="ghost-action is-danger" type="button" data-action="delete-task" data-id="${task.id}">
              Delete
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderFinance() {
  const monthly = getMonthlyFinanceSummary();
  const expensePerBird = state.sheds.length ? monthly.expense / Math.max(sum(state.sheds.map((shed) => Number(shed.currentBirds))), 1) : 0;

  elements.financeSummary.innerHTML = [
    {
      label: "Monthly income",
      value: formatCurrency(monthly.income),
      text: "Sales and non-bird revenue recorded this month.",
    },
    {
      label: "Monthly expense",
      value: formatCurrency(monthly.expense),
      text: "Feed, medicine, labor, utility, and other running costs.",
    },
    {
      label: "Monthly net",
      value: formatCurrency(monthly.net),
      text: monthly.net >= 0 ? "Farm is cash-positive this month." : "Expenses are ahead of income this month.",
    },
    {
      label: "Expense per live bird",
      value: `${formatCurrency(expensePerBird)}`,
      text: "Quick efficiency view across current live bird strength.",
    },
  ]
    .map(
      (card) => `
        <article class="summary-card">
          <span>${escapeHtml(card.label)}</span>
          <strong>${escapeHtml(card.value)}</strong>
          <p>${escapeHtml(card.text)}</p>
        </article>
      `,
    )
    .join("");

  if (!state.finance.length) {
    elements.financeTableBody.innerHTML = `<tr><td colspan="7"><div class="empty-state">Add financial records to start revenue and cost tracking.</div></td></tr>`;
  } else {
    const sorted = [...state.finance].sort((left, right) => compareDateStrings(right.date, left.date));

    elements.financeTableBody.innerHTML = sorted
      .map((entry) => {
        const shed = getShedById(entry.shedId);
        return `
          <tr>
            <td>${formatDate(entry.date)}</td>
            <td>${escapeHtml(entry.type)}</td>
            <td>${escapeHtml(entry.category)}</td>
            <td>${escapeHtml(shed?.name || "Whole farm")}</td>
            <td>${escapeHtml(entry.counterparty)}</td>
            <td>${formatCurrency(entry.amount)}</td>
            <td>${escapeHtml(entry.notes || "No note")}</td>
          </tr>
        `;
      })
      .join("");
  }

  renderReportCards();
}

function renderReportCards() {
  if (!state.sheds.length) {
    elements.reportCards.innerHTML = `<div class="empty-state">Report cards unlock after at least one shed is added.</div>`;
    return;
  }

  elements.reportCards.innerHTML = state.sheds
    .map((shed) => {
      const latestLog = getLatestLogForShed(shed.id);
      const mortalityRate = getShedMortalityRate(shed.id);
      const occupancy = getOccupancyPercentage(shed);
      const nextVaccination = getNextVaccinationForShed(shed.id);
      const financeTotal = state.finance
        .filter((entry) => entry.shedId === shed.id)
        .reduce((total, entry) => total + (entry.type === "Income" ? Number(entry.amount) : -Number(entry.amount)), 0);
      const recommendation = getShedRecommendation(shed, latestLog, nextVaccination, occupancy, mortalityRate);

      return `
        <article class="report-card">
          <div class="report-meta">
            <div>
              <span class="badge">${escapeHtml(shed.type)}</span>
              <h4>${escapeHtml(shed.name)}</h4>
            </div>
            <span class="meta-text">${escapeHtml(shed.supervisor)}</span>
          </div>
          <div class="metric-grid">
            <div class="metric-box">
              <span>Occupancy</span>
              <strong>${occupancy.toFixed(1)}%</strong>
            </div>
            <div class="metric-box">
              <span>7-day mortality</span>
              <strong>${mortalityRate.toFixed(2)}%</strong>
            </div>
            <div class="metric-box">
              <span>Net cash</span>
              <strong>${formatCurrency(financeTotal)}</strong>
            </div>
          </div>
          <div class="report-highlight">
            <strong>${escapeHtml(recommendation.title)}</strong>
            <p>${escapeHtml(recommendation.text)}</p>
          </div>
          <div class="card-row">
            <span>Latest output</span>
            <span class="meta-text">${
              shed.type === "Layer"
                ? `${formatNumber(latestLog?.eggsCollected || 0)} eggs`
                : `${Number(latestLog?.avgWeight || 0).toFixed(2)} kg avg`
            }</span>
          </div>
          <div class="card-row">
            <span>Next vaccine</span>
            <span class="meta-text">${nextVaccination ? formatDate(nextVaccination.dueDate) : "No schedule set"}</span>
          </div>
        </article>
      `;
    })
    .join("");
}

function populateSelectors() {
  const shedOptions = state.sheds
    .map((shed) => `<option value="${escapeHtml(shed.id)}">${escapeHtml(shed.name)} (${escapeHtml(shed.type)})</option>`)
    .join("");

  setSelectOptions(elements.vaccShedId, shedOptions);
  setSelectOptions(elements.logShedId, shedOptions);
  setSelectOptions(elements.taskShedId, `<option value="">Whole farm</option>${shedOptions}`);
  setSelectOptions(elements.financeShedId, `<option value="">Whole farm</option>${shedOptions}`);
}

function setSelectOptions(select, html) {
  const currentValue = select.value;
  select.innerHTML = html || `<option value="">No sheds added</option>`;

  if ([...select.options].some((option) => option.value === currentValue)) {
    select.value = currentValue;
  }
}

function setDefaultFormValues() {
  const today = toInputDate(new Date());
  if (!elements.vaccDueDate.value) {
    elements.vaccDueDate.value = today;
  }
  if (!elements.logDateInput.value) {
    elements.logDateInput.value = today;
  }
  if (!elements.taskDueDate.value) {
    elements.taskDueDate.value = today;
  }
  if (!elements.financeDate.value) {
    elements.financeDate.value = today;
  }

  const placementDateInput = elements.shedForm.elements.namedItem("placementDate");
  if (placementDateInput instanceof HTMLInputElement && !placementDateInput.value) {
    placementDateInput.value = today;
  }

  if (state.sheds.length) {
    if (!elements.vaccShedId.value) {
      elements.vaccShedId.value = state.sheds[0].id;
    }
    if (!elements.logShedId.value) {
      elements.logShedId.value = state.sheds[0].id;
    }
    syncOpeningBirdsToSelectedShed();
  }
}

function fillFarmProfileForm() {
  elements.farmNameInput.value = state.farm.name || "";
  elements.ownerNameInput.value = state.farm.ownerName || "";
  elements.locationInput.value = state.farm.location || "";
  elements.contactInput.value = state.farm.contact || "";
  elements.farmNotesInput.value = state.farm.notes || "";
}

function updateLastSavedLabel() {
  elements.lastSavedLabel.textContent = `Last saved ${formatDateTime(state.savedAt)}`;
}

function handleFarmProfileSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.farmProfileForm);

  state.farm = {
    ...state.farm,
    name: String(formData.get("farmName") || "").trim(),
    ownerName: String(formData.get("ownerName") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    contact: String(formData.get("contact") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };

  commitState();
}

function handleShedSubmit(event) {
  event.preventDefault();
  const form = elements.shedForm;
  const formData = new FormData(form);

  const capacity = Number(formData.get("capacity"));
  const currentBirds = Number(formData.get("currentBirds"));

  if (currentBirds > capacity) {
    window.alert("Current birds cannot be more than shed capacity.");
    return;
  }

  state.sheds.push({
    id: createId("shed"),
    name: String(formData.get("name") || "").trim(),
    type: String(formData.get("type") || "Broiler").trim(),
    capacity,
    currentBirds,
    ageDays: Number(formData.get("ageDays")),
    breed: String(formData.get("breed") || "").trim(),
    batchCode: String(formData.get("batchCode") || "").trim(),
    supervisor: String(formData.get("supervisor") || "").trim(),
    placementDate: String(formData.get("placementDate") || ""),
    targetTemp: Number(formData.get("targetTemp")),
    targetHumidity: Number(formData.get("targetHumidity")),
    notes: String(formData.get("notes") || "").trim(),
  });

  form.reset();
  commitState();
  setDefaultFormValues();
}

function handleVaccinationSubmit(event) {
  event.preventDefault();
  const form = elements.vaccinationForm;
  const formData = new FormData(form);

  state.vaccinations.push({
    id: createId("vacc"),
    shedId: String(formData.get("shedId") || ""),
    disease: String(formData.get("disease") || "").trim(),
    vaccineName: String(formData.get("vaccineName") || "").trim(),
    method: String(formData.get("method") || "").trim(),
    dose: String(formData.get("dose") || "").trim(),
    batchNo: String(formData.get("batchNo") || "").trim(),
    dueDate: String(formData.get("dueDate") || ""),
    completedDate: String(formData.get("completedDate") || ""),
    technician: String(formData.get("technician") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  });

  form.reset();
  commitState();
  setDefaultFormValues();
}

function handleDailyLogSubmit(event) {
  event.preventDefault();
  const form = elements.dailyLogForm;
  const formData = new FormData(form);

  const openingBirds = Number(formData.get("openingBirds"));
  const mortality = Number(formData.get("mortality"));
  const culls = Number(formData.get("culls"));
  const closingBirds = openingBirds - mortality - culls;

  if (closingBirds < 0) {
    window.alert("Closing birds cannot be negative. Check opening birds, mortality, and culls.");
    return;
  }

  const newLog = {
    id: createId("log"),
    date: String(formData.get("date") || ""),
    shedId: String(formData.get("shedId") || ""),
    openingBirds,
    closingBirds,
    mortality,
    culls,
    feedKg: Number(formData.get("feedKg")),
    waterLiters: Number(formData.get("waterLiters")),
    eggsCollected: Number(formData.get("eggsCollected")),
    avgWeight: Number(formData.get("avgWeight")),
    temperature: Number(formData.get("temperature")),
    humidity: Number(formData.get("humidity")),
    medicine: String(formData.get("medicine") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
  };

  state.dailyLogs.push(newLog);
  syncShedBirdCountFromLog(newLog);

  form.reset();
  commitState();
  setDefaultFormValues();
}

function handleInventorySubmit(event) {
  event.preventDefault();
  const form = elements.inventoryForm;
  const formData = new FormData(form);

  state.inventory.push({
    id: createId("stock"),
    name: String(formData.get("name") || "").trim(),
    category: String(formData.get("category") || "").trim(),
    quantity: Number(formData.get("quantity")),
    unit: String(formData.get("unit") || "").trim(),
    reorderLevel: Number(formData.get("reorderLevel")),
    supplier: String(formData.get("supplier") || "").trim(),
    expiryDate: String(formData.get("expiryDate") || ""),
    unitCost: Number(formData.get("unitCost")),
  });

  form.reset();
  commitState();
}

function handleTaskSubmit(event) {
  event.preventDefault();
  const form = elements.taskForm;
  const formData = new FormData(form);

  state.tasks.push({
    id: createId("task"),
    title: String(formData.get("title") || "").trim(),
    shedId: String(formData.get("shedId") || ""),
    category: String(formData.get("category") || "").trim(),
    dueDate: String(formData.get("dueDate") || ""),
    priority: String(formData.get("priority") || "Medium").trim(),
    assignedTo: String(formData.get("assignedTo") || "").trim(),
    completed: false,
    notes: String(formData.get("notes") || "").trim(),
  });

  form.reset();
  commitState();
  setDefaultFormValues();
}

function handleFinanceSubmit(event) {
  event.preventDefault();
  const form = elements.financeForm;
  const formData = new FormData(form);

  state.finance.push({
    id: createId("fin"),
    date: String(formData.get("date") || ""),
    type: String(formData.get("type") || "Expense").trim(),
    category: String(formData.get("category") || "").trim(),
    shedId: String(formData.get("shedId") || ""),
    counterparty: String(formData.get("counterparty") || "").trim(),
    amount: Number(formData.get("amount")),
    notes: String(formData.get("notes") || "").trim(),
  });

  form.reset();
  commitState();
  setDefaultFormValues();
}

function syncOpeningBirdsToSelectedShed() {
  const shed = getShedById(elements.logShedId.value);
  if (shed) {
    elements.logOpeningBirds.value = String(shed.currentBirds);
  }
}

function markVaccinationComplete(id) {
  const record = state.vaccinations.find((vaccination) => vaccination.id === id);
  if (!record) {
    return;
  }

  record.completedDate = toInputDate(new Date());
  commitState();
}

function toggleTaskCompletion(id) {
  const task = state.tasks.find((entry) => entry.id === id);
  if (!task) {
    return;
  }

  task.completed = !task.completed;
  commitState();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((task) => task.id !== id);
  commitState();
}

function syncShedBirdCountFromLog(log) {
  const shed = getShedById(log.shedId);
  if (!shed) {
    return;
  }

  const latestOtherLog = [...state.dailyLogs]
    .filter((entry) => entry.shedId === log.shedId && entry.id !== log.id)
    .sort((left, right) => compareDateStrings(right.date, left.date))[0];

  if (!latestOtherLog || compareDateStrings(log.date, latestOtherLog.date) >= 0) {
    shed.currentBirds = log.closingBirds;
  }
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `poultry-farm-backup-${toInputDate(new Date())}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  file
    .text()
    .then((content) => {
      const parsed = JSON.parse(content);
      state = normalizeState(parsed);
      commitState();
    })
    .catch(() => {
      window.alert("This file could not be imported. Please choose a valid JSON backup.");
    })
    .finally(() => {
      elements.importDataInput.value = "";
    });
}

function resetToSeedData() {
  const shouldReset = window.confirm("Reset the app back to the demo poultry farm data?");
  if (!shouldReset) {
    return;
  }

  state = normalizeState(getSeedData());
  commitState();
}

function commitState() {
  state.savedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderApp();
}

function getFarmAlerts() {
  const alerts = [];
  const dueVaccinations = getDueVaccinations();
  const overdueVaccinations = dueVaccinations.filter((record) => getVaccinationStatus(record).label === "Overdue");
  const lowStock = getLowStockItems();
  const overdueTasks = state.tasks.filter((task) => !task.completed && getTaskStatus(task).label === "Overdue");
  const crowdedSheds = state.sheds.filter((shed) => getOccupancyPercentage(shed) >= 95);
  const mortalityHotspots = state.sheds
    .map((shed) => ({ shed, rate: getLatestMortalityPercentForShed(shed.id) }))
    .filter((entry) => entry.rate > 0.25)
    .sort((left, right) => right.rate - left.rate);

  overdueVaccinations.forEach((record) => {
    const shed = getShedById(record.shedId);
    alerts.push({
      title: `Overdue vaccine in ${shed?.name || "farm"}`,
      text: `${record.disease} (${record.vaccineName}) missed its planned date of ${formatDate(record.dueDate)}.`,
      tone: "danger",
    });
  });

  dueVaccinations
    .filter((record) => getVaccinationStatus(record).label === "Due soon")
    .slice(0, 2)
    .forEach((record) => {
      const shed = getShedById(record.shedId);
      alerts.push({
        title: `Vaccination due soon in ${shed?.name || "farm"}`,
        text: `${record.vaccineName} is due on ${formatDate(record.dueDate)}. Prepare clean lines, staff, and stock today.`,
        tone: "warning",
      });
    });

  lowStock.slice(0, 2).forEach((item) => {
    alerts.push({
      title: `Low stock: ${item.name}`,
      text: `${formatNumber(item.quantity)} ${item.unit} left against reorder level ${formatNumber(item.reorderLevel)} ${item.unit}.`,
      tone: "danger",
    });
  });

  overdueTasks.slice(0, 2).forEach((task) => {
    const shed = getShedById(task.shedId);
    alerts.push({
      title: `Overdue task: ${task.title}`,
      text: `${shed?.name || "Whole farm"} work was due on ${formatDate(task.dueDate)} and is still open.`,
      tone: "warning",
    });
  });

  crowdedSheds.slice(0, 1).forEach((shed) => {
    alerts.push({
      title: `${shed.name} is close to full capacity`,
      text: `${getOccupancyPercentage(shed).toFixed(1)}% occupancy. Watch airflow, litter condition, and movement planning.`,
      tone: "warning",
    });
  });

  mortalityHotspots.slice(0, 1).forEach((entry) => {
    alerts.push({
      title: `Mortality watch in ${entry.shed.name}`,
      text: `${entry.rate.toFixed(2)}% loss in the latest log. Recheck climate, water, and disease pressure.`,
      tone: "warning",
    });
  });

  return alerts.slice(0, 6);
}

function getRecentActivities() {
  const activities = [];

  state.dailyLogs.forEach((log) => {
    const shed = getShedById(log.shedId);
    activities.push({
      date: log.date,
      title: `${shed?.name || "Farm"} daily log`,
      text:
        shed?.type === "Layer"
          ? `${formatNumber(log.eggsCollected)} eggs, ${formatNumber(log.mortality)} mortality, ${Number(log.feedKg).toFixed(1)} kg feed.`
          : `${Number(log.avgWeight).toFixed(2)} kg average weight, ${formatNumber(log.mortality)} mortality, ${Number(log.feedKg).toFixed(
              1,
            )} kg feed.`,
    });
  });

  state.vaccinations.forEach((record) => {
    const shed = getShedById(record.shedId);
    activities.push({
      date: record.completedDate || record.dueDate,
      title: `${shed?.name || "Farm"} vaccination`,
      text: record.completedDate
        ? `${record.vaccineName} completed for ${record.disease}.`
        : `${record.vaccineName} scheduled for ${record.disease}.`,
    });
  });

  state.tasks.forEach((task) => {
    const shed = getShedById(task.shedId);
    activities.push({
      date: task.dueDate,
      title: `${task.completed ? "Completed" : "Open"} task in ${shed?.name || "farm"}`,
      text: `${task.title} assigned to ${task.assignedTo}.`,
    });
  });

  state.finance.forEach((entry) => {
    activities.push({
      date: entry.date,
      title: `${entry.type}: ${entry.category}`,
      text: `${formatCurrency(entry.amount)} with ${entry.counterparty}.`,
    });
  });

  return activities.sort((left, right) => compareDateStrings(right.date, left.date));
}

function getDueVaccinations() {
  return state.vaccinations.filter((record) => {
    const status = getVaccinationStatus(record);
    return status.label === "Overdue" || status.label === "Due soon";
  });
}

function getLowStockItems() {
  return state.inventory.filter((item) => Number(item.quantity) <= Number(item.reorderLevel));
}

function getMonthlyFinanceSummary() {
  const today = new Date();
  let income = 0;
  let expense = 0;

  state.finance.forEach((entry) => {
    if (!isInCurrentMonth(entry.date, today)) {
      return;
    }

    if (entry.type === "Income") {
      income += Number(entry.amount);
    } else {
      expense += Number(entry.amount);
    }
  });

  return {
    income,
    expense,
    net: income - expense,
  };
}

function getRecentMortalityRate() {
  const recentLogs = state.dailyLogs.filter((log) => getDaysFromToday(log.date) <= 6 && getDaysFromToday(log.date) >= 0);
  if (!recentLogs.length) {
    return 0;
  }

  const losses = sum(recentLogs.map((log) => Number(log.mortality)));
  const baseBirds = sum(state.sheds.map((shed) => Number(shed.currentBirds)));
  return baseBirds ? (losses / baseBirds) * 100 : 0;
}

function getBirdMixText() {
  const broilers = state.sheds
    .filter((shed) => shed.type === "Broiler")
    .reduce((total, shed) => total + Number(shed.currentBirds), 0);
  const layers = state.sheds
    .filter((shed) => shed.type === "Layer")
    .reduce((total, shed) => total + Number(shed.currentBirds), 0);
  const breeders = state.sheds
    .filter((shed) => shed.type === "Breeder")
    .reduce((total, shed) => total + Number(shed.currentBirds), 0);

  const parts = [];
  if (broilers) {
    parts.push(`${formatNumber(broilers)} broilers`);
  }
  if (layers) {
    parts.push(`${formatNumber(layers)} layers`);
  }
  if (breeders) {
    parts.push(`${formatNumber(breeders)} breeders`);
  }

  return parts.length ? `Current mix: ${parts.join(" • ")}.` : "No birds recorded yet.";
}

function getShedRecommendation(shed, latestLog, nextVaccination, occupancy, mortalityRate) {
  if (nextVaccination && getVaccinationStatus(nextVaccination).label === "Overdue") {
    return {
      title: "Complete overdue vaccination",
      text: `${nextVaccination.disease} dose is overdue. Prioritize this shed before the next routine round.`,
    };
  }

  if (occupancy >= 95) {
    return {
      title: "Watch crowding and airflow",
      text: "The shed is close to full capacity. Give extra attention to ventilation, litter moisture, and movement stress.",
    };
  }

  if (mortalityRate > 0.15) {
    return {
      title: "Recheck loss trend",
      text: "Recent losses are elevated. Compare feed intake, water consumption, and vaccine coverage.",
    };
  }

  if (shed.type === "Layer" && Number(latestLog?.eggsCollected || 0) < shed.currentBirds * 0.88) {
    return {
      title: "Review laying efficiency",
      text: "Egg output is a little soft against bird strength. Inspect lighting, shell quality, and feed quality.",
    };
  }

  return {
    title: "Shed is operating steadily",
    text: "Keep routine checks going and use the next farm round to confirm climate, water line, and bird behavior.",
  };
}

function getShedMortalityRate(shedId) {
  const logs = state.dailyLogs.filter((log) => log.shedId === shedId && getDaysFromToday(log.date) <= 6 && getDaysFromToday(log.date) >= 0);
  const shed = getShedById(shedId);
  if (!logs.length || !shed) {
    return 0;
  }
  return (sum(logs.map((log) => Number(log.mortality))) / Math.max(Number(shed.currentBirds), 1)) * 100;
}

function getLatestMortalityPercentForShed(shedId) {
  const latestLog = getLatestLogForShed(shedId);
  if (!latestLog) {
    return 0;
  }

  return latestLog.openingBirds ? (Number(latestLog.mortality) / Number(latestLog.openingBirds)) * 100 : 0;
}

function getNextVaccinationForShed(shedId) {
  return [...state.vaccinations]
    .filter((record) => record.shedId === shedId && !record.completedDate)
    .sort((left, right) => compareDateStrings(left.dueDate, right.dueDate))[0];
}

function getVaccinationStatus(record) {
  if (record.completedDate) {
    return { label: "Completed", className: "is-completed" };
  }

  const daysFromToday = getDaysFromToday(record.dueDate);
  if (daysFromToday < 0) {
    return { label: "Overdue", className: "is-overdue" };
  }
  if (daysFromToday <= 7) {
    return { label: "Due soon", className: "is-due" };
  }

  return { label: "Scheduled", className: "is-scheduled" };
}

function getTaskStatus(task) {
  if (task.completed) {
    return { label: "Completed", className: "is-completed" };
  }

  const daysFromToday = getDaysFromToday(task.dueDate);
  if (daysFromToday < 0) {
    return { label: "Overdue", className: "is-overdue" };
  }
  if (daysFromToday === 0) {
    return { label: "Due today", className: "is-due" };
  }

  return { label: "Upcoming", className: "is-scheduled" };
}

function getInventoryStatus(item) {
  if (Number(item.quantity) <= Number(item.reorderLevel)) {
    return { label: "Reorder now", className: "is-overdue" };
  }

  if (isExpiringSoon(item.expiryDate)) {
    return { label: "Expiry near", className: "is-due" };
  }

  return { label: "Healthy", className: "is-completed" };
}

function inventoryPriority(item) {
  const status = getInventoryStatus(item);
  if (status.label === "Reorder now") {
    return 3;
  }
  if (status.label === "Expiry near") {
    return 2;
  }
  return 1;
}

function taskPriority(task) {
  let score = 0;
  const status = getTaskStatus(task);

  if (!task.completed && task.priority === "High") {
    score += 4;
  }
  if (!task.completed && status.label === "Overdue") {
    score += 3;
  }
  if (!task.completed && status.label === "Due today") {
    score += 2;
  }
  if (!task.completed) {
    score += 1;
  }

  return score;
}

function getOccupancyPercentage(shed) {
  const capacity = Number(shed.capacity);
  return capacity ? (Number(shed.currentBirds) / capacity) * 100 : 0;
}

function getLatestLogForShed(shedId) {
  return [...state.dailyLogs]
    .filter((log) => log.shedId === shedId)
    .sort((left, right) => compareDateStrings(right.date, left.date))[0];
}

function getLatestLogDate() {
  return [...state.dailyLogs]
    .map((log) => log.date)
    .sort((left, right) => compareDateStrings(right, left))[0];
}

function getShedById(id) {
  return state.sheds.find((shed) => shed.id === id);
}

function isExpiringSoon(dateString) {
  if (!dateString) {
    return false;
  }

  const daysFromToday = getDaysFromToday(dateString);
  return daysFromToday >= 0 && daysFromToday <= 30;
}

function isInCurrentMonth(dateString, referenceDate) {
  const date = parseDate(dateString);
  if (!date) {
    return false;
  }
  return date.getMonth() === referenceDate.getMonth() && date.getFullYear() === referenceDate.getFullYear();
}

function getDaysFromToday(dateString) {
  const date = parseDate(dateString);
  if (!date) {
    return Number.POSITIVE_INFINITY;
  }

  const today = startOfDay(new Date());
  return Math.round((date.getTime() - today.getTime()) / 86400000);
}

function compareDateStrings(left, right) {
  const leftDate = parseDate(left);
  const rightDate = parseDate(right);
  if (!leftDate && !rightDate) {
    return 0;
  }
  if (!leftDate) {
    return -1;
  }
  if (!rightDate) {
    return 1;
  }
  return leftDate.getTime() - rightDate.getTime();
}

function parseDate(value) {
  if (!value) {
    return null;
  }

  const [year, month, day] = String(value)
    .split("-")
    .map((part) => Number(part));

  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function toInputDate(date) {
  const safeDate = startOfDay(date);
  const year = safeDate.getFullYear();
  const month = `${safeDate.getMonth() + 1}`.padStart(2, "0");
  const day = `${safeDate.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function formatDate(dateString) {
  const date = parseDate(dateString);
  if (!date) {
    return "N/A";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatDateTime(value) {
  const date = value ? new Date(value) : new Date();
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Number(value) || 0);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
