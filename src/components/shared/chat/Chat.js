import React from "react";
import './chat.scss'
export default function Chat() {
  return (
    <div className="right">
      <div className="top">
        <span>
          To: <span className="name">Dog Woofson</span>
        </span>
      </div>
      <div className="chat" data-chat="person2">
        <div className="conversation-start">
          <span>Today, 5:38 PM</span>
        </div>
        <div className="bubble you">Hello, can you hear me?</div>
        <div className="bubble you">I'm in California dreaming</div>
        <div className="bubble me">... about who we used to be.</div>
        <div className="bubble me">Are you serious?</div>
        <div className="bubble you">When we were younger and free...</div>
        <div className="bubble you">I've forgotten how it felt before</div>
        <div className="bubble me">Are you serious?</div>
        <div className="bubble you">When we were younger and free...</div>
        <div className="bubble you">I've forgotten how it felt before</div>
        <div className="bubble me">Are you serious?</div>
        <div className="bubble you">When we were younger and free...</div>
        <div className="bubble you">I've forgotten how it felt before</div>
        <div className="bubble you">I've forgotten how it felt before</div>
        <div className="bubble me">Are you serious?</div>
        <div className="bubble you">When we were younger and free...</div>
        <div className="bubble you">I've forgotten how it felt before</div>
      </div>
      <div class="write">
        <input type="text" />
        <a href="javascript:;" class="write-link send"></a>
      </div>
    </div>
  );
}
