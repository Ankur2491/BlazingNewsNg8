import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-smart-read',
  templateUrl: './smart-read.component.html',
  styleUrls: ['./smart-read.component.css']
})
export class SmartReadComponent implements OnInit {

  content = [];
  loading = true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('https://hnews-image.herokuapp.com/smartRead',{'url':this.data.url}).subscribe(res=>{
      this.content = res['smart'];
      this.loading = false;
    })
    // console.log(this.data);
  }

}
