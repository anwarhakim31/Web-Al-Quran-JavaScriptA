const searchbtn = document.querySelector(".search-btn");
const searcharea = document.querySelector(".search-area");
const searchclose = document.querySelector(".search-close");
const searchinput = document.querySelector(".input-search");
const searchform = document.querySelector(".search-form");

searchbtn.addEventListener("click", function (e) {
  e.preventDefault();
  searcharea.classList.add("search-show");
  searchinput.focus();
});

searchclose.onclick = () => {
  searcharea.classList.remove("search-show");
};

window.addEventListener("click", function (e) {
  //   if(!searchform.contains(e.target))
  if (!searchform.contains(e.target) && !searchbtn.contains(e.target)) {
    searcharea.classList.remove("search-show");
  }
});

function getsurah() {
  const url = `https://equran.id/api/v2/surat`;

  fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response) {
        throw new Error(Response.status);
      }
      return response.json();
    })
    .then(({ data }) => {
      let list = "";
      data.forEach((quran) => {
        list += template(quran);
      });
      console.log(list);
      const body = document.querySelector(".body-content");
      body.innerHTML = list;
    })
    .catch((err) => {
      console.log(err);
    });
}

getsurah();

function template(quran) {
  return ` <li class="box">
            <div class="box-left">
              <div class="border">
                <div class="number">
                  <span> ${quran.nomor} </span>
                </div>
                <img src="images/border.png" alt="" />
              </div>
              <div class="title">
                <h4 class="chapt">${quran.namaLatin}</h4>
                <h6 class="detail">
                  <span class="translate">${quran.arti}</span>
                </h6>
              </div>
            </div>
            <div class="box-right">
              <h4 class="arabic">${quran.nama}</h4>
              <h6><span class="ayat">${quran.jumlahAyat} Ayat</span></h6>
            </div>
          </li>`;
}
