import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams, useHistory } from "react-router-dom";
import Select from "react-select";
import FlipMove from "react-flip-move";

import { portfolioItems, allTags } from "../../data/portfolioData";

import useWindowDimensions from "../../hooks/windowDims";
import Markdown from "../Markdown/Markdown";
import "./styles.scss";

function ItemBody({ item = {} }) {
  const { breakpoint } = useWindowDimensions();
  const imgClass = breakpoint <= 2 ? "mobile" : "desktop";
  const imageArr = (breakpoint <= 2 ? item.mobileImages : item.desktopImages) || item.images;

  const images = imageArr.map((src) => (
    <div className={`carouselPage ${imgClass}`} key={src}>
      {src.endsWith(".mp4") || src.endsWith(".webm") ? (
        <video className={imgClass} muted={true} preload="metadata" src={src} autoPlay={true} loop={true} />
      ) : (
        <img className={imgClass} src={src} alt={src} loading="lazy" />
      )}
    </div>
  ));

  const tags = item.tags.map((e) => `_${e}_`).join(" - ");
  const md = `#\n\n${tags}\n\n${item.description}`;

  const showCarousel = images.length > 0;

  return (
    <div className={`showcaseItem`}>
      {showCarousel && (
        <Carousel
          renderThumbs={(e) => null}
          className={`scCarousel ${imgClass}`}
          infiniteLoop
          emulateTouch
          swipeScrollTolerance={0}
          useKeyboardArrows
        >
          {images}
        </Carousel>
      )}

      <Markdown text={md} />

      <h2>Other Projects:</h2>
    </div>
  );
}

function Header({ selectedItem, currentFilter, setFilter }) {
  const item = selectedItem || {};
  const { breakpoint } = useWindowDimensions();

  const selectOptions = allTags.map((key) => ({ value: key, label: key }));
  const currentFilterValue = selectOptions.filter((t) => currentFilter.includes(t.value));

  const { url, urlText = "Link", gitHub, title = "Portfolio" } = item;
  return (
    <div className="header" id="portfolio">
      <div className="btnContainer">
        {selectedItem && (
          <Link to="/">
            <div className="backBtn">Back</div>
          </Link>
        )}
      </div>
      <h1>{title}</h1>
      {selectedItem && (
        <div className="linkContainer">
          {gitHub && (
            <a href={gitHub} target="_blank" rel="noopener noreferrer">
              {" "}
              <i className="fab fa-github" /> {breakpoint > 0 && "GitHub"}
            </a>
          )}
          {url && (
            <a href={url} target="_blank" rel="noopener noreferrer">
              {" "}
              <i className="fas fa-globe"></i> {breakpoint > 0 && urlText}
            </a>
          )}
        </div>
      )}
      {!selectedItem && (
        <div className={`tagSearch ${currentFilterValue.length <= 1 ? "empty" : ""}`}>
          <Select
            options={selectOptions}
            isMulti
            onChange={(a) => setFilter(a.map((t) => t.value))}
            value={currentFilterValue}
            placeholder={
              <span className="searchPlaceholder">
                <i className="fas fa-search" /> Search...
              </span>
            }
            classNamePrefix="react-select"
            className="react-select"
          />
        </div>
      )}
    </div>
  );
}

function ItemCard({ item, selected }) {
  const selectedClass = selected ? "selected" : "";

  const history = useHistory();

  const handleClick = () => {
    setTimeout(() => {
      const top = document.querySelector(".showcase .header").offsetTop - 50;
      window.scrollTo({ top, behavior: "smooth" });
    }, 0);
    history.push(`/${item.key}`);
  };

  const tags = item.tags.map((tag) => (
    <div className="tag" key={tag}>
      {tag}
    </div>
  ));

  return (
    <div className={`sCard ${selectedClass}`} onClick={handleClick}>
      <div className="imgWrapper">
        <img src={item.coverImage} alt={item.title} />
      </div>
      <h2 className="title">{item.title}</h2>
      <p>{item.description.split("\n")[0]}</p>
      <div className="tagContainer">{tags}</div>

      <div className="links">
        <a href={item.gitHub} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <span className="icon">
            <i className="fab fa-github" />
          </span>
          <span className="text">GitHub</span>
        </a>
        <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
          <span className="icon">
            <i className="fas fa-globe" />
          </span>
          <span className="text">{item.urlText || "Link"}</span>
        </a>
      </div>
    </div>
  );
}

export default function Showcase() {
  const { item: selected } = useParams();
  const [currentFilter, setFilter] = useState([]);

  const selectedItem = portfolioItems.filter((i) => i.key === selected)[0];

  const cards = portfolioItems
    .filter((i) => i.tags.some((t) => currentFilter.includes(t)) || currentFilter.length === 0)
    .map((i) => <ItemCard key={i.key + "_card"} item={i} selected={i.key === selected} />)
    .map((i) => <span key={i.key + "_card"}>{i}</span>);

  // Pre load images to prevent pop in on carousels
  useEffect(() => {
    portfolioItems.forEach((i) => {
      if (i.desktopImages) {
        const img = new Image();
        img.src = i.desktopImages[0];
      }
      if (i.images) {
        const img = new Image();
        img.src = i.images[0];
      }
      if (i.mobileImages) {
        const img = new Image();
        img.src = i.mobileImages[0];
      }
    });
  });

  const animation = "fade";

  return (
    <div className="showcase _container">
      <Header
        selectedItem={selectedItem}
        allItems={portfolioItems}
        currentFilter={currentFilter}
        setFilter={setFilter}
      />
      {selected && <ItemBody item={selectedItem} />}
      <FlipMove className="cardGrid" enterAnimation={animation} leaveAnimation={animation}>
        {cards}
      </FlipMove>
    </div>
  );
}
