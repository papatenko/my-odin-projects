let Library = [];

// DOM Elements
const Title = document.getElementById("title");
const Author = document.getElementById("author");
const Pages = document.getElementById("pages");
const Read = document.getElementById("read");
const List = document.getElementById("list");
const Overlay = document.getElementById("overlay");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.readToString = read ? "Wait List" : "Finished";
  }
  toString() {
    return (
      "\n" +
      "Title: " +
      this.title +
      "\n\n" +
      "Author: " +
      this.author +
      "\n\n" +
      "Number of Pages: " +
      this.pages +
      "\n\n" +
      "Status: " +
      this.readToString +
      "\n"
    );
  }
}

function addBookToLibrary() {
  // Check if Book present
  if (Title.value === "" && Author.value === "" && Pages.value === "")
    return null;
  // Add Book
  Library.push(new Book(Title.value, Author.value, Pages.value, Read.value));
  // Unfill Form
  Title.value = "";
  Author.value = "";
  Pages.value = "";
  Read.checked = false;
  // Display Library
  displayLibrary();
}

function toggleOverlay() {}

function displayLibrary() {
  let libraryToString = "";
  for (let index = 0; index < Library.length; index++) {
    libraryToString += Library[index].toString();
    for (let index = 0; index < 25; index++) {
      libraryToString += "-";
    }
  }
  List.innerText = libraryToString;
}
