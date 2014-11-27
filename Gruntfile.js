module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat:{
            basic: {
                src: ['public/js/fingerprint.js','public/js/jquery.youtube.player.js','public/js/toaster.js','public/js/jquery_browser.js','public/js/paper.js','public/js/webtoolkit.base64.js','public/js/farbtastic.js','public/js/html2canvas.min.js','public/js/jquery.pep.min.js'], //concat 타겟 설정(앞에서부터 순서대로 합쳐진다.)
                dest: 'public/js/lib/app.js' //concat 결과 파일
            }
        }
    });

 // Load the plugin that provides the "uglify", "concat" tasks.
 grunt.loadNpmTasks('grunt-contrib-concat');

 // Default task(s).
 grunt.registerTask('default', ['concat']); //grunt 명령어로 실행할 작업

 };