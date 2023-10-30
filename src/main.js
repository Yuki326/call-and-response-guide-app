  import React, { Component } from "react";
  import "./App.css";

  let musicList = ["粛聖!! ロリ神レクイエム☆","ダダダダ天使","にっこり調査隊","チューリングラブ"]

  //todo
  let comment1 = [
    "ah!",
    "Uh!",
    "ごめんなさーい",
    "え～！",
    "ない！",
    "ねっ",
    "むいちゃん！むいちゃん！かわいいよォ～！",
    "ずっきゅーん！",
    "ばっきゅーん！",
    "ずっきゅーん！",
    "yes!",
    "むいちゃん　むいちゃんこっち向いてェ～",
    "ah!",
    "Uh!",
    "ごめんなさーい",
    "え～！",
    "助かる～ゥ",
    "助かる～ゥ",
    "助かる～ゥ",
    "助かる～ゥ",
    "助かる～ゥ",
    "助かる～ゥ",
    "むいビーーーーーム",
    "怒りの日...",
    "愚かな...",
    "ずっきゅーん！",
    "ばっきゅーん！",
    "ずっきゅーん！",
    "yes!",
    "ah!",
    "Uh!",
    "ごめんなさーい",
    "え～！",
  ]
  let comment2 = [

  ]
  let comment3 = [

  ]
  let comment4 = [

  ]
  let timing1 = [0.0, 1.5, 3.26, 7.33, 16.72, 22.42, 40.05, 47.23, 50.18, 58.88, 61.91, 82.31, 84.38, 85.79, 87.67, 91.38, 107.19, 108.72, 110.21, 112.12, 113.15, 114.6, 131.29, 143.58, 147.69, 199.96, 202.93, 211.6, 214.73, 238.53, 239.98, 241.76, 245.64]
  let timing2 = []
  let timing3 = []
  let timing4 = []
  class Main extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isStart: false,
        timer: 0,
        leftTime: 0,
        nextComment: "",
        nowMusicID:0,
        commentReader:0,
      };
    }

    getNextComment(musicID,commentReader){
      let comment = []
      switch(musicID){
        case 0:comment = comment1;break;
        case 1:comment = comment2;break;
        case 2:comment = comment3;break;
        case 3:comment = comment4;break;
      }
      if(this.state.commentReader < comment.length){
        return comment[commentReader]
      }
      return "a"
    }
    getLeftTime(musicID,timer){
      let timing = []
      switch(musicID){
        case 0:timing = timing1;break;
        case 1:timing = timing2;break;
        case 2:timing = timing3;break;
        case 3:timing = timing4;break;
      }
      for(var i=0;i<timing.length;i++){
        if(timer <= parseInt(timing[i]*10)){
          this.setState({
            commentReader: i
          });
          return parseInt(timing[i]*10)-timer
        }
      }
      return 0
    }
    // コンポーネントがマウントされた後に実行
    componentDidMount() {

      // ----------- ①
      setInterval(() => {
        this.setState({
          timer: this.state.timer + (this.state.isStart ? 1 : 0),
          leftTime: this.getLeftTime(this.state.nowMusicID,this.state.timer),
          nextComment:this.getNextComment(this.state.nowMusicID,this.state.commentReader),
        });
      }, 100);
    }


    doChange = (e) => {
      // ----------- ②
      e.preventDefault();
      this.setState({
        timelag: e.target.value
      });
    };

    start(){
      const isNormalMode = (this.state.Difficulty === "Normal")
      this.setState({
        timer:0,
        isStart:true
      })
    }
    
    reset(){
      const isNormalMode = (this.state.Difficulty === "Normal")
      this.setState({
        timer:0,
        isStart:false
      })
    }
    setMusic(musicID){
      this.setState({
        nowMusicID:musicID,
        timer:0,
        isStart:false
      })
    }
    render() {
      return (
        <main>
          <h2>現在の選択曲:{musicList[this.state.nowMusicID]}</h2>
          <h2>次の合いの手：{this.state.nextComment}</h2>
          <h2>次の合いの手まで：{this.state.leftTime/10}</h2>
          <h4>最初の合いの手のタイミングで「スタート」を押してね！</h4>
          
          <a className={"btn btn-solid"} onClick={()=> this.start()}>スタート</a>
          <a className={"btn btn-solid"} onClick={()=> this.reset()}>リセット</a>

          <h2>曲選択</h2>
          <div className={"musicSelect"}>
            {musicList.map((music,musicID) => (
              <a className={"btn btn--orange btn--cubic btn--shadow"} onClick={()=> this.setMusic(musicID)}>{music}</a>
            ))}
          </div>
          <p>※聖!! ロリ神レクイエム☆以外未対応</p>
          <h3>タイマー{this.state.timer/10}</h3>

        </main>
      );
    }
  }

  export default Main;
