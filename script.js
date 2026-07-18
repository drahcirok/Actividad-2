const form = document.querySelector('#admissionForm');
const steps = [...document.querySelectorAll('.wizard-step')];
const nextButton = document.querySelector('#nextButton');
const backButton = document.querySelector('#backButton');
const submitButton = document.querySelector('#submitButton');
const progressBar = document.querySelector('#progressBar');
const stepCounter = document.querySelector('#stepCounter');
const stepTitle = document.querySelector('#stepTitle');
const toast = document.querySelector('#toast');
const titles = { 1: 'Datos personales', 2: 'Contacto', 3: 'Información médica', 4: 'Seguro médico', 5: 'Representante legal', summary: 'Confirmación' };
let currentStep = 1;

const input = (id) => document.getElementById(id);
const formatDate = (value) => value ? new Intl.DateTimeFormat('es-EC', { dateStyle: 'long' }).format(new Date(`${value}T12:00:00`)) : '—';

function calculateAge(value) {
  if (!value) return '';
  const birth = new Date(`${value}T12:00:00`), today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasNotHadBirthday = today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  return hasNotHadBirthday ? age - 1 : age;
}

function showFieldState(element, message = '') {
  const error = element.parentElement.querySelector('.error-message');
  element.classList.remove('field-error', 'field-valid');
  if (message) {
    element.classList.add('field-error');
    if (error) { error.textContent = message; error.classList.remove('hidden'); }
    return false;
  }
  if (element.value) element.classList.add('field-valid');
  if (error) error.classList.add('hidden');
  return true;
}

function validateField(element) {
  const value = element.value.trim();
  let message = '';
  if (element.id === 'patientId') {
    element.value = value.replace(/\D/g, '');
    if (!element.value) message = 'Ingrese el ID del paciente.';
  } else if (element.id === 'fullName' && !value) message = 'Ingrese el nombre completo.';
  else if (element.id === 'birthDate') {
    if (!value) message = 'Seleccione la fecha de nacimiento.';
    else if (new Date(`${value}T12:00:00`) > new Date()) message = 'La fecha no puede ser futura.';
  } else if (element.id === 'email') {
    if (!value) message = 'Ingrese el correo electrónico.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = 'Ingrese un correo válido.';
  } else if (['phone', 'representativePhone'].includes(element.id)) {
    element.value = value.replace(/\D/g, '');
    if (!element.value) message = 'Ingrese un número de teléfono.';
    else if (element.value.length < 7) message = 'Ingrese un teléfono válido.';
  } else if (element.id === 'policyNumber' && selectedInsurance() === 'Sí' && !value) message = 'Ingrese el número de póliza.';
  else if (element.id === 'insurer' && selectedInsurance() === 'Sí' && !value) message = 'Ingrese la aseguradora.';
  else if (element.id === 'representativeName' && isMinor() && !value) message = 'Ingrese el nombre del representante.';
  else if (element.required && !value) message = 'Este campo es obligatorio.';
  return showFieldState(element, message);
}

function selectedInsurance() { return form.querySelector('input[name="hasInsurance"]:checked')?.value || ''; }
function isMinor() { const age = calculateAge(input('birthDate').value); return age !== '' && age < 18; }

function validateStep(step) {
  let valid = true;
  const section = step === 'summary' ? null : document.querySelector(`[data-step="${step}"]`);
  if (step === 4 && !selectedInsurance()) {
    const error = input('insuranceError'); error.textContent = 'Seleccione una opción para continuar.'; error.classList.remove('hidden'); valid = false;
  } else if (step === 4) input('insuranceError').classList.add('hidden');
  if (section) section.querySelectorAll('input:not([readonly]), select').forEach((element) => {
    if (element.type !== 'radio' && !validateField(element)) valid = false;
  });
  return valid;
}

function updateInsuranceFields() {
  const fields = input('insuranceFields'), insured = selectedInsurance() === 'Sí';
  fields.classList.toggle('max-h-0', !insured); fields.classList.toggle('opacity-0', !insured);
  fields.classList.toggle('mt-5', insured); fields.classList.toggle('max-h-64', insured); fields.classList.toggle('opacity-100', insured);
  fields.setAttribute('aria-hidden', String(!insured));
  if (!insured) ['insurer', 'policyNumber'].forEach((id) => { input(id).value = ''; showFieldState(input(id)); });
}

function activeFlow() { return isMinor() ? [1, 2, 3, 4, 5, 'summary'] : [1, 2, 3, 4, 'summary']; }

