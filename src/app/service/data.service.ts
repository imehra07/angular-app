import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResponseDataModel} from '../model/response-data.model';
import {Observable, throwError} from 'rxjs';
import {URL_CONFIG} from '../config/url.config';
import {catchError, map} from 'rxjs/operators';
import _ from 'lodash';
import {BandToFestivalMapping, RecordLabelToBandMapping} from '../model/transformed-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {
  }
  public findAll(): Observable<RecordLabelToBandMapping[]> {
    const url = URL_CONFIG.FIND_ALL;
    return this.http.get<ResponseDataModel[]>(url).pipe(
      map(res => this.transformData(res)),
      catchError(error => throwError(error.message || error))
    );
  }

  /**
   * maps response to an array of RecordLabelToBandMapping for display
   * @param response - response received with festivals as the root
   */
  private transformData(response: ResponseDataModel[]): RecordLabelToBandMapping[] {
    const transformedData: RecordLabelToBandMapping[] = [];
    _.forEach(response, festivals => {
      if (festivals.bands && festivals.bands.length > 0) {
        _.forEach(festivals.bands, band => {
            const recordlabel: RecordLabelToBandMapping = this.findRecordLabel(transformedData, band.recordLabel);
            if (!recordlabel) {
              const bandFestivalMap = this.createBandToFestivalMapping(band.name, festivals.name);
              const recordLabelToBandMapping = this.createRecordtoBandMapping(band.recordLabel, bandFestivalMap);
              this.pushAndSort(transformedData, recordLabelToBandMapping, 'recordLabel');
            } else {
              const bandToFestivalMapping = this.findBandToFestivalMapping(recordlabel, band.name);
              if (!bandToFestivalMapping) {
                const bandFestivalMap = this.createBandToFestivalMapping(band.name, festivals.name);
                this.pushAndSort(recordlabel.bandToFestivalMapping, bandFestivalMap, 'bandName');
              } else {
                this.pushAndSort(bandToFestivalMapping.festivalNames, festivals.name);
              }

            }
        });
      }
   });
    return transformedData;
 }

  /**
   * finds record label with a given name in the transformed data
   * @param transformedData - transformed data for display
   * @param recordLabelName - record label name to find
   */
  private findRecordLabel(transformedData: RecordLabelToBandMapping[], recordLabelName): RecordLabelToBandMapping {
    return transformedData.find(recordLabelMapping => recordLabelMapping.recordLabel === recordLabelName);
  }

  /**
   * finds a band mapping in a given record label
   * @param recordlabel - record label
   * @param bandName - band name to search for
   */
  private findBandToFestivalMapping(recordlabel: RecordLabelToBandMapping, bandName) {
    return recordlabel.bandToFestivalMapping.find(bandToFestMapping => bandToFestMapping.bandName === bandName);
  }

  /**
   * creates a record label and links it to a band-festival mapping.
   * @param recordLabelName - record label name
   * @param bandFestivalMap - mapping of band and festivals
   */
  private createRecordtoBandMapping(recordLabelName, bandFestivalMap: BandToFestivalMapping): RecordLabelToBandMapping {
    const recordLabelToBandMapping = new RecordLabelToBandMapping();
    recordLabelToBandMapping.recordLabel = recordLabelName;
    this.pushAndSort(recordLabelToBandMapping.bandToFestivalMapping, bandFestivalMap, 'bandName');
    return recordLabelToBandMapping;
  }

  /**
   * creates a mapping between a band and festival
   * @param bandName - band name
   * @param festivalName - festival name
   */
  private createBandToFestivalMapping(bandName: string, festivalName: string): BandToFestivalMapping {
    const bandFestivalMap = new BandToFestivalMapping();
    bandFestivalMap.bandName = bandName;
    if (!this.isEmpty(festivalName) && !bandFestivalMap.festivalNames.find(v => v === festivalName)) {
      this.pushAndSort(bandFestivalMap.festivalNames, festivalName);
    }
    return bandFestivalMap;
  }

  /**
   * finds an index within a sorted array for a given value
   * @param array - the sorted array
   * @param insertValue - new value to insert into a sorted array
   * @param sortProperty - property name by which to sort (optional)
   */
  private pushAndSort(array: any[], insertValue: any, sortProperty?: string) {
    if (!insertValue || !array) {
      return;
    }
    if (array.length === 0) {
      array.push(insertValue);
      return array;
    }
    let i = 0;
    if (sortProperty) {
    while (i < array.length && this.foundLowestIndex(array[i][sortProperty], insertValue[sortProperty])) {i++; }
    } else {
      while (i < array.length && this.foundLowestIndex(array[i], insertValue)) {i++; }
    }

    return array.splice(i, 0, insertValue);
  }

  /**
   * checks if a string is null or empty
   * @param str - string
   */
  private isEmpty(str: string): boolean {
    return (!str || str.length ===  0 || str.trim().length === 0);
  }

  /**
   * checks if val1 is less than val2.
   * If string, then case is ignored
   * @param val1 - value 1
   * @param val2 - value 2
   */
  private foundLowestIndex<V>(val1: V, val2: V) {
    if (typeof val1 === 'string' && typeof val2 === 'string') {
      return val1.toLowerCase() < val2.toLowerCase();
    } else {
      return val1 < val2;
    }
  }
}
