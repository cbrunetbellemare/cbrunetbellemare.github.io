// Lecteur musical global: une seule instance audio pour toute l'application.
import { readonly, ref } from 'vue'

const musicSource = '/musique/musique.mp3'
const mutedStorageKey = 'artbook.musicMuted'

const isMuted = ref(readStoredMutedState())

let audio: HTMLAudioElement | null = null
let isWaitingForInteraction = false

function readStoredMutedState() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(mutedStorageKey) === 'true'
}

function getAudio() {
  if (!audio) {
    // Créé à la demande pour éviter un chargement avant l'ouverture de l'app.
    audio = new Audio(musicSource)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0.7
    audio.muted = isMuted.value
  }

  return audio
}

function storeMutedState() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(mutedStorageKey, String(isMuted.value))
}

function startMusicAfterInteraction() {
  if (isWaitingForInteraction || typeof document === 'undefined') {
    return
  }

  // Les navigateurs bloquent souvent l'audio avant une interaction utilisateur.
  isWaitingForInteraction = true

  const startMusic = () => {
    document.removeEventListener('pointerdown', startMusic)
    document.removeEventListener('keydown', startMusic)
    isWaitingForInteraction = false
    void playMusic()
  }

  document.addEventListener('pointerdown', startMusic, { once: true })
  document.addEventListener('keydown', startMusic, { once: true })
}

async function playMusic() {
  const player = getAudio()

  if (!player.paused) {
    return
  }

  try {
    await player.play()
  } catch {
    // Repli silencieux si l'autoplay est refusé.
    startMusicAfterInteraction()
  }
}

function setMuted(nextMuted: boolean) {
  isMuted.value = nextMuted

  const player = getAudio()
  player.muted = nextMuted
  storeMutedState()

  if (!nextMuted) {
    void playMusic()
  }
}

export function useMusicPlayer() {
  function initializeMusic() {
    // Appelé par la barre du haut pour démarrer dès que possible.
    const player = getAudio()
    player.muted = isMuted.value
    void playMusic()
  }

  function toggleMute() {
    setMuted(!isMuted.value)
  }

  return {
    isMuted: readonly(isMuted),
    initializeMusic,
    toggleMute,
  }
}
