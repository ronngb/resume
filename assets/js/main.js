import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faEnvelope, faPhone, faGlobe, faLocationDot, faScrewdriverWrench, faBriefcase, faGraduationCap, faCode, faPrint, faCalendarDays } from '@fortawesome/free-solid-svg-icons'
import { faAddressBook } from '@fortawesome/free-regular-svg-icons'
import { faLinkedinIn, faGithubAlt } from "@fortawesome/free-brands-svg-icons"

import '../scss/main.scss'

library.add(faCircle,faAddressBook,faEnvelope,faPhone,faLinkedinIn,faGlobe,faGithubAlt,faLocationDot,faScrewdriverWrench,faBriefcase,faGraduationCap,faCode, faPrint, faCalendarDays)

dom.watch()

document.body.onload = cmdUtilities();

function cmdUtilities() {
  addPrintBtn()
}

function addPrintBtn() {
  const printBtn = document.getElementById("print_button");
  
  printBtn.addEventListener("click", () => {
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
