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
  var data = file.words.sort((a: { weight: number; }, b: { weight: number; }) => { return a.weight - b.weight });

  const [pop, setPop] = useState(false);
  const [word, setWord] = useState([]);
  const [props, setProps] = useState({x:0,y:0,offsetX:0,offsetY:0});
  const [element, setElement] = useState("hello")
  const [maxWeight, setMaxWeight] = useState(0);
  const [open, setOpen] = useState(false);
  const [dropLinks,setDropLinks]=useState([])

  const canvasHeight = styles.cloudHeight;
  const canvasWidth = styles.cloudWidth;   //edit canvasWidth to make the cloud bigger/smaller
  const count = data.length
  var thumbnailDisplay = styles.thumbnail.display

  var minWeight = Math.min(...data.slice(0, count).map((w: { weight: any; }) => w.weight));
  const max = Math.max(...data.map((w: { weight: any; }) => w.weight))
  data.forEach((ele: { weight: number; }) => { ele.weight = normalise(ele.weight, max, minWeight) })
  const medianOne = median(data.slice(0, Math.floor((2 * count) / 3)));
  const medianTwo = median(data.slice(Math.floor(count / 3), count));
  minWeight = Math.min(...data.slice(0, count).map((w: { weight: any; }) => w.weight));
  data.sort((a: { weight: number; }, b: { weight: number; }) => { return b.weight - a.weight });

  if (queryParams.get('thumbnail') !== null) { thumbnailDisplay = (queryParams.get('thumbnail') === 'true') }

  function normalise(val: number, max: number, min: number) {
    return (val - min) * 500 / (max - min);
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

  function getColor(word: any, weight: number) {
    if (weight >= minWeight && weight < medianOne) {
      return "rgba(0,0,0,0.6)";
    } else if (weight < medianTwo && weight >= medianOne) {
      return "rgba(0,0,0,0.8)";
    } else if (weight <= maxWeight && weight >= medianTwo) {
      return "rgba(0,0,0,1.0)";
    }
    return 'red'
  }

  function getSize(size: number, item: any, final_data: any[]) {
    let biggest = final_data[0][0].length;
    let max = maxWeight;
    let factor = 1
    if (biggest <= 7) {
      if (size === max) {
        return factor / 1.31 * (Math.pow(size, 0.95) * (3 * (canvasWidth - 300) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.75) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 7 && biggest <= 10) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.85) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.75) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 10 && biggest <= 13) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.8) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.75) * (3 * (canvasWidth - 300) / 2)) / 1024;
    } else if (biggest > 13) {
      if (size === max) {
        return factor / 1.3 * (Math.pow(size, 0.75) * (3 * (canvasWidth - 200) / 2)) / 1024;
      }
      return factor / 1.2 * (Math.pow(size, 0.70) * (1.5 * (canvasWidth - 300) / 2)) / 1024;
    }
    return 1
  }

  const popup=(item: any,dimension: any,event: any,)=> {
    try {
      var el = document.getElementById('wordHighlight');
      if (item !== undefined) {
        if(el){
        el.removeAttribute('hidden');
        el.style.left = dimension.x + event.srcElement.offsetLeft + 'px';
        el.style.top = dimension.y + event.srcElement.offsetTop + 'px';
        el.style.width = dimension.w + 'px';
        el.style.height = dimension.h + 'px';
        }
        setDropLinks(item[2])
        setWord(item);
        setElement(item[0])
        setProps(event);
        setPop(true);
      } else {
        if(el){
            if(componentRef.current) componentRef.current["scrollTo(0, 0)"];
            el.setAttribute('hidden', "true");
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
    var el = document.getElementById('wordHighlight');
    if(el) el.setAttribute('hidden', "true");
    setOpen(true)
    let final_data: any[][] = [];
    data.forEach((w: { word: any; weight: any; click: any;  }) => {
      final_data.push([w.word, w.weight, w.click, 0, w.weight]);
    });
    setMaxWeight(Math.max(...data.map((w: { weight: any; }) => w.weight)));
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
        if (final_data[listColorCounter][3] !== 0) { return final_data[listColorCounter++][3]; } else { return getColor(word, weight) }
      },
      rotationSteps: 2,
      rotateRatio: 0.4,
      weightFactor: (size: any, item: any) => getSize(size, item, final_data),
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
    setMaxWeight(Math.max(...data.map((w: { weight: any; }) => w.weight)));
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
        if (final_data[listColorCounter][3] !== 0) { return final_data[listColorCounter++][3]; } else { return getColor(word, weight) }
      },
      rotationSteps: 2,
      rotateRatio: 0.4,
      fontWeight: function () { return "bold"; },
      weightFactor: (size: any, item: any) => getSize(size, item, final_data),
      shrinkToFit: true,
      minSize: 3,
      drawOutOfBound: false,
    });
  }

  useEffect(() => {
    if (thumbnailDisplay === false) { generateCloud() }
    else { generateThumbnail() }
  }, [maxWeight]);

  return (

    <div>
    {!thumbnailDisplay &&
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}
          onMouseLeave={ () =>  popoff()}
          onClick={() =>  { if (pop === true && word.length !== 0) popoff() }}
        >
          <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          <div id='wordHighlight' ></div>
          <div ref={componentRef} hidden={!pop } style={{ 
            position: "absolute", 
            top: props.y, 
            left: props.x, 
            minWidth: styles.popup.width,
              zIndex: 1,
              fontSize: styles.popup.fontSize,
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
            {(styles.popup.displayWord || false) &&
              <div style={{ paddingTop: '8px', paddingLeft: '28px', paddingBottom: '8px', paddingRight: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                {element.charAt(0).toUpperCase() + element.slice(1, element.length)}
              </div>
            }
            {(styles.popup.displayCount || false) && <div style={styles.popup.padding}>
              Count: {word[4]}
            </div>}
            {(styles.popup.displayWord || false) && <div style={{ padding: '5px', borderBottom: '1px solid grey' }}></div>}
            {(styles.popup.displayWord || false) && <div style={{ padding: '5px' }}></div>}
            {word && dropLinks.map((link: { label: string; link:string }, idx: React.Key | null | undefined) => (
              <div id='popup' key={idx} >
                  <div id='popup' key={idx} style={styles.popup.padding} > 
                  <a style={{color:'black', fontFamily:styles.fontFamily, textDecoration:'none'}} href={link.link} target="_blank">
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                    </a>
                  </div>
              </div>
            ))}
            </div>
        </div>
        {styles.caption && (
          <div>
            <h2 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.captionColor || "blue", display: 'flex', justifyContent: 'center' }}>
              {styles.caption}
            </h2>
          </div>
        )}
      </div>
    }
    <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,50%' }}>
      {thumbnailDisplay && <canvas style={{ cursor: "pointer"}} onClick={() => { open ? setOpen(false) : generateCloud() }} ref={thumbnailCanvasRef} width={styles.thumbnail.width} height={styles.thumbnail.height} />}
    </div>
    {thumbnailDisplay && 
    <div  hidden={!open} style={styles.box}>
      <div hidden={!open}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      onMouseLeave={ () =>  popoff()}
      onClick={() =>  { if (pop === true && word.length !== 0) popoff() }}
      >
        <div onClick={()=>{setOpen(false);}}style={{ cursor:'pointer',position: 'absolute', right: 8, top: 8, color: "grey", fontSize:'30px',fontFamily:'Raleway', paddingRight:"10px", paddingTop:'10px' }}>
            X</div>
        <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        <div id='wordHighlight'></div>
          <div ref={componentRef} hidden={!pop } style={{ 
            position: "absolute", 
            top: props.offsetY, 
            left:props.offsetX+styles.popup.widthOffset, 
            minWidth: styles.popup.width,
              zIndex: 1,
              fontSize: styles.popup.fontSize,
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
            {(styles.popup.displayWord || false) &&
              <div style={{ paddingTop: '8px', paddingLeft: '28px', paddingBottom: '8px', paddingRight: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
                {element.charAt(0).toUpperCase() + element.slice(1, element.length)}
              </div>
            }
            {(styles.popup.displayCount || false) && <div style={styles.popup.padding}>
              Count: {word[4]}
            </div>}
            {(styles.popup.displayWord || false) && <div style={{ padding: '5px', borderBottom: '1px solid grey' }}></div>}
            {(styles.popup.displayWord || false) && <div style={{ padding: '5px' }}></div>}
            {word && dropLinks.map((link: { label: string; link:string }, idx: React.Key | null | undefined) => (
              <div id='popup' key={idx} >
                  <div id='popup' key={idx} style={styles.popup.padding} > 
                  <a style={{color:'black', fontFamily:styles.fontFamily, textDecoration:'none'}} href={link.link} target="_blank">
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                    </a>
                  </div>
              </div>
            ))}
            </div>
        </div>
        {styles.caption && (
        <div>
          <h2 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.captionColor || "blue", display: 'flex', justifyContent: 'center' }}>
            {styles.caption}
          </h2>
        </div>
      )}
      </div>

      }   
  </div>
  );
}
export default nexwordcloud;

