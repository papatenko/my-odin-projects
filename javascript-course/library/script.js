let Library = [];

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  // DOM Element Creation Methods
  appendTitle(parentDiv) {
    var titleElement = document.createElement("p");
    titleElement.innerText = '"' + this.title + '"';
    parentDiv.appendChild(titleElement);
  }
  appendAuthor(parentDiv) {
    var authorElement = document.createElement("p");
    authorElement.innerText = "by " + this.author;
    parentDiv.appendChild(authorElement);
  }
  appendPages(parentDiv) {
    var pagesElement = document.createElement("p");
    pagesElement.innerText = this.pages + " pages";
    parentDiv.appendChild(pagesElement);
  }
  appendReadButton(parentDiv) {
    var readButton = document.createElement("button");
    var readToString = (read) => {
      return read ? "Not Read" : "Read";
    };
    readButton.innerText = readToString(this.read);
    readButton.addEventListener("click", () => {
      this.read = !this.read;
      readButton.innerText = readToString(this.read);
    });
    parentDiv.appendChild(readButton);
  }
  appendRemoveButton(parentDiv) {
    var removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", () => {
      const index = searchLibrary(this.createBookObject());
      Library.splice(index, 1);
      displayLibrary();
    });
    parentDiv.appendChild(removeButton);
  }
  createBookObject() {
    const bookObject = document.createElement("div");
    const textWrapper = document.createElement("div");
    const buttonWrapper = document.createElement("div");
    bookObject.id = "book";
    textWrapper.id = "book-text";
    buttonWrapper.id = "book-buttons";
    this.appendTitle(textWrapper);
    this.appendAuthor(textWrapper);
    this.appendPages(textWrapper);
    this.appendReadButton(buttonWrapper);
    this.appendRemoveButton(buttonWrapper);
    bookObject.appendChild(textWrapper);
    bookObject.appendChild(buttonWrapper);
    return bookObject;
  }
  getID() {
    return this.id;
  }
  toString() {
    return (
      "Title: " +
      this.title +
      "\n" +
      "Author: " +
      this.author +
      "\n" +
      "Number of Pages: " +
      this.pages +
      "\n" +
      "Read: " +
      this.read
    );
  }
}

function addBookToLibrary() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");
  const read = document.getElementById("read");

  // Check if Book form is filled
  if (title.value === "" || author.value === "" || pages.value === "")
    return null;

  // Add book object to Library
  const book = new Book(
    title.value,
    author.value,
    pages.value,
    read.value,
    Library.length - 1 // To match current index in array
  );
  Library.push(book.createBookObject());

  // Unfill Form
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;

  // Display Library
  displayLibrary();
  toggleOverlay();
}

function displayLibrary() {
  // Create list element if list element isn't already present
  var list = document.getElementById("list")
    ? document.getElementById("list")
    : document.createElement("div");

  list.id = "list";
  list.replaceChildren(...Library);

  if (!document.getElementById("list"))
    document.getElementById("library").prepend(list);
  else if (Library.length === 0) {
    document.getElementById("list").remove();
  }
}

function searchLibrary(book) {
  for (let index = 0; index < Library.length; index++) {
    if (book.isEqualNode(Library[index])) {
      return index;
    }
  }
  return -1;
}

function toggleOverlay() {
  const popup = document.getElementById("popup");
  var currentDisplay = popup.style.display.toString();
  var bookAdder = document.getElementById("book-adder-img");
  if (currentDisplay === "none" || currentDisplay.length === 0) {
    popup.style["display"] = "flex";
    bookAdder.style["transform"] = "rotate(45deg)";
  } else {
    popup.style["display"] = "none";
    bookAdder.style["transform"] = "rotate(0deg)";
  }
}

function changeBackground() {
  const file = document.querySelector("input[type=file]").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      var result = "url('" + reader.result + "')";
      document.body.style["background"] = result;
      document.body.style["background-size"] = "cover";
    },
    false
  );

  if (file) {
    console.log(file);
    reader.readAsDataURL(file);
  }
}
function resetBackground() {
  document.body.style["background"] = "url(./img/library.png)";
  document.body.style["background-size"] = "cover";
}
