import { AbsoluteSourceSpan } from "@angular/compiler";
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
  
//   const filename = queryParams.get("input") || "words";
//   const file = require("../public/" + filename + ".json")
const file = {
    "style": {
        "fontFamily": "Raleway",
        "backgroundColor": "White",
        "caption": "This is a Programming Language cloud",
        "captionSize": "10",
        "captionColor":"red",
        "cloudWidth": 800,
        "cloudHeight": 500,
        "thumbnail": {
            "display": false,
            "height": 110,
            "width": 200
        },
        "popup": {
            "displayWord": false,
            "displayCount": false,
            "backgroundColor": "white",
            "fontColor": "black",
            "linkColor": "black",
            "fontSize": "22px",
            "width": "250px",
            "padding": {
                "paddingTop": "8px",
                "paddingLeft": "30px",
                "paddingBottom": "8px",
                "paddingRight": "30px"
            }
        },
        "box": {
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
    },
    "words": [
        {
            "word": "java",
            "weight": 400,
            "click": [
                {
                    "label": "programming",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "python",
            "weight": 426,
            "click": [
                {
                    "label": "programming",
                    "link": "https://www.google.com"
                },
                {
                    "label": "language",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "internet",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "nodejs",
            "weight": 392,
            "click": [
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                },
                {
                    "label": "programming language of the world wide web",
                    "link": "https://www.google.com"
                }
            ]
        },
        {
            "word": "reactjs",
            "weight": 345,
            "click": [
                {
                    "label": "let",
                    "link": "https://www.google.com"
                },
                {
                    "label": "def",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "xyz",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "nextjs",
            "weight": 319,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                },
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                },
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "nosql",
            "weight": 295,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "mysql",
            "weight": 269,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "mongodb",
            "weight": 267,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "spring",
            "weight": 258,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "boot",
            "weight": 251,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "c++",
            "weight": 242,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "perl",
            "weight": 237,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "html",
            "weight": 220,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "css",
            "weight": 217,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "native",
            "weight": 203,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "ios",
            "weight": 194,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "android",
            "weight": 181,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "windows",
            "weight": 180,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "web",
            "weight": 176,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "internet",
            "weight": 171,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "wifi",
            "weight": 163,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "server",
            "weight": 155,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "client",
            "weight": 151,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "mac",
            "weight": 138,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "linux",
            "weight": 130,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "debian",
            "weight": 125,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "postgres",
            "weight": 124,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "bootstrap",
            "weight": 123,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "php",
            "weight": 123,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "assembly",
            "weight": 120,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "fortran",
            "weight": 120,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "groovy",
            "weight": 120,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "ruby",
            "weight": 110,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "swift",
            "weight": 110,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "matlab",
            "weight": 109,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "go",
            "weight": 109,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "google",
            "weight": 109,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "prolog",
            "weight": 106,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "saas",
            "weight": 105,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "rust",
            "weight": 105,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "scratch",
            "weight": 105,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "julia",
            "weight": 101,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "ada",
            "weight": 99,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "kotlene",
            "weight": 98,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "ladder",
            "weight": 95,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "vbscript",
            "weight": 93,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        },
        {
            "word": "macos",
            "weight": 93,
            "click": [
                {
                    "label": "business",
                    "link": "https://www.google.com"
                },
                {
                    "label": "finance",
                    "link": "https://www.yahoo.com"
                },
                {
                    "label": "account",
                    "link": "https://www.duckduckgo.com"
                }
            ]
        }
    ]
}
  const styles = file.style
  var data = file.words.sort((a: { weight: number; }, b: { weight: number; }) => { return a.weight - b.weight });

  const [pop, setPop] = useState(false);
  const [word, setWord] = useState("");
  const [props, setProps] = useState([]);
  const [element, setElement] = useState("hello")
  const [maxWeight, setMaxWeight] = useState(0);
  const [open, setOpen] = useState(false);

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
        console.log(dimension,event)
      var el = document.getElementById('wordHighlight');
      if (item !== undefined) {
        if(el){
            console.log("here")
        el.removeAttribute('hidden');
        el.style.left = dimension.x + event.srcElement.offsetLeft + 'px';
        el.style.top = dimension.y + event.srcElement.offsetTop + 'px';
        el.style.width = dimension.w + 'px';
        el.style.height = dimension.h + 'px';
        }
        
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
        setWord("")
      }
    } catch (err) {
      console.log(err);
    }
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
  }, [maxWeight]);// eslint-disable-line react-hooks/exhaustive-deps

  return (

    <div>
    {!thumbnailDisplay &&
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}
        //   onMouseLeave={ (item: any,event: any,dimension: any) =>  popup(item, event, dimension)}
        //   onClick={(item: any,event: any,dimension: any) => {popup(item, event, dimension);}}
        // onClick={() => handleClick(event as MouseEvent)}
        >
          <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          <div id='wordHighlight' style={{position:"absolute",  border: "3px solid rgb(2, 101, 230)", boxShadow: "0 0 4px 0 #008", padding: "2px",  cursor: "pointer",    pointerEvents: "none" }}></div>
          {/* <Box id="popuphover"
            ref={componentRef}
            hidden={!pop} sx={{
              top: props.y,
              left: props.x,
              position: "absolute",
              minWidth: styles.popup.width,
              zIndex: 1,
              fontSize: styles.popup.fontSize,
              fontFamily: styles.fontFamily || "Raleway",
              backgroundColor: styles.popup.backgroundColor || "black",
              color: styles.popup.fontColor || "black",
              transform: 'translate(7%,10%)',
              boxShadow: 24,
              transitionTimingFunction: "ease",
              transition: "height 0.3s",
              py: 1.5,
            }}
            onMouseLeave={() => { popup() }}
          > */}
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
            {/* {word && word[2].map((link, idx) => (
              <div id='popup' key={idx} > */}
                {/* <Link
                  href={link.link}
                  target="_blank"
                  underline="none"
                  style={{ color: styles.popup.linkColor || "blue", }}
                >
                  <div id='popup' key={idx} style={styles.popup.padding}>
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                  </div>
                </Link> */}
              {/* </div>
            ))} */}
          {/* </Box> */}
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
      {thumbnailDisplay && !open && <canvas style={{ cursor: "pointer" }} onClick={() => { open ? setOpen(false) : generateCloud() }} ref={thumbnailCanvasRef} width={styles.thumbnail.width} height={styles.thumbnail.height} />}
    </div>
    {thumbnailDisplay && 
    // <Box hidden={!open} sx={styles.box}>
      <div hidden={!open}style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        // onMouseLeave={() => { popup() }}
        // onClick={() => { if (pop === true && word !== '') popup() }}
      >
        {/* <IconButton
          aria-label="close"
          onClick={() => setOpen(false)}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}
        >
          <CloseIcon />
        </IconButton> */}
        <canvas style={{ cursor: "pointer" }} ref={canvasRef} width={canvasWidth} height={canvasHeight} />
        <div id='wordHighlight'></div>
        {/* <Box id="popuphover"
          ref={componentRef}
          hidden={!pop} sx={{
            top: props.offsetY,
            left: props.offsetX,
            position: "absolute",
            minWidth: styles.popup.width,
            zIndex: 1,
            fontSize: styles.popup.fontSize,
            fontFamily: styles.fontFamily || "Raleway",
            backgroundColor: styles.popup.backgroundColor || "black",
            color: styles.popup.fontColor || "black",
            transform: 'translate(7%,10%)',
            boxShadow: 24,
            transitionTimingFunction: "ease",
            transition: "height 0.3s",
            py: 1.5,
          }}
          onMouseLeave={() => { popup() }}
        > */}
          {(styles.popup.displayWord || false) && <div id='popup' style={{ paddingTop: '8px', paddingLeft: '28px', paddingBottom: '8px', paddingRight: '30px', display: 'flex', justifyContent: 'center', fontWeight: 'bold' }}>
            {element.charAt(0).toUpperCase() + element.slice(1, element.length)}
          </div>}
          {(styles.popup.displayCount || false) && <div id='popup' style={styles.popup.padding}>
            Count: {word[1]}
          </div>}
          {(styles.popup.displayWord || false) && <div style={{ padding: '5px', borderBottom: '1px solid grey' }}></div>}
          {(styles.popup.displayWord || false) && <div style={{ padding: '5px' }}></div>}
          {/* {word &&
            word[2].map((link, idx) => (
              <div id='popup' key={idx} >
                <Link
                  href={link.link}
                  target="_blank"
                  underline="none"
                  style={{ color: styles.popup.linkColor || "blue", }}
                >
                  <div id='popup' key={idx} style={styles.popup.padding}>
                    {link.label.charAt(0).toUpperCase() + link.label.slice(1, link.label.length)}
                  </div>
                </Link>
              </div>
            ))} */}
        {/* </Box> */}
      </div>}
      {/* {styles.caption && (
        <div>
          <h2 style={{ fontFamily: styles.fontFamily || "Raleway", color: styles.captionColor || "blue", display: 'flex', justifyContent: 'center' }}>
            {styles.caption}
          </h2>
        </div>
      )} */}
    {/* </Box>} */}
    
  </div>
  );
}
export default nexwordcloud;

