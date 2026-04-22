import { DirectLine } from "botframework-directlinejs";

class DirectLineManager {
  static instance = null;

  constructor() {
    this.directLine = null;
    this.token = null;
    this.tokenExpiry = null;
  }

  static getInstance() {
    if (!DirectLineManager.instance) {
      DirectLineManager.instance = new DirectLineManager();
    }
    return DirectLineManager.instance;
  }

  async init() {
    // If token exists and not expired → reuse
    if (this.directLine && this.token) {
      return this.directLine;
    }
    const dl = new DirectLine({
      secret: import.meta.env.VITE_DIRECT_LINE_SECRET
    });
    console.log("Direct Line Secret:", import.meta.env.VITE_DIRECT_LINE_SECRET);
  
    this.token = dl.token;
    //this.tokenExpiry = Date.now() + (dl.tokenExpiry - 60) * 1000; // refresh 1 min early

    this.directLine = dl;

    return this.directLine;
  }

  async send(text) {
    const directLine = await this.init();

    return new Promise((resolve) => {
      let subscription;

      subscription = directLine.activity$.subscribe(activity => {
        if (activity.type === "message" && activity.from.role === "bot") {
          subscription.unsubscribe();

          let parsed = {};
          try {
            parsed = JSON.parse(activity.text);
          } catch {
            parsed = { text: activity.text };
          }

          resolve(parsed);
        }
      });

      directLine.postActivity({
        from: { id: "user1", role: "user" },
        type: "message",
        text
      }).subscribe();
    });
  }
}

export default DirectLineManager.getInstance();
