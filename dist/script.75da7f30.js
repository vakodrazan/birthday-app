// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"libs/elements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetSearch = exports.formSearch = exports.searchByMonth = exports.searchByName = exports.addListBtn = exports.article = void 0;
// Call the existing element from html file
const article = document.querySelector('article.article-app');
exports.article = article;
const addListBtn = document.querySelector('button.addList');
exports.addListBtn = addListBtn;
const searchByName = document.querySelector('input.searchName');
exports.searchByName = searchByName;
const searchByMonth = document.querySelector('select.searchMonth');
exports.searchByMonth = searchByMonth;
const formSearch = document.querySelector('form.formSearch');
exports.formSearch = formSearch;
const resetSearch = document.querySelector('button.resetSearch');
exports.resetSearch = resetSearch;
},{}],"libs/generate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePeopleList = generatePeopleList;

function generatePeopleList(people) {
  const sortedPeople = people.sort(function (a, b) {
    function peopleBirthday(month, day) {
      let today = new Date(),
          currentYear = today.getFullYear(),
          next = new Date(currentYear, month - 1, day);
      today.setHours(0, 0, 0, 0);
      if (today > next) next.setFullYear(currentYear + 1);
      return Math.round((next - today) / 8.64e7);
    }

    let birthdayA = peopleBirthday(new Date(a.birthday).getMonth() + 1, new Date(a.birthday).getDate());
    let birthdayB = peopleBirthday(new Date(b.birthday).getMonth() + 1, new Date(b.birthday).getDate());
    return birthdayA - birthdayB;
  });
  return sortedPeople.map(person => {
    // Get the suffix for the date 
    function nthDate(day) {
      if (day > 3 && day < 21) return "th";

      switch (day % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    } // Get the birthday date


    const today = new Date();
    const currentDate = new Date(person.birthday);
    const currentDay = currentDate.getDate();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const fullDate = `${currentDay}${nthDate(currentDay)} / ${month + 1} / ${year}`;
    const futureAge = today.getFullYear() - year; // ********** Counting date ******** \\
    // Counting how many days left untill the person's birthday

    const momentYear = today.getFullYear();
    const birthDayDate = new Date(momentYear, month, currentDay);
    let oneDay = 1000 * 60 * 60 * 24;
    const getTheDate = birthDayDate.getTime() - today.getTime();
    const dayLeft = Math.ceil(getTheDate / oneDay);
    const birthdayInDate = dayLeft < 0 ? 365 + dayLeft : dayLeft;
    return `
                    <section data-id="${person.id}" class="person-list"> 
                        <div class="item-about">
                            <img class="person-avantar" src="${person.picture}" alt="This the picture for ${person.firstName} ${person.lastName}">
                            <div>
                                <span class="personName">${person.firstName} ${person.lastName}</span>
                                <p class="personAge">
                                    Turns <span class="age">${dayLeft < 0 ? futureAge + 1 : futureAge}</span> on 
                                    ${new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    })}
                                    <time datetime="${fullDate}">
                                        ${new Date(person.birthday).toLocaleString("en-US", {
      day: "numeric"
    })}<sup>${nthDate(currentDay)}</sup>
                                    </time> 
                                </p>
                            </div>
                        </div>
                        
                        <div class="wrapper-actions">
                            <time datetime="${fullDate}" class="date">
                                    In ${birthdayInDate > 1 ? `${birthdayInDate} days` : birthdayInDate < 1 ? "Happy birthday" : `${birthdayInDate} day`}
                            </time>
                            <div class="actions">
                                <button class="edit" data-id="${person.id}">
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.75 5H5C4.33696 5 3.70107 5.26339 3.23223 5.73223C2.76339 6.20107 2.5 6.83696 2.5 7.5V25C2.5 25.663 2.76339 26.2989 3.23223 26.7678C3.70107 27.2366 4.33696 27.5 5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V16.25" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M23.125 3.125C23.6223 2.62772 24.2967 2.34835 25 2.34835C25.7033 2.34835 26.3777 2.62772 26.875 3.125C27.3723 3.62228 27.6517 4.29674 27.6517 5C27.6517 5.70326 27.3723 6.37772 26.875 6.875L15 18.75L10 20L11.25 15L23.125 3.125Z" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                                <button class="delete" data-id="${person.id}">
                                    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26.25 1H10L1.25 11L10 21H26.25C26.913 21 27.5489 20.7366 28.0178 20.2678C28.4866 19.7989 28.75 19.163 28.75 18.5V3.5C28.75 2.83696 28.4866 2.20107 28.0178 1.73223C27.5489 1.26339 26.913 1 26.25 1V1Z" stroke="#EF4565" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M22.5 7.25L15 14.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M15 7.25L22.5 14.75" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>
                `;
  }).join('');
}
},{}],"libs/stroringFuctionalities.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterPersonByName = filterPersonByName;
exports.filterPersonByMonth = filterPersonByMonth;
exports.hideScrollBar = hideScrollBar;
exports.showScrollBar = showScrollBar;

