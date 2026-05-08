// toutes les icones sont ici afin de pouvoir les importer facilement dans les composants qui en ont besoin
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiLock,
  mdiLockOpenVariant,
  mdiMenu,
  mdiPlay,
  mdiReplay,
  mdiStarFourPoints,
  mdiStarFourPointsBox,
  mdiStarFourPointsBoxOutline,
  mdiVolumeHigh,
  mdiVolumeOff,
} from '@mdi/js'

export const Icons = {
  ChevronLeft: mdiChevronLeft,
  ChevronRight: mdiChevronRight,
  Close: mdiClose,
  Lock: mdiLock,
  LockOpen: mdiLockOpenVariant,
  Menu: mdiMenu,
  MusicOn: mdiVolumeHigh,
  MusicOff: mdiVolumeOff,
  Play: mdiPlay,
  Replay: mdiReplay,
  StarFourPoints: mdiStarFourPoints,
  StarFourPointsBox: mdiStarFourPointsBox,
  StarFourPointsBoxOutline: mdiStarFourPointsBoxOutline,
} as const
