'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Cryptr = require('cryptr');
const mkdirp = require('mkdirp');
const inquirer = require('inquirer');


module.exports = class extends Generator {

    initializing() {
        this.pkg = require('../package.json');
        let cryptr = new Cryptr('pass');//props.password
        this.props = {};
        this.props.questions = [
            {
                type: 'input',
                name: 'password',
                message: "What's the pass"
            }
        ];
    }

    prompting() {
        let done = this.async();
        this.log(yosay(
            '52project is the only project you need:'
        ));
        let self = this;
        inquirer.prompt(this.props.questions).then(answers => {
            let cryptr = new Cryptr(answers.password);
            self.props.config = {
                apiKey: cryptr.decrypt('865a60bb4a83cef4f2b73b2433238ffe846afc6b39176954afe5c4e6448671107411794a852304'),
                authDomain: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971009ddee7d7538b7540382b300c9f020a'),
                databaseURL: cryptr.decrypt('af676eaa6ac0a08ae59107116328a6e3ba36a753150e644798d6e1db5e84750b3f3232479e0c1478ca447ced6d29'),
                projectId: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971'),
                storageBucket: cryptr.decrypt('f22628ef2eccb892b6d65447'),
                messagingSenderId: cryptr.decrypt('f22628ef2eccb892b6d65447')
            };
            done();
        });
    }

    writing() {
        mkdirp('app');
        mkdirp('app/js');
        mkdirp('app/css');
        mkdirp('app/images');

        this.fs.copyTpl(
            this.templatePath('views/index.html'),
            this.destinationPath('app/index.html'),
            this.props.config
        );

        this.fs.copy( this.templatePath('js/main.js'),this.destinationPath('app/js/main.js') );
        this.fs.copy( this.templatePath('js/helpful.js'),this.destinationPath('app/js/helpful.js') );

        this.fs.copy( this.templatePath('images/github.svg'),this.destinationPath('app/images/github.svg') );
        this.fs.copy( this.templatePath('images/github.png'),this.destinationPath('app/images/github.png') );

        this.fs.copy( this.templatePath('css/main.less'),this.destinationPath('app/css/main.less') );

        this.fs.copy( this.templatePath('_package.json'),this.destinationPath('package.json') );
        this.fs.copy(this.templatePath('_bower.json'),this.destinationPath('bower.json'));

        this.fs.copy(this.templatePath('_gulpfile.js'),this.destinationPath('gulpfile.js'));

        this.fs.copy(
            this.templatePath('gitignore'),this.destinationPath('.gitignore'));
        this.fs.copy(
            this.templatePath('gitattributes'),this.destinationPath('.gitattributes'));
        this.fs.copy(
            this.templatePath('editorconfig'),this.destinationPath('.editorconfig'));
        this.fs.copy(
            this.templatePath('jshintrc'),this.destinationPath('.jshintrc'));
        this.fs.copy(
            this.templatePath('bowerrc'),this.destinationPath('.bowerrc'));
    }

    end() {
        let howToInstall = '\nInstall dependencies by running `npm install & bower install`';
        if (this.options['skip-install']) {
            this.log(howToInstall);
            return;
        }

        this.installDependencies();
    }
};
