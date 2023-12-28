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
    this.http.post('https://summariser-js.onrender.com/smartRead', { 'url': this.data['url'] }).subscribe(res:any => {
      this.content = res;
      this.loading = false;
    })
    // console.log(this.data);
  }

}
