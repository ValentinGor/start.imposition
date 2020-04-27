// *************************************************************************************** //
// ********************* Список подключенных модулей (плагинов) Gulp ********************* //
// *************************************************************************************** //

// Собственно сам Gulp
const gulp = require('gulp');

// Модуль (плагин) для очистки директории
const cleans = require('del');

// Модуль (плагин) для конкатенации (объединения файлов)
const concat = require('gulp-concat');

// Модуль (плагин) для очистки и минификации файлов CSS
const cleanCSS = require('gulp-clean-css');

// Модуль (плагин) для очистки и минификации файлов JS
const uglify = require('gulp-uglify-es').default;

// Модуль (плагин) для расстановки автопрефиксов в CSS
const autoprefixer = require('gulp-autoprefixer');

// Модуль (плагин) для отслеживания изменений в файлах
const browserSync = require('browser-sync').create();

// Модуль (плагин) для вставки темплейтов
const rigger = require('gulp-rigger');

// Модуль (плагин) для оптимизации изображений .jpg .png
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

// *************************************************************************************** //
// ************************************** Константы ************************************** //
// *************************************************************************************** //

// Получаем список файлов CSS и определяем их порядок подключения
const cssFiles = [
    './src/css/normalize.css',
    './src/css/bootstrap.min.css',
    './src/css/font-awesome.min.css',
    './src/libs/owlcarousel/owl.carousel.min.css',
    './src/libs/owlcarousel/owl.theme.default.min.css',
    './src/libs/fancybox/jquery.fancybox.min.css',
    './src/libs/jQueryFormStyler/jquery.formstyler.css',
    './src/libs/jQueryFormStyler/jquery.formstyler.theme.css',
    './src/css/style.css',
    './src/css/media.css'
];

// Получаем список файлов JS и определяем их порядок подключения
const jsFiles = [
    './src/js/jquery-3.4.1.min.js',
    './src/js/bootstrap.min.js',
    './src/js/popper.min.js',
    './src/libs/owlcarousel/owl.carousel.min.js',
    './src/libs/fancybox/jquery.fancybox.min.js',
    './src/libs/jQueryFormStyler/jquery.formstyler.min.js',
    './src/js/maskedinput.min.js',
    './src/js/main.js'
];

// Получаем список файлов для копирования
const src = {
    copy_files: [
        'src/*.html',
        'src/*.ico',
        'src/fonts/*',
        // 'src/img/*',
        'src/uploads/*',
    ]
};

// Получаем список файлов для отслеживания изменения HTML
const htmlFiles = [
    './src/*.html'
];


// *************************************************************************************** //
// *************************************** Функции *************************************** //
// *************************************************************************************** //

// Функция на стили CSS
function styles() {
    return gulp.src(cssFiles)

        // Конкатенация (Объединения) файлов CSS
        .pipe(concat('style.css'))

        // Добавить префиксы
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: false
        }))

        // Минификация CSS
        .pipe(cleanCSS({
            level: 2
        }))

        // Копирование CSS в папку build
        .pipe(gulp.dest('./build/css'))

        // Отслеживания изменения CSS
        .pipe(browserSync.stream())
}

// Функция на скрипты JS
function scripts() {
    return gulp.src(jsFiles)

        // Конкатенация (Объединения) файлов CSS
        .pipe(concat('script.js'))

        //Минификация JS
        .pipe(uglify({
            toplevel: true
        }))

        // Копирование JS в папку build
        .pipe(gulp.dest('./build/js'))

        // Отслеживания изменения JS
        .pipe(browserSync.stream())
}

(async () => {
    await imagemin(['src/img/*.{jpg,png}'], {
        destination: 'build/img',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    // console.log(files);
})();


// Функция на файлы HTML
function files() {
    return gulp.src(htmlFiles)
        // Прогоним через rigger
        .pipe(rigger())

        // Копирование HTML в папку build
        .pipe(gulp.dest('./build/'))
}


// Удалить всё в указанной папке
function clean() {
    return cleans(['build/*'])
}


// Просматривать файлы
function watch() {
    // Инициализация сервера
    browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });

    // Следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles);

    // Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts);

    // Следить за HTML файлами
    gulp.watch("./src/*.html", files);
    gulp.watch("./src/**/*.html", files);

    // При изменении HTML запустить синхронизацию
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("./src/**/*.html").on('change', browserSync.reload);
}


// *************************************************************************************** //
// **************************************** Таски **************************************** //
// *************************************************************************************** //

// Таск вызывающий функцию styles
gulp.task('styles', styles);

// Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

// Таск для очистки папки build
gulp.task('cleans', clean);

// Таск для копирование файлов в build
gulp.task('copyFiles', function () {
    return gulp.src(src.copy_files)
        // Прогоним через rigger
        .pipe(rigger())

        .pipe(gulp.dest(function (file) {
            let path = file.base;
            return path.replace('src', 'build');
        }));
});

// Таск для отслеживания изменений
gulp.task('watch', watch);

// Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, "copyFiles")));

// Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'));