// creating showAllProducts function
const showAllProducts = () => {
    fetch(`https://openapi.programming-hero.com/api/phones`)
        .then(res => res.json())
        .then(data => showingData(data.data))
}

// showing data function
const showingData = (phones) => {
    const productContainer = document.getElementById("products-row");
    let i;
    for (i = 0; i <= 20; i++) {
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
                <a href = "#" class = "btn btn-success"> See Details </a> 
            </div>
        </div>     
        `;

        div.innerHTML = element;
        productContainer.appendChild(div);

    }
}