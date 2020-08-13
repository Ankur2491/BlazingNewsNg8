import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient){}
  title = 'BlazingNews';
  newsSource: object;
  loading: boolean;
  newsKeys: Array<string>;
  keyNews: Array<object>;
  tabIndex: number;
  refMap = {"all":0,"general":1,"business":2,"entertainment":3,"health":4,"science":5,"technology":6,"sport":7,"offbeat":8};
  ngOnInit(){
    this.http.get("https://blazingnews-api.herokuapp.com/all").subscribe((res: Array<object>)=>{
      for(var elem of res){
        elem["show"] = false;
        if(elem["urlToImage"].includes("./img")){
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/'+arr[2];
        }
      }
      this.newsSource = res;
    })
    this.http.get("https://blazingnews-api.herokuapp.com/keyNews").subscribe((res:Array<object>)=>{
      this.keyNews = res;
      this.tabIndex = 0;
      this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    })
  }

  getNews(source){
    this.newsSource = null;
    this.loading = true;
    this.tabIndex = this.refMap[source];
    this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    this.http.get("https://blazingnews-api.herokuapp.com/"+source).subscribe((res: Array<object>)=>{
      for(var elem of res){
        elem["show"] = false;
        if(elem["urlToImage"].includes("./img")){
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/'+arr[2];
        }
      }
      this.newsSource = res;
      this.loading = false;
    })
  }
  getKeyNews(key: string){
    let news = this.keyNews[this.tabIndex];
    this.newsSource = news[key];
  }
}
