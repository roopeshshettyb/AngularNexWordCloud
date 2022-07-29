import  * as React from "react";
import  { useEffect, useRef, useState } from 'react';
try {  // const Wordcloud = require("wordcloud");
} catch (err) { }
// for deployment use above code.

const nexwordcloud = () =>{
  const Wordcloud = require("wordcloud");
  const queryParams = new URLSearchParams(window.location.search);

  var canvasRef = useRef(null);
  var thumbnailCanvasRef = useRef(null);
  const componentRef = useRef(null);
  
  const filename = queryParams.get("input") || "words";
  const file = require("../assets/" + filename + ".json")
  const styles = file.style
  let popUpStyle = {
    "position": "absolute",
    "top": "50%",
    "left": "50%",
    "transform": "translate(-50%, -50%)",
    "minWidth": "70vw",
    "minHeight": "90vh",
    "bgcolor": "background.paper",
    "boxShadow": 24,
    "p": 1
  }
  var data = file.words.sort((a: { weight: number; }, b: { weight: number; }) => { return a.weight - b.weight });

  const [pop, setPop] = useState(false);
  const [word, setWord] = useState([]);
  const [props, setProps] = useState({x:0,y:0,offsetX:0,offsetY:0});
  const [element, setElement] = useState("hello")
  const [open, setOpen] = useState(false);
  const [dropLinks,setDropLinks]=useState([])

  const canvasHeight = styles.cloudHeight || 900;
  const canvasWidth = styles.cloudWidth || 500;   //edit canvasWidth to make the cloud bigger/smaller
  const count = data.length
  var thumbnailDisplay = styles.thumbnail.display|| false
  var displayPopup = styles.popup.display || false
  const displayHighlight = styles.highlight.display || false
  const displayWord = styles.popup.displayWord || false;
  const displayCount = styles.popup.displayCount || false;

  var minWeight = Math.min(...data.slice(0, count).map((w: { weight: any; }) => w.weight));
  const max = Math.max(...data.map((w: { weight: any; }) => w.weight))
  data.forEach((ele: { weight: number; }) => { ele.weight = normalise(ele.weight, max, minWeight) })
  const medianOne = median(data.slice(0, Math.floor((2 * count) / 3)));
  const medianTwo = median(data.slice(Math.floor(count / 3), count));
  minWeight = Math.min(...data.slice(0, count).map((w: { weight: any; }) => w.weight));
  data.sort((a: { weight: number; }, b: { weight: number; }) => { return b.weight - a.weight });

  if (queryParams.get('thumbnail') !== null) { thumbnailDisplay = (queryParams.get('thumbnail') === 'true') }
  if (queryParams.get('popup') !== null) { displayPopup = (queryParams.get('popup') === 'true') }

  function normalise(val: number, max: number, min: number) {
    return ((val - min) * 400 / (max - min)) + (max * 5 / min);
  }

  // Overwrite Math.random to use seed to ensure same word cloud is printed on every render
  function randseed(s: number) {
    s = Math.sin(s) * 10000;
    return s - Math.floor(s);
  }

  let seed = 0;
  Math.random = function () {
    seed++;
    return randseed(seed);
  };

  function median(arr: any[]) {
    arr.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => a["weight"] - b["weight"]);
    let mid = arr.length >> 1;
    let res =
      arr.length % 2
        ? arr[mid].weight
        : (arr[mid - 1].weight + arr[mid].weight) / 2;
    return res;
  }

  function getColor(word: any, weight: number, maxWeight: number) {
    if (weight >= minWeight && weight < medianOne) {
      return "rgba(0,0,0,0.6)";
    } else if (weight < medianTwo && weight >= medianOne) {
      return "rgba(0,0,0,0.8)";
    } else if (weight <= maxWeight && weight >= medianTwo) {
      return "rgba(0,0,0,1.0)";
    }
    return 'rgba(0,0,0,0.6)'
  }

  function getSize(size: number, item: any, final_data: any[], maxWeight:number) {
    let biggest = final_data[0][0].length;
    let max = maxWeight;
    let factor = styles.weightFactor || 0.8
    if (biggest <= 7) {
      if (size === max) {
        return factor / 1.31 * (Math.pow(size, 1) * (3 * (canvasWidth - 300) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 7 && biggest <= 10) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.95) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 10 && biggest <= 13) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 13) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.90) * (3 * (canvasWidth - 300) / 2)) / 1024;
    }
    return 1
  }

  const popup=(item: any,dimension: any,event: any,)=> {
    try {
      if (item !== undefined) {
        if( displayHighlight){
        var el = document.getElementById('wordHighlight');
          if(el){
          el.removeAttribute('hidden');
          el.style.left = dimension.x + event.srcElement.offsetLeft + 'px';
          el.style.top = dimension.y + event.srcElement.offsetTop + 'px';
          el.style.width = dimension.w + 'px';
          el.style.height = dimension.h + 'px';
          }
        }
        setDropLinks(item[2])
        setWord(item);
        setElement(item[0])
        if(window.top!==null) window.top.postMessage({ item, x: event.x, y: event.y }, '*');
        setProps(event);
        setPop(true);
      } else {
        if(displayHighlight){
            var el = document.getElementById('wordHighlight');
            if(el) el.setAttribute('hidden', "true");
        }
        setPop(false);
        setWord([])
      }
    } catch (err) {
      console.log(err);
    }
  }

  function popoff() {
    var el = document.getElementById('wordHighlight');
    if(el){
        if(componentRef.current) componentRef.current["scrollTo(0, 0)"];
        el.setAttribute('hidden', "true");
    }
    setPop(false);
    setWord([])
  }

  function generateCloud() {
    if( displayHighlight){
       var el = document.getElementById('wordHighlight');
       if(el) el.setAttribute('hidden', "true");
    }
    setOpen(true)
    let final_data: any[][] = [];
    data.forEach((w: { word: any; weight: any; click: any;  }) => {
      final_data.push([w.word, w.weight, w.click, 0, w.weight]);
    });
    const maxWeight = Math.max(...data.map((w: { weight: any; }) => w.weight))
    var listColorCounter = 0;
    Wordcloud(canvasRef.current, {
      list: final_data,
      shape: "circle",
      minRotation: -1.57,
      maxRotation: 1.57,
      shuffle: false,
      fontFamily: styles.fontFamily || "Raleway",
      backgroundColor: styles.backgroundColor || "White",
      color: (word: any, weight: any) => {
        if (final_data[listColorCounter][3] !== 0) { return final_data[listColorCounter++][3]; } else { return getColor(word, weight,maxWeight) }
      },
      rotationSteps: 2,
      rotateRatio: 0.4,
      weightFactor: (size: any, item: any) => getSize(size, item, final_data,maxWeight),
      shrinkToFit: true,
      minSize: 3,
      drawOutOfBound: false,
      click: (item: any, dimension: any, event: MouseEvent) => {
        //{ cancelBubble: boolean; stopPropagation: () => void; }
        event.cancelBubble = true; if (event.stopPropagation) event.stopPropagation();
        popup(item,dimension,event);
      }
    // click: (e:MouseEvent)=> handleClick(e)
    });
  }

  function generateThumbnail() {
    let final_data: any[][] = [];
    data.forEach((w: { word: any; weight: any; click: any; }) => {
      final_data.push([w.word, w.weight, w.click, 0, w.weight]);
    });
    const maxWeight = Math.max(...data.map((w: { weight: any; }) => w.weight))
    var listColorCounter = 0;
    Wordcloud(thumbnailCanvasRef.current, {
      list: final_data,
      shape: "circle",
      minRotation: -1.57,
      maxRotation: 1.57,
      shuffle: false,
      fontFamily: styles.fontFamily || "Raleway",
      backgroundColor: styles.backgroundColor || "White",
      color: (word: any, weight: any) => {
        if (final_data[listColorCounter][3] !== 0) { return final_data[listColorCounter++][3]; } else { return getColor(word, weight,maxWeight) }
      },
      rotationSteps: 2,
      rotateRatio: 0.4,
      fontWeight: function () { return "bold"; },
      weightFactor: (size: any, item: any) => getSize(size, item, final_data,maxWeight),
      shrinkToFit: true,
      minSize: 3,
      drawOutOfBound: false,
    });
  }

  useEffect(() => {
    if (thumbnailDisplay === false) { generateCloud() }
    else { generateThumbnail() }
  }, []);

  return (

    <div>
    {!thumbnailDisplay &&
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}
          onMouseLeave={ () =>  popoff()}
          onClick={() =>  { if (pop === true && word.length !== 0) popoff() }}
        >
          <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        {displayHighlight &&  <div id='wordHighlight' ></div>}
          {displayPopup && <div ref={componentRef} hidden={!pop } style={{ 
            position: "absolute", 
            top: props.y, 
            left: props.x, 
            minHeight: styles.popup.minHeight || "100px",
            minWidth: styles.popup.width || "260px",
              zIndex: 1,
              fontSize: styles.popup.fontSize || "22px",
              fontFamily: styles.fontFamily || "Raleway",
              backgroundColor: styles.popup.backgroundColor || "white",
              color: styles.popup.fontColor || "black",
              transform: 'translate(7%,10%)',
              boxShadow: "2px 2px 20px 2px #888888",
              transitionTimingFunction: "ease",
              transition: "height 0.3s",
              paddingTop: "15px",
              paddingBottom: "15px",
              }}>
            {(displayWord || false) &&
              <div style={{ paddingTop: '8px', paddingLeft: '28px', paddingBottom: '8px', paddingRight: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                {element.charAt(0).toUpperCase() + element.slice(1, element.length)}
              </div>
            }
            {(displayCount || false) && <div style={{ "padding": "8px 30px 8px 30px" }}>
              Count: {word[4]}
            </div>}
            {(displayWord || false) && <div style={{ padding: '5px', borderBottom: '1px solid grey' }}></div>}
            {(displayWord || false) && <div style={{ padding: '5px' }}></div>}
            {word && dropLinks.map((link: { label: string; link:string }, idx: React.Key | null | undefined) => (
              <div id='popup' key={idx} >
                  <div id='popup' key={idx}  style={{ "padding": "8px 30px 8px 30px" }} > 
                  <a style={{color:'black', fontFamily:styles.fontFamily||"Raleway", textDecoration:'none'}} href={link.link} target="_blank">
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                    </a>
                  </div>
              </div>
            ))}
            </div>}
        </div>
        {(styles.cloudTitle || styles.cloudDescription) && (
            <div>  <h1 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.titleColor || "blue", display: 'flex', justifyContent: 'center' }}>
            {styles.cloudTitle}
          </h1>
          <h3 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.descriptionColor || "black", display: 'flex', justifyContent: 'center' }}>
            {styles.cloudDescription}
          </h3>
        </div>
      )}
      </div>
    }
    <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,50%' }}>
      {thumbnailDisplay && <canvas style={{ cursor: "pointer"}} onClick={() => { open ? setOpen(false) : generateCloud() }} ref={thumbnailCanvasRef} width={styles.thumbnail.width||200} height={styles.thumbnail.height||110} />}
    </div>
    {thumbnailDisplay && 
    <div  hidden={!open} style={styles.box||popUpStyle}>
      <div hidden={!open}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onMouseLeave={ () =>  popoff()}
      onClick={() =>  { if (pop === true && word.length !== 0) popoff() }}
      >
        <div onClick={()=>{setOpen(false);}}style={{ cursor:'pointer',position: 'absolute', right: 8, top: 8, color: "grey", fontSize:'30px',fontFamily:'Raleway', paddingRight:"10px", paddingTop:'10px' }}>
            X</div>
        <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
       { displayHighlight && <div id='wordHighlight'></div>}
         { displayPopup && <div ref={componentRef} hidden={!pop } style={{ 
            position: "absolute", 
            top: props.offsetY, 
            left:props.offsetX+  (0.9 * (styles.popup.widthOffset|| 250)), 
            minHeight: styles.popup.minHeight || "100px",
            minWidth: styles.popup.width || "260px",
              zIndex: 1,
              fontSize: styles.popup.fontSize || "22px",
              fontFamily: styles.fontFamily || "Raleway",
              backgroundColor: styles.popup.backgroundColor || "black",
              color: styles.popup.fontColor || "black",
              transform: 'translate(7%,10%)',
              boxShadow: "2px 2px 20px 2px #888888",
              transitionTimingFunction: "ease",
              transition: "height 0.3s",
              paddingTop: "15px",
              paddingBottom: "15px",
              
              }}>
            {(displayWord || false) &&
              <div style={{ paddingTop: '8px', paddingLeft: '28px', paddingBottom: '8px', paddingRight: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                {element.charAt(0).toUpperCase() + element.slice(1, element.length)}
              </div>
            }
            {(displayCount || false) && <div  style={{ "padding": "8px 30px 8px 30px" }}>
              Count: {word[4]}
            </div>}
            {(displayWord || false) && <div style={{ padding: '5px', borderBottom: '1px solid grey' }}></div>}
            {(displayWord || false) && <div style={{ padding: '5px' }}></div>}
            {word && dropLinks.map((link: { label: string; link:string }, idx: React.Key | null | undefined) => (
              <div id='popup' key={idx} >
                  <div id='popup' key={idx}  style={{ "padding": "8px 30px 8px 30px" }} > 
                  <a style={{color:'black', fontFamily:styles.fontFamily||"Raleway", textDecoration:'none'}} href={link.link} target="_blank">
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                    </a>
                  </div>
              </div>
            ))}
            </div>}
        </div>
        {(styles.cloudTitle || styles.cloudDescription) && (
            <div>  <h1 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.titleColor || "blue", display: 'flex', justifyContent: 'center' }}>
            {styles.cloudTitle}
          </h1>
          <h3 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.descriptionColor || "black", display: 'flex', justifyContent: 'center' }}>
            {styles.cloudDescription}
          </h3>
        </div>
      )}
      </div>

      }   
  </div>
  );
}
export default nexwordcloud;

