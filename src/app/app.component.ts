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
  factObj = {};
  showKeyNews = true
  showQuote = false
  showJoke = false
  showFacts = false
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
  keyNewsWords: Array<string>;
  selectedKeyWord: string;
  // states = ["Uttar Pradesh", "Uttarakhand", "Chhatisgarh", "Jammu and Kashmir", "Jharkhand", "Delhi", "Punjab", "West Bengal", "Bihar", "Madhya Pradesh", "Maharashtra", "Rajasthan", "Haryana", "Himachal Pradesh"];
  ngOnInit() {
    this.http.get("https://blazing-news-api.vercel.app/all").subscribe(async (res: Array<object>) => {
      for (var elem of res) {
        let lVal = Date.parse(elem['publishedAt']);
        const d = new Date(lVal);
        elem['publishedAt'] = d.toLocaleString();
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
        elem["show"] = false;
        // if(elem["urlToImage"] && elem["urlToImage"].includes("resolve")) {
        //   this.http.post(`https://summariser-js.vercel.app/getImg`, { 'url': elem['url'] }).subscribe(data=>{
        //     elem['urlToImage'] = data['imageUrl'];
        //   }            
        //   );
        // }
        // if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
        //   let arr = elem["urlToImage"].split("/");
        //   elem["urlToImage"] = './assets/img/' + arr[2];
        //   let x = elem['url'].replaceAll(':', '_');
        //   x = x.replace(/#/g, '_');
        //   x = x.replace(/=/g, '_');
        //   elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');
        // }
      }
      this.http.post(`https://blazing-news-api.vercel.app/prepareKeyNews`, { 'newsArr': res }).subscribe(data=>{
            this.keyNewsWords = data['keyNews'];
          });            
      this.newsSource = res;
      this.newsSrcBkp = res;
      this.loadedNews = res[this.newsIndex];
    })
    // this.http.get('https://blazingnews-api.herokuapp.com/backImg').subscribe(res => {
    //   this.backgroundImg = `https://www.bing.com${res['url']}`;
    // })
    // this.fetchKeyNews(0);
    setInterval(() => {
      this.todaysTime = Date.now();
    }, 10)
    // this.states.sort();
  }

  // fetchStateNews(event) {
  //   this.http.get(`https://www.amarujala.com/rss/${event.target.value}.xml`, {responseType:'text'}).subscribe(data=> {
  //     console.log(data);
  //   })
  // }

  getNews(source) {
    this.showFacts = false;
    this.showKeyNews = true;
    this.selectedKeyWord = "";
    if(source == "positive") {
      this.source = source;
      this.sourcePlaceholder = "Positive"
      this.http.get("https://blazing-news-api.vercel.app/positiveNews").subscribe(async (res: Array<object>) => {
        for (var elem of res) {
          let lVal = Date.parse(elem['publishedAt']);
          const d = new Date(lVal);
          elem['publishedAt'] = d.toLocaleString();
          elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
          elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
          elem["show"] = false;
        }
        this.http.post(`https://blazing-news-api.vercel.app/prepareKeyNews`, { 'newsArr': res }).subscribe(data=>{
          this.keyNewsWords = data['keyNews'];
        });       
        this.newsSource = res;
        this.newsSrcBkp = res;
        this.loading = false;
      })
    }
    else if(source == "negative") {
      this.source = source;
      this.sourcePlaceholder = "Negative"
      this.http.get("https://blazing-news-api.vercel.app/negativeNews").subscribe(async (res: Array<object>) => {
        for (var elem of res) {
          let lVal = Date.parse(elem['publishedAt']);
          const d = new Date(lVal);
          elem['publishedAt'] = d.toLocaleString();
          elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
          elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
          elem["show"] = false;
        }
        this.http.post(`https://blazing-news-api.vercel.app/prepareKeyNews`, { 'newsArr': res }).subscribe(data=>{
          this.keyNewsWords = data['keyNews'];
        });       
        this.newsSource = res;
        this.newsSrcBkp = res;
        this.loading = false;
      })
    }
    else if(source == "twitter"){
      this.twitterSelected = true;
      this.source = source;
      this.showKeyNews = false
      this.newsSource = null
      this.http.get('https://tech-blogs-aggregator-api.vercel.app/twitter/trending/relevancy').subscribe((resp: any)=>{
        let ns = [];  
        for(let ele of resp.data){
              let newsObj = {};
              let txt = ele['text'];
              if(txt.indexOf("https") != -1){
                let subInd = txt.indexOf("https");
               newsObj['url'] = txt.substring(subInd, subInd+23);
              }
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
    // this.keyNewsIndicator = false;
    this.indicator = source;
    this.showKeyNews = true;
    this.newsSource = null;
    this.loading = true;
    this.searchKey = '';
    this.tabIndex = this.refMap[source];
    this.sourcePlaceholder = this.sourceMappings[source];
    this.source = source;
    this.twitterSelected = false;
    // this.fetchKeyNews(this.refMap[source]);
    // this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    this.http.get("https://blazing-news-api.vercel.app/" + source).subscribe(async (res: Array<object>) => {
      for (var elem of res) {
        let lVal = Date.parse(elem['publishedAt']);
        const d = new Date(lVal);
        elem['publishedAt'] = d.toLocaleString();
        elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
        elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
        elem["show"] = false;
        // if(elem["urlToImage"] && elem["urlToImage"].includes("resolve")) {
        //   this.http.post(`https://summariser-js.vercel.app/getImg`, { 'url': elem['url'] }).subscribe(data=>{
        //     elem['urlToImage'] = data['imageUrl'];
        //   }            
        //   );
        // }
        // if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
        //   let arr = elem["urlToImage"].split("/");
        //   elem["urlToImage"] = './assets/img/' + arr[2];
        //   let x = elem['url'].replace(':', '_');
        //   x = x.replace(/#/g, '_');
        //   x = x.replace(/=/g, '_');
        //   elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');

        // }
      }
      this.keyNewsWords = [];
      this.http.post(`https://blazing-news-api.vercel.app/prepareKeyNews`, { 'newsArr': res }).subscribe(data=>{
        this.keyNewsWords = data['keyNews'];
      });       
      this.newsSource = res;
      this.newsSrcBkp = res;
      this.loading = false;
    })
  }
  }
  // async getKeyNews(key: string) {
  //   this.keyNewsIndicator = true;
  //   let news = this.keyNews[this.tabIndex];
  //   let res = news[key];
  //   this.newsSource = [];
  //   for (var elem of res) {
  //     elem['source'] = elem['title'].substring(elem['title'].indexOf('(s'));
  //     elem['title'] = elem['title'].substring(0, elem['title'].indexOf('(s'));
  //     elem["show"] = false;
  //     if (elem["urlToImage"] && elem["urlToImage"].includes("./img")) {
  //       let arr = elem["urlToImage"].split("/");
  //       elem["urlToImage"] = './assets/img/' + arr[2];
  //       let x = elem['url'].replace(':', '_');
  //       x = x.replace(/#/g, '_');
  //       x = x.replace(/=/g, '_');
  //       elem['urlToImage'] = `https://ik.imagekit.io/ap63okuxezn/images/` + x.replace(/\//g, '_');
  //     }
  //   }
  //   this.newsSource = res;
  // }

  getKeyNews(key: string) {
    if (key != this.selectedKeyWord) {
      this.selectedKeyWord = key;
      let allNews: any = this.newsSrcBkp;
      let filteredNews = [];
      for (let news of allNews) {
        if (news['title'].toLowerCase().includes(key.toLowerCase())) {
          console.log(news);
          filteredNews.push(news);
        }
      }
      this.newsSource = [];
      this.newsSource = filteredNews;
    }
    else {
      this.selectedKeyWord = "";
      this.newsSource = this.newsSrcBkp;
    }
  }

  fetchKeyNews(index) {
    this.http.get("https://blazing-news-api.vercel.app/keyNews").subscribe((res: Array<object>) => {
      this.keyNews = res;
      this.tabIndex = index;
      this.newsKeys = Object.keys(this.keyNews[this.tabIndex]);
    })
  }
  refreshNews() {
    this.getNews(this.source);
  }

  getQuote() {
    this.source='quote'
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
    this.source='joke'
    this.showQuote = false
    this.showJoke = true
    this.showKeyNews = false
    this.newsSource = null
    this.http.get('https://blazing-news-api.vercel.app/joke').subscribe(data => {
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
      let txt = ele['text'];
      if(txt.indexOf("https") != -1){
        let subInd = txt.indexOf("https");
       newsObj['url'] = txt.substring(subInd, subInd+23);
      }
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

  // getRedditNews(){
  //   this.source = 'reddit'
  //   this.http.get('https://www.reddit.com/r/Damnthatsinteresting/.json').subscribe((resp: any)=>{
  //     let ns = [];    
  //     for(let child of resp.data.children){
  //       let newsObj = {};
  //       newsObj['title'] = child.data.title;
  //       newsObj['source'] = 'Reddit';
  //       newsObj['urlToImage'] = child.data.url;
  //       newsObj['publishedAt'] = '';
  //       newsObj['url'] = child.data.url;
  //       newsObj['description'] ='';
  //       ns.push(newsObj);
  //     }
  //     this.newsSource = ns;
  //   })
  // }

  getFacts() {
    this.showFacts = true;
    this.showKeyNews = false;
    this.newsSource = null;
    if(this.factObj.hasOwnProperty('facts'))
      return;
    this.http.get(`https://blazing-news-api.vercel.app/interestingFacts`).subscribe((res: any)=>{
      console.log("here");
      this.factObj = res;
    })
  }

}
