import {Label} from "./label";

export interface Title {
  id: number
  name: string
  gemaNr: string
  bpm: number
  releaseDate: Date
  visible: boolean
  cover?: Blob
  label: Label
}
