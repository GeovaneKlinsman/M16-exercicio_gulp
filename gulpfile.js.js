// Importação das dependências necessárias para a automação de tarefas
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // Compilador Sass
const sourcemaps = require('gulp-sourcemaps');    // Gerador de mapas de origem para debug
const uglify = require('gulp-uglify');            // Minificador de JavaScript
const obfuscate = require('gulp-obfuscate');      // Ofuscador de código JavaScript
const imagemin = require('gulp-imagemin');        // Otimizador de imagens

// Função para comprimir e otimizar imagens
function comprimeImagens() {
    return gulp.src('./source/images/*')         // Ponto de origem das imagens
        .pipe(imagemin())                       // Aplicação do processo de otimização
        .pipe(gulp.dest('./build/images'));     // Pasta de destino para as imagens otimizadas
}

// Função para comprimir e ofuscar arquivos JavaScript
function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')    // Ponto de origem dos arquivos JS
        .pipe(uglify())                         // Minificação do código JS
        .pipe(obfuscate())                      // Ofuscação para maior segurança
        .pipe(gulp.dest('./build/scripts'));    // Pasta de destino para os arquivos otimizados
}

// Função para compilar arquivos Sass e gerar mapas de origem
function compilaSass() {
    return gulp.src('./source/styles/main.scss') // Ponto de origem do arquivo Sass principal
        .pipe(sourcemaps.init())                // Inicialização dos mapas de origem
        .pipe(sass({
            outputStyle: 'compressed'           // Estilo de saída: comprimido (produção)
        }))
        .pipe(sourcemaps.write('./maps'))       // Escrita dos mapas de origem na pasta especificada
        .pipe(gulp.dest('./build/styles'));     // Pasta de destino para o CSS gerado
}

// Tarefa padrão para desenvolvimento
// Observa alterações nos arquivos e executa as tarefas apropriadas
exports.default = function() {
    // Configuração dos watchers
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJavaScript));
    
};


// Tarefa de build para produção
// Executa todas as funções necessárias de forma paralela
exports.build = gulp.series(
    gulp.parallel(compilaSass, comprimeJavaScript, comprimeImagens) // Compilação Sass, compressão de JS e otimização de imagens
);
