// Grab the search-btn


// creating showAllProducts function
const showAllProducts = () => {
    fetch(`https://openapi.programming-hero.com/api/phones`)
        .then(res => res.json())
        .then(data => showingData(data.data))
}

// showing data in a modal
const singlePhoneInfo = (data) => {
    const modalBody = document.getElementById("phone-modal-body");
    modalBody.innerHTML = "";
    const {
        brand,
        image,
        mainFeatures,
        name,
        releaseDate,
        slug
    } = data;

    // showing data
    const div = document.createElement('div');
    const element = `
        <div class="row justify-content-center align-items-center">
            <div class="col-10 col-md-4 me-sm-5">
                <img class="mx-auto d-block " src=${image} alt="">
            </div>
            <div class="col-10 col-md-6 mt-5 mt-md-0">
                <h3 class=" fw-bolder fs-2 mb-3">${name}</h3>
                <h6 class="text-muted fw-5">Brand: ${brand}</h6>
                <p class="fs-6 text-muted"><span>${releaseDate?releaseDate:'No Release Date'}</span></p>
            </div>
        </div>
        `;

    div.innerHTML = element;
    modalBody.appendChild(div);

}
const handleCardBtn = (slug) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(res => res.json())
        .then(data => singlePhoneInfo(data.data))
}


// showing data function
const showingData = (phones) => {

    const productContainer = document.getElementById("products-row");
    productContainer.innerHTML = "";

    if (phones.length > 0) {
        let i;
        for (i = 0; i < 15; i++) {
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

// search handler
const handleSearch = () => {
    const inputText = document.getElementById("search-input");
    const searchText = inputText.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => showingData(data.data))
    inputText.value = "";
}


// Grab the search-btn and adding eventlistener
const searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener('click', handleSearch);