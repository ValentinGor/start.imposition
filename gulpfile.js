//Подключаем модули галпа
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const del = require('del');
const browserSync = require('browser-sync').create();

//Порядок подключения css файлов
const cssFiles = [
    './src/css/normalize.css',
    './src/css/bootstrap.min.css',
    './src/libs/font-awesome/css/font-awesome.min.css',
    './src/libs/owlcarousel/owl.carousel.min.css',
    './src/libs/owlcarousel/owl.theme.default.min.css',
    './src/libs/fancybox/jquery.fancybox.min.css',
    './src/libs/jQueryFormStyler/jquery.formstyler.css',
    './src/libs/jQueryFormStyler/jquery.formstyler.theme.css',
    './src/css/style.css',
    './src/css/media.css'
];

//Порядок подключения js файлов
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

//Список файлов для копирования
const src = {
    copy_files: [
        'src/*.php',
        'src/fonts/*',
        'src/img/*',
        'src/libs/jquery-ui/*',
        'src/libs/jquery-ui/external/*',
        'src/libs/jquery-ui/external/jquery/*',
        'src/libs/jquery-ui/images/*',
        'src/libs/owl-carousel/*',
        'src/libs/owl-carousel/assets/*',
        'src/libs/slick/*',
        'src/libs/slick/fonts/*',
        'src/uploads/*',
    ]
};

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))

        //Добавить префиксы
        .pipe(autoprefixer({
            //browsers: ['last 2 versions'],
            cascade: false
        }))

        //Минификация CSS
        .pipe(cleanCSS({
            level: 2
        }))

        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

//Таск на скрипты JS
function scripts() {
    //Шаблон для поиска файлов JS
    //Всей файлы по шаблону './src/js/**/*.js'
    return gulp.src(jsFiles)
        //Объединение файлов в один
        .pipe(concat('script.js'))
        //Минификация JS
        .pipe(uglify({
            toplevel: false
        }))
        //Выходная папка для скриптов
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
}

//Удалить всё в указанной папке
function clean() {
    return del(['build/*'])
}


//Просматривать файлы
function watch() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    //Следить за CSS файлами
    gulp.watch('./src/css/**/*.css', styles);
    //Следить за JS файлами
    gulp.watch('./src/js/**/*.js', scripts);
    //При изменении HTML запустить синхронизацию
    gulp.watch("./*.html").on('change', browserSync.reload);
}

//Таск вызывающий функцию styles
gulp.task('styles', styles);

//Таск вызывающий функцию scripts
gulp.task('scripts', scripts);

//Таск для очистки папки build
gulp.task('del', clean);

// копирование файлов в build
gulp.task('copyFiles', function () {
    return gulp.src(src.copy_files)
        .pipe(gulp.dest(function (file) {
            let path = file.base;
            return path.replace('src', 'build');
        }));
});

//Таск для отслеживания изменений
gulp.task('watch', watch);

//Таск для удаления файлов в папке build и запуск styles и scripts
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, "copyFiles")));

//Таск запускает таск build и watch последовательно
gulp.task('dev', gulp.series('build', 'watch'));