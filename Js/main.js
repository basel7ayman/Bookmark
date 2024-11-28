var siteName = document.getElementById("site-name");
var siteUrl = document.getElementById("site-url");

var allSites = [];


if (localStorage.getItem("all") !== null) {
  allSites = JSON.parse(localStorage.getItem("all"));
  display();
}
function submit() {
  var nameRegex = /^[a-zA-Z]{3,}$/; 
  var urlRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  var submitInput = {
    nameInput: siteName.value,
    urlInput: siteUrl.value,
  };

  if (!nameRegex.test(siteName.value)) {
    window.alert("Site Name must be at least 3 letters long.");
  }
  else if (!urlRegex.test(siteUrl.value)) {
    window.alert("Site URL must be in the format 'example.com'.");
  }
  else{

  allSites.push(submitInput)
  localStorage.setItem("all", JSON.stringify(allSites));

  display();
  clear();
  console.log(allSites);

}
}

function clear() {
  siteName.value = "";
  siteUrl.value = "";
}

function display() {
  var cartoona = "";

  for (var i = 0; i < allSites.length; i++) {
    cartoona += `
      <tr class="text-center">
        <td>${i + 1}</td>
        <td>${allSites[i].nameInput}</td>
        <td>
          <a class="btn btn-info" href="https://${allSites[i].urlInput}" target="_blank">Visit</a>
        </td>
        <td>
          <button class="btn btn-danger" onclick="deleteBookmark(${i})">Delete</button>
        </td>
      </tr>
    `;
  }

  document.getElementById("tableContent").innerHTML = cartoona;
}

function deleteBookmark(index) {
  allSites.splice(index, 1);

  localStorage.setItem("all", JSON.stringify(allSites));

  display();
}
