import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) { }
  title = 'BlazingNews';
  newsSource: object;
  loading: boolean;
  newsKeys: Array<string>;
  keyNews: Array<object>;
  tabIndex: number;
  sourceMappings = {
    'all': 'International', 'general': 'India',
    'business': 'Business', 'entertainment': 'Entertainment',
    'health': 'Health', 'science': 'Science',
    'technology': 'Technology', 'sport': 'Sports', 'offbeat': 'Offbeat'
  }
  sourcePlaceholder = this.sourceMappings.all;
  source = 'all'
  refMap = { "all": 0, "general": 1, "business": 2, "entertainment": 3, "health": 4, "science": 5, "technology": 6, "sport": 7, "offbeat": 8 };
  ngOnInit() {
    this.http.get("https://blazingnews-api.herokuapp.com/all").subscribe((res: Array<object>) => {
      for (var elem of res) {
        elem["show"] = false;
        if (elem["urlToImage"].includes("./img")) {
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/' + arr[2];
        }
      }
      this.newsSource = res;
    })
    this.fetchKeyNews(0);
  }

  getNews(source) {
    this.newsSource = null;
    this.loading = true;
    this.tabIndex = this.refMap[source];
    this.sourcePlaceholder = this.sourceMappings[source];
    this.source = source;
    this.fetchKeyNews(this.refMap[source]);
    this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    this.http.get("https://blazingnews-api.herokuapp.com/" + source).subscribe((res: Array<object>) => {
      for (var elem of res) {
        elem["show"] = false;
        if (elem["urlToImage"].includes("./img")) {
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/' + arr[2];
        }
      }
      this.newsSource = res;
      this.loading = false;
    })
  }
  getKeyNews(key: string) {
    let news = this.keyNews[this.tabIndex];
    let res = news[key];
    for (var elem of res) {
      elem["show"] = false;
      if (elem["urlToImage"].includes("./img")) {
        let arr = elem["urlToImage"].split("/");
        elem["urlToImage"] = './assets/img/' + arr[2];
      }
    }
    this.newsSource = res;
  }
  fetchKeyNews(index) {
    this.http.get("https://blazingnews-api.herokuapp.com/keyNews").subscribe((res: Array<object>) => {
      this.keyNews = res;
      this.tabIndex = index;
      this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    })
  }
  refreshNews() {
    this.getNews(this.source);
  }
}
