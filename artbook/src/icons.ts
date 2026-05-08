import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiLock,
  mdiLockOpenVariant,
  mdiPlay,
  mdiReplay,
  mdiStarFourPoints,
  mdiStarFourPointsBox,
  mdiStarFourPointsBoxOutline,
  mdiVolumeHigh,
  mdiVolumeOff,
} from '@mdi/js'

// Regroupe toutes les icônes Material Design utilisées dans l'interface.
// Cela évite de réimporter les chemins SVG dans chaque composant.
export const Icons = {
  ChevronLeft: mdiChevronLeft,
  ChevronRight: mdiChevronRight,
  Close: mdiClose,
  Lock: mdiLock,
  LockOpen: mdiLockOpenVariant,
  MusicOn: mdiVolumeHigh,
  MusicOff: mdiVolumeOff,
  Play: mdiPlay,
  Replay: mdiReplay,
  StarFourPoints: mdiStarFourPoints,
  StarFourPointsBox: mdiStarFourPointsBox,
  StarFourPointsBoxOutline: mdiStarFourPointsBoxOutline,
} as const
