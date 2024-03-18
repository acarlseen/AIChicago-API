
const DOM_Elements ={
    art_item : '.art_item'
}

/**
 * 
 * @param {*} img_index 
 */

async function getInfo(img_index){
    let api_id = document.getElementsByTagName('img')[img_index].attributes[1].value;
    // this pulls the api id from the alt tag

    let request = new Request(`https://api.artic.edu/api/v1/artworks/${api_id}`, {
        method : 'GET'
    });

    let result = await fetch (request);

    let response = await result.json();

    console.log(response)
    console.log(response.data.title)

    console.log(response.data.short_description)

    let info = {
        title : response.data.title,
        artist : response.data.artist_titles,
        artist_id : response.data.artist_id,
        medium : response.data.medium_display,
        blurb : response.data.short_description,
        life: response.data.artist_display,
        date: response.data.date_display,
        dimensions : response.data.dimensions
    }

    return info

    let targetFigure = `#art${img_index}`
    
}

// Open and close Modal
function openModal(){
    document.getElementById('galleryModal').style.display = "block";
}

function closeModal(){
    modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
}

// Load globals for modal
var slideIndex = 1;

document.addEventListener('DOMContentLoaded', (event) => showSlides(slideIndex))

// Next/previous controls
function changeSlide(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n)
}

async function showSlides(n){
    const slides = document.getElementsByClassName('slide');
    //var dots
    var captionText = document.getElementById('caption');
    // handle index wrapping
    if( n > slides.length) slideIndex = 1;
    if ( n < 1) slideIndex = slides.length;

    for (let i= 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex-1].style.display = "block";
    
    let info = await getInfo(n-1)
    console.log(info)
    if (info.blurb){
        html = `<figcaption class="more-info"> 
            <div class="art-info" style="border-right: 1px solid white"> 
                ${info.life} <br> 
                ${info.title} <br> 
                ${info.date} <br> 
                ${info.medium} <br>
                ${info.dimensions}
            </div> 
            <div class="blurb">
                ${info.blurb}
            </div>
            </figcaption>`
    } else {
        html = `<figcaption class="more-info"> 
        <div class="art-info"> 
            ${info.life} <br> 
            ${info.title} <br> 
            ${info.date} <br> 
            ${info.medium} <br>
            ${info.dimensions}
        </div> 
        </figcaption>`        
    }

    captionText.innerHTML = html
}