import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import alan from "./img/alan.jpg";
import wordsToNumbers from "words-to-numbers";
const alanKey =
  "4c515a86d2bf9c9e4397ced0310e17f02e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticles] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    console.log("re-render");
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newsHeadlines") {
          setNewsArticles(articles);
          setActiveArticles(-1);
        } else if (command === "highlight") {
          setActiveArticles((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          console.log(number);
          if (isNaN(number)) {
            number = wordsToNumbers(number);
            console.log("Converted word to number");
            console.log(number);
          }
          const index = parseInt(number) - 1;
          console.log(articles[index]);
          window.open(
            articles[index].url,
            "_newtab" + Math.floor(Math.random() * 999999)
          );
        }
      },
    });
  }, []);
  return (
    <div className="App">
      <div className={classes.logoContainer}>
        <img src={alan} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
