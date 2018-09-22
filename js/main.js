// Development: Valentin Gorbatenko
// E-mail: v.gorbatenko@mail.ru
// Phone: +38 (066) 178-56-44
// Site: https://vk.com/gorbatenko1984


// Инициализация owlCarousel
$(document).ready(function () {
    $(".owl-carousel").owlCarousel();
});

// Инициализация jQueryFormStyler
// Для активации плагина примените метод .styler к тегам, которые хотите стилизовать
// флажок <input type="checkbox">;
// переключатель <input type="radio">;
// поле для выбора файла <input type="file">.
// поле для ввода чисел <input type="number">.
// раскрывающийся список <select>;
(function ($) {
    $(function () {
        $('input, select').styler();
    });
})(jQuery);

// Инициализация Fancybox
$().fancybox({
    selector: '[data-fancybox="gallery"]',
    loop: true
});

//Инициализация маски ввода телефона
jQuery(function ($) {
    $(".maskedinput").mask("+38 ( 999 ) 999-99-99");
});