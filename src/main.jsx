import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Header from "./components/Header";

export const initAPIMock = async () => {
  const { worker } = await import("./server/worker.js");
  await worker.start({
    onUnhandledRequest: "bypass",
  });
};

const initApplication = async () => {
  await initAPIMock();
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <App />
        </main>
      </div>
    </React.StrictMode>
  );
};

initApplication();
