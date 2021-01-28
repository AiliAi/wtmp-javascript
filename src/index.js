/*import sayHello from "./moduls/test-moduls.js";
console.log(sayHello('Aili'));*/

/*import {sayHello} from "./moduls/test-moduls.js";
import {setting} from "./moduls/test-moduls.js";
console.log(sayHello('Aili'));
console.log('application lang:', setting.lang);*/


/*import myModule from './moduls/test-moduls.js';
console.log('application lang:', myModule.setting.lang);
console.log(myModule.sayHello('Aili'));*/
import SodexoData from './modules/sodexo-data.js';
import FazerData from './modules/fazer-data.js';

let languageSetting = "fi";

let language = document.querySelector(".language");
language.innerHTML = "EN";
let random = document.querySelector(".random");
random.innerHTML = "satunnainen";

/**
 * Displays Sodexo lunch menu items as html list
 *
 * @param {Array} menu - Lunch menu array
 */
const renderMenu = (menu) => {
  const list = document.querySelector("#sodexo");
  list.innerHTML = "";
  for (const item of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};

/**
 * Displays Fazer lunch menu items as html list
 *
 * @param {Array} menu - Lunch menu array
 */
const renderMenu2 = (menu) => {
  const list = document.querySelector("#fazer");
  list.innerHTML = "";
  for (const item of menu) {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    list.appendChild(listItem);
  }
};


/**
 * Switch app lang en/fi
 */
const switchLanguage = () => {
  if (languageSetting === "fi") {
    language.innerHTML = "FI";
    random.innerHTML = "pick a dish";
    languageSetting = "en";
    renderMenu(SodexoData.coursesEn);
    renderMenu2(FazerData.coursesEn);
  } else {
    language.innerHTML = "EN";
    random.innerHTML = "satunnainen";
    languageSetting = "fi";
    renderMenu(SodexoData.coursesFi);
    renderMenu2(FazerData.coursesFi);
  }
  console.log("change language to: ", languageSetting);
};

/**
 * Sorts menu alphapetically
 *
 * @param {Array} menu
 * @param {string} order
 * @returns Sorted menu array
 */
const sortMenu = (menu, order) => {
  if (order == "desc") {
    return menu.sort().reverse();
  } else {
    return menu.sort();
  }
};

let ascEn = false;
let ascFi = false;
/**
 * Eventhandler for sort menu button
 */
const renderSortedMenu = () => {
  if (languageSetting === "en") {
    if (ascEn == false) {
      renderMenu(sortMenu(SodexoData.coursesEn, "asc"));
      renderMenu2(sortMenu(FazerData.coursesEn, "asc"));
      ascEn = true;
    } else {
      renderMenu(sortMenu(SodexoData.coursesEn, "desc"));
      renderMenu2(sortMenu(FazerData.coursesEn, "desc"));
      ascEn = false;
    }
  } else {
    if (ascFi == false) {
      renderMenu(sortMenu(SodexoData.coursesFi, "asc"));
      renderMenu2(sortMenu(FazerData.coursesFi, "asc"));
      ascFi = true;
    } else {
      renderMenu(sortMenu(SodexoData.coursesFi, "desc"));
      renderMenu2(sortMenu(FazerData.coursesFi, "desc"));
      ascFi = false;
    }
  }
};

/**
 * Picks a random dish from Sodexo lunch menu array
 *
 * @param {Array} menu
 * @returns string dish name
 */
const pickRandomDish = (menu) => {
  const randomIndex = Math.floor(Math.random() * menu.length);
  return menu[randomIndex];
};

const displayRandomDish = () => {
  if (languageSetting === "fi") {
  alert(pickRandomDish(SodexoData.coursesFi));
  } else {
    alert(pickRandomDish(SodexoData.coursesEn));
  }
};

/**
 * Picks all vegeterian dishes from Fazer lunch menu array
 */
const displayVegMenu = () => {
  if (languageSetting === "fi") {
    alert(FazerData.vegeMealsFi);
  } else {
    alert(FazerData.vegeMealsEn);
  }
};

const init = () => {
  document
    .querySelector("#switch-lang")
    .addEventListener("click", switchLanguage);
  document
    .querySelector("#sort-menu")
    .addEventListener("click", renderSortedMenu);
  document
    .querySelector("#pick-dish")
    .addEventListener("click", displayRandomDish);
  document
    .querySelector(".vegeMeals")
    .addEventListener("click", displayVegMenu);
  renderMenu(SodexoData.coursesFi);
  renderMenu2(FazerData.coursesFi);
  //TODO: render fazer data on page (use fazer-data.js module)
};
init();


//nav opening and closing
const navMenuIcon = document.querySelector(".hamburger");
const menu = document.getElementById("menu");

  const navMenu = () => {
    if (menu.style.display === "block") {
      menu.style.display = "none";
      navMenuIcon.style.backgroundColor = "";
    } else {
      menu.style.display = "block";
      navMenuIcon.style.backgroundColor = "#ffffff";
    }
  };

  navMenuIcon.addEventListener("click", navMenu);

  let banner = document.querySelector(".banner");
  let intro = document.querySelector(".intro");


let hideMenuWhenScrolling = () => {
  menu.style.display = "none";
  navMenuIcon.style.remove(a);
};

  //Change "nav menu" -> "hamburger"
if (matchMedia) {
  const mediaQuery1 = window.matchMedia("(max-width: 910px)");
  mediaQuery1.addListener(WidthChange);
  WidthChange(mediaQuery1);
}
// media query change 1: change "Lisää kuva" -> "+"
function WidthChange(mediaQuery1) {
  window.onscroll = () => {
    hideMenuWhenScrolling();
    };

  if (mediaQuery1.matches) {
    menu.style.display = "none";
    navMenuIcon.style.display='inline';
    intro.innerHTML = '';
    banner.innerHTML = `
    <section class="intro bc-color">
    <p>
      Missä tänään syötäisiin? Tuttu tarina ennen lounashetkeä.
    </p>
    <p>
      Palvelu etsii lähelläsi olevat lounaspaikat, sekä näyttää niiden päivittäisen lounaslistan.
      Viikottaiset lounaslistat ovat myös käytettävissäsi. Pääset niihin klikkaamalla ravintolan logoa.
    </p>
    </section>`;
  } else {
    menu.style.display = "block";
    navMenuIcon.style.display='none';
    banner.innerHTML = `
    <div class="banner-left">
    <p>LOUNARI.</p>
    <p>Missä tänään syötäisiin?</p>
    </div>
    <div class="banner-right"><img src="assets/food.jpg" alt="" /></div>`;

    intro.innerHTML = `
    <p>
      Missä tänään syötäisiin? Tuttu tarina ennen lounashetkeä.
    </p>
    <p>
      Palvelu etsii lähelläsi olevat lounaspaikat, sekä näyttää niiden päivittäisen lounaslistan.
      Viikottaiset lounaslistat ovat myös käytettävissäsi. Pääset niihin klikkaamalla ravintolan logoa.
    </p>`;
  }
}