function renderSummary() {
  const data = [
    ['Datos personales', [['ID del paciente', input('patientId').value], ['Nombre completo', input('fullName').value], ['Fecha de nacimiento', formatDate(input('birthDate').value)], ['Edad', `${input('age').value} años`], ['Género', input('gender').value]]],
    ['Contacto', [['Correo electrónico', input('email').value], ['Teléfono', input('phone').value], ['Dirección', input('address').value], ['País', input('country').value]]],
    ['Información médica', [['Tipo de sangre', input('bloodType').value], ['Motivo de consulta', input('consultationReason').value], ['Fecha de ingreso', formatDate(input('admissionDate').value)], ['Hora de ingreso', input('admissionTime').value]]],
    ['Seguro médico', [['Cobertura', selectedInsurance()], ...(selectedInsurance() === 'Sí' ? [['Aseguradora', input('insurer').value], ['N.º de póliza', input('policyNumber').value]] : [])]],
  ];
  if (isMinor()) data.push(['Representante legal', [['Nombre completo', input('representativeName').value], ['Teléfono', input('representativePhone').value]]]);
  input('summaryContent').innerHTML = data.map(([title, rows]) => `<div class="rounded-xl border border-slate-200"><h3 class="border-b border-slate-100 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800">${title}</h3><dl class="divide-y divide-slate-100">${rows.map(([label, value]) => `<div class="grid gap-1 px-4 py-3 sm:grid-cols-2"><dt class="text-xs font-medium text-slate-500">${label}</dt><dd class="text-sm font-semibold text-slate-700">${value || '—'}</dd></div>`).join('')}</dl></div>`).join('');
}

function updateWizard() {
  const flow = activeFlow(), index = flow.indexOf(currentStep), total = flow.length - 1;
  steps.forEach((step) => step.classList.toggle('active', String(step.dataset.step) === String(currentStep)));
  if (currentStep === 'summary') renderSummary();
  stepCounter.textContent = currentStep === 'summary' ? 'Resumen final' : `Paso ${index + 1} de ${total}`;
  stepTitle.textContent = titles[currentStep];
  progressBar.style.width = `${Math.round(((index + 1) / flow.length) * 100)}%`;
  backButton.classList.toggle('invisible', index === 0);
  nextButton.classList.toggle('hidden', currentStep === 'summary'); submitButton.classList.toggle('hidden', currentStep !== 'summary');
  document.querySelectorAll('.progress-item').forEach((item) => {
    const itemStep = Number(item.dataset.step), completed = currentStep === 'summary' || itemStep < currentStep, active = itemStep === currentStep;
    item.classList.toggle('text-blue-300', !completed && !active); item.classList.toggle('text-white', completed || active);
    const dot = item.querySelector('.step-dot'); dot.className = `step-dot grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${completed || active ? 'bg-white text-clinic-700' : 'border border-blue-400'}`;
    if (completed && !active) dot.innerHTML = '✓';
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message, success = true) {
  toast.textContent = message; toast.className = `pointer-events-none fixed bottom-5 right-5 z-50 rounded-xl px-5 py-4 text-sm font-medium text-white shadow-xl transition-all duration-300 ${success ? 'bg-emerald-600' : 'bg-red-600'} opacity-100 translate-y-0`;
  setTimeout(() => { toast.classList.add('opacity-0', 'translate-y-4'); }, 3500);
}

function initializeDateTime() {
  const now = new Date();
  input('admissionDate').value = now.toISOString().slice(0, 10);
  input('admissionTime').value = now.toTimeString().slice(0, 5);
  input('birthDate').max = now.toISOString().slice(0, 10);
}

form.querySelectorAll('input:not([readonly]), select').forEach((element) => {
  element.addEventListener('input', () => { if (element.id === 'birthDate') input('age').value = calculateAge(element.value); validateField(element); });
  element.addEventListener('change', () => { if (element.name === 'hasInsurance') updateInsuranceFields(); if (element.id === 'birthDate') input('age').value = calculateAge(element.value); validateField(element); });
  element.addEventListener('blur', () => validateField(element));
});

nextButton.addEventListener('click', () => { if (!validateStep(currentStep)) { showToast('Revise los campos marcados antes de continuar.', false); return; } const flow = activeFlow(); currentStep = flow[flow.indexOf(currentStep) + 1]; updateWizard(); });
backButton.addEventListener('click', () => { const flow = activeFlow(); currentStep = flow[flow.indexOf(currentStep) - 1]; updateWizard(); });
form.addEventListener('submit', (event) => { event.preventDefault(); const flow = activeFlow(); const valid = flow.filter((step) => step !== 'summary').every(validateStep); if (!valid) { showToast('Hay información pendiente por completar.', false); return; } showToast('Paciente registrado correctamente'); form.reset(); initializeDateTime(); currentStep = 1; updateInsuranceFields(); document.querySelectorAll('.field-input').forEach((element) => element.classList.remove('field-error', 'field-valid')); document.querySelectorAll('.error-message').forEach((element) => element.classList.add('hidden')); updateWizard(); });

initializeDateTime();
updateWizard();
