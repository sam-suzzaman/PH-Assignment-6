// function for appending new element
const addingNewElement = (ID, content) => {
    const targetElement = document.getElementById(ID);
    targetElement.innerHTML = "";
    targetElement.appendChild(content);
}

// function to show list-items
const showListItems = (values, targetElement) => {
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'list-group');
    for (const item in values) {
        const list = document.createElement('li');
        list.classList.add('list-group-item');
        list.innerHTML = `<strong class="text-capitalize">${item}:</strong> ${values[item]||'not available'}`;
        ul.appendChild(list);
    }
    targetElement.appendChild(ul);
}

// function for showing fetch data
const showingData = (phones) => {

    const productContainer = document.getElementById("products-row");
    productContainer.innerHTML = "";

    // to show all searched Item
    if (phones.length > 0) {
        let productLength;
        phones.length > 20 ? productLength = 20 : productLength = phones.length;
        let i;
        for (i = 0; i < productLength; i++) {
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
                        <img class="d-block mx-auto img-fluid" src=${image} alt="not available"/>
                        <h5 class = "card-title mt-4"> ${phone_name || 'not available'} </h5> 
                        <p class = "card-text text-muted"> Brand: <span> ${brand || 'not available'} </span>
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
    if (searchText.length > 0) {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => showingData(data.data))
    }
    inputText.value = "";
}

// function for showing data in a modal
const singlePhoneInfo = (data) => {
    // destructuring
    const {
        brand,
        image,
        mainFeatures,
        name,
        releaseDate,
        others
    } = data;

    // first part-> showing basic info =====
    const div = document.createElement('div');
    const element = `
        <div class="row justify-content-center align-items-center">
            <div class="col-10 col-md-4 me-sm-5">
                <img class="mx-auto d-block " src=${image} alt="Not Availablee">
            </div>
            <div class="col-10 col-md-6 mt-5 mt-md-0">
                <h3 class=" fw-bolder fs-2 mb-3">${name || 'Not Available'}</h3>
                <h6 class="text-muted fw-5">Brand: ${brand || 'Not Available'}</h6>
                <p class="fs-6 text-muted"><span>${releaseDate||'No Release Date'}</span></p>
            </div>
        </div>
        `;
    div.innerHTML = element;
    // append element
    addingNewElement("phone-modal-body", div);

    // second part-> showing main Features ====
    const mainFeatureCol = document.getElementById("main-features-part");
    mainFeatureCol.innerHTML = "";

    // checking 
    if (mainFeatures == undefined) {
        mainFeatureCol.innerHTML = `
        <h5 class='text-center text-muted'>There is no features information</h5>
        `
    } else {
        // showing all the list items
        showListItems(mainFeatures, mainFeatureCol);

        // to show sensors
        const targetLI = mainFeatureCol.children[0].lastElementChild;;
        targetLI.innerHTML = "";
        showSensorInfo(targetLI, mainFeatures);
    }

    // third-> showing Others features =====
    const otherFeatureCol = document.getElementById("other-feature-part");
    otherFeatureCol.innerHTML = '';

    if (others == undefined) {
        otherFeatureCol.innerHTML = `
        <h5 class='text-center text-muted'>There is no features information</h5>
        `
    } else {
        // showing list items
        showListItems(others, otherFeatureCol);
    }
}

// function to show sensors info
const showSensorInfo = (targetLI, data) => {
    const {
        sensors
    } = data;

    if (sensors == undefined || sensors.length == 0) {
        targetLI.innerHTML = `<strong class="text-capitalize">sensors:</strong> Not available`;
    } else {
        const div = document.createElement('div');
        const strong = document.createElement('strong');
        strong.innerText = 'Sensors:';
        div.appendChild(strong);

        const ul = document.createElement('ul');
        strong.classList.add('text-capitalize');
        sensors.forEach(value => {
            const li = document.createElement('li');
            li.innerHTML = value;
            ul.appendChild(li);
        })
        div.appendChild(ul);
        targetLI.appendChild(div);
    }
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