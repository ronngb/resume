import '../scss/main.scss'

document.body.onload = cmdUtilities();

function cmdUtilities() {
  addPrintBtn()
  addDownloadBtn() 
}

function addPrintBtn() {
  const elPrintBtn = document.createElement("button");
  const mainTag = document.getElementsByTagName("main");

  elPrintBtn.classList.add("print__button");

  elPrintBtn.setAttribute("title", "Print Resume");

  document.body.insertBefore(elPrintBtn, mainTag[0]);

  elPrintBtn.addEventListener("click", () => {
    print();
  });
}

function addDownloadBtn() {
  const elDownloadBtn = document.createElement("a");
  
  const mainTag = document.getElementsByTagName("main");

  elDownloadBtn.classList.add("download__button");

  elDownloadBtn.setAttribute("title", "Download PDF");
  
  elDownloadBtn.setAttribute("href", "assets/pdf/ronn-front-end-web-developer.pdf");

  elDownloadBtn.setAttribute("target", "_blank");

  document.body.insertBefore(elDownloadBtn, mainTag[0]);

  // elDownloadBtn.addEventListener("click", () => {
  //   print();
  // });
}


/* function addDownloadBtn() {
  const elDownloadBtn = document.createElement("button");
  // const elDownloadLink = document.createElement("a");
  const mainTag = document.getElementsByTagName("main");

  elDownloadBtn.classList.add("download__button");

  // elDownloadBtn.appendChild(elDownloadLink);

  elDownloadBtn.setAttribute("title", "Download PDF");
  
  elDownloadLink.setAttribute("href", "assets/pdf/test.pdf");
  

  document.body.insertBefore(elDownloadBtn, mainTag[0]);

  // elDownloadBtn.addEventListener("click", () => {
  //   print();
  // });
} */
