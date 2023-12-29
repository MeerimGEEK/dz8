const fileInput = document.querySelector('#file');
const slider = document.querySelector('.slider');
const slidesContainer = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const deleteButton = document.querySelector('.delete');

let imgFiles = [];
let currentSlide = 0;

fileInput.onchange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return alert('Файлы не выбраны!');

    imgFiles = imgFiles.concat(files);

    slidesContainer.innerHTML = '';

    imgFiles.forEach((file, index) => {
        const imgUrl = URL.createObjectURL(file);
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `<img src="${imgUrl}" alt="Slide ${index + 1}">`;
        slidesContainer.appendChild(slide);
    });

    showIndex(currentSlide);
};

function showIndex(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function Prev() {
    if (currentSlide > 0) {
        currentSlide--;
        showIndex(currentSlide);
    }
}

prevButton.addEventListener('click', () => {
    Prev();
});

function Next() {
    if (currentSlide < imgFiles.length - 1) {
        currentSlide++;
        showIndex(currentSlide);
    }
}

nextButton.addEventListener('click', () => {
    Next();
});

function Delete() {
    if (imgFiles.length > 0) {
        imgFiles.splice(currentSlide, 1);
        // Обновляем currentSlide, чтобы остаться в пределах массива после удаления
        currentSlide = Math.min(currentSlide, imgFiles.length - 1);
        showIndex(currentSlide);
    }
}

deleteButton.addEventListener('click', () => {
    Delete();
});
