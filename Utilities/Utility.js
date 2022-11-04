const readingTime = (article) => {
  const lengthOfWords = article.split(" ").length;
  // using 200 as average words read per minute.
  const averageWords = lengthOfWords / 200;
  return Math.round(averageWords) === 0 ? 1 : Math.round(averageWords);
};

module.exports = { readingTime };