var _elements = require("./elements");

const body = document.body; // Filter the person from the list by searching their name

function filterPersonByName(people) {
  // Get the value of the input
  const input = _elements.searchByName.value;
  const inputSearch = input.toLowerCase(); // Filter the list by the firstname or lastname

  return people.filter(person => person.lastName.toLowerCase().includes(inputSearch) || person.firstName.toLowerCase().includes(inputSearch));
} // Filter by month


function filterPersonByMonth(people) {
  // Get the value of the select input
  const select = _elements.searchByMonth.value;
  const filterPerson = people.filter(person => {
    // Change the month of birth into string
    const getMonthOfBirth = new Date(person.birthday).toLocaleString("en-US", {
      month: "long"
    }); // Filter the list by the month of birth

    return getMonthOfBirth.toLowerCase().includes(select.toLowerCase());
  });
  return filterPerson;
} // avoid scrolling


function hideScrollBar() {
  body.style.overflowY = "hidden";
}

function showScrollBar() {
  body.style.overflowY = "unset";
}
},{"./elements":"libs/elements.js"}],"libs/timing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wait = wait;
exports.destroyPopup = destroyPopup;

// Here are something to do with the popup
function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
  popup.classList.remove('open');
  await wait(500);
  popup.remove();
  popup = null;
}
},{}],"people.json":[function(require,module,exports) {
module.exports = [{
  "id": "1fbef8c1-9823-4cb5-b138-259fed0fb2b1",
  "lastName": "Kihn",
  "firstName": "Effie",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 92614674399
}, {
  "id": "567084f7-b7e8-41ba-90cb-be5ff8d78b68",
  "lastName": "Spinka",
  "firstName": "Adriel",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1093495104944
}, {
  "id": "35194943-2f14-4066-89c7-e3101ad5bde1",
  "lastName": "Schaefer",
  "firstName": "Ricky",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 117168543755
}, {
  "id": "f972f811-1fb5-4a12-b64b-23a6c41d8673",
  "lastName": "Jones",
  "firstName": "Laila",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 166977747202
}, {
  "id": "2ebb247d-271c-4ead-a71f-7663824ada00",
  "lastName": "Lebsack",
  "firstName": "Drake",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1566102146696
}, {
  "id": "2b60062b-2bbb-4ea4-a139-33b8fc2aad9a",
  "lastName": "Pfeffer",
  "firstName": "Jennie",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 1011935832093
}, {
  "id": "faed72a5-986d-43ec-8579-423e5b76f5f2",
  "lastName": "Kunde",
  "firstName": "Jolie",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 1401888987134
}, {
  "id": "9d180b9b-2601-4a1e-b4a1-9e8fded6f394",
  "lastName": "O'Keefe",
  "firstName": "Joseph",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 1037798625865
}, {
  "id": "1ea7ab1f-1eb2-4a56-ad45-df5cf1ec85cc",
  "lastName": "O'Reilly",
  "firstName": "Jameson",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 826879604467
}, {
  "id": "e535a43c-5271-4257-812f-76be426bae67",
  "lastName": "Wilkinson",
  "firstName": "Kenyon",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 1402692289892
}, {
  "id": "cca604b9-8e16-4f9a-a37e-deebe0de505f",
  "lastName": "Mertz",
  "firstName": "Claude",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 317143779641
}, {
  "id": "cac8615a-0730-4519-b4b7-34c9592d2470",
  "lastName": "Harvey",
  "firstName": "Shyanne",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 592513896097
}, {
  "id": "f838e9aa-56d2-4f03-ab11-47673a217fc5",
  "lastName": "Gleason",
  "firstName": "Orpha",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 706617912851
}, {
  "id": "dc93f4ff-3eae-426e-a40f-1e0d189f7a43",
  "lastName": "Greenholt",
  "firstName": "Florine",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 1297302808569
}, {
  "id": "c81b341a-e9f4-4a12-978a-6a412780946f",
  "lastName": "Lind",
  "firstName": "Ryder",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 753139681691
}, {
  "id": "9b760e4e-56d4-4e75-9cf1-277fc35d6083",
  "lastName": "Spinka",
  "firstName": "Alicia",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 469245384916
}, {
  "id": "11e72616-7db2-4729-ba7b-1bef4271947b",
  "lastName": "Bogan",
  "firstName": "Garret",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 1554677632443
}, {
  "id": "48ca5747-006c-45e5-bc6b-d2e188f2057a",
  "lastName": "Boyer",
  "firstName": "Leonora",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 440480006308
}, {
  "id": "6ab44432-0347-4aa7-9011-b2d9a263e941",
  "lastName": "Nikolaus",
  "firstName": "Melvin",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 1232166787673
}, {
  "id": "32067372-10b1-47d9-85fa-05c37f34bf79",
  "lastName": "Keeling",
  "firstName": "Sherwood",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1264333932408
}, {
  "id": "d6b9cf39-d584-4e45-9d38-991515a0bc1a",
  "lastName": "Cummings",
  "firstName": "Tamia",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 664906190643
}, {
  "id": "a2794f53-c333-4913-97a7-42c0c31569c2",
  "lastName": "Kozey",
  "firstName": "Bill",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 360186233472
}, {
  "id": "c54f8e30-1abe-4191-86e3-221763991ec0",
  "lastName": "Haley",
  "firstName": "Providenci",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 659156440897
}, {
  "id": "30c4ba46-c123-4789-bc87-b9cd342a08e7",
  "lastName": "Wisozk",
  "firstName": "Estella",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1556884005680
}, {
  "id": "00ba8ca2-84b6-49ee-adb1-5c27191f1af1",
  "lastName": "McDermott",
  "firstName": "Simone",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 1466166470473
}, {
  "id": "6aae79f4-6e0e-4fa4-a75a-06b1097c1bff",
  "lastName": "Bergnaum",
  "firstName": "Jermain",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 550478426776
}, {
  "id": "1d91be69-1b89-488c-90b8-96ad0e9eb302",
  "lastName": "Boehm",
  "firstName": "Harmony",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 116497780210
}, {
  "id": "6cc1fc84-7faf-464d-a920-3a81793bbc1c",
  "lastName": "Kuvalis",
  "firstName": "Anastasia",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 739887840848
}, {
  "id": "04960dd8-1cf8-4f20-b4d2-fa3521cfed2c",
  "lastName": "Pacocha",
  "firstName": "Jermaine",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1541837035997
}, {
  "id": "d510f4ba-5ab9-4f41-9e2f-0a3f8da46fe9",
  "lastName": "Robel",
  "firstName": "Orlando",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1147565321291
}, {
  "id": "cd4c7108-296e-43e2-b1bd-cf9e7e0d5222",
  "lastName": "Paucek",
  "firstName": "Tracy",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 169963737077
}, {
  "id": "b40e991c-8cee-44ef-a7a2-ce1fd6bee646",
  "lastName": "Ledner",
  "firstName": "Providenci",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 17617819249
}, {
  "id": "19efeb1b-2c56-4c7b-902c-7d46efc263c4",
  "lastName": "Rowe",
  "firstName": "Khalil",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 1453397714156
}, {
  "id": "4b545228-2d36-49df-a71f-65c245713137",
  "lastName": "Kuphal",
  "firstName": "Elmo",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1446407787878
}, {
  "id": "99538f88-ab0f-4be2-b574-21874a5d9f88",
  "lastName": "Littel",
  "firstName": "Eldridge",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 162542910895
}, {
  "id": "dfdee642-465d-4786-baec-ab3fbf5a6eac",
  "lastName": "Turner",
  "firstName": "Cletus",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 129709713903
}, {
  "id": "994a8152-6c94-44ea-ae7f-6be56700376f",
  "lastName": "Hoeger",
  "firstName": "Melany",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 1177729119656
}, {
  "id": "bd45b053-454c-47d6-afe5-6b8f8c82d751",
  "lastName": "Waelchi",
  "firstName": "Brooklyn",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 1157960290996
}, {
  "id": "c650e8c6-8326-4bc0-9f56-15eaea0a14b1",
  "lastName": "Corwin",
  "firstName": "Zane",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 1544760408259
}, {
  "id": "9f1b2352-7af2-4019-a035-b6459155a15f",
  "lastName": "Purdy",
  "firstName": "Terry",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 621418612875
}, {
  "id": "9af6b30e-4624-4c54-965f-8c7d5fc13a64",
  "lastName": "Rosenbaum",
  "firstName": "Monica",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 547296222344
}, {
  "id": "091e513a-0a56-49f8-a293-34a4f1931c22",
  "lastName": "Erdman",
  "firstName": "Aiden",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 472075142095
}, {
  "id": "3458830f-76ae-43ca-83b3-7325b47c729a",
  "lastName": "Hermann",
  "firstName": "Jovan",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1228116803428
}, {
  "id": "fcc014e9-6158-40cb-8f2d-847c1f7d2445",
  "lastName": "O'Connell",
  "firstName": "Gerda",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 965765455414
}, {
  "id": "e5c01b19-1e3a-4e99-abc3-5a4180c51c28",
  "lastName": "Greenholt",
  "firstName": "Tod",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 175348787477
}, {
  "id": "24fc248e-a710-43b5-be85-a07178380f80",
  "lastName": "Hirthe",
  "firstName": "Enid",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 991237731056
}, {
  "id": "77e343dc-b870-4cea-adf0-a83216f6dc1f",
  "lastName": "Jaskolski",
  "firstName": "Abe",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 460305517098
}, {
  "id": "c4784fb3-a9d7-489a-9a9a-4481921c67e9",
  "lastName": "Goodwin",
  "firstName": "Estevan",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1205001068753
}, {
  "id": "ccd71923-eef2-4b16-8d76-37d89f62d2ed",
  "lastName": "Schinner",
  "firstName": "Fay",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 1034738251297
}, {
  "id": "e2b1470f-f6d4-4885-9f05-71037f9622e4",
  "lastName": "Keebler",
  "firstName": "Alexis",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 917244318988
}, {
  "id": "6477cb17-9d8b-4be6-a426-924903cbb4ab",
  "lastName": "Littel",
  "firstName": "Reynold",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 747966972202
}, {
  "id": "a506e67f-269e-47a0-b486-3925874f6ec8",
  "lastName": "Deckow",
  "firstName": "Wilfrid",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 1574625676754
}, {
  "id": "2397dbbe-09ad-4863-966a-08e99734a96b",
  "lastName": "Daniel",
  "firstName": "Aglae",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 1475093885653
}, {
  "id": "12a33a94-c500-4b8a-944f-45ec046aa56b",
  "lastName": "Heidenreich",
  "firstName": "Cade",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 659966463878
}, {
  "id": "bc4cf231-30f3-4a5b-85ca-f1e9a68ad1bb",
  "lastName": "Kunde",
  "firstName": "Chanelle",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 771719125520
}, {
  "id": "51e3d5ab-2ddb-410b-adfc-0af340f1151e",
  "lastName": "Kiehn",
  "firstName": "Lilly",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 76090599167
}, {
  "id": "9c2aa110-8705-4c2a-b185-8f9f6e878070",
  "lastName": "Baumbach",
  "firstName": "Lina",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 276975856643
}, {
  "id": "b3f8d2a9-2abe-4926-85d4-0d10fa6e944b",
  "lastName": "Stanton",
  "firstName": "Jamel",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 515128025486
}, {
  "id": "795b28bf-7854-49ba-a210-454cd6165e5f",
  "lastName": "Erdman",
  "firstName": "Jovani",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 892704071397
}, {
  "id": "cc909ed2-d0f8-40c1-bce3-52911e27e76e",
  "lastName": "Reilly",
  "firstName": "Halle",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 902445552435
}, {
  "id": "3eb41f9e-7794-4e3d-bfb1-67a9ec6194c9",
  "lastName": "Johnson",
  "firstName": "Cayla",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 248897227496
}, {
  "id": "15703468-1fc9-446e-b67c-77f860f3968e",
  "lastName": "Nitzsche",
  "firstName": "Torey",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 533273249724
}, {
  "id": "28c64999-0521-47b9-9cb7-6aff60637284",
  "lastName": "Hagenes",
  "firstName": "Justen",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 1204806653040
}, {
  "id": "56e87b8a-b61a-4951-8e99-a37ad285033d",
  "lastName": "Muller",
  "firstName": "Winfield",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 487799206165
}, {
  "id": "c6369189-0b8e-44ac-b5bb-16b53ea64fed",
  "lastName": "Lynch",
  "firstName": "Gilberto",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 348905534786
}, {
  "id": "38343781-8e60-4bab-82e5-40689cb146c3",
  "lastName": "Bartoletti",
  "firstName": "Archibald",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1196990571546
}, {
  "id": "b2cf0b37-ab94-49e6-8663-3acc5573aab6",
  "lastName": "Green",
  "firstName": "Pasquale",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 591364313394
}, {
  "id": "1d0a6153-90b5-413a-ad77-9fbc93b6743b",
  "lastName": "Schroeder",
  "firstName": "Cullen",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 648765505104
}, {
  "id": "848c76f0-5eda-407b-9741-a57a239fff88",
  "lastName": "Rowe",
  "firstName": "Sheldon",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 602135119331
}, {
  "id": "45c13c58-42f5-49f3-bda9-8eefaaf837cc",
  "lastName": "Tremblay",
  "firstName": "Demetris",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 523837449396
}, {
  "id": "48bd55de-5562-494e-9121-dd49b81ebbce",
  "lastName": "Brekke",
  "firstName": "Pierce",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 1260467670757
}, {
  "id": "557860a1-6d76-4ce1-b7fc-0e3b53e44504",
  "lastName": "Parker",
  "firstName": "Ashleigh",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 80635078856
}, {
  "id": "06502f93-66e0-4b6e-bbcb-b6eef5af8445",
  "lastName": "Gaylord",
  "firstName": "Dayne",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 783687290088
}, {
  "id": "1f8c27a1-dfc9-4074-beb9-101eb92fbc70",
  "lastName": "Becker",
  "firstName": "Obie",
  "picture": "https://randomuser.me/api/portraits/men/32.jpg",
  "birthday": 529678676359
}, {
  "id": "e9432b38-addd-4723-9d3c-7f731b7cc8dd",
  "lastName": "McCullough",
  "firstName": "Millie",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 750084890351
}, {
  "id": "9c28486b-55e5-4a58-860e-0b2f723bac18",
  "lastName": "Bednar",
  "firstName": "Esmeralda",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 518566842049
}, {
  "id": "bf660b5d-6673-4a1b-b5df-763022867098",
  "lastName": "Murray",
  "firstName": "Kristopher",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 726792705575
}, {
  "id": "d18e09ae-1b08-4c10-a7af-0ad76f525169",
  "lastName": "McGlynn",
  "firstName": "Ray",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 1184062794388
}, {
  "id": "23fa30e1-72a5-4290-bc46-27200ff07d29",
  "lastName": "Boyer",
  "firstName": "Rene",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 1413512281834
}, {
  "id": "a2b63b0a-a062-4902-9f7e-cc3a20494c49",
  "lastName": "Windler",
  "firstName": "Trevor",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1528734074991
}, {
  "id": "400771e8-4c67-45ca-a4fd-063b45b2e837",
  "lastName": "Schultz",
  "firstName": "Jannie",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1451520121222
}, {
  "id": "2b1d9c28-fd0a-4708-91d4-de05c51197c8",
  "lastName": "Grady",
  "firstName": "Orval",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 990181241566
}, {
  "id": "1d7ad419-3a23-4426-8fcc-fa961f006be6",
  "lastName": "Wuckert",
  "firstName": "Columbus",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 348264676149
}, {
  "id": "43fbe560-9404-41c8-82ec-8e26ebb3fd21",
  "lastName": "Monahan",
  "firstName": "Logan",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 505395295801
}, {
  "id": "f5e911d2-65c4-46c2-8e2a-f51a9cada7b0",
  "lastName": "Corwin",
  "firstName": "Elliot",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 1404719180215
}, {
  "id": "be2030de-8587-4e4a-a9fd-bba5cc153752",
  "lastName": "Yost",
  "firstName": "Augustus",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 1062538395454
}, {
  "id": "37ebdb68-518e-4825-9143-9b312da2dd47",
  "lastName": "Larson",
  "firstName": "Bud",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 661268988883
}, {
  "id": "546dc03d-a05c-4e05-80a4-cd0ba29de142",
  "lastName": "Sanford",
  "firstName": "Harvey",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 410752382309
}, {
  "id": "2f35eec9-2325-4863-baa4-61aa4df6830e",
  "lastName": "Beahan",
  "firstName": "Helene",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 1486397531786
}, {
  "id": "6613b55c-db5e-4435-9eee-eff4b7f3547f",
  "lastName": "Feest",
  "firstName": "Kailey",
  "picture": "https://randomuser.me/api/portraits/men/1.jpg",
  "birthday": 1066423464923
}, {
  "id": "fa3cade3-fb19-4c20-b293-de5e22b1fdfb",
  "lastName": "Lowe",
  "firstName": "Clark",
  "picture": "https://randomuser.me/api/portraits/women/44.jpg",
  "birthday": 313154778249
}, {
  "id": "912bf8d0-2759-44dc-8793-009be5c13cd7",
  "lastName": "Ferry",
  "firstName": "Precious",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 138625637951
}, {
  "id": "76f9ca58-3c48-431c-8ef3-54cfdf19b23d",
  "lastName": "Weber",
  "firstName": "Naomie",
  "picture": "https://randomuser.me/api/portraits/men/97.jpg",
  "birthday": 981981239566
}, {
  "id": "4c8d9127-60ec-4bd6-a94e-ecd6cd621287",
  "lastName": "Boyer",
  "firstName": "Margret",
  "picture": "https://randomuser.me/api/portraits/women/79.jpg",
  "birthday": 1168677240324
}, {
  "id": "a5b05e3f-5cec-46e0-97b2-c844a341f6f3",
  "lastName": "Bechtelar",
  "firstName": "Evan",
  "picture": "https://randomuser.me/api/portraits/women/95.jpg",
  "birthday": 1139906216637
}, {
  "id": "fcc119ac-1cfe-4c20-b0bb-49ebc48dcf08",
  "lastName": "Kling",
  "firstName": "Colleen",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 159259345234
}, {
  "id": "8f224d1e-560d-46c2-b88d-73fc2d63b901",
  "lastName": "Anderson",
  "firstName": "Vito",
  "picture": "https://randomuser.me/api/portraits/women/47.jpg",
  "birthday": 937078493840
}, {
  "id": "00a3bf38-3ae8-4641-bffa-339c93eaf844",
  "lastName": "Huels",
  "firstName": "Rae",
  "picture": "https://randomuser.me/api/portraits/women/63.jpg",
  "birthday": 1052164956751
}, {
  "id": "db2b0e20-f0a3-40d3-8fc0-00a45524f83e",
  "lastName": "Krajcik",
  "firstName": "Felix",
  "picture": "https://randomuser.me/api/portraits/men/46.jpg",
  "birthday": 892895123355
}, {
  "id": "c90b8f62-7b31-433f-9e5e-a46ec7358cf6",
  "lastName": "Carter",
  "firstName": "Gerald",
  "picture": "https://randomuser.me/api/portraits/men/86.jpg",
  "birthday": 1372161498194
}];
},{}],"script.js":[function(require,module,exports) {
"use strict";

var _elements = require("./libs/elements.js");

var _generate = require("./libs/generate.js");

var _stroringFuctionalities = require("./libs/stroringFuctionalities.js");

var _timing = require("./libs/timing.js");

var _people = _interopRequireDefault(require("./people.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ******* Importing ********* \\
// Import all the export functions or elements that store in other files
// Import the local file that contains the data
// fetch data from the json file
async function fetchPeople() {
  let persons = _people.default; // display the list of people

  const displayList = () => {
    const html = (0, _generate.generatePeopleList)(persons);
    _elements.article.innerHTML = html;
  };

  displayList(); // ****** Edit ******* \\

  const editPeson = e => {
    // Set all the result of the edit here
    if (e.target.closest('button.edit')) {
      const tableRowEdit = e.target.closest('section');
      const id = tableRowEdit.dataset.id;
      editPersonPopup(id);
    }
  };

  const editPersonPopup = async idToEdit => {
    // Do all the code about the edit function here
    const person = persons.find(person => person.id == idToEdit);
    return new Promise(async function (resolve) {
      const popupElement = document.createElement('form');
      popupElement.classList.add('outerPopup');
      popupElement.classList.add('open');
      const newDate = new Date(person.birthday).toISOString().slice(0, 10);
      const maxDate = new Date().toISOString().slice(0, 10);
      popupElement.insertAdjacentHTML('afterbegin', `
                <div class="innerPopup">
                    <div class="wrapper-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <header class="title heading">
                            <h2 class="masthead">Edit ${person.firstName} ${person.lastName}</h2>
                        </header>
                        <div class="content">
                            <fieldset>
                                <label>Avantar</label>
                                <input type="url" name="picture" value="${person.picture}">
                            </fieldset>
                            <fieldset>
                                <label>Lastname</label>
                                <input type="text" name="lastName" value="${person.lastName}">
                            </fieldset>
                            <fieldset>
                                <label>Firstname</label>
                                <input type="text" name="firstName" value="${person.firstName}">
                            </fieldset>
                            <fieldset>
                                <label>Birthday</label>
                                <input type="date" name="birthday" max="${maxDate}" value="${newDate}">
                            </fieldset>
                            </div>
                            <div class="form-btn">
                                <button type="submit" class="submit call-to-action saveButton">Save changes</button>
                                <button type="button" class="cancel cancelButton">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
      (0, _stroringFuctionalities.hideScrollBar)();
      document.body.appendChild(popupElement);
      await (0, _timing.wait)(50);
      popupElement.classList.add('open'); // Reject the Changes

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _timing.destroyPopup)(popupElement);
          (0, _stroringFuctionalities.showScrollBar)();
        }
      }); // Submit the change

      popupElement.addEventListener('submit', e => {
        e.preventDefault();
        person.picture = popupElement.picture.value;
        person.lastName = popupElement.lastName.value;
        person.firstName = popupElement.firstName.value;
        person.birthday = popupElement.birthday.value;
        displayList(persons); // resolve(e.currentTarget.remove());

        (0, _timing.destroyPopup)(popupElement);

        _elements.article.dispatchEvent(new CustomEvent('updatePeopleLs'));

        (0, _stroringFuctionalities.showScrollBar)();
      }, {
        once: true
      });
    });
  }; // ****** Delete ****** \\
  // Remove the person from the list


  const deletePerson = e => {
    // call the function here
    if (e.target.closest('button.delete')) {
      const sectionElem = e.target.closest('section');
      const id = sectionElem.dataset.id;
      deletePersonPopup(id);
      (0, _stroringFuctionalities.hideScrollBar)();
    }
  };

  const deletePersonPopup = async idToDelete => {
    let person = persons.filter(person => person.id !== idToDelete);
    let selectPerson = persons.find(person => person.id === idToDelete);
    console.log(person); // Code all thecondition about the delete list here

    return new Promise(async function (resolve) {
      await (0, _timing.wait)(50);
      const divButton = document.createElement('div');
      divButton.classList.add('outerPopup');
      divButton.classList.add('open');
      divButton.insertAdjacentHTML('afterbegin', `
                <div class="innerPopup wrapper-content-button">
                    <div class="wrapper-content delete-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <p class="information heading">Are you sure you want to delete <strong>${selectPerson.firstName} ${selectPerson.lastName}</strong>?</p>
                        <div class="button-wraper">
                            <button class="remove call-to-action">Delete</button>
                            <button class="cancel cancelButton">Cancel</button>
                        </div>
                    </div>
                </div>
            `); // Reject it

      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _timing.destroyPopup)(divButton);
          (0, _stroringFuctionalities.showScrollBar)();
        }
      }); // Remove the person

      window.addEventListener('click', e => {
        if (e.target.closest('button.remove')) {
          persons = person;
          displayList(person);
          (0, _timing.destroyPopup)(divButton);

          _elements.article.dispatchEvent(new CustomEvent('updatePeopleLs'));

          (0, _stroringFuctionalities.showScrollBar)();
        }
      });
      document.body.appendChild(divButton);
    });
  }; // ************ Local storage ************* \\


  const initLocalStorage = () => {
    const personLs = JSON.parse(localStorage.getItem('persons'));

    if (personLs) {
      persons = personLs;
      displayList();
    }

    _elements.article.dispatchEvent(new CustomEvent('updatePeopleLs'));
  };

  const updateLocalStorage = () => {
    localStorage.setItem('persons', JSON.stringify(persons));
  }; // ************* Add Person in the list ************* \\


  const handleAddListBtn = id => {
    return new Promise(async function (resolve) {
      // Create a popup form when clicking the add button
      const popupAddForm = document.createElement('form');
      popupAddForm.classList.add('outerPopup');
      popupAddForm.classList.add('open');
      const maxDate = new Date().toISOString().slice(0, 10);
      popupAddForm.insertAdjacentHTML('afterbegin', `
                <div class="innerPopup">
                    <div class="wrapper-content">
                        <button type="button" class="cancel cancel-button">
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.5 14.5L14.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M14.5 14.5L43.5 43.5" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <header class="title heading">
                            <h2 class="masthead">Add person to the list</h2>
                        </header>
                        <div class="content">
                            <fieldset>
                                <label>Avantar</label>
                                <input type="url" name="pic" placeholder="Pictue url">
                            </fieldset>
                            <fieldset>
                                <label>Lastname</label>
                                <input type="text" name="lastname" placeholder="Type your lastname here">
                            </fieldset>
                            <fieldset>
                                <label>Firstname</label>
                                <input type="text" name="firstname" placeholder="Type your firstname here">
                            </fieldset>
                            <fieldset>
                                <label>Birthday</label>
                                <input type="date" name="birthDay" max="${maxDate}" placeholder="Find your birth date">
                            </fieldset>
                            <div class="form-btn">
                                <button type="submit" class="submit call-to-action">Submit</button>
                                <button type="button" class="cancel cancelButton">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            `);
      document.body.appendChild(popupAddForm);
      popupAddForm.classList.add('open');
      window.addEventListener('click', e => {
        if (e.target.closest('button.cancel')) {
          (0, _timing.destroyPopup)(popupAddForm);
          (0, _stroringFuctionalities.showScrollBar)();
        }
      }); // Listen to the submit event

      popupAddForm.addEventListener('submit', e => {
        e.preventDefault();
        const form = e.currentTarget; // Create a new object for the new

        const newPerso = {
          picture: form.pic.value,
          lastName: form.lastname.value,
          firstName: form.firstname.value,
          birthday: form.birthDay.value,
          id: Date.now()
        };
        persons.push(newPerso);
        displayList(persons);
        (0, _timing.destroyPopup)(popupAddForm);

        _elements.article.dispatchEvent(new CustomEvent('updatePeopleLs'));

        (0, _stroringFuctionalities.showScrollBar)();
      });
    });
  };

  const handleAddBtn = e => {
    if (e.target.closest('button.addList')) {
      handleAddListBtn();
      (0, _stroringFuctionalities.hideScrollBar)();
    }
  }; // *********** Filter ********* \\


  function filteredByNameAndMonth() {
    const filteredByName = (0, _stroringFuctionalities.filterPersonByName)(persons);
    const filteredByNameAndMonth = (0, _stroringFuctionalities.filterPersonByMonth)(filteredByName);
    const myHTML = (0, _generate.generatePeopleList)(filteredByNameAndMonth);
    _elements.article.innerHTML = myHTML;
  } // Reset search form


  const resteInputSearch = e => {
    _elements.formSearch.reset();

    displayList();
  }; // ******** Listeners ******* \\


  _elements.addListBtn.addEventListener('click', handleAddBtn);

  _elements.article.addEventListener('click', editPeson);

  _elements.article.addEventListener('click', deletePerson); // Custom event


  _elements.article.addEventListener('updatePeopleLs', updateLocalStorage); // Filter event


  _elements.searchByName.addEventListener('input', filteredByNameAndMonth);

  _elements.searchByMonth.addEventListener('input', filteredByNameAndMonth);

  _elements.resetSearch.addEventListener('click', resteInputSearch);

  initLocalStorage();
}

fetchPeople();
},{"./libs/elements.js":"libs/elements.js","./libs/generate.js":"libs/generate.js","./libs/stroringFuctionalities.js":"libs/stroringFuctionalities.js","./libs/timing.js":"libs/timing.js","./people.json":"people.json"}],"../../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "44207" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../usr/local/share/.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map