import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
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
  todaysTime;
  backgroundImg = "";
  quoteObj = {'quote': '','author': ''};
  jokeObj = {'joke': ''};
  showKeyNews = true
  showQuote = false
  showJoke = false
  sourceMappings = {
    'all': 'International', 'general': 'India',
    'business': 'Business', 'entertainment': 'Entertainment',
    'health': 'Health', 'science': 'Science',
    'technology': 'Technology', 'sport': 'Sports', 'offbeat': 'Offbeat'
  }
  sourcePlaceholder = this.sourceMappings.all;
  source = 'all'
  refMap = { "all": 0, "general": 1, "business": 2, "entertainment": 3, "health": 4, "science": 5, "technology": 6, "sport": 7, "offbeat": 8 };
  today: number = Date.now();
  ngOnInit() {
    this.http.get("https://blazingnews-api.herokuapp.com/all").subscribe((res: Array<object>) => {
      for (var elem of res) {
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0,elem['title'].indexOf('(s'));
        elem["show"] = false;
        if (elem["urlToImage"].includes("./img")) {
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/' + arr[2];
        }
      }
      this.newsSource = res;
    })
    this.http.get('https://blazingnews-api.herokuapp.com/backImg').subscribe(res=>{
      this.backgroundImg = `https://www.bing.com${res['url']}`;
    })
    this.fetchKeyNews(0);
    setInterval(()=>{
      this.todaysTime = Date.now();
    },10)
  }

  getNews(source) {
    this.showKeyNews = true;
    this.newsSource = null;
    this.loading = true;
    this.tabIndex = this.refMap[source];
    this.sourcePlaceholder = this.sourceMappings[source];
    this.source = source;
    this.fetchKeyNews(this.refMap[source]);
    this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    this.http.get("https://blazingnews-api.herokuapp.com/" + source).subscribe((res: Array<object>) => {
      for (var elem of res) {
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0,elem['title'].indexOf('(s'));
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

  getQuote(){
    this.showQuote = true
    this.showJoke = false
    this.showKeyNews = false;
    this.newsSource = null;
    this.http.get('https://favqs.com/api/qotd').subscribe(data=>{
      this.quoteObj.quote = data['quote']['body']
      this.quoteObj.author = data['quote']['author']
      console.log(this.quoteObj)
    })
  }

  getJoke(){
    this.showQuote = false
    this.showJoke = true
    this.showKeyNews = false
    this.newsSource = null
    this.http.get('https://blazingnews-api.herokuapp.com/joke').subscribe(data=>{
     this.jokeObj.joke = data['joke']
    })
  }
}
