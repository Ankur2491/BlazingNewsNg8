import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-smart-read',
  templateUrl: './smart-read.component.html',
  styleUrls: ['./smart-read.component.css']
})
export class SmartReadComponent implements OnInit {

  content = [];
  loading = true;
  @Input() data: object;
  constructor(public activeModal: NgbActiveModal, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('https://hnews-image.herokuapp.com/smartRead', { 'url': this.data['url'] }).subscribe(res => {
      this.content = res['smart'];
      this.loading = false;
    })
    // console.log(this.data);
  }

}
