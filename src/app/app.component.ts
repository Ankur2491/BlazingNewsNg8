import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SmartReadComponent } from './smart-read/smart-read.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @HostListener('window:scroll', ['$event']) 
   onScroll(event: Event): void {
     if(window.pageYOffset%20 == 0){
        this.newsIndex++;
        // console.log(this.newsIndex);
        this.loadedNews = this.newsSource[this.newsIndex];
     }
    // console.log(window.pageYOffset%100,this.newsIndex);
 }
  constructor(private http: HttpClient, private modalService: NgbModal) { }
  title = 'BlazingNews';
  newsSource: object;
  loading: boolean;
  newsKeys: Array<string>;
  keyNews: Array<object>;
  tabIndex: number;
  todaysTime;
  newsIndex = 1;
  indicator = 'all';
  keyNewsIndicator = false;
  backgroundImg = "";
  quoteObj = { 'quote': '', 'author': '' };
  jokeObj = { 'joke': '' };
  showKeyNews = true
  showQuote = false
  showJoke = false
  newsSrcBkp;
  loadedNews: object;
  imageMap = {};
  searchKey = '';
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
  twitterSelected: boolean = false;
  ngOnInit() {
    this.http.get("https://blazingnews-api.herokuapp.com/all").subscribe(async (res: Array<object>) => {
      for (var elem of res) {
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
        elem["show"] = false;
        if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/' + arr[2];
          let x = elem['url'].replaceAll(':', '_');
          x = x.replace(/#/g, '_');
          x = x.replace(/=/g, '_');
          elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');
        }
      }
      this.newsSource = res;
      this.newsSrcBkp = res;
      this.loadedNews = res[this.newsIndex];
    })
    // this.http.get('https://blazingnews-api.herokuapp.com/backImg').subscribe(res => {
    //   this.backgroundImg = `https://www.bing.com${res['url']}`;
    // })
    this.fetchKeyNews(0);
    setInterval(() => {
      this.todaysTime = Date.now();
    }, 10)
  }

  getNews(source) {
    if(source == "twitter"){
      this.twitterSelected = true;
      this.showKeyNews = false
      this.newsSource = null
      this.http.get('https://tech-blogs-aggregator-api.vercel.app/twitter/trending/relevancy').subscribe((resp: any)=>{
        let ns = [];  
        for(let ele of resp.data){
              let newsObj = {};
              newsObj['source'] = 'Twitter';
              newsObj['publishedAt'] = ele['created_at'];
              newsObj['title'] = '';
              newsObj['description'] = ele['text'];
              newsObj['urlToImage'] = 'https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg'
              ns.push(newsObj);
          }
        this.newsSource = ns;
    })
    }
    else{
    this.keyNewsIndicator = false;
    this.indicator = source;
    this.showKeyNews = true;
    this.newsSource = null;
    this.loading = true;
    this.searchKey = '';
    this.tabIndex = this.refMap[source];
    this.sourcePlaceholder = this.sourceMappings[source];
    this.source = source;
    this.twitterSelected = false;
    this.fetchKeyNews(this.refMap[source]);
    this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    this.http.get("https://blazingnews-api.herokuapp.com/" + source).subscribe(async (res: Array<object>) => {
      for (var elem of res) {
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
        elem["show"] = false;
        if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
          let arr = elem["urlToImage"].split("/");
          elem["urlToImage"] = './assets/img/' + arr[2];
          let x = elem['url'].replace(':', '_');
          x = x.replace(/#/g, '_');
          x = x.replace(/=/g, '_');
          elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');

        }
      }
      this.newsSource = res;
      this.newsSrcBkp = res;
      this.loading = false;
    })
  }
  }
  async getKeyNews(key: string) {
    this.keyNewsIndicator = true;
    let news = this.keyNews[this.tabIndex];
    let res = news[key];
    this.newsSource = [];
    for (var elem of res) {
      elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
      elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
      elem["show"] = false;
      if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
        let arr = elem["urlToImage"].split("/");
        elem["urlToImage"] = './assets/img/' + arr[2];
        let x = elem['url'].replace(':', '_');
        x = x.replace(/#/g, '_');
        x = x.replace(/=/g, '_');
        elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');
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

  getQuote() {
    this.showQuote = true
    this.showJoke = false
    this.showKeyNews = false;
    this.newsSource = null;
    this.http.get('https://favqs.com/api/qotd').subscribe(data => {
      this.quoteObj.quote = data['quote']['body']
      this.quoteObj.author = data['quote']['author']
      console.log(this.quoteObj)
    })
  }

  getJoke() {
    this.showQuote = false
    this.showJoke = true
    this.showKeyNews = false
    this.newsSource = null
    this.http.get('https://blazingnews-api.herokuapp.com/joke').subscribe(data => {
      this.jokeObj.joke = data['joke']
    })
  }
  searchKeyword(event) {
    let searchItem = event.target.value.toLowerCase();
    this.newsSource = this.newsSrcBkp.filter((item => {
      return item.title.toLowerCase().includes(searchItem)
    }))
  }


  getImage(url: string, x): Promise<any> {
    console.log(x);
    return this.http.post('https://hnews-image.herokuapp.com/image', { 'url': url }).toPromise();
  }

  openDialog(title, url, imgUrl) {
    // const dialogRef = this.dialog.open(SmartReadComponent, { data: { 'title': title, 'url': url } });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
    console.log(imgUrl);
    const modalRef = this.modalService.open(SmartReadComponent);
    let data = { 'title': title, 'url': url, 'imgUrl': imgUrl };
    modalRef.componentInstance.data = data;
    modalRef.result.then((result) => {
      console.log(result);
      // console.log('closed');
    }).catch((result) => {
      // console.log(result);
      // console.log('cancelling');
    });
  }

  searchTwitter(){
    this.http.get(`https://tech-blogs-aggregator-api.vercel.app/twitter/${this.searchKey}/relevancy`).subscribe((resp: any)=>{
    let ns = [];  
    for(let ele of resp.data){
          let newsObj = {};
          newsObj['source'] = 'Twitter';
          newsObj['publishedAt'] = ele['created_at'];
          newsObj['title'] = '';
          newsObj['description'] = ele['text'];
          newsObj['urlToImage'] = 'https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg'
          ns.push(newsObj);
      }
    this.newsSource = ns;
    })
  }
}