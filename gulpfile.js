// *************************************************************************************** //
// ********************* Список подключенных модулей (плагинов) Gulp ********************* //
// *************************************************************************************** //

// Собственно сам Gulp
const gulp = require('gulp');

// Модуль (плагин) для очистки директории
const cleans = require('del');

// Модуль (плагин) для конкатенации (объединения файлов)
const concat = require('gulp-concat');

// Модуль (плагин) для очистки и минификации файлов JS
const uglify = require('gulp-uglify-es').default;

// Модуль (плагин) для sass
const sass = require('gulp-sass');

// *************************************************************************************** //
// *************************************** Функции *************************************** //
// *************************************************************************************** //

// Удалить всё в указанной папке
function clean() {
    return cleans(['assets/*'])
}

// Функция для работы с файлами SCSS
function styles() {
    return gulp.src('./src/css/**/*.scss')
        // Конкатенация (Объединения) файлов SCSS
        .pipe(concat('main.css'))

        //Минификация CSS
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))

        // Копирование CSS в папку assets
        .pipe(gulp.dest('./assets/css'))
}

// Функция для работы с файлами JS
function scripts() {
    return gulp.src('./src/js/**/*.js')

        // Конкатенация (Объединения) файлов JS
        .pipe(concat('main.js'))

        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))

        // Копирование JS в папку assets
        .pipe(gulp.dest('./assets/js'))
}

// Функция для работы с файлами img
function copy_img() {
    return gulp.src('./src/img/*')
        // Копирование img в папку assets
        .pipe(gulp.dest('./assets/img'))
}

// Функция для работы с файлами favicon
function copy_favicon() {
    return gulp.src('./src/favicon/*')
        // Копирование favicon в папку assets
        .pipe(gulp.dest('./assets/favicon'))
}

// Функция для работы с файлами fonts
function copy_fonts() {
    return gulp.src('./src/fonts/*')
        // Копирование fonts в папку assets
        .pipe(gulp.dest('./assets/fonts'))
}

// Просматривать файлы
function watch() {
    // Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts);

    // Следить за SCSS файлами
    gulp.watch('./src/css/**/*.scss', styles);

    // Следить за файлами img
    gulp.watch('./src/img/**/*', copy_img);

    // Следить за файлами favicon
    gulp.watch('./src/favicon/**/*', copy_favicon);

    // Следить за файлами fonts
    gulp.watch('./src/fonts/**/*', copy_fonts);
}

// *************************************************************************************** //
// **************************************** Таски **************************************** //
// *************************************************************************************** //

// Таск для очистки папки assets
gulp.task('cleans', clean);

// Таск вызывающий функцию styles
gulp.task('sass', styles);

// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск для Копирования картинок
gulp.task('img', copy_img)

// Таск для Копирования шрифтов
gulp.task('fonts', copy_fonts);

// Таск для Копирования favicon
gulp.task('favicon', copy_favicon);

// Таск для отслеживания изменений
gulp.task('watch', watch);

// Таск для удаления файлов в папке assets и запуск styles и scripts
gulp.task('build', gulp.series("cleans", gulp.parallel("scripts", "sass", "fonts", "favicon", "img")));

// Таск запускает таск build и watch последовательно
gulp.task('default', gulp.series('build', 'watch'));