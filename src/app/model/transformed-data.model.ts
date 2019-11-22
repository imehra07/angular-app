export class RecordLabelToBandMapping {
  recordLabel: string;
  bandToFestivalMapping: BandToFestivalMapping[] = [];
}
export class BandToFestivalMapping {
  bandName: string;
  festivalNames: string[] = [];
}
