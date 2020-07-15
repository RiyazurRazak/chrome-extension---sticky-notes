const saveBtn = document.getElementById("btn")
const content = document.getElementById("content-box")
const dateTag = document.getElementById("date")
const title = document.getElementById("title")
const dateHandler = new Date()
const date = dateHandler.getDate()
const day = dateHandler.getMonth()
const year = dateHandler.getFullYear()
const dateString = `${date}/${day}/${year}`
 dateTag.innerText = dateString
let url = null;


function getPdf(){

      let pdf = new jsPDF('p', 'pt', 'letter');
      let source = `<h2>Date:</h2> ${dateString} <br> <h2>Title:</> ${title.value} <br> <h2>URL:</h2> ${url} <br> <h2>Content:</h2>  ${content.value}`
      specialElementHandlers = {
         '#bypassme': function (element, renderer) {
             return true
         }
     };
      margins = {
         top: 80,
         bottom: 60,
         left: 40,
         width: 522
     };
     pdf.fromHTML(
         source, // HTML string or DOM elem ref.
         margins.left, // x coord
         margins.top, { // y coord
             'width': margins.width, // max width of content on PDF
             'elementHandlers': specialElementHandlers
         },

         function (dispose) {
            
             pdf.save(`${title.value}.pdf`);
         }, margins);
     }

   chrome.tabs.query({
      currentWindow: true,
      active: true
  }, function urlhandler (tabs) {
      url = tabs[0].url
   
  });
   
saveBtn.addEventListener("click", getPdf)
