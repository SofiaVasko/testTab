import { useState, useEffect, useRef } from "react";
import "./App.css";

import uuid4 from "uuid4";
import one from "./assets/1.png";
import two from "./assets/2.png";
import three from "./assets/3.png";
import four from "./assets/4.png";
import five from "./assets/5.png";
import six from "./assets/6.png";
import seven from "./assets/7.png";
import eight from "./assets/8.png";
import nine from "./assets/9.png";
import ten from "./assets/10.png";
import eleven from "./assets/11.png";
import twelve from "./assets/12.png";
import thirteen from "./assets/13.png";
import fourteen from "./assets/14.png";
import fifteen from "./assets/15.png";
import sixteen from "./assets/16.png";
import seventeen from "./assets/17.png";
import eightteen from "./assets/18.png";
import pin from "./assets/pin.png";

const allTabs = [
  {
    id: uuid4(),
    img: one,
    pinned: false,
    url: "/tab1",
    content: "Lagerverwaltung",
  },
  { id: uuid4(), img: two, pinned: false, url: "/tab2", content: "Dashboard" },
  { id: uuid4(), img: three, pinned: false, url: "/tab3", content: "Banking" },
  { id: uuid4(), img: four, pinned: false, url: "/tab4", content: "Telefonie" },
  {
    id: uuid4(),
    img: five,
    pinned: false,
    url: "/tab5",
    content: "Accounting",
  },
  { id: uuid4(), img: six, pinned: false, url: "/tab6", content: "Verkauf" },
  {
    id: uuid4(),
    img: seven,
    pinned: false,
    url: "/tab7",
    content: "Statistik",
  },
  {
    id: uuid4(),
    img: eight,
    pinned: false,
    url: "/tab8",
    content: "Post Office",
  },
  {
    id: uuid4(),
    img: nine,
    pinned: false,
    url: "/tab9",
    content: "Administration",
  },
  { id: uuid4(), img: ten, pinned: false, url: "/tab10", content: "Help" },
  {
    id: uuid4(),
    img: eleven,
    pinned: false,
    url: "/tab11",
    content: "Warenbestand",
  },
  {
    id: uuid4(),
    img: twelve,
    pinned: false,
    url: "/tab12",
    content: "Auswahllisten",
  },
  {
    id: uuid4(),
    img: thirteen,
    pinned: false,
    url: "/tab13",
    content: "Einkauf",
  },
  {
    id: uuid4(),
    img: fourteen,
    pinned: false,
    url: "/tab14",
    content: "Rechn",
  },
  {
    id: uuid4(),
    img: fifteen,
    pinned: false,
    url: "/tab15",
    content: "Lagerverwaltung",
  },
  {
    id: uuid4(),
    img: sixteen,
    pinned: false,
    url: "/tab16",
    content: "Verkauf",
  },
  {
    id: uuid4(),
    img: seventeen,
    pinned: false,
    url: "/tab17",
    content: "Post Office",
  },
  {
    id: uuid4(),
    img: eightteen,
    pinned: false,
    url: "/tab18",
    content: "Telefonie",
  },
];

function App() {
  const path = window.location.pathname;
  const storageTabs = JSON.parse(localStorage.getItem("storageTabs"));

  const [tabs, setTabs] = useState(
    storageTabs && storageTabs.length !== 0 ? storageTabs : allTabs
  );
  const [visibleTabs, setVisibleTabs] = useState([]);
  const [visibleDropdown, setVisibleDropdown] = useState(false);

  function handleDeleteButton(id) {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
  }

  function handlePinnedTab(id) {
    setTabs((prevTabs) => {
      const updateTabs = prevTabs.map((tab) => {
        return tab.id === id ? { ...tab, pinned: !tab.pinned } : tab;
      });
      return [
        ...updateTabs.filter((tab) => tab.pinned),
        ...updateTabs.filter((tab) => !tab.pinned),
      ];
    });
  }

  useEffect(() => {
    localStorage.setItem("storageTabs", JSON.stringify(tabs));
  }, [tabs]);

  useEffect(() => {
    function handleTabs() {
      const widthContainer = document.querySelector(".wrapperTabs").offsetWidth;
      const widthTab = widthContainer < 380 ? 100 : 150;
      const maxTabs = Math.floor(widthContainer / widthTab);
      setVisibleTabs(tabs.slice(0, maxTabs));
    }
    handleTabs();

    window.addEventListener("resize", handleTabs);
    return () => {
      window.removeEventListener("resize", handleTabs);
    };
  }, [tabs]);

  function handleDropdown() {
    setVisibleDropdown(!visibleDropdown);
  }

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    const dragItemIndex = tabs.findIndex((tab) => tab.id === dragItem.current);
    const dragOverItemIndex = tabs.findIndex(
      (tab) => tab.id === dragOverItem.current
    );

    const updatedTabs = [...tabs];
    const draggedTab = updatedTabs.splice(dragItemIndex, 1)[0];
    updatedTabs.splice(dragOverItemIndex, 0, draggedTab);
    dragItem.current = null;
    dragOverItem.current = null;
    setTabs(updatedTabs);
  };

  return (
    <>
      <div className="wrapperTabs">
        {visibleTabs.map((tab) => {
          return (
            <div
              key={tab.id}
              className={`tab ${path === tab.url ? "activeTab" : ""}`}
              draggable
              onDragStart={() => (dragItem.current = tab.id)}
              onDragEnter={() => (dragOverItem.current = tab.id)}
              onDragOver={(e) => e.preventDefault()}
              onDragEnd={handleSort}
            >
              <img src={tab.img} alt="tab icon" />
              <a href={tab.url}>{tab.content}</a>
              <button
                className="tabClosed"
                onClick={() => handleDeleteButton(tab.id)}
              >
                x
              </button>
              <div className="pinned" onClick={() => handlePinnedTab(tab.id)}>
                <img src={pin} alt="pin icon" />
                <span>{tab.pinned ? "Tab pinnen" : "Tab anpinnen"}</span>
              </div>
            </div>
          );
        })}
        {tabs.length > visibleTabs.length ? (
          <button className="dropdownBtn" onClick={handleDropdown}>
            ^
          </button>
        ) : null}

        {visibleDropdown ? (
          <div className="dropdownMenu">
            {" "}
            {tabs.slice(visibleTabs.length).map((tab) => {
              return (
                <div
                  key={tab.id}
                  className={`tab ${path === tab.url ? "activeTab" : ""}`}
                  draggable
                  onDragStart={() => (dragItem.current = tab.id)}
                  onDragEnter={() => (dragOverItem.current = tab.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDragEnd={handleSort}
                >
                  <img src={tab.img} alt="tab icon" />
                  <a href={tab.url}>{tab.content}</a>
                  <button
                    className="tabClosed"
                    onClick={() => handleDeleteButton(tab.id)}
                  >
                    x
                  </button>
                  <div
                    className="pinned"
                    onClick={() => handlePinnedTab(tab.id)}
                  >
                    <img src={pin} alt="pin icon" />
                    <span>{tab.pinned ? "Tab pinnen" : "Tab anpinnen"}</span>
                  </div>
                </div>
              );
            })}{" "}
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
