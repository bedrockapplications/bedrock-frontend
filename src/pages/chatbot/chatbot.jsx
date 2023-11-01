import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./chatbot.css";
import { Configuration, OpenAIApi } from "openai";
import send from '../../Images/send.png';

const Chatbot = () => {
  const chatref = useRef(null);
  const [qinput, setqinput] = useState("");
  const [getquery, setgetquery] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [allmessages, setallmessages] = useState([
    {
      isbot: true,
      message: "Welcome to BedRock.ai, How May I Help You?",
    }
  ]);
  const [apikey, setApikey] = useState("");

  useEffect(() => {
    Axios.get(`https://nodejs-apis.bedrockapps.link/api/chats/getKey`)
    .then(({ data }) => {
      setApikey(data[0].value);
    })
    .catch((error) => {});
  }, [])

  const configuration = new Configuration({
    organization: "org-jL7dncxaKsFWFEzNUHPDN9DA",
    apiKey: apikey,
  });

  const openai = new OpenAIApi(configuration);

  const handleSubmit = () => {
    let obj = {
      isbot: false,
      message: qinput,
    };
    handleApi(obj);
  };

  const handleApi = async (msg) => {
    if(msg.message !== ""){
    setisLoading(true)
    setallmessages([...allmessages, msg]);
    setqinput("");
    let obj = {
      model: "text-davinci-003",
      prompt: msg.message,
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    };

    const response = await openai.createCompletion(obj);
    if ((response.status = 200)) {
      setqinput("");
      let outputmsg = {
        isbot: true,
        message: response.data.choices[0].text,
      };
      setallmessages([...allmessages, msg, outputmsg]);
      setisLoading(false)
    }else{
        setisLoading(false)
    }
}
  };

  useEffect(() => {
      chatref.current?.scrollIntoView({behavior:"smooth"})
  }, [allmessages])
  return (
    <div className="chatbot-main">
      <div className="chatbot-title">BedRock.ai</div>
      <div className="chat-screen">
        {allmessages.map((each, i) => (
            <>
        <div className={each.isbot ? "botmsg-box" : "usermsg-box"} key={i}>
          <div className={each.isbot ? "botmsg" : "usermsg"}>
            {each.message}
          </div>
        </div>
        </>
        ))}
        <>
        {
            isLoading?
            <div className="botmsg-box">
            <div className="botmsg">
              Loading ...!
            </div>
          </div>
          :""
        }
        </>
        <div ref={chatref}> </div>
      </div>
      <div className="input-box">
        <div className="input-field">
          <input
            className="textfiled"
            type="text"
            placeholder="Please Enter your Query here..."
            value={qinput}
            onChange={(e) => setqinput(e.target.value)}
            disabled={isLoading ? true : false}
          />
        </div>
        <div className="input-btn" onClick={() => handleSubmit()}>
          <img className="send-img" src={send} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
