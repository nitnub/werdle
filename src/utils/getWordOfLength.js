export default async function getWordOfLength(length) {
  const req = await fetch('./res/words.sorted.json');
  const json = await req.json();

  const wordList = json[length].data;
  const word = wordList[Math.floor(Math.random() * wordList.length)];

  return await word.toUpperCase();
}
