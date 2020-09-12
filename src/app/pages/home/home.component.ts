import { Component, OnInit } from '@angular/core';
import { ExampleService } from '@shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private exampleSrv: ExampleService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.exampleSrv.getData().subscribe((res) => {
      console.log('result', res);
    });
  }
}
