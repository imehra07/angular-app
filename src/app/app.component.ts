import {Component, OnInit} from '@angular/core';
import {DataService} from './service/data.service';
import {RecordLabelToBandMapping} from './model/transformed-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  transformedData: RecordLabelToBandMapping[] = [];

  constructor(private dataService: DataService) {
  }
  ngOnInit(): void {
    this.dataService.findAll().subscribe(res => {
      this.transformedData = res;
    });
  }
  isEmpty(str: string): boolean {
    return (!str || str.length ===  0 || str.trim().length === 0);
  }

}
