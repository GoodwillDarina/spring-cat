import { setupSakura } from './sakura.ts';

document.querySelector<HTMLElement>('#currentYear')!.innerHTML = `${new Date().getFullYear()}`;

setupSakura();

const TIMEOUT_MS = 5000;
const timeoutId = setTimeout(() => {
  const toast = document.getElementById('toast');
	toast!.classList.add('visible');
}, TIMEOUT_MS);

const persik = document.querySelector<HTMLElement>('#persik');
persik!.addEventListener('click', soundPlay);

function soundPlay () {
  clearTimeout(timeoutId);

  (document.getElementById('sound') as HTMLAudioElement).play();
  persik!.removeEventListener('click', soundPlay);

  document.getElementById('toast')!.classList.remove('visible');

}
