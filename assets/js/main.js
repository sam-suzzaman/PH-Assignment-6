// function for showing fetch data
const showingData = (phones) => {

    const productContainer = document.getElementById("products-row");
    productContainer.innerHTML = "";

    if (phones.length > 0) {
        let i;
        for (i = 0; i < 20; i++) {
            const {
                brand,
                image,
                phone_name,
                slug
            } = phones[i];

            // creating single card
            const div = document.createElement('div');
            div.setAttribute("class", "col-lg-4 col-md-6 col-sm-6 col-10 mb-4 rounded");
            const element = `
        <div class = "card py-4 shadow-sm">
            <div class = "card-body">
                <img class="d-block mx-auto img-fluid" src=${image} alt="phone-picture"/>
                <h5 class = "card-title mt-4"> ${phone_name} </h5> 
                <p class = "card-text text-muted"> Brand: <span> ${brand} </span>
                </p>
                <button  class = "btn btn-success" onclick="handleCardBtn('${slug}')" data-bs-target="#staticBackdrop" data-bs-toggle="modal"> See Details </button> 
            </div>
        </div>     
        `;

            div.innerHTML = element;
            productContainer.appendChild(div);

        }
    } else {
        const div = document.createElement('div');
        const element = `
            <h3 class="text-muted fs-1 text-capitalize text-center">Sorry!!! Nothing was Found</h3>
        `;
        div.innerHTML = element;
        productContainer.appendChild(div);
    }
}

// function for finding the search Item
const handleSearch = () => {
    const inputText = document.getElementById("search-input");
    const searchText = inputText.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => showingData(data.data))
    inputText.value = "";
}

// function for showing data in a modal
const singlePhoneInfo = (data) => {
    const modalBody = document.getElementById("phone-modal-body");
    modalBody.innerHTML = "";
    const {
        brand,
        image,
        mainFeatures,
        name,
        releaseDate,
        slug,
        others
    } = data;

    // first part-> showing basic info
    const div = document.createElement('div');
    const element = `
        <div class="row justify-content-center align-items-center">
            <div class="col-10 col-md-4 me-sm-5">
                <img class="mx-auto d-block " src=${image} alt="">
            </div>
            <div class="col-10 col-md-6 mt-5 mt-md-0">
                <h3 class=" fw-bolder fs-2 mb-3">${name}</h3>
                <h6 class="text-muted fw-5">Brand: ${brand}</h6>
                <p class="fs-6 text-muted"><span>${releaseDate||'No Release Date'}</span></p>
            </div>
        </div>
        `;
    div.innerHTML = element;
    modalBody.appendChild(div);

    // second part-> Main Features
    const {
        chipSet,
        displaySize,
        memory,
        sensors,
        storage
    } = mainFeatures;
    const listGroup = document.createElement('div');
    const list = `
    <ul class="list-group">
        <li class="list-group-item"><strong>Chipset:</strong> ${chipSet}</li>
        <li class="list-group-item"><strong>Display:</strong> ${displaySize}</li>
        <li class="list-group-item"><strong>Memory:</strong> ${memory}</li>
        <li class="list-group-item"><strong>Stroage:</strong> ${storage}</li>
        <li class="list-group-item">
            <strong class="text-capitalize mb-3">Sensors:</strong>
            <ul id="sensors-part"></ul>
        </li>
    </ul>
    `;
    listGroup.innerHTML = list;
    const mainFeatureCol = document.getElementById("main-features-part");
    mainFeatureCol.innerHTML = '';
    mainFeatureCol.appendChild(listGroup);

    // Third Part-> Sensors
    const sensorUl = document.getElementById('sensors-part');
    sensorUl.innerHTML = '';
    sensors.forEach(value => {
        const li = document.createElement('li');
        li.innerText = value;
        sensorUl.appendChild(li);
    })

    // fourth-> Others features
    const {
        Bluetooth,
        GPS,
        NFC,
        Radio,
        USB,
        WLAN
    } = others;

    const otherListGroup = document.createElement('div');
    const ohterList = `
    <ul class="list-group">
        <li class="list-group-item"><strong>Blutooth:</strong> ${Bluetooth}</li>
        <li class="list-group-item"><strong>GPS:</strong> ${GPS}</li>
        <li class="list-group-item"><strong>NFC:</strong> ${NFC}</li>
        <li class="list-group-item"><strong>Radio:</strong> ${Radio}</li>
        <li class="list-group-item"><strong>USB:</strong> ${USB}</li>
        <li class="list-group-item"><strong>WLAN:</strong> ${WLAN}</li>
    </ul>
    `;
    otherListGroup.innerHTML = ohterList;
    const otherFeatureCol = document.getElementById("other-feature-part");
    otherFeatureCol.innerHTML = '';
    otherFeatureCol.appendChild(otherListGroup);
}


// 1.to show products on page load
const showAllProducts = () => {
    fetch(`https://openapi.programming-hero.com/api/phones`)
        .then(res => res.json())
        .then(data => showingData(data.data))
}

// 2.Grab the search-btn and adding eventlistener
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', handleSearch);

// 3. Function to show Item Information
const handleCardBtn = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => singlePhoneInfo(data.data))
}