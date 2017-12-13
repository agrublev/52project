'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const Cryptr = require('cryptr');
const mkdirp = require('mkdirp');


module.exports = class extends Generator {

    initializing() {
        this.log("HEY:");
        this.pkg = require('../package.json');
        let cryptr = new Cryptr('pass');//props.password
        this.props = {};
        this.props.config = {
            apiKey: cryptr.decrypt('865a60bb4a83cef4f2b73b2433238ffe846afc6b39176954afe5c4e6448671107411794a852304'),
            authDomain: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971009ddee7d7538b7540382b300c9f020a'),
            databaseURL: cryptr.decrypt('af676eaa6ac0a08ae59107116328a6e3ba36a753150e644798d6e1db5e84750b3f3232479e0c1478ca447ced6d29'),
            projectId: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971'),
            storageBucket: cryptr.decrypt('f22628ef2eccb892b6d65447'),
            messagingSenderId: cryptr.decrypt('552576775563')
        };
    }

    prompting() {
        // let done = this.async();
        // // Have Yeoman greet the user.
        // this.log(yosay(
        //     '52project is the only project you need:'
        // ));
        //
        // let prompts = [{
        //     type: 'input',
        //     name: 'password',
        //     message: 'What is the password',
        //     default: "wrong"
        // }];
        // let self = this;
        // this.prompt(prompts, function (props) {
        //     self.log(props);
        //     let cryptr = new Cryptr(props.password);
        //     self.props.config = {
        //         apiKey: cryptr.decrypt('865a60bb4a83cef4f2b73b2433238ffe846afc6b39176954afe5c4e6448671107411794a852304'),
        //         authDomain: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971009ddee7d7538b7540382b300c9f020a'),
        //         databaseURL: cryptr.decrypt('af676eaa6ac0a08ae59107116328a6e3ba36a753150e644798d6e1db5e84750b3f3232479e0c1478ca447ced6d29'),
        //         projectId: cryptr.decrypt('a1617fbf7d99eec8f3ce0c1b7322a1e7a97abd550e0971'),
        //         storageBucket: cryptr.decrypt('f22628ef2eccb892b6d65447'),
        //         messagingSenderId: cryptr.decrypt('552576775563')
        //     };
        //
        //     self.log("He22",self.props,props);
        //     done();
        // }.bind(this));
    }

    writing() {
        this.log("WRITE");
        // this.fs.copy(
        //     this.templatePath('dummyfile.txt'),
        //     this.destinationPath('dummyfile.txt')
        // );
        mkdirp('app');
        mkdirp('app/js');
        mkdirp('app/css');
        mkdirp('app/images');

        this.fs.copy(
            this.templatePath('js/main.js'),
            this.destinationPath('app/js/main.js')
        );

        this.log("TEST");
        this.fs.copyTpl(
            this.templatePath('views/index.html'),
            this.destinationPath('app/index.html'),
            this.props.config
        );

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
        this.log("TE11ST");
        let howToInstall = '\nInstall dependencies by running `npm install & bower install`';
        if (this.options['skip-install']) {
            this.log(howToInstall);
            return;
        }

        this.installDependencies();
    }
};
