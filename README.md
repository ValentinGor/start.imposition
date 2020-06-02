
# start.imposition  
Стартовый шаблон для верстки.

Разработан для быстрого развертывания базового шаблона для верстки и создания в последующем тем для Wordpress.
## JS компоненты (библиотеки JS)
#### jQuery 3.5.1 https://jquery.com/
jQuery - используется минифицированный файл jquery - 3.4.1.min.js.
#### Bootstrap версии 4.5.0 https://getbootstrap.com/  
Bootstrap - используется минимальный набор компонентов. подключены файлы - bootstrap.min.css bootstrap.min.js  popper.min.js (включен файл bootstrap.min.js.map bootstrap.min.css.map).
#### Owl Carousel 2 https://owlcarousel2.github.io/OwlCarousel2/
Owl Carousel 2 - используется минифицированный файл - owl.carousel.min.js.
### fancybox https://fancyapps.com/fancybox/3/
fancybox - используется минифицированный файл - jquery.fancybox.min.js
### jQuery Form Styler http://dimox.name/jquery-form-styler/
jQuery Form Styler - используется минифицированный файл - jquery.formstyler.min.js.
### jQuery Masked Input https://github.com/digitalBush/jquery.maskedinput
jQuery Masked Input - используется минифицированный файл - maskedinput.min.js.
### Для написание собственных скриптов включен файл - main.js
В нем предлагается писать собственные скрипты + уже реализована базовая иницаизация некоторых библиотек  ( Owl Carousel // fancybox // jQuery Form Styler // jQuery Masked Input ).
## CSS компоненты (библиотеки CSS)
### Normalize.css https://github.com/necolas/normalize.css
При создании темы для Wordpress подразумевается что каждый разработчик будет генерировать собственную стартовую тему с помощью сервиса https://underscores.me/. 
В данную сборку уже включен файл normalize.css v8.0.1 который генерируется сервисом, для того чтобы верстка и готовая тема были идентичны. Версия normalize.css v8.0.0 отличается от официальной 
и имеет в себе включенные дополнительные классы специально для Wordpress.
### Подключены CSS с включенных JS библиотек 
Bootstrap  // Owl Carousel 2 // fancybox // jQuery Form Styler
### Подключены собственные CSS
Для написания собственных стилей подключены следующие файлы  style.css - (  Здесь предлагается написания основных собственных стилей) и media.css - ( Здесь предлагается написания стилей для медиазапросов // базовые диапазоны медиазапросов уже прописаны ).
## Шрифты 
### Font Awesome 4 https://fontawesome.com/v4.7.0/
В шаблон по умолчанию  уже подключен шрифт Font Awesome Version 4.7.0 ( ДА. уже существует версия [Version 5.8.2](https://fontawesome.com/changelog/latest) но в шаблоне используется Font Awesome Version 4.7.0 ).
## .gitignore
В шаблоне присутствует файл .gitignore скомпилированный таким образом что если его  переместить в корень проекта Wordpress то  в комит будут попадать только файлы темы. 
