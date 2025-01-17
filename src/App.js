import { useRef, useState } from "react";
import "./App.css";
import Cardview from "./Cardview";
import html2canvas from "html2canvas";
import ChatApp from "./ChatApp";
import Cardview1 from "./Cardview1";
import Cardview2 from "./Cardview2";

function App() {
  const [data, setData] = useState([]);
  const handleDataFromChat = (data) => {
    setData(data);
    console.log("Data received from ChatApp:", data);
  };
  const cardRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);

  const handleAll = () => {
    handleDownload(cardRef);
    handleDownload(card1Ref);
    handleDownload(card2Ref);
  };

  const handleDownload = (cardRef) => {
    html2canvas(cardRef.current)
      .then((canvas) => {
        const linka = document.createElement("a");
        linka.href = canvas.toDataURL("image/png");
        linka.download = "inst_template.png";
        linka.click();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="flex  flex-col p-10 justify-center items-center m-20">
      <ChatApp onsendData={handleDataFromChat}></ChatApp>
      <div className="flex justify-between">
        <div className="flex-col">
          <div className="p-20" ref={cardRef}>
            <Cardview data={data[0]}></Cardview>
          </div>
        </div>
        <div className="flex-col">
          <div className="p-20" ref={card1Ref}>
            <Cardview1 data={data[1]}></Cardview1>
          </div>
        </div>
        <div className="flex-col">
          <div className="p-20" ref={card2Ref}>
            <Cardview2 data={data[2]}></Cardview2>
          </div>
        </div>
        <button
          className="bg-green-600 w-72 h-20 drop-shadow border stroke-orange-50 ml-36 justify-center items-center "
          onClick={() => handleAll()}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
