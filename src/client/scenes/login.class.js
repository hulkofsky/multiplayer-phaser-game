"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_model_1 = require("../../shared/events.model");
var LoginScene = /** @class */ (function () {
    function LoginScene() {
        this.createForm();
    }
    LoginScene.prototype.createForm = function () {
        var _this = this;
        this.formContainer = document.createElement('div');
        this.formContainer.className = 'form-container';
        this.loginPage = document.createElement('div');
        this.loginPage.className = 'login-page';
        this.form = document.createElement('div');
        this.form.className = 'form';
        this.loginForm = document.createElement('form');
        this.input = document.createElement('input');
        this.input.setAttribute('type', 'text');
        this.input.placeholder = 'username';
        this.input.id = 'your-name';
        this.input.focus();
        this.button = document.createElement('button');
        this.button.innerText = 'Join game';
        this.button.addEventListener('click', function (e) { _this.createPlayer(e); });
        this.loginForm.appendChild(this.input);
        this.loginForm.appendChild(this.button);
        this.loginPage.appendChild(this.form);
        this.form.appendChild(this.loginForm);
        this.formContainer.appendChild(this.loginPage);
        document.body.appendChild(this.formContainer);
    };
    LoginScene.prototype.createPlayer = function (e) {
        e.preventDefault();
        this.toggleLogin();
        var name = this.input.value;
        window.socket.emit(events_model_1.GameEvent.authentication, { name: name }, {
            x: window.innerWidth,
            y: window.innerHeight
        });
    };
    LoginScene.prototype.toggleLogin = function () {
        this.formContainer.classList.toggle('visible');
    };
    return LoginScene;
}());
exports.LoginScene = LoginScene;
//# sourceMappingURL=login.class.js.map