document.body.onload = addPrintBtn();

function addPrintBtn() {
  const elPrintBtn = document.createElement("button");
  const mainTag = document.getElementsByTagName("main");

  elPrintBtn.classList.add("print__button");

  elPrintBtn.setAttribute("title", "Print");

  document.body.insertBefore(elPrintBtn, mainTag[0]);

  elPrintBtn.addEventListener("click", () => {
    print();
  });
}
