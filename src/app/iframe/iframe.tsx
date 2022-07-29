import { useRef, useState } from "react";
import  * as React from "react";



function Iframe() {
    const queryParams = new URLSearchParams(window.location.search);
    const filename = queryParams.get("input") || "words";
    const file = require("../../assets/" + filename + ".json")
    const styles = file.style
    const source = `http://localhost:4200?input=${filename}&thumbnail=false&popup=false`
    const componentRef = useRef(null);
    const displayWord = styles.popup.displayWord !== undefined ? styles.popup.displayWord : false;
    const displayCount = styles.popup.displayCount !== undefined ? styles.popup.displayCount : false;

    const [pop, setPop] = useState(false)
    const [word, setWord] = useState("");
    const [props, setProps] = useState({x:0,y:0});
    const [element, setElement] = useState("hello")
    const [dropLinks,setDropLinks]=useState([])
    const popup = () => {
        setPop(false)
    }
    window.onmessage = function (e) {
        const data = e.data
        if (data.item) {
            setPop(true)
            setWord(data.item)
            setElement(data.item[0])
            setDropLinks(data.item[2])
            setProps({ x: data.x, y: data.y })
        }
    };

    return (
        <div  style={{ paddingLeft: "50px", display: 'flex' }}>

            <iframe  title="cloud" height='700px' width='900px' src={source}></iframe>

            {pop && <div  hidden={!pop } onMouseLeave={()=>{setPop(false)}} style={{ 
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
        </div >
    );
}

export default Iframe; 
